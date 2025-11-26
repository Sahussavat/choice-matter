
import { Values } from "@/features/values/Values"
import { create_simple_choice, get_simple_talk_question } from "./SimpleTalk.question"
import { QuestionDefine } from "../QuestionDefine"
import { get_choice_decision_to_thief_camp, get_thief_default_choice } from "./ThiefCamp.question"
import { get_choice_fight_goblin } from "./GoblinCamp.question"
import { Question } from "../Question"
import { AllQuestions } from "../AllQuestions"
import { BuildQuestionObj } from "../BuildQuestionObj"
import { get_goblin_item } from "./GoblinCampFight.question"

export let GoblinCampTrapFail = get_simple_talk_question(
    `คุณได้สังเกตบริเวณโดยรอบที่พวกก็อบลินยืนอยู่ แต่ก็ไม่สังเกตพบเห็นอะไรที่พอจะช่วยได้ แต่แล้วทันใดนั้น 
    
    พวกมันก็หันมาเห็นคุณเข้าพอดี คุณจึงไม่มีทางเลือกอื่น นอกเสียจากว่าจะต้องสู้ฝ่าพวกมันไปเท่านั้น`, 
    (values : Values, question_define : QuestionDefine)=>{    
        return [
            get_choice_fight_goblin(values, question_define),
        ]
    }
)

export let GoblinCampTrapSuccess = get_simple_talk_question(
    `คุณได้สังเกตบริเวณโดยรอบที่พวกก็อบลินยืนอยู่ แล้วพบว่าที่ตรงนั้นมีกลไกกับดักที่จะพ่นไฟเผาผู้บุกรุกทันทีที่เหยียบแผ่นสวิตช์เข้า 
    
    แต่พวกมันก็ดูจะมีราขึ้นจนไม่สามารถที่จะเปิดการทำงานของกับดักได้

แต่พอคุณลองมองโดยรอบดีๆ ก็พบว่าที่ข้างๆ ตัวนั้นมีรูช่องว่างหนึ่งที่สามารถจะมองเห็นกลไกบางอย่างภายในได้`, 
    (values : Values, question_define : QuestionDefine)=>{    
        return [
            create_simple_choice(
                `[ ลองปรับแต่งกลไกเพื่อเปิดการทำงานของกับดัก ]`, 
            question_define.all_questions.trap_killed_goblin, values, question_define)
        ]
    }
)

function get_trap_killed_goblin_question(){
    let trap_killed_goblin_class = class EnterAncient extends BuildQuestionObj {
        build(values: Values): Question {
            let all_questions = new AllQuestions
            let question_define = new QuestionDefine(all_questions)
            let question = new Question({
                question_txt: 
                `เมื่อคุณปรับแต่งการทำงานเสร็จ กลไกกับดักก็เริ่มทำงาน เหล่ารูที่ซ่อนอยู่ตามซอก 
                
                ต่างพ่นไฟอันร้อนระอุใส่เหล่าก็อบลินจนถูกเผาไหม้เกรียมไม่เหลือชิ้นดี เปิดทางให้คุณสามารถเดินทางไปต่อได้



คุณได้รับ 

กระดูกก็อบลิน x 3`,
                choices: get_thief_default_choice(values, question_define),
                observ_show_questions: [
                    ()=>{
                        get_goblin_item(values);
                        values.get_variables().goblin_killed.val = true
                    }
                ],
            })

            return question
        }
    }
    return trap_killed_goblin_class
}

export let TrapKilledGoblin = get_trap_killed_goblin_question()