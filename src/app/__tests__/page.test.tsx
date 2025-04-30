import { render, screen } from '@testing-library/react';
import Home from '../page';

jest.mock('@/contexts/ResumeContext', () => ({
  useResume: jest.fn(() => ({
    loading: false,
    error: null,
    data: {
      about: {
        title: 'John Doe',
        subtitle: 'Web Developer'
      }
    }
  }))
}));

jest.mock('@/components/Person', () => ({
  __esModule: true,
  default: () => <div data-testid="person-component">Person Component</div>
}));

jest.mock('@/components/Navigation', () => ({
  __esModule: true,
  default: () => <div data-testid="navigation-component">Navigation Component</div>
}));

jest.mock('@/components/SocialLinks', () => ({
  __esModule: true,
  default: () => <div data-testid="social-links-component">Social Links Component</div>
}));

jest.mock('@/components/resume', () => ({
  __esModule: true,
  default: ({ editable }: { editable: boolean }) => (
    <div data-testid="resume-component">Resume Component (editable: {editable.toString()})</div>
  )
}));

describe('Home page', () => {
  it('should display components in view mode', () => {
    render(<Home />);
    
    expect(screen.getByTestId('person-component')).toBeInTheDocument();
    expect(screen.getByTestId('navigation-component')).toBeInTheDocument();
    expect(screen.getByTestId('social-links-component')).toBeInTheDocument();
    expect(screen.getByTestId('resume-component')).toHaveTextContent('editable: false');
  });
  
  it('should display loading indicator when loading=true', () => {
    jest.mocked(require('@/contexts/ResumeContext').useResume).mockReturnValue({
      loading: true,
      error: null
    });
    
    render(<Home />);
    
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
  
  it('should display error message when error exists', () => {
    jest.mocked(require('@/contexts/ResumeContext').useResume).mockReturnValue({
      loading: false,
      error: new Error('Test error')
    });
    
    render(<Home />);
    
    expect(screen.getByText('Error: Test error')).toBeInTheDocument();
  });
});