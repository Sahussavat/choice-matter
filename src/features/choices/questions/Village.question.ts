import { Values } from "@/features/values/Values";
import { BuildQuestionObj } from "../BuildQuestionObj";
import { Question } from "../Question";
import { AllQuestions } from "../AllQuestions";
import { QuestionDefine } from "../QuestionDefine";
import { Choice } from "../Choice";
import { Path } from "../Path";
import { get_choice_to_wizard_shop } from "./WizardShop.question";
import { Condition } from "../Condition";
import { get_choice_to_enter_ancient } from "./EnterAncient.question";

export function get_choice_to_village(values: Values, question_define : QuestionDefine){
    return new Choice({
                choice_context: "[ เดินทางไปยังใจกลางหมู่บ้าน ]",
                conditions: [],
                observ_click_choice: [()=>{
                    values.get_variables().first_time_village.val = true
                }],
                paths:[
                    new Path({
                        path: question_define.get_key(question_define.all_questions.village_default),
                        conditions: [
                            [
                                new Condition(()=>{
                                    return values.get_variables().first_time_village.val
                                })
                            ]
                        ]
                    }),
                    new Path({
                        path: question_define.get_key(question_define.all_questions.village_first_time),
                        conditions: [
                            [
                                new Condition(()=>{
                                    return !values.get_variables().first_time_village.val
                                })
                            ]
                        ]
                    }),
                ]
            })
}

function get_village_question(question_txt : string){
    let village_class = class Village extends BuildQuestionObj {
        build(values: Values): Question {
            let all_questions = new AllQuestions
            let question_define = new QuestionDefine(all_questions)
            let question = new Question({
                question_txt: question_txt,
                choices: [
                    get_choice_to_wizard_shop(values, question_define),
                    get_choice_to_enter_ancient(values, question_define),
                ],
                observ_show_questions: [
                    ()=>{
                        values.get_variables().first_time_village.val = true
                    }
                ],
            })

            return question
        }
    }
    return village_class
}

export let VillageFirstTime = get_village_question(`คุณนั่งรถม้าจากเมืองหลวงมายังหมู่บ้านชนบทโดยใช้เวลายาวนานถึง 3 วัน จนในที่สุดก็มาถึง

คุณได้แวะเข้าไปพูดคุยกับหัวหน้าหมู่บ้านเพื่อแจ้งว่าตนนั้นคือคนที่ได้รับมอบหมายงานให้มาสำรวจโบราณสถาน อีกฝ่ายที่ได้รับรู้ จึงได้มอบอุปกรณ์ป้องกันการติดเชื้อให้กับคุณ

คุณได้รับ

หน้ากากหมออีกา x 1



หัวหน้าหมู่บ้านได้บอกคุณทิ้งท้ายว่า ถ้าเกิดต้องการยารักษา ให้ไปที่ร้านขาย Potion พเนจรที่เพิ่งจะมาเปิดที่ทางตะวันตกของหมู่บ้าน ก่อนที่คุณจะโค้งขอบคุณแล้วเดินออกมา



คุณจะเดินทางไปที่ใดต่อ`)

export let VillageDefault = get_village_question(`คุณได้เดินมาถึงใจกลางหมู่บ้าน

คุณจะทำอย่างไรต่อ`)