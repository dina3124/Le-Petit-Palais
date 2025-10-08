window.onload = function () {
    // --- Date ---
    let today = new Date();
    let date = String(today.getDate()).padStart(2, '0');
    let month = String(today.getMonth() + 1).padStart(2, '0');
    let year = today.getFullYear();
    document.getElementById('date').value = `${year}-${month}-${date}`;

    // --- Time ---
    let hours = today.getHours();
    let minutes = String(today.getMinutes()).padStart(2, '0');
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    document.getElementById('time').value = `${String(hours).padStart(2, '0')}:${minutes} ${ampm}`;

    // --- Slider ---
    const sliderInner = document.querySelector("#sliderInner");
    const gap = 20;
    let slides, slideCount, slideWidth;
    let index = 0;
    let intervalId;

    function setupClones() {
        slides = sliderInner.querySelectorAll(".slides");
        slideCount = slides.length;
        slides.forEach(slide => {
            sliderInner.appendChild(slide.cloneNode(true));
        });
        slides = sliderInner.querySelectorAll(".slides");
    }

    function calculateSlideWidth() {
        slideWidth = slides[0].getBoundingClientRect().width + gap;
    }

    function slideNext() {
        index++;
        sliderInner.style.transition = "transform 0.5s ease-in-out";
        sliderInner.style.transform = `translateX(-${slideWidth * index}px)`;

        if (index >= slideCount) {
            setTimeout(() => {
                sliderInner.style.transition = "none";
                sliderInner.style.transform = `translateX(0)`;
                index = 0;
            }, 500);
        }
    }

    function startAuto() {
        clearInterval(intervalId);
        intervalId = setInterval(slideNext, 3000);
    }

    // ✅ Initialize directly here
    setupClones();
    calculateSlideWidth();
    startAuto();

    window.addEventListener("resize", () => {
        if (!slides || slides.length === 0) return;
        calculateSlideWidth();
        sliderInner.style.transition = "none";
        sliderInner.style.transform = `translateX(-${slideWidth * index}px)`;
    });
};
