<script lang="ts" setup>
import Status from '@/components/status/Status.vue';
import Choices from '@/components/choices/Question.vue';
import Menu from '@/components/menu/Menu.vue';
</script>
<template>
    <div :class="$style.screen_box">
        <Choices></Choices>
        <div v-if="!$props.quick_choose">
        <Status></Status>
        <Menu></Menu>
        </div>
    </div>
</template>

<style src="./QuestionLayout.css" module></style>

<script lang="ts">
export default {
    props: ['quick_choose'],
}
</script>