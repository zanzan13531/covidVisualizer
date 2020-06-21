var stateInformationJson = {
    "al":"Alabama",
    "ak":"Alaska",
    "az":"Arizona",
    "ar":"Arkansas",
    "ca":"California",
    "co":"Colorado",
    "ct":"Connecticut",
    "de":"Delaware",
    "fl":"Florida",
    "ga":"Georgia",
    "hi":"Hawaii",
    "id":"Idaho",
    "il":"Illinois",
    "in":"Indiana",
    "ia":"Iowa",
    "ks":"Kansas",
    "ky":"Kentucky",
    "la":"Louisiana",
    "me":"Maine",
    "md":"Maryland",
    "ma":"Massachusetts",
    "mi":"Michigan",
    "mn":"Minnesota",
    "ms":"Mississippi",
    "mo":"Missouri",
    "mt":"Montana",
    "ne":"Nebraska",
    "nv":"Nevada",
    "nh":"New Hampshire",
    "nj":"New Jersey",
    "nm":"New Mexico",
    "ny":"New York",
    "nc":"North Carolina",
    "nd":"North Dakota",
    "oh":"Ohio",
    "ok":"Oklahoma",
    "or":"Oregeon",
    "pa":"Pennsylvania",
    "ri":"Rhode Island",
    "sc":"South Carolina",
    "sd":"South Dakota",
    "tn":"Tennessee",
    "tx":"Texas",
    "ut":"Utah",
    "vt":"Vermont",
    "va":"Virginia",
    "wa":"Washington",
    "wv":"West Virginia",
    "wi":"Wisconsin",
    "wy":"Wyoming",
};

function dataEater() {

    dataGrabber("https://covidtracking.com/api/v1/us/daily.json");

}

function dataGrabber(dataAPILink) {

    fetch(dataAPILink).then(r=>r.json()).then(data=>{
        
        renderUSNationwideTotalCases(data);

  });

}

var chart;

function renderUSNationwideTotalCases(data) {

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

    var stateOverviewTable = document.getElementById("stateOverviewTable");
    var stateOverviewTableRows = [];
    for (var q = 0; q < 10; q++) {

        stateOverviewTableRows.push(stateOverviewTable.insertRow(q));

        for (var p = 0; p < 5; p++) {

            stateOverviewTableRows[q].insertCell(p);

        }

    }

}

