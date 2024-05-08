<template>
  <div>

    <div class="flex justify-between bg-gray-300 justify-items-start p-4">
      <div>
        <div class="mx-2 mb-2">
          <span>Добавить предмет</span>
        </div>
        <div class="mx-2">
          <input v-model="title" type="text" class="mr-2 rounded" placeholder="Название предмета">
          <input v-model="group" type="text" class="mx-2 rounded" placeholder="Группа">
        </div>
      </div>
      <div class="flex mr-6">
        <button class="border-2 px-2 bg-gray-300 rounded hover:bg-gray-200" @click="saveData">Сохранить</button>
      </div>
    </div>
    <table v-if="students.length > 0" class="border-collapse border border-gray-400 m-4">
      <thead>
      <tr class="bg-gray-200">
        <th class="border border-gray-400 px-4 py-2">ID</th>
        <th class="border border-gray-400 px-4 py-2">Имя</th>
        <th class="border border-gray-400 px-4 py-2">Фамилия</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(student, index) in students" :key="index" class="bg-white">
        <td class="border border-gray-400 px-4 py-2">{{ index + 1 }}</td>
        <td class="border border-gray-400 px-4 py-2">{{ student.firstName }}</td>
        <td class="border border-gray-400 px-4 py-2">{{ student.lastName }}</td>
      </tr>
      </tbody>
    </table>
    <div class="flex justify-center">
      <div class="mx-4 my-2">
        <input v-model="firstName" class="mr-2 rounded" placeholder="Имя">
        <input v-model="lastName" class="mx-2 rounded" placeholder="Фамилия">
        <button @click="addStudent" class="border-2 px-2 bg-blue-500 rounded hover:bg-blue-300 text-white">Добавить ученика</button>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue';

let title = ref('');
let group = ref('');
let firstName = ref('');
let lastName = ref('');
let students = ref([]);

async function saveData() {
  if (title.value && group.value && students.value) {
    try {
      const response = await fetch('https://my-json-server.typicode.com/kosipov/1425-iro-placeholder-api/disciplines',{
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({ title: title.value, group: group.value, students: students.value })
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

function addStudent() {
  if (firstName.value && lastName.value) {
    students.value.push({ firstName: firstName.value, lastName: lastName.value });
    firstName.value = '';
    lastName.value = '';
  } else {
    alert('Пожалуйста, заполните все поля для добавления ученика');
  }
}
</script>
