import { Values } from "@/features/values/Values"
import { get_simple_talk_question } from "./SimpleTalk.question"
import { found_again_know, found_again_know_w_halfling, found_again_not_know, found_alone_first_time, found_first_time_with_all, found_first_time_with_elf, found_first_time_with_halfling } from "./MimicText"
import { get_mimic_default_choice } from "./MimicTrap.question"

function checked_first_time_found_mimic(values : Values){
    return [
        ()=>{
            values.get_variables().mimic_first_time.val = true
        }
    ]
}

export function gain_health_potion_mimic(values : Values){
    return [
        ()=>{
            if(!values.get_variables().opend_mimic.val){
                values.get_variables().opend_mimic.val = true
                values.get_items().hp_potion.val += 5
            }
        }
    ]
}

function checked_know_its_mimic(values : Values){
    return [
        ()=>{
            values.get_variables().known_its_mimic.val = true
        }
    ]
}

export let MimicAloneFirstTime = get_simple_talk_question(found_alone_first_time, 
    get_mimic_default_choice,
    (values : Values)=>{
        return [
            ...checked_first_time_found_mimic(values)
        ]
    }
)

export let MimicAloneDefaultNotKnow = get_simple_talk_question(found_again_not_know, 
    get_mimic_default_choice,
    (values : Values)=>{
        return [
            ...checked_first_time_found_mimic(values)
        ]
    }
)

export let MimicAloneDefaultKnow = get_simple_talk_question(found_again_know, 
    get_mimic_default_choice,
    (values : Values)=>{
        return [
            ...checked_first_time_found_mimic(values)
        ]
    }
)

export let MimicElfFirstTime = get_simple_talk_question(found_first_time_with_elf, 
    get_mimic_default_choice,
    (values : Values)=>{
        return [
            ...checked_first_time_found_mimic(values),
            ...checked_know_its_mimic(values)
        ]
    }
)

export let MimicHalflingNotKnow = get_simple_talk_question(found_first_time_with_halfling, 
    get_mimic_default_choice,
    (values : Values)=>{
        return [
            ...checked_first_time_found_mimic(values),
            ...gain_health_potion_mimic(values)
        ]
    }
)

export let MimicAllNotKnow = get_simple_talk_question(found_first_time_with_all, 
    get_mimic_default_choice,
    (values : Values)=>{
        return [
            ...checked_first_time_found_mimic(values),
            ...gain_health_potion_mimic(values)
        ]
    }
)

export let MimicHalflingKnow = get_simple_talk_question(found_again_know_w_halfling, 
    get_mimic_default_choice,
    (values : Values)=>{
        return [
            ...checked_first_time_found_mimic(values),
            ...gain_health_potion_mimic(values)
        ]
    }
)

