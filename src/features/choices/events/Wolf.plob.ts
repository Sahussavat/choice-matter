import { Values } from "@/features/values/Values";
import { EventDefine } from "../EventDefine";

export function get_wolf_plob_random(values : Values){
    if(values.get_variables().wolf_cooldown.val < values.get_variables().wolf_cooldown_max.val
        || values.get_variables().not_smell.val){
        values.get_variables().wolf_cooldown.val += 1
        if(values.get_variables().not_smell.val){
            values.get_variables().not_smell.val = false
        }
        return
    } else {
        values.get_variables().wolf_cooldown.val = 0
    }
    let event_define : EventDefine = new EventDefine
    return {
        events: [{
            event_name: event_define.get_key(event_define.all_events.meet_wolf),
            chance: 50
        }],
        default_path_chance: 50
    }
}

export function get_wolf_plob_gurantee(values : Values){
    if(values.get_variables().wolf_cooldown.val >= values.get_variables().wolf_cooldown_max.val
        || values.get_variables().not_smell.val){
        values.get_variables().wolf_cooldown.val = 0
        if(values.get_variables().not_smell.val){
            values.get_variables().not_smell.val = false
        }
        return
    }
    let event_define : EventDefine = new EventDefine
    return {
        events: [{
            event_name: event_define.get_key(event_define.all_events.meet_wolf),
            chance: 100
        }],
        default_path_chance: 0
    }
}