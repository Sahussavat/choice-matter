import { GetKeyByObj } from "@/util/GetKeyByObj"
import { Values } from "../values/Values"
import { Question } from "./Question"
import { BuildEventObj } from "./BuildEventObj"
import { AllEvents } from "./AllEvents"

export class EventDefine {
    all_events : AllEvents

    constructor(all_events = new AllEvents){
        this.all_events = all_events
    }

    get_key(val : BuildEventObj) : string | null{
        return GetKeyByObj.get_key(val, this.all_events)
    }

    build_event(event_name : string, question_name : string, values : Values) : Question | null{
        let res_event : Question | null = null
        if (event_name in this.all_events 
            && this.all_events[event_name] instanceof BuildEventObj) {
            let build_event = this.all_events[event_name]
            res_event = build_event.build(values, question_name)
        }
        return res_event
    }
}