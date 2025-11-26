import { Values } from "@/features/values/Values";
import { BuildQuestionObj } from "../BuildQuestionObj";
import { Question } from "../Question";
import { AllQuestions } from "../AllQuestions";
import { QuestionDefine } from "../QuestionDefine";
import { Choice } from "../Choice";
import { Path } from "../Path";
import { RouteName } from "@/router/RouteName";
import { Constants } from "@/util/Constants";
import { ShopDefine } from "@/features/shops/ShopDefine";
import { Condition } from "../Condition";
import { get_choice_to_village } from "./Village.question";
import { get_choice_to_enter_ancient } from "./EnterAncient.question";
import { Define } from "@/util/Define";
import { get_choice_to_pure_potion_talk } from "./PurePotion.question";

export function get_choice_to_wizard_shop(values: Values, question_define : QuestionDefine){
    return new Choice({
                choice_context: "[ ไปร้านขาย Potion ]",
                conditions: [],
                observ_click_choice: [()=>{
                        values.get_variables().first_time_wizard_shop.val = true
                    }],
                paths:[
                    new Path({
                        path: question_define.get_key(question_define.all_questions.wizard_shop_first_time),
                        conditions: [[
                            new Condition(()=>{return !values.get_variables().first_time_wizard_shop.val})
                        ]]
                    }),
                    new Path({
                        path: question_define.get_key(question_define.all_questions.wizard_shop_default),
                        conditions: [[
                            new Condition(()=>{return values.get_variables().first_time_wizard_shop.val})
                        ]]
                    }),
                ]
            })
}

export function get_choice_to_shop_window(values: Values, question_define : QuestionDefine){
    let shop_define = new ShopDefine
    return new Choice({
                choice_context: "[ คลิกเพื่อเปิดหน้าร้านค้า ]",
                conditions: [],
                observ_click_choice: [],
                paths:[
                    new Path({
                        path: question_define.get_key(question_define.all_questions.wizard_shop_done_shopping),
                        define_path: Define.SHOP_PATH
                        +`?${Constants.SHOP_NAME_CONTEXT}=${
                            shop_define.get_key(shop_define.wizard_shop)
                        }`,
                        conditions: []
                    })
                ]
            })
}

export function get_default_wizard_shop_choices(values : Values, question_define : QuestionDefine){
    return [
        get_choice_to_pure_potion_talk(values, question_define),
        get_choice_to_shop_window(values, question_define),
        get_choice_to_village(values, question_define),
        get_choice_to_enter_ancient(values, question_define),
    ]
}

function get_wizard_shop_question(question_txt : string){
    let wizard_shop_class = class WizardShopDefault extends BuildQuestionObj {
        build(values: Values): Question {
            let all_questions = new AllQuestions
            let question_define = new QuestionDefine(all_questions)
            let question = new Question({
                question_txt: question_txt,
                choices: [
                    ...get_default_wizard_shop_choices(values, question_define),
                ],
                observ_show_questions: [
                    ()=>{
                        values.get_variables().first_time_wizard_shop.val = true
                    }
                ],
            })

            return question
        }
    }
    return wizard_shop_class
}

export let WizardShopFirstTime = get_wizard_shop_question(
    `ครั้นเมื่อเดินมาถึงทางตะวันตกของหมู่บ้าน คุณก็ได้พบกับรถม้าแฟนซีที่ถูกปรับแต่งให้เป็นร้านขายของเคลื่อนที่ 
            ภายในตัวรถ มีขวดยามากมายวางโชว์อยู่ทั่ว ที่หลังเคาร์เตอร์ มีชายแก่เผ่าพันธ์ุเอลฟ์ที่ค่อนข้างจะมีอายุราวหลายพันปี 
            กำลังนั่งอ่านหนังสือปรุงยาสมัยใหม่อย่างใจจดใจจ่อ ก่อนจะสะดุ้งเมื่อรู้ตัวว่ามีลูกค้าเข้ามาแล้ว

“อ้าว! โทษทีๆ …ไอ้เราก็แก่แล้วก็ไม่ทันสังเกต” ชายแก่เอลฟ์หัวเราะ

“เอาล่ะ….อยากจะซื้ออะไรงั้นรึ?”`)

export let WizardShopDefault = get_wizard_shop_question(`คุณได้กลับมาที่ร้านขายยา Potion อีกครั้งหนึ่ง

    "อา...ยินดีต้อนรับ" ชายแก่ชาวเอลฟ์กล่าวทักทาย "จะซื้ออะไรดีล่ะ"`)

export let WizardShopDoneShopping = get_wizard_shop_question(`"อยากได้อะไรอีกไหม?" ชายแก่ชาวเอลฟ์ถาม`)