import { Values } from "@/features/values/Values"
import { QuestionDefine } from "../QuestionDefine"
import { create_end_simple_choice, get_simple_talk_question } from "./SimpleTalk.question"
import { Choice } from "../Choice"
import { Path } from "../Path"
import { Condition } from "../Condition"

export let PlayerConcludeFail = get_simple_talk_question(`คุณได้ออกมาจากโบราณสถาน แล้วพบว่าบริเวณโดยรอบได้กลายเป็นลานโล่ง ทั้งๆ ที่ก่อนหน้านี้มันยังเคยเป็นป่าที่ชุกชุมไปด้วยใบหญ้าและต้นไม้

เมื่อคุณกลับมาถึงหมู่บ้าน ก็ได้พบกับเหล่าผู้คนที่กำลังแตกตื่นจากการหายตัวไปเหล่าผู้ป่วยที่ติดเชื้อ

คุณได้ไปหาหัวหน้าหมู่บ้านแล้วเล่าเรื่องทั้งหมดให้ฟัง เขาดูเศร้าซึมทันทีที่ได้ยิน ชายคนนั้นบอกว่าเขาเข้าใจว่าคุณไม่มีทางเลือก และจะเก็บเรื่องนี้เป็นความลับเพื่อไม่ให้คนในหมู่บ้านบางคนมาต่อว่าคุณที่หาทางช่วยเหลือคนในครอบครัวพวกเขาไม่ได้

คุณได้รับเงินจากหัวหน้าหมู่บ้าน แล้วกล่าวอำลา

ในนาทีสุดท้ายก่อนที่คุณจะขึ้นรถม้ากลับ คุณได้มองเห็นเหล่าผู้คนที่เศร้าซึมจากการหายตัวไปของคนที่พวกเขารัก และคนเหล่านั้นก็จะไม่มีทางรู้สาเหตุนั้นไปตลอดกาล`,
    (values : Values, question_define : QuestionDefine)=>{
        return [
            create_end_simple_choice(`[ จบ ]`)
        ]
    }
)

export let PlayerConcludeSuccess = get_simple_talk_question(`คุณได้ออกมาจากโบราณสถาน แล้วพบว่าบริเวณโดยรอบได้กลับกลายมาเป็นพื้นป่าที่เขียวชอุ่ม เต็มไปด้วยเหล่าสัตว์นานับพันธ์ุที่ต่างกำลังออกหากิน

เมื่อคุณเดินทางมาถึงหมู่บ้าน ก็ได้พบกับเหล่าผู้คนที่ต่างกำลังปลื้มยินดีที่เหล่าผู้คนที่พวกเขารักได้กลับมาหายดีราวกับปาฏิหาริย์ คุณได้เข้าไปหาหัวหน้าหมู่บ้านแล้วได้เล่าเรื่องทั้งหมดให้ฟัง ชายคนนั้นได้บอกว่าพวกเขาทุกคนได้ติดหนี้ชีวิตคุณ แล้วได้มอบเงินค่าจ้างรวมกับเงินกำนัลเพิ่มให้อีกเท่าตัว

คุณได้รับเงินเหล่านั้นด้วยความเกรงใจ ก่อนที่จะกล่าวอำลา



ในนาทีสุดท้ายก่อนที่คุณจะขึ้นรถม้ากลับ คุณได้มองกลับไปที่ป่าแห่งนั้น พลางนึกหวังให้เหล่าผู้คนที่ตนได้ช่วยไว้ ได้มีชีวิตที่ดีต่อไป`,
    (values : Values, question_define : QuestionDefine)=>{
        return [
            create_end_simple_choice(`[ จบ ]`)
        ]
    }
)

export function get_choice_to_conclude_player(values : Values, question_define : QuestionDefine){
    return new Choice({
        choice_context: `[ ต่อไป ]`,
        conditions: [],
        observ_click_choice: [],
        paths: [
            new Path({
                path: question_define.get_key(question_define.all_questions.player_conclude_fail),
                conditions: [[
                    new Condition(()=>{
                        return values.get_variables().ritual_destroyed.val
                    })
                ]],
            }),
            new Path({
                path: question_define.get_key(question_define.all_questions.player_conclude_success),
                conditions: [[
                    new Condition(()=>{
                        return !values.get_variables().ritual_destroyed.val
                    })
                ]],
            }),
        ]
    })
}