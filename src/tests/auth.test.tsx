import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Register from '../pages/register';
import Login from '../pages/login';
import NavbarAuth from '../components/NavbarAuth';
import { authClient } from '../lib/auth-client';

// Mock Docusaurus router for testing
jest.mock('@docusaurus/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
  useLocation: () => ({
    pathname: '/',
  }),
}));

// Mock better-auth client
jest.mock('../lib/auth-client', () => ({
  authClient: {
    register: jest.fn(),
    login: jest.fn(),
    logout: jest.fn(),
  },
}));

// Mock better-auth/client/react for useSession hook
jest.mock('better-auth/client/react', () => ({
  __esModule: true,
  default: jest.fn((client) => {
    // Default mock session: not logged in, not loading
    const defaultSession = { session: null, isLoading: false, mutate: jest.fn() };
    if (client.__mockSession) {
      return client.__mockSession;
    }
    return defaultSession;
  }),
}));

describe('Authentication Components', () => {

  // Test Register Component
  describe('Register', () => {
    it('renders register form', () => {
      render(
        <Router>
          <Register />
        </Router>
      );
      expect(screen.getByPlaceholderText(/name/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/software experience/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/hardware experience/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument();
    });

    it('handles successful registration', async () => {
      (authClient.register as jest.Mock).mockResolvedValueOnce({});
      const useRouterMock = require('@docusaurus/router').useRouter;
      const pushMock = useRouterMock().push;

      render(
        <Router>
          <Register />
        </Router>
      );

      fireEvent.change(screen.getByPlaceholderText(/name/i), { target: { value: 'Test User' } });
      fireEvent.change(screen.getByPlaceholderText(/email/i), { target: { value: 'test@example.com' } });
      fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: 'password123' } });
      fireEvent.change(screen.getByPlaceholderText(/software experience/i), { target: { value: 'JS' } });
      fireEvent.change(screen.getByPlaceholderText(/hardware experience/i), { target: { value: 'RPi' } });
      fireEvent.click(screen.getByRole('button', { name: /register/i }));

      await waitFor(() => {
        expect(authClient.register).toHaveBeenCalledWith({
          name: 'Test User',
          email: 'test@example.com',
          password: 'password123',
          softwareBackground: 'JS',
          hardwareBackground: 'RPi',
        });
        expect(screen.getByText(/registration successful!/i)).toBeInTheDocument();
        expect(pushMock).toHaveBeenCalledWith('/login');
      });
    });

    it('displays error on failed registration', async () => {
      const errorMessage = 'Email already in use';
      (authClient.register as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

      render(
        <Router>
          <Register />
        </Router>
      );

      fireEvent.click(screen.getByRole('button', { name: /register/i }));

      await waitFor(() => {
        expect(screen.getByText(errorMessage)).toBeInTheDocument();
      });
    });
  });

  // Test Login Component
  describe('Login', () => {
    it('renders login form', () => {
      render(
        <Router>
          <Login />
        </Router>
      );
      expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
    });

    it('handles successful login', async () => {
      (authClient.login as jest.Mock).mockResolvedValueOnce({});
      const useRouterMock = require('@docusaurus/router').useRouter;
      const pushMock = useRouterMock().push;

      render(
        <Router>
          <Login />
        </Router>
      );

      fireEvent.change(screen.getByPlaceholderText(/email/i), { target: { value: 'test@example.com' } });
      fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: 'password123' } });
      fireEvent.click(screen.getByRole('button', { name: /login/i }));

      await waitFor(() => {
        expect(authClient.login).toHaveBeenCalledWith({
          email: 'test@example.com',
          password: 'password123',
        });
        expect(pushMock).toHaveBeenCalledWith('/');
      });
    });

    it('displays error on failed login', async () => {
      const errorMessage = 'Invalid credentials';
      (authClient.login as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

      render(
        <Router>
          <Login />
        </Router>
      );

      fireEvent.click(screen.getByRole('button', { name: /login/i }));

      await waitFor(() => {
        expect(screen.getByText(errorMessage)).toBeInTheDocument();
      });
    });
  });

  // Test NavbarAuth Component
  describe('NavbarAuth', () => {
    const mockUseSession = require('better-auth/client/react').default;

    it('renders "Login / Sign Up" when not authenticated', () => {
      mockUseSession.mockReturnValueOnce({ session: null, isLoading: false });
      render(
        <Router>
          <NavbarAuth />
        </Router>
      );
      expect(screen.getByText(/login/i)).toBeInTheDocument();
      expect(screen.getByText(/sign up/i)).toBeInTheDocument();
      expect(screen.queryByText(/hi,/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/logout/i)).not.toBeInTheDocument();
    });

    it('renders "Hi, [Name] / Logout" when authenticated', () => {
      mockUseSession.mockReturnValueOnce({ session: { user: { name: 'Test User' } }, isLoading: false });
      render(
        <Router>
          <NavbarAuth />
        </Router>
      );
      expect(screen.getByText(/hi, test user/i)).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /logout/i })).toBeInTheDocument();
      expect(screen.queryByText(/login/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/sign up/i)).not.toBeInTheDocument();
    });

    it('handles logout', async () => {
      mockUseSession.mockReturnValueOnce({ session: { user: { name: 'Test User' } }, isLoading: false });
      (authClient.logout as jest.Mock).mockResolvedValueOnce({});
      
      render(
        <Router>
          <NavbarAuth />
        </Router>
      );

      fireEvent.click(screen.getByRole('link', { name: /logout/i }));

      await waitFor(() => {
        expect(authClient.logout).toHaveBeenCalled();
      });
    });

    it('shows loading state', () => {
      mockUseSession.mockReturnValueOnce({ session: null, isLoading: true });
      render(
        <Router>
          <NavbarAuth />
        </Router>
      );
      expect(screen.getByText(/loading.../i)).toBeInTheDocument();
    });
  });
});
