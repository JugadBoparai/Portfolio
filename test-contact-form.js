// Quick test script to verify Web3Forms contact form integration
// Run this in your browser console on http://localhost:5174/

async function testContactForm() {
  const formData = new FormData();
  formData.append("access_key", "8f51ccbf-de45-4666-a273-c9c3617a0baf");
  formData.append("name", "Test User");
  formData.append("email", "test@example.com");
  formData.append("message", "This is a test message from the portfolio contact form.");

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();
    
    if (data.success) {
      console.log("✅ SUCCESS! Contact form is working!");
      console.log("Check Jugadboparai@gmail.com for the test email");
      return data;
    } else {
      console.log("❌ ERROR:", data);
      return data;
    }
  } catch (error) {
    console.error("❌ Network Error:", error);
    return error;
  }
}

// Run the test
testContactForm();
