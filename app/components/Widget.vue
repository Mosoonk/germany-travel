<template>
  <section>
    <div class="container">
      <h2>Historisches Wetter in Oelsnitz/Vogtland</h2>
      <p>Wähle ein Datum, um die Durchschnittstemperatur anzuzeigen</p>

      <div class="weather-controls">
        <input
          type="date"
          v-model="selectedDate"
          :max="today"
          min="1940-01-01"/>
        <button @click="fetchWeather" :disabled="loading">
          {{ loading ? 'Laden...' : 'Anzeigen' }}
        </button>
      </div>
      <p v-if="error" class="error">{{ error }}</p>
      <div v-if="result" class="weather-result">
        <p><strong>Datum:</strong> {{ result.date }}</p>
        <p><strong>Durchschnittstemperatur:</strong> {{ result.tempMean }}°C</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface WeatherResult {
  date: string
  tempMean: number
}

const selectedDate = ref('')
const result = ref<WeatherResult | null>(null)
const error = ref('')
const loading = ref(false)
const today = new Date().toISOString().split('T')[0]
async function fetchWeather() {
  if (!selectedDate.value) {
    error.value = 'Bitte Datum wählen'
    return
  }
  error.value = ''
  result.value = null
  loading.value = true
  try {
    result.value = await $fetch<WeatherResult>('/api/weather', {
      params: { date: selectedDate.value }
    })
  } catch {
    error.value = 'Fehler beim Laden der Daten'
  } finally {
    loading.value = false
  }
}
</script>
