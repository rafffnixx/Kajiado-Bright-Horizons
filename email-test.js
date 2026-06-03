/**
 * M.K GATHU - Email Test Script
 * Tests the Google Apps Script email functionality
 * 
 * Run with: node email-test.js
 */

// Your Google Apps Script Web App URL
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzXHmp7PyoUGbpPeKSxmn46e91adRkDKUPEqszf8mB642_YkticBQg2VHm9BW9JcuCu3Q/exec";

// Test email recipient (change to your email for testing)
const TEST_EMAIL = "rafayellmwong4325@gmail.com";

// Test functions
async function testContactForm() {
  console.log("\n📤 Testing Contact Form Submission...\n");
  
  const testData = {
    type: "contact",
    fullname: "Test User",
    email: TEST_EMAIL,
    phone: "+254 700 000000",
    serviceInterest: "Testing Service",
    message: "This is a test message from the email-test.js script. Please ignore.",
    timestamp: new Date().toISOString()
  };
  
  try {
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(testData)
    });
    
    console.log("✅ Contact form test sent successfully!");
    console.log("📧 Check your email at:", TEST_EMAIL);
    console.log("📊 Check your Google Sheet for new entry");
    console.log("📝 Test data:", testData);
    
  } catch (error) {
    console.error("❌ Contact form test failed:", error.message);
  }
}

async function testReviewForm() {
  console.log("\n📤 Testing Review Form Submission...\n");
  
  const testData = {
    type: "review",
    name: "Test Reviewer",
    email: TEST_EMAIL,
    company: "Test Company Ltd",
    position: "CEO",
    rating: 5,
    service: "Tax & KRA Compliance",
    review: "This is a test review from the email-test.js script. Excellent service!",
    timestamp: new Date().toISOString()
  };
  
  try {
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(testData)
    });
    
    console.log("✅ Review form test sent successfully!");
    console.log("📧 Check your email at:", TEST_EMAIL);
    console.log("📊 Check your Google Sheet for new entry");
    console.log("📝 Test data:", testData);
    
  } catch (error) {
    console.error("❌ Review form test failed:", error.message);
  }
}

async function testBoth() {
  console.log("\n" + "=".repeat(50));
  console.log("🧪 M.K GATHU EMAIL TEST SUITE");
  console.log("=".repeat(50));
  console.log("\n📧 Testing emails to:", TEST_EMAIL);
  console.log("🔗 Google Script URL:", GOOGLE_SCRIPT_URL);
  console.log("\n⏳ Sending test submissions...\n");
  
  await testContactForm();
  await new Promise(r => setTimeout(r, 2000)); // Wait 2 seconds between tests
  await testReviewForm();
  
  console.log("\n" + "=".repeat(50));
  console.log("✅ TEST SUITE COMPLETE");
  console.log("=".repeat(50));
  console.log("\n📋 Next steps:");
  console.log("1. Check your email inbox at:", TEST_EMAIL);
  console.log("2. Check your Google Sheet for new entries");
  console.log("3. Check Spam folder if email not in Inbox");
  console.log("\n🔧 If no email received:");
  console.log("   - Verify Google Script is deployed as Web App");
  console.log("   - Check Gmail service is enabled in Apps Script");
  console.log("   - Run testEmail() function in Apps Script directly");
  console.log("");
}

// Run the tests
console.log("\n🚀 Starting M.K GATHU Email Tests...\n");

// Check if running in Node.js with fetch support
if (typeof fetch === "undefined") {
  console.log("⚠️  Note: This script uses fetch API.");
  console.log("   If running in Node.js < 18, install node-fetch:");
  console.log("   npm install node-fetch");
  console.log("");
  
  // Try to load node-fetch if available
  try {
    const fetchModule = await import('node-fetch');
    global.fetch = fetchModule.default;
    console.log("✅ node-fetch loaded successfully\n");
  } catch (e) {
    console.log("❌ node-fetch not available. Please install it:");
    console.log("   npm install node-fetch");
    console.log("   Or run this script in a browser console.\n");
    process.exit(1);
  }
}

// Run tests
testBoth().catch(console.error);
