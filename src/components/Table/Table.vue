<template>
  <table class="table-auto w-full">
    <thead>
    <tr>
      <th v-for="column in columns" :key="column.key" class="px-4 py-2">{{ column.title }}</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="row in rows" :key="row.id">
      <td v-for="column in columns" :key="column.key" class="border px-4 py-2">{{ row[column.key] }}</td>
    </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    rows: {
      type: Array,
      required: true
    },
    columns: {
      type: Array,
      required: true
    }
  }
}
</script>
