<template>
  <div>

    <div class="flex justify-between bg-gray-300 justify-items-start p-4">
      <div>
        <div class="mx-2 mb-2">
          <span>Добавить предмет</span>
        </div>
        <div class="mx-2">
          <input class="mr-2 rounded" placeholder="Название предмета">
          <input class="mx-2 rounded" placeholder="Группа">
        </div>
      </div>
      <div>
        <div class="mx-2 mb-2">
          <span>Добавить студента</span>
        </div>
        <div class="mx-2">
          <input class="mr-2 rounded" placeholder="Группа">
          <input class="mr-2 rounded" placeholder="Имя">
          <input class="mx-2 rounded" placeholder="Фамилия">
        </div>
      </div>
      <div class="flex mr-6">
        <button class="border-2 px-2 bg-gray-300 rounded hover:bg-gray-200" @click="saveData">Сохранить</button>
      </div>
    </div>

    <div class="flex justify-center">
      <table class="mx-4 my-2 w-full text-center table-auto">
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

  </div>
</template>

<script setup>
import { computed } from "vue";
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
