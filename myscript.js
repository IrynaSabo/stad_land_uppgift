 
  /*var link = document.createElement("a");
  link.setAttribute("href","#");
  link.textContent="Städer jag besökt";
  land.insertAdjacentHTML("afterend",link);
  var div_info = document.createElement("div");
  var besokt_btn = document.createElement("button");
  besokt_btn.setAttribute("id","besokt_btn");
  besokt_btn.textContent="Besökt";
  div_info.appendChild(besokt_btn);
  link.insertAdjacentElement("afterend",div_info);*/

   
  
  fetch("land.json")
   .then( 
    function(response){
        return response.json();
    })
    .then(
        function(country){ 
            console.log("request saccesful",country); 
            showCountry(country); 
            function showCountry(){   
                var land = document.getElementById("land");  
                for(i = 0; i<country.length;i++)  
                {land.insertAdjacentHTML("beforeend","<li id=`C_` onclick=`printSities()`>" + country[i].countryname+"</li>");}
            }        
                
               })
      
     
  .catch(
  function(error){
      console.log("request filed", error);
  }) 
  

  fetch("stad.json")
   .then( 
    function(response){
        return response.json();
    })
    .then(
      function(town){ 
          console.log("request saccesful",town); 
          printSities(town);               
           })
    
  .catch(
  function(error){
      console.log("request filed", error);
  })
  
  function printSities(){
    var p_stad=document.createElement("p");  
   for (j=0; j<town.length; j++){
    if(town[j].countryid===country[i].countryid){
       p_stad.insertAdjacentHTML("beforeend","<li id=`L_` onclick=`showTown()`>" + town[j].stadname + "</li>") 
    }
}
} 
function showTown(x){
console.log(x);
}

  
                    
 
 
 
    
       
