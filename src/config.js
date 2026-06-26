// src/config.js
const CONFIG = {
  // ============================================
  // ORGANIZATION INFORMATION
  // ============================================
  ORG_NAME: "Kajiado Bright Horizons",
  ORG_SHORT_NAME: "KBH",
  ORG_TAGLINE: "Making a Difference One Child at a Time",
  ORG_DESCRIPTION: "Providing hope, care, and education to vulnerable children in Kajiado, Kenya since 1997.",
  ORG_PHONE: "+254 700 123 456",
  ORG_EMAIL: "info@kajiadochildrenhome.org",
  ORG_ADDRESS: "Kajiado Town, Kajiado County, Kenya",
  ORG_WEBSITE: "https://kajiadobrighthorizons.org",
  
  // ============================================
  // ADMIN & CONTACT
  // ============================================
  ADMIN_EMAIL: "rafayellmwong4325@gmail.com",
  CONTACT_EMAIL: "info@kajiadochildrenhome.org",
  CONTACT_PHONE: "+254700123456",
  
  // ============================================
  // SOCIAL MEDIA
  // ============================================
  SOCIAL: {
    FACEBOOK: "https://facebook.com/kajiadochildrenshome",
    TWITTER: "https://twitter.com/kajiadochildren",
    INSTAGRAM: "https://instagram.com/kajiadochildrenshome",
    WHATSAPP: "https://wa.me/254720789839",
    YOUTUBE: "https://youtube.com/kajiadochildrenshome"
  },
  
  // ============================================
  // GOOGLE SHEETS
  // ============================================
  GOOGLE_SHEETS: {
    URL: process.env.REACT_APP_GOOGLE_SHEETS_URL || "",
    ENABLED: true
  },
  
  // ============================================
  // PESAPAL PAYMENT CONFIGURATION
  // ============================================
  PESAPAL: {
    ENVIRONMENT: process.env.PESAPAL_ENVIRONMENT || "production",
    IPN_ID: process.env.PESAPAL_IPN_ID || "db365927-0455-4748-ab58-da39eb449b18",
    CONSUMER_KEY: process.env.PESAPAL_CONSUMER_KEY || "uNnRrwAjP5eYrlyip4UNIA4tRZKSJI4d",
    CONSUMER_SECRET: process.env.PESAPAL_CONSUMER_SECRET || "rOJfnlHM7lI5vNUyKISG4EuIKIA=",
    PAYMENT_METHODS: {
      MPESA: true,
      AIRTEL_MONEY: true,
      CARD: true
    }
  },
  
  // ============================================
  // DONATION CONFIGURATION
  // ============================================
  DONATION: {
    PRESET_AMOUNTS: [500, 1000, 2500, 5000, 10000],
    MIN_AMOUNT: 10,
    MAX_AMOUNT: 1000000,
    CURRENCY: "KES",
    MONTHLY_GIVING: true
  },
  
  // ============================================
  // FEATURES
  // ============================================
  FEATURES: {
    DARK_MODE: true,
    NEWSLETTER: true,
    CHILD_SPONSORSHIP: true,
    EVENTS: true,
    GALLERY: true,
    DONATIONS: true,
    VISITOR_REGISTRATION: true
  }
};

export default CONFIG;