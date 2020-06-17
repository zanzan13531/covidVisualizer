function dataEater() {

    fetch("https://covidtracking.com/api/v1/us/daily.json").then(r=>r.json()).then(data=>{
        //this gets called when the data is there

        /*
          for (var i = 0; i < data.length; i++) {

            var s = data[i]["date"]+"";
data[i]["date"] = new Date(s.substring(0,4), s.substring(4,6), s.substring(6, 8));

          }
          */
          /*
          var dataTestDiv = document.createElement("div");

          for (var i = 0; i < data.length; i++) {
              
              var newContent = document.createTextNode(data[i]["date"]); 
              // add the text node to the newly created div
              dataTestDiv.appendChild(newContent);
          }

          document.body.appendChild(dataTestDiv);
          */

          renderUSNationwideTotalCases(data);
  });

}

var chart;

function renderUSNationwideTotalCases(data) {

    chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        theme: "light2",
        title:{
            text: "US Nationwide Total Cases"
        },
        axisX:{
            valueFormatString: "DD MMM",
            crosshair: {
                enabled: true,
                snapToDataPoint: true
            }
        },
        axisY: {
            title: "Number of Cases",
            crosshair: {
                enabled: true
            }
        },
        toolTip:{
            shared:true
        },  
        legend:{
            cursor:"pointer",
            verticalAlign: "bottom",
            horizontalAlign: "left",
            dockInsidePlotArea: true,
            itemclick: toogleDataSeries
        },
        data: [{
            type: "line",
            showInLegend: true,
            name: "Total Cases",
            markerType: "square",
            xValueFormatString: "DD MMM, YYYY",
            color: "#F08080",
            dataPoints: generateTotalCasesGraphData(data)
        },
        {
            type: "line",
            showInLegend: true,
            name: "Active Cases",
            lineDashType: "dash",
            dataPoints: generateActiveCasesGraphData(data)
        }]
    });
    chart.render();

}

function toogleDataSeries(e){
	if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
		e.dataSeries.visible = false;
	} else{
		e.dataSeries.visible = true;
	}
	chart.render();
}


function generateTotalCasesGraphData(data) {

    var convertedData = [];

    for (var i = (data.length - 1); i >= 0; i--) {
        
        var s = data[i]["date"] + "";
        //data[i]["date"] = new Date(s.substring(0,4), s.substring(4,6), s.substring(6, 8));

        var tempStorage = {x : new Date(s.substring(0,4), s.substring(4,6) - 1, s.substring(6,8)), y : data[i]["positive"]}

        convertedData.push(tempStorage);

    }

    return convertedData;

}

function generateActiveCasesGraphData(data) {

    var convertedData = [];

    for (var i = (data.length - 1); i >= 0; i--) {
        
        var s = data[i]["date"] + "";
        //data[i]["date"] = new Date(s.substring(0,4), s.substring(4,6), s.substring(6, 8));

        var tempStorage = {x : new Date(s.substring(0,4), s.substring(4,6) - 1, s.substring(6,8)), y : data[i]["positive"] - data[i]["recovered"]}

        convertedData.push(tempStorage);

    }

    //console.log(convertedData);
    return convertedData;

}