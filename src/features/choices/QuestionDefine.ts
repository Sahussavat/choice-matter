import { GetKeyByObj } from "@/util/GetKeyByObj"
import { Values } from "../values/Values"
import { AllQuestions } from "./AllQuestions"
import { BuildQuestionObj } from "./BuildQuestionObj"
import { Question } from "./Question"

export class QuestionDefine {
    all_questions : AllQuestions

    constructor(all_questions = new AllQuestions){
        this.all_questions = all_questions
    }

    get_key(val : BuildQuestionObj) : string | null{
        return GetKeyByObj.get_key(val, this.all_questions)
    }

    build_question(question_name : string, values : Values) : Question | null{
        let res_question : Question | null = null
        if (question_name in this.all_questions 
            && this.all_questions[question_name] instanceof BuildQuestionObj) {
            let build_question = this.all_questions[question_name]
            res_question = build_question.build(values)
        }
        return res_question
    }
}