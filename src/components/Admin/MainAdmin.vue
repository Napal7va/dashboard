<template>
  <div class="flex flex-col h-[500px]">
    <header class="bg-gray-200 p-4 flex justify-between items-center">
      <h1 class="text-lg font-semibold">Административная панель</h1>
      <div>
        <button @click="showComponent('AddSubject')" class="mx-2 bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 px-4 rounded">
          Добавить предмет
        </button>
        <button @click="logout" class="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 px-4 rounded">Выйти</button>
      </div>
    </header>
    <main class="flex  h-screen">
      <div class="flex flex-col pb-2.5 w-[260px] p-2 h-screen bg-gray-200 p-2" v-for="(item, index) in data" :key="index">
        <button class="hover:text-gray-500" @click="showComponent('EditTable')">
          <span>{{ item.index }}</span>
          <span class="mr-1">{{ item.title }}</span>
          <span>{{ item.group }}</span>
        </button>
        <button class="hover:text-gray-500" @click="showComponent('Comp')">
          <span>Вторая таблица азазазаззазазазазаз</span>
        </button>
      </div>
      <!-- Здесь будет контент административной панели -->
      <div class="w-full bg-gray-100">
        <component :is="selectedComponent" :students="students" :columns="columns"/>
      </div>
    </main>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import {computed, ref} from "vue";
import AddSubject from "@/components/Admin/AddSubject.vue";
import EditTable from "@/components/Admin/EditTable.vue";
import {useFetch} from "@vueuse/core";

const router = useRouter()

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
    case 'EditTable':
      selectedComponent.value = EditTable;
      break;
    case 'AddSubject':
      selectedComponent.value = AddSubject;
      break;
    default:
      selectedComponent.value = null;
  }
}

function logout () {
  router.push('/');
}
</script>