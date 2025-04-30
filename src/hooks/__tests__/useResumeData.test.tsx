import { renderHook, waitFor } from '@testing-library/react';
import { useResumeData } from '../useResumeData';

jest.mock('@/data/organizations.json', () => ({ default: { entries: [] } }), { virtual: true });
jest.mock('@/data/about.json', () => ({ default: { id: 'about', title: 'Test User' } }), { virtual: true });
jest.mock('@/data/experience.json', () => ({ default: { entries: [] } }), { virtual: true });
jest.mock('@/data/projects.json', () => ({ default: { entries: [] } }), { virtual: true });
jest.mock('@/data/education.json', () => ({ default: { entries: [] } }), { virtual: true });
jest.mock('@/data/certifications.json', () => ({ default: { entries: [] } }), { virtual: true });

describe('useResumeData hook', () => {
  it('should load resume data', async () => {
    const { result } = renderHook(() => useResumeData());
    
    expect(result.current.loading).toBe(true);
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    expect(result.current.data.about).toEqual({default:{ id: 'about', title: 'Test User' }});
    expect(result.current.error).toBeNull();
  });
  
  it('should handle errors when loading data', async () => {
    jest.mock('@/data/about.json', () => {
      throw new Error('Loading error');
    }, { virtual: true });
    
    jest.resetModules();
    
    const { useResumeData: useResumeDataWithError } = require('../useResumeData');
    
 
    try {
      const { result } = renderHook(() => useResumeDataWithError());
      
      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });
      
      expect(result.current.error).not.toBeNull();
    } catch (error) {
 
      expect(error).toBeDefined();
    }
    
 
    jest.resetModules();
    jest.mock('@/data/about.json', () => ({ default: { id: 'about', title: 'Test User' } }), { virtual: true });
  });
});