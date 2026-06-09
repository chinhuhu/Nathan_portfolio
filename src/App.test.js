import { render, screen } from '@testing-library/react';
import App from './App';

test('renders portfolio shell content', () => {
  render(<App />);
  const heroLabel = screen.getByText(/Design & Development/i);
  expect(heroLabel).toBeInTheDocument();
});
