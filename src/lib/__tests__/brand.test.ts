import { describe, it, expect } from 'vitest';
import { brand } from '../brand';

describe('brand config', () => {
  it('loads valid brand details', () => {
    expect(brand.name).toBeTruthy();
    expect(brand.tagline).toBeTruthy();
    expect(brand.direction).toBe('calm-trail');
  });
});
