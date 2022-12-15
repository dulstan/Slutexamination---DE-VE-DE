// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  addDoc,
  deleteDoc,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBvJbeLltrR_-VLBS2O0Suvm6EdE6J0OBU",
  authDomain: "de-ve-de-9f88e.firebaseapp.com",
  projectId: "de-ve-de-9f88e",
  storageBucket: "de-ve-de-9f88e.appspot.com",
  messagingSenderId: "169892086536",
  appId: "1:169892086536:web:baaf18eb103115eaa462bd",
  measurementId: "G-31219G2HKD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const inputTitleElem = document.querySelector("#title");
const inputGenreElem = document.querySelector("#genre");
const inputDateElem = document.querySelector("#date");
const watchListBtn = document.querySelector("#watchList");

const movieSection = document.querySelector("#movieSection");


async function saveToDataBase(titleName, genreItem, dateItem) {
  try {
    await addDoc(collection(db, "toWatch"), {
      title: titleName,
      genre: genreItem,
      date: dateItem,
    });
  } catch (error) {
    console.log("ERROR", error);
  }
}

async function getMovies() {
  const toWatchMovies = await getDocs(collection(db, "toWatch"));

  movieSection.innerHTML = "";
  //console.log('####', toWatchMovies);

  toWatchMovies.forEach((movie) => {
    //console.log(movie.id);
    //console.log(movie.data());

    const wrapper = ` 
          <article  class="watchListElem" "${movie.data()}">
              <h3 class="movieName">${movie.data().title}</h3>
              <p>Genre: ${movie.data().genre}</p>
              <p class="dateSection">Release Date: <br>${movie.data().date}</p>
              <button type="button" data-movie-id=${
                movie.id
              } class="deleteBTN">Ta bort filmen</button>
          </article>
          `;
    movieSection.insertAdjacentHTML("beforeend", wrapper);
  });

  deleteMovieClick();
}

watchListBtn.addEventListener("click", () => {
  const titleName = inputTitleElem.value;
  const genreItem = inputGenreElem.value;
  const dateItem = inputDateElem.value;
  saveToDataBase(titleName, genreItem, dateItem);

  inputTitleElem.value = "";
  inputGenreElem.value = "";
  inputDateElem.value = "";
});

function getMyList() {
  const showBtn = document.querySelector("#showMyList");
  showBtn.addEventListener("click", async () => {
    getMovies();
    toggleList();
  });
}
getMyList();

function toggleList() {
  movieSection.classList.toggle("hide");
}

async function removeFromDataBase(towatchId) {
  try {
    await deleteDoc(doc(db, "toWatch", towatchId));
  } catch (error) {
    console.log("ERROR", error);
  }
}
function deleteMovieClick() {
  const btnRemove = document.querySelectorAll(".deleteBTN");
  //console.log(btnRemove)

  btnRemove.forEach((remove) => {
    remove.addEventListener("click", async (event) => {
      const towatchId = event.target.getAttribute("data-movie-id");
      await removeFromDataBase(towatchId);
      getMovies();
      //console.log(towatchId)
    });
  });
}
