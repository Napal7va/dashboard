<template>
  <div class="w-screen h-screen flex">
    <!--Sidebar-->
    <div class="w-[400px] h-full bg-gray-600">
      <div class="h-[50px] bg-gray-800 text-white text-3xl text-center">
        Giga - Dashboard
      </div>
      <div class="flex justify-center h-[calc(100vh-50px)] bg-gray-200">
        <div class="p-2" v-for="(item, index) in data" :key="index">
          <button class="hover:text-gray-500" @click="goToTable">
            <span>{{ item.index }}</span>
            <span class="mr-1">{{ item.title }}</span>
            <span>{{ item.group }}</span>
          </button>
        </div>
      </div>
    </div>
    <!--Main-->
    <div class="w-full h-full bg-white]">
      <div class="w-full h-[50px] bg-gray-600">
      </div>
      <div class="h-[calc(100vh-50px)] bg-white]">
        <Table :students="students" :columns="columns"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import Table from "@/components/Table/Table.vue";
import { computed, ref } from "vue";
import { useFetch } from "@vueuse/core";
import { useRouter } from "vue-router";

const router = useRouter();

const columns = ref([
  { title: "ID", key: "id", minWidth: true},
  { title: "Имя ученика", key: "firstName" },
  { title: "Фамилия", key: "lastName" },
]);

const url = computed(() => {
  return `https://my-json-server.typicode.com/kosipov/1425-iro-placeholder-api/disciplines`;
});

const { isFetching, error, data } = useFetch(url, {
  refetch: true
}).json();

const students = computed(() => {
  if (data && data.value && data.value.length > 0) {
    return data.value[0].students;
  } else {
    return [];
  }
});

function goToTable() {
  router.push({ name: "Table" });
}
</script>
