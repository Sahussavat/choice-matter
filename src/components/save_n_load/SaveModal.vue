
<script setup lang="ts">
import { inject } from 'vue';
import SaveNLoadModalTemplate from './SaveNLoadModalTemplate.vue';
import { SaveAndLoadRepo, SaveWithName } from '@/features/save_n_load/SaveAndLoadRepo';
import { Values } from '@/features/values/Values';
import { Validate } from '@/features/validate/Validate';
import { ErrorTexts } from '@/features/validate/ErrorTexts';
import { Constants } from '@/util/Constants';
</script>
<template>
<SaveNLoadModalTemplate :save_on_click="show_save_write" :modal_id="'save_modal'">
  <template v-slot:btn_modal_txt>
    บันทึก
  </template>
  <template v-slot:modal_title>
    <h4 class="modal-title">บันทึก</h4>
  </template>
  <template v-slot:left_side_btn>
    <button type="button" :class="'btn btn-primary '+(can_save_more ? null : save_modal.hide)" data-bs-target="#create-save-modal" 
      data-bs-toggle="modal" v-on:click="set_default_save_name"
      data-bs-dismiss="modal" ref="create_save_btn">
      สร้างบันทึก
    </button>
  </template>
</SaveNLoadModalTemplate>
  <div :class="'modal fade '+save_n_load_modal.modal_box" data-bs-backdrop="static" id="create-save-modal" tabindex="-1">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <span class="d-flex">
            <h2 class="modal-title">บันทึก</h2>
            <h2 v-if="override_save_target" class="modal-title"
            > ทับ {{ override_save_target.save_name }}</h2>
          </span>
        </div>
        <div :class="'modal-body '">
            <div class="input-group mb-3">
              <input type="text" class="form-control fs-2" :value="save_name"
              v-on:input="()=>{ set_save_name();
               check_save_name_err()}"
              placeholder="ชื่อบันทึก" ref="save_name_input">
              <span :class="'input-group-text fs-4 '+save_modal.max_save_name_len"
              >{{ save_name_len }} / {{ max_save_name_len }}</span>
            </div>
            <div :class="save_modal.input_error_txt">
              <h5>{{ error_text }}</h5>
            </div>
        </div>
        <div class="modal-footer">
          <div :class="save_n_load_modal.modal_btn_box">
            <div :class="save_n_load_modal.modal_btn_box_left">
                <button type="button" class="btn btn-success"
                v-on:click="write_save();">บันทึก</button>
            </div>
            <div :class="save_n_load_modal.modal_btn_box_right">
              <button type="button" class="btn btn-secondary" data-bs-target="#save_modal" 
              data-bs-toggle="modal"
              data-bs-dismiss="modal"
              ref="close_save_modal"
              v-on:click="reset_save_write()">ปิด</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style src="./SaveNLoadModalTemplate.css" module="save_n_load_modal"></style>
<style src="./SaveModal.css" module="save_modal"></style>

<script lang="ts">
let saveNLoad : SaveAndLoadRepo
let values : Values
let current_question_name : string
let current_event_name : string
export default {
  data(){
    return {
      override_save_target : null,
      save_name: null,
      error_text: null,
      max_save_name_len: 10,
      save_name_len: 0,
      can_save_more: true,
    }
  },
  mounted(){
    saveNLoad = inject(Constants.SAVE_N_LOAD_CONTEXT)
    values = inject(Constants.VALUES_CONTEXT)
    current_question_name = inject(Constants.QUESTION_NAME_CONTEXT)
    current_event_name = inject(Constants.EVENT_NAME_CONTEXT)
    this.can_save_more = !saveNLoad.is_save_max()
    saveNLoad.on_saves_change(()=>{
      this.can_save_more = !saveNLoad.is_save_max()
    })
  },
  methods: {
    write_save(){
      let input = this.$refs.save_name_input.value;
      let res = this.validate_save_name(input)
      if(res.is_pass){
        let new_save : SaveWithName = {
          save_name: input,
          save_data: {
            current_question_name: current_question_name,
            current_event_name: current_event_name,
            timestamp: (new Date(Date.now())).getTime(),
            values: values.get_all_pure_value()
          }
        }
        let except_name = []
        if(this.override_save_target){
          except_name.push(this.override_save_target.save_name)
        }
        saveNLoad.save(new_save.save_name, new_save.save_data, except_name)
        saveNLoad.signal_saves_change()
        this.$refs.close_save_modal.click()
      }
    },

    check_save_name_err(){
      let input = this.$refs.save_name_input.value;
      let res = this.validate_save_name(input)
      if(res.err_texts.length) {
        this.error_text = res.err_texts[0]
      } else {
        this.error_text = null
      }
    },

    validate_save_name(input : string){
      let name_except = []
      if(this.override_save_target){
        name_except.push(this.override_save_target.save_name)
      }
      let res = new Validate(input)
      .is_not_null()
      .is_under_max_str_length(this.max_save_name_len)
      .custome_check(!saveNLoad.is_have_this_save_name(input)
      || name_except.includes(input)
      , ErrorTexts.ALREADY_HAVE_THIS_NAME)
      .get_result()
      return res
    },

    show_save_write(save){
      this.$data.override_save_target = save
      this.set_default_save_name();
      this.$refs.create_save_btn.click()
    },

    reset_save_write(){
      this.override_save_target = null
      this.save_name = null
      this.error_text = null
    },

    count_save_name_len(){
      this.save_name_len = this.save_name.length
    },

    set_save_name(){
      this.save_name = this.$refs.save_name_input.value;
      this.count_save_name_len();
    },

    set_default_save_name(){
      if(this.$data.override_save_target){
        this.$data.save_name = this.$data.override_save_target.save_name
      } else {
        this.$data.save_name = saveNLoad.get_unused_save_name()
      }
      this.count_save_name_len();
    }
  }
}
</script>