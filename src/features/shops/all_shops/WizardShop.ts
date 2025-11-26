import { Values } from "@/features/values/Values";
import { Shop } from "./Shop";
import { Goods } from "../ShopRepo";
import { Constants } from "@/util/Constants";

export class WizardShop extends Shop {

    deodorant : Goods = {
        cost : Constants.DEODORANT_COST,
        get_item : ()=>{return this.get_values().get_items().deodorant},
    }

    hp_potion : Goods = {
        cost : Constants.HP_POTION_COST,
        get_item : ()=>{return this.get_values().get_items().hp_potion},
    }

    constructor(values : Values){
        super(values);
    }
}