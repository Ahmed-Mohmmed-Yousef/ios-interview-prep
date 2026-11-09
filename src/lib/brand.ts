import brandConfig from '../../config/brand.json';

export interface BrandConfig {
  version: number;
  name: string;
  shortName: string;
  tagline: string;
  domainIdea: string;
  voice: string;
  direction: string;
  fonts: {
    body: string;
    code: string;
  };
  colors: {
    light: Record<string, string>;
    dark: Record<string, string>;
  };
}

export const brand: BrandConfig = brandConfig as BrandConfig;
export default brand;
