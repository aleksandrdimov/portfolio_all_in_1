function init() {
  const dots = document.querySelectorAll(".dot__slide");
  const pages = document.querySelectorAll(".page");
  const backgrounds = [
    `radial-gradient(#E1B168,#292E36)`,
    `radial-gradient(#8DFD1B,#000000)`,
    `radial-gradient(#e2e0e0,#258031)`,
  ];

  let current = 0;
  let scrollSlide = 0;

  dots.forEach((dot, index) => {
    dot.addEventListener("click", function () {
      if (this.classList.contains("js-active")) {
      } else {
        changeDots(this);
        nextSlide(index);
        scrollSlide = index;
      }
    });
  });

  function changeDots(round) {
    dots.forEach((dot) => {
      dot.classList.remove("js-active");
    });
    round.classList.add("js-active");
  }

  function nextSlide(pageNumber) {
    const nextPage = pages[pageNumber];
    const currentPage = pages[current];
    const nextLeft = nextPage.querySelector(".screenshot .screenshot__left");
    const nextRight = nextPage.querySelector(".screenshot .screenshot__right");
    const currentLeft = currentPage.querySelector(
      ".screenshot .screenshot__left"
    );
    const currentRight = currentPage.querySelector(
      ".screenshot .screenshot__right"
    );
    const nextText = nextPage.querySelector(".details");
    const portfolio = document.querySelector(".portfolio");

    const tl = new TimelineMax({
      onStart: function () {
        dots.forEach((dot) => {
          dot.style.pointerEvents = "none";
        });
      },
      onComplete: function () {
        dots.forEach((dot) => {
          dot.style.pointerEvents = "all";
        });
      },
    });

    tl.fromTo(currentLeft, 0.3, { y: "-10%" }, { y: "-100%" })
      .fromTo(currentRight, 0.3, { y: "10%" }, { y: "-100%" }, "-=0.2")
      .to(portfolio, 0.3, { background: backgrounds[pageNumber] })
      .fromTo(
        currentPage,
        0.3,
        { opacity: 1, pointerEvents: "all" },
        { opacity: 0, pointerEvents: "none" }
      )
      .fromTo(
        nextPage,
        0.3,
        { opacity: 0, pointerEvents: "none" },
        { opacity: 1, pointerEvents: "all" },
        "-=0.6"
      )
      .fromTo(nextLeft, 0.3, { y: "-100%" }, { y: "-10%" }, "-=0.6")
      .fromTo(nextRight, 0.3, { y: "-100%" }, { y: "10%" }, "-=0.8")
      .fromTo(nextText, 0.3, { opacity: 0, y: 0 }, { opacity: 1, y: 0 })
      .set(nextLeft, { clearProps: "all" })
      .set(nextRight, { clearProps: "all" });

    current = pageNumber;
  }

  document.addEventListener("wheel", throttle(scrollChange, 1000));
  document.addEventListener("touchmove", throttle(scrollChange, 1000));

  function switchDots(dotNumber) {
    const activeDot = document.querySelectorAll(".dot__slide")[dotNumber];
    dots.forEach((dot) => {
      dot.classList.remove("js-active");
    });
    activeDot.classList.add("js-active");
  }

  function scrollChange(e) {
    if (e.deltaY > 0) {
      scrollSlide += 1;
    } else {
      scrollSlide -= 1;
    }
    if (scrollSlide > 2) {
      scrollSlide = 0;
    }
    if (scrollSlide < 0) {
      scrollSlide = 2;
    }
    switchDots(scrollSlide);
    nextSlide(scrollSlide);
  }

  function throttle(func, limit) {
    let inThrottle;
    return function () {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  }

  const iconMenu = document.querySelector(".burger");
  if (iconMenu) {
    const menuBurger = document.querySelector(".header__menu");
    iconMenu.addEventListener("click", function (e) {
      iconMenu.classList.toggle("js-active");
      menuBurger.classList.toggle("js-active");
    });
  }
}

init();
