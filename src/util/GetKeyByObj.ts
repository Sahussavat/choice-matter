
export class GetKeyByObj {
    static get_key(val : Object, find_target: Object) : string | null{
        let res_key = null
        let keys = Object.keys(find_target)
        for(let i=0;i<keys.length;i++){
            let k = keys[i]
            if(val === find_target[k]){
                res_key = k
                break;
            }
        }
        return res_key
    }
}