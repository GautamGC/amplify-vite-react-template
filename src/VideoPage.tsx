// VideoPage.tsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { DynamoDB } from 'aws-sdk';
import './VideoPage.css';

const dynamoDb = new DynamoDB.DocumentClient();

interface VideoParams {
  id: string;
}

const VideoPage: React.FC = () => {
  const { id } = useParams<VideoParams>();
  const videoUrls: { [key: string]: string } = {
    1: 'https://d3d4djnialjdh4.cloudfront.net/WhatsApp%20Video%202024-11-10%20at%2018.06.41_6b7c1d75.mp4',
    2: 'https://d3d4djnialjdh4.cloudfront.net/WhatsApp%20Video%202024-11-10%20at%2021.10.30_abb3024f.mp4',
    3: 'https://d3d4djnialjdh4.cloudfront.net/WhatsApp%20Video%202024-11-10%20at%2021.10.30_6f3e325e.mp4',
    4: 'https://d3d4djnialjdh4.cloudfront.net/WhatsApp%20Video%202024-11-15%20at%2011.54.01_de8c9378.mp4',
    5: 'https://d3d4djnialjdh4.cloudfront.net/sample_video_4.mp4',
    6: 'https://d3d4djnialjdh4.cloudfront.net/sample_video_5.mp4',
  };

  const videoUrl = videoUrls[id];
  const [likes, setLikes] = useState<number>(0);

  useEffect(() => {
    const fetchLikes = async () => {
      const params = {
        TableName: 'VideoLikes',
        Key: { videoId: id }
      };
      try {
        const data = await dynamoDb.get(params).promise();
        setLikes(data.Item ? data.Item.likes : Math.floor(Math.random() * 50) + 1);
      } catch (error) {
        console.error('Error fetching likes:', error);
        setLikes(Math.floor(Math.random() * 50) + 1);
      }
    };
    fetchLikes();
  }, [id]);

  const handleLike = async () => {
    const updatedLikes = likes + 1;
    setLikes(updatedLikes);
    const params = { TableName: 'VideoLikes', Item: { videoId: id, likes: updatedLikes } };
    try {
      await dynamoDb.put(params).promise();
      console.log('Like count updated');
    } catch (error) {
      console.error('Error updating like count:', error);
    }
  };

  return (
    <div className="video-page">
      <header className="navbar">
        <Link to="/" className="logo">VideoStream</Link>
        <Link to="/" className="back-button">Back to Home</Link>
      </header>

      <h1 className="video-title">Video Page</h1>
      {videoUrl ? (
        <div className="video-container">
          <video width="100%" controls>
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          <div className="like-section">
            <button onClick={handleLike} className="like-button">👍 Like</button>
            <p className="like-count">{likes} Like{likes !== 1 ? 's' : ''}</p>
          </div>
        </div>
      ) : (
        <p className="video-not-found">Video not found.</p>
      )}
    </div>
  );
};

export default VideoPage;
