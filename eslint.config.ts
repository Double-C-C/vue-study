import { globalIgnores } from "eslint/config";
import {
  defineConfigWithVueTs,
  vueTsConfigs,
} from "@vue/eslint-config-typescript";
import pluginVue from "eslint-plugin-vue";
import { defineOptions } from "vue";
import eslintConfigPrettier from "eslint-config-prettier";

// To allow more languages other than `ts` in `.vue` files, uncomment the following lines:
// import { configureVueProject } from '@vue/eslint-config-typescript'
// configureVueProject({ scriptLangs: ['ts', 'tsx'] })
// More info at https://github.com/vuejs/eslint-config-typescript/#advanced-setup

export default defineConfigWithVueTs(
  {
    name: "app/files-to-lint",
    files: ["**/*.{vue,ts,mts,tsx}"],
  },
  {
    name: "app/vue-macros",
    files: ["**/*.vue"],
    languageOptions: {
      globals: {
        defineOptions: "writable",
      },
    },
  },
  globalIgnores([
    "**/dist/**",
    "**/dist-ssr/**",
    "**/coverage/**",
    "**/assets/**",
    "**/*.d.ts",
    "src/types/*.d.ts",
  ]),

  ...pluginVue.configs["flat/essential"],
  vueTsConfigs.recommended,
  {
    name: "app/custom-rules",
    rules: {
      // 关闭console警告
      "no-console": "off",
      // debugger只在生产环境警告
      "no-debugger": "warn",
      // 关闭组件名多词限制
      "vue/multi-word-component-names": "off",
      // 允许使用any
      "@typescript-eslint/no-explicit-any": "off",
      // 关闭未使用变量警告
      "@typescript-eslint/no-unused-vars": "off",
      // 禁止多个空格
      "no-multi-spaces": "error",
      // 最大空行
      "no-multiple-empty-lines": ["error", { max: 1 }],
      // 禁止行尾空格
      "no-trailing-spaces": "error",
    },
  },
  // 测试文件配置
  {
    name: "app/test-files",
    files: ["**/__tests__/*.{j,t}s?(x)", "**/tests/unit/**/*.spec.{j,t}s?(x)"],
    languageOptions: {
      globals: {
        describe: "readonly",
        it: "readonly",
        expect: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly",
        vi: "readonly",
      },
    },
  },

  // Prettier 配置（必须放在最后）
  eslintConfigPrettier
);
