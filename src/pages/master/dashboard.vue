<template>
  <div class="w-screen h-screen flex">
<!--Side bar-->
    <div class="w-[400px] h-full bg-gray-600">
      <div class="h-[50px] bg-gray-800">
        Header sidebar
      </div>
      <div class="h-[calc(100vh-50px)] bg-gray-200">
        menu
      </div>
    </div>
<!--Main-->
  <div class="w-full h-full bg-white]">
      <div class="w-full h-[50px] bg-gray-600">
        <span></span>
      </div>
      <div class="h-[calc(100vh-50px)] bg-white]">
        <Table :rows="students" :columns="columns"/>
      </div>
      </div>
  </div>
</template>

<script setup>
import Table from "@/components/Table/Table.vue";
import {computed, ref} from "vue";
import {useFetch} from "@vueuse/core";

const columns = ref( [
  { title: "ID", key: "id", minWidth: true },
  { title: "Имя ученика", key: "firstName" },
  { title: "Фамилия", key: "lastName" }
])

const url = computed(() => {
  return `https://my-json-server.typicode.com/kosipov/1425-iro-placeholder-api/disciplines`
})

const { isFetching, error, data } = useFetch(url, {
  refetch: true
}).json()

const students = computed(() => {
  if (data.value && data.value.length > 0) {
    // Первый элемент массива data содержит информацию о студентах
    return data.value[0].students;
  } else {
    return [];
  }
});
</script>