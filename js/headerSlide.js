import { movies, fetchMovies } from "./fetchData.js";


fetchMovies().then(() => {
  sliderFunc();
})

function sliderFunc() {
  const slideWrap = document.querySelector("#slider__wrap");
  const slider = slideWrap.querySelector("#slider");

  // 영화 데이터를 기반으로 슬라이더 요소 생성
  movies.forEach(movie => {
    const sliderLi = document.createElement("li");
    sliderLi.innerHTML = `
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title} 포스터">
      `;

    slider.appendChild(sliderLi);
  });

  // 슬라이더 및 슬라이드 아이템 설정
  const sliderItems = slider.querySelectorAll("li");
  let currentIdx = 0;
  let translate = 0;
  const speedTime = 300;

  // 슬라이더 아이템이 있을 경우
  if (sliderItems.length > 0) {
    // 각 슬라이드의 너비 설정
    const liWidth = slideWrap.clientWidth / 3;
    // 슬라이더의 전체 너비 설정
    slider.style.width = `${liWidth * sliderItems.length}px`;

    function moveSlide(direction) {
      currentIdx += direction;
      translate += -liWidth * direction;
      slider.style.transform = `translateX(${translate}px)`;
      slider.style.transition = `all ${speedTime}ms ease`;

      // 무한 루프 처리
      if (currentIdx === sliderItems.length) {
        setTimeout(() => {
          slider.style.transition = 'none';
          currentIdx = 0;
          translate = 0;
          slider.style.transform = `translateX(${translate}px)`;
        }, speedTime);
      } else if (currentIdx === -1) {
        setTimeout(() => {
          slider.style.transition = 'none';
          currentIdx = sliderItems.length - 1;
          translate = -liWidth * currentIdx;
          slider.style.transform = `translateX(${translate}px)`;
        }, speedTime);
      }
    }

    // 자동 슬라이딩 기능
    function showSliding() {
      setInterval(() => {
        moveSlide(1.5);
      }, 1500);
    }

    showSliding();
  }
};

