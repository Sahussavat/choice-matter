<template>
<div class="container-fluid" :class="split2.choose_item">
    <div :class="'row row-cols-1 row-cols-lg-2 '+ split2.inherit_height">
        <div :class="'col '+split2.inherit_height">
            <div :class="split2.choosing_item_box">
                <ul class="list-group">
                    <slot name="items"></slot>
                </ul>
            </div>
        </div>
        <div :class="'col '+split2.inherit_height">
            <div :class="split2.item_des_box">
                <div :class="split2.item_des_box_txt">
                    <div :class="split2.item_des_title">
                        <slot name="item_title"></slot>
                    </div>
                    <div :class="split2.item_des_body">
                        <slot name="item_body"></slot>
                    </div>
                    <div :class="split2.item_des_btn">
                        <slot name="item_btn"></slot>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<style src="./SplitTwoWindow.css" module="split2" scoped></style>

<script>
export default {
    
}
</script>