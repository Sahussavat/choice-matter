
export class Condition {
    private cond : ()=> boolean

    constructor(cond : ()=> boolean){
        this.cond = cond
    }

    check() : boolean{
        return this.cond() && true
    }
}