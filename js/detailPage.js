import { movies, fetchMovies } from "./fetchData.js";


fetchMovies().then(() => {
  createDetailPage(movies);
})

const GENRE_MAP = {
  35: "코미디",
  53: "스릴러",
  28: "액션",
  10749: "로맨스",
  18: "드라마",
  12: "어드밴쳐",
  16: "애니메이션",
  80: "범죄",
  99: "다큐멘터리",
  10751: "가족",
  14: "판타지",
  36: "역사",
  27: "호러",
  10402: "음악",
  9648: "미스테리",
  878: "공상 과학",
  10770: "TV 영화",
  10752: "전쟁",
  37: "서양"
};

// 상세페이지 데이터 입력
function createDetailPage() {
  const searchId = new URLSearchParams(window.location.search);
  const movieId = searchId.get("movieId");

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

  // 배경 이미지 설정
  document.body.style.backgroundImage = `
      linear-gradient(
        to right,
        rgba(20, 20, 20, 0.8) 20%,
        rgba(20, 20, 20, 0.6) 40%,
        rgba(20, 20, 20, 0.4) 60%,
        rgba(20, 20, 20, 0.2) 80%,
        rgba(20, 20, 20, 0) 100%
      ),
      url('https://image.tmdb.org/t/p/w1280${filteredMovie.backdrop_path}')
    `;
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundPosition = "center";
}


