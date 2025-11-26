import { describe, expect, test } from "vitest";
import { ValidateFn } from "../ValidateFn";
import { ErrorTexts } from "../ErrorTexts";

describe("ValidateFn", ()=>{
    describe("check", ()=>{
        test("return true and no error texts when pass condition", ()=>{
            let error_text = "error"
            let res = ValidateFn.check(true, error_text)
            expect(res.is_pass).toBe(true)
            expect(res.err_texts.length).toBe(0)
        })

        test("return false and error texts when not pass condition", ()=>{
            let error_text = "error"
            let res = ValidateFn.check(false, error_text)
            expect(res.is_pass).toBe(false)
            expect(res.err_texts[0]).toBe(error_text)
        })

        test("return false and no error texts when not pass condition but not define error text"
            , ()=>{
                let res = ValidateFn.check(false)
                expect(res.is_pass).toBe(false)
                expect(res.err_texts.length).toBe(0)
            }
        )
    })

    describe("is_not_null", ()=>{
        test("return true if not null", ()=>{
            let v = "yo"
            let res = ValidateFn.is_not_null(v)
            expect(res.is_pass).toBe(true)
            expect(res.err_texts.length).toBe(0)
        })

        test("return false and error text if null", ()=>{
            let v = null
            let res = ValidateFn.is_not_null(v)
            expect(res.is_pass).toBe(false)
            expect(res.err_texts[0]).toBe(ErrorTexts.NOT_NULL)
        })
    })

    describe("is_under_max_str_length", ()=>{
        test("return true if under or equal max length", ()=>{
            let max_len = 5
            let v1 = "สสส"
            let v2 = "สสสสส"
            let res = ValidateFn.is_under_max_str_length(v1, max_len)
            expect(res.is_pass).toBe(true)
            expect(res.err_texts.length).toBe(0)
            res = ValidateFn.is_under_max_str_length(v2, max_len)
            expect(res.is_pass).toBe(true)
            expect(res.err_texts.length).toBe(0)
        })

        test("return true if value is not string", ()=>{
            let max_len = 5
            let res = ValidateFn.is_under_max_str_length(5, max_len)
            expect(res.is_pass).toBe(true)
            expect(res.err_texts.length).toBe(0)
        })

        test("return false and error text if over max length", ()=>{
            let max_len = 5
            let v = "สสสสสสสสสสสสสสสสสส"
            let res = ValidateFn.is_under_max_str_length(v, max_len)
            expect(res.is_pass).toBe(false)
            expect(res.err_texts[0]).toBe(ErrorTexts.MAX_STRING_len
                .replace(ErrorTexts.REPLACE_S, max_len.toString()))
        })
    })

    describe("is_not_have_this_name", ()=>{
        test("return true if not already have this name", ()=>{
            let name = 'name1'
            let name_checklist = [ name ]
            let res = ValidateFn.is_not_have_this_name(name+2, name_checklist)
            expect(res.is_pass).toBe(true)
            expect(res.err_texts.length).toBe(0)
        })

        test("return true if value is not string", ()=>{
            let res = ValidateFn.is_not_have_this_name(2, ['name1'])
            expect(res.is_pass).toBe(true)
            expect(res.err_texts.length).toBe(0)
        })

        test("return false and error text if already have this name", ()=>{
            let name = 'name1'
            let name_checklist = [ name ]
            let res = ValidateFn.is_not_have_this_name(name, name_checklist)
            expect(res.is_pass).toBe(false)
            expect(res.err_texts[0]).toBe(ErrorTexts.ALREADY_HAVE_THIS_NAME)
        })
    })
})