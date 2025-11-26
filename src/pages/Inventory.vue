<script lang="ts" setup>
import InventoryShow from '@/components/inventory/InventoryShow.vue';
import { Values } from '@/features/values/Values';
import { Constants } from '@/util/Constants';
import { Define } from '@/util/Define';
</script>

<template>
    <InventoryShow></InventoryShow>
</template>

<script lang="ts">
export default {
    provide(){
        let v = new Values
        let saveNLoad = Define.get_save_n_load()
        let saves = saveNLoad.get_saves()
        let question_name = ""
        let event_name = ""
        if(saves.length){
            v.set_all_vals(saves[0].save_data.values)
            question_name = saves[0].save_data.current_question_name
            event_name = saves[0].save_data.current_event_name
        }
        let provider = {}
        provider[Constants.VALUES_CONTEXT] = v
        provider[Constants.SAVE_N_LOAD_CONTEXT] = saveNLoad
        provider[Constants.QUESTION_NAME_CONTEXT] = question_name
        provider[Constants.EVENT_NAME_CONTEXT] = event_name
        return provider
    }
}
</script>