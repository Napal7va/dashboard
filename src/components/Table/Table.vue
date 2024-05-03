<template>
  <div>
    <table class="table-auto">
      <thead>
      <tr>
        <th v-for="column in columns" :key="column.key" class="m-1 border">{{ column.title }}</th>
        <th class="bg-gray-500"><input class="m-1 " type="date"> </th>
        <th v-for="date in uniqueDates" :key="date" class="m-1 border">{{ date }}</th>
      </tr>
      </thead>

      <tbody>
      <tr v-for="(student, index) in students" :key="student.id" >
        <td class="m-1 border">{{ index + 1 }}</td>
        <td class="m-1 border">{{ student.firstName }}</td>
        <td class="m-1 border">{{ student.lastName }}</td>
        <td class="m-1 border">
          <input type="checkbox" >
        </td>
        <td v-for="stat in student.stats" :key="stat.date" class="m-1 border ">
          <input type="checkbox" v-model="stat.value" class="flex items-center">
<!--          {{stat.value ? 'Посещение' : 'Отсутствие' }}-->
        </td>
      </tr>
      </tbody>
    </table>
    <div class="flex justify-end mt-4 mr-[15%]">
      <button class="border-2 p-3 border-green-400" @click="saveData">Сохранить</button>
    </div>

  </div>
</template>

<script setup>
import { computed } from "vue";
import { ref } from 'vue';

const props = defineProps({
  students: Array,
  columns: Array
});

const uniqueDates = computed(() => {
  const dates = new Set(); // Создаем Set для хранения уникальных дат
  props.students.forEach(student => { // Итерируемся по массиву студентов
    student.stats.forEach(stat => { // Итерируемся по массиву статистики каждого студента
      dates.add(stat.date); // Добавляем дату в Set
    });
  });
  return Array.from(dates); // Преобразуем Set в массив и возвращаем его
});
// Переменная для хранения выбранной даты
const selectedDate = ref('');

// Метод для отправки данных на сервер
const saveData = () => {
  // Собираем данные для отправки на сервер
  const dataToSend = {
    selectedDate: selectedDate.value,
    // Другие данные, которые вам нужно отправить
  };

  // Отправляем данные на сервер
  sendDataToServer(dataToSend);
};

// Функция для отправки данных на сервер (здесь нужно заменить на ваш реальный метод отправки данных)
const sendDataToServer = (data) => {
  fetch('url', {
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
        // Обработка успешного ответа от сервера
        console.log('Данные успешно отправлены:', data);
      })
      .catch(error => {
        // Обработка ошибок при отправке данных
        console.error('Ошибка отправки данных:', error);
      });
};

</script>
