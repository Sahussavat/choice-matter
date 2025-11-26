import { Values } from "../values/Values";
import { Choice } from "./Choice";
import { Path } from "./Path";
import { Question } from "./Question";

export abstract class BuildEventObj {
    build(values : Values, target_path : string) : Question {
        let question = this.build_question(values)
        let choices = this.build_choices(values)
        if(choices.length > 0){
            question.set_choices(choices)
        } else {
            question.set_choices([
                new Choice({
                    choice_context : "[ ไปต่อ ]",
                    conditions : [],
                    observ_click_choice : [],
                    paths : [
                        new Path({
                            path : target_path,
                            conditions : [],
                        })
                    ]
                })
            ])
        }
        return question
    }

    abstract build_choices(values : Values) : Choice[];

    abstract build_question(values : Values) : Question;
}