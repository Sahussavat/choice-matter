
<template>
<div class="modal fade" :id="$props.modal_id" tabindex="-1" 
:data-bs-backdrop="$props.toggle_modal_id ? 'static' : null"
aria-hidden="true">
  <div class="modal-dialog">
    <div :class="'modal-content '+$style.status_des_box" v-if="$props.status_des">
      <div :class="'modal-header '+$style.header_box">
        <h5 :class="'modal-title '+$style.status_des_title">{{ $props.status_des['show_name'] }}</h5>
      </div>
      <div :class="'modal-body '+$style.status_des_body">
        <p>{{ $props.status_des['des'] }}</p>
      </div>
      <div :class="'modal-footer '+$style.footer_box">
        <button type="button" class="btn btn-secondary" 
        :data-bs-toggle="$props.toggle_modal_id ? 'modal' : null"
        :data-bs-target="'#'+$props.toggle_modal_id" 
        data-bs-dismiss="modal">ปิด</button>
      </div>
    </div>
  </div>
</div>
</template>

<style src="./StatusModalDes.css" module></style>

<script lang="ts">
export default {
    props: ['status_des', 'toggle_modal_id', 'modal_id'],
}
</script>