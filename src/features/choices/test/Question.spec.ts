import { beforeEach, describe, expect, test, vi } from "vitest";
import { Question } from "../Question";
import { Choice } from "../Choice";
import { Condition } from "../Condition";

describe("Question", ()=>{
    let question : Question
    const QUESTION_TXT = "เอาแอปเปิ้ลไหม?"
    const choice1 = new Choice({
                    choice_context: "เอา",
                    conditions: [ 
                        [new Condition(
                            ()=>{
                                return true
                            }
                        )]
                    ],
                    observ_click_choice: [],
                    paths: []
                })
    const choice2 = new Choice({
                    choice_context: "ไม่เอา",
                    conditions: [ 
                        [new Condition(
                            ()=>{
                                return false
                            }
                        )]
                    ],
                    observ_click_choice: [],
                    paths: []
                })
    let expect_showable_choices = [choice1]
    
    beforeEach(()=>{
        question = new Question({
            question_txt: QUESTION_TXT,
            choices: [
                choice1,
                choice2
            ],
            observ_show_questions: []
        })
    })

    describe("get_question_txt", ()=>{
        test("return question text correctly", ()=>{
            expect(question.get_question_txt()).toBe(QUESTION_TXT)
        })
    })

    describe("on_show_question", ()=>{
        test("add observation of show question correctly", ()=>{
            let mockFunction1 = vi.fn()
            let mockFunction2 = vi.fn()
            question.on_show_question(mockFunction1)
            question.on_show_question(mockFunction2)
            let mockArr = [mockFunction1, mockFunction2]
            for(let i=0;i<mockArr.length;i++){
                expect(question['observ_show_questions'][i]).toEqual(mockArr[i])
            }
        })
    })

    describe("signal_show_question", ()=>{
        test("signal to all observation to do something correctly", ()=>{
            let mockFunction1 = vi.fn()
            let mockFunction2 = vi.fn()
            question.on_show_question(mockFunction1)
            question.on_show_question(mockFunction2)
            question.signal_show_question()
            expect(mockFunction1).toBeCalled()
            expect(mockFunction2).toBeCalled()
        })
    })

    describe("get_showable_choice", ()=>{
        test("get all showable choice correctly", ()=>{
            let showable_choices = question.get_showable_choice()
            for(let i=0;i<expect_showable_choices.length;i++){
                expect(showable_choices[i]).toEqual(expect_showable_choices[i])
            }
        })
    })

    describe("set_choices", ()=>{
        test("set choices correctly", ()=>{
            let choice1 = new Choice({
                choice_context : "choice1",
                conditions : [],
                observ_click_choice : [],
                paths : []
            })
            let choice2 = new Choice({
                choice_context : "choice2",
                conditions : [],
                observ_click_choice : [],
                paths : []
            })
            let choices_expect = [choice1, choice2]
            let question = new Question
            question.set_choices(choices_expect)
            expect(question['choices']).toEqual(choices_expect)
        })
    })
})