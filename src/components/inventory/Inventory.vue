
<template>
    <div :class="inv.inventory_box">
        <div :class="inv.list_box">
            <div :class="inv.box_border">
                <div :class="inv.status_box">
                    <div :class="inv.status_box_cell">
                        HP
                    </div>
                    <div :class="inv.status_box_cell">
                        {{hp}}
                    </div>
                </div>
                <div :class="inv.status_box">
                    <div :class="inv.status_box_cell">
                        เงิน
                    </div>
                    <div :class="inv.status_box_cell">
                        {{ money }} G
                    </div>
                </div>
                <div :class="inv.status_box_big">
                    <div :class="inv.status_box_cell_big">
                        สถานะ
                    </div>
                    <div :class="inv.status_box_cell_large">
                        <p v-for="s in stat"
                        data-bs-toggle="modal"
                        data-bs-dismiss="modal"
                        data-bs-target="#status_des_modal_inv" 
                        aria-hidden="true"
                        v-on:click="show_status_des(s)"
                        >- {{ s['show_name'] }}</p>
                    </div>
                </div>
                <div :class="inv.list_btn">
                    <button v-for="type in types" 
                    v-on:click="reset_showing_data();
                    show_items_by_type(type[1]);"
                    :class="`btn btn-${current_type === type[1] ? '':'outline-' }light `
                    +inv.type_btn">{{ type[0] }}</button>
                </div>
            </div>
        </div>
        <div :class="inv.right_boxes">
            <div :class="inv.upper_box">
                <div :class="inv.box_border">
                <div :class="inv.items_list_box">
                    <div :class="inv.items_list">
                        <div :class="inv.item+' '
                        +(showing_data === item? inv.chosen_item : '')" 
                        v-for="item in showing_items"
                        v-on:click="show_item_info(item)">
                            <div :class="inv.item_name">
                                {{item['show_name']}}
                            </div>
                            <div :class="inv.item_amount"> x {{item['val']}}</div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
            <div :class="inv.lower_box">
                <div :class="inv.box_border">
                <div :class="inv.item_des_box" v-if="showing_data">
                        <div :class="inv.item_title">
                            {{showing_data['show_name']}}
                        </div>
                        <div :class="inv.item_body">{{showing_data['des']}}</div>
                        <div v-if="showing_data['onclick']">
                            <button :class="'btn btn-outline-light '
                            +inv.item_btn"
                            v-on:click="use_item(showing_data)"
                            >ใช้</button>
                        </div>
                </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style src="./Inventory.css" module="inv"></style>

<script lang="ts">
import { Inventory } from '@/features/inventory/Inventory';
import { SaveAndLoadRepo } from '@/features/save_n_load/SaveAndLoadRepo';
import { ItemLayout } from '@/features/values/Items';
import { ItemType } from '@/features/values/Items';
import { Values } from '@/features/values/Values';
import { VariableLayout } from '@/features/values/Variables';
import { Constants } from '@/util/Constants';
import { Observer } from '@/util/Observer';
import { inject } from 'vue';

let values : Values
let saveNload : SaveAndLoadRepo
export default {
    props: ['observer_stat'],
    data(){
        return {
            hp: 0,
            money: 0,
            stat: [],
            values: values,
            inventory: null,
            showing_data: null,
            showing_items: [],
            current_type: null,
            types: [['จิปาถะ', ItemType.REGULAR], 
            ['ยา', ItemType.POTION], 
            ['ไอเทมเควส', ItemType.QUEST]],
        }
    },

    mounted(){
        values = inject(Constants.VALUES_CONTEXT)
        saveNload = inject(Constants.SAVE_N_LOAD_CONTEXT)
        this.inventory = new Inventory(values.get_items())
        this.show_items_by_type(ItemType.REGULAR)
        values.on_update(this.hide_showing_data_when_no_val)
        values.on_update(()=>{this.show_items_by_type(this.current_type)})
        this.show_val()
        values.on_update(this.show_val)
    },

    methods: {
        hide_showing_data_when_no_val(){
            if(this.showing_data && !this.showing_data.val){
                this.showing_data = null
            }
        },

        show_items_by_type(type){
            this.showing_items = this.inventory.get_items_by_type([type])
            this.set_current_type(type); 
        },

        set_current_type(type){
            this.current_type = type
        },

        reset_showing_data(){
            this.showing_data = null
        },

        show_item_info(item){
            this.showing_data = item
        },

        use_item(showing_data : ItemLayout){
            showing_data['onclick'](values);
            let saves = saveNload.get_saves()
            let first_save = saves[0].save_data
            console.log(values)
            values.signal_update()
            saveNload.do_auto_save({
                current_question_name: first_save.current_question_name,
                current_event_name: first_save.current_event_name,
                timestamp: new Date(Date.now()).getTime(),
                values: values.get_all_pure_value()
            })
        },

        show_val(){
            this.hp = values.get_variables().hp.val
            this.money = values.get_variables().money.val
            this.stat = values.get_variables().get_all_visible_buff()
        },

        show_status_des(status_des : VariableLayout){
            let obs : Observer = this.observer_stat
            obs.signal(status_des)
        },
    }
}
</script>