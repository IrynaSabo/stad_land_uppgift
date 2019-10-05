
   /*fetch("land.json")// hämtar data från land jsonfil
      .then(response=>response.json())
      .catch(error=>console.log(error))
      .then(country=>{//skapar knapar men ländernas namn
          console.log(country);  
          var lander = document.getElementById("countries");      
          for(let i=0; i<country.length;i++){      
          lander.insertAdjacentHTML("beforeend","<button id=`L_` onclick=`showTown("+country[i].id+")`>" + country[i].countryname+"</button>");
          }       
         }) 
      
     var stadName = ""
     var population = ""
     function showTown(landId){//funktion som visar städer av respektiv land när man klickar på knappen
       fetch("stad.json")//hämtar data från stad jsonfil
        .then(response=>response.json())
        .catch(error=>console.log(error))
        .then(town=>{ 
          console.log(town);     
           var cityList = document.getElementById("cityList");                    
                for(let i=0; i < town.length; i++){//skapar städer som knapar 
                 console.log(town[i].countryid, landId);
                 if(town[i].countryid === landId){                                  
             cityList.insertAdjacentHTML("beforeend","<button id=`C_` onclick=`showCityInfo("+town[i].id+")`>"+ town[i].stadname+"</button>");
               stadName = town[i].stadname;
               population = town[i].population;
             }            
             }
           })
           }
           /*function showCityInfo(townId){// funktion som visar information om städerna när man klickar på respektiv knapp
              console.log(townId);
               console.log(stadName);
               console.log(population);
            var div_info = document.getElementById("info");                   
             div_info.textContent = "<br/>" + stadName + " har " + population +"."  
           showBesoktBtn(townId);
           }
        function showBesoktBtn(townId){//skapar besökt knappen
          var div_info = document.getElementById("info"); 
         var besokt_btn=document.createElement("button");
         besokt_btn.setAttribute("id","besokt_btn");
         besokt_btn.textContent="Besökt";
         besokt_btn.onclick=saveTownId(townId);
         div_info.insertAdjacentHTML("beforeend",besokt_btn);

            }
        function saveTownId(townId){
          var lander = JSON.stringify(town);
        }
 */
var landData ="";
var countryId="";
var countryName="";
fetch("land.json").then(response=>response.json()).then(data=>{
  console.log(data);
  landData=JSON.stringify(data);
  var countries=document.getElementById("countries");
  data.forEach(country => {
    var countryElement = document.createElement("button");
    countryElement.className = "country_btn";
    countryElement.textContent=country.countryname; 
    countryElement.addEventListener("click",showCity(country.id));  
    countries.appendChild(countryElement); 
    countryId=country.id;
    countryName = country.countryname   
  }); 

})
var townData ="";
var townId="";
var townName = "";
var townPopulation="";
function showCity(countryId){
console.log(countryId);
fetch("stad.json").then(response=>response.json()).then(data=>{
  console.log(data);
  var cityList = document.getElementById("cityList");
  data.forEach(town=>{
    if(town.countryid===countryId){
      var townElement = document.createElement("button");
      townElement.className = "town_btn";
      townElement.textContent=town.stadname;
      townElement.onclick = showCityInfo(town.id);
      cityList.appendChild(townElement);
      townId=town.id;
      townName=town.stadname;
      townPopulation=town.population;
      townData = town;
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
  showBesoktBtn(townId);
}
function showBesoktBtn(){
  var div_info = document.getElementById("info");
var besokt_btn = document.createElement("button");
besokt_btn.setAttribute("id","besokt_btn");
besokt_btn.textContent = "Besökt";
besokt_btn.addEventListener("click",saveTown(townId));
div_info.appendChild(besokt_btn);
}

function saveTown(townId){
  
  console.log(townId);
}
