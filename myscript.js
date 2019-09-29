
  var land = document.getElementById("land");
  var finland = document.getElementById("finland");
  var norge = document.getElementById("norge");
  var stad_s = document.getElementById("stad_s"); 
  var stad_f = document.getElementById("stad_f");
  var stad_n = document.getElementById("stad_n");
  var link = document.createElement("a");
  link.setAttribute("href","#");
  link.textContent="Städer jag besökt";
  land.insertAdjacentElement("afterend",link);
  var div_info = document.createElement("div");
  var besokt_btn = document.createElement("button");
  besokt_btn.setAttribute("id","besokt_btn");
  besokt_btn.textContent="Besökt";
  div_info.appendChild(besokt_btn);
  link.insertAdjacentElement("afterend",div_info);

  

  function createNode(element){
      return document.createElement(element);
  }
  function append(parent,el){
      return parent.appendChild(el);
  }
  
  fetch("land.json")
   .then( 
    function(response){
        return response.json();
    })
    .then(
      function(country){ 
          console.log("request saccesful", country);       
         
          for(i=0; i< country.length;i++ ){
              console.log(country[i].countryname)
          document.getElementById("sverige").innerHTML=country[0].countryname;
          document.getElementById("finland").innerHTML=country[1].countryname;
          document.getElementById("norge").innerHTML=country[2].countryname;}                
         
         
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
          town.sort(function (a, b) {
            return a.countryid - b.countryid});
            var li_line="";
            for(var i=0;i<town.length;i++){
                if(town[i].countryid===1){
             li_line+="<li class=`stad` onclick=`functionOpen()`>"+town[i].stadname+"</li>"
                }
                
            }
            stad_s.innerHTML=li_line; 
         
        console.log(town);
        console.log(li_line);
         
          /*for(i=0; i< town.length;i++ ){
              console.log(town[i])
              var x = town[i].countryid;
              switch(x){
                  case 1:
              var sverige = document.getElementById("sverige"); 
              let li3 = createNode('li');             
              span3 = createNode('span');
              span3.innerHTML = `<br/> ${town[i].stadname}`; 
              append(li3, span3);
              append(stad_s, li3);
              append(sverige, stad_s); 
              console.log(li3);
              li3.addEventListener("click",function(){
                  for(var i=0;i<town.length;i++)                  
                  {document.getElementById("info").innerHTML=`<br/> ${town[i].stadname}<br/> ${town[i].population}`;}
                                })
              
                  

                      break;
                  case 2:            
              let li1 = createNode('li');             
              span1 = createNode('span');
              span1.innerHTML = `<br/> ${town[i].stadname}`; 
              append(li1, span1);
              append(stad_f, li1);
              append(finland, stad_f);        
                      break;        
                  case 3:
               let li2 = createNode('li'),
              span2 = createNode('span');
              span2.innerHTML = `<br/> ${town[i].stadname}`; 
              append(li2, span2);
              append(stad_n, li2);
              append(norge, stad_n);        
                      break;
              }  */       
                  
              
             } )
    
  .catch(
  function(error){
      console.log("request filed", error);
  })

  sverige.addEventListener("click",function(){
      if(stad_s.style.display==="none"){
          stad_s.style.display="block";}else{stad_s.style.display="none";}
      })
      finland.addEventListener("click",function(){
        if(stad_f.style.display==="none"){
            stad_f.style.display="block";}else{stad_f.style.display="none";}
        })
    norge.addEventListener("click",function(){
            if(stad_f.style.display==="none"){
                stad_f.style.display="block";}else{stad_f.style.display="none";}
            })
                    
 
 
 
    
       
