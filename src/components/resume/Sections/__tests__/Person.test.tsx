import { render, screen } from '@testing-library/react';
import Person from '../Person';

jest.mock('@/contexts/ResumeContext', () => ({
  useResume: jest.fn(() => ({
    data: {
      about: {
        title: 'John Doe',
        subtitle: 'Web Developer',
        email: 'john@example.com'
      }
    }
  }))
}));

describe('Person component', () => {
  it('should display name and position', () => {
    render(<Person />);
    
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('John Doe');
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Web Developer');
  });
  
  it('should display link to ATS CV', () => {
    render(<Person />);
    
    const atsLink = screen.getByText('ATS CV');
    expect(atsLink).toBeInTheDocument();
    expect(atsLink.closest('a')).toHaveAttribute('href', 'cv-ats.pdf');
  });
  
  it('should display email link if specified', () => {
    render(<Person />);
    
    const emailLink = screen.getByText('Email me');
    expect(emailLink).toBeInTheDocument();
    expect(emailLink.closest('a')).toHaveAttribute('href', 'mailto:john@example.com');
  });
  
  it('should not display email link if not specified', () => {
    jest.mocked(require('@/contexts/ResumeContext').useResume).mockReturnValue({
      data: {
        about: {
          title: 'John Doe',
          subtitle: 'Web Developer',
          email: undefined
        }
      }
    });
    
    render(<Person />);
    
    expect(screen.queryByText('Email me')).not.toBeInTheDocument();
  });
});