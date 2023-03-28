import React from 'react';
import { act, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { renderWithProviders } from '../utils/test-utils';
import getQuestionsStub from '../proxies/getQuestionsProxy';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import QuestionsAnswers from '../../components/QuestionsAnswers/QuestionsAnswers';

// eslint-disable-next-line import/prefer-default-export
export const handlers = [
  rest.get('/qa/questions', (req, res, ctx) => res(
    ctx.json(getQuestionsStub),
    ctx.delay(150),
  )),
];

const server = setupServer(...handlers);

// Enable API mocking before tests.
beforeAll(() => server.listen());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => server.close());

test('QnA shows loading message while it\'s loading', async () => {
  renderWithProviders(
    <Router>
      <QuestionsAnswers />
    </Router>, {
    preloadedState: {
    },
  });
  // check loading state
  expect(screen.queryByText('Loading...')).toBeInTheDocument();
  // screen.logTestingPlaygroundURL();
  // expect(screen.getByText('Some other string')).toBeInTheDocument();
});
test('QnA shows renders when correct data is received', async () => {
  renderWithProviders(
    <Router>
      <QuestionsAnswers />
    </Router>, {
    preloadedState: {
    },
  });
  // check loading state
  expect(await screen.findByText('Questions & Answers')).toBeInTheDocument();
  // check if all the components load
  // search bar
  expect(await screen.getByPlaceholderText('Have a question? Search for answers…')).toBeInTheDocument();
  // questions list
  /// buttons
  /// qna set
  //// question entry
  //// answer list
  ///// answer entry
  // expect(await screen.findByClass('Questions & Answers')).toBeInTheDocument();
  // expect(await screen.findByText('Questions & Answers')).toBeInTheDocument();
  // expect(await screen.findByText('Questions & Answers')).toBeInTheDocument();
  // screen.logTestingPlaygroundURL();
  // expect(screen.getByText('Some other string')).toBeInTheDocument();
});

