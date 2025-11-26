import { describe, expect, test, vi } from "vitest";
import { RandomEventData, RandomEvents, REPLACABLE_DEFAULT_PATH, replace_for_continue_to_default_path } from "../RandomEvent";

describe("RandomEvent", ()=>{
    let default_path = "default_path"
    let event1 : RandomEventData = {
        event_name: "event1",
        chance: 5
    }
    let event2 : RandomEventData = {
        event_name: "event2",
        chance: 5
    }
    describe("get_random_events", ()=>{
        test("get default path if not define any event", ()=>{
            expect(RandomEvents.get_random_events([], default_path)).toBe(default_path)
        })

        test("not get default path if not define chance for it and have events to occur", ()=>{
            vi.spyOn(Math, "random").mockReturnValue(1)
            expect(RandomEvents.get_random_events([event1, event2], default_path)).toEqual(event2.event_name)
        })

        test("get default path if not define chance for it and have events to occur", ()=>{
            vi.spyOn(Math, "random").mockReturnValue(1)
            expect(RandomEvents.get_random_events([event1, event2], default_path, 1)).toEqual(default_path)
        })

        test("get events by random chance correctly", ()=>{
            vi.spyOn(Math, "random").mockReturnValue(0.2)
            expect(RandomEvents.get_random_events([event1, event2], default_path, 1)).toEqual(event1.event_name)
            vi.spyOn(Math, "random").mockReturnValue(0.7)
            expect(RandomEvents.get_random_events([event1, event2], default_path, 1)).toEqual(event2.event_name)
        })
    })
})

describe("replace_for_continue_to_default_path", ()=>{
    test("replace if default path is replaceale", ()=>{
        let target_str = "correct"
        expect(replace_for_continue_to_default_path(REPLACABLE_DEFAULT_PATH, target_str)).toBe(target_str)
    })

    test("not replace if default path is not replaceale", ()=>{
        let target_str = "correct"
        let expect_str = "string"
        expect(replace_for_continue_to_default_path(expect_str, target_str)).toBe(expect_str)
    })
})