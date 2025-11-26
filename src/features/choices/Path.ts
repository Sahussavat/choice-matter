import { CheckCondition } from "@/util/CheckCondition";
import { Condition } from "./Condition";
import { QuestionDefine } from "./QuestionDefine";
import { BuildQuestionObj } from "./BuildQuestionObj";
import { RandomEventData, RandomEvents } from "./RandomEvent";

interface PlobEventData {
    events : RandomEventData[],
    default_path_chance : number
}

export interface ResPath {
    default_path: string,
    event_path?: string,
    define_path?: string,
}

interface PathDataLayout {
    path : string | BuildQuestionObj,
    define_path? : string,
    plob_events?: PlobEventData,
    conditions : Condition[][],
}

export class Path {
    private path : string | null = null
    private plob_events : PlobEventData
    private conditions : Condition[][] = []
    private define_path : string | null = null

    constructor(data : PathDataLayout){
        let p = data.path
        this.plob_events = data.plob_events
        if(p instanceof BuildQuestionObj){
            p = (new QuestionDefine).get_key(p)
        }
        this.path = p
        this.define_path = data.define_path
        this.conditions = data.conditions
    }

    is_visitable(){
        return CheckCondition.check_cond(this.conditions)
    }

    get_path(): ResPath{
        let default_path : string = this.path
        let event_path : string
        if(this.plob_events){
            let evt_path = RandomEvents.get_random_events(this.plob_events.events, this.path,
                this.plob_events.default_path_chance)
            if(default_path !== evt_path){
                event_path = evt_path
            }
            
        }
        return {
            default_path: this.path,
            event_path: event_path,
            define_path: this.define_path,
        }
    }
}