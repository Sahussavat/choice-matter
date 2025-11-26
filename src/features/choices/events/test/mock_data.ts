import { Values } from "@/features/values/Values"
import { BuildEventObj } from "../../BuildEventObj"
import { Choice } from "../../Choice"
import { Question } from "../../Question"
import { Path } from "../../Path"

export let mock_choices = [
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
export let mock_define_choice_name = 'define'
export class DefineChoices extends BuildEventObj {
    build_choices(values: Values): Choice[] {
        return mock_choices
    }
    build_question(values: Values): Question {
        return new Question
    }
}

export let mock_not_define_choice_name = 'not_define'
export class NotDefineChoices extends BuildEventObj {
    build_choices(values: Values): Choice[] {
        return []
    }
    build_question(values: Values): Question {
        return new Question
    }
}