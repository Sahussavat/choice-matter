import { beforeEach, describe, expect, test } from "vitest";
import { Items } from "../Items";

export function is_have_obj_inside(obj : Object, arr : Object[]){
    let is_have = false
    for(let i=0;i<arr.length;i++){
        if(obj === arr[i]){
            is_have = true
            break;
        }
    }
    return is_have
}

describe("Items", ()=>{
    let items : Items
    beforeEach(()=>{
        items = new Items()
    })
    describe("get_all_visible_item", ()=>{
        test("get all visible item correctly", ()=>{
            let show1 = {
                val: 1
            }
            let show2 = {
                val: 1
            }
            let not_show1 = {
                val: 0
            }
            items['show1'] = show1
            items['show2'] = show2
            items['not_show1'] = not_show1
            let all_v_items = items.get_all_visible_item()
            expect(is_have_obj_inside(show1, all_v_items)).toBe(true)
            expect(is_have_obj_inside(show2, all_v_items)).toBe(true)
            expect(is_have_obj_inside(not_show1, all_v_items)).toBe(false)
        })
    })
})