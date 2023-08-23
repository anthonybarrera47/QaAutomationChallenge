import React from 'react';
import { render, screen , act  } from '@testing-library/react';
import { waitFor } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('App component', () => {
  it('renders the component without errors', () => {
    render(<App />);
    const header = screen.getByText("Get Github Repos");
    expect(header).toBeInTheDocument();
  });

  it('fetches and displays repos on submit', async () => {
    const mockRepos = [
      { id: 1, name: 'Repo 1', description: 'Description 1', html_url: 'http://example.com/repo1' },
      { id: 2, name: 'Repo 2', description: 'Description 2', html_url: 'http://example.com/repo2' },
    ];

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockRepos),
      })
    );

    render(<App />);

    userEvent.type(screen.getByLabelText(/Github Username/i), 'testuser');
    userEvent.click(screen.getByText(/Go/i));
    await act(async () => {
      await waitFor(() => {
        const repoLinks = screen.getAllByRole('link');
        expect(repoLinks).toHaveLength(2);
      });
    });
  });

  it('displays error message when no repos are found', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([]),
      })
    );

    render(<App />);

    userEvent.type(screen.getByLabelText(/Github Username/i), 'testuser');
    userEvent.click(screen.getByText(/Go/i));
    
    await act(async () => {
      await waitFor(() => {
        const errorMessage = screen.getByText(/No repos found./i);
        expect(errorMessage).toBeInTheDocument();
      });
    });
    
  });

  it('displays generic error message when fetch fails', async () => {
    global.fetch = jest.fn(() => Promise.reject(new Error('Fetch error')));

    render(<App />);

    userEvent.type(screen.getByLabelText(/Github Username/i), 'testuser');
    userEvent.click(screen.getByText(/Go/i));

    await act(async () => {
      await waitFor(() => {
        const errorMessage = screen.getByText(/Something went wrong./i);
        expect(errorMessage).toBeInTheDocument();
      });
    });
  });
});