window.addEventListener("DOMContentLoaded", () => {
  let menuBtn = document.querySelector(".menu-btn");
  menuBtn.addEventListener("click", () => {
    let menu = document.querySelector(".menu");
    menu.classList.toggle("active");
    menuBtn.classList.toggle("active");
  });

  gsap.registerPlugin(SplitText);

  let split = SplitText.create(".heading", {
    type: "words",
  });

  let tl = gsap.timeline();
  tl.from('header',{
    y: -100,
    opacity: 0,
    duration: 1,
    delay: 0.5,
    ease: "power2.out"
  })
  tl.to('#page1',{
    backgroundColor: "#f0f0f0",
    duration: 1,
    ease: "power2.inOut",
    delay: 0.5
  })
  tl.from('.img-container img', {
    scale: 0.5,
    opacity: 0,
    duration: 1,
    ease: "back.out(1.7)",
    stagger: 0.2
  });
  tl.from('.scroll-indicator',{
    y: 100,
    opacity: 0,
    duration: 1,
    ease: "power2.out",
  })

  gsap.from(split.words, {
    y: 100,
    opacity: 0,
    stagger: 0.05,
    duration: 1,
    ease: "power2.out"
  });
});
