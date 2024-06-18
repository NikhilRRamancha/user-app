import React from 'react';
import { render, screen } from '@testing-library/react';
import { ErrorPage } from '../containers/errorPage/ErrorPage';


describe('Error Page', () => {

test('Renders Error page', () => {
    render(
          <ErrorPage />
    );
    expect(screen.getByText('Error Page')).toBeInTheDocument();
  });
});