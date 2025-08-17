// src/App.test.js
import { render, screen, act } from '@testing-library/react';
import App from './App';

jest.useFakeTimers();

test('muestra el título del sitio', () => {
  render(<App />);
  expect(
    screen.getByRole('heading', { name: /Welcome to the Magical World of Misifu and Cloe/i })
  ).toBeInTheDocument();
});

test('el carrusel avanza automáticamente cada 3s', () => {
  render(<App />);
  // Asume que hay un contador "1/3", "2/3", etc.
  expect(screen.getByText('1/3')).toBeInTheDocument();

  act(() => { jest.advanceTimersByTime(3000); });
  expect(screen.getByText('2/3')).toBeInTheDocument();

  act(() => { jest.advanceTimersByTime(3000); });
  expect(screen.getByText('3/3')).toBeInTheDocument();
});
