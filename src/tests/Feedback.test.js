import React from 'react';
import Feedback from '../pages/Feedback';
import App from '../App'
import { screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';

describe('Testa a página de feedbacks', () => {
  const state = {
    player: {
        name: "Carlos",
        assertions: 5,
        score: 200,
        gravatarEmail: "https://www.gravatar.com/avatar/4deb6e56d98aaaedcd92429e03fa59ce",
    },
};
 
  const feedbackRoute = "/feedback";

  it('Testa se a página contém as informações do header, assim como o score total, os acertos e os botões', () => {
    renderWithRouterAndRedux(<Feedback />);

    screen.getByTestId('header-profile-picture');
    screen.getByTestId('header-player-name');
    screen.getByTestId('header-score');

    screen.getByTestId('feedback-text');
    screen.getByTestId('feedback-total-score');
    screen.getByTestId('feedback-total-question');
  });

  it('Testa o botão de jogar novamente', () => {
    renderWithRouterAndRedux(<App />, state, feedbackRoute);
    const btnPlay = screen.getByTestId('btn-play-again');
    expect(btnPlay).toBeInTheDocument();
    act(()=>userEvent.click(btnPlay));
    const nameEl = screen.getByText(/nome:/i);
    expect(nameEl).toBeInTheDocument();
  });

  it('Testa o botão de Ranking', () => {
    renderWithRouterAndRedux(<App />, state, feedbackRoute);
    const btnRank = screen.getByTestId('btn-ranking');
    expect(btnRank).toBeInTheDocument();
    const rank = []
    localStorage.setItem('ranking', JSON.stringify(rank));
    act(()=>userEvent.click(btnRank));
    const rankEl = screen.getByRole('heading', {name: /ranking/i})
    expect(rankEl).toBeInTheDocument();
  })
});
