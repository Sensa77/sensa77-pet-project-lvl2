const siteList = document.querySelector(".site-list");
const buttonClose = document.querySelector(".site-list__close");
const openList = document.querySelector(".main-nav__toggle");

const showList = (event) => {
  event.preventDefault();
  siteList.classList.add("site-list--show");
};

const closeModal = (event) => {
  event.preventDefault();
  siteList.classList.remove("site-list--show");
};

openList.addEventListener("click", showList);
buttonClose.addEventListener("click", closeModal);

const submitButton = document.querySelector(".info__button");
const submitModal = document.querySelector(".thanks");
const closeButton = document.querySelector(".thanks__button");
const errorModal = document.querySelector(".error");
const errorButton = document.querySelector(".error__button");
const nameFormInputs = document.querySelectorAll(".name-form input");
const contactFormInputs = document.querySelectorAll(".number-form input");
const inputs = [...nameFormInputs, ...contactFormInputs];

if (submitButton) {
  const showPopup = (event) => {
    event.preventDefault();
    let error = false;
    inputs.forEach((input) => {
      if (!input.value) {
        error = true;
      }
    });
    if (error) {
      errorModal.classList.add("error--show");
    } else {
      submitModal.classList.add("thanks--show");
    }
  };
  submitButton.addEventListener("click", showPopup);
}

if (closeButton) {
  const closeThanks = (event) => {
    event.preventDefault();
    submitModal.classList.remove("thanks--show");
  };
  closeButton.addEventListener("click", closeThanks);
}

if (errorButton) {
  const closeError = (event) => {
    event.preventDefault();
    errorModal.classList.remove("error--show");
  };

  errorButton.addEventListener("click", closeError);
}
