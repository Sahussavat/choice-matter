<script setup>
import InventoryModal from '../inventory/InventoryModal.vue';
import SaveMenu from './SaveMenu.vue';


</script>

<template>
  <div :class="menu.modal_btn_box">
    <div :class="menu.btn_box">
      <InventoryModal></InventoryModal>
    </div>
    <SaveMenu></SaveMenu>
  </div>


</template>

<style src="./Menu.css" module="menu"></style>

<script>

export default {

}
</script>