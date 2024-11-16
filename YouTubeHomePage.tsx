// YouTubeHomePage.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import './YouTubeHomePage.css';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/" className="logo-text">MyTube</Link>
      </div>
      <div className="navbar-search">
        <input typeName="text" placeholder="Search videos..." className="search-input" />
        <button className="search-button">🔍</button>
      </div>
      <div className="navbar-links">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/trending" className="nav-link">Trending</Link>
        <Link to="/subscriptions" className="nav-link">Subscriptions</Link>
      </div>
    </nav>
  );
};

interface Video {
  id: number;
  title: string;
  thumbnail: string;
}

const YouTubeHomePage: React.FC = () => {
  const videos: Video[] = [
    { id: 1, title: 'WhatsApp Video 2024-11-10', thumbnail: 'https://picsum.photos/200/300' },
    { id: 2, title: 'Sample Video 1', thumbnail: 'https://picsum.photos/200/500' },
    { id: 3, title: 'Sample Video 2', thumbnail: 'https://picsum.photos/200/300' },
    { id: 4, title: 'Sample Video 3', thumbnail: 'https://picsum.photos/200/100' },
    { id: 5, title: 'Sample Video 4', thumbnail: 'https://picsum.photos/300/300' },
    { id: 6, title: 'Sample Video 5', thumbnail: 'https://picsum.photos/200/400' },
  ];

  return (
    <div>
      <Navbar />
      <div className="homepage">
        <h1 className="title">Home Page</h1>
        <ul className="video-list">
          {videos.map(video => (
            <li key={video.id} className="video-item">
              <Link to={`/video/${video.id}`} className="video-card">
                <img src={video.thumbnail} alt={video.title} className="thumbnail" />
                <div className="video-info">
                  <p className="video-title">{video.title}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default YouTubeHomePage;
