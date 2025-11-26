<script lang="ts" setup>
import { CreateCharacterUtill } from '@/features/create_character/CreateCharacterUtill';
import ChooseStat from './ChooseStat.vue';
import Finished from './Finished.vue';
import { RouteName } from '@/router/RouteName';
</script>
<template>
    <div :class="$style.screen_box">
        <div :class="$style.tab_bar_box">
            <div :class="$style.tab_bar">
                <button v-for="index in Array.from(Array(tab_btns.length).keys())"
                :class="'btn btn-primary '+$style.tab_btn+' '
                +(show_if_previous_i_valid(index) ? null : 'disabled')"
                v-on:click="(event)=>{scrollIntoView(event); set_tab_i(index); show_tab_btn(index);}"
                >{{tab_btns[index][0]}}</button>
            </div>
        </div>
        <div :class="$style.choosing_box">
            <ChooseStat :todo="tab_arr.choose_stat.todo" :create_character="create_character" 
            :class=" check_if_tab_can_show(tab_arr.choose_stat) ? null : $style.display_none"></ChooseStat>
            <Finished :todo="tab_arr.finished.todo" :create_character="create_character" 
            :class=" check_if_tab_can_show(tab_arr.finished) ? null : $style.display_none"></Finished>
        </div>
        <div :class="$style.choose_btn_box">
            <div :class="$style.choose_btn">
                <div :class="$style.left_align">
                    <button :class="'btn btn-primary '+(is_show_back_box?null:$style.hide)"
                    v-on:click="back_tab()">ย้อน</button>
                </div>
                <div :class="$style.right_align">
                    <button :class="'btn btn-primary '+(can_press_next?null:'disabled')
                    +' '+(is_show_next_box?null:$style.hide)"
                    v-on:click="next_tab()">ถัดไป</button>
                    <button :class="'btn btn-primary '+' '+(is_show_next_box?$style.display_none:null)"
                    v-on:click="start_create()">เริ่มการผจญภัย</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style src="./ChoiceLayout.css" module></style>

<script lang="ts">
export default {
    data() {
        let tab_arr = {
            choose_stat: {
                todo: {
                    validate_fn: ()=>{return false},
                    on_check_validate: ()=>{},
                    on_all_validate_pass: ()=>{}
                }
            },
            finished: {
                todo: {
                    validate_fn: ()=>{return true},
                    on_check_validate: ()=>{
                        this.check_can_press_next()
                    },
                    on_all_validate_pass: ()=>{
                        window.location.hash = RouteName.HOMEPAGE
                        window.location.reload()
                    }
                }
            }
        }
        return {
            tab_btns : [
                ['เลือกความสามารถ', tab_arr.choose_stat],
                ['เสร็จสิ้น', tab_arr.finished]],
            create_character : null,
            is_show_next_box : true,
            is_show_back_box : true,
            can_press_next: false,
            tab_i: 0,
            tab_arr: tab_arr,
        }
    },

    mounted(){
        let createCharacterUtill = new CreateCharacterUtill
        this.create_character = createCharacterUtill
        this.show_tab_btn(this.tab_i)
        this.check_can_press_next()
        let keys = Object.keys(this.tab_arr)
        for(let i=0;i<keys.length;i++){
            let key = keys[i]
            createCharacterUtill.add_create_todo_list(this.tab_arr[key].todo)
        }
    },
    
    methods : {
        scrollIntoView(event){
            event.target.scrollIntoView({behavior: 'smooth',inline: 'center'})
        },

        next_tab(){
            this.tab_i = Math.min(Object.keys(this.tab_arr).length-1, this.tab_i+1)
            this.show_tab_btn(this.tab_i)
        },

        back_tab(){
            this.tab_i = Math.max(0, this.tab_i-1)
            this.show_tab_btn(this.tab_i)
        },

        show_tab_btn(i : number){
            this.is_show_back_box = i > 0
            this.is_show_next_box = i < Object.keys(this.tab_arr).length - 1
        },

        check_can_press_next(){
            if(this.is_show_next_box){
                this.can_press_next = this.tab_arr[Object.keys(this.tab_arr)[this.tab_i]]
                .todo.validate_fn()
            }
        },

        check_if_tab_can_show(todo){
            return this.tab_arr[Object.keys(this.tab_arr)[this.tab_i]] === todo
        },

        show_if_previous_i_valid(current_i : number){
            if(current_i > 0){
                let is_pass = this.tab_arr[Object.keys(this.tab_arr)[current_i-1]].todo.validate_fn()
                return is_pass
            }
            return true
        },

        set_tab_i(i : number){
            this.tab_i = i
        },

        start_create(){
            this.create_character.start_create()
        },
    }
}
</script>