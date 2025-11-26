import { Values } from "@/features/values/Values";
import { Question } from "../Question";
import { Choice } from "../Choice";
import { Path } from "../Path";
import { BuildEventObj } from "../BuildEventObj";

function get_apple_event(){
    let apple_class = class Apple extends BuildEventObj {
        build_choices(values: Values): Choice[] {
            return [
                    new Choice({
                        choice_context: "เอาๆ",
                        conditions: [],
                        observ_click_choice: [],
                        paths:[
                            new Path({
                                path: "1",
                                conditions: []
                            })
                        ]
                    }),
                    new Choice({
                        choice_context: "ไม่เอาๆ",
                        conditions: [],
                        observ_click_choice: [],
                        paths:[
                            new Path({
                                path: "2",
                                conditions: []
                            })
                        ]
                    }),
                ]    
        }

        build_question(values: Values): Question {
            let question = new Question({
                question_txt: "เอาแอปเปิ้ลไหม",
                choices: [],
                observ_show_questions: [],
            })

            return question
        }
    }
    return apple_class
}

export let Apple = get_apple_event()