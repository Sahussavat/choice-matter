import { Values } from "@/features/values/Values";
import { BuildQuestionObj } from "../BuildQuestionObj";
import { Choice } from "../Choice";
import { Condition } from "../Condition";
import { Path } from "../Path";
import { Question } from "../Question";
import { AllQuestions } from "../AllQuestions";
import { QuestionDefine } from "../QuestionDefine";
import { create_simple_choice, get_simple_talk_question } from "./SimpleTalk.question";
import { get_choice_fight_mimic, get_choice_stealth_kill_mimic } from "./MimicFight.question";
import { get_choice_to_thief_camp } from "./ThiefCamp.question";
import { get_all_choice_to_elf_room } from "./Elf.question";
import { get_dice_result, roll_dice } from "./RollDice";
import { get_all_choices_to_library } from "./Library.question";
import { get_all_choices_to_mystery_front_room } from "./MysteryRoom.question";
import { get_choice_to_inside_mystery_room } from "./MysteryRoomUnlock.question";
import { DungeonLocations, get_default_all_choice_in_location } from "./DungeonWarp";

function get_choice_check_mimic_alone(values : Values, question_define : QuestionDefine){
    return new Choice({
        choice_context: `[ ลองตรวจสอบดู ]`,
        conditions: [[
            new Condition(()=>{
                return !values.get_variables().checked_mimic_alone.val
                && !values.get_variables().elf_joined_party.val
                && !values.get_variables().halfling_joined_party.val
                && !values.get_variables().opend_mimic.val
            })
        ]],
        observ_click_choice: [()=>{
            roll_dice(values)
        }],
        paths: [
            new Path({
                path: question_define.get_key(question_define.all_questions.mimic_identify_succ),
                conditions: [[
                    new Condition(()=>{
                        return get_dice_result(values) * 100 > 50
                    })
                ]],
            }),
            new Path({
                path: question_define.get_key(question_define.all_questions.mimic_identify_fail),
                conditions: [[
                    new Condition(()=>{
                        return get_dice_result(values) * 100 <= 50
                    })
                ]],
            }),
        ],
    })
}

function get_choice_open_mimic_chest(values : Values, question_define : QuestionDefine){
    return new Choice({
        choice_context: `[ ลองเปิดดู ]`,
        conditions: [[
            new Condition(()=>{
                return !values.get_variables().elf_joined_party.val
                && !values.get_variables().halfling_joined_party.val
                && !values.get_variables().known_its_mimic.val
                && !values.get_variables().opend_mimic.val
            })
        ]],
        observ_click_choice: [],
        paths: [
            new Path({
                path: question_define.get_key(question_define.all_questions.mimic_open_chest),
                conditions: [],
            })
        ]
    })
}

export function get_mimic_default_choice(values : Values, question_define : QuestionDefine){
    return [
        get_choice_check_mimic_alone(values, question_define),
        get_choice_open_mimic_chest(values, question_define),
        get_choice_stealth_kill_mimic(values, question_define),
        ...get_default_all_choice_in_location(DungeonLocations.MIMIC, values, question_define),
    ]
}

function get_mimic_identify_question_success(){
    let mimic_identify_succ_class = class EnterAncient extends BuildQuestionObj {
            build(values: Values): Question {
                let all_questions = new AllQuestions
                let question_define = new QuestionDefine(all_questions)
                let question = new Question({
                    question_txt: `ด้วยความที่คุณมีความรู้เกี่ยวกับ Mimic มาพอควร คุณจึงลองตรวจสอบกล่องนี้อย่างระมัดระวัง 
                    
                    จนเมื่อใช้เวลาดูอยู่สักพักใหญ่ คุณก็ได้ข้อสรุปว่ากล่องนี้น่าจะเป็นเจ้าสิ่งมีชีวิตนั้นเป็นแน่`,
                    choices: [
                        ...get_mimic_default_choice(values, question_define)
                    ],
                    observ_show_questions: [
                        ()=>{
                            values.get_variables().known_its_mimic.val = true
                            values.get_variables().checked_mimic_alone.val = true
                        }
                    ],
                })
    
                return question
            }
        }
    return mimic_identify_succ_class
}

function get_mimic_identify_question_fail(){
    let mimic_identify_fail_class = class EnterAncient extends BuildQuestionObj {
            build(values: Values): Question {
                let all_questions = new AllQuestions
                let question_define = new QuestionDefine(all_questions)
                let question = new Question({
                    question_txt: `คุณได้ลองตรวจสอบกล่องที่อยู่ตรงหน้าดู แต่ก็ไม่พบอะไรที่ผิดปกติ`,
                    choices: [
                        ...get_mimic_default_choice(values, question_define)
                    ],
                    observ_show_questions: [
                        ()=>{
                            values.get_variables().checked_mimic_alone.val = true
                        }
                    ],
                })
    
                return question
            }
        }
    return mimic_identify_fail_class
}

export let MimicIdentifySucc = get_mimic_identify_question_success()
export let MimicIdentifyFail = get_mimic_identify_question_fail()
export let MimicOpenChest = get_simple_talk_question(`ด้วยความอยากรู้อยากเห็น คุณจึงได้ลองเปิดกล่องนั้นเพื่อดูว่ามีอะไรอยู่ข้างใน แล้วเมื่อฝามันได้อ้าออก 
    
    คุณได้พบว่าภายในของกล่องนั้นคือฟันอันแหลมคมและลิ้นขนาดใหญ่ คุณรับรู้ได้ทันทีว่ามันคือตัวอะไร ทันใดนั้น 
    
    เจ้ากล่องที่มีชีวิตก็ตวัดลิ้นใส่คุณเพื่อหวังจะรัดคอ แต่คุณก็ไหวตัวและหลบทัน`,
(values : Values, question_define : QuestionDefine)=>{
    return [
        get_choice_fight_mimic(values, question_define)
    ]
})