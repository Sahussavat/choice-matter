import { describe, expect, test, vi } from "vitest";
import { GetKeyByObj } from "../GetKeyByObj";

class MockChildObj {}
class MockFalseChildObj {}

let child_obj = new MockChildObj
let child_false_obj = new MockFalseChildObj

class MockParentObj {
    childObj = child_obj
}

describe("GetKeyByObj", ()=>{

    describe("get_key", ()=>{
        test("return key if have obj in the target", ()=>{
            let parent = new MockParentObj
            expect(GetKeyByObj.get_key(child_obj, parent)).toBe("childObj")
        })

        test("return null if not have obj in the target", ()=>{
            let parent = new MockParentObj
            expect(GetKeyByObj.get_key(child_false_obj, parent)).toBe(null)
        })
    })
})