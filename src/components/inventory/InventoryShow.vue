<script lang="ts" setup>
import Inventory from './Inventory.vue';
import StatusModalDes from '../status/StatusModalDes.vue';
import { Observer } from '@/util/Observer';
import { VariableLayout } from '@/features/values/Variables';
</script>
<template>
    <StatusModalDes v-bind:status_des modal_id="status_des_modal_inv" toggle_modal_id="inventory-modal"></StatusModalDes>
    <div :class="inv.window_box">
        <div :class="inv.inventory_box">
            <Inventory v-bind:observer_stat></Inventory>
        </div>
        <div :class="inv.btns_box+' '+menu.modal_btn_box">
            <div :class="menu.btn_box">
                <button :class="'btn btn-primary '+inv_modal.btn_menu"
                 v-on:click="back()">ย้อนกลับ</button>
            </div>
        </div>
    </div>
</template>

<style src="./InventoryShow.css" module="inv"></style>
<style src="./InventoryModal.css" module="inv_modal"></style>
<style src="../menu/Menu.css" module="menu"></style>

<script lang="ts">
export default {
    data() {
      return {  
        status_des: null,
        observer_stat: new Observer,
      }  
    },
    mounted(){
        let obs : Observer = this.observer_stat
        obs.on_signal(this.show_status_des)
    },
    methods: {
        back(){
            history.back()
        },

        show_status_des(status_des : VariableLayout){
            this.status_des = status_des
        },
    }
}
</script>