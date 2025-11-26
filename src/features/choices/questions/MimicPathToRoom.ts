import { Values } from "@/features/values/Values";
import { QuestionDefine } from "../QuestionDefine";
import { Choice } from "../Choice";
import { Path } from "../Path";
import { Condition } from "../Condition";
import { get_wolf_plob_random } from "../events/Wolf.plob";

function get_paths(values : Values, question_define : QuestionDefine){
    return [
            new Path({
                path: question_define.get_key(question_define.all_questions.mimic_alone_first_time),
                conditions: [
                    [new Condition(()=>{
                        return !values.get_variables().elf_joined_party.val
                        && !values.get_variables().halfling_joined_party.val
                        && !values.get_variables().mimic_first_time.val
                    })]
                ],
                plob_events: get_wolf_plob_random(values),
            }),
            new Path({
                path: question_define.get_key(question_define.all_questions.mimic_alone_default_not_know),
                conditions: [
                    [new Condition(()=>{
                        return !values.get_variables().elf_joined_party.val
                        && !values.get_variables().halfling_joined_party.val
                        && values.get_variables().mimic_first_time.val
                        && !values.get_variables().known_its_mimic.val
                    })]
                ],
                plob_events: get_wolf_plob_random(values),
            }),
            new Path({
                path: question_define.get_key(question_define.all_questions.mimic_alone_default_know),
                conditions: [
                    [new Condition(()=>{
                        return !values.get_variables().halfling_joined_party.val
                        && values.get_variables().mimic_first_time.val
                        && values.get_variables().known_its_mimic.val
                    })]
                ],
                plob_events: get_wolf_plob_random(values),
            }),
            new Path({
                path: question_define.get_key(question_define.all_questions.mimic_elf_first_time),
                conditions: [
                    [new Condition(()=>{
                        return values.get_variables().elf_joined_party.val
                        && !values.get_variables().halfling_joined_party.val
                        && !values.get_variables().known_its_mimic.val
                    })]
                ],
            }),
            new Path({
                path: question_define.get_key(question_define.all_questions.mimic_halfling_not_know),
                conditions: [
                    [new Condition(()=>{
                        return !values.get_variables().elf_joined_party.val
                        && values.get_variables().halfling_joined_party.val
                        && !values.get_variables().known_its_mimic.val
                    })]
                ],
                plob_events: get_wolf_plob_random(values),
            }),
            new Path({
                path: question_define.get_key(question_define.all_questions.mimic_halfling_know),
                conditions: [
                    [new Condition(()=>{
                        return values.get_variables().halfling_joined_party.val
                        && values.get_variables().known_its_mimic.val
                    })]
                ],
                plob_events: get_wolf_plob_random(values),
            }),
            new Path({
                path: question_define.get_key(question_define.all_questions.mimic_all_not_know),
                conditions: [
                    [new Condition(()=>{
                        return values.get_variables().elf_joined_party.val
                        && values.get_variables().halfling_joined_party.val
                    })]
                ],
                plob_events: get_wolf_plob_random(values),
            }),
        ]
}

function get_choice_to_mimic_room_first_time(values : Values, question_define : QuestionDefine){
    return new Choice({
        choice_context: `[ ไปต่อ ]`,
        conditions: [[
            new Condition(()=>{
                return !values.get_variables().mimic_first_time.val
                && !values.get_variables().opend_mimic.val
                && values.get_variables().elf_room_first_time.val
            })
        ]],
        observ_click_choice: [],
        paths: get_paths(values, question_define)
    })
}

function get_choice_to_mimic_room_default_not_know(values : Values, question_define : QuestionDefine){
    return new Choice({
        choice_context: `[ ไปยังห้องที่มีกล่องปริศนา ]`,
        conditions: [[
            new Condition(()=>{
                return values.get_variables().mimic_first_time.val
                && !values.get_variables().known_its_mimic.val
                && !values.get_variables().opend_mimic.val
            })
        ]],
        observ_click_choice: [],
        paths: get_paths(values, question_define)
    })
}

function get_choice_to_mimic_room_default_know(values : Values, question_define : QuestionDefine){
    return new Choice({
        choice_context: `[ ไปยังห้องที่มีกล่อง Mimic ]`,
        conditions: [[
            new Condition(()=>{
                return values.get_variables().mimic_first_time.val
                && values.get_variables().known_its_mimic.val
                && !values.get_variables().opend_mimic.val
            })
        ]],
        observ_click_choice: [],
        paths: get_paths(values, question_define)
    })
}

export function get_all_choices_to_mimic_room(values : Values, question_define : QuestionDefine){
    return [
        get_choice_to_mimic_room_first_time(values, question_define),
        get_choice_to_mimic_room_default_not_know(values, question_define),
        get_choice_to_mimic_room_default_know(values, question_define),
    ]
}