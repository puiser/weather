"use strict";

let weather = "";
let timeSpan = "";
const setWeather = (data) => {
   weather = data;
   const dropDown = document.getElementById("dropdownMenu1");
   switch(data) {
    case "temperature" : 
        dropDown.innerText = "Temperature";
    break;
    case "wind_speed" :
        dropDown.innerText = "Wind";
    break;
    default: 
    dropDown.innerText = "Select the measurement";
   }
   if(weather !== "" && timeSpan.toString() == "0") {
    fetchData(weather)
   }
   else if (timeSpan.toString() !== "0" && weather !=="") {
    console.log("object");
    fetchHourlyData (weather, timeSpan)
   }
}

const setTimeSpan = (i) => {
    timeSpan = "";
    timeSpan = i.toString();
    const dropDown = document.getElementById("dropdownMenu2");
    switch(i) {
        case "0" : 
            dropDown.innerText = "Now";
        break;
        case "24" :
            dropDown.innerText = "24 hours";
        break;
        case "72" :
            dropDown.innerText = "72 hours";
        break;
        case "168" :
            dropDown.innerText = "1 week";
        break;
        case "720" :
            dropDown.innerText = "Last month";
        break;
        default: 
        dropDown.innerText = "Select the time span";
       }
    console.log(weather);
    console.log(timeSpan);
    if(weather !== "" && (timeSpan.toString() === "0" || typeof(timeSpan)===undefined)) {
        fetchData(weather)
    }
    else if (timeSpan.toString() !== "0" && weather !=="") {
        console.log("hei");
        fetchHourlyData(weather, timeSpan)
    }
}

const createTableItem = (item,w) => {
    let tableRowItem = document.createElement('tr');
    let tableData1Item = document.createElement('td');
    let tableData2Item = document.createElement('td');
    let tableData3Item = document.createElement('td');
    

  
    const date = new Date(item.date_time);
  
    tableData1Item.innerText = date.toDateString();
    tableData2Item.innerText = date.toLocaleTimeString();
    if (w == "temperature") {
        tableData3Item.innerText = item.temperature;
    } 
    else if (w== "wind_speed") {
        tableData3Item.innerText = item.wind_speed;
    }
  
  
    tableRowItem.append(tableData1Item);
    tableRowItem.append(tableData2Item);
    tableRowItem.append(tableData3Item);
  
    return tableRowItem;
  
  }


const fetchData = async (w) => {
    let tableBody = document.getElementById('tableBody')
    try {
        const response = await fetch('http://webapi19sa-1.course.tamk.cloud/v1/weather/' + w);
        const data = await response.json();
        console.log(data);
        updateTable(data,w)
    } catch (error) {
        console.log(error);
    }
}


const fetchHourlyData = async (w, h) => {
    try {
        const response = await fetch('http://webapi19sa-1.course.tamk.cloud/v1/weather/' + w + '/' + h);
        const data = await response.json();
        updateTable(data,w);
    } catch (error) {
        console.log(error);
    }
}


const updateTable = (data,w) => {
    let tableBody = document.getElementById('tableBody')
    tableBody.innerHTML = '';
    data.map((item) => {
        let tableItem = createTableItem(item,w);
        tableBody.append(tableItem);
    });
}

