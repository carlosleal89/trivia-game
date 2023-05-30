import React from 'react';
import Feedback from '../pages/Feedback';
import App from '../App'
import { screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';

describe('Testes da tela de ranking', () => {
    const state = {
        player: {
            name: "Carlos",
            assertions: 5,
            score: 200,
            gravatarEmail: "https://www.gravatar.com/avatar/4deb6e56d98aaaedcd92429e03fa59ce",
        },
    };
    const rank = [{
        name: "Morgan Gonzalez",
        picture: "https://www.gravatar.com/avatar/4deb6e56d98aaaedcd92429e03fa59ce",
        score: 139,
    }];
    localStorage.setItem('ranking', JSON.stringify(rank));

    const rankingRoute = '/ranking';

  it('Testa se tela exibe o titulo, e botão para ir para home', () => {
    renderWithRouterAndRedux(<App />, state, rankingRoute);
    
      const headingEl = screen.getByRole('heading', { name: /ranking/i });
      const homeBtnEl = screen.getByRole('link', { name: /go to home/i });

      expect(headingEl).toBeInTheDocument();
      expect(homeBtnEl).toBeInTheDocument();
  });
  it('Testa se tela exibe o botão para a tela de login', () => {
    renderWithRouterAndRedux(<App />, state, rankingRoute);
    
      const headingEl = screen.getByRole('heading', { name: /ranking/i });
      const homeBtnEl = screen.getByRole('link', { name: /go to home/i });

      act(()=>userEvent.click(homeBtnEl));

      const nameEl = screen.getByText(/nome:/i);
      expect(nameEl).toBeInTheDocument();
  });
  it('Testa se tela exibe o ranking', () => {
    const rankingData = JSON.parse(localStorage.getItem('ranking'));
    const sortedRanking = rankingData.sort((a, b) => b.score - a.score);
    renderWithRouterAndRedux(<App />, state, rankingRoute);
    
      const firstRanking = screen.getByRole('heading', {  name: /morgan gonzalez/i});
      const score = screen.getByRole('heading', {  name: /139/i});
      expect(score).toBeInTheDocument();
      expect(firstRanking).toBeInTheDocument();
  });
  it('Testa se tela exibe a imagem do jogador', () => {
    renderWithRouterAndRedux(<App />, state, rankingRoute);
    const imageEl = screen.getByTestId('player-image-0');
    expect(imageEl).toBeInTheDocument();
  });
})