import { Values } from "@/features/values/Values";
import { BuildQuestionObj } from "../BuildQuestionObj";
import { Question } from "../Question";
import { Choice } from "../Choice";
import { Path } from "../Path";
import { QuestionDefine } from "../QuestionDefine";
import { AllQuestions } from "../AllQuestions";

export class Apple extends BuildQuestionObj {
    build(values: Values): Question {
        let all_questions = new AllQuestions
        let question_define = new QuestionDefine(all_questions)
        let question = new Question({
            question_txt: "เอาแอปเปิ้ลไหม",
            choices: [
                new Choice({
                    choice_context: "เอาๆ",
                    conditions: [],
                    observ_click_choice: [],
                    paths:[
                        new Path({
                            path: question_define.get_key(all_questions.apple_question),
                            conditions: []
                        })
                    ]
                }),
                new Choice({
                    choice_context: "ไม่เอาๆ",
                    conditions: [],
                    observ_click_choice: [],
                    paths:[
                        new Path({
                            path: question_define.get_key(all_questions.apple_question),
                            conditions: []
                        })
                    ]
                }),
            ],
            observ_show_questions: [],
        })

        return question
    }
}