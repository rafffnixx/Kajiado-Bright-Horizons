import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

export default function Events() {
  const [registeredEvent, setRegisteredEvent] = useState(null);
  const [showForm, setShowForm] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [activeTab, setActiveTab] = useState('events'); // 'events' or 'stories'

  const upcomingEvent = {
    id: 1,
    title: "Annual Fundraising Gala 2025",
    date: "December 15, 2025",
    time: "6:00 PM - 10:00 PM",
    location: "Kajiado Sports Club",
    description: "Join us for an evening of dinner, music, and auctions to support our children's education fund.",
    spots: 150,
    image: "/images/events/gala.jpg"
  };

  const pastEvents = [
    {
      id: 2,
      title: "Children's Sports Day 2024",
      date: "January 20, 2024",
      location: "Kajiado Bright Horizons Grounds",
      description: "A fun-filled day of sports, games, and activities for the children.",
      image: "/images/events/sports-day.jpg",
      attendees: 120,
      raised: null
    },
      {
      id: 3,
      title: "Launching Kajiado Valley School of Excellence",
      date: "February 10, 2024",
      location: "Kajiado Bright Horizon",
      description: "A historic milestone for Kajiado Bright Horizons as we officially launched the Kajiado Valley School of Excellence. This state-of-the-art primary school provides quality education to both KCH children and the surrounding community. The launch ceremony was graced by community leaders, education officials, and well-wishers who share our vision of empowering children through education. The school now serves over 50 students with modern facilities, dedicated teachers, and a curriculum that nurtures academic excellence and character development.",
      image: "/images/events/valley-school-launch.jpg",
      attendees: 300,
    },
    {
    id: 4,
    title: "Bright Horizon Workshop 2024",
    date: "March 25, 2024",
    location: "Kajiado Bright Horizon",
    description: "An empowering workshop designed to equip post-secondary students with essential life skills, career guidance, and mentorship for their journey to self-sufficiency. The Bright Horizon Workshop brought together KCH alumni, industry professionals, and aspiring young adults for a day of learning, networking, and inspiration. Topics covered included CV writing, interview skills, entrepreneurship, financial literacy, and personal development. Participants left with renewed confidence, practical skills, and a clear roadmap for their future careers.",
    image: "/images/events/bright-horizon-workshop.jpg",
    attendees: 200,
    raised: null
  },
    {
      "id": 5,
      "title": "20th Anniversary 2022",
      "date": "August 15, 2022",
      "location": "Kajiado Bright Horizons",
      "description": "A joyful celebration marking 20 years of Kajiado Bright Horizons, bringing together alumni, partners, and community members. The day was filled with music, dance, and heartfelt stories of transformation. With over 350 attendees, the event highlighted the impact of two decades of care and support.     ",
      "image": "/images/events/family-day.jpg",
      "attendees": 350,
      
    },

    {
      "id": 6,
      "title": "Birthday Party 2024",
      "date": "December 20, 2024",
      "location": "Kajiado Bright Horizons",
      "description": "A festive end‑of‑year celebration honoring all children born in December, as part of our tradition of monthly birthday parties. The event brought together 250 children, staff, and supporters for cake, music, and games, creating joyful memories and a sense of family.",
      "image": "/images/events/christmas.jpg",
      "attendees": 250,
    }

  ];

  // Alumni Stories Data
  const alumniStories = [
    {
      id: 1,
      name: "Raphael Mwongela",
      yearBorn: 2001,
      yearJoined: 2010,
      gradeJoined: "Grade 2",
      yearGraduated: 2026,
      achievement: "Bachelor's Degree in Information Technology",
      currentRole: "IT Solutions Developer & Founder of RaffCodes",
      story: "Raphael came to KBH as a total orphan at age 9, joining in Grade 2. Despite the challenges, he persevered through primary and secondary school. With the support of KBH sponsors, he pursued a degree in Information Technology and graduated in August 2026. Today, he owns RaffCodes (raffcodes.vercel.app), an IT solutions company, and is giving back by developing this website for KBH. His journey from a vulnerable child to a successful entrepreneur is a testament to the power of love, support, and education.",
      image: "/images/alumni/raphael.jpg",
      icon: "💻",
      tags: ["IT Expert", "Entrepreneur", "Web Developer"]
    },
    {
      id: 2,
      name: "Janet Ngotiek",
      yearBorn: 2000,
      yearJoined: 2010,
      gradeJoined: "Grade 3",
      yearGraduated: 2026,
      achievement: "Diploma in Journalisma and Mass-Communication ",
      currentRole: "to be pprovided",
      story: "Mary joined KBH at age 7 after losing both parents. She grew up at the home, excelling in her studies. With sponsorship support, she completed her education degree and is now a dedicated primary school teacher. She returns to KBH every holiday to mentor younger children and help with homework.",
      image: "/images/alumni/mary.jpg",
      icon: "👩‍🏫",
      tags: ["Teacher", "Mentor", "Role Model"]
    },
{
  "id": 3,
  "name": "Richard Nyinge",
  "yearBorn": 1989,
  "yearJoined": 1997,
  "gradeJoined": "Grade 4",
  "yearGraduated": 2005,
  "achievement": "Masters in Theology",
  "currentRole": "Founder Namanga Hope Center",
  "story": "Richard joined KBH in 1997 at age 8, entering Grade 4. The care and support he received shaped his path toward faith and service. After graduating in 2005, he pursued higher education and earned a Masters in Theology. Inspired to give back, Richard founded Namanga Hope Center, which provides love and hope to orphans, vulnerable children, the needy, and the elderly. Today, the center supports over 85 children with school fees, food, and clothing, assists 20+ families in poverty with food staples, and runs mentorship and Bible study programs. Richard also mentors current KBH students, continuing the cycle of care and guidance he once received.",
  "image": "/images/alumni/richard-nyinge.jpg",
  "icon": "🌟",
  "tags": ["Founder", "Mentor", "Community Leader"]
},

    {
      id: 4,
      name: "Sarah Kimani",
      yearBorn: 1999,
      yearJoined: 2008,
      gradeJoined: "Grade 4",
      yearGraduated: 2020,
      achievement: "Certificate in Culinary Arts",
      currentRole: "Head Cook at KBH",
      story: "Sarah's passion for cooking was discovered at KBH. After completing her culinary training, she returned to the home as the head cook, preparing nutritious meals for over 100 children. 'I learned to cook here, and now I cook for my younger brothers and sisters,' she shares.",
      image: "/images/alumni/sarah.jpg",
      icon: "🍳",
      tags: ["Chef", "Nutrition Expert", "Caregiver"]
    },
    {
      id: 5,
      name: "David Mwangi",
      yearBorn: 1996,
      yearJoined: 2004,
      gradeJoined: "Grade 2",
      yearGraduated: 2017,
      achievement: "Bachelor's Degree in Nursing",
      currentRole: "Registered Nurse at Kajiado Hospital",
      story: "David was among the first children to join KBH in 2004. His dream of becoming a nurse came true with the support of the home. Now a registered nurse, he volunteers at KBH's medical clinic every weekend, providing free health checkups for the children.",
      image: "/images/alumni/david.jpg",
      icon: "🏥",
      tags: ["Nurse", "Volunteer", "Healthcare Hero"]
    },
    {
      id: 6,
      name: "Esther Njeri",
      yearBorn: 2000,
      yearJoined: 2009,
      gradeJoined: "Grade 3",
      yearGraduated: 2022,
      achievement: "Diploma in Business Administration",
      currentRole: "Administrative Assistant at KBH",
      story: "Esther's organizational skills were noticed early at KBH. After completing her business diploma, she joined the KBH administrative team, helping manage records, sponsorships, and daily operations. 'This home raised me, now I help raise it,' she says proudly.",
      image: "/images/alumni/esther.jpg",
      icon: "📊",
      tags: ["Administrator", "Organizer", "Team Player"]
    }
  ];

  const handleRegister = () => setShowForm(true);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setRegisteredEvent(true);
    setShowForm(false);
    setFormData({ name: '', email: '', phone: '' });
    setTimeout(() => setRegisteredEvent(null), 3000);
  };

  const stats = [
    { number: "6+", label: "Events Completed", icon: "fas fa-calendar-check" },
    { number: "1,500+", label: "Total Attendees", icon: "fas fa-users" },
    { number: "KES 425K+", label: "Funds Raised", icon: "fas fa-hand-holding-heart" }
  ];

  const alumniStats = [
    { number: "50+", label: "Alumni Members", icon: "fas fa-users" },
    { number: "15+", label: "University Graduates", icon: "fas fa-graduation-cap" },
    { number: "10+", label: "Working at KBH", icon: "fas fa-heart" },
    { number: "100%", label: "Giving Back", icon: "fas fa-hands-helping" }
  ];

  return (
    <>
      <SEO 
        title="Events & Alumni Stories - Kajiado Bright Horizons"
        description="Join our upcoming events, celebrate past successes, and read inspiring alumni success stories from Kajiado Bright Horizons"
        path="/events"
      />
      
      <div className="events-page">
        {/* Hero Section */}
        <section className="about-hero">
          <div className="hero-bg-container">
            <div 
              className="hero-bg-image-about"
              style={{ backgroundImage: 'url("/images/hero/get-involved-hero.jpg")' }}
            ></div>
            <div className="hero-overlay-dark"></div>
          </div>
          <div className="container">
            <div className="hero-content-about">
              <h1>Events & <span>Alumni Stories</span></h1>
              <p>Celebrating our community and the success of our children</p>
            </div>
          </div>
        </section>

        {/* Tab Navigation */}
        <section className="tab-navigation">
          <div className="container">
            <div className="tab-buttons">
              <button 
                className={`tab-btn ${activeTab === 'events' ? 'active' : ''}`}
                onClick={() => setActiveTab('events')}
              >
                <i className="fas fa-calendar-alt"></i> Upcoming & Past Events
              </button>
              <button 
                className={`tab-btn ${activeTab === 'stories' ? 'active' : ''}`}
                onClick={() => setActiveTab('stories')}
              >
                <i className="fas fa-star-of-life"></i> Alumni Success Stories
              </button>
            </div>
          </div>
        </section>

        {/* Events Content */}
        {activeTab === 'events' && (
          <>
            <div className="container">
              {/* Upcoming Event */}
              <section className="upcoming-event">
                <div className="section-header">
                  <h2 className="section-title">Upcoming <span>Event</span></h2>
                </div>
                <div className="upcoming-card">
                  <div className="upcoming-image">
                    <img src={upcomingEvent.image} alt={upcomingEvent.title} loading="eager" />
                  </div>
                  <div className="upcoming-content">
                    <div className="event-badge">Register Now</div>
                    <h3>{upcomingEvent.title}</h3>
                    <div className="event-details">
                      <p><i className="fas fa-calendar-alt"></i> {upcomingEvent.date}</p>
                      <p><i className="fas fa-clock"></i> {upcomingEvent.time}</p>
                      <p><i className="fas fa-map-marker-alt"></i> {upcomingEvent.location}</p>
                      <p><i className="fas fa-ticket-alt"></i> {upcomingEvent.spots} spots available</p>
                    </div>
                    <p className="event-description">{upcomingEvent.description}</p>
                    <button onClick={handleRegister} className="btn-gold">
                      <i className="fas fa-calendar-check"></i> Register Now
                    </button>
                  </div>
                </div>
              </section>

              {/* Past Events */}
              <section className="past-events">
                <div className="section-header">
                  <h2 className="section-title">Past <span>Events</span></h2>
                  <p className="section-subtitle">Celebrating our successful events and generous supporters</p>
                </div>
                <div className="events-grid">
                  {pastEvents.map((event) => (
                    <div key={event.id} className="event-card">
                      <div className="event-image">
                        <img src={event.image} alt={event.title} loading="lazy" />
                      </div>
                      <div className="event-content">
                        <div className="event-date">{event.date}</div>
                        <h3>{event.title}</h3>
                        <p className="event-location"><i className="fas fa-map-marker-alt"></i> {event.location}</p>
                        <p className="event-description-short">{event.description}</p>
                        <div className="event-footer">
                          <span className="event-attendees"><i className="fas fa-users"></i> {event.attendees}+ attendees</span>
                          {event.raised && (
                            <span className="event-raised"><i className="fas fa-hand-holding-heart"></i> {event.raised}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Stats Summary */}
              <section className="stats-summary">
                <div className="stats-grid">
                  {stats.map((stat, index) => (
                    <div key={index} className="stat-card">
                      <i className={stat.icon}></i>
                      <h3>{stat.number}</h3>
                      <p>{stat.label}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </>
        )}

        {/* Alumni Stories Content */}
        {activeTab === 'stories' && (
          <>
            <div className="container">
              {/* Alumni Hero Message */}
              <section className="alumni-hero">
                <div className="alumni-hero-content">
                  <h2>From <span>KBH</span> to Success</h2>
                  <p>Our alumni are the living proof of what love, care, and education can achieve. Read their inspiring journeys from Kajiado Bright Horizons to becoming professionals, entrepreneurs, and community leaders.</p>
                </div>
              </section>

              {/* Alumni Stats */}
              <section className="alumni-stats">
                <div className="stats-grid">
                  {alumniStats.map((stat, index) => (
                    <div key={index} className="stat-card">
                      <i className={stat.icon}></i>
                      <h3>{stat.number}</h3>
                      <p>{stat.label}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Featured Story - Raphael Mwongela */}
              <section className="featured-story">
                <div className="featured-badge">
                  <i className="fas fa-crown"></i> Featured Alumni
                </div>
                <div className="featured-story-card">
                  <div className="featured-story-content">
                    <h3>Raphael Mwongela</h3>
                    <p className="story-tagline">From Total Orphan to IT Entrepreneur</p>
                    <div className="story-details">
                      <div className="detail-item">
                        <i className="fas fa-calendar-alt"></i>
                        <span>Born: 2001 | Joined KBH: 2010 (Grade 2)</span>
                      </div>
                      <div className="detail-item">
                        <i className="fas fa-graduation-cap"></i>
                        <span>Graduated: August 2026 - Bachelor's in IT</span>
                      </div>
                      <div className="detail-item">
                        <i className="fas fa-briefcase"></i>
                        <span>Founder: RaffCodes IT Solutions</span>
                      </div>
                    </div>
                    <p className="story-description">
                      Raphael came to KBH as a total orphan at age 9, joining in Grade 2. Despite the challenges, 
                      he persevered through primary and secondary school. With the support of KBH sponsors, 
                      he pursued a degree in Information Technology and graduated in August 2026. Today, he owns 
                      RaffCodes (raffcodes.vercel.app), an IT solutions company, and is giving back by developing 
                      this website for KBH. His journey from a vulnerable child to a successful entrepreneur is a 
                      testament to the power of love, support, and education.
                    </p>
                    <div className="story-tags">
                      {alumniStories[0].tags.map((tag, idx) => (
                        <span key={idx} className="story-tag">{tag}</span>
                      ))}
                    </div>
                    <a 
                      href="https://raffcodes.vercel.app" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="btn-outline"
                    >
                      <i className="fas fa-external-link-alt"></i> Visit RaffCodes
                    </a>
                  </div>
                  <div className="featured-story-image">
                    <img src="/images/alumni/raphael-featured.jpg" alt="Raphael Mwongela" />
                  </div>
                </div>
              </section>

              {/* All Alumni Stories Grid */}
              <section className="all-stories">
                <div className="section-header">
                  <h2 className="section-title">More <span>Success Stories</span></h2>
                  <p className="section-subtitle">Meet other amazing alumni who are making a difference</p>
                </div>
                <div className="stories-grid">
                  {alumniStories.slice(1).map((story) => (
                    <div key={story.id} className="story-card">
                      <div className="story-card-image">
                        <img src={story.image} alt={story.name} loading="lazy" />
                        <div className="story-icon">{story.icon}</div>
                      </div>
                      <div className="story-card-content">
                        <h3>{story.name}</h3>
                        <div className="story-meta">
                          <span><i className="fas fa-calendar"></i> Joined: {story.yearJoined}</span>
                          <span><i className="fas fa-graduation-cap"></i> Class of {story.yearGraduated}</span>
                        </div>
                        <p className="story-achievement">
                          <strong>Achievement:</strong> {story.achievement}
                        </p>
                        <p className="story-role">
                          <i className="fas fa-briefcase"></i> {story.currentRole}
                        </p>
                        <p className="story-excerpt">{story.story.substring(0, 120)}...</p>
                        <div className="story-tags">
                          {story.tags.slice(0, 2).map((tag, idx) => (
                            <span key={idx} className="story-tag-small">{tag}</span>
                          ))}
                        </div>
                        <button 
                          className="read-more-btn"
                          onClick={() => {
                            const modal = document.createElement('div');
                            modal.className = 'story-modal-overlay';
                            modal.innerHTML = `
                              <div class="story-modal">
                                <button class="story-modal-close">&times;</button>
                                <div class="story-modal-header">
                                  <div class="story-modal-icon">${story.icon}</div>
                                  <h2>${story.name}</h2>
                                  <p>${story.currentRole}</p>
                                </div>
                                <div class="story-modal-body">
                                  <p><strong>Born:</strong> ${story.yearBorn} | <strong>Joined KBH:</strong> ${story.yearJoined} (Grade ${story.gradeJoined})</p>
                                  <p><strong>Graduated:</strong> ${story.yearGraduated} - ${story.achievement}</p>
                                  <p>${story.story}</p>
                                  <div class="story-modal-tags">
                                    ${story.tags.map(tag => `<span class="story-tag">${tag}</span>`).join('')}
                                  </div>
                                </div>
                              </div>
                            `;
                            document.body.appendChild(modal);
                            modal.style.display = 'flex';
                            modal.querySelector('.story-modal-close').onclick = () => modal.remove();
                            modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
                          }}
                        >
                          Read Full Story <i className="fas fa-arrow-right"></i>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Call to Action for Alumni */}
              <section className="alumni-cta">
                <div className="alumni-cta-content">
                  <h3>Are You a KBH Alumni?</h3>
                  <p>We want to hear your story! Share your journey and inspire current children at KBH.</p>
                  <Link to="/contact" className="btn-gold">
                    <i className="fas fa-share-alt"></i> Share Your Story
                  </Link>
                </div>
              </section>
            </div>
          </>
        )}

        {/* CTA Section */}
        <section className="cta-section">
          <div className="container">
            <div className="cta-content">
              <h2>Want to Partner With Us?</h2>
              <p>Sponsor an event, support our alumni, or collaborate with us to make a bigger impact</p>
              <div className="cta-buttons">
                <Link to="/contact" className="btn-gold">
                  <i className="fas fa-envelope"></i> Contact Us
                </Link>
                <Link to="/donate" className="btn-outline">
                  <i className="fas fa-heart"></i> Make a Donation
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Registration Modal */}
      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowForm(null)}>×</button>
            <h3>Register for Event</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Full Name *"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  placeholder="Email *"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <div className="form-group">
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
              <div className="modal-buttons">
                <button type="submit" className="btn-gold">Submit</button>
                <button type="button" onClick={() => setShowForm(null)} className="btn-outline">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Success Notification */}
      {registeredEvent && (
        <div className="notification-success">
          <i className="fas fa-check-circle"></i> Registration successful! We'll contact you soon.
        </div>
      )}

      <style>{`
        /* Tab Navigation Styles */
        .tab-navigation {
          padding: 40px 0 20px;
          background: var(--bg-deep);
        }
        
        .tab-buttons {
          display: flex;
          gap: 20px;
          justify-content: center;
          flex-wrap: wrap;
        }
        
        .tab-btn {
          padding: 14px 32px;
          background: var(--card-bg);
          border: 2px solid var(--border-color);
          border-radius: 48px;
          color: var(--text-color);
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .tab-btn i {
          color: var(--primary-color);
        }
        
        .tab-btn:hover {
          border-color: var(--primary-color);
          transform: translateY(-2px);
        }
        
        .tab-btn.active {
          background: var(--primary-color);
          border-color: var(--primary-color);
          color: #fff;
        }
        
        .tab-btn.active i {
          color: #fff;
        }
        
        /* Alumni Hero */
        .alumni-hero {
          padding: 60px 0 40px;
          text-align: center;
        }
        
        .alumni-hero-content h2 {
          font-size: 2.5rem;
          margin-bottom: 20px;
          color: var(--text-color);
        }
        
        .alumni-hero-content h2 span {
          color: var(--primary-color);
        }
        
        .alumni-hero-content p {
          color: var(--text-muted);
          max-width: 700px;
          margin: 0 auto;
          font-size: 1.1rem;
          line-height: 1.8;
        }
        
        /* Alumni Stats */
        .alumni-stats {
          padding: 40px 0;
        }
        
        /* Featured Story */
        .featured-story {
          padding: 40px 0;
          position: relative;
        }
        
        .featured-badge {
          display: inline-block;
          background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
          color: white;
          padding: 8px 20px;
          border-radius: 30px;
          font-size: 0.85rem;
          font-weight: 600;
          margin-bottom: 20px;
        }
        
        .featured-story-card {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          background: var(--card-bg);
          border-radius: 24px;
          overflow: hidden;
          border: 1px solid var(--border-color);
          transition: transform 0.3s ease;
        }
        
        .featured-story-card:hover {
          transform: translateY(-5px);
          border-color: var(--primary-color);
        }
        
        .featured-story-content {
          padding: 40px;
        }
        
        .story-icon-large {
          font-size: 3rem;
          margin-bottom: 16px;
        }
        
        .featured-story-content h3 {
          font-size: 1.8rem;
          margin-bottom: 8px;
          color: var(--text-color);
        }
        
        .story-tagline {
          color: var(--primary-color);
          font-weight: 600;
          margin-bottom: 20px;
        }
        
        .story-details {
          margin-bottom: 20px;
          padding: 16px;
          background: rgba(59, 130, 246, 0.05);
          border-radius: 12px;
        }
        
        .detail-item {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 8px;
          color: var(--text-muted);
          font-size: 0.9rem;
        }
        
        .detail-item i {
          color: var(--primary-color);
          width: 20px;
        }
        
        .story-description {
          color: var(--text-muted);
          line-height: 1.8;
          margin-bottom: 20px;
        }
        
        .featured-story-image {
          background: linear-gradient(135deg, var(--primary-dark), var(--primary-color));
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 400px;
        }
        
        .featured-story-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        /* Stories Grid */
        .all-stories {
          padding: 60px 0;
        }
        
        .stories-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 32px;
          margin-top: 40px;
        }
        
        .story-card {
          background: var(--card-bg);
          border-radius: 20px;
          overflow: hidden;
          border: 1px solid var(--border-color);
          transition: all 0.3s ease;
        }
        
        .story-card:hover {
          transform: translateY(-5px);
          border-color: var(--primary-color);
          box-shadow: 0 10px 30px rgba(59, 130, 246, 0.15);
        }
        
        .story-card-image {
          position: relative;
          height: 220px;
          overflow: hidden;
        }
        
        .story-card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }
        
        .story-card:hover .story-card-image img {
          transform: scale(1.05);
        }
        
        .story-icon {
          position: absolute;
          bottom: 10px;
          right: 10px;
          background: var(--card-bg);
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        }
        
        .story-card-content {
          padding: 20px;
        }
        
        .story-card-content h3 {
          font-size: 1.2rem;
          margin-bottom: 8px;
          color: var(--text-color);
        }
        
        .story-meta {
          display: flex;
          gap: 16px;
          margin-bottom: 12px;
          font-size: 0.8rem;
          color: var(--text-muted);
        }
        
        .story-meta i {
          color: var(--primary-color);
          margin-right: 4px;
        }
        
        .story-achievement {
          font-size: 0.85rem;
          margin-bottom: 8px;
          color: var(--text-muted);
        }
        
        .story-role {
          font-size: 0.85rem;
          margin-bottom: 12px;
          color: var(--primary-color);
        }
        
        .story-excerpt {
          color: var(--text-muted);
          font-size: 0.85rem;
          line-height: 1.6;
          margin-bottom: 12px;
        }
        
        .story-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 16px;
        }
        
        .story-tag {
          background: rgba(59, 130, 246, 0.1);
          color: var(--primary-color);
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.7rem;
          font-weight: 500;
        }
        
        .story-tag-small {
          background: rgba(59, 130, 246, 0.1);
          color: var(--primary-color);
          padding: 3px 10px;
          border-radius: 16px;
          font-size: 0.7rem;
        }
        
        .read-more-btn {
          background: transparent;
          border: none;
          color: var(--primary-color);
          font-weight: 600;
          font-size: 0.85rem;
          cursor: pointer;
          transition: gap 0.3s ease;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }
        
        .read-more-btn:hover {
          gap: 12px;
        }
        
        /* Alumni CTA */
        .alumni-cta {
          padding: 60px 0;
          text-align: center;
        }
        
        .alumni-cta-content {
          background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
          padding: 60px;
          border-radius: 24px;
          color: white;
        }
        
        .alumni-cta-content h3 {
          font-size: 2rem;
          margin-bottom: 16px;
          color: white;
        }
        
        .alumni-cta-content p {
          margin-bottom: 24px;
          font-size: 1.1rem;
          opacity: 0.95;
        }
        
        /* Story Modal */
        .story-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.9);
          backdrop-filter: blur(8px);
          display: none;
          align-items: center;
          justify-content: center;
          z-index: 2000;
          padding: 20px;
        }
        
        .story-modal {
          background: var(--card-bg);
          max-width: 600px;
          width: 100%;
          max-height: 80vh;
          overflow-y: auto;
          border-radius: 24px;
          position: relative;
          border: 1px solid var(--border-color);
        }
        
        .story-modal-close {
          position: sticky;
          top: 10px;
          right: 10px;
          float: right;
          background: rgba(0,0,0,0.5);
          border: none;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          color: white;
          font-size: 1.5rem;
          cursor: pointer;
          margin: 10px;
          z-index: 1;
        }
        
        .story-modal-header {
          padding: 30px;
          text-align: center;
          background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
          color: white;
        }
        
        .story-modal-icon {
          font-size: 3rem;
          margin-bottom: 16px;
        }
        
        .story-modal-header h2 {
          color: white;
          margin-bottom: 8px;
        }
        
        .story-modal-body {
          padding: 30px;
        }
        
        .story-modal-body p {
          color: var(--text-muted);
          line-height: 1.8;
          margin-bottom: 16px;
        }
        
        .story-modal-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 20px;
        }
        
        @media (max-width: 968px) {
          .featured-story-card {
            grid-template-columns: 1fr;
          }
          
          .featured-story-image {
            order: -1;
            min-height: 250px;
          }
          
          .stories-grid {
            grid-template-columns: 1fr;
          }
          
          .alumni-cta-content {
            padding: 40px 20px;
          }
          
          .alumni-cta-content h3 {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </>
  );
}