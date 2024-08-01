// 페이지가 로드되면 커서를 검색창으로 자동 지정
window.onload = function () {
  const inputBox = document.getElementById('inputBox');
  inputBox.focus();
};

// fetch 데이터 받아오기
async function fetchMovieData() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNWEyNWNmMjg4ODcxYjJlMDBlNTRmMzk3NDI2OGVmMCIsIm5iZiI6MTcyMTc5NDA0MS45OTY3OCwic3ViIjoiNjZhMDcyYzgzNGI2NTA0MDZmNTAzNWRkIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.9eGzwSVRYXTpOYcimJwjbTJ_1nQAhNq6a_MZxuNZ3T4",
    },
  };

  // fetch로 불러온 promise를 json=>객체 배열로 변환하여 그 중 필요한 데이터 results만 추출하여 반환
  const response = await fetch(
    "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
    options
  );
  const data = await response.json();
  return data.results;
}

// 카드리스트 생성하기
const makeMovieCards = async () => {
  const movieData = await fetchMovieData();
  const cardList = document.querySelector(".cardList");

  cardList.innerHTML = movieData
    .map(
      (movieData) => `
      <div class="oneCard" id=${movieData.id}>
        <img src="https://image.tmdb.org/t/p/w500${movieData.poster_path}">
        <div class="contentBox">
          <h2 class="contentTitle">${movieData.title}</h2>
          <div class="infoBox">
            <p class="vote">${movieData.vote_average}</p>
            <p class="releaseDate">${movieData.release_date}</p>  <!-- 개봉일 추가 -->
          </div>
        </div>
        <div class="overviewBox">
          <h2 class="overviewTitle">${movieData.title}</h2>
          <p>${movieData.overview}</p>
      </div>
    </div>`
    )
    .join("");

  // contentTitle 수정
  const contentTitles = document.querySelectorAll(".contentTitle");
  contentTitles.forEach(title => {
    title.style.textAlign = "left"; // 왼쪽 정렬 적용
  });
};
makeMovieCards();

// 검색 함수 선언
const searchFunc = (inputWord) => {
  // 생성된 카드 불러오기
  const searchData = document.querySelectorAll(".oneCard");

  //불러온 카드로 for문
  searchData.forEach((card) => {
    //하나의 카드의 타이틀을 지정
    const title = card.querySelector(".contentTitle").textContent.toLowerCase();
    //검색창에 입력한 값을 지정
    const searchWord = inputWord.toLowerCase();

    if (title.includes(searchWord)) {
      card.style.display = "";
    } else {
      card.style.display = "none";
    }
  });
};

//검색 함수 할당
const form = document.querySelector(".searchBox");
form.addEventListener("submit", (event) => {
  const inputBox = document.getElementById("inputBox");
  // 기존 이벤트 중지
  event.preventDefault();
  // 검색 이벤트 삽입
  searchFunc(inputBox.value);
});

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