<template>
  <main>
    <h1>Hierarchical Tree Selection Assignment</h1>
    <hr/>
    <HierarchyComponent :dataset="hierarchyData" />
  </main>
</template>

<script setup lang="ts">
import hierarchyData from "../utils/data.ts";
import HierarchyComponent from "../components/HierarchyComponent.vue";
</script>
