import { Values } from "@/features/values/Values"
import { AllQuestions } from "../AllQuestions"
import { QuestionDefine } from "../QuestionDefine"
import { create_simple_choice, get_simple_talk_question } from "./SimpleTalk.question"
import { get_choice_to_enter_ancient } from "./EnterAncient.question"
import { get_thief_default_choice } from "./ThiefCamp.question"

export let ThiefPersuaSuccess1 = get_simple_talk_question(
    `คุณยกมือข้าง พร้อมกล่าวว่าตนนั้นไม่ได้ต้องการจะสู้ถ้าไม่จำเป็น เหล่ากองโจรต่างมองหน้ากัน 
    
    ก่อนที่ชายหนุ่มชาวฮาร์ฟลิ่งที่แต่งตัวเหมือนกับผู้นำจะพูดออกมา

“ก็ดี” เขาเก็บดาบลงในฝัก ก่อนที่สมาชิกคนอื่นๆ จะลดอาวุธลง

“ทางนี้เองก็ไม่อยากจะมีปัญหาด้วยเหมือนกัน”`, 
(values : Values, question_define : QuestionDefine)=>{    
    return [
        create_simple_choice(`[ “แล้วพวกเจ้ามาทำอะไรกันที่นี่?” ]`, question_define.all_questions.thief_persuation_succ2
            , values, question_define),
    ]
}, 
(values : Values)=>{
    return [()=>{
        values.get_variables().did_thief_pursuation_success.val = true
    }]
})

export let ThiefPersuaSuccess2 = get_simple_talk_question(
    `“ก็ตามปกติ” หัวหน้ากองโจรบอก “มาหาของมีค่าข้างในนี้…ตอนแรกก็ไม่มีอะไรมากนักหรอก…จนกระทั่งพวกเราไปเจอกับมันเข้า…”`, 
(values : Values, question_define : QuestionDefine)=>{    
    return [
        create_simple_choice(`[ “มัน?” ]`, question_define.all_questions.thief_persuation_succ3
            , values, question_define),
    ]
}, 
(values : Values)=>{
    return [()=>{
        values.get_variables().did_thief_pursuation_success.val = true
    }]
})

export let ThiefPersuaSuccess3 = get_simple_talk_question(
    `“เจ้าหมาป่ายักษ์ตัวสีดำ…เราไปเจอกับมันเข้าระหว่างที่กำลังค้นสมบัติอยู่…เจ้านั่นมันมองไม่เห็นก็จริง 
    
    แต่จมูกและหูของมันดีเป็นบ้า….มันเจอพวกเรา ทุกคนเลยต้องสู้ แล้วสุดท้ายก็มาจบลงที่สภาพอย่างนี้…พวกเราหนีมาได้ 
    
    แต่มีสมาชิกคนหนึ่งยังติดอยู่ข้างในนั้น…”`, 
(values : Values, question_define : QuestionDefine)=>{    
    return [
        create_simple_choice(`[ “ข้าอาจจะพอช่วยตามคนที่หายไปกลับมาให้ได้นะ” ]`, question_define.all_questions.thief_persuation_accept_quest
            , values, question_define),
        create_simple_choice(`[ ไม่สนใจแล้วเดินไปต่อ ]`, question_define.all_questions.goblin_camp_first_time
            , values, question_define,
            (values : Values)=>{
                return [
                    ()=>{
                        values.get_variables().first_time_goblin_camp.val = true
                    }
                ]
            }),
        get_choice_to_enter_ancient(values, question_define),
    ]
}, 
(values : Values)=>{
    return [()=>{
        values.get_variables().did_thief_pursuation_success.val = true
    }]
})

export let ThiefAcceptQuest = get_simple_talk_question(
        `“นี่เจ้า…” ฮาร์ฟลิ่งชายดูอึ้งนิดๆ เขาไม่คิดเลยว่าจู่ๆ จะมีคนแปลกหน้ามายื่นมือให้ความช่วยเหลือพวกเขาอย่างนี้

    “ถ้าเจ้าคิดจะช่วยจริงๆ พวกข้าก็ยินดี” เขาบอกก่อนจะยื่นบางอย่างให้

    “เอานี่ไปสิ…ข้างในโบราณสถานอาจจะมีบางห้องที่ล็อกอยู่ ถ้าไม่เจอกุญแจก็ใช้เจ้านี่ซะ”



    คุณได้รับ

    ชะแลง x 1



    “ขอให้โชคดี…นักผจญภัยแปลกหน้า”`,
    (values : Values, question_define : QuestionDefine)=>{
        return get_thief_default_choice(values, question_define)
    },
    (values : Values)=>{
        return [
            ()=>{
                values.get_items().crowbar.val = 1
            }
        ]
    }
)