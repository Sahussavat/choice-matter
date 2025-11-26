import { beforeEach, describe, expect, test, vi } from "vitest";
import { is_value_obj, Values } from "../Values";

describe("Value", ()=>{
    let target_v
    
    beforeEach(()=>{
        target_v = new Values
    })

    describe("set_all_vals", ()=>{
        test("set all values in case value is json, correctly", ()=>{
            const VAL = "something"
            let v = {
                something: {
                    val: VAL
                }
            }
            target_v.get_items()['something'] = {
                val: 0
            }
            target_v.set_all_vals(v)
            expect(target_v.get_items()['something'].val).toBe(VAL)
        })

        test("set all values in case value is not json, correctly", ()=>{
            const VAL = "something"
            let v = {
                something: VAL
            }
            target_v.get_items()['something'] = {
                val: 0
            }
            target_v.set_all_vals(v)
            expect(target_v.get_items()['something'].val).toBe(VAL)
        })

        test("all values is still the same object even change value", ()=>{
            const VAL = "something"
            let v = {
                something: VAL
            }
            let obj = {
                something: {
                    val: 0
                }
            }
            target_v.get_items()['something'] = obj
            target_v.set_all_vals(v)
            expect(target_v.get_items()['something']).toEqual(obj)
            expect(target_v.get_items()['something'].val).toBe(VAL)
        })
    })

    describe("assign_to_value", ()=>{
        test("assign value to object in json case, correctly", ()=>{
            const VAL = "something"
            let v = {
                something: {
                    val: VAL
                }
            }
            target_v.get_items()['something'] = {
                val: 0
            }
            target_v.assign_to_value(target_v.get_items()['something'], v.something)
            expect(target_v.get_items()['something'].val).toBe(VAL)
        })

        test("assign value to object in not json case, correctly", ()=>{
            const VAL = "something"
            let v = {
                something: VAL
            }
            target_v.get_items()['something'] = {
                val: 0
            }
            target_v.assign_to_value(target_v.get_items()['something'], v.something)
            expect(target_v.get_items()['something'].val).toBe(VAL)
        })
    })

    describe("is_value_obj", ()=>{
        test("return true if it's value object", ()=>{
            let v = {
                val: "something"
            }
            expect(is_value_obj(v)).toBe(true)
        })

        test("return false if it's not value object", ()=>{
            let v1 = 'bob'
            expect(is_value_obj(v1)).toBe(false)
            let v2 = {
                something: 'something'
            }
            expect(is_value_obj(v2)).toBe(false)
        })
    })

    describe("get_all_pure_value", ()=>{
        test("get all pure values correctly", ()=>{
            let v1 = {
                val: 'something1'
            }
            let v2 = {
                val: 'something2'
            }
            target_v.get_items()['something1'] = v1
            target_v.get_variables()['something2'] = v2
            let expect_v = {
                ...target_v.get_items(),
                ...target_v.get_variables(),
            }
            let pure_v = target_v.get_all_pure_value()
            Object.keys(expect_v).forEach(key => {
                expect(pure_v[key]).toBe(expect_v[key].val)
            })
        })
    })

    describe("get_pure_value", ()=>{
        test("get all pure values correctly", ()=>{
            let v1 = {
                val: 'something1'
            }
            let v2 = {
                val: 'something2'
            }
            let expect_res = {
                something1: v1.val,
                something2: v2.val
            }
            let mockVals = {
                something1: v1,
                something2: v2
            }
            let pure_v = target_v.get_pure_value(mockVals)
            Object.keys(expect_res).forEach(key => {
                expect(pure_v[key]).toBe(expect_res[key])
            })
        })
    })

    describe("get_items",()=>{
        test("return items correctly",()=>{
            expect(target_v.get_items()).toBe(target_v['items'])
        })
    })

    describe("get_variables",()=>{
        test("return variables correctly",()=>{
            expect(target_v.get_variables()).toBe(target_v['variables'])
        })
    })

    describe("on_update",()=>{
        test("add observer on update correctly",()=>{
            let fn1 = vi.fn()
            let fn2 = vi.fn()
            let expect_res = [fn1, fn2]
            target_v.on_update(fn1)
            target_v.on_update(fn2)
            let test_res = target_v['observ_update']
            for(let i=0;i<test_res.length;i++){
                expect(test_res[i]).toEqual(expect_res[i])
            }
        })
    })

    describe("signal_update",()=>{
        test("add observer on update correctly",()=>{
            let fn1 = vi.fn()
            let fn2 = vi.fn()
            let expect_res = [fn1, fn2]
            target_v.on_update(fn1)
            target_v.on_update(fn2)
            target_v.signal_update()
            expect(fn1).toBeCalled()
            expect(fn2).toBeCalled()
        })
    })
})