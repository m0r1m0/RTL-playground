import React from 'react';
import { render, screen } from '@testing-library/react';
import App, { Search } from './App';
import userEvent from '@testing-library/user-event';
 
describe('App', () => {
  test('renders App component', async () => {
    render(<App />);

    await screen.findByText(/Signed in as/);
    expect(screen.queryByText(/Searches for JavaScript/)).toBeNull();
    userEvent.type(screen.getByRole('textbox'), 'JavaScript');

    expect(screen.getByText(/Searches for JavaScript/)).toBeInTheDocument();
  });
});

describe('Search', () => {
  test('calls the onChange callback handler', () => {
    const onChange = jest.fn();

    render(
      <Search value="" onChange={onChange}>
        Search:
      </Search>
    );

    userEvent.type(screen.getByRole('textbox'), 'JavaScript');

    expect(onChange).toHaveBeenCalledTimes(10);
  });
});