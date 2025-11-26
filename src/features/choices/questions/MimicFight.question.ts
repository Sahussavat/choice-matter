import { Values } from "@/features/values/Values"
import { QuestionDefine } from "../QuestionDefine"
import { Choice } from "../Choice"
import { Condition } from "../Condition"
import { Path } from "../Path"
import { BuildQuestionObj } from "../BuildQuestionObj"
import { Question } from "../Question"
import { AllQuestions } from "../AllQuestions"
import { gain_health_potion_mimic } from "./Mimic.question"
import { create_end_simple_choice, get_simple_talk_question } from "./SimpleTalk.question"
import { do_damage_to_player, get_random_damge, is_player_dead } from "./FightRoll"
import { get_mimic_default_choice } from "./MimicTrap.question"
import { Constants } from "@/util/Constants"

export function get_choice_fight_mimic(values : Values, question_define : QuestionDefine){
    return new Choice({
        choice_context: `[ สู้ ]`,
        conditions: [],
        observ_click_choice: [()=>{
            do_damage_to_player(Constants.MIMIC_DAMAGE, values);
        }],
        paths: [
            new Path({
                path: question_define.get_key(question_define.all_questions.mimic_fight_success),
                conditions: [[
                    new Condition(()=>{
                        return !is_player_dead(values)
                    })
                ]],
            }),
            new Path({
                path: question_define.get_key(question_define.all_questions.mimic_identify_fail),
                conditions: [[
                    new Condition(()=>{
                        return is_player_dead(values)
                    })
                ]],
            }),
        ],
    })
}

export function get_choice_stealth_kill_mimic(values : Values, question_define : QuestionDefine){
    return new Choice({
        choice_context: `[ ลอบสังหาร Mimic ]`,
        conditions: [[
            new Condition(()=>{
                return values.get_variables().known_its_mimic.val
                && !values.get_variables().opend_mimic.val
                && !values.get_variables().halfling_joined_party.val
            })
        ]],
        observ_click_choice: [],
        paths: [
            new Path({
                path: question_define.get_key(question_define.all_questions.stealth_kill_mimic),
                conditions: [[
                    new Condition(()=>{
                        return !values.get_variables().halfling_joined_party.val
                    })
                ]],
            }),
        ],
    })
}

export function get_mimic_fight_fail_question(){
    return get_simple_talk_question(
        `คุณได้พยายามจะต่อกรกับ Mimic แต่ความสามารถของคุณก็ไม่มากพอที่จะสู้กับศัตรูที่แข็งแกร่งขนาดนั้นได้
        
        ร่างของคุณได้ถูกเจ้า Mimic กลืนกิน แล้วถูกย่อยกลายเป็นสารอาหารให้กับมัน`, 
        (values : Values, question_define : QuestionDefine)=>{    
            return [
                create_end_simple_choice(`[ จบ ]`),
            ]
        }
    )
}

export function get_mimic_fight_success_question(){
    let mimic_fight_succ_class = class EnterAncient extends BuildQuestionObj {
            build(values: Values): Question {
                let all_questions = new AllQuestions
                let question_define = new QuestionDefine(all_questions)
                let question = new Question({
                    question_txt: `คุณได้ต่อกรกับ Mimic แล้วสังหารมันได้สำเร็จ


ได้รับ Health Potion x 5`,
                    choices: [
                        ...get_mimic_default_choice(values, question_define)
                    ],
                    observ_show_questions: [
                        ...gain_health_potion_mimic(values)
                    ],
                })
    
                return question
            }
        }
    return mimic_fight_succ_class
}

function get_stealth_kill_mimic_question(){
    let mimic_identify_fail_class = class EnterAncient extends BuildQuestionObj {
            build(values: Values): Question {
                let all_questions = new AllQuestions
                let question_define = new QuestionDefine(all_questions)
                let question = new Question({
                    question_txt: `คุณได้เดินเข้าไปด้านข้างกล่องนั้นพร้อมกับถืออาวุธไว้ในมือ คุณค่อยๆ เปิดกล่องออก แล้วเมื่อฝาได้อ้ากว้างจนเห็นภายใน คุณก็โจมตีเข้าไปที่คอหอยซึ่งเป็นจุดตายของมันโดยทันที เจ้า Mimic กรีดร้องอย่างเจ็บปวด ก่อนที่ฝากล่องจะปิดลง

เมื่อเจ้าสิ่งมีชีวิตนี้ตาย คุณก็ได้เปิดกล่องนี้อีกรอบ แต่ครั้งนี้แทนที่จะได้พบอวัยวะภายในปาก ทว่ากลับได้พบกับของมีค่าอยู่ตรงหน้าแทน



ได้รับ Health Potion x 5`,
                    choices: [
                        ...get_mimic_default_choice(values, question_define)
                    ],
                    observ_show_questions: [
                        ...gain_health_potion_mimic(values)
                    ],
                })
    
                return question
            }
        }
    return mimic_identify_fail_class
}

export let StealthKillMimic = get_stealth_kill_mimic_question()
export let MimicFightSucc = get_mimic_fight_success_question()
export let MimicFightFail = get_mimic_fight_fail_question()