
export interface RandomEventData {
    event_name: string,
    chance: number,
}

export const REPLACABLE_DEFAULT_PATH = '__replaceable_default_path__'

export function replace_for_continue_to_default_path(old_default_path : string,
     new_default_path : string) : string{
    return old_default_path.replace(REPLACABLE_DEFAULT_PATH, new_default_path)
}

export class RandomEvents {
    static get_random_events(events : RandomEventData[], default_path : string, 
        default_path_chance : number = 0) : string{
        if(!events.length){
            return default_path
        }
        let evts = [...events]
        if(default_path_chance > 0){
            evts.push({
                event_name: default_path,
                chance: default_path_chance,
            }) 
        }
        let res_event : RandomEventData = null
        let count_all_chances = 0
        for(let i=0;i<evts.length;i++){
            count_all_chances += evts[i].chance
        }
        let random_i = Math.random() * count_all_chances
        let chances = 0
        for(let i=0;i<evts.length;i++){
            let event = evts[i] 
            chances += event.chance
            if(random_i <= chances){
                res_event = event
                break;
            }
        }
        return res_event.event_name
    }
}