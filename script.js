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

var chart;

var stateAbbreviations = [];
var stateNames = [];
for (var key in stateInformationJson) {
    stateAbbreviations.push(key);
    stateNames.push(stateInformationJson[key]);
}

function USNationalChartGenerator() {

    dataGrabber("https://covidtracking.com/api/v1/us/daily.json", "US National Total and Active Cases", "USNationalChart", "Number of Cases", "Total Cases", "Active Cases", false);

}

function dataGrabber(dataAPILink, chartTitle, chartName, yAxisTitle, yData1Name, yData2Name, isOverview) {

    fetch(dataAPILink).then(r=>r.json()).then(data=>{
        if (isOverview) {

            renderTimeVsDualYAxisGraphForOverview(generateTotalCasesGraphData(data), generateActiveCasesGraphData(data), chartTitle, chartName, yAxisTitle, yData1Name, yData2Name);

        } else {

            renderTimeVsDualYAxisGraph(generateTotalCasesGraphData(data), generateActiveCasesGraphData(data), chartTitle, chartName, yAxisTitle, yData1Name, yData2Name);

        }
  });

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

function renderTimeVsDualYAxisGraphForOverview(yData1, yData2, chartTitle, chartName, yAxisTitle, yData1Name, yData2Name) {

    chart = new CanvasJS.Chart(chartName, {
        animationEnabled: true,
        zoomEnabled: true,
        theme: "light2",
        height: 200,
        width: 450,
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

    var counter = 0;
    var stateOverviewTable = document.getElementById("stateOverviewTable");
    var stateOverviewTableRows = [];
    var stateOverviewTableCells = [];
    for (var q = 0; q < 17; q++) {

        stateOverviewTableRows.push(stateOverviewTable.insertRow(q));

        for (var p = 0; p < 3; p++) {

            counter++;
            if (counter > 50) {
                break;
            }
            stateOverviewTableCells.push(stateOverviewTableRows[q].insertCell(p));
            var chartHolder = document.createElement("div");
            var stateNumber = (q * 3) + p;
            var stateAbbreviation = stateAbbreviations[stateNumber]
            var stateChartName = stateAbbreviation + "chart";
            chartHolder.style.height = "200px";
            chartHolder.style.width = "30%";
            chartHolder.style.margin = "auto";
            chartHolder.id = stateChartName;
            stateOverviewTableCells[stateNumber].appendChild(chartHolder);
            var dataAPILinkForState = "https://covidtracking.com/api/v1/states/" + stateAbbreviation + "/daily.json";
            var stateChartTitle = stateNames[stateNumber] + " Total and Active Cases";
            dataGrabber(dataAPILinkForState, stateChartTitle, stateChartName, "Number of Cases", "Total Cases", "Active Cases", true);

        }

    }

}