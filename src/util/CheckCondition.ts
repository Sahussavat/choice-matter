import { Condition } from "@/features/choices/Condition"

export class CheckCondition {
    static check_cond(conditions : Condition[][]){
        let is_pass = true
        for(let i=0;i<conditions.length;i++){
            let and_cond_check = true
            for(let k=0;k<conditions[i].length;k++){
                let cond = conditions[i][k]
                and_cond_check &&= cond.check()
                is_pass = and_cond_check
                if(!and_cond_check){
                    break;
                }
            }
            if(and_cond_check){
                break;
            }
        }
        return is_pass
    }
}