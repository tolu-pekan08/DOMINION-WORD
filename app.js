const { useState, useEffect } = React;

// Main App Component
function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [prayerRequests, setPrayerRequests] = useState([]);

  // Load dark mode preference from localStorage
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
    document.documentElement.setAttribute('data-theme', savedDarkMode ? 'dark' : 'light');
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode);
    document.documentElement.setAttribute('data-theme', newDarkMode ? 'dark' : 'light');
  };

  return (
    <div className="app">
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} onNavClick={setCurrentPage} />

      {currentPage === 'home' && <HomePage onJoin={() => alert('Welcome to DOMINION WORLD!')} />}
      {currentPage === 'about' && <AboutPage />}
      {currentPage === 'sermons' && <SermonsPage />}
      {currentPage === 'giving' && <GivingPage />}
      {currentPage === 'prayer' && (
        <PrayerPage prayerRequests={prayerRequests} setPrayerRequests={setPrayerRequests} />
      )}
      {currentPage === 'contact' && <ContactPage />}

      <Footer />
    </div>
  );
}

// Header Component with Dark Mode Toggle
function Header({ darkMode, toggleDarkMode, onNavClick }) {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <a className="brand" href="#" onClick={(e) => { e.preventDefault(); onNavClick('home'); }}>
          <span className="brand-name">DOMINION WORLD</span>
        </a>

        <nav className="main-nav" aria-label="main navigation">
          <ul>
            <li><a href="#home" onClick={(e) => { e.preventDefault(); onNavClick('home'); }}>Home</a></li>
            <li><a href="#about" onClick={(e) => { e.preventDefault(); onNavClick('about'); }}>About</a></li>
            <li><a href="#service" onClick={(e) => { e.preventDefault(); onNavClick('service'); }}>Services</a></li>
            <li><a href="#contact" onClick={(e) => { e.preventDefault(); onNavClick('contact'); }}>Contact</a></li>
            <li><a href="#sermons" onClick={(e) => { e.preventDefault(); onNavClick('sermons'); }}>Sermons</a></li>
          </ul>
        </nav>

        <button className="dark-mode-toggle" onClick={toggleDarkMode} title="Toggle Dark Mode">
          {darkMode ? '☀️' : '🌙'}
        </button>
      </div>
    </header>
  );
}

// Home Page
function HomePage({ onJoin }) {
  return (
    <main>
      <section className="hero">
        <div className="container hero-grid">
          <h1>GENESIS 1:28</h1>
          <p className="hero-text">Be fruitful, and multiply and Dominate the world</p>
          <button className="cta-button" onClick={onJoin}>Join Us</button>
        </div>
      </section>

      <section className="info-section">
        <div className="container">
          <h2>Raising Kingdom Ambassadors</h2>
          <p>A place of worship, faith, and transformation</p>
        </div>
      </section>
    </main>
  );
}

// About Page
function AboutPage() {
  return (
    <main>
      <section className="hero">
        <div className="container hero-grid">
          <h1>About Us</h1>
          <p className="hero-text">DOMINION World INTERNATIONAL — Dominating The World With His Word</p>
        </div>
      </section>

      <section className="info-section about-section">
        <div className="container">
          <h2>About Our Church</h2>
          <p>
            DOMINION World INTERNATIONAL is a Christ-centered ministry committed to spreading the gospel,
            raising leaders, and impacting lives worldwide.
          </p>
          <h3>Classes in the Church</h3>
          <ul>
            <li>Adult 21-59</li>
            <li>Youth 18-20</li>
            <li>Teenager 13-17</li>
          </ul>
        </div>
      </section>
    </main>
  );
}

// Sermons Page
function SermonsPage() {
  const [sermons] = useState([
    { id: 1, title: 'Taking Dominion', date: 'Feb 15, 2026', speaker: 'Pastor Young Chris', videoId: 'dQw4w9WgXcQ' },
    { id: 2, title: 'Faith in Action', date: 'Feb 8, 2026', speaker: 'Pastor Mrs Esther', videoId: 'dQw4w9WgXcQ' },
  ]);

  return (
    <section className="sermons-section">
      <div className="container">
        <h2>Recent Sermons</h2>
        <div className="sermons-grid">
          {sermons.map(s => (
            <div key={s.id} className="sermon-card">
              <div className="sermon-video">
                <iframe
                  width="100%"
                  height="250"
                  src={`https://www.youtube.com/embed/${s.videoId}`}
                  title={s.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="sermon-info">
                <h3>{s.title}</h3>
                <p className="sermon-speaker">{s.speaker}</p>
                <p className="sermon-date">{s.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Prayer Page
function PrayerPage({ prayerRequests, setPrayerRequests }) {
  const [name, setName] = useState('');
  const [prayer, setPrayer] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() && prayer.trim()) {
      setPrayerRequests([...prayerRequests, { id: Date.now(), name, prayer, date: new Date().toLocaleDateString() }]);
      setName('');
      setPrayer('');
      alert('Prayer request submitted!');
    }
  };

  return (
    <section className="prayer-section">
      <div className="container">
        <h2>Prayer Requests</h2>
        <div className="prayer-content">
          <div className="prayer-form-container">
            <h3>Submit Prayer Request</h3>
            <form className="prayer-form" onSubmit={handleSubmit}>
              <input value={name} onChange={e => setName(e.target.value)} placeholder="Your Name" required />
              <textarea value={prayer} onChange={e => setPrayer(e.target.value)} placeholder="Your Prayer Request" rows="5" required />
              <button type="submit" className="submit-btn">Submit Prayer Request</button>
            </form>
          </div>

          <div className="prayer-list-container">
            <h3>Recent Prayer Requests</h3>
            {prayerRequests.length === 0 ? (
              <p className="no-requests">No prayer requests yet.</p>
            ) : (
              <div className="prayer-list">
                {prayerRequests.map(req => (
                  <div key={req.id} className="prayer-item">
                    <p className="prayer-name"><strong>{req.name}</strong></p>
                    <p className="prayer-text">{req.prayer}</p>
                    <p className="prayer-date">{req.date}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// Giving Page
function GivingPage() {
  return (
    <section className="giving-section">
      <div className="container">
        <h2>Support Our Ministry</h2>
        <div className="giving-grid">
          <div className="giving-card">
            <h3>💰 Online Giving</h3>
            <p>Give through our secure payment platform</p>
            <a href="https://paystack.com" target="_blank" rel="noopener noreferrer"><button className="giving-button">Give Now</button></a>
          </div>
        </div>
      </div>
    </section>
  );
}

// Contact Page
function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e) => { e.preventDefault(); alert('Thanks!'); setForm({ name: '', email: '', message: '' }); };

  return (
    <section className="contact-section">
      <div className="container">
        <h2>Contact Us</h2>
        <form className="contact-form" onSubmit={handleSubmit}>
          <input name="name" value={form.name} onChange={handleChange} placeholder="Your Name" required />
          <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Your Email" required />
          <textarea name="message" value={form.message} onChange={handleChange} placeholder="Your Message" rows="6" required />
          <button type="submit" className="submit-btn">Send Message</button>
        </form>
      </div>
    </section>
  );
}

// Footer Component
function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <p>&copy; 2026 DOMINION WORLD INTERNATIONAL. All rights reserved.</p>
        <p>Dominating The World With His Word</p>
      </div>
    </footer>
  );
}

// Render the app
ReactDOM.render(<App />, document.getElementById('root'));
