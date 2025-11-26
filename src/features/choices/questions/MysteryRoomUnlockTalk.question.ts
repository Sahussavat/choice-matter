import { Values } from "@/features/values/Values";
import { create_simple_choice, get_simple_talk_question } from "./SimpleTalk.question";
import { QuestionDefine } from "../QuestionDefine";
import { get_choice_inside_room_default } from "./MysteryRoomUnlock.question";

export let InsideRoomTalk1 = get_simple_talk_question(`“ใช่” หญิงสาวตอบ “ถ้าข้าเจออุปกรณ์ที่พี่ชายข้าเป็นคนสร้างขึ้นแล้วใช้เลือดของข้าแทน…พวกเราก็อาจจะสามารถฆ่าเชื้อพวกนี้ให้หมดไปได้…แล้วทุกอย่างก็จะกลับมาเป็นเหมือนเดิม”`
    , (values : Values, question_define : QuestionDefine)=>{
        return [
            create_simple_choice(`[ “เราสามารถที่จะใช้ Pure Potion ที่ว่าแทนได้ไหม?” ]`, 
                question_define.all_questions.inside_room_talk2,
                values, question_define)
        ]
    },
    (values : Values)=>{
        return [
            ()=>{
                values.get_variables().readed_note.val = true
            }
        ]
    }
)

export let InsideRoomTalk2 = get_simple_talk_question(`“ก็อาจทำได้ ถ้ามันยังมีอยู่” หญิงสาวบอก “มีเรื่องเล่าว่า Pure Potion เป็นน้ำยาที่ขายทั่วไปเมื่อหนึ่งพันปีก่อน แต่ทุกวันนี้สูตรการสร้างสิ่งพวกนั้นก็ได้ถูกลืมเลือนหายไป น้อยคนนักที่จะยังรู้วิธีปรุงมัน…ช่างน่าเสียดาย ที่ข้ามีอายุเพียงไม่กี่ห้าร้อยปีเท่านั้น เลยไม่รู้ว่าจะหาทางปรุงมันได้อย่างไร…”`
    , (values : Values, question_define : QuestionDefine)=>{
        return [
            ...get_choice_inside_room_default(values, question_define)
        ]
    },
    (values : Values)=>{
        return [
            ()=>{
                values.get_variables().readed_note.val = true
            }
        ]
    }
)