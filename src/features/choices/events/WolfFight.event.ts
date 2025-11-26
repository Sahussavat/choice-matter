import { Values } from "@/features/values/Values"
import { BuildEventObj } from "../BuildEventObj"
import { Choice } from "../Choice"
import { Question } from "../Question"
import { Path } from "../Path"
import { REPLACABLE_DEFAULT_PATH } from "../RandomEvent"
import { create_end_simple_choice } from "../questions/SimpleTalk.question"
import { EventDefine } from "../EventDefine"
import { Condition } from "../Condition"
import { get_random_damge, is_player_dead } from "../questions/FightRoll"
import { clamp } from "@/util/MathUtill"
import { Constants } from "@/util/Constants"

export function get_choice_fight_wolf(values : Values, event_define : EventDefine){
    return new Choice({
        choice_context: "[ สู้ ]",
        conditions: [[
            new Condition(()=>{
                return !is_player_dead(values)
            })
        ]],
        observ_click_choice: [()=>{
            values.get_variables().hp.val 
            = clamp(values.get_variables().hp.val - get_random_damge(Constants.WOLF__DAMAGE, values), 0, values.get_variables().max_hp.val);
        }],
        paths:[
            new Path({
                path: REPLACABLE_DEFAULT_PATH,
                plob_events: {
                    events: [{
                        event_name: event_define.get_key(event_define.all_events.wolf_fight_win),
                        chance: 100
                    }],
                    default_path_chance: 0
                },
                conditions: [[
                    new Condition(()=>{return !is_player_dead(values)})
                ]]
            }),
            new Path({
                path: REPLACABLE_DEFAULT_PATH,
                plob_events: {
                    events: [{
                        event_name: event_define.get_key(event_define.all_events.wolf_fight_lose),
                        chance: 100
                    }],
                    default_path_chance: 0
                },
                conditions: [[
                    new Condition(()=>{return is_player_dead(values)})
                ]]
            }),
        ]
    })
}

function get_fight_wolf_fail_event(){
    let wolf_class = class Apple extends BuildEventObj {
        build_question(values: Values): Question {
            let question = new Question({
                question_txt: `คุณได้พยายามจะต่อกรกับหมาป่ายักษ์ แต่ความสามารถของคุณก็ไม่มากพอที่จะสู้กับศัตรูที่แข็งแกร่งขนาดนั้นได้
                
                ร่างของคุณได้ถูกเจ้าหมาป่ายักษ์ฉีกกระชากหน้าท้อง แล้วถูกมันกินอวัยวะภายในทั้งเป็น`,
                choices: [],
                observ_show_questions: [],
            })
    
            return question
        }

        build_choices(values: Values): Choice[] {
            return [
                create_end_simple_choice(`[ จบ ]`),
            ]   
        }
    }
    return wolf_class
}

function get_fight_wolf_success_event(){
    let wolf_class = class Apple extends BuildEventObj {
        build_question(values: Values): Question {
            let question = new Question({
                question_txt: `ได้ต่อกรกับหมาป่ายักษ์ แล้วไล่มันไปได้สำเร็จ
                
                ได้รับ
                
                เศษชิ้นส่วนหนังหมาป่ากลายพันธ์ุ x 1`,
                choices: [],
                observ_show_questions: [()=>{
                    if(!values.get_variables().got_wolf_item.val){
                        values.get_variables().got_wolf_item.val = true
                        values.get_items().wolf_bone.val += 1
                    }
                }],
            })
    
            return question
        }

        build_choices(values: Values): Choice[] {
            return []   
        }
    }
    return wolf_class
}

export let WolfFightFail = get_fight_wolf_fail_event()
export let WolfFightSuccess = get_fight_wolf_success_event()