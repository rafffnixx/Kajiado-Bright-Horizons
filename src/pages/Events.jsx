import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

export default function Events() {
  const [registeredEvent, setRegisteredEvent] = useState(null);
  const [showForm, setShowForm] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });

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
      location: "Kajiado Children's Home Grounds",
      description: "A fun-filled day of sports, games, and activities for the children.",
      image: "/images/events/sports-day.jpg",
      attendees: 120,
      raised: null
    },
    {
      id: 3,
      title: "Charity Walk & Run 2024",
      date: "February 10, 2024",
      location: "Kajiado Town Center",
      description: "5km walk/run to raise awareness and funds for children's healthcare.",
      image: "/images/events/charity-walk.jpg",
      attendees: 300,
      raised: "KES 250,000"
    },
    {
      id: 4,
      title: "Graduation Ceremony 2024",
      date: "March 25, 2024",
      location: "Kajiado Children's Home Hall",
      description: "Celebrating our students moving to secondary school and vocational training.",
      image: "/images/events/graduation.jpg",
      attendees: 200,
      raised: null
    },
    {
      id: 5,
      title: "Family Fun Day 2024",
      date: "June 15, 2024",
      location: "Kajiado Children's Home",
      description: "A day of games, food, and entertainment for children and families.",
      image: "/images/events/family-day.jpg",
      attendees: 350,
      raised: "KES 100,000"
    },
    {
      id: 6,
      title: "Christmas Party 2024",
      date: "December 20, 2024",
      location: "Kajiado Children's Home Hall",
      description: "Annual Christmas celebration with gifts, food, and entertainment for all children.",
      image: "/images/events/christmas.jpg",
      attendees: 250,
      raised: "KES 75,000"
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

  return (
    <>
      <SEO 
        title="Events - Kajiado Children's Home"
        description="Join our upcoming events and celebrate past successes. Support vulnerable children in Kajiado through our fundraising galas, sports days, charity walks, and more."
        path="/events"
      />
      
      <div className="events-page">
        {/* Hero Section with Background Image */}
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
              <h1>Our <span>Events</span></h1>
              <p>Join our upcoming events and celebrate our past successes</p>
            </div>
          </div>
        </section>

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
              {pastEvents.map((event, index) => (
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

        {/* CTA Section */}
        <section className="cta-section">
          <div className="container">
            <div className="cta-content">
              <h2>Want to Partner With Us?</h2>
              <p>Sponsor an event or collaborate with us to make a bigger impact</p>
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
    </>
  );
}