import { Values } from "@/features/values/Values";
import { clamp } from "@/util/MathUtill";
import { get_fighter_roll_point } from "./RollDice";

export function get_random_damge(damage : number, values : Values):number{
    return clamp(Math.floor(Math.random() * damage), 0, values.get_variables().hp.val)
}

export function do_damage_to_player(damage : number, values : Values){
    values.get_variables().hp.val 
    = clamp(values.get_variables().hp.val - get_random_damge(damage, values) * get_fighter_roll_point(values), 0,values.get_variables().max_hp.val);
}

export function is_player_dead(value : Values){
    return value.get_variables().hp.val <= 0
}