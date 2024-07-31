import { movies, fetchMovies } from "./fetchData.js";
console.log(movies);
// 페이지가 로드되면 커서를 검색창으로 자동 지정
window.onload = function () {
  inputBox.focus();
};


// 카드리스트 생성하기
function makeMovieCards() {
  const cardList = document.querySelector("#cardList");
  cardList.innerHTML = "";
  movies.forEach(movie => {
    const movieElement = document.createElement("div");
    movieElement.classList.add("movie");
    movieElement.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title} 포스터">
      <h2>${movie.title}</h2>
      <p><b>개봉일:</b> ${movie.release_date}</p>
      <p><b>평점:</b> ${movie.vote_average}</p>
    `;

    cardList.appendChild(movieElement);
  });
};

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
    drama: 18
  };

  const genreId = genreMap[genreValue];
  return movies.filter(movie => movie.genre_ids.includes(genreId));
}

// 장르별 버튼 이벤트 주기
function setupGenreButtons() {
  const genreButtons = document.querySelectorAll("[genre]");

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
          <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title} 포스터">
          <h2>${movie.title}</h2>
          <p><b>개봉일:</b> ${movie.release_date}</p>
          <p><b>평점:</b> ${movie.vote_average}</p>
        `;

        cardList.appendChild(movieElement);
      });

    });
  });
}


fetchMovies().then(() => {
  makeMovieCards(movies); // 영화 데이터가 로드된 후 카드 생성
  setupGenreButtons()
});