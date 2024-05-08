<template>
  <div>

    <div class="flex justify-between bg-gray-300 justify-items-start p-4">
      <div>
        <div class="mx-2 mb-2">
          <span>Изменить предмет</span>
        </div>
        <div class="mx-2">
          <input class="mr-2 rounded" placeholder="Название предмета">
          <input class="mx-2 rounded" placeholder="Группа">
        </div>
      </div>
      <div class="flex mr-6">
        <button class="border-2 px-2 bg-gray-300 rounded hover:bg-gray-200" @click="sendStudentInput">
          Сохранить
        </button>
      </div>
    </div>
      <div class="flex-col">

        <div class="w-full">
          <table class="justify-center mx-4 my-2 w-full text-center table-auto">
            <thead>
            <tr>
              <th v-for="column in columns" :key="column.key" class="m-1 border">{{ column.title }}</th>
            </tr>
            </thead>

            <tbody>
            <tr v-for="(student, index) in students" :key="student.id" >
              <td class="m-1 border">{{ index + 1 }}</td>
              <td class="m-1 border">{{ student.firstName }}</td>
              <td class="m-1 border">{{ student.lastName }}</td>
              <td class="m-1 border">
                <button class="border-2 px-2 bg-green-500 rounded hover:bg-gray-300">Изменить</button>
                <button class="border-2 px-2 bg-red-500 rounded hover:bg-gray-300">Удалить</button>
              </td>
            </tr>
            </tbody>
          </table>
        </div>

          <div class="flex justify-center mt-4">
            <button @click="addStudentInput" class="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 px-4 rounded">Добавить ученика</button>
          </div>
          <div v-for="(input, index) in studentInputs" :key="index" class="flex justify-center mt-4">
            <input v-model="input.firstName" class="mr-2 rounded" placeholder="Имя">
            <input v-model="input.lastName" class="mx-2 rounded" placeholder="Фамилия">
            <button @click="removeStudentInput(index)" class="px-2 bg-red-500 rounded hover:bg-gray-300">Удалить</button>
          </div>

      </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'
const props = defineProps({
  students: Array,
  columns: Array
})

const studentInputs = ref([])

function addStudentInput() {
  studentInputs.value.push({ firstName: '', lastName: '' })
}

function removeStudentInput(index) {
  studentInputs.value.splice(index, 1)
}

async function sendStudentInput() {
  try {
    const response = await fetch('https://my-json-server.typicode.com/kosipov/1425-iro-placeholder-api/disciplines',{
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ students: studentInputs.value })
    });

    if (response.ok) {
      alert('Студенты добавлены');
    } else {
      alert('Ошибка аутентификации');
    }
  } catch (error) {
    console.error('Ошибка запроса:', error);
  }
}

</script>
