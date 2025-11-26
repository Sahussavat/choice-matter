import { ResValid, ValidateFn } from "./ValidateFn"

export class Validate {
    private is_pass = true
    private err_texts : string[] = []
    private v : number | string | null = null

    constructor(v : number | string | null){
        this.v = v
    }

    is_not_null(){
        this.calc_cond(ValidateFn.is_not_null(this.v))
        return this
    }

    is_under_max_str_length(max_len : number){
        this.calc_cond(ValidateFn.is_under_max_str_length(this.v, max_len))
        return this
    }

    is_not_have_this_name(name_list : string[]){
        this.calc_cond(ValidateFn.is_not_have_this_name(this.v, name_list))
        return this
    }

    custome_check(cond : boolean, err_txt : string){
        this.calc_cond(ValidateFn.check(cond, err_txt))
        return this
    }

    calc_cond(res : ResValid){
        this.is_pass &&= res.is_pass
        this.err_texts = [...this.err_texts, ...res.err_texts]
    }

    get_result() : ResValid{
        let is_pass = this.is_pass
        let err_texts = this.err_texts
        this.reset()
        return { is_pass: is_pass, err_texts: err_texts }
    }

    reset(){
        this.is_pass = true
        this.err_texts = []
        this.v = null
    }
}