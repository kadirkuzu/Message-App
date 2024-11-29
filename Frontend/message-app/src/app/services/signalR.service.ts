import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder, HubConnectionState } from '@microsoft/signalr';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private _connection?: HubConnection;
  private toJoinGroups: string[] = []
  private toLeaveGroups: string[] = []

  start(){
    if(!this._connection || this._connection.state == HubConnectionState.Disconnected){
      const hubConnection = new HubConnectionBuilder()
        .withUrl(environment.api + environment.signalRHub)
        .withAutomaticReconnect()
        .build()

      hubConnection.start()
      .then(()=>{
        this.toJoinGroups.forEach(x=>this.joinGroup(x))
        this.toJoinGroups = []
        this.toLeaveGroups.forEach(x=>this.leaveGroup(x))
        this.toLeaveGroups = []
      })
      .catch(err=> setTimeout(()=>this.start(),2000))
      this._connection = hubConnection
    }

    this._connection.onreconnected(connectionId => console.log("Reconnected", connectionId))
    this._connection.onreconnecting(connectionId => console.log("Reconnecting", connectionId))
    this._connection.onclose(err => console.error("Close reconnection", err))
  }

  joinGroup(group:string){
    if(!this._connection) {
      this.toJoinGroups.push(group)
    }
    else {
      this._connection.invoke("JoinGroup", group)
      .then(data=> console.log(data))
      .catch(data=> console.error(data))
    }
  }

  leaveGroup(group:string){
    if(!this._connection) {
      this.toLeaveGroups.push(group)
    }
    else {
      this._connection.invoke("LeaveGroup", group)
      .then(data=> console.log(data))
      .catch(data=> console.error(data))
    }
  }

  on(procedureName: string, callback: (...params: string[]) => void ){
    this._connection?.on(procedureName,callback)
  }

}
