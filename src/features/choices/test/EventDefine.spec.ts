// import { beforeEach, describe, expect, test } from "vitest";
// import { Question } from "../Question";
// import { BuildEventObj } from "../BuildEventObj";
// import { Values } from "@/features/values/Values";
// import { Choice } from "../Choice";
// import { AllEvents } from "../AllEvents";
// import { EventDefine } from "../EventDefine";

import { describe, test } from "vitest";

// let event = new Question({
//             question_txt: "event1",
//             choices:[],
//             observ_show_questions:[],
//         })

// class MockBuildEvent extends BuildEventObj {
//     build_choices(values: Values): Choice[] {
//         return []
//     }
//     build_question(values: Values): Question {
//         return event
//     }
// }

// class MockFalseBuildEvent extends BuildEventObj {
//     build_choices(values: Values): Choice[] {
//         return []
//     }
//     build_question(values: Values): Question {
//         return new Question()
//     }
// }

// class MockAllEvents extends AllEvents {
//     mockBuildQuestion = new MockBuildEvent()
// }


// describe("EventDefine", ()=>{

//     let mockAllEvents : MockAllEvents
//     let eventDefine : EventDefine

//     beforeEach(()=>{
//         mockAllEvents = new MockAllEvents
//         eventDefine = new EventDefine(mockAllEvents)
//     })

//     describe("get_key", ()=>{
//         test("return string if have data in list", ()=>{
//             expect(eventDefine.get_key(mockAllEvents.mockBuildQuestion)).toBe('mockBuildQuestion')
//         })

//         test("return null if not have data in list", ()=>{
//             expect(eventDefine.get_key(new MockFalseBuildEvent)).toBe(null)
//         })
//     })

//     describe("build_question", ()=>{
//         test("return question if have data in list", ()=>{
//             console.log(eventDefine.get_key(mockAllEvents.mockBuildQuestion))
//             expect(eventDefine.build_event(eventDefine.get_key(mockAllEvents.mockBuildQuestion), '', new Values))
//             .toEqual(event)
//         })

//         test("return null if not have data in list", ()=>{
//             expect(eventDefine.build_event('', '', new Values))
//             .toBe(null)
//         })
//     })
// })

describe("",()=>{
    test("",()=>{
        
    })
})