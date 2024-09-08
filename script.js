const resultArtist = document.getElementById("result-artist");
const playlistContainer = document.getElementById("result-playlists");
const searchInput = document.getElementById("search-input");
const greetingElement = document.getElementById("greeting");

function requestApi(searchTerm) {
  fetch(`http://localhost:3000/artists?name_like=${searchTerm}`)
    .then((response) => response.json())
    .then((results) => {
      displayResults(results);
    });
}


function displayResults(results) {
  hidePlaylists();
  const artistImage = document.getElementById("artist-img");
  const artistName = document.getElementById("artist-name");

  if (results.length === 0) {
    artistName.innerText = "Nenhum artista encontrado";
    artistImage.src = "";
  } else {
    const firstArtist = results[0];
    artistImage.src = firstArtist.urlImg;
    artistName.innerText = firstArtist.name;
  }
  resultArtist.classList.remove("hidden");
}

function hidePlaylists() {
  playlistContainer.classList.add("hidden");
}

searchInput.addEventListener("input", function () {
  const searchTerm = searchInput.value.toLowerCase();
  if (searchTerm === "") {
    resultArtist.classList.add("hidden");
    playlistContainer.classList.remove("hidden");
    return;
  }
  requestApi(searchTerm);
});

// Função para pegar o horário do dia
function setGreeting() {
  const now = new Date();
  const hours = now.getHours();
  let greeting;

  if (hours < 12) {
    greeting = "Bom dia";
  } else if (hours < 18) {
    greeting = "Boa tarde";
  } else {
    greeting = "Boa noite";
  }

  greetingElement.textContent = greeting;
}
setGreeting();
