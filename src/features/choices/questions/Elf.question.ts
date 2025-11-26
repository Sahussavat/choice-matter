import { Values } from "@/features/values/Values"
import { BuildQuestionObj } from "../BuildQuestionObj"
import { Question } from "../Question"
import { AllQuestions } from "../AllQuestions"
import { QuestionDefine } from "../QuestionDefine"
import { get_choice_decision_to_thief_camp, get_choice_to_thief_camp, get_thief_default_choice } from "./ThiefCamp.question"
import { Choice } from "../Choice"
import { Condition } from "../Condition"
import { Path } from "../Path"
import { get_all_choices_to_mimic_room } from "./MimicPathToRoom"
import { get_all_choices_to_library } from "./Library.question"
import { get_all_choices_to_mystery_front_room } from "./MysteryRoom.question"
import { get_choice_to_inside_mystery_room } from "./MysteryRoomUnlock.question"
import { DungeonLocations, get_default_all_choice_in_location } from "./DungeonWarp"
import { get_wolf_plob_random } from "../events/Wolf.plob"

function get_elf_choices(values : Values, question_define : QuestionDefine){
    return [
        new Choice({
            choice_context: `[ มอบยาฟื้นฟูให้กับเธอ 1 ขวด ]`,
            conditions: [[
                new Condition(()=>{
                    return values.get_items().hp_potion.val > 0
                })
            ]],
            observ_click_choice: [
                ()=>{
                    values.get_items().hp_potion.val -= 1
                    values.get_variables().elf_joined_party.val = true
                }
            ],
            paths: [
                new Path({
                    path: question_define.get_key(question_define.all_questions.elf_talk1),
                    conditions: []
                })
            ]
        }),
        ...get_elf_default_choices(values, question_define),
    ]
}

export function get_elf_default_choices(values : Values, question_define : QuestionDefine){
    return [
        ...get_default_all_choice_in_location(DungeonLocations.ELF, values, question_define),
    ]
} 


export function get_all_choice_to_elf_room(values : Values, question_define : QuestionDefine){
    return [
        new Choice({
            choice_context: `[ ไปต่อ ]`,
            conditions: [[
                new Condition(()=>{
                    return values.get_variables().goblin_killed.val && !values.get_variables().elf_room_first_time.val
                })
            ]],
            observ_click_choice: [
                ()=>{
                    values.get_variables().elf_room_first_time.val = true
                }
            ],
            paths: [
                new Path({
                    path: question_define.get_key(question_define.all_questions.elf_meet_first_time),
                    conditions: [],
                    plob_events: get_wolf_plob_random(values),
                })
            ]
        }),
        new Choice({
            choice_context: `[ กลับไปหาเอลฟ์สาว ]`,
            conditions: [[
                new Condition(()=>{
                    return values.get_variables().goblin_killed && values.get_variables().elf_room_first_time.val
                    && !values.get_variables().elf_joined_party.val
                })
            ]],
            observ_click_choice: [
                ()=>{
                    values.get_variables().elf_room_first_time.val = true
                }
            ],
            paths: [
                new Path({
                    path: question_define.get_key(question_define.all_questions.elf_meet_default),
                    conditions: []
                })
            ]
        }),
    ]
}

function get_elf_decision_question(question_txt : string){
    let elf_class = class EnterAncient extends BuildQuestionObj {
        build(values: Values): Question {
            let all_questions = new AllQuestions
            let question_define = new QuestionDefine(all_questions)
            let question = new Question({
                question_txt: question_txt,
                choices: get_elf_choices(values, question_define),
                observ_show_questions: [
                    ()=>{
                        values.get_variables().elf_room_first_time.val = true
                    }
                ],
            })

            return question
        }
    }
    return elf_class
}

export let ElfMeetFirstTime = get_elf_decision_question(`คุณได้เดินทางต่อเข้าไปยังส่วนลึกของโบราณสถานที่ กระทั่งได้พบกับชาวเอลฟ์เพศหญิงที่กำลังนอนพิงกำแพงอยู่ในสภาพบาดเจ็บ 
                
                เธอสวมเสื้อแบบเดียวกับที่สมาคมนักเวทย์ใส่ คุณจึงคาดเดาว่าเธอน่าจะเป็นจอมเวทย์



คุณจะทำอย่างไรต่อ

`)

export let ElfMeetDefault = get_elf_decision_question(`คุณได้เดินทางจนมาถึงสถานที่ที่หญิงสาวชาวเอลฟ์กำลังนั่งพิงกำแพงด้วยอาการบาดเจ็บ



คุณจะทำอย่างไรต่อ`)