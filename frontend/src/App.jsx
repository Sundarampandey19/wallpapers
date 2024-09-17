import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [array, setArray] = useState([]);
  const [selectedImageId, setSelectedImageId] = useState(null);

  async function fetchData() {
    try {
      const response = await fetch('http://localhost:3002/api/wallhaven');
      const data = await response.json();
      console.log(data.data);
      setArray(data.data);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleImageClick = (id) => {
    setSelectedImageId(id === selectedImageId ? null : id); // Toggle selection
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Image Gallery</h1>
      </header>
      <main className="image-gallery">
        {array.length > 0 ? (
          array.map((image) => (
            <div key={image.id} className="image-card">
              <a
                href={image.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  e.preventDefault(); // Prevent navigation to allow for toggling details
                  handleImageClick(image.id);
                }}
              >
                <img
                  src={image.thumbs.large}
                  alt={image.id}
                  className="image-thumbnail"
                />
              </a>
              {selectedImageId === image.id && (
                <div className="image-details">
                  <h2>Details for Image ID: {image.id}</h2>
                  <p><strong>URL:</strong> <a href={image.url} target="_blank" rel="noopener noreferrer">{image.short_url}</a></p>
                  <p><strong>Views:</strong> {image.views}</p>
                  <p><strong>Favorites:</strong> {image.favorites}</p>
                  <p><strong>Source:</strong> <a href={image.source} target="_blank" rel="noopener noreferrer">{image.source}</a></p>
                  <p><strong>Purity:</strong> {image.purity}</p>
                  <p><strong>Category:</strong> {image.category}</p>
                  <p><strong>Resolution:</strong> {image.resolution}</p>
                  <p><strong>File Size:</strong> {(image.file_size / 1024).toFixed(2)} KB</p>
                  <p><strong>File Type:</strong> {image.file_type}</p>
                  <p><strong>Created At:</strong> {new Date(image.created_at).toLocaleDateString()}</p>
                  <p><strong>Colors:</strong> {image.colors.join(', ')}</p>
                </div>
              )}
            </div>
          ))
        ) : (
          <p>Loading images...</p>
        )}
      </main>
    </div>
  );
}

export default App;
