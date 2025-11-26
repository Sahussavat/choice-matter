
export class Observer {
    private obs : CallableFunction[] = []

    on_signal(callable : CallableFunction){
        this.obs.push(callable)
    }

    signal(v_any : any){
        for(let i=0;i<this.obs.length;i++){
            this.obs[i](v_any)
        }
    }
}