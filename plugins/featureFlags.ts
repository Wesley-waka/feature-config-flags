// plugins/featureFlags.ts
import { defineNuxtPlugin } from '#app'
import { createFeatureFlagManager } from '~/utils/featureFlags'

export default defineNuxtPlugin(async (nuxtApp) => {
  // Dynamic import of feature flag configuration
  const featureFlagConfig = await import('~/config/featureFlags.json')
  
  const featureFlags = createFeatureFlagManager(featureFlagConfig.default)
  
  // Provide feature flags globally
  nuxtApp.provide('featureFlags', featureFlags)
})