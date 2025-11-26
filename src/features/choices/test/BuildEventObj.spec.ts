import { beforeEach, describe, expect, test } from "vitest";
import { Values } from "@/features/values/Values";
import { EventDefine } from "../EventDefine";
import { AllEvents } from "../AllEvents";
import { DefineChoices, mock_choices, mock_define_choice_name, mock_not_define_choice_name, NotDefineChoices } from "../events/test/mock_data";



describe("BuildEventObj", ()=>{
    let all_event : AllEvents
    let eventDefine : EventDefine

    beforeEach(()=>{
        all_event = new AllEvents
        all_event[mock_define_choice_name] = new DefineChoices
        all_event[mock_not_define_choice_name] = new NotDefineChoices
        eventDefine = new EventDefine(all_event)
    })

    describe("build", ()=>{
        test("build event with default choice if does not define choice", ()=>{
            let default_path = "default_path"
            let event = eventDefine.build_event(mock_not_define_choice_name, default_path, new Values)
            expect(event['choices'][0]['paths'][0].get_path().default_path).toBe(default_path)
        })

        test("build event with defines choices if does define choice", ()=>{
            let default_path = "default_path"
            let event = eventDefine.build_event(mock_define_choice_name, default_path, new Values)
            expect(event['choices'][0]['paths'][0].get_path().default_path).not.toBe(default_path)
            expect(event['choices']).toEqual(mock_choices)
        })
    })
})