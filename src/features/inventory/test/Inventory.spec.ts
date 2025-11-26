import { beforeEach, describe, expect, test, vi } from "vitest";
import { Inventory } from "../Inventory";
import { Values } from "@/features/values/Values";
import { ItemLayout, ItemType } from "@/features/values/Items";
import { is_have_obj_inside } from "@/features/values/test/Items.spec";

describe("Inventory", ()=>{
    let inventory : Inventory

    beforeEach(()=>{
        inventory = new Inventory((new Values).get_items())
    })

    describe("get_items_by_type",()=>{
        test("get all items if not define type", ()=>{
            let mock_data = [
                {
                    val: 1
                },
                {
                    val: 1
                },
            ]
            vi.spyOn(inventory['items'], "get_all_visible_item").mockReturnValue(mock_data)
            expect(inventory.get_items_by_type([])).toEqual(mock_data)
        })

        test("get all items in specific types", ()=>{
            let v1 : ItemLayout = {
                    show_name : "ewqe",
                    val: 1,
                    type: ItemType.REGULAR
                }
            let v2 : ItemLayout = {
                    show_name : "ewqe",
                    val: 1,
                    type: ItemType.REGULAR
                }
            let v3 : ItemLayout = {
                    show_name : "ewqe",
                    val: 1,
                    type: ItemType.REGULAR + 1
                }
            let false_v = {
                    val: 1
                }
            let mock_data = [
                v1,
                v2,
                v3,
                false_v,
            ]
            vi.spyOn(inventory['items'], "get_all_visible_item").mockReturnValue(mock_data)
            let items = inventory.get_items_by_type([ItemType.REGULAR, ItemType.REGULAR + 1])
            expect(is_have_obj_inside(v1, items)).toBeTruthy()
            expect(is_have_obj_inside(v2, items)).toBeTruthy()
            expect(is_have_obj_inside(v3, items)).toBeTruthy()
            expect(is_have_obj_inside(false_v, items)).toBeFalsy()
        })
    })

    describe("increase_item", ()=>{
        test("increase number value of item correctly", ()=>{
            let n = 18
            let v1 = {
                val: n
            }
            inventory.increase_item(v1 as ItemLayout)
            expect(v1.val).toBe(n+1)
        })
    })

    describe("decrease_item", ()=>{
        test("decrease number value of item correctly", ()=>{
            let n = 18
            let v1 = {
                val: n
            }
            inventory.decrease_item(v1 as ItemLayout)
            expect(v1.val).toBe(n-1)
        })
    })

    describe("remove_item", ()=>{
        test("remove item by set to 0 correctly", ()=>{
            let n = 18
            let v1 = {
                val: n
            }
            inventory.remove_item(v1 as ItemLayout)
            expect(v1.val).toBe(0)
        })
    })

    describe("delta_item_val", ()=>{
        test("increase number value of item correctly", ()=>{
            let n = 18
            let v1 = {
                val: n
            }
            inventory.delta_item_val(v1 as ItemLayout, 1)
            expect(v1.val).toBe(n+1)
        })

        test("increase number value of item correctly", ()=>{
            let n = 18
            let v1 = {
                val: n
            }
            inventory.delta_item_val(v1 as ItemLayout, -1)
            expect(v1.val).toBe(n-1)
        })

        test("not change value of item if input is not number", ()=>{
            let s = "string"
            let v1 = {
                val: s
            }
            inventory.delta_item_val(v1 as ItemLayout, -1)
            expect(v1.val).toBe(s)
        })
    })

    describe("set_item_val", ()=>{
        test("set value of item correctly", ()=>{
            let n = 17
            let expect_n = 1
            let v1 = {
                val: n
            }
            inventory.set_item_val(v1 as ItemLayout, expect_n)
            expect(v1.val).toBe(expect_n)
        })

        test("not change value of item if input is not number", ()=>{
            let s = 'string'
            let n = 1
            let v1 = {
                val: s
            }
            inventory.set_item_val(v1 as ItemLayout, n)
            expect(v1.val).toBe(s)
        })
    })
})