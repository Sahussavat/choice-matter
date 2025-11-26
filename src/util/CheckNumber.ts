
export class CheckNumber {
    static is_number(val : string | number){
        return !Number.isNaN(Number(val))
    }
}