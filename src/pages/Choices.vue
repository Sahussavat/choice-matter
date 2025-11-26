
<script lang="ts" setup>
import { Values } from '@/features/values/Values';
</script>

<template>
    <QuestionLayout v-bind:quick_choose="quick_choose"></QuestionLayout>
</template>

<script lang="ts">
import { Define } from '@/util/Define';
import { Constants } from '@/util/Constants';
import QuestionLayout from '@/components/choices/QuestionLayout.vue';
export default {
    data() {
        return {
            quick_choose: null,
        }
    },

    provide(){
        let v = new Values
        let saveNLoad = Define.get_save_n_load()
        let saves = saveNLoad.get_saves()
        let question_name = this.$route.query[Constants.QUESTION_NAME_CONTEXT]
        let event_name = ""
        let save_name_req = this.$route.query[Constants.SAVE_N_LOAD_CONTEXT]
        let quick_choose : number = this.$route.query[Constants.QUICK_CHOOSE_CONTEXT]
        this.quick_choose = quick_choose
        if(saves.length){
            if(save_name_req && saveNLoad.is_have_this_save_name(save_name_req)){
                let save = saveNLoad.get_save_by_name(save_name_req)
                v.set_all_vals(save.values)
                question_name = save.current_question_name
                event_name = save.current_event_name
            } else {
                let save = saves[0].save_data
                v.set_all_vals(save.values)
                question_name = save.current_question_name
                event_name = save.current_event_name
            }
        } else {
            window.location.href = Define.get_create_char_path()
        }
        let provider = {}
        provider[Constants.VALUES_CONTEXT] = v
        provider[Constants.SAVE_N_LOAD_CONTEXT] = saveNLoad
        provider[Constants.QUESTION_NAME_CONTEXT] = question_name
        provider[Constants.EVENT_NAME_CONTEXT] = event_name
        provider[Constants.QUICK_CHOOSE_CONTEXT] = quick_choose
        return provider
    }
}
</script>