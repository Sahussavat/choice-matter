import { RouteName } from "@/router/RouteName";
import { Condition } from "./Condition";
import { Path, ResPath } from "./Path";
import { CheckCondition } from "@/util/CheckCondition";

interface ChoiceDataLayout{
    choice_context : string,
    conditions : Condition[][],
    observ_click_choice : CallableFunction[],
    paths : Path[]
}

export class Choice {
    private conditions : Condition[][]
    private observ_click_choice : CallableFunction[]
    private choice_context : string
    private paths : Path[]

    constructor(
        choiceData : ChoiceDataLayout
    ){
        this.choice_context = choiceData.choice_context
        this.conditions = choiceData.conditions
        this.observ_click_choice = choiceData.observ_click_choice
        this.paths = choiceData.paths
    }

    signal_click_choice(){
        for(let i=0;i<this.observ_click_choice.length;i++){
            let observ = this.observ_click_choice[i]
            observ()
        }
    }

    on_click_choice(observ : ()=>{}){
        this.observ_click_choice.push(observ)
    }

    is_showable(){
        return CheckCondition.check_cond(this.conditions)
    }

    get_choice_context(){
        return this.choice_context
    }

    get_first_visitable_path(){
        let visitablePath : ResPath = {
            default_path: RouteName.HOMEPAGE,
        }
        for(let i=0;i<this.paths.length;i++){
            let path = this.paths[i]
            if(path.is_visitable()){
                visitablePath = path.get_path()
                break;
            }
        }
        return visitablePath
    }
}