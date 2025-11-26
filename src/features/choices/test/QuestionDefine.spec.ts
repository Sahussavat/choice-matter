import { beforeEach, describe, expect, test } from "vitest";
import { BuildQuestionObj } from "../BuildQuestionObj";
import { Values } from "@/features/values/Values";
import { Question } from "../Question";
import { QuestionDefine } from "../QuestionDefine";
import { AllQuestions } from "../AllQuestions";

let question = new Question({
            question_txt: "",
            choices:[],
            observ_show_questions:[],
        })

class MockBuildQuestion extends BuildQuestionObj {
    build(values: Values): Question {
        return question
    }
}

class MockFalseBuildQuestion extends BuildQuestionObj {
    build(values: Values): Question {
        let question = new Question({
            question_txt: "",
            choices:[],
            observ_show_questions:[],
        })
        return question
    }
}

class MockAllQuestion extends AllQuestions {
    mockBuildQuestion = new MockBuildQuestion()
}

describe("QuestionDefine", ()=>{
    let mockAllQuestion : MockAllQuestion
    let questionDefine : QuestionDefine

    beforeEach(()=>{
        mockAllQuestion = new MockAllQuestion
        questionDefine = new QuestionDefine(mockAllQuestion)
    })

    describe("get_key", ()=>{
        test("return string if have data in list", ()=>{
            expect(questionDefine.get_key(mockAllQuestion.mockBuildQuestion)).toBe('mockBuildQuestion')
        })

        test("return null if not have data in list", ()=>{
            expect(questionDefine.get_key(new MockFalseBuildQuestion)).toBe(null)
        })
    })

    describe("build_question", ()=>{
        test("return question if have data in list", ()=>{
            expect(questionDefine.build_question('mockBuildQuestion', new Values))
            .toBe(question)
        })

        test("return null if not have data in list", ()=>{
            expect(questionDefine.build_question('', new Values))
            .toBe(null)
        })
    })
})