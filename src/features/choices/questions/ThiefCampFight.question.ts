import { Values } from "@/features/values/Values"
import { create_end_simple_choice, get_simple_talk_question } from "./SimpleTalk.question"
import { QuestionDefine } from "../QuestionDefine"
import { get_thief_default_choice } from "./ThiefCamp.question"

export let ThiefCampFightLose = get_simple_talk_question(
    `คุณได้พยายามจะต่อกรกับพวกโจร แต่ความสามารถของคุณก็ไม่มากพอที่จะสู้กับศัตรูที่มีจำนวนเยอะกว่าได้
    
    ศีรษะของคุณได้ถูกตัดออกจากบ่า แล้วร่างของคุณได้ก็ล้มนอนลง...กลายเป็นซากศพที่ถูกทิ้งไว้ภายในโบราณสถานแห่งนี้`, 
    (values : Values, question_define : QuestionDefine)=>{    
        return [
            create_end_simple_choice(`[ จบ ]`),
        ]
    }
)

export let ThiefCampFightWin = get_simple_talk_question(
    `คุณได้ต่อกรกับพวกกองโจร แล้วสังหารพวกมันทุกคนจนหมด
    
    
    คุณได้รับ

    ชะแลง x 1`, 
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