import { Values } from "@/features/values/Values"
import { QuestionDefine } from "../QuestionDefine"
import { get_simple_talk_question } from "./SimpleTalk.question"
import { Choice } from "../Choice"
import { Path } from "../Path"
import { Condition } from "../Condition"
import { get_choice_to_conclude_halfling } from "./ConclusionHalfling.question"

export let ElfConcludeLoseAll = get_simple_talk_question(`หญิงสาวชาวเอลฟ์ที่บาดเจ็บจากการถูกสัตว์ร้ายโจมตี ตอนนี้ดวงตาของเธอเริ่มจะปิดลงทุกที เธอพยายามอ้อนวอนต่อองค์เทพ ขอให้อย่างน้อยได้มีชีวิตมากพอให้รู้ชะตากรรมว่าเกิดอะไรขึ้นกับพี่ชายของเธอ ได้รู้ว่าเขายังมีชีวิตหรือตายไปแล้ว

หรืออย่างน้อยก็ขอให้ได้เห็นใบหน้าสุดท้ายของเขา ก่อนที่ลมหายใจสุดท้ายของเธอจะหมดไป



แต่มันก็ไม่ทันแล้ว`,
    (values : Values, question_define : QuestionDefine)=>{
        return [
            get_choice_to_conclude_halfling(values, question_define)
        ]
    }
)

export let ElfConcludeDestroyButSurvive = get_simple_talk_question(`หลังจากที่คุณได้ทำลายเครื่องจักรนั้น โบราณสถานก็กลับมาดูเงียบสงบลง ภารกิจของคุณได้เสร็จสิ้น แต่หญิงสาวชาวเอลฟ์ก็ยังคงไม่ได้คำตอบว่าเกิดอะไรขึ้นกับพี่ชายของตนเอง

พวกคุณได้บอกลากัน ก่อนที่จะแยกกันไปคนละทาง



ไม่นานนัก หญิงสาวก็ได้พบเข้ากับห้องวิจัยที่อยู่ระหว่างทางก่อนที่จะถึงห้องทำพิธี เธอได้พบกับบันทึกหนึ่งบนโต๊ะที่เขียนด้วยภาษาเอลฟ์ พอหญิงสาวได้อ่านเนื้อหาข้างใน ดวงตาของเธอก็ยิ่งเบิกกว้างขึ้น แล้วน้ำตาก็ไหลออกมา`,
    (values : Values, question_define : QuestionDefine)=>{
        return [
            get_choice_to_conclude_halfling(values, question_define)
        ]
    }
)

export let ElfConcludeLoseOne = get_simple_talk_question(`หลังจากที่หญิงสาวได้เสียสละชีวิต บริเวณโดยรอบโบราณสถานก็เงียบสงบลง จะเว้นก็แต่เสียงร้องไห้ของผู้เป็นพี่ชายที่กำลังกอดร่างอันไร้วิญญาณของน้องสาวตนเองเอาไว้

พอเขาเริ่มจะสงบสติอารมณ์ คุณก็ได้เข้าไปปลอบประโลมชายหนุ่มแล้วบอกคำพูดสุดท้ายที่เธอฝากให้เขา

คุณได้กล่าวขอโทษที่เรื่องมันต้องมาจบลงอย่างนี้ แต่ยาร์นาก็ส่ายหัว แล้วบอกกับคุณว่าเขาเข้าใจว่ามันจำเป็น



เมื่อบทสนทนาได้จบลง ชายหนุ่มชาวเอลฟ์ก็ได้บอกลาคุณ แล้วแบกร่างของยาร์ราออกไปจากโบราณสถาน`,
    (values : Values, question_define : QuestionDefine)=>{
        return [
            get_choice_to_conclude_halfling(values, question_define)
        ]
    }
)

export let ElfConcludeHelpAll = get_simple_talk_question(`หลังจากเรื่องราวทั้งหมดได้จบลง บริเวณโดยรอบโบราณสถานก็ดูสงบลง ราวกับพวกสิ่งมีชีวิตอันตรายพวกนั้นได้หายกลับไปเป็นปกติแล้ว

สองพี่น้องเอลฟ์ต่างก็ขอบคุณคุณที่ได้ช่วยให้พวกเขาได้กลับมาเจอกันอีกครั้ง 

คุณเพียงแต่ยิ้มให้กับพวกเขา แล้วมองดูทั้งสองพี่น้องได้พูดคุยกันอย่างสนุกสนานหลังจากที่ไม่ได้เจอหน้ากันมาอย่างยาวนาน



พวกคุณได้บอกลากัน ก่อนที่ยาร์นากับยาร์ราจะเดินออกจากโบราณสถานไป`,
    (values : Values, question_define : QuestionDefine)=>{
        return [
            get_choice_to_conclude_halfling(values, question_define)
        ]
    }
)

export function get_choice_to_conclude_elf(values : Values, question_define : QuestionDefine){
    return new Choice({
        choice_context: `[ ต่อไป ]`,
        conditions: [],
        observ_click_choice: [],
        paths: [
            new Path({
                path: question_define.get_key(question_define.all_questions.elf_conclude_lose_all),
                conditions: [[
                    new Condition(()=>{
                        return !values.get_variables().elf_joined_party.val
                    })
                ]],
            }),
            new Path({
                path: question_define.get_key(question_define.all_questions.elf_destroy_but_survive),
                conditions: [[
                    new Condition(()=>{
                        return values.get_variables().elf_joined_party.val
                        && values.get_variables().ritual_destroyed.val
                    })
                ]],
            }),
            new Path({
                path: question_define.get_key(question_define.all_questions.elf_conclude_lose_one),
                conditions: [[
                    new Condition(()=>{
                        return values.get_variables().elf_joined_party.val
                        && values.get_variables().ritual_elf_dead.val
                    })
                ]],
            }),
            new Path({
                path: question_define.get_key(question_define.all_questions.elf_conclude_help_all),
                conditions: [[
                    new Condition(()=>{
                        return values.get_variables().elf_joined_party.val
                        && values.get_variables().ritual_end_pure_potion.val
                    })
                ]],
            }),
        ]
    })
}