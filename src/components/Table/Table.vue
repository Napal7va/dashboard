<template>
  <div>
    <table class="table-auto">
      <thead>
      <tr>
        <th v-for="column in columns" :key="column.key" class="m-1 border">{{ column.title }}</th>
        <th class="bg-gray-500"><input v-model="selectedDate" placeholder="Новая дата" class="m-1 " type="date"> </th>
        <th v-for="date in uniqueDates" :key="date" class="m-1 border">{{ date }}</th>
      </tr>
      </thead>

      <tbody>
      <tr v-for="(student, index) in students" :key="student.id" >
        <td class="m-1 border">{{ index + 1 }}</td>
        <td class="m-1 border">{{ student.firstName }}</td>
        <td class="m-1 border">{{ student.lastName }}</td>
        <td class="m-1 border">
          <input type="checkbox" v-model="checkboxValues[student.id]">
        </td>
        <td v-for="stat in student.stats" :key="stat.date" class="m-1 border ">
          <input type="checkbox" v-model="stat.value" class="flex items-center">
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
const selectedDate = ref('');
const checkboxValues = ref({});
const props = defineProps({
  students: Array,
  columns: Array
});

const uniqueDates = computed(() => {
  const dates = new Set();
  props.students.forEach(student => {
    student.stats.forEach(stat => {
      dates.add(stat.date);
    });
  });
  return Array.from(dates);
});

const saveData = () => {
  const dataToSend = {
    date: selectedDate.xddd,
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
