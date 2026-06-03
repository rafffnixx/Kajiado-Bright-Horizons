import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

export default function Children() {
  const [selectedChild, setSelectedChild] = useState(null);

  const children = [
    { id: 1, name: "Grace Mwikali", age: 8, dream: "To become a doctor", hobby: "Reading", emoji: "👧", story: "Grace joined us in 2020 and has shown remarkable progress in her studies. She loves helping younger children with their homework." },
    { id: 2, name: "James Omondi", age: 10, dream: "To be an engineer", hobby: "Drawing", emoji: "👦", story: "James loves building things and excels in mathematics. He dreams of designing bridges and buildings someday." },
    { id: 3, name: "Mary Wanjiku", age: 7, dream: "To become a teacher", hobby: "Singing", emoji: "👧", story: "Mary is a bright student who helps younger children with their homework. She loves singing in the children's choir." },
    { id: 4, name: "Peter Njoroge", age: 12, dream: "To be a pilot", hobby: "Sports", emoji: "👦", story: "Peter is athletic and dreams of flying planes someday. He captains the children's football team." },
    { id: 5, name: "Faith Atieno", age: 9, dream: "To be a nurse", hobby: "Drawing", emoji: "👧", story: "Faith is caring and compassionate, always looking after sick children. She wants to help people feel better." },
    { id: 6, name: "Daniel Mwangi", age: 11, dream: "To be a teacher", hobby: "Reading", emoji: "👦", story: "Daniel loves reading storybooks and dreams of becoming a teacher to educate other children." }
  ];

  const successStories = [
    { icon: "👩‍🎓", title: "Esther's Journey", subtitle: "Now in University", description: "Esther joined us at age 6. Today, she's pursuing a degree in Social Work at the University of Nairobi." },
    { icon: "👨‍🍳", title: "Samuel's Success", subtitle: "Professional Chef", description: "Samuel completed vocational training and now works at a top hotel in Nairobi." },
    { icon: "👩‍⚕️", title: "Dr. Mercy's Dream", subtitle: "Medical Doctor", description: "Mercy, one of our first children, is now a practicing doctor at Kenyatta National Hospital." }
  ];

  return (
    <>
      <SEO 
        title="Sponsor a Child - Kajiado Children's Home"
        description="Meet the children at Kajiado Children's Home. Your sponsorship provides education, food, healthcare, and love to vulnerable children in Kajiado, Kenya."
        path="/children"
      />
      
      <div className="children-page">
        <section className="page-header">
          <div className="container">
            <h1>Our <span>Children</span></h1>
            <p>Meet the beautiful children who call Kajiado Children's Home their family</p>
          </div>
        </section>

        {/* Children Grid */}
        <section className="children-grid-section">
          <div className="container">
            <div className="children-grid">
              {children.map((child) => (
                <div key={child.id} className="child-card">
                  <div className="child-card-header">
                    <div className="child-emoji">{child.emoji}</div>
                    <h3>{child.name}</h3>
                    <p className="child-age">{child.age} years old</p>
                  </div>
                  <div className="child-card-body">
                    <div className="child-detail">
                      <span className="detail-icon">💭</span>
                      <span className="detail-text">Dreams: {child.dream}</span>
                    </div>
                    <div className="child-detail">
                      <span className="detail-icon">❤️</span>
                      <span className="detail-text">Loves: {child.hobby}</span>
                    </div>
                  </div>
                  <div className="child-card-footer">
                    <button 
                      onClick={() => setSelectedChild(child)}
                      className="btn-gold"
                    >
                      Sponsor {child.name.split(' ')[0]}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Success Stories */}
        <section className="success-stories">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Success <span>Stories</span></h2>
              <p className="section-subtitle">From our home to bright futures</p>
            </div>
            <div className="stories-grid">
              {successStories.map((story, index) => (
                <div className="story-card" key={index}>
                  <div className="story-icon">{story.icon}</div>
                  <h3>{story.title}</h3>
                  <p className="story-subtitle">{story.subtitle}</p>
                  <p className="story-description">{story.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How Sponsorship Works */}
        <section className="sponsorship-info">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">How <span>Sponsorship Works</span></h2>
              <p className="section-subtitle">Your monthly support makes a lasting impact</p>
            </div>
            <div className="sponsorship-grid">
              <div className="sponsorship-card">
                <div className="sponsorship-icon">📚</div>
                <h3>Education</h3>
                <p>School fees, uniforms, books, and supplies for quality education</p>
              </div>
              <div className="sponsorship-card">
                <div className="sponsorship-icon">🍲</div>
                <h3>Nutrition</h3>
                <p>Three nutritious meals daily and clean drinking water</p>
              </div>
              <div className="sponsorship-card">
                <div className="sponsorship-icon">🏥</div>
                <h3>Healthcare</h3>
                <p>Regular medical checkups, vaccinations, and emergency care</p>
              </div>
              <div className="sponsorship-card">
                <div className="sponsorship-icon">❤️</div>
                <h3>Love & Care</h3>
                <p>A safe, loving home environment with caring staff</p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="cta-section">
          <div className="container">
            <div className="cta-content">
              <h2>Ready to Change a Child's Life?</h2>
              <p>Your sponsorship provides hope, education, and a brighter future</p>
              <div className="cta-buttons">
                <Link to="/donate" className="btn-gold">
                  <i className="fas fa-hand-holding-heart"></i> Sponsor a Child
                </Link>
                <Link to="/contact" className="btn-outline">
                  <i className="fas fa-envelope"></i> Contact Us
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Sponsor Modal */}
      {selectedChild && (
        <div className="modal-overlay" onClick={() => setSelectedChild(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedChild(null)}>×</button>
            <div className="modal-header">
              <div className="modal-emoji">{selectedChild.emoji}</div>
              <h2>Sponsor {selectedChild.name}</h2>
            </div>
            <div className="modal-body">
              <p><strong>Age:</strong> {selectedChild.age} years old</p>
              <p><strong>Dream:</strong> {selectedChild.dream}</p>
              <p><strong>Loves:</strong> {selectedChild.hobby}</p>
              <p><strong>Story:</strong> {selectedChild.story}</p>
              <div className="sponsorship-cost">
                <p>Sponsorship Cost: <strong>KES 2,500/month</strong></p>
                <p className="cost-note">Covers education, meals, and care</p>
              </div>
            </div>
            <div className="modal-footer">
              <Link to="/donate" className="btn-gold" onClick={() => setSelectedChild(null)}>
                Sponsor Now
              </Link>
              <button onClick={() => setSelectedChild(null)} className="btn-outline">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}