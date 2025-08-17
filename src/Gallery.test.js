import { render, screen } from '@testing-library/react';
import Gallery from './Gallery';

test('muestra el título "Photo Gallery"', () => {
  render(<Gallery />);
  expect(screen.getByRole('heading', { name: /photo gallery/i })).toBeInTheDocument();
});

test('renderiza 4 fotos con alt correctos', () => {
  render(<Gallery />);
  const imgs = screen.getAllByRole('img');
  expect(imgs).toHaveLength(4);

  // Aserciones por alt, según tu array en Gallery.js
  const alts = imgs.map((i) => i.getAttribute('alt'));
  expect(alts).toEqual(
    expect.arrayContaining([
      'Cloe playing',
      'Misifu sleeping',
      'Misifu and Cloe together',
      'Misifu reading',
    ])
  );
});
