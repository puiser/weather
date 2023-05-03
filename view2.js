"use strict";


const createTableItem = (item) => {
  let tableRowItem = document.createElement('tr');
  let tableData1Item = document.createElement('td');
  let tableData2Item = document.createElement('td');
  let tableData3Item = document.createElement('td');

  const date = new Date(item.date_time);

  tableData1Item.innerText = date.toDateString();
  tableData2Item.innerText = date.toLocaleTimeString();
  tableData3Item.innerText = item.temperature;


  tableRowItem.append(tableData1Item);
  tableRowItem.append(tableData2Item);
  tableRowItem.append(tableData3Item);

  return tableRowItem;

}


const fetchData = async () => {
  try {
    const response = await fetch('http://webapi19sa-1.course.tamk.cloud/v1/weather/temperature');
    const data = await response.json();
    console.log(data);
    updateTable(data);
    showForecast(data);
    updateStatistics(data);
  } catch (error) {

  }
}


fetchData();




const showForecast = (data) => {
  console.log(data);
  const temperature = data.map(item => item.temperature);
  const dates = data.map(item => new Date(item.date_time).toDateString());
  console.log(temperature);
  console.log(dates);

  const chartElem = document.getElementById('tempChart');
  chartElem.innerHTML = '';
  const ctx = document.getElementById('tempChart').getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: dates,
      datasets: [{
        label: 'Temperature (Celcius)',
        data: temperature,
        backgroundColor: 'red',
      },
      ]
    },
    options: {
      scales: {
        y: {
          beginAtZero: false
        }
      }
    }
  })
};

function addData(label, data) {
  myChart.data.labels = label;
  myChart.data.datasets[0].forEach((dataset) => {
    dataset.data = data;
  });
  myChart.update();
}



const updateStatistics = (data) => {
  const temperature = data.map(item => item.temperature);
  const avg = mean(temperature);
  const med = median(temperature);
  const mod = mode(temperature);
  const rang = range(temperature);
  const dev = deviation(temperature);


  const meanli = document.getElementById('mean');
  meanli.innerText = 'Mean: ' + avg;

  const medianli = document.getElementById('median');
  medianli.innerText = 'Median: ' + med;

  const modeli = document.getElementById('mode');
  modeli.innerText = 'Mode: ' + mod;

  const rangeli = document.getElementById('range');
  rangeli.innerText = 'Range: ' + rang[0] + " - " + rang[1];

  const deviationli = document.getElementById('deviation');
  deviationli.innerText = 'Standard deviation: ' + dev;

}

const fetchHourlyData = async (w, h) => {
  try {
    const response = await fetch('http://webapi19sa-1.course.tamk.cloud/v1/weather/' + w + '/' + h);
    const data = await response.json();
    updateTable(data);
    updateStatistics(data);
    const chartLabels = data.map(item => new Date(item.date_time).toDateString());
    const chartData = data.map(item => item.temperature);
    addData(chartLabels, chartData);
  } catch (error) {

  }
}

const updateTable = (data) => {
  let tableBody = document.getElementById('tableBody')
  tableBody.innerHTML = '';
  data.map((item) => {
    let tableItem = createTableItem(item);
    tableBody.append(tableItem);
  });
}
