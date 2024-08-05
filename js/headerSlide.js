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
    sliderLi.classList.add("slider-card");
    sliderLi.innerHTML = `
      <a href="detailMovie.html?movieId=${movie.id}">
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title} 포스터">
      </a>
    `;

    slider.appendChild(sliderLi);
  });

  // 슬라이더 및 슬라이드 아이템 설정
  let sliderItems = slider.querySelectorAll("li");
  let currentIdx = 1;
  const speedTime = 300;

  // 클론 노드 추가
  const firstClone = sliderItems[0].cloneNode(true);
  const lastClone = sliderItems[sliderItems.length - 1].cloneNode(true);

  slider.appendChild(firstClone);
  slider.insertBefore(lastClone, sliderItems[0]);

  const liWidth = slideWrap.clientWidth / 3;

  // 슬라이더의 전체 너비 설정
  slider.style.width = `${liWidth * sliderItems.length}px`;

  // 초기 위치 설정 (첫번째 슬라이드로 이동)
  setTimeout(() => {
    slider.style.transition = `all ${speedTime}ms ease`;
    slider.style.transform = `translateX(${-liWidth}px)`;
  }, 0);

  function moveSlide(direction) {
    slider.style.transition = `all ${speedTime}ms ease`;
    currentIdx += direction;
    slider.style.transform = `translateX(${-liWidth * currentIdx}px)`;

    slider.addEventListener('transitionend', () => {
      if (currentIdx === sliderItems.length - 1) {
        slider.style.transition = 'none';
        currentIdx = 1;
        slider.style.transform = `translateX(${-liWidth * currentIdx}px)`;
      } else if (currentIdx === 0) {
        slider.style.transition = 'none';
        currentIdx = sliderItems.length - 2;
        slider.style.transform = `translateX(${-liWidth * currentIdx}px)`;
      }
    });
  }

  let slideInteval;

  // 자동 슬라이딩 기능
  function startSliding() {
    slideInteval = setInterval(() => {
      moveSlide(1);
    }, 1300);
  }

  function stopSliding() {
    clearInterval(slideInteval);
  }

  sliderItems.forEach(item => {
    item.addEventListener('mouseover', stopSliding);
    item.addEventListener('mouseout', startSliding);
  });

  startSliding();
};
