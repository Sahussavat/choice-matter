
export interface SaveLayout {
    current_question_name : string,
    current_event_name? : string,
    timestamp : number,
    values: {
        [key : string] : string | number | boolean
    }
}

export interface SaveWithName {
    save_name : string,
    save_data : SaveLayout,
}

export interface SaveAllLayout {
    [key : string]: SaveLayout
}

export interface SaveAndLoadRepo {
    save(save_name : string, save : SaveLayout, except_save_name?:string[]): void,
    load(save_name : string): SaveLayout,
    do_auto_save(save : SaveLayout): void,
    delete_save(save_name : string): void,
    get_saves() : SaveWithName[],
    is_have_this_save_name(save_name : string, except_save_name? : string[]): boolean,
    get_unused_save_name() : string,
    on_saves_change(callable : CallableFunction) : void,
    signal_saves_change() : void,
    is_save_max() : boolean,
    get_save_by_name(name : string) : SaveLayout,
}