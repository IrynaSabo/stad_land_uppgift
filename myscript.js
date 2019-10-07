if(localStorage.getItem("besokta")!==null) {
  console.log("laddar fil");
let besoktaStad = JSON.parse(localStorage.getItem("besokta"));
console.log(besoktaStad);}
else{
 console.log("skapar en ny fil");
 var besoktaStad =[];
localStorage.setItem("besokta",JSON.stringify(besoktaStad));
}
 

var countryId="";
var countryName="";
fetch("land.json").then(response=>response.json()).then(data=>{
  console.log(data);  
  var countries=document.getElementById("countries");
  data.forEach(country => {
    var countryElement = document.createElement("button");
    countryElement.className = "country_btn";
    countryElement.textContent=country.countryname; 
    countryElement.setAttribute("onclick", "showCity(" + country.id + ");");
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
  cityList.innerHTML="";
  data.forEach(town=> {
    if(town.countryid===countryId){
      var townElement = document.createElement("button");
      townElement.className = "town_btn";
      townElement.textContent=town.stadname;
      townElement.setAttribute("onclick","showCityInfo("+town.id+")");
      cityList.appendChild(townElement);
      townId=town.id;
      townName=town.stadname;
     townPopulation=town.population;
     }
  })
})
}
var stadId="";
function showCityInfo(townId){  
  fetch("stad.json").then(response=>response.json()).then(data=>{
    console.log(data);
      
  var div_info = document.getElementById("info");
  div_info.innerHTML="";
  data.forEach(stad=>{    
  if(townId===stad.id){
  console.log(stad.stadname);
  div_info.textContent = " " + stad.stadname + " har " + stad.population+" invånare ."
  stadId=stad.id; 
                 }
         }) ;
         showBesoktBtn();
     })
         
  }
    
function showBesoktBtn(){
 var div_info = document.getElementById("info");
 
var besokt_btn = document.createElement("button");
besokt_btn.setAttribute("id","besokt_btn");
besokt_btn.textContent = "Besökt";
besokt_btn.setAttribute("onclick","saveTown("+stadId+")");
div_info.appendChild(besokt_btn);
}


function saveTown(stadId){   
  console.log(stadId); 
var id = parseInt(stadId);
console.log(id);
besoktaStad.push(id);
  }

  fetch("stad.json").then(response=>response.json()).then(data1=>{
    console.log(data1);
  var population = 0;	
		var line = "";				
		if(besoktaStad.length){
			for(let i=0; i<data1.length; i++){
				if(besoktaStad.includes(data1[i].id)){
					population += parseInt(data1[i].population);
					line += '<div>' + data1[i].stadname + "</div>";
				}
			};
		}			
		line += "Population: "+population;
 document.getElementById("saved").insertAdjacentHTML("beforeend",line);
 document.getElementById("saved").style.display=block})
 document.getElementById("cityList").insertAdjacentHTML("afterend","<a href=`#saved`>Besökta städer</a>");