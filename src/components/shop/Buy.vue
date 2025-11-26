
<script lang="ts" setup>
import { Goods, ShopRepo } from '@/features/shops/ShopRepo';
import SplitTwoWindow from '@/layouts/split_two_window/SplitTwoWindow.vue';
import { Constants } from '@/util/Constants';
import { inject } from 'vue';
</script>

<template>
<SplitTwoWindow>
    <template v-slot:items>
        <div v-for="goods in all_goods" 
        :class="'d-flex '+(chosen_goods === goods ? split2.chosen_item: split2.item)"
        v-on:click="show_goods(goods)">
            <div :class="split2.left_align">
                {{goods.get_item().show_name}}
            </div>
            <div :class="split2.right_align">
            <span class="badge bg-primary rounded-pill">{{goods.cost}} G</span>
            </div>
        </div>
    </template>
    <template v-slot:item_title v-if="chosen_goods">
        <h3>{{chosen_goods.get_item().show_name}} [ ซื้อ {{chosen_goods.cost}} G ]</h3>
    </template>
    <template v-slot:item_body v-if="chosen_goods">
        <h5>{{chosen_goods.get_item().des}}</h5>
    </template>
    <template v-slot:item_btn v-if="chosen_goods">
        <div :class="buy.chosen_goods_left_box">
            <h5>มีอยู่ในตัว x {{ chosen_goods.get_item().val }}</h5>
        </div>
        <div :class="buy.chosen_goods_right_box">
            <button :class="'btn btn-primary '+(shop.is_can_buy(chosen_goods) ? null : 'disabled')"
            v-on:click="buy_goods(chosen_goods)">ซื้อ</button>
        </div>
    </template>
</SplitTwoWindow>
</template>

<style src="../../layouts/split_two_window/SplitTwoWindow.css" module="split2"></style>
<style src="./Buy.css" module="buy"></style>

<script lang="ts">

export default {
    data(){
        return {
            all_goods : [],
            chosen_goods: null,
            shop: null,
            money: 0,
        }
    },

    mounted(){
        let shop : ShopRepo = inject(Constants.SHOP_NAME_CONTEXT)
        this.shop = shop
        this.all_goods = this.shop.get_all_goods()
        this.money = this.shop.get_money().val
        this.shop.on_items_change(()=>{
            this.all_goods = this.shop.get_all_goods()
        })
    },

    methods: {
        show_goods(goods : Goods){
            this.chosen_goods = goods
        },

        buy_goods(goods : Goods){
            this.shop.buy_goods(goods)
            this.update_chosen_goods(goods)
        },

        update_chosen_goods(goods : Goods){
            this.chosen_goods = null
            this.chosen_goods = goods
        },
    }
}
</script>