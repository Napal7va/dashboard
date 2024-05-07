<template>
  <div class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
    <div class="bg-white p-8 rounded-lg">
      <h2 class="text-2xl font-bold mb-4">Авторизация</h2>
      <input v-model="username" type="text" placeholder="Имя пользователя" class="border border-gray-300 p-2 mb-4 w-full">
      <input v-model="password" type="password" placeholder="Пароль" class="border border-gray-300 p-2 mb-4 w-full">
      <div class="text-right">
        <button @click="login" class="p-2 text-gray-500 hover:text-gray-700">Войти</button>
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

let username = ''
let password = ''

async function login() {
  if (username && password) {
    try {
      const response = await fetch('https://my-json-server.typicode.com/kosipov/1425-iro-placeholder-api/disciplines',{
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      })
      if (response.ok) {
        router.push('/admin')
      } else {
        alert('Ошибка аутентификации')
      }
    } catch (error) {
      console.error('Ошибка запроса:' ,error)
    }
  } else {
    alert('Пожалуйста заполните все поля')
  }
}
</script>