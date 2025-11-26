import { describe, expect, test } from "vitest";
import { CheckNumber } from "../CheckNumber";

describe("CheckNumber", ()=>{
    describe("is_number", ()=>{
        test("return true if string is number",()=>{
            expect(CheckNumber.is_number("1")).toBe(true)
        })

        test("return false if string is not number",()=>{
            expect(CheckNumber.is_number("word")).toBe(false)
        })

        test("return true if number is number",()=>{
            expect(CheckNumber.is_number(1)).toBe(true)
        })
    })
})