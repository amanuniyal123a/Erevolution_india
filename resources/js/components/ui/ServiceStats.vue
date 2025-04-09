<template>
  <section class="stats-section">
    <div class="container">
      <div class="stats-container">
        <div class="stat-box" v-for="(stat, index) in animatedStats" :key="index">
          <h2>{{ stat.display }}+</h2>
          <p>{{ stat.label }}</p>
        </div>
      </div>
    </div>
  </section>
</template>


<script setup>
import { ref, onMounted } from 'vue'

const rawStats = [
  { value: 25, label: 'Years of Global Experience' },
  { value: 7, label: 'Geographical Locations' },
  { value: 1000, label: 'Employees' },
  { value: 10000, label: 'Projects Successfully Delivered' },
]

const animatedStats = ref(rawStats.map(stat => ({
  ...stat,
  display: 0
})))

onMounted(() => {
  animatedStats.value.forEach((stat, index) => {
    let count = 0
    const increment = stat.value / 100

    const update = () => {
      if (count < stat.value) {
        count += increment
        animatedStats.value[index].display = Math.ceil(count)
        requestAnimationFrame(update)
      } else {
        animatedStats.value[index].display = stat.value
      }
    }

    update()
  })
})
</script>

<style scoped>

</style>
