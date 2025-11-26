
export interface WhatToDo {
    validate_fn : ()=> boolean,
    on_check_validate : (is_pass : boolean)=>void,
    on_all_validate_pass : CallableFunction,
}

export class CreateCharacterUtill {
    private what_todo_arr : WhatToDo[] = []

    add_create_todo_list(what_todo : WhatToDo) : void{
        this.what_todo_arr.push(what_todo)
    }

    validate_all(){
        let is_pass = true
        for(let i=0;i<this.what_todo_arr.length;i++){
            let todo = this.what_todo_arr[i]
            todo.on_check_validate(is_pass)
            is_pass &&= todo.validate_fn()
        }
        return is_pass
    }

    start_create(){
        let is_pass = true && this.validate_all()
        if(is_pass){
            for(let i=0;i<this.what_todo_arr.length;i++){
                let todo = this.what_todo_arr[i]
                todo.on_all_validate_pass()
            }
        }
    }
}