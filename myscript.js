
   
let besoktaStader = JSON.parse(localStorage.getItem("besokta"));
 console.log(besoktaStader);

var countryId="";
var countryName="";
fetch("land.json").then(response=>response.json()).then(data=>{
  console.log(data);  
  var countries=document.getElementById("countries");
  data.forEach(country => {
    var countryElement = document.createElement("button");
    countryElement.className = "country_btn";
    countryElement.textContent=country.countryname; 
    countryElement.setAttribute("onclick", "showCity('" + country.id + "');");
    countries.appendChild(countryElement); 
    countryId=country.id;
    countryName = country.countryname   
  }); 

})

var townId="";
var townName = "";
var townPopulation="";
function showCity(countryId){
console.log(countryId);
fetch("stad.json").then(response=>response.json()).then(data=>{
  console.log(data);
  var cityList = document.getElementById("cityList");
  data.forEach(town=> {
    if(town.countryid===countryId){
      var townElement = document.createElement("button");
      townElement.className = "town_btn";
      townElement.textContent=town.stadname;
      townElement.setAttribute("onclick","showCityInfo('"+ town.id+"')");
      cityList.appendChild(townElement);
      townId=town.id;
      townName=town.stadname;
     townPopulation=town.population;
    }
  })
})
}
function showCityInfo(cityId){
  console.log(cityId);
  console.log(townName);
  console.log(townPopulation);
  var div_info = document.getElementById("info");
  div_info.textContent = " " + townName + " har " +townPopulation+" invånare ."
  showBesoktBtn();
}
function showBesoktBtn(){
 var div_info = document.getElementById("info");
var besokt_btn = document.createElement("button");
besokt_btn.setAttribute("id","besokt_btn");
besokt_btn.textContent = "Besökt";
besokt_btn.setAttribute("onclick","saveTown(`"+townId+"`)");
div_info.appendChild(besokt_btn);
}
var besoktaStad =[];
function saveTown(townId){
    console.log(townId);
var id = parseInt(townId);
besoktaStad.push(id);
var besoktaStad_ser=localStorage.setItem("besokta",JSON.stringify(besoktaStad));
console.log(besoktaStad_ser);
  }

document.getElementById("countries").insertAdjacentHTML("afterend","<a href=`#saved`>Besökta städer</a>");