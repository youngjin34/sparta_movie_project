import { movies, fetchMovies } from "./fetchData.js";


fetchMovies().then(() => {
  createDetailPage(movies);
})

const GENRE_MAP = {
  35: "코미디",
  53: "스릴러",
  28: "맥션",
  10749: "로맨스",
  18: "드라마"
};

// 상세페이지 데이터 입력
function createDetailPage() {
  const searchId = new URLSearchParams(window.location.search);
  const movieId = searchId.get("movieId");
  console.log(movieId);

  const selectedMovieElement = document.querySelector("#topPosition");
  const filteredMovie = movies.find(movie => movie.id === parseInt(movieId, 10));

  // 장르 ID를 장르 이름으로 변환
  const genreNames = filteredMovie.genre_ids
    .map(id => GENRE_MAP[id] || "알 수 없는 장르")
    .join(", ");

  selectedMovieElement.innerHTML = `
    <div class="moviePic">
        <img src="https://image.tmdb.org/t/p/w500${filteredMovie.poster_path}" alt="${filteredMovie.title}">
    </div>

    <div class="contents">
        <div class="contents1">
            <div class="theme"><h3>${filteredMovie.title}</h3> </div>
            <div class="summary"><p>${filteredMovie.overview}</p></div>
        </div>

        <div class="contents2">
            <div class="genre">${genreNames}</div>
            <div class="date">${filteredMovie.release_date}</div>
            <div class="rate"><span>평점: ${filteredMovie.vote_average}</span></div>
        </div>
    </div>
  `;
}


