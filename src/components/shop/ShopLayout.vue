
<script lang="ts" setup>
import { ShopRepo } from '@/features/shops/ShopRepo';
import Buy from './Buy.vue';
import Sell from './Sell.vue';
import { inject } from 'vue';
import { Constants } from '@/util/Constants';
import { SaveAndLoadRepo } from '@/features/save_n_load/SaveAndLoadRepo';
import { Values } from '@/features/values/Values';
</script>

<template>
    <div :class="shopCss.shop_background">
        <div :class="shopCss.shop_box">
            <div :class="shopCss.shop_window">
                <ul :class="'nav nav-tabs '+shopCss.tabs_btn">
                <li class="nav-item">
                    <button class="nav-link active" data-bs-toggle="tab" data-bs-target="#buy-tab">ซื้อ</button>
                </li>
                <li class="nav-item">
                    <button class="nav-link" data-bs-toggle="tab" data-bs-target="#sell-tab">ขาย</button>
                </li>
                </ul>
                    <div class="tab-content">
                        <div class="tab-pane fade show active" id="buy-tab"><Buy :shop="shop"></Buy></div>
                        <div class="tab-pane fade" id="sell-tab"><Sell :shop="shop"></Sell></div>
                        <div :class="shopCss.show_money_window">
                            <h2>มีเงินอยู่ {{ money }} G</h2>
                        </div>
                    </div>
            </div>
            <div :class="shopCss.btn_window">
                <div :class="shopCss.right_btn">
                    <button :class="'btn btn-primary '+inv_modal.btn_menu"
                 v-on:click="back()">ย้อนกลับ</button>
                </div>
                <div :class="shopCss.left_btn"></div>
            </div>
        </div>
    </div>
</template>

<style src="./ShopLayout.css" module="shopCss"></style>
<style src="../inventory/InventoryModal.css" module="inv_modal"></style>

<script lang="ts">
let saveNload : SaveAndLoadRepo
let values : Values
export default {
    data() {
        return {
            shop: null,
            money: 0,
        }
    },

    mounted(){
        let shop : ShopRepo = inject(Constants.SHOP_NAME_CONTEXT)
        saveNload = inject(Constants.SAVE_N_LOAD_CONTEXT)
        values = inject(Constants.VALUES_CONTEXT)
        this.shop = shop
        this.money = this.shop.get_money().val
        this.shop.on_money_change(this.update_money)
    },

    methods : {
        update_money(){
            this.money = this.shop.get_money().val
            this.auto_save()
        },

        back(){
            history.back()
        },

        auto_save(){
            let saves = saveNload.get_saves()
            if(saves.length){
                let save = saves[0].save_data
                saveNload.do_auto_save({
                    current_question_name: save.current_question_name,
                    current_event_name: save.current_event_name,
                    timestamp: new Date(Date.now()).getTime(),
                    values: values.get_all_pure_value()
                })
            }
        },
    },
}
</script>