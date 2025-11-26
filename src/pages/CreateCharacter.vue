<script setup lang="ts">
import ChoiceLayout from '@/components/create_character/ChoiceLayout.vue';
import { Values } from '@/features/values/Values';
import { Constants } from '@/util/Constants';
</script>

<template>
    <ChoiceLayout></ChoiceLayout>
</template>

<script lang="ts">
import { Define } from '@/util/Define';
export default {
    provide(){
        let saveNLoad = Define.get_save_n_load()
        let values = new Values
        let provider = {}
        provider[Constants.VALUES_CONTEXT] = values
        provider[Constants.SAVE_N_LOAD_CONTEXT] = saveNLoad
        return provider
    },
}
</script>