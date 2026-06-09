import { fireEvent, render, screen } from '@testing-library/react';
import DigitalArtsPage from './DigitalArtsPage';

test('shows gallery cards with full-image links', () => {
  render(<DigitalArtsPage />);

  fireEvent.click(screen.getAllByRole('button', { name: 'Gallery' })[0]);

  expect(screen.getByText('All in our hand')).toBeInTheDocument();
  expect(screen.getByText('Dawn at Louise')).toBeInTheDocument();

  expect(screen.getByRole('link', { name: /open full image for all in our hand/i })).toHaveAttribute(
    'href',
    expect.stringContaining('All%20in%20our%20hand.png')
  );
  expect(screen.getByRole('link', { name: /open full image for dawn at louise/i })).toHaveAttribute(
    'href',
    expect.stringContaining('Dawn%20at%20Louise.jpeg')
  );
});

test('advances to the next gallery batch', () => {
  render(<DigitalArtsPage />);

  fireEvent.click(screen.getAllByRole('button', { name: 'Gallery' })[0]);
  fireEvent.click(screen.getByRole('button', { name: /next works/i }));

  expect(screen.getByText('Graphic Novel')).toBeInTheDocument();
  expect(screen.getByText('Kannanaskis')).toBeInTheDocument();
});
