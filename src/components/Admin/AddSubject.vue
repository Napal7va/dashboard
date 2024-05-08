<template>
  <div class="flex w-full">
    <div class="bg-white p-8 rounded-lg">
      <h2 class="text-2xl font-bold mb-4">Добавить предмет</h2>
      <input v-model="item" type="text" placeholder="Предмет" class="border border-gray-300 p-2 mb-4 w-full">
      <input v-model="group" type="text" placeholder="Группа" class="border border-gray-300 p-2 mb-4 w-full">
      <input v-model="student" type="text" placeholder="Имя студента" class="border border-gray-300 p-2 mb-4 w-full">
      <div class="text-right">
        <button @click="addStudent" class="p-2 text-gray-500 hover:text-gray-700">Добавить</button>
      </div>
    </div>
  </div>
</template>

<script setup>

let item = ''
let group = ''
let student = ''

async function addStudent() {
  if (item && group && student) {
    try {
      const response = await fetch('https://my-json-server.typicode.com/kosipov/1425-iro-placeholder-api/disciplines',{
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({ item, group, student })
      })
      if (response.ok) {
        alert('Студент добавлен')
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
