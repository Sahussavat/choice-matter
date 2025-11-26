<script setup>
import LoadModal from '../save_n_load/LoadModal.vue';
import SaveModal from '../save_n_load/SaveModal.vue';
</script>

<template>
<div :class="menu.btn_box">
    <SaveModal></SaveModal>
</div>
<div :class="menu.btn_box">
    <LoadModal></LoadModal>
</div>
</template>

<style src="./Menu.css" module="menu"></style>

<script>
export default {

}
</script>