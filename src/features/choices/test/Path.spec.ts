import { beforeEach, describe, expect, test } from "vitest";
import { Path } from "../Path";
import { Condition } from "../Condition";

describe("Path", ()=>{
    let path
    const PATH_NAME = "/path1"
    let mockTrueCond = new Condition(()=>{return true})
    let mockFalseCond = new Condition(()=>{return false})
    beforeEach(()=>{
        path = new Path({
            path: PATH_NAME,
            conditions: []
        })
    })

    describe("is_visitable", ()=>{
        test("return true when condition pass", ()=>{
            path['conditions'] = [[ mockTrueCond ]]
            expect(path.is_visitable()).toBe(true)
        })

        test("return false when condition not pass", ()=>{
            path['conditions'] = [[ mockFalseCond ]]
            expect(path.is_visitable()).toBe(false)
        })
    })

    describe("get_path", ()=>{
        test("return path correctly", ()=>{
            expect(path.get_path().default_path).toBe(PATH_NAME)
        })
    })
})