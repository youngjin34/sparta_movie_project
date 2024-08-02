//영진님이 만든 걸 짓헙에서 get full -> 그 파일 안에있는 페치데이터를 가져오기위해 
import { movies, fetchMovies } from "./fetchData.js";

//영화 최신순 오름차순
fetchMovies().then((response) => {

  var recentMovies = response.sort(function (movie1, movie2) {
    // release_date 문자열을 Date 객체로 변환
    let date1 = new Date(movie1.release_date);
    let date2 = new Date(movie2.release_date);

    // Date 객체를 기반으로 비교하여 정렬
    return date2 - date1;
  });

  console.log("Sorted recent Movies:", recentMovies);
});


//영화 오래된순 오름차순 
fetchMovies().then((response) => {
  var oldMovies = response.sort(function (movie1, movie2) {
    // release_date 문자열을 Date 객체로 변환
    let date1 = new Date(movie1.release_date);
    let date2 = new Date(movie2.release_date);

    // Date 객체를 기반으로 비교하여 정렬
    return date1 - date2;
  });

  console.log("Sorted old Movies:", oldMovies);
});


//클릭시 영화 시간별 목록 나오기
function setupRecentOldButtons() {

  const newestButtons = document.querySelector("#newest");
  newestButtons.addEventListener("click", () => {

    fetchMovies().then((response) => {

      var recentMovies = response.sort(function (movie1, movie2) {

        let date1 = new Date(movie1.release_date);
        let date2 = new Date(movie2.release_date);

        return date2 - date1;
      });

      const cardList = document.querySelector("#cardList");
      cardList.innerHTML = "";

      recentMovies.forEach(movie => {

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


    });


  });

  const oldestButtons = document.querySelector("#oldest");
  oldestButtons.addEventListener("click", () => {

    fetchMovies().then((response) => {

      var recentMovies = response.sort(function (movie1, movie2) {

        let date1 = new Date(movie1.release_date);
        let date2 = new Date(movie2.release_date);

        return date1 - date2;
      });
      console.log("Sorted recent Movies:", recentMovies);

      const cardList = document.querySelector("#cardList");
      cardList.innerHTML = "";

      recentMovies.forEach(movie => {

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


    });


  });




}
//14번 우리가 정의한 동작 실행하기. 
setupRecentOldButtons();



