import { Values } from "@/features/values/Values";
import { QuestionDefine } from "../QuestionDefine";
import { get_choice_to_thief_camp } from "./ThiefCamp.question";
import { get_choice_to_goblin_camp } from "./GoblinCamp.question";
import { get_all_choice_to_elf_room } from "./Elf.question";
import { get_all_choices_to_mimic_room } from "./MimicPathToRoom";
import { get_all_choices_to_library } from "./Library.question";
import { get_all_choices_to_mystery_front_room } from "./MysteryRoom.question";
import { get_choice_to_inside_mystery_room } from "./MysteryRoomUnlock.question";
import { Choice } from "../Choice";
import { get_all_choices_to_ritual_room } from "./Ritual.question";

export enum DungeonLocations {
    RITUAL,
    INSIDE_ROOM,
    MYSTERY_ROOM,
    LIBRARY,
    MIMIC,
    ELF,
    GOBLIN_CAMP,
    THIEF_CAMP,
}

interface AllChoicesData {
    [key: string] : Array<Choice> | Choice, 
}

export function get_default_all_choice_in_location(location : DungeonLocations, 
    values : Values, question_define : QuestionDefine) : Choice[]{
        let choices : AllChoicesData = {}
        choices[DungeonLocations.RITUAL.toString()] = get_all_choices_to_ritual_room(values, question_define)
        choices[DungeonLocations.INSIDE_ROOM.toString()] = get_choice_to_inside_mystery_room(values, question_define)
        choices[DungeonLocations.MYSTERY_ROOM.toString()] = get_all_choices_to_mystery_front_room(values, question_define)
        choices[DungeonLocations.LIBRARY.toString()] = get_all_choices_to_library(values, question_define)
        choices[DungeonLocations.MIMIC.toString()] = get_all_choices_to_mimic_room(values, question_define)
        choices[DungeonLocations.ELF.toString()] = get_all_choice_to_elf_room(values, question_define)
        choices[DungeonLocations.GOBLIN_CAMP.toString()] = get_choice_to_goblin_camp(values, question_define)
        choices[DungeonLocations.THIEF_CAMP.toString()] = get_choice_to_thief_camp(values, question_define)

        delete choices[location.toString()]

        let res_choices : Choice[] = []
        let keys = Object.keys(choices)
        for(let i=0;i<keys.length;i++){
            let key = keys[i]
            let c = choices[key]
            if(c instanceof Array){
                res_choices = [
                    ...res_choices,
                    ...c
                ]
            } else {
                res_choices = [
                    ...res_choices,
                    c
                ]
            }
        }

        return res_choices

}