import { Values } from "@/features/values/Values";
import { QuestionDefine } from "../QuestionDefine";
import { Path } from "../Path";
import { Condition } from "../Condition";

export function path_to_inside_mystery_room(values : Values, question_define : QuestionDefine){
    return [
        new Path({
            path: question_define.get_key(question_define.all_questions.inside_room_alone_first_time),
            conditions: [[
                new Condition(()=>{
                    return !values.get_variables().elf_joined_party.val
                    && !values.get_variables().inside_mystery_room_first_time.val
                })
            ]],
        }),
        new Path({
            path: question_define.get_key(question_define.all_questions.inside_room_default_not_read),
            conditions: [[
                new Condition(()=>{
                    return !values.get_variables().elf_joined_party.val
                    && values.get_variables().inside_mystery_room_first_time.val
                    && !values.get_variables().readed_note.val
                })
            ]],
        }),
        new Path({
            path: question_define.get_key(question_define.all_questions.inside_room_default_read),
            conditions: [[
                new Condition(()=>{
                    return values.get_variables().inside_mystery_room_first_time.val
                    && values.get_variables().readed_note.val
                })
            ]],
        }),
        new Path({
            path: question_define.get_key(question_define.all_questions.inside_room_with_elf_first_time),
            conditions: [[
                new Condition(()=>{
                    return values.get_variables().elf_joined_party.val
                    && !values.get_variables().inside_mystery_room_first_time.val
                })
            ]],
        }),
        new Path({
            path: question_define.get_key(question_define.all_questions.inside_room_with_elf_again),
            conditions: [[
                new Condition(()=>{
                    return values.get_variables().elf_joined_party.val
                    && values.get_variables().inside_mystery_room_first_time.val
                })
            ]],
        }),
    ]
}