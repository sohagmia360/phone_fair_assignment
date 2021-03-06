/*======
all element selecting 
====================================*/
const search_section = document.querySelector(".search_section");
const input = document.querySelector(".search_section input");
const form = document.querySelector("form");
const body = document.querySelector("body");
const row = document.querySelector(".row");
const showMore = document.querySelector(".showMore");
const modal_Overlay = document.querySelector(".modal_Overlay");
const error = document.querySelector(".error");
const Counter_all_details = document.querySelector(".Counter_all_details");
const loading_image = document.querySelector(".loading_image");
/*=========
all function
=============================*/

const fetchigData = (searchValue) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchValue}`;
  fetch(url)
    .then((response) => response.json())
    .then((details) => {
      if (details.data.length <= 0) {
        error.classList.add("active");
        error.innerHTML = ` <span>( ${searchValue} )</span> ?  this keyword not find any data`;
      } else {
        displayData(details.data);
        error.innerHTML = "";
        error.classList.remove("active");
      }
    });
};

/*=========================
 Display data on the fast user search 
 =========================================*/

const displayData = (data) => {
  showMore.addEventListener("click", () => {
    generateHtml(data);
  });
  if (data.length > 20) {
    showMore.style.display = "block";
    generateHtml(data.slice(0, 20));
    TotalDisplayData = data.slice(0, 20).length;
    Counter_all_details.classList.add("active");
    return data.slice(0, 20);
  } else {
    return generateHtml(data);
  }
};

const showAllData = () => {
  generateHtml(data);
};

/*==================
generate Html Func 
================================*/
const generateHtml = (data) => {
  const row = document.querySelector(".row");
  row.innerHTML = "";
  data.forEach((item) => {
    console.log(item);
    const button = document.createElement("button");
    button.addEventListener("click", getDetails);
    const card = document.createElement("div");
    const div = document.createElement("div");
    div.style.position = "relative";
    card.classList.add("card");
    button.classList.add("btn", "btn_details");
    button.innerText = "Details";
    div.classList.add("col-lg-4", "col-md-6", "col-sm-12");
    card.innerHTML = `
                      <img src="${item.image}" alt="" />
                        <div class="card_details">
                          <h4>${item.phone_name}</h4>
                          <h5> Brand Name : ${item.brand}</h5>
                      </div>
                      `;
    div.appendChild(card);
    card.appendChild(button);

    function getDetails() {
      getDetailsDataFtching(item.slug);
    }

    row.appendChild(div);
  });
};

/*=================
 Getting Data 
==============================*/
const getShopeData = (e) => {
  e.preventDefault();
  Counter_all_details.innerHTML = "";
  showMore.style.display = "none";
  row.innerHTML = "";
  const searchValue = input.value;
  if (searchValue) {
    input.value = "";
    fetchigData(searchValue);
    error.classList.remove("active");
    error.innerHTML = "";
  } else {
    error.classList.add("active");
    error.innerHTML = "please type your special keyword first";
  }
};

/*==========================================
 Fatching item  Details data on Fast url 
 =======================================================*/

const getDetailsDataFtching = (id) => {
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showDwtailsOnModal(data.data));
};

/*======================================
Show details Data on Modal Manageer
========================================================*/
function showDwtailsOnModal(data) {
  const { brand, image, mainFeatures, name, releaseDate } = data;

  modal_Overlay.classList.add("active");
  const modal_wrapper = document.createElement("div");
  modal_wrapper.classList.add("modal_cusom");
  console.log(data);
  modal_wrapper.innerHTML = `
  <div class="modal_container ">
        <div class=" modal_wrapper d-flex align-items-center">
          <div class="phone_image p-5">
            <img src="${image ? image : "Not Found"}" alt="image" />
            <div class="phone_core_details">
              <h5>
                <strong>Name :</strong>
                <small>${name ? name : "Not Found"}</small>
              </h5>
              <h5 >
                <strong>Release Date :</strong>
                <small>${releaseDate ? releaseDate : "Not Found"}</small>
              </h5>
             
            </div>
          </div>
          <div class="mainFuture p-2">
              <h5 class="title_menu">Main Features</h5>
            <h5>
              <strong>chipSet</strong>
              <small>${
                mainFeatures.chipSet ? mainFeatures.chipSet : "not find"
              }</small>
            </h5>
            <h5>
              <strong>DisplaySize</strong>
              <small>${
                mainFeatures.displaySize ? mainFeatures.displaySize : "not find"
              }</small>
            </h5>
            <h5>
              <strong>Memory</strong>
              <small>${
                mainFeatures.memory ? mainFeatures.memory : "not find"
              }</small>
            </h5>
            <h5>
              <strong>Strorage</strong>
              <small>${
                mainFeatures.storage ? mainFeatures.storage : "not find"
              }</small>
            </h5>
            <div className="othersFuture">
            <h5 class="title_menu">Others Future</h5>

              <h5>
                <strong>Bluetooth</strong>
                <small>${
                  data.others ? data.others.Bluetooth : "not find"
                }</small>
              </h5>
              <h5>
                <strong>GPS</strong>
                <small>${
                  data.others ? data.others.GPS : "not found gps"
                }</small>
              </h5>
              <h5>
                <strong>NFC</strong>
                <small>${
                  data.others ? data.others.NFC : "not found nfc"
                }</small>
              </h5>
              <h5>
                <strong>Radio</strong>
                <small>${
                  data.others ? data.others.Radio : "not found radio"
                }</small>
              </h5>
              <h5>
                <strong>USB</strong>
                <small>${
                  data.others ? data.others.USB : "not found usb"
                }</small>
              </h5>
              <h5>
                <strong>WLAN</strong>
                <small>${
                  data.others ? data.others.WLAN : "not found wlan"
                }</small>
              </h5>
            <h5 class="title_menu">Sensors</h5>

              <h5>
              <strong>Sensors :</strong>
              <small > ${
                mainFeatures.sensors
                  ? mainFeatures.sensors
                  : "not found sensors"
              }</small>
            </h5>
            </div>
            
          </div>
        </div>
        <i onclick="closeModal()" class="close_icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </i>
      </div>
    `;
  modal_Overlay.appendChild(modal_wrapper);
}

/*======================
close modal Func 
==================================*/

function closeModal() {
  modal_Overlay.classList.remove("active");
}

/*=========
all EventListener
=============================*/

input.addEventListener("focus", () => {
  search_section.classList.add("active_border");
});
input.addEventListener("blur", () => {
  search_section.classList.remove("active_border");
});

form.addEventListener("submit", getShopeData);
