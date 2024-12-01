<template>
  <div>
    <div v-if="isNewDashboardEnabled">
      <h1>hi bitches</h1>
    </div>

    <div v-if="isBetaFeaturesEnabled">
      <h1>hallo madam</h1>
    </div>
    
  </div>
</template>

<script setup>
// Typescript-friendly composition API approach
const { $featureFlags } = useNuxtApp()

// Computed properties for flag status
const isNewDashboardEnabled = computed(() => 
  $featureFlags.isEnabled('newDashboard')
)

const isBetaFeaturesEnabled = computed(() => 
  $featureFlags.isEnabled('betaFeatures')
)
</script>