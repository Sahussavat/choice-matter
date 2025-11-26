import { Values } from "@/features/values/Values";
import { QuestionDefine } from "../QuestionDefine";
import { Choice } from "../Choice";
import { Condition } from "../Condition";
import { BuildQuestionObj } from "../BuildQuestionObj";
import { Question } from "../Question";
import { AllQuestions } from "../AllQuestions";
import { mystery_room_alone_default_not_read, mystery_room_alone_default_read, mystery_room_alone_first_time, mystery_room_elf_again, mystery_room_elf_first_time } from "./MysteryRoomUnlockText";
import { path_to_inside_mystery_room } from "./MysteryRoomUnlockToPath";
import { get_all_choices_to_mimic_room } from "./MimicPathToRoom";
import { get_all_choice_to_elf_room } from "./Elf.question";
import { get_choice_to_thief_camp } from "./ThiefCamp.question";
import { get_all_choices_to_library } from "./Library.question";
import { create_simple_choice } from "./SimpleTalk.question";
import { get_all_choices_to_mystery_front_room } from "./MysteryRoom.question";
import { DungeonLocations, get_default_all_choice_in_location } from "./DungeonWarp";

export function get_choice_unlock_a_mystery_door(values : Values, question_define : QuestionDefine){
    return [
            new Choice({
                choice_context: `[ ใช้ชะแลงงัดประตู ]`,
                conditions: [[
                    new Condition(()=>{
                        return values.get_items().crowbar.val > 0
                        && !values.get_variables().unlocked_mystery_room.val
                    })
                ]],
                observ_click_choice: [
                    ()=>{
                        values.get_variables().unlocked_mystery_room.val = true
                    }
                ],
                paths: [
                    ...path_to_inside_mystery_room(values, question_define)
                ],
            }),
            new Choice({
                choice_context: `[ ขอยืมอุปกรณ์จากหัวหน้าโจรเพื่องัดประตู ]`,
                conditions: [[
                    new Condition(()=>{
                        return values.get_items().crowbar.val <= 0
                        && values.get_variables().halfling_joined_party.val
                        && !values.get_variables().unlocked_mystery_room.val
                    })
                ]],
                observ_click_choice: [
                    ()=>{
                        values.get_variables().unlocked_mystery_room.val = true
                    }
                ],
                paths: [
                    ...path_to_inside_mystery_room(values, question_define)
                ],
            }),
    ]
}

export function get_choice_to_inside_mystery_room(values : Values, question_define : QuestionDefine){
    return new Choice({
        choice_context: `[ กลับเข้าไปยังห้องวิจัย ]`,
        conditions: [[
            new Condition(()=>{
                return values.get_variables().unlocked_mystery_room.val
                && values.get_variables().library_first_time.val
                && !values.get_variables().readed_note.val
            })
        ]],
        observ_click_choice: [
            ()=>{
                values.get_variables().unlocked_mystery_room.val = true
            }
        ],
        paths: [
            ...path_to_inside_mystery_room(values, question_define)
        ],
    })
}

export function get_choice_inside_room_default(values : Values, question_define : QuestionDefine){
    return [
        ...get_default_all_choice_in_location(DungeonLocations.INSIDE_ROOM, values, question_define),
    ]
}

function get_inside_room_alone(question_text : string){
    let mystery_room_class = class EnterAncient extends BuildQuestionObj {
        build(values: Values): Question {
            let all_questions = new AllQuestions
            let question_define = new QuestionDefine(all_questions)
            let question = new Question({
                question_txt: question_text,
                choices: get_choice_inside_room_default(values, question_define),
                observ_show_questions: [
                    ()=>{
                        values.get_variables().unlocked_mystery_room.val = true
                        values.get_variables().inside_mystery_room_first_time.val = true
                    }
                ],
            })

            return question
        }
    }
    return mystery_room_class
}

function get_inside_mystery_room_first_time_question(){
    return get_inside_room_alone(mystery_room_alone_first_time)
}

function get_inside_mystery_room_default_not_read_question(){
    return get_inside_room_alone(mystery_room_alone_default_not_read)
}

function get_inside_mystery_room_default_read_question(){
    return get_inside_room_alone(mystery_room_alone_default_read)
}

function get_inside_room_w_elf(question_text : string){
    let mystery_room_class = class EnterAncient extends BuildQuestionObj {
        build(values: Values): Question {
            let all_questions = new AllQuestions
            let question_define = new QuestionDefine(all_questions)
            let question = new Question({
                question_txt: question_text,
                choices: [
                    create_simple_choice(`[ “ถ้างั้นถ้าใช้เลือดของเจ้า…” ]`, 
                    question_define.all_questions.inside_room_talk1,
                    values, question_define)
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
    return mystery_room_class
}

function get_inside_mystery_room_w_elf_first_time_question(){
    return get_inside_room_w_elf(mystery_room_elf_first_time)
}

function get_inside_mystery_room_w_elf_default_question(){
    return get_inside_room_w_elf(mystery_room_elf_again)
}

export let InsideRoomAloneFirstTime = get_inside_mystery_room_first_time_question()
export let InsideRoomAloneDefaultNotRead = get_inside_mystery_room_default_not_read_question()
export let InsideRoomAloneDefaultRead = get_inside_mystery_room_default_read_question()
export let InsideRoomWithElfFirstTime = get_inside_mystery_room_w_elf_first_time_question()
export let InsideRoomWithElfAgain = get_inside_mystery_room_w_elf_default_question()