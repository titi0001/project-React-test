import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Teste o componente Pokedex', () => {
  it('Teste a página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const title = screen
      .getByRole('heading', { level: 2, name: /encountered pokémons/i });
    expect(title).toBeInTheDocument();
  });

  it('Teste se exibido próximo pokémon quando o botão Próximo pokémon é clicado', () => {
    renderWithRouter(<App />);
    pokemons.forEach(({ name }) => {
      const btnNext = screen.getByTestId('next-pokemon');
      const pokemonName = screen.getByText(name);
      userEvent.click(btnNext);
      expect(pokemonName).toBeInTheDocument();
    });
  });

  it('Os pokémons da lista devem ser mostrados, um a um, ao clicar no botão', () => {
    renderWithRouter(<App />);
    const type = screen.getAllByTestId('pokemon-type');
    expect(type).toHaveLength(1);
  });

  it('Teste se a Pokédex tem os botões de filtro:', () => {
    renderWithRouter(<App pokemons={ pokemons } />);
    const btnfilter = screen.getAllByTestId(/pokemon-type-button/i);
    const pokemonsType = pokemons.map(({ type }) => type)
      .filter((type, index, arr) => arr.indexOf(type) === index);

    pokemonsType.forEach((btnText, index) => {
      expect(btnfilter[index]).toHaveTextContent(btnText);
    });
  });

  it('Teste se a Pokédex contém um botão para resetar o filtro:', () => {
    renderWithRouter(<App pokemons={ pokemons } />);
    const btnAll = screen.getByRole('button', { name: /all/i });
    // screen.logTestingPlaygroundURL();
    expect(btnAll).toBeInTheDocument();
    expect(btnAll).not.toBeDisabled();
    userEvent.click(btnAll);
  });
});
