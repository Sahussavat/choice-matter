import { Values } from "@/features/values/Values"
import { BuildQuestionObj } from "../BuildQuestionObj"
import { Question } from "../Question"
import { AllQuestions } from "../AllQuestions"
import { QuestionDefine } from "../QuestionDefine"
import { get_all_choices_to_mimic_room } from "./MimicPathToRoom"
import { get_all_choice_to_elf_room } from "./Elf.question"
import { get_choice_to_thief_camp } from "./ThiefCamp.question"
import { create_simple_choice, get_simple_talk_question } from "./SimpleTalk.question"
import { Choice } from "../Choice"
import { Condition } from "../Condition"
import { Path } from "../Path"
import { get_all_choices_to_mystery_front_room } from "./MysteryRoom.question"
import { get_choice_to_inside_mystery_room } from "./MysteryRoomUnlock.question"
import { DungeonLocations, get_default_all_choice_in_location } from "./DungeonWarp"
import { get_wolf_plob_random } from "../events/Wolf.plob"

export function get_all_choices_to_library(values : Values, question_define : QuestionDefine){
    return [
            new Choice({
                choice_context: `[ ไปต่อ ]`,
                conditions: [[
                    new Condition(()=>{
                        return values.get_variables().mimic_first_time.val
                        && !values.get_variables().library_first_time.val
                        && !values.get_variables().picked_up_body.val
                    })
                ]],
                observ_click_choice: [
                    ()=>{
                        values.get_variables().library_first_time.val = true
                    }
                ],
                paths: [
                    new Path({
                        path: question_define.get_key(question_define.all_questions.library_first_time),
                        conditions: [],
                        plob_events: get_wolf_plob_random(values),
                    })
                ]
            }),
            new Choice({
                choice_context: `[ กลับไปยังห้องสมุด ]`,
                conditions: [[
                    new Condition(()=>{
                        return values.get_variables().mimic_first_time.val
                        && values.get_variables().library_first_time.val
                        && !values.get_variables().picked_up_body.val
                    })
                ]],
                observ_click_choice: [
                    ()=>{
                        values.get_variables().library_first_time.val = true
                    }
                ],
                paths: [
                    new Path({
                        path: question_define.get_key(question_define.all_questions.library_default),
                        conditions: []
                    })
                ]
            }),
        ]
}

function get_choice_pick_up_body(values : Values, question_define : QuestionDefine){
    return new Choice({
        choice_context: `[ แบกศพขึ้นหลัง ]`,
        conditions: [[
            new Condition(()=>{
                return !values.get_variables().picked_up_body.val
                && !values.get_variables().thief_camp_killed.val
            })
        ]],
        observ_click_choice: [
            ()=>{
                values.get_variables().picked_up_body.val = true
                values.get_items().thief_body.val = 1
            }
        ],
        paths: [
            new Path({
                path: question_define.get_key(question_define.all_questions.library_picked_up),
                conditions: []
            })
        ]
    })
}

function get_library_default_choices(values : Values, question_define : QuestionDefine){
    return [
        get_choice_pick_up_body(values, question_define),
        ...get_default_all_choice_in_location(DungeonLocations.LIBRARY, values, question_define),
    ]
}

function get_library_first_time_question(){
    let library_first_time_class = class EnterAncient extends BuildQuestionObj {
        build(values: Values): Question {
            let all_questions = new AllQuestions
            let question_define = new QuestionDefine(all_questions)
            let question = new Question({
                question_txt: `คุณได้เดินเข้ามาด้านในขึ้นเรื่อยๆ จนมาถึงห้องโถงห้องหนึ่งซึ่งรายล้อมด้วยชั้นหนังสือเก่าๆ 
                
                คุณสังเกตเห็นว่าที่พื้นมีร่างของคนแคระนอนจมกองเลือดอยู่ บริเวณหน้าท้องเหวอะหวะ เห็นอวัยวะภายในที่ถูกฉีกกระชาก 
                
                คุณคาดเดา คนๆ นี้อาจจะเป็นหนึ่งในสมาชิกกองโจรนั่นก็เป็นได้`,
                choices: [
                    ...get_library_default_choices(values, question_define),
                ],
                observ_show_questions: [
                    ()=>{
                        values.get_variables().library_first_time.val = true
                    }
                ],
            })

            return question
        }
    }
    return library_first_time_class
}

function get_library_default_question(){
    let library_default_class = class EnterAncient extends BuildQuestionObj {
        build(values: Values): Question {
            let all_questions = new AllQuestions
            let question_define = new QuestionDefine(all_questions)
            let question = new Question({
                question_txt: `คุณได้เดินจนมาถึงห้องโถงห้องหนึ่งซึ่งรายล้อมด้วยชั้นหนังสือเก่าๆ และมีศพของหนึ่งในสมาชิกกองโจรนอนอยู่บนพื้น`,
                choices: [
                    ...get_library_default_choices(values, question_define),
                ],
                observ_show_questions: [
                    ()=>{
                        values.get_variables().library_first_time.val = true
                    }
                ],
            })

            return question
        }
    }
    return library_default_class
}

export let LibraryFirstTime = get_library_first_time_question()
export let LibraryDefault = get_library_default_question()
export let LibraryPickedUp = get_simple_talk_question(`คุณได้ทำการถอดเสื้อผ้าของศพแล้วนำมาผูกปิดบริเวณหน้าท้องเพื่อไม่ให้เครื่องในหลุดออกมา 
    
    ก่อนที่คุณจะทำการแบกศพขึ้นมาไว้บนหลัง`,
    (values : Values, question_define : QuestionDefine)=>{
        return get_library_default_choices(values, question_define)
    }
)