import { Values } from "@/features/values/Values";
import { create_simple_choice, get_simple_talk_question } from "./SimpleTalk.question";
import { QuestionDefine } from "../QuestionDefine";
import { get_thief_default_choice } from "./ThiefCamp.question";

export let ThiefQuestComplete1 = get_simple_talk_question(
    `ทันทีที่คุณมาถึง หัวหน้ากองโจรชาวฮาร์ฟลิ่งก็วิ่งเข้ามาหาคุณพร้อมกับสมาชิกคนอื่นๆ พวกเขาต่างร้องโอดครวญ บ้างก็ร้องไห้ออกมา

“โอ้ พระเจ้า…มิซา” หัวหน้ากองโจรทรุดเข่าลงตรงหน้าร่างของเพื่อนเขา

“ข้าไม่น่าพาพวกเจ้ามาที่นี่เลย”

สมาชิกคนหนึ่งก็มาแตะที่ไหล่ของเขาเบาๆ ทั้งสองมองหน้ากัน ก่อนที่คนอื่นๆ จะนำศพไปห่อเพื่อเตรียมพาออกจากที่นี่



หัวหน้ากองโจรเหมือนกำลังคุยอะไรบางอย่างกับบุคคลที่เหมือนกับรองหัวหน้า ก่อนที่หนุ่มชาวฮาร์ฟลิ่งคนนั้นจะเดินมาหาคุณ

“ข้าขอบคุณเจ้ามากที่ช่วยนำศพสหายของข้ากลับมาให้” เขาบอก “เพื่อเป็นการตอบแทน ข้าจะช่วยเหลือเจ้าในการผจญภัยครั้งนี้ด้วยตัวของข้าเอง”`,
    (values : Values, question_define : QuestionDefine)=>{
        return [
            create_simple_choice(`[ “ข้ากำลังต้องการโจรที่มีฝีมือเข้าปาร์ตี้อยู่พอดี” ]`, 
                question_define.all_questions.thief_quest_complete2,
                values, question_define)
        ]
    },
    (values : Values)=>{
        return [()=>{
            values.get_items().thief_body.val = 0
            values.get_variables().halfling_joined_party.val = true
        }]
    }
)

export let ThiefQuestComplete2 = get_simple_talk_question(
    `“นำทางเลย…เจ้านักผจญภัยแปลกหน้า” หัวหน้ากองโจรพูด`,
    (values : Values, question_define : QuestionDefine)=>{
        return [
            ...get_thief_default_choice(values, question_define)
        ]
    },
    (values : Values)=>{
        return [()=>{
            values.get_items().thief_body.val = 0
            values.get_variables().halfling_joined_party.val = true
        }]
    }
)