import { GetKeyByObj } from "@/util/GetKeyByObj";
import { Values } from "../values/Values";
import { WizardShop } from "./all_shops/WizardShop";
import { Shop } from "./all_shops/Shop";

export interface BuildShopFn {
    build(values : Values) : Shop
}

export class ShopDefine {
    wizard_shop : BuildShopFn = {
        build(values : Values){return new WizardShop(values)}
    }

    get_key(val : BuildShopFn) : string | null{
        return GetKeyByObj.get_key(val, this)
    }

    build(shop_name : string, values : Values){
        let res_shop = null
        if (shop_name in this
            && this[shop_name] && this[shop_name].build !== undefined) {
            let build_shop : BuildShopFn = this[shop_name]
            res_shop = build_shop.build(values)
        }
        return res_shop
    }
}