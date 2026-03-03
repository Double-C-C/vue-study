<!-- 页面大框架 -->
<template>
  <h1>this is h1</h1>
  <h2>{{ t("loading") }}</h2>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const username = ref<string>("");
</script>
