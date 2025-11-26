import { beforeEach, describe, expect, test, vi } from "vitest";
import { Choice } from "../Choice";
import { Path } from "../Path";
import { Condition } from "../Condition";
import { RouteName } from "@/router/RouteName";

describe("Choice", ()=>{
    let choice : Choice
    const CHOICE_CONTEXT = "เอา"
    const path1 = new Path({
        path: "path1",
        conditions:[[
            new Condition(()=>{return true})
        ]]
    })
    const path2 = new Path({
        path: "path2",
        conditions:[[
            new Condition(()=>{return true})
        ]]
    })
    const path3 = new Path({
        path: "path3",
        conditions:[[
            new Condition(()=>{return false})
        ]]
    })

    beforeEach(()=>{
        choice = new Choice({
            choice_context: CHOICE_CONTEXT,
            conditions: [],
            observ_click_choice: [],
            paths: [path1, path2]
        })
    })

    describe("get_first_visitable_path",()=>{
        test("return home page path when not define path", ()=>{
            choice['paths'] = []
            expect(choice.get_first_visitable_path().default_path).toBe(RouteName.HOMEPAGE)
        })

        test("return home page path when all path is not pass condition", ()=>{
            choice['paths'] = [path3]
            expect(choice.get_first_visitable_path().default_path).toBe(RouteName.HOMEPAGE)
        })

        test("return first path that pass condition", ()=>{
            choice['paths'] = [path1, path2]
            expect(choice.get_first_visitable_path().default_path).toBe(path1.get_path().default_path)
        })

        test("return path that pass condition", ()=>{
            choice['paths'] = [path3, path1]
            expect(choice.get_first_visitable_path().default_path).toBe(path1.get_path().default_path)
        })
    })

    describe("get_choice_context",()=>{
        test("get choice context correctly",()=>{
            expect(choice.get_choice_context()).toBe(CHOICE_CONTEXT)
        })
    })

    describe("on_click_choice",()=>{
        test("add observation on click choice correctly",()=>{
            let mockFunction1 = vi.fn()
            let mockFunction2 = vi.fn()
            choice.on_click_choice(mockFunction1)
            choice.on_click_choice(mockFunction2)
            let mockArr = [mockFunction1, mockFunction2]
            for(let i=0;i<mockArr.length;i++){
                expect(choice['observ_click_choice'][i]).toEqual(mockArr[i])
            }
        })
    })

    describe("signal_click_choice",()=>{
        test("signal all observation on click choice correctly",()=>{
            let mockFunction1 = vi.fn()
            let mockFunction2 = vi.fn()
            choice.on_click_choice(mockFunction1)
            choice.on_click_choice(mockFunction2)
            choice.signal_click_choice()
            expect(mockFunction1).toBeCalled()
            expect(mockFunction2).toBeCalled()
        })
    })

    describe("is_showable",()=>{
        test("check if showable correctly",()=>{
            choice['conditions'] = [[new Condition(()=>{return false})]]
            expect(choice.is_showable()).toBe(false)
            choice['conditions'] = [[new Condition(()=>{return true})]]
            expect(choice.is_showable()).toBe(true)
        })
    })
})