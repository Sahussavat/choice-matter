import { Values } from "@/features/values/Values";

export function roll_dice(values : Values){
    values.get_variables().dice_number.val = Math.random()
}

export function get_dice_result(values : Values){
    return values.get_variables().dice_number.val
}

export function get_fighter_roll_point(values : Values){
    if(values.get_variables().fighter_stat.val){
        return 1
    } else {
        return 0.5
    }
}

export function get_elite_sneak_roll_point(values : Values){
    if(values.get_variables().elite_sneak_stat.val){
        return 100
    } else {
        return 0
    }
}

export function get_knowledge_roll_point(values : Values){
    if(values.get_variables().knowledge_stat.val){
        return 100
    } else {
        return 0
    }
}