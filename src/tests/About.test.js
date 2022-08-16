import React from 'react';
import { render, screen } from '@testing-library/react';
import { About } from '../pages';
import renderWithRouter from './renderWithRouter';

describe('Teste a page About', () => {
  it('Teste se a página contém as informações sobre a Pokédex;', () => {
    render(<About />);
    const information = screen.getAllByText(/Pokédex/i);
    console.log(information);
    expect(information).toHaveLength(2);
  });
  it('Teste se a página contém um heading h2 com o texto About Pokédex;', () => {
    render(<About />);
    const aboutPokedex = screen
      .getByRole('heading', { level: 2, name: /About Pokédex/i });
    expect(aboutPokedex).toBeInTheDocument();
  });

  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex;', () => {
    const { container } = renderWithRouter(<About />);
    const paragraphs = container.querySelectorAll('p');
    expect(paragraphs).toHaveLength(2);
  });

  it('se a página contém a seguinte imagem de uma Pokédex', () => {
    render(<About />);
    const image = screen.getByRole('img', { name: /Pokédex/i });
    expect(image.src).toContain('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
