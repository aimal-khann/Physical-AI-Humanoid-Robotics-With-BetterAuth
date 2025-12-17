import React from 'react';
import { authClient } from '../lib/auth-client';
import { useHistory } from '@docusaurus/router';

export default function NavbarAuth() {
  const { data: session, isPending } = authClient.useSession();
  const history = useHistory();

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          alert("You have been logged out.");
          history.push('/'); 
        },
      },
    });
  };

  if (isPending) return <button className="button button--sm">...</button>;

  if (session) {
    return (
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <small>Hi, {session.user.name}</small>
        <button 
          onClick={handleLogout} 
          className="button button--secondary button--sm"
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
      <button 
        onClick={() => history.push('/login')} 
        className="button button--primary button--sm"
      >
        Login
      </button>
      <button 
        onClick={() => history.push('/register')} 
        className="button button--outline button--secondary button--sm"
      >
        Sign Up
      </button>
    </div>
  );
}
