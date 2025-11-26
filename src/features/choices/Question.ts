import { Values } from "../values/Values"
import { Choice } from "./Choice"
import { Condition } from "./Condition"
import { Path } from "./Path"

interface DataLayout {
    question_txt : string,
    choices : Choice[],
    observ_show_questions : CallableFunction[],
}

export class Question {
    private question_txt
    private choices : Choice[]
    private observ_show_questions : CallableFunction[] = []

    constructor( data : DataLayout = {
        question_txt : "",
        choices : [],
        observ_show_questions : [],
    }){
        this.question_txt = data.question_txt
        this.choices = data.choices
        this.observ_show_questions = data.observ_show_questions
    }

    set_choices(choices : Choice[]){
        this.choices = choices
    }

    signal_show_question(){
        for(let i=0;i<this.observ_show_questions.length;i++){
            let observ = this.observ_show_questions[i]
            observ()
        }
    }

    on_show_question(observ : (vals : Values)=>{}){
        this.observ_show_questions.push(observ)
    }

    get_question_txt(){
        return this.question_txt
    }

    get_showable_choice(){
        let showable_choice : Choice[] = []
        for(let i=0;i<this.choices.length;i++){
            let choice = this.choices[i]
            if(choice.is_showable()){
                showable_choice.push(choice)
            }
        }
        return showable_choice
    }
}