export class SignalRTarget {
    target!:string
    action?:any
    callBack?:(data:SignalRTarget) => void
}

export const SignalRTargets: SignalRTarget[] = [
    {
        target: 'MessageAdded',
        callBack: (data:SignalRTarget)=>{console.log(data)}
    }
]