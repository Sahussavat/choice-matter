import { describe, expect, test } from "vitest";
import { ShopDefine } from "../ShopDefine";
import { Values } from "@/features/values/Values";
import { Shop } from "../all_shops/Shop";

describe("ShopDefine", ()=>{
    describe("build", ()=>{
        test("return shop correctly if have shop", ()=>{
            let shop_name = "test1"
            let shop_define = new ShopDefine()
            shop_define[shop_name] = {build(value : Values){return new Shop(value)}}
            let shop = shop_define.build(shop_name, new Values)
            expect(shop instanceof Shop).toBe(true)
        })

        test("return null correctly if not have shop", ()=>{
            let shop_name = "test1"
            let shop_define = new ShopDefine()
            let shop = shop_define.build(shop_name, new Values)
            expect(shop).toBe(null)
        })
    })

    describe("get_key", ()=>{
        test("return shop name correctly if have that shop name", ()=>{
            let shop_name = "test1"
            let shop_define = new ShopDefine()
            shop_define[shop_name] = Shop
            expect(shop_define.get_key(shop_define[shop_name])).toEqual(shop_name)
        })

        test("return null if not have that shop name", ()=>{
            let shop_name = "test1"
            let shop_define = new ShopDefine()
            expect(shop_define.get_key(shop_define[shop_name])).not.toEqual(shop_name)
        })
    })
})