import {  Values } from "@/features/values/Values";
import { Goods, ShopRepo } from "../ShopRepo";
import { NumberVariable } from "@/features/values/Variables";
import { ItemLayout } from "@/features/values/Items";

function is_goods_obj(val){
    return val instanceof Object && val.get_item !== undefined
}

function is_can_sell(val){
    return val instanceof Object && val.sell_price !== undefined && val.sell_price > 0
}

export class Shop implements ShopRepo {
    private values : Values
    private observer_money_change : CallableFunction[] = []
    private observer_items_change : CallableFunction[] = []
    get_money : ()=>NumberVariable = ()=>{return this.values.get_variables().money}

    constructor(values : Values){
        this.values = values
    }   

    get_all_goods(): Goods[] {
        let goods_list = []
        Object.keys(this).forEach(key => {
            if(this[key] && is_goods_obj(this[key])){
                goods_list.push(this[key])
            }
        });
        return goods_list
    }

    get_all_sellable_items() : ItemLayout[]{
        let sell_items = []
        let all_visible_items = this.values.get_items().get_all_visible_item()
        for(let i=0;i<all_visible_items.length;i++){
            let item = all_visible_items[i]
            if(is_can_sell(item)){
                sell_items.push(item)
            }
        }
        return sell_items
    }

    on_money_change(callable : CallableFunction){
        this.observer_money_change.push(callable)
    }

    signal_money_change(){
        for(let i=0;i<this.observer_money_change.length;i++){
            this.observer_money_change[i]()
        }
    }

    on_items_change(callable : CallableFunction){
        this.observer_items_change.push(callable)
    }

    signal_items_change(){
        for(let i=0;i<this.observer_items_change.length;i++){
            this.observer_items_change[i]()
        }
    }
    
    buy_goods(goods: Goods): void {
        if(this.get_money().val as number - goods.cost >= 0){
            this.get_money().val = this.get_money().val - goods.cost
            goods.get_item().val = goods.get_item().val + 1
            this.signal_money_change()
            this.signal_items_change()
        }
    }

    sell_item(item: ItemLayout): void {
        if(item.val > 0){
            let sell_price = 0
            if(is_can_sell(item)){
                sell_price = item.sell_price
            }
            this.get_money().val = this.get_money().val + sell_price
            item.val = item.val - 1
            this.signal_money_change()
            this.signal_items_change()
        }
    }

    get_values(){
        return this.values
    }

    is_can_buy(goods: Goods){
        return this.get_money().val as number >= goods.cost
    }

}