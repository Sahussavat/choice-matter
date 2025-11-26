import { Values } from "@/features/values/Values"
import { BuildEventObj } from "../BuildEventObj"
import { Question } from "../Question"
import { get_escape_wolf_fail_text, get_escape_wolf_success_text, get_fight_wolf_text } from "./WolfText"
import { Choice } from "../Choice"
import { get_choice_fight_wolf } from "./WolfFight.event"
import { AllEvents } from "../AllEvents"
import { EventDefine } from "../EventDefine"
import { get_random_damge, is_player_dead } from "../questions/FightRoll"
import { create_end_simple_choice } from "../questions/SimpleTalk.question"
import { Constants } from "@/util/Constants"
import { clamp } from "@/util/MathUtill"

function get_escape_wolf_fail_event(){
    let wolf_class = class Apple extends BuildEventObj {
        build_question(values: Values): Question {
            if(!values.get_variables().escape_wolf_fail.val){
                values.get_variables().escape_wolf_fail.val = true
                values.get_variables().hp.val 
                = clamp(values.get_variables().hp.val - get_random_damge(Constants.WOLF_FOUND__DAMAGE, values), 0, values.get_variables().max_hp.val);
            }
            let question = new Question({
                question_txt: get_escape_wolf_fail_text(values),
                choices: [],
                observ_show_questions: [],
            })
    
            return question
        }

        build_choices(values: Values): Choice[] {
            let all_events = new AllEvents
            let event_define = new EventDefine(all_events)
            return [
                get_choice_fight_wolf(values, event_define),
                ...(is_player_dead(values) ? [create_end_simple_choice("[ จบ ]")] : [])
            ]   
        }
    }
    return wolf_class
}

function get_escape_wolf_success_event(){
    let wolf_class = class Apple extends BuildEventObj {
        build_question(values: Values): Question {
            let question = new Question({
                question_txt: get_escape_wolf_success_text(values),
                choices: [],
                observ_show_questions: [],
            })
    
            return question
        }

        build_choices(values: Values): Choice[] {
            return []   
        }
    }
    return wolf_class
}

export let EscapeWolfSuccess = get_escape_wolf_success_event()
export let EscapeWolfFail = get_escape_wolf_fail_event()