
export const movies = [];

async function fetchMovieData(page = 1) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNWEyNWNmMjg4ODcxYjJlMDBlNTRmMzk3NDI2OGVmMCIsIm5iZiI6MTcyMTc5NDA0MS45OTY3OCwic3ViIjoiNjZhMDcyYzgzNGI2NTA0MDZmNTAzNWRkIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.9eGzwSVRYXTpOYcimJwjbTJ_1nQAhNq6a_MZxuNZ3T4",
    },
  };

  // fetch로 불러온 promise를 json=>객체 배열로 변환하여 그 중 필요한 데이터 results만 추출하여 반환
  // 특정 페이지에서 영화 데이터를 가져오는 함수
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${options.headers.Authorization}&language=ko&page=${page}`,
    options
  );
  const data = await response.json();
  return data.results;
}

// 여러 페이지에서 영화를 가져오는 함수
export async function fetchMovies(pages = 3) {
  for (let i = 1; i <= pages; i++) {
    const movieData = await fetchMovieData(i);
    movies.push(...movieData);
  }
  return movies;
}


fetchMovies();