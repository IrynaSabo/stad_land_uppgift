 
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
       dropdown.add(option);}
       
        fetch("stad.json")
       .then(response=>response.json())
       .catch(error=>console.log(error))
       .then(town=>{ 
              console.log(town);  
          
              let stad;           
          for(i=0; i<country.length;i++) { 
             // let ul_stader = document.createElement("ul");

             var cityList = document.getElementById("cityList");
             

             for(j=0; j<town.length; j++){
             
              if(town[j].countryid===country[i].id){
            //  stad = document.createElement("li");
            //  stad.textContent = town[j].stadname;
            //  dropdown.insertAdjacentHTML("afterend",stad);}}
            //  stad.addEventListener("click",showInfo());

            
            cityList.insertAdjacentHTML("beforeend", "<button onClick='showCity("+town[j].id+")'>"+ town[j].stadname+"</button>" );
            
            }
            
          }
         
        }

        function showCity(cityId) {
          console.log(cityId);
        };
          
            function showInfo() {
             let  div_info = document.getElementById("info");
                let text, besokt_btn;                    
                for(j=0; j<town.length; j++){                 
                 besokt_btn = document.createElement("button");
                besokt_btn.textContent = "Besökt" ;
                div_info.insertAdjacentHTML("beforeend", besokt_btn);
                stad.insertAdjacentHTML("afterend",div_info);    
                 text+= "<br/>" + town[j].stadname + " har " + town[j].population + " invånare."
                }
                div_info.textContent=text;}
            
              })        
       
    })
