import { render, screen, act } from '@testing-library/react';
import { ResumeProvider, useResume } from '../ResumeContext';

jest.mock('@/hooks/useResumeData', () => ({
  useResumeData: jest.fn(() => ({
    data: {
      about: { id: 'about', title: 'Test User', version: 1 },
      experience: { entries: [] },
      projects: { entries: [] },
      education: { entries: [] },
      certifications: { entries: [] },
      organizations: { entries: [] }
    },
    setData: jest.fn(),
    loading: false,
    error: null
  }))
}));

const TestComponent = () => {
  const { data, updateData, deleteEntry } = useResume();
  
  return (
    <div>
      <div data-testid="title">{data.about?.title}</div>
      <button 
        data-testid="update-button" 
        onClick={() => updateData('about', { ...data.about!, title: 'Updated User' })}
      >
        Update
      </button>
      <button 
        data-testid="delete-button" 
        onClick={() => deleteEntry('experience', 'test-id')}
      >
        Delete
      </button>
    </div>
  );
};

describe('ResumeContext', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });
  
  it('should provide resume data through context', () => {
    render(
      <ResumeProvider>
        <TestComponent />
      </ResumeProvider>
    );
    
    expect(screen.getByTestId('title')).toHaveTextContent('Test User');
  });
  
  it('should update resume data', () => {
    render(
      <ResumeProvider>
        <TestComponent />
      </ResumeProvider>
    );
    
    act(() => {
      screen.getByTestId('update-button').click();
    });
    
    expect(localStorage.setItem).toHaveBeenCalled();
  });
  
  it('should delete entries from resume data', () => {
    render(
      <ResumeProvider>
        <TestComponent />
      </ResumeProvider>
    );
    
    act(() => {
      screen.getByTestId('delete-button').click();
    });
    
    expect(localStorage.setItem).toHaveBeenCalled();
  });
});