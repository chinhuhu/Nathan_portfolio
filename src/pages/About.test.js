import { fireEvent, render, screen } from '@testing-library/react';
import About from './About';

test('shows resume actions and embedded PDF preview', () => {
  render(<About />);

  fireEvent.click(screen.getAllByRole('button', { name: 'Resume' })[0]);

  const openLink = screen.getByRole('link', { name: /open in new tab/i });
  expect(openLink).toHaveAttribute('href', expect.stringContaining('Resume_Nathan%20Nguyen.pdf'));
  expect(openLink).toHaveAttribute('target', '_blank');

  const resumePreview = document.querySelector('object[aria-label="Resume PDF"]');
  expect(resumePreview).toBeInTheDocument();
  expect(resumePreview).toHaveAttribute('data', expect.stringContaining('Resume_Nathan%20Nguyen.pdf#view=FitH'));
});

test('calls window.print from the resume view', () => {
  const printSpy = jest.spyOn(window, 'print').mockImplementation(() => {});

  render(<About />);

  fireEvent.click(screen.getAllByRole('button', { name: 'Resume' })[0]);
  fireEvent.click(screen.getByRole('button', { name: 'Print' }));

  expect(printSpy).toHaveBeenCalledTimes(1);

  printSpy.mockRestore();
});
