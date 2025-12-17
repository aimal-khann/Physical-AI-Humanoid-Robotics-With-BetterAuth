import React, { useState } from 'react';
import Layout from '@theme/Layout';
import { authClient } from '../lib/auth-client';
import { useHistory } from '@docusaurus/router'; 

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [softwareBg, setSoftwareBg] = useState('Beginner');
  const [hardwareBg, setHardwareBg] = useState('None');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const handleSignUp = async (e: React.FormEvent) => { // Added event handler
    e.preventDefault(); // Added preventDefault
    setError(null);
    setSuccess(null);
    setIsLoading(true);

    await authClient.signUp.email({
      email,
      password,
      name,
      softwareBackground: softwareBg,
      hardwareBackground: hardwareBg,
    }, {
      onSuccess: () => {
        setSuccess("Account Created Successfully! Redirecting to Introduction..."); // Use state for success message
        setTimeout(() => {
            history.push('/docs/introduction'); 
        }, 2000);
      },
      onError: (ctx) => {
        setError(ctx.error.message); // Use state for error
        setIsLoading(false);
      }
    });
  };

  const inputStyle = { 
      width: '100%', 
      padding: '0.5rem', 
      marginTop: '0.25rem',
      borderRadius: '4px',
      border: '1px solid #ccc'
  };

  return (
    <Layout title="Sign Up">
      <div style={{ padding: '2rem', maxWidth: '400px', margin: '0 auto' }}>
        <h1>Create Account</h1>
        <div style={{ marginBottom: '1rem' }}>
            <label>Name</label>
            <input placeholder="Your Name" onChange={e => setName(e.target.value)} style={inputStyle} disabled={isLoading} />
        </div>
        <div style={{ marginBottom: '1rem' }}>
            <label>Email</label>
            <input placeholder="email@example.com" onChange={e => setEmail(e.target.value)} style={inputStyle} disabled={isLoading} />
        </div>
        <div style={{ marginBottom: '1rem' }}>
            <label>Password</label>
            <input type="password" placeholder="********" onChange={e => setPassword(e.target.value)} style={inputStyle} disabled={isLoading} />
        </div>
        
        <h3>Customize Your Learning</h3>
        <div style={{ marginBottom: '1rem' }}>
            <label>Software Experience:</label>
            <select value={softwareBg} onChange={e => setSoftwareBg(e.target.value)} style={inputStyle} disabled={isLoading}>
                <option value="Beginner">Beginner (No Code)</option>
                <option value="Intermediate">Intermediate (Python/JS)</option>
                <option value="Advanced">Advanced (Systems Engineer)</option>
            </select>
        </div>
        <div style={{ marginBottom: '1rem' }}>
            <label>Hardware Experience:</label>
            <select value={hardwareBg} onChange={e => setHardwareBg(e.target.value)} style={inputStyle} disabled={isLoading}>
                <option value="None">None</option>
                <option value="Arduino">Arduino/RPi</option>
                <option value="Industrial">Industrial Robotics</option>
            </select>
        </div>

        {error && <div className="alert alert--danger">{error}</div>}
        {success && <div className="alert alert--success">{success}</div>}

        <button onClick={handleSignUp} className="button button--primary button--block" disabled={isLoading}>
            {isLoading ? 'Creating Account...' : 'Sign Up & Personalize'}
        </button>
      </div>
    </Layout>
  );
}