import React from 'react';
import App from '..App/';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux'
import userEvent from '@testing-library/user-event';

describe('Testa a página de login', () => {
  it('Testa se ao inserir um email válido e nome o botão "Play" habilita, e ao clicar nele é feito uma chamada a API e o usuario é redirecionado para a página do jogo', () => {
    const { history } = renderWithRouterAndRedux(<App />)

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

    // Verificando se após o clique fui para a rota do jogo
    const { pathname } = history.location;
    expect(pathname).toBe('/game'); // Qual vai ser o nome da rota da tela do jogo?
  });
});