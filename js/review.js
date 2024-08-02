import { createDetailPage } from "./detailPage.js";

const searchId = new URLSearchParams(window.location.search);
const movieId = searchId.get("movieId");

const reviewAddBtn = document.querySelector(".reviewAddBtn");

const reviewOutputBox = document.querySelector(".reviewOutputBox");

// 리뷰 데이터 저장
const setReviewData = () => {
  let nickname = document.querySelector(".reviewNicknameInput").value;
  let password = document.querySelector(".reviewPasswordInput").value;
  let content = document.querySelector(".reviewContentInput").value;

  let obj = {
    nickname: nickname,
    password: password,
    content: content,
  };
  let review = JSON.parse(localStorage.getItem(`review${movieId}`));
  review.push(obj);

  localStorage.setItem(`review${movieId}`, JSON.stringify(review));
  location.reload();
};

// 인풋 데이터 유효성 검사
const addReviewCard = () => {
  let nickname = document.querySelector(".reviewNicknameInput").value;
  let password = document.querySelector(".reviewPasswordInput").value;
  let content = document.querySelector(".reviewContentInput").value;

  if (!nickname) {
    return alert("닉네임을 입력해주세요");
  } else if (!password) {
    return alert("비밀번호를 입력해주세요");
  } else if (!content) {
    return alert("리뷰를 입력해주세요");
  } else {
    setReviewData();
  }
};
reviewAddBtn.addEventListener("click", addReviewCard);

// 리뷰 데이터 불러오기
const getReviewData = () => {
  let reviewData = [];
  function check() {
    let obj = JSON.parse(localStorage.getItem(`review${movieId}`));
    if (!obj) {
      let dummyArr = [
        { nickname: "닉네임", password: "비밀번호", content: "내용" },
      ];
      let dummyData = JSON.stringify(dummyArr);
      localStorage.setItem(`review${movieId}`, dummyData);

      let dummyObj = JSON.parse(localStorage.getItem(`review${movieId}`));
      reviewData = dummyObj;
    } else {
      reviewData = obj;
    }
  }
  check();

  return reviewData;
};

//리뷰 카드 생성하기
const makeReviewData = () => {
  let reviewData = getReviewData();
  reviewData.forEach((element) => {
    let nickname = element.nickname;
    let password = element.password;
    let content = element.content;

    reviewOutputBox.innerHTML += `
      <div class="oneReview">
        <div class="outputNickname">${nickname}</div>
        <div class="outputContent">${content}</div>
        <button class="deleteBtn" id="${password}">삭제</button>
      </div>`;
  });
};

// 로컬스토리지 모든 데이터 삭제
// 아래 2줄 코드 중 위쪽 주석 처리 취소하고 아래쪽 주석 처리 후 새로고침
// 하면 로컬 스토리지 삭제 가능
// 다시 리뷰 데이터를 쌓고 싶으면 두 줄 코드 원래대로 돌려놓기

// localStorage.clear();
makeReviewData();

// 리뷰데이터 삭제하기+이벤트 위임하기
reviewOutputBox.addEventListener("click", deleteReview);
function deleteReview({ target }) {
  if (target === reviewOutputBox) return;

  if (target.matches(".deleteBtn")) {
    let reviewData = getReviewData();
    let deletePassword = target.id;

    // password 입력창 띄우기
    let passwordWindow = window.prompt("비밀번호를 입력하세요");
    if (passwordWindow === deletePassword) {
      let deleteCard = "";
      reviewData.forEach((element, index) => {
        if (deletePassword === element.password) {
          deleteCard = reviewData.splice(index, 1);
        }
      });
      reviewData = reviewData.filter((n) => n !== deleteCard);
      localStorage.setItem(`review${movieId}`, JSON.stringify(reviewData));
      alert("리뷰가 삭제되었습니다.");
      window.location.reload();
    } else {
      alert("비밀번호가 일치하지 않습니다.");
    }
  }
}
