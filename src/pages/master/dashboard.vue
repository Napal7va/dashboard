<template>
  <div class="w-screen h-screen flex">
    <!--Sidebar-->
    <div class="w-[400px] h-full bg-gray-600">
      <div class="h-[50px] bg-gray-800 text-white text-3xl text-center">
        Giga - Dashboard
      </div>
      <div class="flex-col justify-center h-[calc(100vh-50px)] bg-gray-200">
        <div class="p-2" v-for="(item, index) in data" :key="index">
          <button class="hover:text-gray-500" @click="showComponent('Table')">
            <span>{{ item.index }}</span>
            <span class="mr-1">{{ item.title }}</span>
            <span>{{ item.group }}</span>
          </button>
          <button class="hover:text-gray-500" @click="showComponent('Comp')">
            <span>Вторая таблица азазазаззазазазазаз</span>
          </button>
        </div>

      </div>
    </div>
    <!--Main-->
    <div class="w-full h-full bg-white]">
      <div class="flex justify-end items-center w-full h-[50px] bg-gray-600 p-2">
        <button @click="showModalAdmin" class="bg-black rounded-lg text-white py-1.5 px-2 hover:bg-gray-300 hover:text-black">
          Административная панель
        </button>
      </div>
      <div class="h-[calc(100vh-50px)] bg-white]">
        <component :is="selectedComponent" :students="students" :columns="columns"/>
      </div>
    </div>
  </div>
  <ModalAdmin v-if="isModalAdminVisible" :hideModalAdmin="hideModalAdmin" />
</template>

<script setup>
import Table from "@/components/Table/Table.vue";
import Comp from "@/components/Comp.vue";
import ModalAdmin from "@/components/Admin/ModalAdmin.vue";
import { computed, ref } from "vue";
import { useFetch } from "@vueuse/core";

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

const selectedComponent = ref(false);

function showComponent(componentName) {
  switch (componentName) {
    case 'Table':
      selectedComponent.value = Table;
      break;
    case 'OtherComponent1':
      selectedComponent.value = Comp;
      break;
    default:
      selectedComponent.value = null;
  }
}

const isModalAdminVisible = ref();

function showModalAdmin() {
  isModalAdminVisible.value = true;
}

function hideModalAdmin() {
  isModalAdminVisible.value = false;
}
</script>
