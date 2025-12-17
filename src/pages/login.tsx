import React, { useState } from 'react';
import Layout from '@theme/Layout';
import { authClient } from '../lib/auth-client';
import { useHistory } from '@docusaurus/router';
import Link from '@docusaurus/Link';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await authClient.signIn.email({
        email,
        password,
      }, {
        onSuccess: () => {
          alert("Welcome back!");
          history.push('/docs/introduction'); 
        },
        onError: (ctx) => {
          alert(ctx.error.message);
        }
      });
    } catch (err: any) {
      setError(err.message || 'Login failed.');
    } finally {
      setIsLoading(false);
    }
  };

  const inputStyle = { 
      width: '100%', 
      padding: '0.5rem', 
      marginTop: '0.25rem',
      borderRadius: '4px',
      border: '1px solid #ccc'
  };

  return (
    <Layout title="Login">
      <div style={{ padding: '2rem', maxWidth: '400px', margin: '0 auto', marginTop: '50px' }}>
        <div className="card shadow--md">
          <div className="card__header">
            <h3>Login to Your Account</h3>
          </div>
          <div className="card__body">
            <div style={{ marginBottom: '1rem' }}>
              <label>Email</label>
              <input 
                className="button--block"
                placeholder="email@example.com" 
                onChange={e => setEmail(e.target.value)} 
                style={inputStyle} 
                required
                disabled={isLoading}
              />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label>Password</label>
              <input 
                type="password" 
                placeholder="********" 
                onChange={e => setPassword(e.target.value)} 
                style={inputStyle} 
                required
                disabled={isLoading}
              />
            </div>
            {error && <div className="alert alert--danger">{error}</div>}
            <div className="margin-vert--md">
              <button onClick={handleSignIn} className="button button--primary button--block" disabled={isLoading}>
                {isLoading ? 'Logging in...' : 'Sign In'}
              </button>
            </div>
          </div>
          <div className="card__footer text--center">
            <small>Don't have an account? <Link to="/register">Sign Up here</Link></small>
          </div>
        </div>
      </div>
    </Layout>
  );
}