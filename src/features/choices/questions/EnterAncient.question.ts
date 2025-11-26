import { Values } from "@/features/values/Values"
import { BuildQuestionObj } from "../BuildQuestionObj"
import { Question } from "../Question"
import { AllQuestions } from "../AllQuestions"
import { QuestionDefine } from "../QuestionDefine"
import { get_choice_to_village } from "./Village.question"
import { Choice } from "../Choice"
import { Path } from "../Path"
import { Condition } from "../Condition"
import { get_choice_decision_to_thief_camp, get_choice_to_thief_camp } from "./ThiefCamp.question"

export function get_choice_to_enter_ancient(values: Values, question_define : QuestionDefine){
    return new Choice({
                choice_context: "[ เดินทางไปยังหน้าโบราณสถาน ]",
                conditions: [],
                observ_click_choice: [()=>{
                    values.get_variables().first_time_enter_ancient.val = true
                }],
                paths:[
                    new Path({
                        path: question_define.get_key(question_define.all_questions.enter_ancient_default),
                        conditions: [
                            [
                                new Condition(()=>{
                                    return values.get_variables().first_time_enter_ancient.val
                                })
                            ]
                        ]
                    }),
                    new Path({
                        path: question_define.get_key(question_define.all_questions.enter_ancient_first_time),
                        conditions: [
                            [
                                new Condition(()=>{
                                    return !values.get_variables().first_time_enter_ancient.val
                                })
                            ]
                        ]
                    }),
                ]
            })
}

function get_enter_ancient_question(question_txt : string){
    let enter_ancient_class = class EnterAncient extends BuildQuestionObj {
        build(values: Values): Question {
            let all_questions = new AllQuestions
            let question_define = new QuestionDefine(all_questions)
            let question = new Question({
                question_txt: question_txt,
                choices: [
                    get_choice_to_village(values, question_define),
                    ...get_choice_to_thief_camp(values, question_define),
                ],
                observ_show_questions: [
                    ()=>{
                        values.get_variables().first_time_enter_ancient.val = true
                    }
                ],
            })

            return question
        }
    }
    return enter_ancient_class
}

export let FirstTimeEnterAncient = get_enter_ancient_question(`คุณใช้เวลาเดินทางในป่าอยู่สักพัก จนกระทั่งได้พบเห็นสภาพแวดล้อมที่ต้นไม้และใบหญ้าต่างถูกปกคลุมด้วยเชื้อราบางอย่างสีดำ 
    บรรยากาศโดยรอบ กึกก้องไปด้วยเสียงคำรามของเหล่าสัตว์ป่าที่ฟังดูดุร้ายและน่ากลัวกว่าปกติที่คุณเคยได้ยิน พลางให้ระแวงว่าพวกมันจะจู่โจมมาจากทางไหน

เมื่อเดินลึกเข้ามาอย่างระมัดระวังมาได้สักระยะ สุดท้ายคุณก็มาถึงถ้ำที่ภารกิจบอก คุณหายใจเข้าลึกอย่างประหม่า ก่อนที่จะตัดสินใจเดินเข้าไปข้างใน

ท่ามกลางบรรยากาศที่มืดสลัว ผ่านทางเดินที่มีคบเพลิงซึ่งถูกจุดโดยใครบางคน จนกระทั่งเมื่อมาถึงสุดปลายทาง คุณยืนจ้องมองสิ่งที่อยู่ตรงหน้าด้วยแววตาที่เบิกกว้าง

โบราณสถานปริศนาขนาดใหญ่ตั้งตระหง่านอยู่ตรงหน้าคุณ เพียงแค่มองหน้าทางเข้า ก็สัมผัสได้ถึงความชั่วร้ายที่ซ่อนเล้นอยู่ภายในนั้น`)

export let EnterAncietDefault = get_enter_ancient_question(`คุณได้กลับเข้ามายังโบราณสถานอีกครั้งหนึ่ง

คุณจะทำอย่างไรต่อ`)