
import { SaveAllLayout, SaveAndLoadRepo, SaveLayout, SaveWithName } from "../SaveAndLoadRepo";
import { Cookies } from "typescript-cookie";

export class CookieSaveNLoad implements SaveAndLoadRepo {
    private readonly MAX_SAVES = 2
    private readonly DEFAULT_SAVE_NAME = "Save"
    private save_all_name : string
    private readonly AUTO_SAVE_NAME = "Auto-Save"
    private readonly cookies
    private save_all_data : SaveAllLayout = {}
    private expires = new Date(new Date().setFullYear(new Date().getFullYear() + 1));
    private observer_saves_change = []

    constructor(cookies = Cookies, name : string = "SAVES_ALL"){
        this.save_all_name = name
        this.cookies = cookies
        this.load_all_data()
    }

    load_all_data(){
        let save_res = this.cookies.get(this.save_all_name)
        if(typeof(save_res) === typeof("string")){
            save_res = save_res.toString()
            try {
                save_res = JSON.parse(save_res)
            } catch(e){
                save_res = ""
            }
        }
        if(save_res && typeof(save_res) !== typeof("string")){
            Object.keys(save_res).map((k)=>{
                this.save_all_data[k] = save_res[k]
            })
        }
    }
    
    on_saves_change(callable: CallableFunction): void {
        this.observer_saves_change.push(callable)
    }

    signal_saves_change(): void {
        for(let i=0;i<this.observer_saves_change.length;i++){
            this.observer_saves_change[i]()
        }
    }

    do_auto_save(save : SaveLayout): void {
        this.save(this.AUTO_SAVE_NAME, save)
    }

    delete_save(save_name: string): void {
        if(this.is_have_this_save_name(save_name)){
            delete this.save_all_data[save_name]
            this.save_all()
        }
    }
    
    get_saves(): SaveWithName[] {
        let res : SaveWithName[] = []
        Object.keys(this.save_all_data).map((k : string)=>{
            res.push({
                save_name: k,
                save_data: this.save_all_data[k]
            })
        })
        res = res.sort((a, b)=>{
            return b.save_data.timestamp - a.save_data.timestamp
        })
        return res
    }

    get_save_by_name(name : string): SaveLayout {
        let res = null
        if(this.save_all_data[name]){
            res = this.save_all_data[name]
        }
        return res
    }

    save(save_name : string, save : SaveLayout, except_save_name? : string[]){
        if((!this.is_have_this_save_name(save_name) && !this.is_save_max())
            || (except_save_name) || save_name === this.AUTO_SAVE_NAME){
            this.save_all_data[save_name] = save
            if(except_save_name && !except_save_name.includes(save_name)){
                for(let i=0;i<except_save_name.length;i++){
                    this.delete_save(except_save_name[i])
                }
            }
            this.save_all()
        }
    }

    is_save_max(){
        return Object.keys(this.save_all_data).length >= this.MAX_SAVES
    }

    save_all(){
        this.cookies.set(this.save_all_name, "", 
        { expires: this.expires })
        this.cookies.set(this.save_all_name, JSON.stringify(this.save_all_data), 
        { expires: this.expires })
    }

    get_unused_save_name() : string{
        let name = ''
        let i = 1
        while(this.is_have_this_save_name(this.DEFAULT_SAVE_NAME+" "+i)){
            i++
        }
        name = this.DEFAULT_SAVE_NAME+" "+i
        return name
    }

    load(save_name: string): SaveLayout {
        if(this.is_have_this_save_name(save_name)){
            return this.save_all_data[save_name]
        }
        return null
    }

    is_have_this_save_name(save_name: string): boolean {
        return save_name in this.save_all_data
    }
}
