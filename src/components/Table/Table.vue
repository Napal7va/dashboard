<template>
  <div>
    <table class="table-auto">
      <thead>
      <tr>
        <th v-for="column in columns" :key="column.key">{{ column.title }}</th>
        <th class="bg-gray-500"><input placeholder="Новая дата" class="" type="text"> </th>
        <th v-for="date in uniqueDates" :key="date">{{ date }}</th>
      </tr>
      </thead>

      <tbody>
      <tr v-for="(student, index) in students" :key="student.id">
        <td>{{ index + 1 }}</td>
        <td>{{ student.firstName }}</td>
        <td>{{ student.lastName }}</td>
        <!-- Выводим статистику посещения -->
        <td>
          <ul>
            <li v-for="stat in student.stats" :key="stat.date">
              <input type="checkbox" v-model="stat.value"> {{ stat.value ? 'Посещение' : 'Отсутствие' }}
            </li>
          </ul>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { computed } from "vue";

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

</script>
