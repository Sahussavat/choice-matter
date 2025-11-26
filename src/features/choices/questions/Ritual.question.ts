import { Values } from "@/features/values/Values"
import { BuildQuestionObj } from "../BuildQuestionObj"
import { Question } from "../Question"
import { QuestionDefine } from "../QuestionDefine"
import { AllQuestions } from "../AllQuestions"
import { Choice } from "../Choice"
import { Path } from "../Path"
import { Condition } from "../Condition"
import { DungeonLocations, get_default_all_choice_in_location } from "./DungeonWarp"
import { get_wolf_plob_gurantee } from "../events/Wolf.plob"

function get_start_ritual_choices(values : Values, question_define : QuestionDefine){
    return [
        new Choice({
            choice_context: `[ เปิดการทำงาน ]`,
            conditions: [[
                new Condition(()=>{
                    return !values.get_variables().got_pure_potion.val
                    && !values.get_variables().readed_note.val
                })
            ]],
            observ_click_choice: [()=>{
                values.get_variables().ritual_destroyed.val = true
            }],
            paths: [
                new Path({
                    path: question_define.get_key(question_define.all_questions.conclusion_ritual_destroy_end),
                    conditions: [],
                })
            ],
        }),
        new Choice({
            choice_context: `[ สังเวยเอลฟ์สาว ]`,
            conditions: [[
                new Condition(()=>{
                    return !values.get_variables().got_pure_potion.val
                    && values.get_variables().readed_note.val
                })
            ]],
            observ_click_choice: [()=>{
                values.get_variables().ritual_elf_dead.val = true
            }],
            paths: [
                new Path({
                    path: question_define.get_key(question_define.all_questions.ritual_fight_lose_elf),
                    conditions: [],
                })
            ],
        }),
        new Choice({
            choice_context: `[ ใช้ Pure Potion ]`,
            conditions: [[
                new Condition(()=>{
                    return values.get_variables().got_pure_potion.val
                })
            ]],
            observ_click_choice: [()=>{
                values.get_variables().ritual_end_pure_potion.val = true
            }],
            paths: [
                new Path({
                    path: question_define.get_key(question_define.all_questions.ritual_fight_pure_potion),
                    conditions: [],
                })
            ],
        }),
    ]
}

export function get_all_choices_to_ritual_room(values : Values, question_define : QuestionDefine){
    return [
            new Choice({
                choice_context: `[ ไปต่อ ]`,
                conditions: [[
                    new Condition(()=>{
                        return values.get_variables().mystery_room_first_time.val 
                        && !values.get_variables().ritual_room_first_time.val 
                    })
                ]],
                observ_click_choice: [
                    ()=>{
                        values.get_variables().ritual_room_first_time.val = true
                    }
                ],
                paths: [
                    new Path({
                        path: question_define.get_key(question_define.all_questions.ritual_room),
                        conditions: [],
                        plob_events: get_wolf_plob_gurantee(values),
                    })
                ]
            }),
            new Choice({
                choice_context: `[ กลับไปยังห้องสุดท้ายของโบราณสถาน ]`,
                conditions: [[
                    new Condition(()=>{
                        return values.get_variables().mystery_room_first_time.val
                        && values.get_variables().ritual_room_first_time.val 
                    })
                ]],
                observ_click_choice: [
                    ()=>{
                        values.get_variables().ritual_room_first_time.val = true
                    }
                ],
                paths: [
                    new Path({
                        path: question_define.get_key(question_define.all_questions.ritual_room),
                        conditions: []
                    })
                ]
            }),
        ]
}

function get_ritual_question(){
    let ritual_class = class EnterAncient extends BuildQuestionObj {
        build(values: Values): Question {
            let all_questions = new AllQuestions
            let question_define = new QuestionDefine(all_questions)
            let question = new Question({
                question_txt: `คุณได้เดินลึกจนมาถึงสุดทางเดินของโบราณสถาน ที่ใจกลางห้องมีเครื่องอุปกรณ์บางอย่างวางอยู่บนแท่นพิธี มันถูกสลักโดยรอบด้วยอักษรเวทมนตร์ มีเส้นสายเข็มสำหรับการดูดซึมบางอย่าง

ข้างๆ มีแผ่นกระดาษวางเอาไว้อยู่ มันเขียนด้วยภาษากลาง ตัวอักษรดูหวัดๆ ราวกับกำลังรีบเขียน



“ไม่มีทางรักษาเชื้อนี้อีกแล้ว…จงทำลายเจ้าสิ่งนี้เสีย…

มันจะปล่อยเชื้อที่ข้าได้สร้างให้ไปฆ่าเชื้อพวกนั้น…

ทุกสิ่งที่ติดโรค รวมถึงพวกเชื้อนั่นก็จะตาย…แต่ทุกคนจะปลอดภัย”`,
                choices: [
                    ...get_start_ritual_choices(values, question_define),
                    ...get_default_all_choice_in_location(DungeonLocations.RITUAL, values, question_define)
                ],
                observ_show_questions: [
                    ()=>{
                        
                    }
                ],
            })

            return question
        }
    }
    return ritual_class
}

export let RitualRoom = get_ritual_question()