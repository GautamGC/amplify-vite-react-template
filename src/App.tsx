// App.tsx
import React from 'react';
import './App.css';
import Amplify from 'aws-amplify';
import { Authenticator, withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { awsExports } from './aws-exports';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import YouTubeHomePage from './YouTubeHomePage';
import VideoPage from './VideoPage';

// Configures AWS Amplify with the settings from aws-exports.js.
Amplify.configure(awsExports);

const App: React.FC = () => {
  return (
    <div className="App">
      <Authenticator>
        {({ signOut }) => (
          <main>
            <header className="App-header">
              {/* Setting up React Router for navigation */}
              <Router>
                <Routes>
                  {/* Route for the homepage */}
                  <Route path="/" element={<YouTubeHomePage />} />

                  {/* Route for individual video pages with dynamic video ID */}
                  <Route path="/video/:id" element={<VideoPage />} />
                </Routes>
              </Router>

              {/* Sign Out button */}
              <button
                onClick={signOut}
                style={{
                  margin: '20px',
                  fontSize: '0.8rem',
                  padding: '5px 10px',
                  marginTop: '20px',
                }}
              >
                Sign Out
              </button>
            </header>
          </main>
        )}
      </Authenticator>
    </div>
  );
};

// Wrap the App component with withAuthenticator for authentication
export default withAuthenticator(App);
