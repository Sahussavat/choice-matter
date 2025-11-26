import { Values } from "@/features/values/Values"
import { QuestionDefine } from "../QuestionDefine"
import { get_simple_talk_question } from "./SimpleTalk.question"
import { Choice } from "../Choice"
import { Path } from "../Path"
import { Condition } from "../Condition"
import { get_choice_to_conclude_player } from "./ConclusionPlayer.question"

export let ThiefConcludeAllDied = get_simple_talk_question(`ถึงแม้โบราณสถานจะได้กลับมาเป็นปกติ แต่ลมหายใจของเหล่ากองโจรก็ไม่อาจจะหวนคืนกลับมาได้อีก

ร่างของพวกเขาได้ถูกทิ้งเอาไว้ที่นี่

รอคอยให้พวกสัตว์ที่ผ่านมาได้กัดกินซากที่ยังเหลืออยู่นี้`,
    (values : Values, question_define : QuestionDefine)=>{
        return [
            get_choice_to_conclude_player(values, question_define)
        ]
    }
)

export let ThiefConcludeNotHelp = get_simple_talk_question(`เมื่อโบราณสถานได้กลับมาเงียบสงบลง หัวหน้ากองโจรและเหล่าสมาชิกก็ได้ตัดสินใจที่จะย้อนกลับเข้าไปข้างในเพื่อตามหาสมาชิกที่หายไปตัว จนกระทั่งพวกเขาก็ได้พบร่างนั้นที่นอนตายอยู่ ณ ห้องโถงที่เต็มไปด้วยชั้นหนังสือ

เหล่าสมาชิกต่างวิ่งเข้าไปกอดร่างนั้น พวกเขาร้องไห้ เศร้าเสียใจจากการจากไปของสหาย

หัวหน้ากองโจรกัดฟัน เขานึกโทษตัวเองที่พาพวกพ้องมาเสี่ยงอันตรายที่นี่ ก่อนที่หนึ่งในสมาชิกจะมาแตะที่ไหล่เขา แล้วยิ้มให้อย่างปลอบประโลม

ใบหน้าของชายหนุ่มชาวฮาร์ฟลิ่งที่กำลังเศร้าสร้อย ค่อยๆยิ้มขึ้นพร้อมพยักหน้าเบาๆ

ไม่นานนัก พวกเขาก็ได้ห่อศพที่เสียชีวิตเสร็จ แล้วได้แบกร่างอันไร้วิญญาณออกไปจากโบราณสถาน

เพื่อที่จะเตรียมนำไปทำพิธีศพ ณ ที่ใดสักแห่งหนึ่งที่ไม่ใช่ที่นี่`,
    (values : Values, question_define : QuestionDefine)=>{
        return [
            get_choice_to_conclude_player(values, question_define)
        ]
    }
)

export let ThiefConcludeHelp = get_simple_talk_question(`หลังจากเรื่องราวได้จบลง คุณกับหัวหน้ากองโจรก็ได้บอกลากัน ก่อนที่เขาจะแยกกลับไปหาเหล่าพวกพ้องของเขา

พอมาถึงแคมป์ เหล่าสมาชิกก็ได้เตรียมตัวพร้อมที่จะออกไปจากโบราณสถานนี้แล้ว

หัวหน้ากองโจรมองศพที่ถูกห่อเอาไว้อย่างดีด้วยใบหน้าที่เศร้าสร้อย เขาพูดสัญญากับร่างอันไร้วิญญาณ

ว่าจะจัดพิธีศพและหาที่ที่ดีที่สุด ที่สหายเก่าของเขาจะได้นอนพักอย่างสงบ



แล้วเหล่ากองโจรก็ได้เดินออกจากโบราณสถานไป`,
    (values : Values, question_define : QuestionDefine)=>{
        return [
            get_choice_to_conclude_player(values, question_define)
        ]
    }
)

export function get_choice_to_conclude_halfling(values : Values, question_define : QuestionDefine){
    return new Choice({
        choice_context: `[ ต่อไป ]`,
        conditions: [],
        observ_click_choice: [],
        paths: [
            new Path({
                path: question_define.get_key(question_define.all_questions.thief_conclude_all_died),
                conditions: [[
                    new Condition(()=>{
                        return values.get_variables().thief_camp_killed.val
                    })
                ]],
            }),
            new Path({
                path: question_define.get_key(question_define.all_questions.thief_conclude_not_help),
                conditions: [[
                    new Condition(()=>{
                        return !values.get_variables().thief_camp_killed.val
                        && !values.get_variables().halfling_joined_party.val
                    })
                ]],
            }),
            new Path({
                path: question_define.get_key(question_define.all_questions.thief_conclude_help),
                conditions: [[
                    new Condition(()=>{
                        return !values.get_variables().thief_camp_killed.val
                        && values.get_variables().halfling_joined_party.val
                    })
                ]],
            }),
        ]
    })
}