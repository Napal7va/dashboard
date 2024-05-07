<template>
  <div class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
    <div class="bg-white p-8 rounded-lg">
      <h2 class="text-2xl font-bold mb-4">Авторизация</h2>
      <input type="text" placeholder="Имя пользователя" class="border border-gray-300 p-2 mb-4 w-full">
      <input type="password" placeholder="Пароль" class="border border-gray-300 p-2 mb-4 w-full">
      <div class="text-right">
        <button @click="loginAdmin" class="p-2 text-gray-500 hover:text-gray-700">Войти</button>
        <button @click="closeModal" class="p-2 text-gray-500 hover:text-gray-700">Закрыть</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import { useRouter } from "vue-router";

const router = useRouter()

const props = defineProps(['isModalAdminVisible', 'hideModalAdmin']);

function closeModal() {
  props.hideModalAdmin();
}

function loginAdmin(){
  router.push("/admin")
}
</script>