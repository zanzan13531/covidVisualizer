function dataEater() {

    fetch("https://covidtracking.com/api/v1/us/daily.json").then(r=>r.json()).then(data=>{
        //this gets called when the data is there

          for (var i = 0; i < data.length; i++) {

            data[i]["date"] = new Date(data[i]["date"].substring(0,4), data[i]["date"].substring(4,6), data[i]["date"].substring(6, 8));

          }

          var dataTestDiv = document.createElement("div");

          for (var i = 0; i < data.length; i++) {
              
              var newContent = document.createTextNode(data[i]["date"]); 
              // add the text node to the newly created div
              dataTestDiv.appendChild(newContent);
          }

          document.body.appendChild(dataTestDiv);
  });

}