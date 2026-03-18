// Navigation functionality
document.addEventListener("DOMContentLoaded", () => {
  // Mobile menu toggle
  const hamburger = document.querySelector(".hamburger")
  const navMenu = document.querySelector(".nav-menu")

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      navMenu.classList.toggle("active")
    })
  }

  // User dropdown toggle
  const userInfo = document.querySelector(".user-info")
  const userDropdown = document.querySelector(".user-dropdown")

  if (userInfo && userDropdown) {
    userInfo.addEventListener("click", () => {
      userDropdown.style.display = userDropdown.style.display === "block" ? "none" : "block"
    })

    // Close dropdown when clicking outside
    document.addEventListener("click", (event) => {
      if (!userInfo.contains(event.target)) {
        userDropdown.style.display = "none"
      }
    })
  }

  // Dashboard sidebar navigation
  const sidebarLinks = document.querySelectorAll(".sidebar-menu a")
  const dashboardSections = document.querySelectorAll(".dashboard-section")

  sidebarLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()

      // Remove active class from all links and sections
      sidebarLinks.forEach((l) => l.parentElement.classList.remove("active"))
      dashboardSections.forEach((section) => section.classList.remove("active"))

      // Add active class to clicked link
      this.parentElement.classList.add("active")

      // Show corresponding section
      const targetId = this.getAttribute("href").substring(1)
      const targetSection = document.getElementById(targetId)
      if (targetSection) {
        targetSection.classList.add("active")
      }
    })
  })

  // API Documentation navigation
  const docsLinks = document.querySelectorAll(".docs-menu a")
  const docsSections = document.querySelectorAll(".docs-section")

  docsLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()

      // Remove active class from all links and sections
      docsLinks.forEach((l) => l.classList.remove("active"))
      docsSections.forEach((section) => section.classList.remove("active"))

      // Add active class to clicked link
      this.classList.add("active")

      // Show corresponding section
      const targetId = this.getAttribute("href").substring(1)
      const targetSection = document.getElementById(targetId)
      if (targetSection) {
        targetSection.classList.add("active")
      }
    })
  })

  // Copy code functionality
  const copyButtons = document.querySelectorAll(".copy-btn")
  copyButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const codeBlock = this.closest(".code-block").querySelector("code")
      const text = codeBlock.textContent

      navigator.clipboard.writeText(text).then(() => {
        const originalIcon = this.innerHTML
        this.innerHTML = '<i class="fas fa-check"></i>'
        setTimeout(() => {
          this.innerHTML = originalIcon
        }, 2000)
      })
    })
  })
})

// Verification flow functionality
let currentStep = 1
const totalSteps = 4

function nextStep() {
  if (currentStep < totalSteps) {
    // Hide current step
    document.getElementById(`step-${currentStep}`).classList.remove("active")
    document.querySelector(`.progress-step:nth-child(${currentStep})`).classList.remove("active")

    // Show next step
    currentStep++
    document.getElementById(`step-${currentStep}`).classList.add("active")
    document.querySelector(`.progress-step:nth-child(${currentStep})`).classList.add("active")
  }
}

function prevStep() {
  if (currentStep > 1) {
    // Hide current step
    document.getElementById(`step-${currentStep}`).classList.remove("active")
    document.querySelector(`.progress-step:nth-child(${currentStep})`).classList.remove("active")

    // Show previous step
    currentStep--
    document.getElementById(`step-${currentStep}`).classList.add("active")
    document.querySelector(`.progress-step:nth-child(${currentStep})`).classList.add("active")
  }
}

// File upload handling
function handleFileUpload(input) {
  const file = input.files[0]
  if (file) {
    const uploadArea = input.closest(".upload-area")
    uploadArea.innerHTML = `
            <i class="fas fa-check-circle" style="color: #059669;"></i>
            <span style="color: #059669;">${file.name} uploaded</span>
        `
  }
}

// Add event listeners for file inputs
document.addEventListener("DOMContentLoaded", () => {
  const fileInputs = document.querySelectorAll('input[type="file"]')
  fileInputs.forEach((input) => {
    input.addEventListener("change", function () {
      handleFileUpload(this)
    })
  })
})

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Form validation
function validateForm(formElement) {
  const inputs = formElement.querySelectorAll("input[required], select[required], textarea[required]")
  let isValid = true

  inputs.forEach((input) => {
    if (!input.value.trim()) {
      input.style.borderColor = "#dc2626"
      isValid = false
    } else {
      input.style.borderColor = "#d1d5db"
    }
  })

  return isValid
}

// Add form validation to verification forms
document.addEventListener("DOMContentLoaded", () => {
  const forms = document.querySelectorAll(".verification-form")
  forms.forEach((form) => {
    form.addEventListener("submit", function (e) {
      e.preventDefault()
      if (validateForm(this)) {
        nextStep()
      }
    })
  })
})

// Animate elements on scroll
function animateOnScroll() {
  const elements = document.querySelectorAll(".feature-card, .benefit-item, .stat-card")

  elements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top
    const elementVisible = 150

    if (elementTop < window.innerHeight - elementVisible) {
      element.style.opacity = "1"
      element.style.transform = "translateY(0)"
    }
  })
}

// Initialize animation styles
document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(".feature-card, .benefit-item, .stat-card")
  elements.forEach((element) => {
    element.style.opacity = "0"
    element.style.transform = "translateY(20px)"
    element.style.transition = "opacity 0.6s ease, transform 0.6s ease"
  })

  window.addEventListener("scroll", animateOnScroll)
  animateOnScroll() // Run once on load
})
