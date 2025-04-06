import React, { useState } from 'react';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';

function AuthPage() {
  const [activeTab, setActiveTab] = useState('signin'); // Default tab is 'signin'

  return (
    <div className="auth-container">
      <input type="radio" id="signin" name="tab" checked={activeTab === 'signin'} onChange={() => setActiveTab('signin')} />
      <input type="radio" id="signup" name="tab" checked={activeTab === 'signup'} onChange={() => setActiveTab('signup')} />
      <div id="wrapper">
        <div className="tab-header">
          <label htmlFor="signin">Sign in</label>
          <label htmlFor="signup">Sign up</label>
          <div id="arrow"></div>
        </div>
        <div className="tab-content">
          {activeTab === 'signin' && <LoginPage />}
          {activeTab === 'signup' && <RegisterPage />}
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
