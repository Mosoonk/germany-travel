<template>
  <section>
    <div class="container">
      <h2>Reise-Tipps</h2>
      <ul>
        <li v-for="tip in tips" :key="tip">{{ tip }}</li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
const tips: string[] = [
  'Deutschlandticket — 63€/Monat für alle öffentlichen Verkehrsmittel',
  'Viele Museen sind sonntags kostenlos',
  'Frühzeitig buchen für Oktoberfest und Feiertage',
  'DB Navigator — beste App für Zugverbindungen'
]
</script>
