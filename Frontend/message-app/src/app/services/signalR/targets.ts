import { FriendActions } from "@/app/states/friends/actions"

export class SignalRTarget {
    target!:string
    action?:any
    callBack?:(data:SignalRTarget) => void
}

export const SignalRTargets: SignalRTarget[] = [
    {
        target: 'MessageAdded',
        callBack: (data:SignalRTarget)=>{console.log(data)}
    },
    {
        target: 'FriendRequestAdded',
        action: FriendActions.addFriendRequestSignalR
    },
    {
        target: 'FriendRequestRemoved',
        action: FriendActions.removeFriendRequestSignalR
    },
    {
        target: 'FriendAdded',
        action: FriendActions.addFriendSignalR
    },
]