import { Values } from "@/features/values/Values";
import { clamp } from "@/util/MathUtill";
import { Condition } from "../Condition";

export function get_random_damge(damage : number, values : Values):number{
    return clamp(Math.floor(Math.random() * damage), 0, values.get_variables().hp.val)
}

export function is_player_dead(value : Values){
    return value.get_variables().hp.val <= 0
}