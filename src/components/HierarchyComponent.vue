<template>
  <div v-for="(item, index) in dataset" :key="item.id" class="parent">
    <input
      type="checkbox"
      :checked="isSelected(item.id)"
      @change="handleCheckboxChange(item.id, item.children)"
    />
    {{ item.label }} {{ index + 1 }}
    <div v-if="isVisible(item.id) && item.children" class="children">
      <HierarchyComponent :dataset="item.children" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";

const props = defineProps({
  dataset: {
    type: Array,
    required: true,
  },
});

const selected = ref({}); // This will store the selected nodes.
const visible = ref({}); // This will store the nodes which are visible.

const findParent = (items, id) => {
  for (const item of items) {
    if (item.id === id) return item;
    if (item.children) {
      const parent = findParent(item.children, id);
      if (parent) return parent;
    }
  }
  return null;
};

const getDescendants = (id) => {
  const descendants = [];

  const findDescendants = (items) => {
    items.forEach((item) => {
      descendants.push(item.id);
      if (item.children) {
        findDescendants(item.children);
      }
    });
  };

  const parent = findParent(props.dataset, id);
  if (parent && parent.children) {
    findDescendants(parent.children);
  }
  return descendants;
};

const clearDescendants = (id) => {
  delete visible.value[id];
  const descendants = getDescendants(id);
  descendants.forEach((descendantId) => {
    delete selected.value[descendantId];
    delete visible.value[descendantId];
  });
};

const handleCheckboxChange = (id, hasChildren) => {
  selected.value[id] = !selected.value[id];
  if (hasChildren) {
    visible.value[id] = !visible.value[id];
  }
  if (!selected.value[id]) {
    clearDescendants(id);
  }
};

const isSelected = (id) => !!selected.value[id];

const isVisible = (id) => !!visible.value[id];

// When Component is Mounted it should read data from localStorage and initialize
onMounted(() => {
  const savedState = JSON.parse(localStorage.getItem("dataset"));
  if (savedState) {
    selected.value = savedState.selected || {};
    visible.value = savedState.visible || {};
  }
});

// On change of selected value in the localStorage should be updated
watch(
  selected,
  (newSelected) => {
    localStorage.setItem(
      "dataset",
      JSON.stringify({ selected: newSelected, visible: visible.value })
    );
  },
  { deep: true }
);

// On change of visible value in the localStorage should be updated
watch(
  visible,
  (newVisible) => {
    localStorage.setItem(
      "dataset",
      JSON.stringify({ selected: selected.value, visible: newVisible })
    );
  },
  { deep: true }
);
</script>

<style scoped>
.parent,
.children {
  margin-left: 20px;
  padding: 5px;
}
</style>
