<script lang="ts" setup>
import SplitTwoWindow from '@/layouts/split_two_window/SplitTwoWindow.vue';
</script>

<template>
<div :class="choose_stat.choose_stat_box">
    <SplitTwoWindow>
        <template v-slot:items>
            <div v-for="key in Object.keys(all_stat)" 
            :class="'d-flex '+(key in chosen_stats ? split2.chosen_item: split2.item)"
            v-on:click="show_stat_des(all_stat[key], key)">
                <div :class="split2.left_align">
                    {{all_stat[key].show_name}}
                </div>
                <div :class="split2.right_align">
                <span class="badge bg-primary rounded-pill">1</span>
                </div>
            </div>
        </template>
        <template v-slot:item_title v-if="select_stat && select_stat_name">
            <h3>{{select_stat.show_name}}</h3>
        </template>
        <template v-slot:item_body v-if="select_stat && select_stat_name">
            <h5>{{select_stat.des}}</h5>
        </template>
        <template v-slot:item_btn v-if="select_stat && select_stat_name">
            <button :class="'btn btn-primary'"
            v-if="!(select_stat_name in chosen_stats) && points > 0"
            v-on:click="choose_this_stat(select_stat, select_stat_name)">เลือก</button>
            <button :class="'btn btn-primary'"
            v-if="select_stat_name in chosen_stats"
            v-on:click="unchoose_this_stat(select_stat, select_stat_name)">ยกเลิก</button>
        </template>
    </SplitTwoWindow>
    <div :class="'fs-3 '+choose_stat.remain_point">
        เหลือ {{points}} แต้ม
    </div>
</div>
</template>

<style src="./ChooseStat.css" module="choose_stat"></style>
<style src="../../layouts/split_two_window/SplitTwoWindow.css" module="split2" scoped></style>

<script lang="ts">
import { Values } from '@/features/values/Values';
import { inject } from 'vue';
import { SaveAndLoadRepo } from '@/features/save_n_load/SaveAndLoadRepo';
import { Define } from '@/util/Define';
import { Constants } from '@/util/Constants';

export default {
    props: ['todo', 'create_character'],

    data(){
        return {
            all_stat: [],
            select_stat: null,
            select_stat_name: null,
            chosen_stats: {},
            points: 1,
        }
    },

    mounted(){
        let saveNLoad : SaveAndLoadRepo = inject(Constants.SAVE_N_LOAD_CONTEXT)
        let values : Values = inject(Constants.VALUES_CONTEXT)
        this.all_stat = values.get_variables().get_all_stat_var()
        this.todo.validate_fn = ()=>{
            return this.points <= 0;
        }
        this.todo.on_all_validate_pass = ()=>{
            saveNLoad.do_auto_save({
                current_question_name: Define.get_first_question_name(),
                timestamp: new Date(Date.now()).getTime(),
                values: values.get_all_pure_value()
            })
        }
    },

    methods : {
        show_stat_des(variables, key){
            this.select_stat = variables
            this.select_stat_name = key
        },

        choose_this_stat(variables, key){
            this.chosen_stats[key] = true
            this.use_point(variables, -1)
        },

        unchoose_this_stat(variables, key){
            delete this.chosen_stats[key]
            this.use_point(variables, 1)
        },

        use_point(variables, delta){
            variables.val += delta
            this.points += delta
            this.create_character.validate_all()
        },
    },
}
</script>