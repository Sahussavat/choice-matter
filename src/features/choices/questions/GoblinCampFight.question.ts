import { Values } from "@/features/values/Values"
import { create_end_simple_choice, get_simple_talk_question } from "./SimpleTalk.question"
import { QuestionDefine } from "../QuestionDefine"
import { get_thief_default_choice } from "./ThiefCamp.question"

export let GoblinCampFightLose = get_simple_talk_question(
    `คุณได้พยายามจะต่อกรกับพวกก็อบลิน แต่ความสามารถของคุณก็ไม่มากพอที่จะสู้กับศัตรูที่มีจำนวนเยอะกว่าได้
    
    ศีรษะของคุณได้ถูกตัดออกจากบ่า แล้วร่างของคุณได้ก็ล้มนอนลง...กลายเป็นซากศพที่ถูกทิ้งไว้ภายในโบราณสถานแห่งนี้`, 
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

export let GoblinCampFightWin = get_simple_talk_question(
    `คุณได้ต่อกรกับพวกก็อบลิน แล้วสังหารพวกมันทุกตัวจนหมด [ได้รับกระดูกก็อบลิน x 3]`, 
    (values : Values, question_define : QuestionDefine)=>{    
        return [
            ...get_thief_default_choice(values, question_define)
        ]
    }, (values : Values)=>{
        return [
            ()=>{
                get_goblin_item(values)
                values.get_variables().goblin_killed.val = true
            },
        ]
    }
)