import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testando o componente App', () => {
  it('O primeiro link deve possuir o texto Home;', () => {
    renderWithRouter(<App />);
    const homeTitle = screen.getByRole('link', { name: /home/i });
    expect(homeTitle).toBeInTheDocument();
  });

  it('O segundo link deve possuir o texto About;', () => {
    renderWithRouter(<App />);
    const aboutTitle = screen.getByRole('link', { name: /about/i });
    expect(aboutTitle).toBeInTheDocument();
  });

  it('O terceiro link deve possuir o texto Favorite Pokémons.', () => {
    renderWithRouter(<App />);
    const favoriteTitle = screen.getByRole('link', { name: /favorite pokémons/i });
    expect(favoriteTitle).toBeInTheDocument();
  });

  it('O link deve renderizar a página URL ./', () => {
    const { history } = renderWithRouter(<App />);
    const homeTitle = screen.getByRole('link', { name: /home/i });
    userEvent.click(homeTitle);
    expect(history.location.pathname).toBe('/');
  });

  it('O link deve renderizar a página URL ./about', () => {
    const { history } = renderWithRouter(<App />);
    const aboutTitle = screen.getByRole('link', { name: /about/i });
    userEvent.click(aboutTitle);
    expect(history.location.pathname).toEqual('/about');
  });

  it('O link deve renderizar a página URL /favorites', () => {
    const { history } = renderWithRouter(<App />);
    const favoriteTitle = screen.getByRole('link', { name: /favorite pokémons/i });
    userEvent.click(favoriteTitle);
    expect(history.location.pathname).toBe('/favorites');
  });

  it('É redirecionada para a Not Found ao entrar em uma URL desconhecida', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/notfound');

    const notFoundTitle = screen.getByRole('heading', { level: 2, name: /not found/i });
    expect(notFoundTitle).toBeInTheDocument();
  });
});
