<script lang="ts" setup>
import StatusModalDes from './StatusModalDes.vue';
</script>
<template>
    <StatusModalDes v-bind:status_des modal_id="status_des_modal"></StatusModalDes>
    <div :class="$style.status_box">
<div :class="'container '">
        <div class="row row-cols-3 d-flex justify-content-center">
            <div 
            :class="'col col-sm-2 col-lg-1 '">
                <div class="row row-cols-1">
                    <div :class="'col '+$style.status_title+' '+$style.border_box">
                        HP
                    </div>
                    <div :class="'col '+$style.status_body+' '+$style.border_box">
                        {{ hp }}
                    </div>
                </div>
            </div>
            <div 
            :class="'col col-sm-2 col-lg-1'">
                <div class="row row-cols-1">
                    <div :class="'col '+$style.status_title+' '+$style.border_box">
                        เงิน
                    </div>
                    <div :class="'col '+$style.status_body+' '+$style.border_box">
                        {{ money }} G
                    </div>
                </div>
            </div>
            <div 
            :class="'col col-sm-5 col-lg-3'">
                <div class="row row-cols-1">
                    <div :class="'col '+$style.status_title+' '+$style.border_box">
                        สถานะ
                    </div>
                    <div :class="'col '+$style.status_body+' '+$style.border_box">
                        <div :class="$style.stat_box">
                            <p v-for="s in stat" 
                            data-bs-toggle="modal" data-bs-target="#status_des_modal" aria-hidden="true"
                            :class="$style.clickable"
                            v-on:click="show_status_des(s)"
                            >- {{ s['show_name'] }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
</template>

<style src="./Status.css" module></style>

<script lang="ts">
import { Values } from '@/features/values/Values';
import { VariableLayout } from '@/features/values/Variables';
import { Constants } from '@/util/Constants';
import { inject } from 'vue';

let values : Values
export default {

    data(){
        return {
            hp: 0,
            money: 0,
            stat: [],
            status_des: null,
        }
    },

    mounted(){
        values = inject(Constants.VALUES_CONTEXT)
        this.show_val()
        values.on_update(this.show_val)
    },

    methods: {
        show_val(){
            this.hp = values.get_variables().hp.val
            this.money = values.get_variables().money.val
            this.stat = values.get_variables().get_all_visible_buff()
        },

        show_status_des(status_des : VariableLayout){
            this.status_des = status_des
        },
    }
}
</script>