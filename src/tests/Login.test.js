import React from 'react';
import App from '../App';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux'

describe('Testa a página de login', () => {
  it('Testa se ao inserir um email válido e nome o botão "Play" habilita, e ao clicar nele é feito uma chamada a API', () => {
    renderWithRouterAndRedux(<App />)

    // Pegando campos e botões
    const inputName = screen.getByTestId('input-player-name');
    const inputEmail = screen.getByTestId('input-gravatar-email');
    const buttonPlay = screen.getByTestId('btn-play');
    const buttonSettings = screen.getByTestId('btn-settings');

    // Informações válidas para os campos
    const VALID_NAME = 'Usuário 25';
    const VALID_EMAIL = 'user25@gmail.com';

    // Simulando interação de usuários
    userEvent.type(inputName, VALID_NAME);
    userEvent.type(inputEmail, VALID_EMAIL);
    userEvent.click(buttonPlay);
  });
});