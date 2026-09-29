const slides = document.querySelector(".slides");
const slideItems = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");

let currentSlide = 0;
const totalSlides = slideItems.length;

/* 첫 번째 슬라이드를 복제해서 맨 뒤에 추가 */
const firstClone = slideItems[0].cloneNode(true);
slides.appendChild(firstClone);


/* 점 표시 */
function updateDots(index) {
    dots.forEach(dot => {
        dot.classList.remove("active");
    });

    if (index >= totalSlides) {
        dots[0].classList.add("active");
    } else {
        dots[index].classList.add("active");
    }
}


/* 슬라이드 이동 */
function showSlide(index, animate = true) {

    slides.style.transition = animate
        ? "transform 0.6s ease"
        : "none";

    slides.style.transform =
        `translateX(-${index * 100}%)`;

    updateDots(index);
}


/* 다음 슬라이드 */
function nextSlide() {

    currentSlide++;

    showSlide(currentSlide);

    if (currentSlide === totalSlides) {

        setTimeout(() => {

            currentSlide = 0;
            showSlide(currentSlide, false);

        }, 600);
    }
}


/* 이전 슬라이드 */
function prevSlide() {

    if (currentSlide === 0) {

        currentSlide = totalSlides;
        showSlide(currentSlide, false);

        setTimeout(() => {

            currentSlide = totalSlides - 1;
            showSlide(currentSlide);

        }, 20);

    } else {

        currentSlide--;
        showSlide(currentSlide);
    }
}


/* 자동 슬라이드 */
let autoSlide = setInterval(nextSlide, 5000);


/* 자동 슬라이드 다시 시작 */
function resetAutoSlide() {

    clearInterval(autoSlide);

    autoSlide = setInterval(nextSlide, 5000);
}


/* 오른쪽 화살표 */
nextBtn.addEventListener("click", () => {

    nextSlide();
    resetAutoSlide();

});


/* 왼쪽 화살표 */
prevBtn.addEventListener("click", () => {

    prevSlide();
    resetAutoSlide();

});


/* 점 클릭 */
dots.forEach((dot, index) => {

    dot.addEventListener("click", () => {

        currentSlide = index;

        showSlide(currentSlide);

        resetAutoSlide();

    });

});