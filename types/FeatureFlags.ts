export interface FeatureFlagConfig {
  [key: string]: boolean | {
    enabled: boolean;
    environments?: string[];
    rolloutPercentage?: number;
  };
}
