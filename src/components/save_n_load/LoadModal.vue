<script setup lang="ts">
import { RouteName } from '@/router/RouteName';
import SaveNLoadModalTemplate from './SaveNLoadModalTemplate.vue';
import { SaveWithName } from '@/features/save_n_load/SaveAndLoadRepo';
import { Constants } from '@/util/Constants';
</script>
<template>
<SaveNLoadModalTemplate :save_on_click="do_load_save" :modal_id="'load_modal'">
  <template v-slot:btn_modal_txt>
    โหลดบันทึก
  </template>
  <template v-slot:modal_title>
    <h4 class="modal-title">โหลดบันทึก</h4>
  </template>
</SaveNLoadModalTemplate>
</template>

<style src="./SaveNLoadModalTemplate.css" module="save_n_load_modal"></style>
<style src="./LoadModal.css" module="load_modal"></style>

<script lang="ts">
export default {
    methods: {
        do_load_save(save : SaveWithName){
            window.location.hash = `/${RouteName.HOMEPAGE}?${Constants.SAVE_N_LOAD_CONTEXT}=${save.save_name}`
            window.location.reload()
        },
    }
}
</script>