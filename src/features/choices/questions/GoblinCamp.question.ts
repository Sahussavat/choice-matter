import { Values } from "@/features/values/Values"
import { BuildQuestionObj } from "../BuildQuestionObj"
import { Question } from "../Question"
import { AllQuestions } from "../AllQuestions"
import { QuestionDefine } from "../QuestionDefine"
import { Choice } from "../Choice"
import { Path } from "../Path"
import { get_random_damge, is_player_dead } from "./FightRoll"
import { Condition } from "../Condition"
import { get_dice_result, roll_dice } from "./RollDice"
import { AllEvents } from "../AllEvents"
import { EventDefine } from "../EventDefine"
import { get_wolf_plob_random } from "../events/Wolf.plob"
import { Constants } from "@/util/Constants"
import { clamp } from "@/util/MathUtill"

export function get_choice_fight_goblin(values: Values, question_define : QuestionDefine){
    return new Choice({
            choice_context: "[ สู้ ]",
            conditions: [],
            observ_click_choice: [()=>{
                values.get_variables().hp.val 
                = clamp(values.get_variables().hp.val - get_random_damge(Constants.GOBLIN_DAMAGE, values), 0,values.get_variables().max_hp.val);
                values.get_variables().goblin_killed.val = true
            }],
            paths:[
                new Path({
                    path: question_define.get_key(question_define.all_questions.goblin_fight_win),
                    conditions: [[
                        new Condition(()=>{return !is_player_dead(values)})
                    ]]
                }),
                new Path({
                    path: question_define.get_key(question_define.all_questions.goblin_fight_lose),
                    conditions: [[
                        new Condition(()=>{return is_player_dead(values)})
                    ]]
                }),
            ]
        })
}

export function get_choice_decision_to_goblin_camp(values: Values, question_define : QuestionDefine){
    return [
            get_choice_fight_goblin(values, question_define),
            new Choice({
                choice_context: "[ สังเกตพื้นที่โดยรอบ ]",
                conditions: [],
                observ_click_choice: [()=>{
                    roll_dice(values)
                }],
                paths:[
                    new Path({
                        path: question_define.get_key(question_define.all_questions.goblin_trap_success),
                        conditions: [[
                            new Condition(()=>{return get_dice_result(values) * 100 >= 50})
                        ]]
                    }),
                    new Path({
                        path: question_define.get_key(question_define.all_questions.goblin_trap_fail),
                        conditions: [[
                            new Condition(()=>{return get_dice_result(values) * 100 < 50})
                        ]]
                    }),
                ]
            }),
        ]
}

export function get_choice_to_goblin_camp(values: Values, question_define : QuestionDefine){
    return new Choice({
                choice_context: "[ ไปต่อ ]",
                conditions: [[
                    new Condition(()=>{
                        return !values.get_variables().goblin_killed.val
                    })
                ]],
                observ_click_choice: [()=>{
                        values.get_variables().first_time_goblin_camp.val = true
                    }],
                paths:[
                    new Path({
                        path: question_define.get_key(question_define.all_questions.goblin_camp_first_time),
                        plob_events: get_wolf_plob_random(values),
                        conditions: []
                    }),
                ]
            })
}

function get_goblin_camp_decision_question(question_txt : string){
    let goblin_camp_class = class EnterAncient extends BuildQuestionObj {
        build(values: Values): Question {
            let all_questions = new AllQuestions
            let question_define = new QuestionDefine(all_questions)
            let question = new Question({
                question_txt: question_txt,
                choices: get_choice_decision_to_goblin_camp(values, question_define),
                observ_show_questions: [
                    ()=>{
                        values.get_variables().first_time_goblin_camp.val = true
                    }
                ],
            })

            return question
        }
    }
    return goblin_camp_class
}

export let GoblinCampFirstTime = get_goblin_camp_decision_question(
    `คุณเดินลึกเข้ามาจนสังเกตเห็นกลุ่มสิ่งมีชีวิตบางอย่างกำลังเคลื่อนไหวอยู่ตรงหน้า คุณย่อตัวหลบหลังซากปรักหักพัง ก่อนจะค่อยๆ เงยหน้ามองดู

พวกมันคือเหล่าก็อบลินที่ถูกเชื้อราสีดำลามปกคลุมทั่วทั้งตัว ซึ่งกำลังยืนตามทางเดินพร้อมถืออาวุธราวกับยามเฝ้า



คุณจะทำอย่างไรต่อ`)