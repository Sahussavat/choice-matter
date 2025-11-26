import { beforeEach, describe, expect, test } from "vitest";
import { BuildEventObj } from "../BuildEventObj";
import { Values } from "@/features/values/Values";
import { Choice } from "../Choice";
import { Question } from "../Question";
import { EventDefine } from "../EventDefine";
import { AllEvents } from "../AllEvents";
import { Path } from "../Path";

let choices = [
    new Choice({
        choice_context: "choice1",
        conditions: [],
        observ_click_choice: [],
        paths: [
            new Path({
                path: "path1",
                conditions: []
            })
        ],
    }),
    new Choice({
        choice_context: "choice2",
        conditions: [],
        observ_click_choice: [],
        paths: [
            new Path({
                path: "path2",
                conditions: []
            })
        ],
    }),
]
let define_choice_name = 'define'
class DefineChoices extends BuildEventObj {
    build_choices(values: Values): Choice[] {
        return choices
    }
    build_question(values: Values): Question {
        return new Question
    }
}

let not_define_choice_name = 'not_define'
class NotDefineChoices extends BuildEventObj {
    build_choices(values: Values): Choice[] {
        return []
    }
    build_question(values: Values): Question {
        return new Question
    }
}

describe("BuildEventObj", ()=>{
    let all_event : AllEvents
    let eventDefine : EventDefine

    beforeEach(()=>{
        all_event = new AllEvents
        all_event[define_choice_name] = new DefineChoices
        all_event[not_define_choice_name] = new NotDefineChoices
        eventDefine = new EventDefine(all_event)
    })

    describe("build", ()=>{
        test("build event with default choice if does not define choice", ()=>{
            let default_path = "default_path"
            let event = eventDefine.build_event(not_define_choice_name, default_path, new Values)
            expect(event['choices'][0]['paths'][0].get_path().default_path).toBe(default_path)
        })

        test("build event with defines choices if does define choice", ()=>{
            let default_path = "default_path"
            let event = eventDefine.build_event(define_choice_name, default_path, new Values)
            expect(event['choices'][0]['paths'][0].get_path().default_path).not.toBe(default_path)
            expect(event['choices']).toEqual(choices)
        })
    })
})