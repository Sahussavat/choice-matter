import { beforeEach, describe, expect, test, vi } from "vitest";
import { Shop } from "../Shop";
import { Values } from "@/features/values/Values";
import { ItemLayout, ItemType } from "@/features/values/Items";
import { is_have_obj_inside } from "@/features/values/test/Items.spec";
import { Goods } from "../../ShopRepo";

describe("Shop", ()=>{
    let shop : Shop
    let money = 193
    let values : Values
    let item_name1 = "item1"
    let item_name2 = "item2"
    let item1 : ItemLayout
    let item2 : ItemLayout
    let good1 : Goods
    let good2 : Goods
    
    beforeEach(()=>{
        values = new Values
        values.get_variables().money.val = money
        shop = new Shop(values)
        vi.spyOn(shop, 'signal_items_change')
        vi.spyOn(shop, 'signal_money_change')
        item1 = {
            show_name : item_name1,
            val: 0,
            sell_price : 15,
            type: ItemType.REGULAR,
        }
        good1 = {
            cost : 10,
            get_item : ()=>{return item1},
        }
        item2 = {
            show_name : item_name2,
            val: 0,
            sell_price : 16,
            type: ItemType.REGULAR,
        }
        good2 = {
            cost : 11,
            get_item : ()=>{return item2},
        }
        values.get_items()[item_name1] = item1
        values.get_items()[item_name2] = item2
        shop[item_name1] = good1
        shop[item_name2] = good2
    })

    describe("define money", ()=>{
        test("define money correctly", ()=>{
            expect(shop.get_money()).toEqual(values.get_variables().money)
        })
    })

    describe("get_all_goods", ()=>{
        test("return all goods correctly", ()=>{
            let goods = shop.get_all_goods()
            expect(is_have_obj_inside(good1, goods)).toBe(true)
            expect(is_have_obj_inside(good2, goods)).toBe(true)
        })
    })

    describe("buy_goods", ()=>{
        test("buy goods success if have money", ()=>{
            shop.buy_goods(good1)
            expect(shop.get_money().val).toBe(money - good1.cost)
            expect(item1.val > 0).toBe(true)
        })
        
        test("buy goods fail if not have money", ()=>{
            shop.get_money().val = 0
            shop.buy_goods(good1)
            expect(shop.get_money().val).toBe(0)
            expect(item1.val > 0).toBe(false)
            shop.get_money().val = 5
            shop.buy_goods(good1)
            expect(item1.val > 0).toBe(false)
        })

        test("must call signal items change and money change when buy success", ()=>{
            shop.buy_goods(good1)
            expect(shop.signal_items_change).toBeCalled()
            expect(shop.signal_money_change).toBeCalled()
        })
    })

    describe("sell_goods", ()=>{
        test("sell goods success if have item", ()=>{
            let amount = 10
            item1.val = amount
            shop.sell_item(good1.get_item())
            expect(shop.get_money().val).toBe(money + good1.get_item().sell_price)
            expect(item1.val).toBe(amount - 1)
        })
        
        test("sell goods fail if not have item", ()=>{
            let amount = 0
            item1.val = amount
            shop.sell_item(good1.get_item())
            expect(shop.get_money().val).toBe(money)
            expect(item1.val).toBe(0)
        })

        test("must call signal items change and money change when sell success", ()=>{
            let amount = 10
            item1.val = amount
            shop.sell_item(good1.get_item())
            expect(shop.signal_items_change).toBeCalled()
            expect(shop.signal_money_change).toBeCalled()
        })
    })

    describe("is_can_buy", ()=>{
        test("return true if can buy item", ()=>{
            expect(shop.is_can_buy(good1)).toBe(true)
        })

        test("return false if can not buy item", ()=>{
            shop.get_money().val = 0
            expect(shop.is_can_buy(good1)).toBe(false)
        })
    })

    describe("on_money_change", ()=>{
        test("add observer on money change correctly", ()=>{
            let fn1 = vi.fn()
            shop.on_money_change(fn1)
            expect(shop['observer_money_change'][0]).toEqual(fn1)
        })
    })

    describe("signal_money_change", ()=>{
        test("signal to all observer on money change correctly", ()=>{
            let fn1 = vi.fn()
            shop.on_money_change(fn1)
            shop.signal_money_change()
            expect(fn1).toBeCalled()
        })
    })

    describe("on_items_change", ()=>{
        test("add observer on items change correctly", ()=>{
            let fn1 = vi.fn()
            shop.on_items_change(fn1)
            expect(shop['observer_items_change'][0]).toEqual(fn1)
        })
    })

    describe("signal_items_change", ()=>{
        test("signal to all observer on items change correctly", ()=>{
            let fn1 = vi.fn()
            shop.on_items_change(fn1)
            shop.signal_items_change()
            expect(fn1).toBeCalled()
        })
    })

    describe("get_all_sellable_items", ()=>{
        test("get all sellable items in inventory correctly", ()=>{
            item1.val = 1
            item2.val = 1
            item2.sell_price = 0
            let all_sellable_items = shop.get_all_sellable_items()
            expect(is_have_obj_inside(item1, all_sellable_items)).toBe(true)
            expect(is_have_obj_inside(item2, all_sellable_items)).toBe(false)
        })
    })
})