import { fireEvent, render, screen } from '@testing-library/react';
import Header from './Header';

test('calls the navigation handler with the selected section', () => {
  const onNavigate = jest.fn();

  render(<Header activeSection="home" onNavigate={onNavigate} theme="dark" />);

  fireEvent.click(screen.getByRole('button', { name: 'Development' }));

  expect(onNavigate).toHaveBeenCalledWith('development');
});

test('calls the theme toggle handler', () => {
  const onToggleTheme = jest.fn();

  render(<Header activeSection="home" onToggleTheme={onToggleTheme} theme="dark" />);

  fireEvent.click(screen.getByRole('button', { name: /toggle light and dark mode/i }));

  expect(onToggleTheme).toHaveBeenCalledTimes(1);
});
