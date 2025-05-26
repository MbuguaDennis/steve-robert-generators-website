document.addEventListener("DOMContentLoaded", () => {
  // Mobile Menu Toggle
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn")
  const navMenu = document.querySelector(".nav-menu")

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", () => {
      navMenu.classList.toggle("active")
      mobileMenuBtn.classList.toggle("active")
    })
  }

  // Testimonial Slider
  const testimonials = document.querySelectorAll(".testimonial")
  const dots = document.querySelectorAll(".dot")
  const prevBtn = document.querySelector(".testimonial-controls .prev")
  const nextBtn = document.querySelector(".testimonial-controls .next")

  if (testimonials.length > 0) {
    let currentSlide = 0

    // Function to show a specific slide
    function showSlide(index) {
      // Hide all testimonials
      testimonials.forEach((testimonial) => {
        testimonial.classList.remove("active")
      })

      // Remove active class from all dots
      dots.forEach((dot) => {
        dot.classList.remove("active")
      })

      // Show the selected testimonial and activate corresponding dot
      testimonials[index].classList.add("active")
      dots[index].classList.add("active")
      currentSlide = index
    }

    // Event listeners for dots
    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        showSlide(index)
      })
    })

    // Event listeners for prev/next buttons
    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        let newIndex = currentSlide - 1
        if (newIndex < 0) newIndex = testimonials.length - 1
        showSlide(newIndex)
      })
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        let newIndex = currentSlide + 1
        if (newIndex >= testimonials.length) newIndex = 0
        showSlide(newIndex)
      })
    }

    // Auto-advance slides every 5 seconds
    setInterval(() => {
      let newIndex = currentSlide + 1
      if (newIndex >= testimonials.length) newIndex = 0
      showSlide(newIndex)
    }, 5000)
  }

  // Service Tabs Navigation
  const serviceTabs = document.querySelectorAll(".service-tabs a")

  if (serviceTabs.length > 0) {
    serviceTabs.forEach((tab) => {
      tab.addEventListener("click", function (e) {
        e.preventDefault()

        // Remove active class from all tabs
        serviceTabs.forEach((t) => {
          t.classList.remove("active")
        })

        // Add active class to clicked tab
        this.classList.add("active")

        // Scroll to the target section
        const targetId = this.getAttribute("href")
        const targetSection = document.querySelector(targetId)

        if (targetSection) {
          window.scrollTo({
            top: targetSection.offsetTop - 100,
            behavior: "smooth",
          })
        }
      })
    })
  }

  // Product Category Tabs
  const categoryTabs = document.querySelectorAll(".category-tabs a")

  if (categoryTabs.length > 0) {
    categoryTabs.forEach((tab) => {
      tab.addEventListener("click", function (e) {
        e.preventDefault()

        // Remove active class from all tabs
        categoryTabs.forEach((t) => {
          t.classList.remove("active")
        })

        // Add active class to clicked tab
        this.classList.add("active")

        // Scroll to the target section
        const targetId = this.getAttribute("href")
        const targetSection = document.querySelector(targetId)

        if (targetSection) {
          window.scrollTo({
            top: targetSection.offsetTop - 100,
            behavior: "smooth",
          })
        }
      })
    })
  }

  // Product Search and Filter
  const productSearch = document.getElementById("product-search")
  const searchBtn = document.getElementById("search-btn")
  const categoryFilter = document.getElementById("category-filter")
  const brandFilter = document.getElementById("brand-filter")
  const productItems = document.querySelectorAll(".product-item")

  if (productSearch && productItems.length > 0) {
    // Search functionality
    function performSearch() {
      const searchTerm = productSearch.value.toLowerCase()
      const selectedCategory = categoryFilter.value
      const selectedBrand = brandFilter.value

      productItems.forEach((item) => {
        const productName = item.querySelector("h3").textContent.toLowerCase()
        const productBrand = item.querySelector(".brand").textContent.toLowerCase()
        const productCategory = item.closest(".product-section").id

        // Check if product matches search and filter criteria
        const matchesSearch = searchTerm === "" || productName.includes(searchTerm)
        const matchesCategory = selectedCategory === "all" || productCategory === selectedCategory
        const matchesBrand = selectedBrand === "all" || productBrand.includes(selectedBrand.toLowerCase())

        // Show or hide product based on criteria
        if (matchesSearch && matchesCategory && matchesBrand) {
          item.style.display = "block"
        } else {
          item.style.display = "none"
        }
      })
    }

    // Event listeners for search and filters
    if (searchBtn) {
      searchBtn.addEventListener("click", performSearch)
    }

    productSearch.addEventListener("keyup", (e) => {
      if (e.key === "Enter") {
        performSearch()
      }
    })

    if (categoryFilter) {
      categoryFilter.addEventListener("change", performSearch)
    }

    if (brandFilter) {
      brandFilter.addEventListener("change", performSearch)
    }
  }

  // Contact Form Validation
  const contactForm = document.getElementById("contact-form")

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Get form fields
      const nameInput = document.getElementById("name")
      const phoneInput = document.getElementById("phone")
      const emailInput = document.getElementById("email")
      const messageInput = document.getElementById("message")

      // Simple validation
      let isValid = true

      if (nameInput.value.trim() === "") {
        showError(nameInput, "Name is required")
        isValid = false
      } else {
        removeError(nameInput)
      }

      if (phoneInput.value.trim() === "") {
        showError(phoneInput, "Phone number is required")
        isValid = false
      } else {
        removeError(phoneInput)
      }

      if (emailInput.value.trim() !== "" && !isValidEmail(emailInput.value)) {
        showError(emailInput, "Please enter a valid email address")
        isValid = false
      } else {
        removeError(emailInput)
      }

      if (messageInput.value.trim() === "") {
        showError(messageInput, "Message is required")
        isValid = false
      } else {
        removeError(messageInput)
      }

      // If form is valid, show success message
      if (isValid) {
        // In a real implementation, you would submit the form data to a server here

        // Show success message
        const formContainer = document.querySelector(".contact-form")
        formContainer.innerHTML = `
                    <div class="success-message">
                        <i class="fas fa-check-circle"></i>
                        <h3>Thank You!</h3>
                        <p>Your message has been sent successfully. We'll get back to you shortly.</p>
                    </div>
                `
      }
    })

    // Helper functions for form validation
    function showError(input, message) {
      const formGroup = input.parentElement
      const errorElement = formGroup.querySelector(".error-message") || document.createElement("div")

      errorElement.className = "error-message"
      errorElement.textContent = message

      if (!formGroup.querySelector(".error-message")) {
        formGroup.appendChild(errorElement)
      }

      input.classList.add("error")
    }

    function removeError(input) {
      const formGroup = input.parentElement
      const errorElement = formGroup.querySelector(".error-message")

      if (errorElement) {
        formGroup.removeChild(errorElement)
      }

      input.classList.remove("error")
    }

    function isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return emailRegex.test(email)
    }
  }
})

// back to top button functionality
 const backToTopBtn = document.getElementById('back-to-top');

  // Show/hide button on scroll
  window.addEventListener('scroll', () => {
    backToTopBtn.style.display = window.scrollY > 300 ? 'flex' : 'none';
  });

  // Smooth scroll to top on click
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });


