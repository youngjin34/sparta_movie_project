const reviewAddBtn = document.querySelector(".reviewAddBtn");

const reviewOutputBox = document.querySelector(".reviewOutputBox");

// 리뷰 데이터 저장
const setReviewData = () => {
  let nickname = document.querySelector(".reviewNicknameInput").value;
  let password = document.querySelector(".reviewPasswordInput").value;
  let content = document.querySelector(".reviewContentInput").value;

  let obj = { nickname: nickname, password: password, content: content };
  let review = JSON.parse(localStorage.getItem("review"));
  review.push(obj);

  localStorage.setItem("review", JSON.stringify(review));
  window.location.reload();
};
reviewAddBtn.addEventListener("click", setReviewData);

// 리뷰 데이터 불러오기
const getReviewData = () => {
  let reviewData = [];
  function check() {
    let obj = JSON.parse(localStorage.getItem("review"));
    if (!obj) {
      let dummyArr = [
        { nickname: "닉네임", password: "비밀번호", content: "내용" },
      ];
      let dummyData = JSON.stringify(dummyArr);
      localStorage.setItem("review", dummyData);

      let dummyObj = JSON.parse(localStorage.getItem("review"));
      reviewData = dummyObj;
    } else {
      reviewData = obj;
    }
  }
  check();
  console.log(reviewData);

  return reviewData;
};

//리뷰 리스트 생성하기
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
makeReviewData();

// 리뷰데이터 삭제하기+이벤트 위임하기
reviewOutputBox.addEventListener("click", deleteReview);

function deleteReview({ target }) {
  if (target === reviewOutputBox) return;

  if (target.matches(".deleteBtn")) {
    let reviewData = getReviewData();
    let deletePassword = target.id;
    console.log(deletePassword);

    reviewData.forEach((element, index) => {
      if (deletePassword === element.password) {
        reviewData = reviewData.filter(
          (e) => e !== reviewData.splice(index, 1)
        );
      }
    });
    localStorage.setItem("review", JSON.stringify(reviewData));
    window.location.reload();
  }
}
