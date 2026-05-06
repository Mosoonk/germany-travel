<template>
  <section>
    <div class="container">
      <h2>Beliebte Regionen</h2>
      <div class="regions">
        <div v-for="r in regions" :key="r.name" class="region-card">
          <h3>{{ r.name }}</h3>
          <p>{{ r.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Region {
  name: string
  description: string
}

const regions: Region[] = [
  { name: 'Bayern', description: 'Alpen, Neuschwanstein, München und Oktoberfest.' },
  { name: 'Sachsen', description: 'Dresden, Sächsische Schweiz, Erzgebirge.' },
  { name: 'Thüringen', description: 'Thüringer Wald, Weimar, Erfurt.' }
]
</script>
