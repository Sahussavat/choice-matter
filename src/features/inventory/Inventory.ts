import { CheckNumber } from "@/util/CheckNumber";
import { ItemLayout, Items, ItemType } from "../values/Items";



export class Inventory {

    private items : Items

    constructor(items : Items){
        this.items = items
    }

    get_items_by_type(types : ItemType[]) : ItemLayout[]{
        let res = []
        let all_v_items = this.items.get_all_visible_item()
        if(!types.length){
            return all_v_items
        }
        for(let i=0;i<all_v_items.length;i++){
            let item = all_v_items[i]
            if(types.includes(item.type)){
                res.push(item)
            }
        }
        return res
    }

    increase_item(item : ItemLayout){
        this.delta_item_val(item, 1)
    }

    decrease_item(item : ItemLayout){
        this.delta_item_val(item, -1)
    }

    remove_item(item : ItemLayout){
        this.set_item_val(item, 0)
    }

    delta_item_val(item : ItemLayout, delta : number){
        if(CheckNumber.is_number(item.val as number)){ 
            this.set_item_val(item, (item.val as number) + delta)
        }
    }

    set_item_val(item : ItemLayout, val : number){
        if(CheckNumber.is_number(item.val as number)){
            item.val = val
        }
    }
}