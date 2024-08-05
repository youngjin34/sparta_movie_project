import { movies, fetchMovies } from "./fetchData.js";

fetchMovies().then(() => {
  makeMovieCards(movies); // 영화 데이터가 로드된 후 카드 생성
  setupGenreButtons();
});

// 페이지가 로드되면 커서를 검색창으로 자동 지정
window.onload = function () {
  searchInput.focus();
};

// 카드리스트 생성하기
function makeMovieCards(movies) {
  const cardList = document.querySelector("#cardList");
  cardList.innerHTML = "";

  movies.forEach(movie => {
    const movieElement = document.createElement("div");
    movieElement.classList.add("movie");
    movieElement.innerHTML = `
      <div class="oneCard">
        <a href="detailMovie.html?movieId=${movie.id}">
          <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title} 포스터">
          <div class="contentBox">
            <h2 class="contentTitle">${movie.title}</h2>
            <div class="infoBox">
              <p class="vote"><b>평점:</b> ${movie.vote_average}</p>
              <p class="releaseDate"><b>개봉일:</b> ${movie.release_date}</p>
            </div>
          </div>
          <div class="overviewBox">
            <h2 class="overviewTitle">${movie.title}</h2>
            <p>${movie.overview}</p>
          </div>
        </a>
      </div>
    `;
    cardList.appendChild(movieElement);
  });
}

// 장르별 영화 필터링
function genreMovies(genreValue) {
  if (genreValue === "all") {
    return movies;
  }

  const genreMap = {
    comedy: 35,
    thriller: 53,
    action: 28,
    romance: 10749,
    drama: 18,
  };

  const genreId = genreMap[genreValue];
  return movies.filter(movie => movie.genre_ids.includes(genreId));
}

// 장르별 버튼 이벤트 주기
function setupGenreButtons() {
  const genreButtons = document.querySelectorAll("[genre]");
  for (const button of genreButtons) {
    button.addEventListener("click", function () {
      const offset = 130;
      const scrollPosition = document.querySelector(this.dataset.target).offsetTop - offset;

      window.scrollTo({ top: scrollPosition, behavior: "smooth" });
    });
  }

  genreButtons.forEach(button => {
    button.addEventListener("click", () => {
      const genreValue = button.getAttribute("genre");
      const filteredMovies = genreMovies(genreValue);

      const cardList = document.querySelector("#cardList");
      cardList.innerHTML = "";

      filteredMovies.forEach(movie => {
        const movieElement = document.createElement("div");
        movieElement.classList.add("movie");
        movieElement.innerHTML = `
          <div class="oneCard">
            <a href="detailMovie.html?movieId=${movie.id}">
              <div class="movie-content-position">
                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title} 포스터">
                <div class="contentBox">
                  <h2 class="contentTitle">${movie.title}</h2>
                  <div class="infoBox">
                    <p class="vote"><b>평점:</b> ${movie.vote_average}</p>
                    <p class="releaseDate"><b>개봉일:</b> ${movie.release_date}</p>
                  </div>
                </div>
                <div class="overviewBox">
                  <h2 class="overviewTitle">${movie.title}</h2>
                  <p>${movie.overview}</p>
                </div>
              </div>
            </a>
          </div>
        `;

        cardList.appendChild(movieElement);
      });

    });
  });
}

// scrollBtn
const scrollBtn = document.querySelector('.scrollBtn');

document.addEventListener('scroll', () => {
  //홈 높이의 반 정도 스크린이 위치했을 때, 상단으로 올라가는 버튼 등장
  if (homeHeight / 2 < window.scrollY) {
    scrollBtn.style.opacity = 1;
  } else {
    scrollBtn.style.opacity = 0;
  }
});

scrollBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  })
});
