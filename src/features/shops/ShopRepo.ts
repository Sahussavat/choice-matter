import { ItemLayout } from "@/features/values/Items";
import { NumberVariable } from "../values/Variables";

export interface Goods {
    cost : number,
    get_item : ()=>ItemLayout,
}

export interface ShopRepo {
    get_money : ()=>NumberVariable,
    get_all_goods(): Goods[],
    buy_goods(goods : Goods): void,
    sell_item(item : ItemLayout): void,
    is_can_buy(goods : Goods): boolean,
    on_money_change(callable : CallableFunction): void,
    on_items_change(callable : CallableFunction): void,
    signal_money_change() : void,
    signal_items_change() : void,
    get_all_sellable_items() : ItemLayout[],
}