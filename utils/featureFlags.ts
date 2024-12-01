// utils/featureFlags.ts
import { ref, computed } from 'vue'

export interface FeatureFlagConfig {
  [key: string]: boolean | {
    enabled: boolean;
    environments?: string[];
    rolloutPercentage?: number;
  };
}

export class FeatureFlagManager {
  private config: FeatureFlagConfig
  private flags = ref<{ [key: string]: boolean }>({})

  constructor(config: FeatureFlagConfig) {
    this.config = config
    this.initializeFlags()
  }

  private initializeFlags() {
    Object.keys(this.config).forEach(flagKey => {
      this.flags.value[flagKey] = this.evaluateFlag(flagKey)
    })
  }

  private evaluateFlag(flagKey: string): boolean {
    const flagConfig = this.config[flagKey]
    
    // If it's a simple boolean, return directly
    if (typeof flagConfig === 'boolean') {
      return flagConfig
    }

    // If it's an object with configuration
    if (typeof flagConfig === 'object') {
      // Check if flag is globally disabled
      if (!flagConfig.enabled) {
        return false
      }

      // Check environment-specific restrictions
      if (flagConfig.environments) {
        const currentEnv = import.meta.env.MODE || process.env.NODE_ENV
        if (!flagConfig.environments.includes(currentEnv)) {
          return false
        }
      }

      // Check rollout percentage
      if (flagConfig.rolloutPercentage !== undefined) {
        return this.checkRolloutPercentage(flagConfig.rolloutPercentage)
      }

      return true
    }

    return false
  }

  private checkRolloutPercentage(percentage: number): boolean {
    // Use a consistent but pseudo-random method to determine flag activation
    const randomValue = Math.random() * 100
    return randomValue < percentage
  }

  isEnabled(flagKey: string): boolean {
    return this.flags.value[flagKey] || false
  }

  getAllFlags() {
    return computed(() => this.flags.value)
  }
}

// Convenience function to create feature flag manager
export function createFeatureFlagManager(config: FeatureFlagConfig): FeatureFlagManager {
  return new FeatureFlagManager(config)
}