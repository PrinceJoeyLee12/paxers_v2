import { ERegion } from '../constants';

export interface IAWSConfig {
  accessKeyId: string;
  secretAccessKey: string;
  region: ERegion;
}
