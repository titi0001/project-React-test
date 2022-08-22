import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Teste o componente  Pokemon', () => {
  it('Teste se é renderizado um card com as informações de determinado pokémon:', () => {
    renderWithRouter(<App pokemons={ pokemons } />);
    const [name] = pokemons.map((map) => map.name);
    const pokemonName = screen.getByTestId(/pokemon-name/i);
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeight = screen.getByTestId(/pokemon-weight/i);
    const image = screen.getByRole('img', { name: `${name} sprite` });

    expect(pokemonName).toHaveTextContent(/pikachu/i);
    expect(pokemonType).toHaveTextContent(/electric/i);
    expect(pokemonWeight)
      .toHaveTextContent(`Average weight: ${'6.0'} ${'kg'}`);
    expect(image.src).toContain('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  it('Teste se o card do pokémon indicado na Pokédex contém um link de navegação', () => {
    const { history } = renderWithRouter(<App pokemons={ pokemons } />);
    const [id] = pokemons.map((map) => map.id);
    const detailsLink = screen.getByRole('link', { name: /more details/i });
    expect(detailsLink).toBeInTheDocument();
    userEvent.click(detailsLink);
    expect(history.location.pathname).toBe(`/pokemons/${id}`);
  });

  it('Teste se ao clicar no link e redirecionado para detalhes de pokémon;', () => {
    renderWithRouter(<App />);
    const detailsLink = screen.getByRole('link', { name: /more details/i });
    expect(detailsLink).toBeInTheDocument();
    userEvent.click(detailsLink);
    const titulo = screen.getByRole('heading', { level: 2, name: /Summary/i });
    expect(titulo).toBeInTheDocument();
  });
  it('Teste se existe um ícone de estrela nos pokémons favoritados:', () => {
    const { getByText, getByAltText } = renderWithRouter(<App />);
    // console.log(renderWithRouter(<App />));
    const [name] = pokemons.map((map) => map.name);
    const moreDetails = getByText(/more details/i);
    userEvent.click(moreDetails);
    userEvent.click(getByText(/pokémon favoritado/i));
    const starIcon = getByAltText(`${name} is marked as favorite`);
    expect(starIcon.src).toContain('/star-icon.svg');
  });
});
