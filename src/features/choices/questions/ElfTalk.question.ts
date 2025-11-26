import { Values } from "@/features/values/Values";
import { create_simple_choice, get_simple_talk_question } from "./SimpleTalk.question";
import { QuestionDefine } from "../QuestionDefine";
import { get_choice_to_thief_camp } from "./ThiefCamp.question";
import { get_all_choices_to_mimic_room } from "./MimicPathToRoom";
import { get_elf_default_choices } from "./Elf.question";

export let ElfTalk1 = get_simple_talk_question(`คุณได้มอบยาฟื้นฟูให้กับเอลฟ์สาวที่นอนอยู่ เธอมองคุณที่จู่ๆ ก็เดินเข้ามา 
    
    ก่อนที่จะยื่นมือรับแล้วเปิดขวดดื่ม บาดแผลของเธอค่อยๆ สมานเข้าด้วยกัน จนทั้งร่างกายกลับมาเป็นปกติ

“ขอบคุณมาก คนแปลกหน้า” หญิงสาวเอลฟ์กล่าวขอบคุณ

“ข้าไม่คิดว่าจะรอดออกไปจากที่นี่แล้วซะอีก”`,
    (values : Values, question_define : QuestionDefine)=>{
        return [
            create_simple_choice(
                `[ “เจ้าคือหนึ่งในสมาชิกกองโจรที่มาปล้นที่นี่หรือเปล่า?” ]`
                , question_define.all_questions.elf_talk2
                , values, question_define)
        ]
    }
)

export let ElfTalk2 = get_simple_talk_question(`“ข้าไม่ได้มาที่นี่เพื่อปล้นชิงอะไรหรอกนะ ข้ามาที่นี่โดยมีจุดประสงค์อื่นต่างหาก” เธอตอบ`,
    (values : Values, question_define : QuestionDefine)=>{
        return [
            create_simple_choice(
                `[ “แล้วเจ้ามาทำอะไรที่นี่?” ]`
                , question_define.all_questions.elf_talk3
                , values, question_define)
        ]
    }
)

export let ElfTalk3 = get_simple_talk_question(
    `“พี่ชายของข้า ‘ยาร์นา’ เขาหายตัวไปเป็นเดือน ข้าก็เลยพยายามจะออกตามหาเขา…จนกระทั่งเบาะแสได้พาข้ามาถึงที่นี่…เหมือนกับว่าเขาได้รับภารกิจให้มากำราบวอร์ล็อกผู้ชั่วร้ายที่พยายามจะก่อพิธีกรรมบางอย่างในโบราณสถานแห่งนี้…แต่หลังจากนั้นก็ไม่มีใครพบเห็นเขาอีกเลย”

`,
    (values : Values, question_define : QuestionDefine)=>{
        return [
            create_simple_choice(
                `[ “ทำไมถึงมีแผลเต็มไปทั่วทั้งตัวอย่างนั้น? โดนอะไรโจมตีเข้างั้นหรือ?” ]`
                , question_define.all_questions.elf_talk4
                , values, question_define)
        ]
    }
)

export let ElfTalk4 = get_simple_talk_question(
    `“ใช่” หญิงชาวเอลฟ์พูด “ข้าพบกับหมาป่ายักษ์สีดำเข้า…มันแข็งแกร่งมาก..มากเกินกว่าที่ข้าเพียงคนเดียวจะฆ่ามันได้…แต่โชคดีที่ข้าไวพอจะหนีเอาตัวรอดมาได้ ไม่งั้นคงได้กลายเป็นผีเฝ้าที่นี่ไปแล้ว”`,
    (values : Values, question_define : QuestionDefine)=>{
        return [
            create_simple_choice(
                `[ “คือข้ากำลังตามหาต้นตอของเชื้อโรคปริศนาที่กำลังแพร่ระบาดในหมู่บ้านแถบนี้อยู่น่ะ สนใจอยากเข้าร่วมปาร์ตี้กับข้าไหม?” ]`
                , question_define.all_questions.elf_talk5
                , values, question_define)
        ]
    }
)

export let ElfTalk5 = get_simple_talk_question(
    `“เอาสิ” หญิงสาวชาวเอลฟ์ตอบตกลง “ตอนนี้ข้าเองก็กำลังอยากได้เพื่อนร่วมสำรวจอยู่พอดี”



ได้รับ หญิงสาวชาวเอลฟ์ มาเป็นเพื่อนร่วมทาง`,
    (values : Values, question_define : QuestionDefine)=>{
        return [
            ...get_elf_default_choices(values, question_define),
        ]
    }
)