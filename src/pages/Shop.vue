
<script setup>
import ShopLayout from '@/components/shop/ShopLayout.vue';
import { ShopDefine } from '@/features/shops/ShopDefine';
</script>

<template>
    <ShopLayout></ShopLayout>
</template>

<script>
import { Values } from '@/features/values/Values';
import { CookieSaveNLoad } from '@/features/save_n_load/cookie_save/CookieSaveNLoad';
import { Constants } from '@/util/Constants';

export default {
    provide(){
        let v = new Values
        let saveNLoad = new CookieSaveNLoad
        let saves = saveNLoad.get_saves()
        let shop_name = this.$route.query[Constants.SHOP_NAME_CONTEXT]
        let shop_define = new ShopDefine
        let save_name_req = this.$route.query[Constants.SAVE_N_LOAD_CONTEXT]
        if(saves.length){
            if(save_name_req && saveNLoad.is_have_this_save_name(save_name_req)){
                let save = saveNLoad.get_save_by_name(save_name_req)
                v.set_all_vals(save.values)
            } else {
                v.set_all_vals(saves[0].save_data.values)
            }
        }
        let provider = {}
        let shop = shop_define.build(shop_name, v)
        provider[Constants.SHOP_NAME_CONTEXT] = shop
        provider[Constants.SAVE_N_LOAD_CONTEXT] = saveNLoad
        provider[Constants.VALUES_CONTEXT] = v
        return provider
    },
}
</script>