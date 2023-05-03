"use strict";

const createTableItem = (item) => {
    let tableRowItem = document.createElement('tr');
    let tableData1Item = document.createElement('td'); 
    let tableData2Item = document.createElement('td'); 
    let tableData3Item = document.createElement('td');

    const date = new Date(item.date_time);

    tableData1Item.innerText = date.toDateString();
    tableData2Item.innerText = date.toLocaleTimeString();
    tableData3Item.innerText = item.humidity_out;


tableRowItem.append(tableData1Item);
tableRowItem.append(tableData2Item);
tableRowItem.append(tableData3Item);

return tableRowItem;

}


const fetchData = async() => {
    let tableBody = document.getElementById('tableBody')
    tableBody.innerHTML = '';
    try {
        const response = await fetch('http://webapi19sa-1.course.tamk.cloud/v1/weather/humidity_out');
        const data = await response.json();
        data.map((item) => {
            let tableItem = createTableItem(item);
            tableBody.append(tableItem);
        });
    } catch (error) {
        
    }
}


fetchData();


const showForecast = (data) => {
  const humidity_out = data.map(item => item.humidity_out);
  const dates = data.map(item => new Date(item.date_time).toDateString());

  
  const ctx = document.getElementById('humChart').getContext('2d');
  const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: dates,
      datasets: [{
        label: 'Humidity out',
        data: humidity_out,
        backgroundColor: 'blue',
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

const fetchWeather = async () => {
try {
    const response = await fetch(
      'http://webapi19sa-1.course.tamk.cloud/v1/weather/humidity_out'
        );
        const data = await response.json();
        showForecast(data);
        updateStatistics(data);


} catch (error) {
}

}

fetchWeather();


const updateStatistics = (data) => {
  const humidity_out = data.map(item => item.humidity_out);
  const avg = mean(humidity_out);
  const med = median(humidity_out);
  const mod = mode(humidity_out);
  const rang = range(humidity_out);
  const dev = deviation(humidity_out);


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

const fetchHourlyData = async(w,h) => {
  let tableBody = document.getElementById('tableBody')
  tableBody.innerHTML = '';
  try {
      const response = await fetch('http://webapi19sa-1.course.tamk.cloud/v1/weather/' + w + '/'+ h);
      const data = await response.json();
      data.map((item) => {
          let tableItem = createTableItem(item);
          tableBody.append(tableItem);
      });
  } catch (error) {
      
  }
}


fetchHourlyData();
