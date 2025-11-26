<script lang="ts" setup>
import Inventory from './Inventory.vue';
import StatusModalDes from '../status/StatusModalDes.vue';
import { Observer } from '@/util/Observer';
import { VariableLayout } from '@/features/values/Variables';
</script>

<template>
  <button type="button" :class="'btn btn-primary '+inv_modal.btn_menu" data-bs-toggle="modal" data-bs-target="#inventory-modal">
    ช่องเก็บของ
  </button>
  <StatusModalDes v-bind:status_des modal_id="status_des_modal_inv" toggle_modal_id="inventory-modal"></StatusModalDes>
  <div :class="'modal fade '+inv_modal.modal_box" data-bs-backdrop="static" id="inventory-modal" tabindex="-1">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div :class="'modal-body '+inv_modal.menu_body">
          <Inventory v-bind:observer_stat></Inventory>
        </div>
        <div :class="'modal-footer'">
          <div :class="inv_modal.footer_box">
            <div :class="inv_modal.footer_left">
            </div>
            <div :class="inv_modal.footer_right">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">ปิด</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style src="./InventoryModal.css" module="inv_modal"></style>

<script lang="ts">
export default {
  data(){
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
    show_status_des(status_des : VariableLayout){
      this.status_des = status_des
    }
  }
}
</script>