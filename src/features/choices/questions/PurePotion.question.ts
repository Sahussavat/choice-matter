import { Values } from "@/features/values/Values";
import { create_simple_choice, get_simple_talk_question } from "./SimpleTalk.question";
import { QuestionDefine } from "../QuestionDefine";
import { get_default_wizard_shop_choices } from "./WizardShop.question";
import { Choice } from "../Choice";
import { Path } from "../Path";
import { Condition } from "../Condition";

export function get_choice_to_pure_potion_talk(values : Values, question_define : QuestionDefine){
    return new Choice({
        choice_context: `[ “พอจะทำ Pure Potion ให้หน่อยได้ไหม?” ]`,
        conditions: [[
            new Condition(()=>{
                return !values.get_variables().got_pure_potion.val
                && values.get_variables().readed_note.val
                && values.get_variables().elf_joined_party.val
            })
        ]],
        observ_click_choice: [],
        paths: [
            new Path({
                path: question_define.get_key(question_define.all_questions.pure_potion_talk1),
                conditions: [],
            })
        ],
    })
}

export let PurePotionTalk1 = get_simple_talk_question(`“โอ้แน่นอน” ชายแก่ตอบ “เจ้าจะเอาไปทำอะไรรึ?”`,
    (values : Values, question_define : QuestionDefine)=>{
        return [
            create_simple_choice(`[ “มันจำเป็นสำหรับการจัดการเชื้อโรคที่กำลังแพร่ระบาดในหมู่บ้านน่ะ” ]`,
                question_define.all_questions.pure_potion_talk2,
                values, question_define
            )
        ]
    }
)

export let PurePotionTalk2 = get_simple_talk_question(`“อืม ข้าเข้าใจล่ะ…แต่ถึงข้าจะพอรู้วิธีปรุงมันก็ตาม แต่มันก็ยังขาดส่วนผสมที่สำคัญอีกหนึ่งอย่างน่ะสิ”`,
    (values : Values, question_define : QuestionDefine)=>{
        return [
            create_simple_choice(`[ “ส่วนผสมที่สำคัญ?” ]`,
                question_define.all_questions.pure_potion_talk3,
                values, question_define
            )
        ]
    }
)

export let PurePotionTalk3 = get_simple_talk_question(`“ถูกต้อง…ข้าจำเป็นจะต้องมีหัวเชื้อที่บริสุทธิ์มากๆ อยู่ แต่ก่อนเราก็มักจะใช้หยดเลือดที่ได้ประทานจากตระกูลที่ได้รับพรศักดิ์สิทธิ์กัน…น่าเสียดายที่ทุกวันนี้มันเป็นเรื่องยากนักที่จะตามหาผู้สืบเชื้อสายพวกนั้น”

“ถ้าหมายถึงผู้สืบเชื้อสายเลือดบริสุทธิ์” หญิงสาวชาวเอลฟ์พูด “ข้าเองที่เป็นหนึ่งในนั้น…ได้โปรดใช้เลือดของข้าในการสร้างน้ำยาดังกล่าวที”

“โอ้ไม่อยากจะเชื่อ!” ชายแก่ตกตะลึง “ผู้สืบเชื้อตัวเป็นๆ! แหมไม่ได้เจอมาเป็นร้อยๆ ปีแล้ว…เอาสิ ยื่นมือมา”

หญิงสาวยื่นมือให้เจ้าของร้าน ก่อนที่เขาจะหยิบเข็มเล็กๆ มาจิ้มที่นิ้วนาง เลือดเพียงเสี้ยวเดียวอาบที่ส่วนปลาย เขากะเทาะเข็มลงที่ปากขวดน้ำยา แล้วหยดเลือดก็ไหลลงเข้าไปผสม ชายแก่เริ่มการปรุง เขาเทน้ำในขวดนั้นรวมกับส่วนผสมนาชนิดลงในหม้อ เพียงแค่คนไปไม่กี่ชั่วครู่ ก็เกิดควันพุ่งขึ้นราวกับระเบิด

ชายแก่ตักน้ำในหม้อนั่น แล้วยื่นให้พวกคุณ

“นี่…คือ Pure Potion” เขาบอก “ไม่เก็บค่าทำนะ…ถือซะว่าหัวเชื้อที่ให้มาแทนเป็นค่าตอบแทนละกัน”

“ขอบคุณพระคุณมากค่ะ” หญิงสาวชาวเอลฟ์กล่าว “บุญคุณนี้จะไม่ลืมเลย”

“เอาน่าๆ” ชายแก่ตอบ


ได้รับ

Pure Potion x 1`,
    (values : Values, question_define : QuestionDefine)=>{
        return [
            ...get_default_wizard_shop_choices(values, question_define)
        ]
    },
    (values : Values)=>{
        return [
            ()=>{
                if(!values.get_variables().got_pure_potion.val){
                    values.get_variables().got_pure_potion.val = true
                    values.get_items().pure_potion.val = 1
                }
            }
        ]
    }
)