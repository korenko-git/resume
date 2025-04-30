import { render, screen } from '@testing-library/react';
import SocialLinks from '../SocialLinks';

jest.mock('@/contexts/ResumeContext', () => ({
  useResume: jest.fn(() => ({
    data: {
      about: {
        github: 'https://github.com/johndoe',
        linkedin: 'https://linkedin.com/in/johndoe',
        leetcode: 'https://leetcode.com/johndoe'
      }
    }
  }))
}));

describe('SocialLinks component', () => {
  it('should display all social links if they are specified', () => {
    render(<SocialLinks />);
    
    // Исправляем селекторы, используя aria-label вместо текста
    expect(screen.getByLabelText('GitHub (opens in a new tab)')).toHaveAttribute('href', 'https://github.com/johndoe');
    expect(screen.getByLabelText('LinkedIn (opens in a new tab)')).toHaveAttribute('href', 'https://linkedin.com/in/johndoe');
    expect(screen.getByLabelText('LeetCode (opens in a new tab)')).toHaveAttribute('href', 'https://leetcode.com/johndoe');
  });
  
  it('should not display links if they are not specified', () => {
    // Переопределяем мок для этого теста
    jest.mocked(require('@/contexts/ResumeContext').useResume).mockReturnValue({
      data: {
        about: {
          github: 'https://github.com/johndoe',
          linkedin: undefined,
          leetcode: undefined
        }
      }
    });
    
    render(<SocialLinks />);
    
    // Исправляем селекторы
    expect(screen.getByLabelText('GitHub (opens in a new tab)')).toBeInTheDocument();
    expect(screen.queryByLabelText('LinkedIn (opens in a new tab)')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('LeetCode (opens in a new tab)')).not.toBeInTheDocument();
  });
});