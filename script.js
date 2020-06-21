function dataEater() {

    USANationalData = dataGrabber("https://covidtracking.com/api/v1/us/daily.json");
    console.log(USANationalData);

    renderUSNationwideTotalCases(USANationalData);

}

function dataGrabber(dataAPILink) {

    fetch(dataAPILink).then(r=>r.json()).then(data=>{
    
        return data;

  });

}

var chart;

function renderUSNationwideTotalCases(data) {

    console.log(data);
    renderTimeVsDualYAxisGraph(generateTotalCasesGraphData(data), generateActiveCasesGraphData(data), "US National Total and Active Cases", "USNationalChart", "Number of Cases", "Total Cases", "Active Cases");

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

function renderTimeVsDualYAxisGraph(yData1, yData2, chartTitle, chartName, yAxisTitle, yData1Name, yData2Name) {

    chart = new CanvasJS.Chart(chartName, {
        animationEnabled: true,
        zoomEnabled: true,
        theme: "light2",
        title:{
            text: chartTitle
        },
        axisX:{
            valueFormatString: "DD MMM",
            crosshair: {
                enabled: true,
                snapToDataPoint: true
            }
        },
        axisY: {
            title: yAxisTitle,
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
            name: yData1Name,
            markerType: "square",
            xValueFormatString: "DD MMM, YYYY",
            color: "#F08080",
            dataPoints: yData1
        },
        {
            type: "line",
            showInLegend: true,
            name: yData2Name,
            lineDashType: "dash",
            dataPoints: yData2
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

function loadNationalPage() {

    document.getElementById("detailedPage").style.display = "block";
    document.getElementById("stateOverview").style.display = "none";

}

function loadStatesPage() {

    document.getElementById("detailedPage").style.display = "none";
    document.getElementById("stateOverview").style.display = "block";

}

function fillStateOverviewTable() {

    //stuff

}