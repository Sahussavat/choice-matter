import { Values } from "@/features/values/Values"
import { BuildQuestionObj } from "../BuildQuestionObj"
import { Question } from "../Question"
import { QuestionDefine } from "../QuestionDefine"
import { AllQuestions } from "../AllQuestions"
import { Choice } from "../Choice"
import { Condition } from "../Condition"
import { Path } from "../Path"
import { get_all_choices_to_mimic_room } from "./MimicPathToRoom"
import { get_all_choice_to_elf_room } from "./Elf.question"
import { get_choice_to_thief_camp } from "./ThiefCamp.question"
import { get_all_choices_to_library } from "./Library.question"
import { get_choice_unlock_a_mystery_door } from "./MysteryRoomUnlock.question"
import { DungeonLocations, get_default_all_choice_in_location } from "./DungeonWarp"
import { get_wolf_plob_random } from "../events/Wolf.plob"

export function get_all_choices_to_mystery_front_room(values : Values, question_define : QuestionDefine){
    return [
            new Choice({
                choice_context: `[ ไปต่อ ]`,
                conditions: [[
                    new Condition(()=>{
                        return values.get_variables().goblin_killed.val 
                        && !values.get_variables().mystery_room_first_time.val
                        && values.get_variables().elf_room_first_time.val
                        && values.get_variables().mimic_first_time.val
                        && values.get_variables().library_first_time.val 
                        && !values.get_variables().unlocked_mystery_room.val 
                    })
                ]],
                observ_click_choice: [
                    ()=>{
                        values.get_variables().mystery_room_first_time.val = true
                    }
                ],
                paths: [
                    new Path({
                        path: question_define.get_key(question_define.all_questions.mystery_room_first_time),
                        conditions: [],
                        plob_events: get_wolf_plob_random(values),
                    })
                ]
            }),
            new Choice({
                choice_context: `[ กลับไปยังห้องปริศนาที่ล็อกอยู่ ]`,
                conditions: [[
                    new Condition(()=>{
                        return values.get_variables().goblin_killed.val
                        && values.get_variables().mystery_room_first_time.val
                        && values.get_variables().elf_room_first_time.val
                        && values.get_variables().mimic_first_time.val
                        && values.get_variables().library_first_time.val 
                        && !values.get_variables().unlocked_mystery_room.val 
                    })
                ]],
                observ_click_choice: [
                    ()=>{
                        values.get_variables().mystery_room_first_time.val = true
                    }
                ],
                paths: [
                    new Path({
                        path: question_define.get_key(question_define.all_questions.mystery_room_default),
                        conditions: []
                    })
                ]
            }),
        ]
}

function get_mystery_room_default_choices(values : Values, question_define : QuestionDefine){
    return [
        ...get_choice_unlock_a_mystery_door(values, question_define),
        ...get_default_all_choice_in_location(DungeonLocations.MYSTERY_ROOM, values, question_define),
    ]
}

function get_mystery_room_first_time_question(){
    let mystery_room_first_time_class = class EnterAncient extends BuildQuestionObj {
        build(values: Values): Question {
            let all_questions = new AllQuestions
            let question_define = new QuestionDefine(all_questions)
            let question = new Question({
                question_txt: `คุณได้เดินทางลึกเข้ามาจนสัมผัสได้ว่าตนนั้นเกือบจะถึงส่วนในสุดของโบราณสถานแล้ว

ทันใดนั้นคุณก็ได้พบกับประตูบานหนึ่ง จึงได้ลองเข้าไปเปิด ก่อนจะพบว่ามันล็อก`,
                choices: [
                    ...get_mystery_room_default_choices(values, question_define)
                ],
                observ_show_questions: [
                    ()=>{
                        values.get_variables().mystery_room_first_time.val = true
                    }
                ],
            })

            return question
        }
    }
    return mystery_room_first_time_class
}

function get_mystery_room_default_question(){
        let mystery_room_default_class = class EnterAncient extends BuildQuestionObj {
        build(values: Values): Question {
            let all_questions = new AllQuestions
            let question_define = new QuestionDefine(all_questions)
            let question = new Question({
                question_txt: `คุณได้เดินทางกลับมายังทางเดินซึ่งมีประตูที่ถูกล็อกอยู่`,
                choices: [
                    ...get_mystery_room_default_choices(values, question_define)
                ],
                observ_show_questions: [
                    ()=>{
                        values.get_variables().mystery_room_first_time.val = true
                    }
                ],
            })

            return question
        }
    }
    return mystery_room_default_class
}

export let MysteryRoomFirst = get_mystery_room_first_time_question()
export let MysteryRoomDefault = get_mystery_room_default_question()