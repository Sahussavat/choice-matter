import { Values } from "@/features/values/Values";

export function roll_dice(values : Values){
    values.get_variables().dice_number.val = Math.random()
}

export function get_dice_result(values : Values){
    return values.get_variables().dice_number.val
}