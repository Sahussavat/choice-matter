import { Values } from "@/features/values/Values"
import { BuildQuestionObj } from "../BuildQuestionObj"
import { Question } from "../Question"
import { QuestionDefine } from "../QuestionDefine"
import { AllQuestions } from "../AllQuestions"
import { Choice } from "../Choice"
import { get_random_damge, is_player_dead } from "./FightRoll"
import { Condition } from "../Condition"
import { Path } from "../Path"
import { create_end_simple_choice, get_simple_talk_question } from "./SimpleTalk.question"

export function get_choice_ritual_fight(values: Values, question_define : QuestionDefine){
    return new Choice({
            choice_context: "[ สู้ ]",
            conditions: [],
            observ_click_choice: [()=>{
                values.get_variables().hp.val -= get_random_damge(90, values);
                values.get_variables().goblin_killed.val = true
            }],
            paths:[
                new Path({
                    path: question_define.get_key(question_define.all_questions.conclusion_ritual_pure_potion_end),
                    conditions: [[
                        new Condition(()=>{return !is_player_dead(values) 
                            && values.get_variables().got_pure_potion.val})
                    ]]
                }),new Path({
                    path: question_define.get_key(question_define.all_questions.conclusion_ritual_lose_elf_end),
                    conditions: [[
                        new Condition(()=>{return !is_player_dead(values) 
                            && !values.get_variables().got_pure_potion.val})
                    ]]
                }),
                new Path({
                    path: question_define.get_key(question_define.all_questions.ritual_fight_lose),
                    conditions: [[
                        new Condition(()=>{return is_player_dead(values)})
                    ]]
                }),
            ]
        })
}

export let RitualFightLose = get_simple_talk_question(
    `คุณได้พยายามจะต่อกรกับหมาป่ายักษ์ แต่ความสามารถของคุณก็ไม่มากพอที่จะสู้กับศัตรูที่แข็งแกร่งขนาดนั้นได้
    
    ร่างของคุณได้ถูกเจ้าหมาป่ายักษ์ฉีกกระชากหน้าท้อง แล้วถูกมันกินอวัยวะภายในทั้งเป็น`, 
    (values : Values, question_define : QuestionDefine)=>{    
        return [
            create_end_simple_choice(`[ จบ ]`),
        ]
    }
)

export function get_goblin_item(values : Values){
    if(!values.get_variables().got_goblin_items.val){
        values.get_variables().got_goblin_items.val = true
        values.get_items().goblin_bone.val += 3
    }
}

function get_ritual_fight(question_text : string){
    let ritual_fight_class = class EnterAncient extends BuildQuestionObj {
            build(values: Values): Question {
                let all_questions = new AllQuestions
                let question_define = new QuestionDefine(all_questions)
                let question = new Question({
                    question_txt: question_text,
                    choices: [
                        get_choice_ritual_fight(values, question_define)
                    ],
                    observ_show_questions: [
                        ()=>{
                            
                        }
                    ],
                })
    
                return question
            }
        }
        return ritual_fight_class
}

export let RitualFightLoseElf = get_ritual_fight(`หญิงสาวชาวเอลฟ์ได้เดินไปที่เครื่องนั่น เธอเงียบอยู่ชั่วครู่หนึ่งก่อนที่จะเจาะสายนั้นลงในเส้นเลือดแขนของตน ตัวเครื่องจะเริ่มดูดเลือดของเธอ กลไกภายในส่งเสียง แล้วอักขระเวทย์โดยรอบก็ส่องแสง

“ของเหลวที่รับเข้าได้รับการอนุมัติ เริ่มต้นกระบวนการชำระล้าง”



แต่แล้วทันใดนั้น เจ้าหมาป่ายักษ์ก็โผล่เข้าเจอกับพวกคุณ มันขู่คำรามอย่างบ้าคลั่งราวกับรู้ว่าเครื่องที่กำลังทำงานอยู่นั้นกำลังจะฆ่าเชื้อที่เป็นพรรคพวกของมัน คุณชักอาวุธขึ้น ตั้งท่าเตรียมพร้อมที่จะสู้กับมัน`)

export let RitualFightPurePotion = get_ritual_fight(`คุณได้เสียบสายเข็มลงในขวดน้ำยา ก่อนที่ตัวเครื่องจะเริ่มดูดน้ำข้างในนั้น กลไกภายในส่งเสียง แล้วอักขระเวทย์โดยรอบก็ส่องแสง

“ของเหลวที่รับเข้าได้รับการอนุมัติ เริ่มต้นกระบวนการชำระล้าง”



แต่แล้วทันใดนั้น เจ้าหมาป่ายักษ์ก็โผล่เข้าเจอกับพวกคุณ มันขู่คำรามอย่างบ้าคลั่งราวกับรู้ว่าเครื่องที่กำลังทำงานอยู่นั้นกำลังจะทำอะไร ทั้งคุณและเอลฟ์สาวต่างตั้งท่าเตรียมสู้`)