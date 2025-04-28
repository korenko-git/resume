import Joyride, { Step } from 'react-joyride';

interface WelcomeTourProps {
  run: boolean;
  onFinish: () => void;
}

export function WelcomeTour({ run, onFinish }: WelcomeTourProps) {
  const steps: Step[] = [
    {
      target: '.resume-editor-header',
      content: 'Welcome to Resume Editor! Here you can manage and customize your resume.',
      disableBeacon: true
    },
    {
      target: '.view-button',
      content: 'Switch to view mode to see how your resume looks to others'
    },
    {
      target: '.editable-header',
      content: 'Click on any section to start editing. You can modify titles, dates, and links'
    },
    {
      target: '.editable-content',
      content: 'Edit descriptions using Markdown formatting for rich text'
    },
    {
      target: '.skills-section',
      content: 'Manage your skills - add new ones, drag to reorder, or remove them'
    },
    {
      target: '.social-links',
      content: 'Add your social media profiles and contact information'
    },
    {
      target: '.swtich-publish',
      content: 'Use the toggle switch to control section visibility in the public resume'
    },
    {
      target: '.save-cancel-buttons',
      content: 'After making changes, click "Save" to apply them or "Cancel" to discard'
    },
    {
      target: '.add-work',
      content: 'Click here to add a new work experience entry to your resume'
    },
    {
      target: '.download-button',
      content: 'Download your resume changes as a ZIP file. Upload that archive to the `/updates` folder via GitHub PR'
    },
    {
      target: 'body',
      placement: 'center',
      content: 'You are now ready to start editing your resume! Feel free to explore and customize each section to showcase your experience and skills.'
    }
  ];

  return (
    <Joyride
      steps={steps}
      run={run}
      continuous
      showSkipButton
      styles={{
        options: {
          primaryColor: '#0ea5e9'
        }
      }}
      callback={(data) => {
        const { index, type, status } = data;

        if (type === "step:after" && index === 2) {
          document.querySelectorAll(".editable-header").forEach((header) => {
            (header as HTMLElement).click();
          });
        }

        if (status === 'finished' || status === 'skipped') {
          document.querySelectorAll(".cancel-button").forEach((cancel) => {
            (cancel as HTMLElement).click();
          });

          onFinish();
        }
      }}
    />
  );
}