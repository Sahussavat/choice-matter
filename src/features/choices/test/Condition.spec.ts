import { describe, expect, test } from "vitest";
import { Condition } from "../Condition";

describe("Condition", ()=>{
    const cond_fn = ()=>{
        return true
    }
    let cond = new Condition(cond_fn)
    
    describe("check", ()=>{
        test("return boolean from callable function correctly", ()=>{
            expect(cond.check()).toBe(cond_fn())
        })
    })
})