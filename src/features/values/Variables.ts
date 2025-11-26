import { Constants } from "@/util/Constants";
import { is_value_obj, ValueLayout } from "./Values";

export enum VarType {
    REGULAR,
    STAT,
    BUFF,
}

export interface VariableLayout extends ValueLayout {
    type: VarType
}

export interface NumberVariable extends VariableLayout {
    val: number
}

export interface BooleanVariable extends VariableLayout {
    val: boolean
}

export class Variables {
    hp : NumberVariable = {
        show_name : "HP",
        val: Constants.MAX_HP,
        type: VarType.REGULAR
    }

    max_hp : NumberVariable = {
        show_name : "Max HP",
        val: Constants.MAX_HP,
        type: VarType.REGULAR
    }

    money : NumberVariable = {
        show_name : "เงิน",
        val: Constants.START_MONEY,
        type: VarType.REGULAR
    }

    not_smell : BooleanVariable = {
        show_name : "ปราศจากกลิ่นกาย",
        des: "ลบกลิ่นตัวเป็นจำนวนชั่วระยะเวลาหนึ่ง ผลเอฟเฟคจะหายไปก็ต่อเมื่อซ่อนตัวจากมอนสเตอร์สำเร็จ",
        val: false,
        type: VarType.BUFF
    }

    dice_number : NumberVariable = {
        show_name : "",
        val: 0,
        type: VarType.REGULAR
    }

    first_time_village : BooleanVariable = {
        show_name : "",
        val: false,
        des: "",
        type: VarType.REGULAR
    }

    first_time_wizard_shop : BooleanVariable = {
        show_name : "",
        val: false,
        des: "",
        type: VarType.REGULAR
    }

    first_time_enter_ancient : BooleanVariable = {
        show_name : "",
        val: false,
        des: "",
        type: VarType.REGULAR
    }

    first_time_thief_camp : BooleanVariable = {
        show_name : "",
        val: false,
        des: "",
        type: VarType.REGULAR
    }

    thief_camp_killed : BooleanVariable = {
        show_name : "",
        val: false,
        des: "",
        type: VarType.REGULAR
    }

    did_thief_pursuation_success : BooleanVariable = {
        show_name : "",
        val: false,
        des: "",
        type: VarType.REGULAR
    }

    first_time_goblin_camp : BooleanVariable = {
        show_name : "",
        val: false,
        des: "",
        type: VarType.REGULAR
    }

    goblin_killed : BooleanVariable = {
        show_name : "",
        val: false,
        des: "",
        type: VarType.REGULAR
    }

    got_goblin_items : BooleanVariable = {
        show_name : "",
        val: false,
        des: "",
        type: VarType.REGULAR
    }

    elf_room_first_time : BooleanVariable = {
        show_name : "",
        val: false,
        des: "",
        type: VarType.REGULAR
    }

    mimic_first_time : BooleanVariable = {
        show_name : "",
        val: false,
        des: "",
        type: VarType.REGULAR
    }

    known_its_mimic : BooleanVariable = {
        show_name : "",
        val: false,
        des: "",
        type: VarType.REGULAR
    }

    checked_mimic_alone : BooleanVariable = {
        show_name : "",
        val: false,
        des: "",
        type: VarType.REGULAR
    }

    opend_mimic : BooleanVariable = {
        show_name : "",
        val: false,
        des: "",
        type: VarType.REGULAR
    }

    library_first_time : BooleanVariable = {
        show_name : "",
        val: false,
        des: "",
        type: VarType.REGULAR
    }

    picked_up_body : BooleanVariable = {
        show_name : "",
        val: false,
        des: "",
        type: VarType.REGULAR
    }

    mystery_room_first_time : BooleanVariable = {
        show_name : "",
        val: false,
        des: "",
        type: VarType.REGULAR
    }

    unlocked_mystery_room : BooleanVariable = {
        show_name : "",
        val: false,
        des: "",
        type: VarType.REGULAR
    }

    inside_mystery_room_first_time : BooleanVariable = {
        show_name : "",
        val: false,
        des: "",
        type: VarType.REGULAR
    }

    readed_note : BooleanVariable = {
        show_name : "",
        val: false,
        des: "",
        type: VarType.REGULAR
    }

    got_pure_potion : BooleanVariable = {
        show_name : "",
        val: false,
        des: "",
        type: VarType.REGULAR
    }

    ritual_room_first_time : BooleanVariable = {
        show_name : "",
        val: false,
        des: "",
        type: VarType.REGULAR
    }

    ritual_destroyed : BooleanVariable = {
        show_name : "",
        val: false,
        des: "",
        type: VarType.REGULAR
    }

    ritual_elf_dead : BooleanVariable = {
        show_name : "",
        val: false,
        des: "",
        type: VarType.REGULAR
    }

    ritual_end_pure_potion : BooleanVariable = {
        show_name : "",
        val: false,
        des: "",
        type: VarType.REGULAR
    }

    elf_meet_wolf_first_time : BooleanVariable = {
        show_name : "",
        val: false,
        des: "",
        type: VarType.REGULAR
    }

    got_wolf_item : BooleanVariable = {
        show_name : "",
        val: false,
        des: "",
        type: VarType.REGULAR
    }

    escape_wolf_fail : BooleanVariable = {
        show_name : "",
        val: false,
        des: "",
        type: VarType.REGULAR
    }


    wolf_cooldown : NumberVariable = {
        show_name : "",
        val: 0,
        des: "",
        type: VarType.REGULAR
    }

    wolf_cooldown_max : NumberVariable = {
        show_name : "",
        val: 1,
        des: "",
        type: VarType.REGULAR
    }

    quick_hand : VariableLayout = {
        show_name : "มือไว",
        val: 0,
        des: "มือไวขโมยของไว",
        type: VarType.STAT
    }

    eagle_eye : VariableLayout = {
        show_name : "ตาเหยี่ยว",
        val: 0,
        des: "มองเห็นได้ละเอียด",
        type: VarType.STAT
    }

    elf_joined_party : BooleanVariable = {
        show_name : "",
        val: false,
        des: "",
        type: VarType.REGULAR
    }

    halfling_joined_party : BooleanVariable = {
        show_name : "",
        val: false,
        des: "",
        type: VarType.REGULAR
    }

    get_all_visible_buff(){
        let var_arr = []
        Object.keys(this).forEach(key => {
            if(this[key] && is_value_obj(this[key]) && this[key].type === VarType.BUFF && this[key].val){
                var_arr.push(this[key])
            }
        });
        return var_arr
    }

    get_all_stat_var(){
        let var_list = {}
        Object.keys(this).forEach(key => {
            if(this[key] && is_value_obj(this[key]) && this[key].type === VarType.STAT){
                var_list[key] = this[key]
            }
        });
        return var_list
    }
}