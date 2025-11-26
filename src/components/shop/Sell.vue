
<script lang="ts" setup>
import { SaveAndLoadRepo } from '@/features/save_n_load/SaveAndLoadRepo';
import { ShopRepo } from '@/features/shops/ShopRepo';
import { ItemLayout } from '@/features/values/Items';
import { Values } from '@/features/values/Values';
import SplitTwoWindow from '@/layouts/split_two_window/SplitTwoWindow.vue';
import { Constants } from '@/util/Constants';
import { inject } from 'vue';
</script>

<template>
<SplitTwoWindow>
    <template v-slot:items>
        <div v-for="item in all_items" 
        :class="'d-flex '+(chosen_item === item ? split2.chosen_item: split2.item)"
        v-on:click="show_item(item)">
            <div :class="split2.left_align">
                {{item.show_name}}
            </div>
            <div :class="split2.right_align">
            <span>x {{item.val}}</span>
            </div>
        </div>
    </template>
    <template v-slot:item_title v-if="chosen_item">
        <h3>{{chosen_item.show_name}} [ ขายชิ้นละ {{chosen_item.sell_price}} G ]</h3>
    </template>
    <template v-slot:item_body v-if="chosen_item">
        <h5>{{chosen_item.des}}</h5>
    </template>
    <template v-slot:item_btn v-if="chosen_item">
        <div :class="sell.chosen_item_left_box">
            <h5>มีอยู่ในตัว x {{ chosen_item.val }}</h5>
        </div>
        <div :class="sell.chosen_item_right_box">
            <button :class="'btn btn-primary '+(chosen_item.val > 0 ? null : 'disabled')"
            v-on:click="sell_item(chosen_item)">ขาย</button>
        </div>
    </template>
</SplitTwoWindow>
</template>

<style src="../../layouts/split_two_window/SplitTwoWindow.css" module="split2"></style>
<style src="./Sell.css" module="sell"></style>

<script lang="ts">
export default {
    data(){
        return {
            shop: null,
            money: 0,
            all_items : [],
            chosen_item: null,
        }
    },

    mounted(){
        let shop : ShopRepo = inject(Constants.SHOP_NAME_CONTEXT)
        this.shop = shop
        this.money = this.shop.get_money().val
        this.all_items = this.shop.get_all_sellable_items()
        this.shop.on_items_change(()=>{
            this.all_items = this.shop.get_all_sellable_items()
        })
    },

    methods: {
        show_item(item : ItemLayout){
            this.chosen_item = item
        },

        sell_item(item : ItemLayout){
            this.shop.sell_item(item)
            this.update_chosen_goods(item)
        },

        update_chosen_goods(item : ItemLayout){
            this.chosen_item = null
            if(item.val > 0){
                this.chosen_item = item
            }
        },
    }
}
</script>