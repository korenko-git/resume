import { render, screen } from '@testing-library/react';
import Resume from '../index';

jest.mock('../AboutSection', () => ({
  AboutSection: ({ editable }: { editable: boolean }) => (
    <div data-testid="about-section">About Section (editable: {editable.toString()})</div>
  )
}));

jest.mock('../ExperienceSection', () => ({
  ExperienceSection: ({ editable }: { editable: boolean }) => (
    <div data-testid="experience-section">Experience Section (editable: {editable.toString()})</div>
  )
}));

jest.mock('../EducationSection', () => ({
  EducationSection: ({ editable }: { editable: boolean }) => (
    <div data-testid="education-section">Education Section (editable: {editable.toString()})</div>
  )
}));

jest.mock('../ProjectSection', () => ({
  ProjectSection: ({ editable, withLinkToArchive }: { editable: boolean, withLinkToArchive: boolean }) => (
    <div data-testid="project-section">
      Project Section (editable: {editable.toString()}, withLinkToArchive: {withLinkToArchive.toString()})
    </div>
  )
}));

jest.mock('../CertificationSection', () => ({
  CertificationSection: ({ editable, withLinkToArchive }: { editable: boolean, withLinkToArchive: boolean }) => (
    <div data-testid="certification-section">
      Certification Section (editable: {editable.toString()}, withLinkToArchive: {withLinkToArchive.toString()})
    </div>
  )
}));

describe('Resume component', () => {
  it('should render all sections with editable=true by default', () => {
    render(<Resume />);
    
    expect(screen.getByTestId('about-section')).toHaveTextContent('editable: true');
    expect(screen.getByTestId('experience-section')).toHaveTextContent('editable: true');
    expect(screen.getByTestId('education-section')).toHaveTextContent('editable: true');
    expect(screen.getByTestId('project-section')).toHaveTextContent('editable: true');
    expect(screen.getByTestId('project-section')).toHaveTextContent('withLinkToArchive: false');
    expect(screen.getByTestId('certification-section')).toHaveTextContent('editable: true');
    expect(screen.getByTestId('certification-section')).toHaveTextContent('withLinkToArchive: false');
  });
  
  it('should render all sections with editable=false when parameter is passed', () => {
    render(<Resume editable={false} />);
    
    expect(screen.getByTestId('about-section')).toHaveTextContent('editable: false');
    expect(screen.getByTestId('experience-section')).toHaveTextContent('editable: false');
    expect(screen.getByTestId('education-section')).toHaveTextContent('editable: false');
    expect(screen.getByTestId('project-section')).toHaveTextContent('editable: false');
    expect(screen.getByTestId('project-section')).toHaveTextContent('withLinkToArchive: true');
    expect(screen.getByTestId('certification-section')).toHaveTextContent('editable: false');
    expect(screen.getByTestId('certification-section')).toHaveTextContent('withLinkToArchive: true');
  });
});