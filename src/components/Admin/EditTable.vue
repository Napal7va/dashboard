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
        <button class="border-2 px-2 bg-gray-300 rounded hover:bg-gray-200" @click="saveData">Сохранить</button>
      </div>
    </div>

    <div class="flex justify-center">
      <table class="justify-center mx-4 my-2 w-full text-center table-auto">
        <thead>
        <tr>
          <th v-for="column in columns" :key="column.key" class="border border-gray-400 px-4 py-2">{{ column.title }}</th>
        </tr>
        </thead>

        <tbody>
        <tr v-for="(student, index) in students" :key="student.id" >
          <td class="border border-gray-400 px-4 py-2 w-1">{{ index + 1 }}</td>
          <td class="border border-gray-400 px-4 py-2">{{ student.firstName }}</td>
          <td class="border border-gray-400 px-4 py-2">{{ student.lastName }}</td>
          <td class="border-b-2 px-4 py-2">
            <button class="border-2 px-2 bg-green-500 rounded hover:bg-gray-300 text-white">Изменить</button>
            <button class="border-2 px-2 bg-red-500 rounded hover:bg-gray-300 text-white">Удалить</button>
          </td>
        </tr>
        </tbody>
        <div class="flex flex-row">
          <div class="mx-4 my-2">
            <input class="mr-2 rounded" placeholder="Имя">
            <input class="mx-2 rounded" placeholder="Фамилия">
            <button @click="saveData" class="border-2 px-2 bg-blue-500 rounded hover:bg-blue-300 text-white">Добавить ученика</button>
          </div>
        </div>
      </table>
    </div>


  </div>
</template>

<script setup>
import { ref } from 'vue';
const selectedDate = ref('');
const checkboxValues = ref({});
const props = defineProps({
  students: Array,
  columns: Array
});

const saveData = () => {
  const dataToSend = {
    date: selectedDate.value,
    checkboxValues: checkboxValues.value,
  };
  sendDataToServer(dataToSend);
};

const sendDataToServer = (data) => {
  fetch('https://my-json-server.typicode.com/kosipov/1425-iro-placeholder-api/disciplines', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
      .then(response => {
        if (!response.ok) {
          throw new Error('Ошибка сети');
        }
        return response.json();
      })
      .then(data => {
        console.log('Данные успешно отправлены:', data);
      })
      .catch(error => {
        console.error('Ошибка отправки данных:', error);
      });
};
</script>
