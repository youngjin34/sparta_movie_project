const reviewNicknameInput = document.querySelector(".reviewNicknameInput");
const reviewPasswordInput = document.querySelector(".reviewPasswordInput");
const reviewContentInput = document.querySelector(".reviewContentInput");
const reviewAddBtn = document.querySelector(".reviewAddBtn");

const reviewOutputBox = document.querySelector(".reviewOutputBox");
const outputNickname = document.querySelector(".outputNickname");
const outputContent = document.querySelector(".outputContent");
const deleteBtn = document.querySelector(".deleteBtn");

// 리뷰 데이터 저장
const setReviewData = () => {
  let nickname = reviewNicknameInput.value;
  let password = reviewPasswordInput.value;
  let content = reviewContentInput.value;

  localStorage.setItem("nickname", nickname);
  localStorage.setItem("password", password);
  localStorage.setItem("content", content);
  getReviewData();
};
reviewAddBtn.addEventListener("click", setReviewData);

// 리뷰 데이터 불러오기
const getReviewData = () => {
  let nickname = localStorage.getItem("nickname");
  let password = localStorage.getItem("password");
  let content = localStorage.getItem("content");

  reviewOutputBox.innerHTML += `
    <div class="oneReview">
      <div class="outputNickname">${nickname}</div>
      <div class="outputContent">${content}</div>
      <div>
      <button class="deleteBtn">삭제</button>
      </div>
    </div>`;
};
getReviewData();
