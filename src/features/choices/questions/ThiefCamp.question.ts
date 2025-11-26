import { Values } from "@/features/values/Values"
import { BuildQuestionObj } from "../BuildQuestionObj"
import { Question } from "../Question"
import { AllQuestions } from "../AllQuestions"
import { QuestionDefine } from "../QuestionDefine"
import { Choice } from "../Choice"
import { Path } from "../Path"
import { Condition } from "../Condition"
import { get_choice_to_enter_ancient } from "./EnterAncient.question"
import { get_random_damge } from "./FightRoll"
import { get_choice_to_goblin_camp } from "./GoblinCamp.question"
import { get_all_choice_to_elf_room } from "./Elf.question"
import { get_all_choices_to_mimic_room } from "./MimicPathToRoom"
import { get_all_choices_to_library } from "./Library.question"
import { get_all_choices_to_mystery_front_room } from "./MysteryRoom.question"
import { get_choice_to_inside_mystery_room } from "./MysteryRoomUnlock.question"
import { get_default_all_choice_in_location, DungeonLocations } from "./DungeonWarp"
import { Constants } from "@/util/Constants"
import { clamp } from "@/util/MathUtill"

export function get_choice_to_thief_camp(values: Values, question_define : QuestionDefine){
    return [
            new Choice({
                choice_context: "[ เดินเข้าไปยังโบราณสถาน ]",
                conditions: [[
                    new Condition(()=>{return !values.get_variables().first_time_thief_camp.val})
                ]],
                observ_click_choice: [()=>{
                        values.get_variables().first_time_thief_camp.val = true
                    }],
                paths:[
                    new Path({
                        path: question_define.get_key(question_define.all_questions.thief_camp_first_time),
                        conditions: []
                    }),
                ]
            }),
            new Choice({
                choice_context: "[ เดินไปยังแคมป์โจร ]",
                conditions: [[
                    new Condition(()=>{return values.get_variables().first_time_thief_camp.val})
                ]],
                observ_click_choice: [()=>{
                        values.get_variables().first_time_thief_camp.val = true
                    }],
                paths:[
                    new Path({
                        path: question_define.get_key(question_define.all_questions.thief_quest_complete1),
                        conditions: [[
                            new Condition(()=>{return values.get_items().thief_body.val > 0})
                        ]]
                    }),
                    new Path({
                        path: question_define.get_key(question_define.all_questions.thief_camp_default_not_killed),
                        conditions: [[
                            new Condition(()=>{return !values.get_variables().thief_camp_killed.val})
                        ]]
                    }),
                    new Path({
                        path: question_define.get_key(question_define.all_questions.theif_camp_default_killed),
                        conditions: [[
                            new Condition(()=>{return values.get_variables().thief_camp_killed.val})
                        ]]
                    }),
                ]
            })
        ]
}

export function get_choice_decision_to_thief_camp(values: Values, question_define : QuestionDefine){
    return [
            new Choice({
                choice_context: "[ เจรจา ]",
                conditions: [],
                observ_click_choice: [()=>{
                        values.get_variables().did_thief_pursuation_success.val = true
                    }],
                paths:[
                    new Path({
                        path: question_define.get_key(question_define.all_questions.thief_persuation_succ1),
                        conditions: []
                    }),
                ]
            }),
            new Choice({
                choice_context: "[ สู้ ]",
                conditions: [],
                observ_click_choice: [()=>{
                    values.get_variables().hp.val 
                    = clamp(values.get_variables().hp.val - get_random_damge(Constants.THIEF_DAMAGE, values), 0,values.get_variables().max_hp.val);
                    values.get_variables().thief_camp_killed.val = true
                }],
                paths:[
                    new Path({
                        path: question_define.get_key(question_define.all_questions.thief_fight_win),
                        conditions: [[
                            new Condition(()=>{return values.get_variables().hp.val > 0})
                        ]]
                    }),
                    new Path({
                        path: question_define.get_key(question_define.all_questions.thief_fight_lose),
                        conditions: [[
                            new Condition(()=>{return values.get_variables().hp.val <= 0})
                        ]]
                    }),
                ]
            }),
        ]
}

export function get_thief_default_choice(values : Values, question_define : QuestionDefine){
    return [
        ...get_default_all_choice_in_location(DungeonLocations.THIEF_CAMP, values, question_define),
        get_choice_to_enter_ancient(values, question_define),
    ]
}

function get_thief_camp_default_question(question_txt : string){
    let thief_camp_class = class EnterAncient extends BuildQuestionObj {
        build(values: Values): Question {
            let all_questions = new AllQuestions
            let question_define = new QuestionDefine(all_questions)
            let question = new Question({
                question_txt: question_txt,
                choices: get_thief_default_choice(values, question_define),
                observ_show_questions: [
                    ()=>{
                        values.get_variables().first_time_thief_camp.val = true
                    }
                ],
            })

            return question
        }
    }
    return thief_camp_class
}

function get_thief_camp_decision_question(question_txt : string){
    let thief_camp_class = class EnterAncient extends BuildQuestionObj {
        build(values: Values): Question {
            let all_questions = new AllQuestions
            let question_define = new QuestionDefine(all_questions)
            let question = new Question({
                question_txt: question_txt,
                choices: get_choice_decision_to_thief_camp(values, question_define),
                observ_show_questions: [
                    ()=>{
                        values.get_variables().first_time_thief_camp.val = true
                    }
                ],
            })

            return question
        }
    }
    return thief_camp_class
}

export let ThiefCampFirstTime = get_thief_camp_decision_question(
    `เมื่อเดินเข้ามายังโบราณสถานได้ไม่นาน คุณก็สังเกตเห็นแสงไฟจากเปลวเพลิงที่อยู่เบื้องหน้า 
    
    เหล่ากลุ่มบุคคลปริศนาหลากหลายชาติพันธุ์ต่างจ้องมองมาที่คุณ ทุกคนมีบาดแผลเต็มตัวและพกอาวุธ

คุณสังเกตมองดูใบหน้าของพวกเขา แล้วความทรงจำหนึ่งก็แว่บเข้ามาในหัว คุณเคยเห็นหน้าของคนพวกนี้ที่บอร์ดประกาศจับมาก่อน

เหล่ากองโจรที่ดูจะอ่านสีหน้าของคุณออก ต่างก็ควักอาวุธขึ้นมาตั้งท่าพร้อมจะสู้



คุณ จะทำอย่างไร

`)

export let ThiefCampDefaultNotKilled = get_thief_camp_default_question(`คุณได้เดินทางกลับมายังสถานที่ที่เหล่ากองโจรกำลังนั่งฟื้นตัวกันอยู่`)

export let ThiefCampDefaultKilled = get_thief_camp_default_question(`คุณได้เดินทางกลับมายังสถานที่ที่คุณได้สังหารเหล่ากองโจรไป`)