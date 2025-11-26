import { describe, expect, test } from "vitest";
import { clamp } from "../MathUtill";

describe("MathUtill", ()=>{
    describe("clamp", ()=>{
        test("not change value if inbound", ()=>{
            expect(clamp(5, 0, 10)).toBe(5)
        })

        test("change value to min if under min", ()=>{
            expect(clamp(-5, 0, 10)).toBe(0)
        })

        test("change value to max if above max", ()=>{
            expect(clamp(99, 0, 10)).toBe(10)
        })
    })
})