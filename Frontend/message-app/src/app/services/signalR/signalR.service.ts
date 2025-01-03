import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder, HubConnectionState } from '@microsoft/signalr';
import { environment } from '../../../environments/environment';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs';
import { AuthService } from '../auth.service';
import { SignalRTarget, SignalRTargets } from './targets';
import { UserSelector } from '@/app/states/user/selectors';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private _connection?: HubConnection;
  private toJoinGroups: string[] = []
  private toLeaveGroups: string[] = []

  user$ = this.store.select(UserSelector.activeUser)

  constructor(private store: Store, private authService: AuthService) { }

  start() {
    this.user$.pipe(filter(x => !!x)).subscribe(user => {
      if (!this._connection || this._connection.state == HubConnectionState.Disconnected) {
        const hubConnection = new HubConnectionBuilder()
          .withUrl(environment.server + environment.signalRHub, {
            accessTokenFactory: () => this.authService.getToken()! 
          })
          .withAutomaticReconnect()
          .build()

        hubConnection.start()
          .then(() => {
            this.toJoinGroups.forEach(x => this.joinGroup(x))
            this.toJoinGroups = []
            this.toLeaveGroups.forEach(x => this.leaveGroup(x))
            this.toLeaveGroups = []
          })
          .catch(err => setTimeout(() => this.start(), 2000))
        this._connection = hubConnection
        SignalRTargets.forEach(x=>this.on(x.target,x.action,x.callBack))
      }

      this._connection.onreconnected(connectionId => console.log("Reconnected", connectionId))
      this._connection.onreconnecting(connectionId => console.log("Reconnecting", connectionId))
      this._connection.onclose(err => console.error("Close reconnection", err))
    })
  }

  joinGroup(group: string) {
    if (!this._connection || this._connection.state !== HubConnectionState.Connected) {
      this.toJoinGroups.push(group)
    }
    else {
      this._connection.invoke("JoinGroup", group)
        .then(data => console.log(data))
        .catch(data => console.error(data))
    }
  }

  leaveGroup(group: string) {
    if (!this._connection) {
      this.toLeaveGroups.push(group)
    }
    else {
      this._connection.invoke("LeaveGroup", group)
        .then(data => console.log(data))
        .catch(data => console.error(data))
    }
  }

  on(target: string, action?: any, callback?: (data:SignalRTarget) => void) {
    this._connection?.on(target, (data)=> {
      if(action) {
        this.store.dispatch(action({data}))
      }
      
      else if(callback) {
        callback(data as SignalRTarget)
      }
    })
  }

}
