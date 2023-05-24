import React from 'react';
import Feedback from '../pages/Feedback';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';

describe('Testa a página de feedbacks', () => {
  it('Testa se a página contém as informações do header, assim como o score total, os acertos e os botões', () => {
    renderWithRouterAndRedux(<Feedback />);

    screen.getByTestId('header-profile-picture');
    screen.getByTestId('header-player-name');
    screen.getByTestId('header-score');

    screen.getByTestId('feedback-text');
    screen.getByTestId('feedback-total-score');
    screen.getByTestId('feedback-total-question');
  });

  it('Testa o botão de jogar novamente', async () => {
    const { history } = renderWithRouterAndRedux(<Feedback />);
    const btnPlay = screen.getByTestId('btn-play-again');
    await act( async () => {
      userEvent.click(btnPlay)
      await waitFor(() => {
        const {pathname} = history.location;
        expect(pathname).toBe('/')
      });
    });

  });

  it('Testa o botão de jogar novamente', async () => {
    const { history } = renderWithRouterAndRedux(<Feedback />);
    const btnRanking = screen.getByTestId('btn-ranking');
    await act( async () => {
      userEvent.click(btnRanking)
      await waitFor(() => {
        const {pathname} = history.location;
        expect(pathname).toBe('/ranking')
      });
    })
  })
});
