import { describe, expect, test } from "vitest";
import { CheckCondition } from "../CheckCondition";
import { Condition } from "@/features/choices/Condition";

describe("CheckCondition", ()=>{
    let condition_true : Condition = new Condition(()=>{return true})
    let condition_false : Condition = new Condition(()=>{return false})
    describe("check_cond", ()=>{
        test("return true when only has 1 true condition", ()=>{
            expect(CheckCondition.check_cond(
                [[condition_true]]
            )).toBe(true)
        })

        test("return true when condition is true && true", ()=>{
            expect(CheckCondition.check_cond(
                [[condition_true, condition_true]]
            )).toBe(true)
        })

        test("return false when condition is false && true", ()=>{
            expect(CheckCondition.check_cond(
                [[condition_true, condition_false]]
            )).toBe(false)
        })

        test("return true when condition is false || true", ()=>{
            expect(CheckCondition.check_cond(
                [[condition_true], [condition_false]]
            )).toBe(true)
        })

        test("return true when condition is false && true || true", ()=>{
            expect(CheckCondition.check_cond(
                [[condition_false, condition_true], [condition_true]]
            )).toBe(true)
        })

        test("return true when condition is true || false && true", ()=>{
            expect(CheckCondition.check_cond(
                [[condition_true], [condition_false, condition_true]]
            )).toBe(true)
        })

        test("return false when condition is false && true || false && true", ()=>{
            expect(CheckCondition.check_cond(
                [[condition_false, condition_true], [condition_false, condition_true]]
            )).toBe(false)
        })
    })
})