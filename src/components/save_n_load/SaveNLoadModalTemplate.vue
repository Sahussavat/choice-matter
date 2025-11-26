
<template>
  <button type="button" :class="'btn btn-primary '+$style.btn_menu" data-bs-toggle="modal" :data-bs-target="'#'+modal_id">
    <slot name="btn_modal_txt">

    </slot>
  </button>
  <div :class="'modal fade '+$style.modal_box" data-bs-backdrop="static" :id="modal_id" tabindex="-1">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
            <slot name="modal_title">

            </slot>
        </div>
        <div :class="'modal-body '+$style.menu_body">
            <div :class="$style.saves_list_box">
              <div :class="$style.saves_list">
                <div :class="$style.save_box+' '+$style.prevent_select" v-for="save in saves" 
                v-on:click="click_save(save)">
                    <div :class="$style.save_name_box">
                      <h3 :class="$style.save_text">{{save.save_name}}</h3>
                    </div>
                    <div :class="$style.save_timestamp_box">
                      <h3 :class="$style.save_text"
                      >{{ (new Date(save.save_data.timestamp)).toLocaleString() }}</h3>
                    </div>
                </div>
              </div>
            </div>
        </div>
        <div class="modal-footer">
          <div :class="$style.modal_btn_box">
            <div :class="$style.modal_btn_box_left">
                <slot name="left_side_btn">

                </slot>
            </div>
            <div :class="$style.modal_btn_box_right">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">ปิด</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style src="./SaveNLoadModalTemplate.css" module></style>

<script>
import { CookieSaveNLoad } from '@/features/save_n_load/cookie_save/CookieSaveNLoad';
import { Constants } from '@/util/Constants';
import { inject } from 'vue';

export default {
  props: ['save_on_click', 'modal_id'],

  data(){
    return {
      saves: [],
      modal_id: this.modal_id,
    }
  },

  mounted(){
    let saveNLoad = (new CookieSaveNLoad) 
    let save_inject = inject(Constants.SAVE_N_LOAD_CONTEXT)
    if(save_inject){
      saveNLoad = save_inject
    }
    this.$data.saves = saveNLoad.get_saves()
    saveNLoad.on_saves_change(()=>{this.$data.saves = saveNLoad.get_saves()})
  },


  methods: {
    click_save(save){
      if(this.save_on_click){
        this.save_on_click(save)
      }
    },
  }
}
</script>