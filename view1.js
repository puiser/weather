"use strict";

const createTableItem = (item) => {
    let tableRowItem = document.createElement('tr');
    let tableData1Item = document.createElement('td'); 
    let tableData2Item = document.createElement('td'); 
    let tableData3Item = document.createElement('td');

    const date = new Date(item.date_time);

    tableData1Item.innerText = date.toString();
    tableData2Item.innerText = Object.keys(item.data)[0];
    tableData3Item.innerText = item.data[Object.keys(item.data)[0]];


tableRowItem.append(tableData1Item);
tableRowItem.append(tableData2Item);
tableRowItem.append(tableData3Item);

return tableRowItem;

}


const fetchData = async() => {
    let tableBody = document.getElementById('tableBody')
    try {
        const response = await fetch('http://webapi19sa-1.course.tamk.cloud/v1/weather/limit/50');
        const data = await response.json();
        console.log(data);
        data.map((item) => {
            let tableItem = createTableItem(item);
            tableBody.append(tableItem);
        });
    } catch (error) {
        
    }
}


fetchData();