// A simple function to check if an element is in view
function checkElementsInView(element) {
    const rect = element.getBoundingClientRect();
    return rect.top < window.innerHeight && rect.bottom > 0;
}

// Makes the scrolling smooth and only fades in when the user sees it
const fadeItems = document.querySelectorAll(".fade-in");
function updateFadeItems() {
    fadeItems.forEach(item => {
        if (checkElementsInView(item)) {
            item.classList.add("visible");
        }
    });
}

window.addEventListener("scroll", updateFadeItems);
window.addEventListener("resize", updateFadeItems);

updateFadeItems();

// handle form submission
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  window.addEventListener("pageshow", function () {
    contactForm.reset();
  });

  // makes sure users can only submit the form once every 5 minutes
  const submitButton = contactForm.querySelector("button");
  const cooldownTime = 5 * 60 * 1000; // 5 minutes

  window.addEventListener("pageshow", function () {
    contactForm.reset();
  });

  contactForm.addEventListener("submit", function (event) {
    const lastSubmitTime = localStorage.getItem("lastContactSubmitTime");
    const currentTime = Date.now();

    if (lastSubmitTime && currentTime - lastSubmitTime < cooldownTime) {
      event.preventDefault();

      const timeLeft = Math.ceil(
        (cooldownTime - (currentTime - lastSubmitTime)) / 60000
      );

      alert(`Please wait about ${timeLeft} more minute(s) before sending another message.`);
      return;
    }

    localStorage.setItem("lastContactSubmitTime", currentTime);
  });
}

// JavaScript for the blind navigation page
const video = document.getElementById("camera");
const startButton = document.getElementById("startCamera");
const stopButton = document.getElementById("stopCamera");
const resultBox = document.getElementById("navigationResult");

let stream = null;

if (startButton) {
  startButton.addEventListener("click", async function () {
    try {
      stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment"
        },
        audio: false
      });

      video.srcObject = stream;
      resultBox.textContent = "Camera started. Live navigation demo is ready.";
    } catch (error) {
      resultBox.textContent = "Camera access was denied or unavailable.";
      console.log(error);
    }
  });
}

if (stopButton) {
  stopButton.addEventListener("click", function () {
    if (stream) {
      stream.getTracks().forEach(function (track) {
        track.stop();
      });
    }

    stream = null;
    video.srcObject = null;
    resultBox.textContent = "Camera stopped.";
  });
}