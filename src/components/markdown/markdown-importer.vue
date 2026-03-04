<template>
  <div class="markdown-importer">
    <div class="upload-area">
      <input
        ref="fileInput"
        type="file"
        accept=".md"
        multiple
        @change="handleFileSelect"
        style="display: none"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from "element-plus";
import { ImportItem } from "./type";

const fileInput = ref<HTMLInputElement>();
const importList = ref<ImportItem[]>([]);
const editDialogVisible = ref(false);
const editForm = reactive<Partial<ImportItem>>({});
const editIndex = ref(-1);

const emit = defineEmits<{
  import: [items: ImportItem[]];
}>();

// 处理文件选择流
const handleFileSelect = (e: Event) => {
  const files = (e.target as HTMLInputElement).files;
  if (files) {
    processFiles(Array.from(files));
  }
};

// 处理拖拽
const handleDrop = (e: DragEvent) => {
  const files = e.dataTransfer?.files;
  if (files) {
    processFiles(Array.from(files));
  }
};

// 处理文件
const processFiles = async (files: File[]) => {
  for (const file of files) {
    // 阻止未知形式文件
    if (!file.name.endsWith(".md")) {
      ElMessage.warning("不是markdown文件");
      continue;
    }

    const content = await file.text();
    // 去除.md后缀
    const fileName = file.name.replace(/\.md$/, "");
    const routePath = `/docs/${fileName}`;
    const routeName = fileName
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }
};

// 编辑
const handleEdit = (row: ImportItem) => {
  editIndex.value = importList.value.indexOf(row);
  Object.assign(editForm, row);
  editDialogVisible.value = true;
};

// 确认编辑
const handleConfirmEdit = () => {
  if (editIndex.value !== -1) {
    const target = importList.value[editIndex.value];
    if (target) {
      Object.assign(target, editForm);
    }
  }
  editDialogVisible.value = false;
};

// 删除
const handleRemove = (row: ImportItem) => {
  const index = importList.value.indexOf(row);
  if (index >= 0) {
    importList.value.splice(index, 1);
  }
};

// 确认导入
const handleImport = () => {
  emit("import", importList.value);
  handleReset();
};

// 重置
const handleReset = () => {
  importList.value = [];
  if (fileInput.value) {
    fileInput.value.value = "";
  }
};
</script>
