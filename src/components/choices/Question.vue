
<script lang="ts" setup>
import { Choice } from '@/features/choices/Choice';
import BigSpinLoader from '../spin_loader/BigSpinLoader.vue';
import QuestionLongText from './QuestionLongText.vue';
</script>

<template>
    <QuestionLongText v-if="question" v-bind:question_text="question.get_question_txt()"></QuestionLongText>
    <BigSpinLoader v-if="quick_choose"></BigSpinLoader>
    <div :class="$style.screen_box" v-if="!quick_choose">
        <div :class="$style.choice_box" id="choice-box">
            <div v-if="question">
                <textarea :class="$style.question_txt_box" disabled>{{ question.get_question_txt() }}</textarea>
                <div :class="$style.zoom_icon_box">
                    <svg :class="$style.zoom_icon"
                    data-bs-toggle="modal" data-bs-target="#question-long-text"
                    xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-zoom-in" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11M13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0"/>
                    <path d="M10.344 11.742q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1 6.5 6.5 0 0 1-1.398 1.4z"/>
                    <path fill-rule="evenodd" d="M6.5 3a.5.5 0 0 1 .5.5V6h2.5a.5.5 0 0 1 0 1H7v2.5a.5.5 0 0 1-1 0V7H3.5a.5.5 0 0 1 0-1H6V3.5a.5.5 0 0 1 .5-.5"/>
                    </svg>
                </div>
            </div>
            <div :class="$style.btn_box_list"  >
                <div :class="$style.btn_box" v-for="choice in choices">
                    <button :class="'btn btn-outline-light '+$style.btn_el"
                    v-on:click="
                    signal_click_choice(choice);
                    change_page(choice.get_first_visitable_path());
                    "
                    >{{ choice.get_choice_context() }}</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style src="./Choice.css" module></style>

<script lang="ts">

import { EventDefine } from '@/features/choices/EventDefine';
import { ResPath } from '@/features/choices/Path';
import { Question } from '@/features/choices/Question';
import { QuestionDefine } from '@/features/choices/QuestionDefine';
import { replace_for_continue_to_default_path } from '@/features/choices/RandomEvent';
import { Values } from '@/features/values/Values';
import { RouteName } from '@/router/RouteName';
import { Constants } from '@/util/Constants';
import { inject } from 'vue';
import { clamp } from '@/util/MathUtill';

let values : Values
let question_name = ''
let event_name : string

export default {
    data(){
        return {
            choices: [],
            question: null,
            quick_choose: null,
            saveNLoad: null,
        }
    },
    mounted(){
        this.saveNLoad = inject(Constants.SAVE_N_LOAD_CONTEXT)
        this.quick_choose = inject(Constants.QUICK_CHOOSE_CONTEXT)
        event_name = inject(Constants.EVENT_NAME_CONTEXT)
        question_name = inject(Constants.QUESTION_NAME_CONTEXT)
        values = inject(Constants.VALUES_CONTEXT)
        this.question = this.set_question(event_name)
        if(this.quick_choose !== undefined && this.quick_choose !== null){
            let choices = this.question.get_showable_choice()
            let target_choice : Choice = choices[clamp(this.quick_choose, 0, choices.length - 1)]
            this.change_page(target_choice.get_first_visitable_path())
            return
        }
        this.signal_enter_question(this.question)
        this.show_choices(this.question)
        values.on_update(()=>{
            this.question = this.set_question(event_name)
            this.show_choices(this.question)
        })
    },

    methods: {
        signal_enter_question(question : Question){
            question.signal_show_question()
        },

        signal_click_choice(choice : Choice){
            choice.signal_click_choice()
            this.save_with_page()
        },

        save_with_page(){
            this.saveNLoad.do_auto_save({
                current_question_name: question_name,
                current_event_name: event_name,
                timestamp: new Date(Date.now()).getTime(),
                values: values.get_all_pure_value(),
            })
        },

        set_question(event_name? : string) : Question{
            let question : Question
            let question_define = new QuestionDefine()
            if(event_name){
            let event_define = new EventDefine
                question = event_define.build_event(event_name, question_name, values)
            } else {
                question = question_define.build_question(question_name, values)
            }
            return question
        },

        show_choices(question){
            this.choices = question.get_showable_choice()
        },

        change_page(path_data : ResPath){
            let default_path : string = replace_for_continue_to_default_path(path_data.default_path, question_name)
            let path = `/${RouteName.HOMEPAGE}?${Constants.QUESTION_NAME_CONTEXT}=${default_path}`
            if(path_data.event_path){
                path += `&${Constants.EVENT_NAME_CONTEXT}=${path_data.event_path}`
            }
            this.saveNLoad.do_auto_save({
                current_question_name: default_path,
                current_event_name: path_data.event_path,
                timestamp: new Date(Date.now()).getTime(),
                values: values.get_all_pure_value(),
            })
            if(path_data.define_path){
                window.location.hash = path_data.define_path
                window.location.reload()
                return
            } 
            window.location.hash = path
            window.location.reload()
        }
    }
}

</script>