import { Items } from "./Items";
import { Variables } from "./Variables";

export function is_value_obj(val){
    return val instanceof Object && val.val !== undefined
}

export interface ValueLayout {
    show_name : string,
    des?: string,
    val: boolean | string | number
}

export class Values {

    items : Items = new Items
    variables : Variables = new Variables
    observ_update : CallableFunction[] = []

    constructor(items : Items = new Items, variables : Variables = new Variables){
        this.items = items
        this.variables = variables
    }

    reset(){
        let default_val = new Values()
        this.set_all_vals(default_val.get_items())
        this.set_all_vals(default_val.get_variables())
    }

    set_all_vals(target_vals : {[key : string]: any}){
        Object.keys(target_vals).forEach(key => {
            if(key in this.items){
                this.assign_to_value(this.items[key], target_vals[key])
            } else if (key in this.variables) {
                this.assign_to_value(this.variables[key], target_vals[key])
            }
        });
    }

    on_update(fn : CallableFunction){
        this.observ_update.push(fn)
    }

    signal_update(){
        for(let i=0;i<this.observ_update.length;i++){
            this.observ_update[i]()
        }
    }

    assign_to_value(target, val){
        if(is_value_obj(val)){
            target.val = val.val
        } else {
            target.val = val
        }
    }

    get_all_pure_value(){
        let res_list = {
            ...this.get_pure_value(this.items),
            ...this.get_pure_value(this.variables)
        }
        return res_list
    }

    get_pure_value(obj : Object){
        let res_list = {}
        Object.keys(obj).forEach(key => {
            let item = obj[key]
            if(is_value_obj(item)){
                res_list[key] = item.val
            }
        })
        return res_list
    }

    get_items() : Items{
        return this.items
    }

    get_variables() : Variables{
        return this.variables
    }
}