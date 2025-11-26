import { Values } from "@/features/values/Values"
import { Choice } from "../Choice"
import { BuildQuestionObj } from "../BuildQuestionObj"
import { Question } from "../Question"
import { Path } from "../Path"
import { QuestionDefine } from "../QuestionDefine"
import { RouteName } from "@/router/RouteName"
import { Define } from "@/util/Define"

export function create_simple_choice(choice_txt : string, choice_target : BuildQuestionObj, values : Values,
    question_define : QuestionDefine,
    obs_click_fns? : (values: Values)=>CallableFunction[]
) : Choice {
    return new Choice({
        choice_context: choice_txt,
        observ_click_choice: obs_click_fns ? obs_click_fns(values) : [],
        paths: [
            new Path({
                path: question_define.get_key(choice_target),
                conditions: [],
            })
        ],
        conditions: []
    })
}

export function create_end_simple_choice(choice_txt : string) : Choice {
    return new Choice({
        choice_context: choice_txt,
        observ_click_choice: [],
        paths: [
            new Path({
                path: RouteName.HOMEPAGE,
                define_path: Define.CREATE_CHAR_PATH,
                conditions: [],
            })
        ],
        conditions: []
    })
}

export function get_simple_talk_question(question_txt : string, 
        choices_create_fns : (values: Values, question_define : QuestionDefine)=>Choice[],
        obs_question_fns? : (values: Values)=>CallableFunction[]){
    let simple_talk_class = class EnterAncient extends BuildQuestionObj {
        build(values: Values): Question {
            let question = new Question({
                question_txt: question_txt,
                choices: choices_create_fns(values, new QuestionDefine()),
                observ_show_questions: obs_question_fns ? obs_question_fns(values) : [],
            })

            return question
        }
    }
    return simple_talk_class
}