import { clamp } from "@/util/MathUtill";
import { is_value_obj, ValueLayout, Values } from "./Values";
import { Constants } from "@/util/Constants";

export enum ItemType {
    REGULAR,
    QUEST,
    POTION,
}

export interface ItemLayout extends ValueLayout {
    type: ItemType,
    val: number,
    sell_price?: number,
    onclick?: (values : Values)=> void
}

export class Items {
    deodorant : ItemLayout = {
        show_name : "ยาดับกลิ่น",
        des: "สามารถใช้เพื่อลบกลิ่นตัวเป็นจำนวนชั่วระยะเวลาหนึ่ง ผลเอฟเฟคจะหายไปเมื่อป้องกันเหตุการณ์สุ่มจากมอนสเตอร์สำเร็จ",
        val: 5,
        sell_price: Constants.DEODORANT_PRICE,
        type: ItemType.POTION,
        onclick: (values : Values)=>{
            values.get_items().deodorant.val = (values.get_items().deodorant.val as number) - 1
            values.get_variables().not_smell.val = true
            values.signal_update()
        }
    }

    hp_potion : ItemLayout = {
        show_name : "ยาฟื้นฟู",
        des: "สามารถใช้เพื่อรักษาบาดแผลได้ "+Constants.HP_POTION_UNIT+" หน่วย",
        val: 5,
        sell_price: Constants.HP_POTION_PRICE,
        type: ItemType.POTION,
        onclick: (values : Values)=>{
            values.get_items().hp_potion.val = (values.get_items().hp_potion.val as number) - 1
            values.get_variables().hp.val = clamp(values.get_variables().hp.val+Constants.HP_POTION_UNIT,
             0, values.get_variables().max_hp.val) 
            values.signal_update()
        }
    }

    goblin_bone : ItemLayout = {
        show_name : "กระดูกก็อบลิน",
        des: "กระดูกก็อบลิน สามารถนำไปขายให้นักปรุงยาเพื่อนำไปใช้เป็นวัตถุดิบปรุงยา",
        val: 0,
        sell_price: Constants.GOBLIN_BONE_PRICE,
        type: ItemType.REGULAR,
    }

    wolf_bone : ItemLayout = {
        show_name : "เศษชิ้นส่วนหนังหมาป่ากลายพันธ์ุ",
        des: "หนังหมาป่ากลายพันธุ์ สามารถนำไปขายให้นักปรุงยาเพื่อนำไปใช้เป็นวัตถุดิบปรุงยา",
        val: 0,
        sell_price: Constants.WOLF_BONE_PRICE,
        type: ItemType.REGULAR,
    }

    crowbar : ItemLayout = {
        show_name : "ชะแลง",
        des: "สามารถนำไปใช้เพื่องัดประตูที่ล็อกอยู่ได้",
        val: 0,
        type: ItemType.QUEST,
    }

    thief_body : ItemLayout = {
        show_name : "ร่างของโจรที่เสียชีวิต",
        val: 0,
        type: ItemType.QUEST,
    }

    pure_potion : ItemLayout = {
        show_name : "Pure Potion",
        des: "น้ำยาศักสิทธิ์จากเลือดบริสุทธิ์ของเอลฟ์แห่งตระกูลผู้ได้รับพรศักดิ์สิทธิ์ ใช้สำหรับขจัดมลทินให้หายไป",
        val: 0,
        type: ItemType.QUEST,
    }

    get_all_visible_item() : ItemLayout[]{
        let items_list = []
        Object.keys(this).forEach(key => {
            if(this[key] && is_value_obj(this[key]) && this[key].val){
                items_list.push(this[key])
            }
        });
        return items_list
    }
}