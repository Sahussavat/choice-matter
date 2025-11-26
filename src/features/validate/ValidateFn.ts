import { ErrorTexts } from "./ErrorTexts"

export interface ResValid {
    is_pass : boolean,
    err_texts : string[]
}

export class ValidateFn {
    static is_not_null(v : number | string | null) : ResValid{
        return ValidateFn.check(Boolean(v), ErrorTexts.NOT_NULL)
    }

    static is_under_max_str_length(v : number | string | null, max_len : number){
        if(typeof(v) === typeof("")){
            v = v.toString()
            return ValidateFn.check(v.length <= max_len
            , ErrorTexts.MAX_STRING_len.replace(ErrorTexts.REPLACE_S
                , max_len.toString()))
        }
        return ValidateFn.check(true)
    }

    static is_not_have_this_name(v : number | string | null, name_list : string[]){
        if(typeof(v) === typeof("")){
            v = v.toString()
            return ValidateFn.check(!name_list.includes(v)
            , ErrorTexts.ALREADY_HAVE_THIS_NAME)
        }
        return ValidateFn.check(true)
    }

    static check(cond : boolean, err_txt? : string) : ResValid{
        if(!cond){
            let err_texts = []
            if(err_txt){
                err_texts.push(err_txt)
            }
            return {is_pass: cond, err_texts: err_texts}
        }
        return {is_pass: cond, err_texts:[]}
    }
}