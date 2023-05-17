import React from 'react';
import { render, screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import { FavoritePokemons } from '../pages';
import data from '../data';

describe('Teste o componente Favorite pokemon', () => {
  it('exibe a msg No favorite pokemon found, se não tem pokémons favoritos', () => {
    render(<FavoritePokemons />);
    const title = screen.getByText(/no favorite pokemon found/i);
    expect(title).toBeInTheDocument();
  });
  it('Teste se são exibidos todos os cards de pokémons favoritados', () => {
    renderWithRouter(<FavoritePokemons pokemons={ data } />);
    const name = screen.getByText(/pikachu/i);
    expect(name).toBeInTheDocument();
    // console.log(data[0].name);
    // console.log(screen.logTestingPlaygroundURL());
  });
});
