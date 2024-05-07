<template>
  <div class="flex flex-col h-[500px]">
    <header class="bg-gray-200 p-4 flex justify-between items-center">
      <h1 class="text-lg font-semibold">Административная панель</h1>
      <button @click="logout" class="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 px-4 rounded">Выйти</button>
    </header>
    <main class="flex h-screen justify-self-start">
      <div class="flex justify-center w-[260px] p-2 h-screen bg-gray-200">
        <div>
          <button @click="showComponent('AddStudent')" class="bg-gray-300 rounded px-3 py-1 hover:bg-gray-400">Добавить студента</button>
        </div>
      </div>
      <!-- Здесь будет контент административной панели -->
      <div class="flex justify-center w-screen bg-gray-100">
        <component :is="selectedComponent"/>
      </div>
    </main>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import {ref} from "vue";
import AddStudent from "@/components/Admin/AddStudent.vue";

const router = useRouter()

function logout () {
  router.push('/');
}

const selectedComponent = ref(false);

function showComponent(componentName) {
  switch (componentName) {
    case 'AddStudent':
      selectedComponent.value = AddStudent;
      break;
    default:
      selectedComponent.value = null;
  }
}
</script>