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
      
      {currentPage === 'home' && <HomePage />}
      {currentPage === 'about' && <AboutPage />}
      {currentPage === 'sermons' && <SermonsPage />}
      {currentPage === 'giving' && <GivingPage />}
      {currentPage === 'prayer' && <PrayerPage prayerRequests={prayerRequests} setPrayerRequests={setPrayerRequests} />}
      {currentPage === 'contact' && <ContactPage />}
      
      <Footer />
    </div>
  );
}

// Header Component with Dark Mode Toggle
function Header({ darkMode, toggleDarkMode, onNavClick }) {
  return (
    <header className="site-header">
      <div className="header-inner">
        <div className="header-left">
          <a className="brand" href="#" onClick={(e) => { e.preventDefault(); onNavClick('home'); }}>
            <span className="brand-name">🙏 DOMINION WORLD</span>
          </a>
        </div>
        
        <nav className="main-nav">
          <ul>
            <li><a href="#home" onClick={(e) => { e.preventDefault(); onNavClick('home'); }}>Home</a></li>
            <li><a href="#about" onClick={(e) => { e.preventDefault(); onNavClick('about'); }}>About</a></li>
            <li><a href="#sermons" onClick={(e) => { e.preventDefault(); onNavClick('sermons'); }}>Sermons</a></li>
            <li><a href="#prayer" onClick={(e) => { e.preventDefault(); onNavClick('prayer'); }}>Prayer</a></li>
            <li><a href="#giving" onClick={(e) => { e.preventDefault(); onNavClick('giving'); }}>Give</a></li>
            <li><a href="#contact" onClick={(e) => { e.preventDefault(); onNavClick('contact'); }}>Contact</a></li>
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
function HomePage() {
  return (
    <div className="page-content">
      <section className="hero">
        <div className="hero-content">
          <h1>GENESIS 1:28</h1>
          <p className="hero-text">"Be fruitful, and multiply and dominate the world"</p>
          <button className="cta-button" onClick={() => alert('Welcome to DOMINION WORLD!')}>
            Join Our Community
          </button>
        </div>
      </section>

      <section className="info-section">
        <div className="container">
          <h2>Welcome to DOMINION WORLD INTERNATIONAL</h2>
          <p className="tagline"><strong>Our Motto:</strong> Dominating The World With His Word</p>
          
          <div className="info-grid">
            <div className="info-card">
              <h3>📍 Location</h3>
              <p>5 Adebayo Street<br/>Igando Hostel Bus Stop</p>
            </div>
            <div className="info-card">
              <h3>⏰ Service Times</h3>
              <p>Sunday: 9:00 AM<br/>Wednesday: 6:30 PM</p>
            </div>
            <div className="info-card">
              <h3>📞 Contact</h3>
              <p>Phone: +234 XXX XXXX XXX<br/>Email: info@dominionworld.com</p>
            </div>
          </div>

          <h3 className="section-title">Our Pastoral Team</h3>
          <div className="pastors-grid">
            <PastorCard name="Pastor Young Chris Oyakhilome" title="Senior Pastor" />
            <PastorCard name="Pastor Mrs Esther Oyakhilome" title="Co-Pastor" />
            <PastorCard name="Pastor Bola" title="Assistant Pastor" />
          </div>
        </div>
      </section>

      <section className="mission-section">
        <div className="container">
          <h2>🎯 Our Mission</h2>
          <p>Raising kingdom ambassadors through worship, faith, and transformation. We are dedicated to spreading God's word and building a community of believers committed to dominion in Christ.</p>
        </div>
      </section>
    </div>
  );
}

// Pastor Card Component
function PastorCard({ name, title }) {
  return (
    <div className="pastor-card">
      <h4>{name}</h4>
      <p className="pastor-title">{title}</p>
    </div>
  );
}

// About Page
function AboutPage() {
  return (
    <div className="page-content">
      <section className="about-section">
        <div className="container">
          <h2>About Us</h2>
          <p>DOMINION WORLD INTERNATIONAL is a vibrant church community dedicated to spreading the gospel of Jesus Christ and empowering believers to take dominion in every area of their lives.</p>
          
          <h3>Our Core Values</h3>
          <ul className="values-list">
            <li><strong>Faith:</strong> Unwavering belief in God's promises</li>
            <li><strong>Worship:</strong> Authentic praise and adoration</li>
            <li><strong>Community:</strong> Strong fellowship and support</li>
            <li><strong>Excellence:</strong> Doing all things to the glory of God</li>
            <li><strong>Transformation:</strong> Living out the Gospel in daily life</li>
          </ul>
        </div>
      </section>
    </div>
  );
}

// Sermons Page
function SermonsPage() {
  const [sermons] = useState([
    { id: 1, title: "Taking Dominion", date: "Feb 15, 2026", speaker: "Pastor Young Chris", videoId: "dQw4w9WgXcQ" },
    { id: 2, title: "Faith in Action", date: "Feb 8, 2026", speaker: "Pastor Mrs Esther", videoId: "dQw4w9WgXcQ" },
    { id: 3, title: "Kingdom Living", date: "Feb 1, 2026", speaker: "Pastor Bola", videoId: "dQw4w9WgXcQ" },
  ]);

  return (
    <div className="page-content">
      <section className="sermons-section">
        <div className="container">
          <h2>Recent Sermons</h2>
          <div className="sermons-grid">
            {sermons.map(sermon => (
              <div key={sermon.id} className="sermon-card">
                <div className="sermon-video">
                  <iframe
                    width="100%"
                    height="250"
                    src={`https://www.youtube.com/embed/${sermon.videoId}`}
                    title={sermon.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen>
                  </iframe>
                </div>
                <div className="sermon-info">
                  <h3>{sermon.title}</h3>
                  <p className="sermon-speaker">{sermon.speaker}</p>
                  <p className="sermon-date">{sermon.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
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
      alert('Prayer request submitted! Our prayer team will intercede for you.');
    }
  };

  return (
    <div className="page-content">
      <section className="prayer-section">
        <div className="container">
          <h2>Prayer Requests</h2>
          
          <div className="prayer-content">
            <div className="prayer-form-container">
              <h3>Submit Prayer Request</h3>
              <form className="prayer-form" onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <textarea
                  placeholder="Your Prayer Request"
                  rows="5"
                  value={prayer}
                  onChange={(e) => setPrayer(e.target.value)}
                  required
                ></textarea>
                <button type="submit" className="submit-btn">Submit Prayer Request</button>
              </form>
            </div>

            <div className="prayer-list-container">
              <h3>Recent Prayer Requests</h3>
              {prayerRequests.length === 0 ? (
                <p className="no-requests">No prayer requests yet. Be the first to submit one!</p>
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
    </div>
  );
}

// Giving Page
function GivingPage() {
  return (
    <div className="page-content">
      <section className="giving-section">
        <div className="container">
          <h2>Support Our Ministry</h2>
          <p className="giving-intro">Your generosity helps us continue our mission of spreading God's word and serving our community.</p>
          
          <div className="giving-grid">
            <div className="giving-card">
              <h3>💰 Online Giving</h3>
              <p>Give through our secure payment platform</p>
              <a href="https://paystack.com" target="_blank" rel="noopener noreferrer">
                <button className="giving-button">Give Now</button>
              </a>
            </div>
            
            <div className="giving-card">
              <h3>🏦 Bank Transfer</h3>
              <p>Direct deposit to our church account</p>
              <div className="bank-details">
                <p><strong>Bank:</strong> First Bank</p>
                <p><strong>Account:</strong> XXXX XXXX XXX</p>
                <button className="giving-button" onClick={() => alert('Please contact church office for complete details')}>Get Details</button>
              </div>
            </div>
            
            <div className="giving-card">
              <h3>🙏 In-Person</h3>
              <p>Give during service or visit our office</p>
              <p>Sundays 9:00 AM at our location</p>
              <button className="giving-button" onClick={() => alert('Visit us during service times!')}>Learn More</button>
            </div>
          </div>

          <div className="giving-info">
            <h3>How Your Giving Helps</h3>
            <ul>
              <li>✝️ Spreading the Gospel</li>
              <li>🎓 Educational Programs</li>
              <li>❤️ Community Outreach</li>
              <li>🏢 Building Maintenance</li>
              <li>🎵 Worship & Ministry</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

// Contact Page
function ContactPage() {
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContactForm({ ...contactForm, [name]: value });
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (contactForm.name && contactForm.email && contactForm.message) {
      alert('Thank you for your message! We will get back to you soon.');
      setContactForm({ name: '', email: '', message: '' });
    }
  };

  return (
    <div className="page-content">
      <section className="contact-section">
        <div className="container">
          <h2>Contact Us</h2>
          
          <div className="contact-content">
            <div className="contact-info">
              <h3>Get In Touch</h3>
              <div className="contact-item">
                <h4>📍 Address</h4>
                <p>5 Adebayo Street<br/>Igando Hostel Bus Stop<br/>Lagos, Nigeria</p>
              </div>
              <div className="contact-item">
                <h4>📞 Phone</h4>
                <p>+234 XXX XXXX XXX</p>
              </div>
              <div className="contact-item">
                <h4>📧 Email</h4>
                <p>info@dominionworld.com</p>
              </div>
              <div className="contact-item">
                <h4>⏰ Service Hours</h4>
                <p>Sunday: 9:00 AM - 12:30 PM<br/>Wednesday: 6:30 PM - 8:30 PM</p>
              </div>
            </div>

            <form className="contact-form" onSubmit={handleContactSubmit}>
              <h3>Send Us a Message</h3>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={contactForm.name}
                onChange={handleContactChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={contactForm.email}
                onChange={handleContactChange}
                required
              />
              <textarea
                name="message"
                placeholder="Your Message"
                rows="6"
                value={contactForm.message}
                onChange={handleContactChange}
                required
              ></textarea>
              <button type="submit" className="submit-btn">Send Message</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

// Footer Component
function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <p>&copy; 2026 DOMINION WORLD INTERNATIONAL. All rights reserved.</p>
        <p>Dominating The World With His Word</p>
        <div className="social-links">
          <a href="#" title="Facebook">f</a>
          <a href="#" title="Twitter">𝕏</a>
          <a href="#" title="Instagram">📷</a>
          <a href="#" title="YouTube">▶️</a>
        </div>
      </div>
    </footer>
  );
}

// Render the app
ReactDOM.render(<App />, document.getElementById('root'));

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
      
      {currentPage === 'home' && <HomePage />}
      {currentPage === 'about' && <AboutPage />}
      {currentPage === 'sermons' && <SermonsPage />}
      {currentPage === 'giving' && <GivingPage />}
      {currentPage === 'prayer' && <PrayerPage prayerRequests={prayerRequests} setPrayerRequests={setPrayerRequests} />}
      {currentPage === 'contact' && <ContactPage />}
      
      <Footer />
    </div>
  );
}

// Header Component with Dark Mode Toggle
function Header({ darkMode, toggleDarkMode, onNavClick }) {
  return (
    <header className="site-header">
      <div className="header-inner">
        <div className="header-left">
          <a className="brand" href="#" onClick={(e) => { e.preventDefault(); onNavClick('home'); }}>
            <span className="brand-name">🙏 DOMINION WORLD</span>
          </a>
        </div>
        
        <nav className="main-nav">
          <ul>
            <li><a href="#home" onClick={(e) => { e.preventDefault(); onNavClick('home'); }}>Home</a></li>
            <li><a href="#about" onClick={(e) => { e.preventDefault(); onNavClick('about'); }}>About</a></li>
            <li><a href="#sermons" onClick={(e) => { e.preventDefault(); onNavClick('sermons'); }}>Sermons</a></li>
            <li><a href="#prayer" onClick={(e) => { e.preventDefault(); onNavClick('prayer'); }}>Prayer</a></li>
            <li><a href="#giving" onClick={(e) => { e.preventDefault(); onNavClick('giving'); }}>Give</a></li>
            <li><a href="#contact" onClick={(e) => { e.preventDefault(); onNavClick('contact'); }}>Contact</a></li>
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
function HomePage() {
  return (
    <div className="page-content">
      <section className="hero">
        <div className="hero-content">
          <h1>GENESIS 1:28</h1>
          <p className="hero-text">"Be fruitful, and multiply and dominate the world"</p>
          <button className="cta-button" onClick={() => alert('Welcome to DOMINION WORLD!')}>
            Join Our Community
          </button>
        </div>
      </section>

      <section className="info-section">
        <div className="container">
          <h2>Welcome to DOMINION WORLD INTERNATIONAL</h2>
          <p className="tagline"><strong>Our Motto:</strong> Dominating The World With His Word</p>
          
          <div className="info-grid">
            <div className="info-card">
              <h3>📍 Location</h3>
              <p>5 Adebayo Street<br/>Igando Hostel Bus Stop</p>
            </div>
            <div className="info-card">
              <h3>⏰ Service Times</h3>
              <p>Sunday: 9:00 AM<br/>Wednesday: 6:30 PM</p>
            </div>
            <div className="info-card">
              <h3>📞 Contact</h3>
              <p>Phone: +234 XXX XXXX XXX<br/>Email: info@dominionworld.com</p>
            </div>
          </div>

          <h3 className="section-title">Our Pastoral Team</h3>
          <div className="pastors-grid">
            <PastorCard name="Pastor Young Chris Oyakhilome" title="Senior Pastor" />
            <PastorCard name="Pastor Mrs Esther Oyakhilome" title="Co-Pastor" />
            <PastorCard name="Pastor Bola" title="Assistant Pastor" />
          </div>
        </div>
      </section>

      <section className="mission-section">
        <div className="container">
          <h2>🎯 Our Mission</h2>
          <p>Raising kingdom ambassadors through worship, faith, and transformation. We are dedicated to spreading God's word and building a community of believers committed to dominion in Christ.</p>
        </div>
      </section>
    </div>
  );
}

// Pastor Card Component
function PastorCard({ name, title }) {
  return (
    <div className="pastor-card">
      <h4>{name}</h4>
      <p className="pastor-title">{title}</p>
    </div>
  );
}

// About Page
function AboutPage() {
  return (
    <div className="page-content">
      <section className="about-section">
        <div className="container">
          <h2>About Us</h2>
          <p>DOMINION WORLD INTERNATIONAL is a vibrant church community dedicated to spreading the gospel of Jesus Christ and empowering believers to take dominion in every area of their lives.</p>
          
          <h3>Our Core Values</h3>
          <ul className="values-list">
            <li><strong>Faith:</strong> Unwavering belief in God's promises</li>
            <li><strong>Worship:</strong> Authentic praise and adoration</li>
            <li><strong>Community:</strong> Strong fellowship and support</li>
            <li><strong>Excellence:</strong> Doing all things to the glory of God</li>
            <li><strong>Transformation:</strong> Living out the Gospel in daily life</li>
          </ul>
        </div>
      </section>
    </div>
  );
}

// Sermons Page
function SermonsPage() {
  const [sermons] = useState([
    { id: 1, title: "Taking Dominion", date: "Feb 15, 2026", speaker: "Pastor Young Chris", videoId: "dQw4w9WgXcQ" },
    { id: 2, title: "Faith in Action", date: "Feb 8, 2026", speaker: "Pastor Mrs Esther", videoId: "dQw4w9WgXcQ" },
    { id: 3, title: "Kingdom Living", date: "Feb 1, 2026", speaker: "Pastor Bola", videoId: "dQw4w9WgXcQ" },
  ]);

  return (
    <div className="page-content">
      <section className="sermons-section">
        <div className="container">
          <h2>Recent Sermons</h2>
          <div className="sermons-grid">
            {sermons.map(sermon => (
              <div key={sermon.id} className="sermon-card">
                <div className="sermon-video">
                  <iframe
                    width="100%"
                    height="250"
                    src={`https://www.youtube.com/embed/${sermon.videoId}`}
                    title={sermon.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen>
                  </iframe>
                </div>
                <div className="sermon-info">
                  <h3>{sermon.title}</h3>
                  <p className="sermon-speaker">{sermon.speaker}</p>
                  <p className="sermon-date">{sermon.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
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
      alert('Prayer request submitted! Our prayer team will intercede for you.');
    }
  };

  return (
    <div className="page-content">
      <section className="prayer-section">
        <div className="container">
          <h2>Prayer Requests</h2>
          
          <div className="prayer-content">
            <div className="prayer-form-container">
              <h3>Submit Prayer Request</h3>
              <form className="prayer-form" onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <textarea
                  placeholder="Your Prayer Request"
                  rows="5"
                  value={prayer}
                  onChange={(e) => setPrayer(e.target.value)}
                  required
                ></textarea>
                <button type="submit" className="submit-btn">Submit Prayer Request</button>
              </form>
            </div>

            <div className="prayer-list-container">
              <h3>Recent Prayer Requests</h3>
              {prayerRequests.length === 0 ? (
                <p className="no-requests">No prayer requests yet. Be the first to submit one!</p>
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
    </div>
  );
}

// Giving Page
function GivingPage() {
  return (
    <div className="page-content">
      <section className="giving-section">
        <div className="container">
          <h2>Support Our Ministry</h2>
          <p className="giving-intro">Your generosity helps us continue our mission of spreading God's word and serving our community.</p>
          
          <div className="giving-grid">
            <div className="giving-card">
              <h3>💰 Online Giving</h3>
              <p>Give through our secure payment platform</p>
              <a href="https://paystack.com" target="_blank" rel="noopener noreferrer">
                <button className="giving-button">Give Now</button>
              </a>
            </div>
            
            <div className="giving-card">
              <h3>🏦 Bank Transfer</h3>
              <p>Direct deposit to our church account</p>
              <div className="bank-details">
                <p><strong>Bank:</strong> First Bank</p>
                <p><strong>Account:</strong> XXXX XXXX XXX</p>
                <button className="giving-button" onClick={() => alert('Please contact church office for complete details')}>Get Details</button>
              </div>
            </div>
            
            <div className="giving-card">
              <h3>🙏 In-Person</h3>
              <p>Give during service or visit our office</p>
              <p>Sundays 9:00 AM at our location</p>
              <button className="giving-button" onClick={() => alert('Visit us during service times!')}>Learn More</button>
            </div>
          </div>

          <div className="giving-info">
            <h3>How Your Giving Helps</h3>
            <ul>
              <li>✝️ Spreading the Gospel</li>
              <li>🎓 Educational Programs</li>
              <li>❤️ Community Outreach</li>
              <li>🏢 Building Maintenance</li>
              <li>🎵 Worship & Ministry</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

// Contact Page
function ContactPage() {
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContactForm({ ...contactForm, [name]: value });
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (contactForm.name && contactForm.email && contactForm.message) {
      alert('Thank you for your message! We will get back to you soon.');
      setContactForm({ name: '', email: '', message: '' });
    }
  };

  return (
    <div className="page-content">
      <section className="contact-section">
        <div className="container">
          <h2>Contact Us</h2>
          
          <div className="contact-content">
            <div className="contact-info">
              <h3>Get In Touch</h3>
              <div className="contact-item">
                <h4>📍 Address</h4>
                <p>5 Adebayo Street<br/>Igando Hostel Bus Stop<br/>Lagos, Nigeria</p>
              </div>
              <div className="contact-item">
                <h4>📞 Phone</h4>
                <p>+234 XXX XXXX XXX</p>
              </div>
              <div className="contact-item">
                <h4>📧 Email</h4>
                <p>info@dominionworld.com</p>
              </div>
              <div className="contact-item">
                <h4>⏰ Service Hours</h4>
                <p>Sunday: 9:00 AM - 12:30 PM<br/>Wednesday: 6:30 PM - 8:30 PM</p>
              </div>
            </div>

            <form className="contact-form" onSubmit={handleContactSubmit}>
              <h3>Send Us a Message</h3>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={contactForm.name}
                onChange={handleContactChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={contactForm.email}
                onChange={handleContactChange}
                required
              />
              <textarea
                name="message"
                placeholder="Your Message"
                rows="6"
                value={contactForm.message}
                onChange={handleContactChange}
                required
              ></textarea>
              <button type="submit" className="submit-btn">Send Message</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

// Footer Component
function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <p>&copy; 2026 DOMINION WORLD INTERNATIONAL. All rights reserved.</p>
        <p>Dominating The World With His Word</p>
        <div className="social-links">
          <a href="#" title="Facebook">f</a>
          <a href="#" title="Twitter">𝕏</a>
          <a href="#" title="Instagram">📷</a>
          <a href="#" title="YouTube">▶️</a>
        </div>
      </div>
    </footer>
  );
}

// Render the app
ReactDOM.render(<App />, document.getElementById('root'));