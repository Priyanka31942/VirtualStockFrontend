import React, { useState } from 'react';

const tutorialsData = [
  { id: 1, title: 'What is a Stock? – Investopedia', url: 'https://www.investopedia.com/terms/s/stock.asp', category: 'Beginner' },
  { id: 2, title: 'Stock Market for Beginners – YouTube (Ryan Scribner)', url: 'https://www.youtube.com/watch?v=p7HKvqRI_Bo', category: 'Beginner' },
  { id: 3, title: 'How to Trade Stocks – NerdWallet', url: 'https://www.nerdwallet.com/article/investing/how-to-trade-stocks', category: 'Beginner' },
  { id: 4, title: 'How to Invest in Stocks – The Motley Fool', url: 'https://www.fool.com/investing/how-to-invest/stocks/', category: 'Intermediate' },
  { id: 5, title: 'Stock & Bonds Basics – Khan Academy', url: 'https://www.khanacademy.org/economics-finance-domain/core-finance/stock-and-bonds', category: 'Beginner' },
  { id: 6, title: 'How the Stock Market Works – YouTube (Wealth Hacker)', url: 'https://www.youtube.com/watch?v=9xjP7cSdfqI', category: 'Beginner' },
  { id: 7, title: 'Robinhood Learn – Trading Basics, Strategy, and Terms', url: 'https://www.robinhood.com/learn', category: 'Intermediate' },
  { id: 8, title: 'FINRA Investor Education', url: 'https://www.finra.org/investors/learn-to-invest', category: 'Advanced' },
];

const Tutorial = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('None');
  const [bookmarks, setBookmarks] = useState([]);

  const handleBookmark = (id) => {
    setBookmarks((prev) =>
      prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id]
    );
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSortBy('None');
  };

  const filteredTutorials = tutorialsData
    .filter(tutorial =>
      tutorial.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedCategory === 'All' || tutorial.category === selectedCategory)
    )
    .sort((a, b) => {
      if (sortBy === 'Title') return a.title.localeCompare(b.title);
      if (sortBy === 'Category') return a.category.localeCompare(b.category);
      return 0;
    });

  const getBadgeColor = (category) => {
    switch (category) {
      case 'Beginner': return '#d4edda';
      case 'Intermediate': return '#fff3cd';
      case 'Advanced': return '#f8d7da';
      default: return '#eee';
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '700px', margin: '0 auto' }}>
      <h2>📘 Stock Trading Tutorials</h2>
      <p>Explore tutorials and bookmark resources to learn trading effectively:</p>

      {/* Controls */}
      <div style={{ marginBottom: '15px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        <input
          type="text"
          placeholder="Search tutorials..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ padding: '8px', flex: '1' }}
        />
        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} style={{ padding: '8px' }}>
          <option value="All">All Categories</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={{ padding: '8px' }}>
          <option value="None">Sort By</option>
          <option value="Title">Title</option>
          <option value="Category">Category</option>
        </select>
        <button onClick={clearFilters} style={{ padding: '8px 12px', background: '#eee', border: '1px solid #ccc', cursor: 'pointer' }}>
          Reset
        </button>
      </div>

      {/* Tutorial List */}
      <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
        {filteredTutorials.map(tutorial => (
          <li key={tutorial.id} style={{
            marginBottom: '12px',
            padding: '10px',
            border: '1px solid #ddd',
            borderRadius: '8px',
            background: '#fafafa'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <a href={tutorial.url} target="_blank" rel="noopener noreferrer" style={{ fontWeight: 'bold', textDecoration: 'none', color: '#0074cc' }}>
                  {tutorial.title}
                </a>
                <div style={{
                  display: 'inline-block',
                  padding: '2px 6px',
                  marginLeft: '10px',
                  fontSize: '12px',
                  backgroundColor: getBadgeColor(tutorial.category),
                  borderRadius: '4px'
                }}>
                  {tutorial.category}
                </div>
              </div>
              <button onClick={() => handleBookmark(tutorial.id)} style={{
                background: bookmarks.includes(tutorial.id) ? '#ffe58f' : '#eee',
                border: 'none',
                padding: '4px 8px',
                borderRadius: '5px',
                cursor: 'pointer'
              }}>
                {bookmarks.includes(tutorial.id) ? '★ Bookmarked' : '☆ Bookmark'}
              </button>
            </div>
          </li>
        ))}
        {filteredTutorials.length === 0 && <p>No tutorials found.</p>}
      </ul>

      {bookmarks.length > 0 && (
        <div style={{ marginTop: '30px' }}>
          <h3>⭐ Your Bookmarks</h3>
          <ul>
            {bookmarks.map(id => {
              const tutorial = tutorialsData.find(t => t.id === id);
              return (
                <li key={id}>
                  <a href={tutorial.url} target="_blank" rel="noopener noreferrer">{tutorial.title}</a>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Tutorial;
