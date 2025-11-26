import { beforeEach, describe, expect, test, vi } from "vitest";
import { Validate } from "../Validate";
import { ErrorTexts } from "../ErrorTexts";

describe("Validate", ()=>{
    describe("reset",()=>{
        test("reset values correctly", ()=>{
            let validate = new Validate(0)
            validate['is_pass'] = false
            validate['err_texts'] = ['somethin']
            validate['v'] = 'h'
            validate.reset()
            expect(validate['is_pass']).toBe(true)
            expect(validate['err_texts'].length).toBe(0)
            expect(validate['v']).toBe(null)
        })
    })

    describe("get_result", ()=>{
        test("get result correctly", ()=>{
            let validate = new Validate(0)
            let error_txt = 'somethin'
            let pass = false
            validate['is_pass'] = pass
            validate['err_texts'] = [ error_txt ]
            vi.spyOn(validate, "reset")
            let res = validate.get_result()
            expect(res.is_pass).toBe(pass)
            expect(res.err_texts[0]).toBe(error_txt)
            expect(validate.reset).toBeCalled()
        })
    })

    describe("calc_cond", ()=>{
            test("sum all boolean condition and gather all error correctly",()=>{
                let validate = new Validate(0)
                let error_txt = 'somethin'
                let error_txt2 = 'somethin2'
                let pass = false
                validate.calc_cond({
                    is_pass: pass,
                    err_texts: [error_txt, error_txt2]
                })
                let res = validate.get_result()
                expect(res.is_pass).toBe(pass)
                expect(res.err_texts[0]).toBe(error_txt)
                expect(res.err_texts[1]).toBe(error_txt2)
            })
    })

    describe("is_not_null", ()=>{
        test("return true if not null", ()=>{
            let res = new Validate("hello").is_not_null().get_result()
            expect(res.is_pass).toBe(true)
            expect(res.err_texts.length).toBe(0)
        })

        test("return false and error text if null", ()=>{
            let res = new Validate("").is_not_null().get_result()
            expect(res.is_pass).toBe(false)
            expect(res.err_texts[0]).toBe(ErrorTexts.NOT_NULL)
            res = new Validate(null).is_not_null().get_result()
            expect(res.is_pass).toBe(false)
            expect(res.err_texts[0]).toBe(ErrorTexts.NOT_NULL)
        })
    })

    describe("is_under_max_str_length", ()=>{
        test("return true if under max string length", ()=>{
            let res = new Validate("hello").is_under_max_str_length(99).get_result()
            expect(res.is_pass).toBe(true)
            expect(res.err_texts.length).toBe(0)
        })

        test("return false and error text if null", ()=>{
            let max_len = 1
            let res = new Validate("hello").is_under_max_str_length(max_len).get_result()
            expect(res.is_pass).toBe(false)
            expect(res.err_texts[0]).toBe(ErrorTexts.MAX_STRING_len
                .replace(ErrorTexts.REPLACE_S, max_len.toString() ))
        })
    })

    describe("is_not_have_this_name", ()=>{
        test("return true if not already have this name", ()=>{
            let name = "name1"
            let name_checklist = [name]
            let res = new Validate(name+2).is_not_have_this_name(name_checklist)
            .get_result()
            expect(res.is_pass).toBe(true)
            expect(res.err_texts.length).toBe(0)
        })

        test("return false and error text if already have this name", ()=>{
            let name = "name1"
            let name_checklist = [name]
            let res = new Validate(name).is_not_have_this_name(name_checklist)
            .get_result()
            expect(res.is_pass).toBe(false)
            expect(res.err_texts[0]).toBe(ErrorTexts.ALREADY_HAVE_THIS_NAME)
        })
    })

    describe("custome_check", ()=>{
        test("return true when pass condition", ()=>{
            let err_txt = "error"
            let res = new Validate(1).custome_check(true, err_txt).get_result()
            expect(res.is_pass).toBe(true)
            expect(res.err_texts.length).toBe(0)
        })

        test("return false and errors when not pass condition", ()=>{
            let err_txt = "error"
            let res = new Validate(1).custome_check(false, err_txt).get_result()
            expect(res.is_pass).toBe(false)
            expect(res.err_texts[0]).toBe(err_txt)
        })
    })

    describe("combine condition", ()=>{
        test("must return false and errors when combine true and false and false", ()=>{
            let max_len = 1
            let name = "name1"
            let name_checklist = [name]
            let res = new Validate(name)
            .is_under_max_str_length(max_len)
            .is_not_have_this_name(name_checklist)
            .get_result()
            expect(res.is_pass).toBe(false)
            expect(res.err_texts[0]).toBe(ErrorTexts.MAX_STRING_len
                .replace(ErrorTexts.REPLACE_S, max_len.toString() ))
            expect(res.err_texts[1]).toBe(ErrorTexts.ALREADY_HAVE_THIS_NAME)
        })
    })
})