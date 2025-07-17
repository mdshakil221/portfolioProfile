// Home page (index.html)
const currentPage = window.location.pathname.split("/").pop();
document.querySelectorAll(".nav-links a").forEach(link => {
  if(link.getAttribute("href") === currentPage) {
    link.classList.add("active");
  }
});

// ContactPage
const contactForm = document.getElementById("contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", async function(e) {
    e.preventDefault();
    
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    const response = await fetch('http://localhost:5000/api/contact', {
      method: 'POST',
      headers: {'contact-type': 'application/json'},
      body: JSON.stringify({name, email, message})
    });

    if(response.ok){
      alert("Message sent and saved successfully");
    }
    else{
      alert("Something went wrong. Try again.");
    }
  });
}







// Typewriter effect
document.addEventListener("DOMContentLoaded", () => {
  const typewriter = document.getElementById("typewriter");
  if (!typewriter) return;

  const words = ["Frontend Developer", "Web Designer", "Freelancer"];
  let wordIndex = 0;
  let charIndex = 0;
  const typingSpeed = 150;
  const erasingSpeed = 100;
  const delayBetweenWords = 1500;

  function type() {
    if (charIndex < words[wordIndex].length) {
      typewriter.textContent += words[wordIndex].charAt(charIndex);
      charIndex++;
      setTimeout(type, typingSpeed);
    } else {
      setTimeout(erase, delayBetweenWords);
    }
  }

  function erase() {
    if (charIndex > 0) {
      typewriter.textContent = words[wordIndex].substring(0, charIndex - 1);
      charIndex--;
      setTimeout(erase, erasingSpeed);
    } else {
      wordIndex = (wordIndex + 1) % words.length;
      setTimeout(type, typingSpeed);
    }
  }

  setTimeout(type, 1000);
});
