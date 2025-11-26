import { Values } from "@/features/values/Values"
import { BuildEventObj } from "../BuildEventObj"
import { Choice } from "../Choice"
import { Question } from "../Question"
import { Path } from "../Path"
import { get_fight_wolf_text, get_meet_wolf_text } from "./WolfText"
import { REPLACABLE_DEFAULT_PATH } from "../RandomEvent"
import { AllEvents } from "../AllEvents"
import { EventDefine } from "../EventDefine"
import { get_dice_result, get_elite_sneak_roll_point, roll_dice } from "../questions/RollDice"
import { Condition } from "../Condition"
import { get_choice_fight_wolf } from "./WolfFight.event"

function get_meet_wolf_event(){
    let wolf_class = class Apple extends BuildEventObj {
        build_question(values: Values): Question {
            let question = new Question({
                question_txt: get_meet_wolf_text(values),
                choices: [],
                observ_show_questions: [()=>{
                    values.get_variables().got_wolf_item.val = false
                    values.get_variables().escape_wolf_fail.val = false
                }],
            })
    
            return question
        }

        build_choices(values: Values): Choice[] {
            let all_events = new AllEvents
            let event_define = new EventDefine(all_events)
            return [
                    new Choice({
                        choice_context: "[ เตรียมสู้ ]",
                        conditions: [],
                        observ_click_choice: [()=>{
                            if(values.get_variables().elf_joined_party.val){
                                values.get_variables().elf_meet_wolf_first_time.val = true
                            }
                        }],
                        paths:[
                            new Path({
                                path: REPLACABLE_DEFAULT_PATH,
                                plob_events: {
                                    events: [{
                                        event_name: event_define.get_key(event_define.all_events.fight_wolf),
                                        chance: 100,
                                    }],
                                    default_path_chance: 0
                                },
                                conditions: []
                            })
                        ]
                    }),
                    new Choice({
                        choice_context: "[ หลบ ]",
                        conditions: [],
                        observ_click_choice: [()=>{
                            if(values.get_variables().elf_joined_party.val){
                                values.get_variables().elf_meet_wolf_first_time.val = true
                            }
                            roll_dice(values)
                        }],
                        paths:[
                            new Path({
                                path: REPLACABLE_DEFAULT_PATH,
                                plob_events: {
                                    events: [{
                                        event_name: event_define.get_key(event_define.all_events.escape_wolf_success),
                                        chance: 100,
                                    }],
                                    default_path_chance: 0
                                },
                                conditions: [[
                                    new Condition(()=>{return get_dice_result(values) * 100 + get_elite_sneak_roll_point(values) >= 50})
                                ]]
                            }),
                            new Path({
                                path: REPLACABLE_DEFAULT_PATH,
                                plob_events: {
                                    events: [{
                                        event_name: event_define.get_key(event_define.all_events.escape_wolf_fail),
                                        chance: 100,
                                    }],
                                    default_path_chance: 0
                                },
                                conditions: [[
                                    new Condition(()=>{return get_dice_result(values) * 100 + get_elite_sneak_roll_point(values) < 50})
                                ]]
                            }),
                        ]
                    }),
                ]   
        }
    }
    return wolf_class
}

function get_fight_wolf_event(){
    let wolf_class = class Apple extends BuildEventObj {
        build_question(values: Values): Question {
            let question = new Question({
                question_txt: get_fight_wolf_text(values),
                choices: [],
                observ_show_questions: [],
            })
    
            return question
        }

        build_choices(values: Values): Choice[] {
            let all_events = new AllEvents
            let event_define = new EventDefine(all_events)
            return [
                get_choice_fight_wolf(values, event_define)
            ]   
        }
    }
    return wolf_class
}

export let MeetWolfEvent = get_meet_wolf_event()
export let FightWolfEvent = get_fight_wolf_event()