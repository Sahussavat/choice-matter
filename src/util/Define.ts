import { AllQuestions } from "@/features/choices/AllQuestions";
import { QuestionDefine } from "@/features/choices/QuestionDefine";
import { CookieSaveNLoad } from "@/features/save_n_load/cookie_save/CookieSaveNLoad";
import { SaveAndLoadRepo } from "@/features/save_n_load/SaveAndLoadRepo";
import { RouteName } from "@/router/RouteName";

export class Define {
    static get_first_question_name() : string{
        let all_questions = new AllQuestions
        return new QuestionDefine(all_questions).get_key(all_questions.village_first_time)
    }

    static get_save_n_load() : SaveAndLoadRepo{
        return new CookieSaveNLoad
    }

    static get_shop_path() : string{ return `/#/${RouteName.SHOP}`}
    static get_create_char_path() : string{ return `/#/${RouteName.CREATE_CHAR}`}
}