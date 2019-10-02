 
let dropdown = document.getElementById("country_dropdown");
 dropdown.length=0;
 

 let defaultOption = document.createElement("option");
 defaultOption.textContent = "Välj ett land";
 dropdown.add(defaultOption);
 dropdown.selectedIndex = 0;

  fetch("land.json")
   .then(response=>response.json())
   .catch(error=>console.log(error))
   .then(country=>{
       console.log(country);
       let option;
       for(let i=0; i<country.length;i++){
       option = document.createElement("option");
       option.textContent = country[i].countryname;
       option.value = country[i].id;
       option.addEventListener("click",showStad());
       dropdown.add(option);
       
       }
       fetch("stad.json")
       .then(response=>response.json())
       .catch(error=>console.log(error))
       .then(town=>{ 
              console.log(town); 
              function showStad()
           {let landId=document.getElementById("country_dropdown").value;       
           let stad;
           for(j=0; j<town.length; j++){
             if(town[j].countryid===landId){
             stad = document.createElement("li");
             stad.textContent = town[j].stadname;
             dropdown.insertAdjacentHTML("afterend",stad);
             stad.addEventListener("click",showInfo());}
            function showInfo() {
                let text;
                let div_info = document.createElement("div"); 
                let besokt_btn = document.createElement("button");
                besokt_btn.textContent = "Besökt" ;
                div_info.insertAdjacentHTML("beforeend", besokt_btn);
                stad.insertAdjacentHTML("afterend",div_info);           
                for(j=0; j<town.length; j++){
                 text+= "<br/>" + town[j].stadname + " har " + town[j].population + " invånare."
                }
                div_info.textContent=text;
            }
           }}         
      })  
    })
