import { fireEvent, render, screen } from '@testing-library/react';
import VisualIdentityPage from './VisualIdentityPage';

test('opens and navigates the branding lightbox', () => {
  render(<VisualIdentityPage />);

  fireEvent.click(screen.getAllByRole('button', { name: 'Branding' })[0]);
  fireEvent.click(screen.getByRole('button', { name: 'Open Luthor Media' }));

  expect(screen.getByRole('button', { name: /close lightbox/i })).toBeInTheDocument();
  expect(screen.getByText(/1 \/ 23/)).toBeInTheDocument();

  fireEvent.click(screen.getByRole('button', { name: /next image/i }));

  expect(screen.getByText(/2 \/ 23/)).toBeInTheDocument();
});
