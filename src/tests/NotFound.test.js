import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../pages/NotFound';

describe('Teste o componente NotFound', () => {
  it('Teste se a página contém um h2 com o texto Page requested not found', () => {
    render(<NotFound />);
    const heading = screen
      .getByRole('heading', { level: 2, name: /page requested not found/i });
    expect(heading).toBeInTheDocument();
  });
  it('Teste se a página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    render(<NotFound />);
    const img = screen.getByRole('img',
      { name: /Pikachu crying because the page requested was not found/i });
    expect(img.src).toContain('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
