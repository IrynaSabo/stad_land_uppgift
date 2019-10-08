var besoktaStad = [];// skapar behollare för besökta städers id

if (localStorage.getItem("besokta") !== null) {//om localStorage är inte tom
  console.log("laddar fil");
  besoktaStad = JSON.parse(localStorage.getItem("besokta"));// gör om stringar till objekt
  console.log(besoktaStad);
}

var countryId = "";
var countryName = "";
fetch("land.json").then(response => response.json()).then(data => {//hämtar data om länderna
  console.log(data);
  var countries = document.getElementById("countries");
  data.forEach(country => {// för varje element i arrayen skappar en HTML element (button)
    var countryElement = document.createElement("button");
    countryElement.className = "country_btn";
    countryElement.textContent = country.countryname;
    countryElement.setAttribute("onclick", "showCity(" + country.id + ");");
    countries.appendChild(countryElement);
    countryId = country.id;
    countryName = country.countryname
  });

})

var townId = "";
var townName = "";
var townPopulation = "";
function showCity(countryId) {// funktion som visar städer av respektive land
  console.log(countryId);
  fetch("stad.json").then(response => response.json()).then(data => {//hämtar data från stad filen
    console.log(data);
    var cityList = document.getElementById("cityList");
    cityList.innerHTML = "";//tömmer div
    data.forEach(town => {//för varje stad i arrayen
      if (town.countryid === countryId) {//om town id och land id är lika
        var townElement = document.createElement("button");//skapar knapar
        townElement.className = "town_btn";
        townElement.textContent = town.stadname;
        townElement.setAttribute("onclick", "showCityInfo(" + town.id + ")");
        cityList.appendChild(townElement);
        townId = town.id;
        townName = town.stadname;
        townPopulation = town.population;
      }
    })
  })
}
var stadId = "";
function showCityInfo(townId) {//funktion som visar info om respektive stad 
  fetch("stad.json").then(response => response.json()).then(data => {//hämtar data från json fil
    console.log(data);

    var div_info = document.getElementById("info");
    div_info.innerHTML = "";
    data.forEach(stad => {//skapar element för varje stad
      if (townId === stad.id) {// om id från stad som är kopplad till knappen stämmer med id i datamassiven
        console.log(stad.stadname);
        div_info.textContent = " " + stad.stadname + " har " + stad.population + " invånare ."
        stadId = stad.id;
      }
    });
    showBesoktBtn();//anpopar function som skapar besökta knappen
  })

}

function showBesoktBtn() {
  var div_info = document.getElementById("info");

  var besokt_btn = document.createElement("button");
  besokt_btn.setAttribute("id", "besokt_btn");
  besokt_btn.textContent = "Besökt";
  besokt_btn.setAttribute("onclick", "saveTown(" + stadId + ")");
  div_info.appendChild(besokt_btn);
}

function saveTown(stadId) {//funktion som sparar besökta städer i localStorage
  console.log(stadId);
  var id = parseInt(stadId);
  var isAdded = false;
  for (var i = 0; i < besoktaStad.length; i++) {
    if (besoktaStad[i].id === id) {
      isAdded = true
    }
  }
  if (besoktaStad.length === 0 || isAdded === false) {
    var object = { id: id };
    besoktaStad.push(object);
    localStorage.setItem("besokta", JSON.stringify(besoktaStad));
  }
  console.log(besoktaStad)
}
showBesokta();//funktion som visar sparade städer och räknar ut summan av städernas befolkningen

function showBesokta(){
fetch("stad.json").then(response => response.json()).then(data1 => {
  console.log(data1);
  var div_saved = document.getElementById("saved");
  div_saved.innerHTML="";
  var population = 0;
  var line;
  for( let j =0; j<besoktaStad.length; j++) {
    for (let i = 0; i < data1.length; i++) {
      if (besoktaStad[j].id===data1[i].id) {
        console.log(data1[i].population);
        population += parseInt(data1[i].population);
        line = document.createElement("p");
        line.textContent = "  " + data1[i].stadname+ " ";
        div_saved.appendChild(line) ;
      }
    }
  }
  console.log(population);
  var line_pop = document.createElement("h4");
  line_pop.textContent= "Population: " + population;
  div_saved.appendChild(line_pop);
  
  div_saved.insertAdjacentHTML("beforeend","<br/><a id=`home` href=`#countries`>Home</a>")
  var clear_btn = document.createElement("button");
  clear_btn.textContent="Rensa historiken";
  clear_btn.setAttribute("onclick",clearLS());
  div_saved.appendChild(clear_btn);
  
})
}
document.getElementById("cityList").insertAdjacentHTML("afterend", "<a href=`#saved`>Besökta städer</a>");
function clearLS(){
  localStorage.clear();//tömmer localStorage
}