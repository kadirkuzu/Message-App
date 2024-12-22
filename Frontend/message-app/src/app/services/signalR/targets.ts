import { ChatActions } from "@/app/states/chats/actions"
import { FriendActions } from "@/app/states/friends/actions"
import { MessageActions } from "@/app/states/messages/actions"

export class SignalRTarget {
    target!:string
    action?:any
    callBack?:(data:SignalRTarget) => void
}

export const SignalRTargets: SignalRTarget[] = [
    {
        target: 'MessageAdded',
        action: MessageActions.addSignalR
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
    {
        target: 'FriendRemoved',
        action: FriendActions.removeFriendSignalR
    },
    {
        target: 'ChatAdded',
        action: ChatActions.addSignalR
    },
]