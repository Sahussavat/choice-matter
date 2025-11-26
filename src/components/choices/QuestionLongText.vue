
<template>
<div class="modal fade" id="question-long-text" data-bs-backdrop="static" tabindex="-1" aria-hidden="true">
  <div :class="'modal-dialog modal-xl '+$style.question_long_text_box">
    <div class="modal-content">
      <div :class="'modal-body '+$style.question_text_body">
        <textarea :class="$style.question_txt_box" disabled>
        {{ $props.question_text }}
        </textarea>
      </div>
      <div :class="'modal-footer '+$style.footer_box">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">ปิด</button>
      </div>
    </div>
  </div>
</div>
</template>

<style src="./QuestionLongText.css" module></style>

<script lang="ts">
export default {
    props: ["question_text"]
}
</script>