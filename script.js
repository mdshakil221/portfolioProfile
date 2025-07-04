// Home page (index.html)
const currentPage = window.location.pathname.split("/").pop();
document.querySelectorAll(".nav-links a").forEach(link => {
    if(link.getAttribute("href") === currentPage) {
        link.classList.add("active");
    }
});

// ContactPage
document.getElementById("contact-form").addEventListener("submit", function(e) {
    e.preventDefault();
    alert("Thanks for your message! I'll get back to you soon.");
    this.reset();
});
