window.addEventListener("DOMContentLoaded", () => {
  let menu = document.querySelector(".menu-btn");
  let menuClose = document.querySelector(".close-btn");
  let main = document.querySelector("#main");
  let cursor = document.querySelector("#cursor");

  main.addEventListener("mousemove", (e) => {
    gsap.to(cursor, {
      x: e.x,
      y: e.y,
      duration: 0.8,
      ease: "back.out",
    });
  });

  // Function to extract rotation angle from computed transform matrix
  const getInitialRotation = (el) => {
    const computedStyle = window.getComputedStyle(el);
    const transform = computedStyle.transform;

    // If no transform is applied
    if (transform === "none") return 0;

    // Example: "matrix(a, b, c, d, tx, ty)"
    const matrix = new DOMMatrix(transform);

    // Convert the matrix to rotation in degrees
    const angle = Math.round(Math.atan2(matrix.b, matrix.a) * (180 / Math.PI));
    return angle;
  };

  // Animate each image
  let landingImgs = document.querySelectorAll("#page1 .img-container img");

  landingImgs.forEach((img) => {
    const originalRotation = getInitialRotation(img);

    img.addEventListener("mouseenter", () => {
      gsap.to(img, {
        scale: 1.1,
        rotate: originalRotation + 10, // rotate relative to original
        duration: 0.5,
        ease: "power2.out",
      });
    });

    img.addEventListener("mouseleave", () => {
      gsap.to(img, {
        scale: 1,
        rotate: originalRotation, // reset to original
        duration: 0.5,
        ease: "power2.out",
      });
    });
  });

  gsap.registerPlugin(SplitText, ScrollTrigger);

  let split = SplitText.create(".heading", {
    type: "words",
  });

  let tl = gsap.timeline();
  tl.from("header", {
    y: -100,
    opacity: 0,
    duration: 1,
    delay: 0.5,
    ease: "power2.out",
  });
  tl.to("#page1", {
    backgroundColor: "#f0f0f0",
    duration: 1,
    ease: "power2.inOut",
    delay: 0.5,
  });
  tl.from(".img-container img", {
    scale: 0.5,
    opacity: 0,
    duration: 1,
    ease: "back.out(1.7)",
    stagger: 0.2,
  });
  tl.from(".scroll-indicator", {
    y: 100,
    opacity: 0,
    duration: 1,
    ease: "power2.out",
  });

  gsap.from(split.words, {
    y: 100,
    opacity: 0,
    stagger: 0.05,
    duration: 1,
    ease: "power2.out",
  });

  gsap.to(".scroll-indicator i", {
    y: -10,
    repeat: -1,
    yoyo: true,
    duration: 1,
    ease: "power2.inOut",
  });

  gsap.to(".img-container img", {
    scrollTrigger: {
      trigger: "#page1",
      start: "top top",
      end: "bottom top",
      scrub: 1,
    },
    rotate: 0,
    ease: "none",
  });

  let m_menu = gsap.timeline();
  m_menu.to(".mobile-menu", {
    right: 0,
    duration: 0.5,
  });
  m_menu.to('.mobile-overlay',{
    right: 0
  })
  m_menu.from(".mobile-menu a", {
    x: 100,
    opacity: 0,
    duration: 0.5,
    ease: "power2.out",
    stagger: 0.4,
  });

  m_menu.pause();

  menu.addEventListener("click", () => {
    m_menu.play();
  });
  menuClose.addEventListener("click", () => {
    m_menu.reverse();
  });

  gsap.from(".work-1", {
    scrollTrigger: {
      trigger: ".work-1",
      start: "top center",
      end: "bottom center",
      scrub: 1,
    },
    x: -100,
    opacity: 0,
    duration: 1,
    ease: "power2.out",
  });
  gsap.from(".work-2", {
    scrollTrigger: {
      trigger: ".work-1",
      start: "top center",
      end: "bottom center",
      scrub: 1,
    },
    x: 100,
    opacity: 0,
    duration: 1,
    ease: "power2.out",
  });

  // Split the text into lines
  let split2 = new SplitText(".split", {
    type: "lines",
    linesClass: "line",
  });

  // Animate each line individually with its own ScrollTrigger
  split2.lines.forEach((line) => {
    gsap.from(line, {
      yPercent: 100,
      opacity: 0,
      duration: 1,
      ease: "expo.out",
      scrollTrigger: {
        trigger: line,
        start: "top 80%",
        end: "bottom 60%",
        toggleActions: "play none none none",
        scrub: 1,
      },
    });
  });

  document.querySelectorAll(".accordion-header").forEach((header) => {
    header.addEventListener("click", () => {
      header.classList.toggle("active");
      const content = header.nextElementSibling;
      if (header.classList.contains("active")) {
        content.style.maxHeight = content.scrollHeight + "px";
      } else {
        content.style.maxHeight = "0px";
      }
    });
  });

  // Contact Form Animation on Scroll
  gsap.from(
    ".contact-form input, .contact-form textarea, .contact-form button",
    {
      opacity: 0,
      y: 30,
      stagger: 0.4,
      duration: 0.8,
      delay: 0.4,
      scrub: true,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".contact-form",
        start: "top 80%",
        scrub: true,
        end: "bottom 60%",
        toggleActions: "play none none none",
      },
    }
  );

  // FAQ Animation on Scroll
  gsap.from(".accordion-item", {
    opacity: 0,
    y: 50,
    stagger: 0.4,
    duration: 0.8,
    delay: 0.4,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".faq-section",
      start: "top 80%",
      scrub: true,
      end: "bottom 60%",
      toggleActions: "play none none none",
    },
  });

});
