// Set new default font family and font color to mimic Bootstrap's default styling
(Chart.defaults.global.defaultFontFamily = "Nunito"),
  '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = "#858796";

function number_format(number, decimals, dec_point, thousands_sep) {
  // *     example: number_format(1234.56, 2, ',', ' ');
  // *     return: '1 234,56'
  number = (number + "").replace(",", "").replace(" ", "");
  var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = typeof thousands_sep === "undefined" ? "," : thousands_sep,
    dec = typeof dec_point === "undefined" ? "." : dec_point,
    s = "",
    toFixedFix = function (n, prec) {
      var k = Math.pow(10, prec);
      return "" + Math.round(n * k) / k;
    };
  // Fix for IE parseFloat(0.55).toFixed(0) = 0;
  s = (prec ? toFixedFix(n, prec) : "" + Math.round(n)).split(".");
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }
  if ((s[1] || "").length < prec) {
    s[1] = s[1] || "";
    s[1] += new Array(prec - s[1].length + 1).join("0");
  }
  return s.join(dec);
}

let currentLimit = 65;
let data = {
  "username": document.getElementsByName("username")[0].value
}

fetch("http://127.0.0.1:8000/patient/info", {
  method: "POST",
  body: JSON.stringify(data),
  headers: {
    'Content-Type': 'application/json'
  },
}).then(res => res.json())
  .then((data) => {
    if (data.status == "200") {
      const patient = data.info[0].fields
      for (let i in patient) {
        const el = document.querySelector(`#${i}`)
        try {
          el.value = patient[i]
        } catch (e) {
          continue;
        }
      }
    } else {
      document.getElementById("risk").innerText = "Please enter your health details first"
    }
  })

setInterval(() => {

  fetch("http://127.0.0.1:8000/patient/info", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    },
  }).then(res => res.json())
    .then((data) => {
      if (data.status == "200") {
        const patient = data.info[0].fields

        const heartEl = document.getElementById("heartbeats")
        heartEl.innerText = patient.heartbeats

        const bloodEl = document.getElementById("blood_pressure")
        bloodEl.innerText = patient.blood_pressure

        datas = [patient.sex, patient.chestpain, patient.blood_pressure, patient.cholestorol, patient.heartbeats, patient.angina, patient.st_depression, patient.slope, patient.major_vessels, patient.thalassemia]
        fetch("http://127.0.0.1:8000/patient/predict", {
          method: 'POST',
          body: JSON.stringify(datas.concat(document.getElementsByName("username")[0].value)),
          headers: {
            'Content-type': 'application/json'
          }

        }).then(res => res.json()).then(data => {
          console.log(data)
          const date = new Date();
          const label = date.toTimeString().split(" ")[0]
          const value = parseFloat(data)

          // let label = "8:35"
          // let value = 30  
          myLineChart.data.labels.push(label)
          if (myLineChart.data.labels.length > 5) {
            myLineChart.data.labels.shift()
          }
          myLineChart.data.datasets[0].data.push(value)
          if (myLineChart.data.datasets[0].data.length > 5) {
            myLineChart.data.datasets[0].data.shift()
          }
          myLineChart.update();

          if (myLineChart.data.datasets[0].data[4] > 75) {
            const risk = document.getElementById("risk")
            const alert = document.getElementById("alert")
            risk.innerHTML = "HIGH RISK"
            alert.classList.add("alert-danger")
            alert.classList.remove("alert-success")
          } else {
            const risk = document.getElementById("risk")
            const alert = document.getElementById("alert")
            risk.innerHTML = "LOW RISK"
            alert.classList.remove("alert-danger")
            alert.classList.add("alert-success")

          }

        })

      }else{
        document.getElementById("risk").innerText = "Please enter your health details first"
      }
    })

}, 2000)

// setInterval(() => {
//   fetch("http://127.0.0.1:8000/patient/get")
//     .then((res) => res.json())
//     .then((data) => {
//       const values = data.map(el => el.fields).slice(data.length - 10)
//       console.log(values);
//       myLineChart.data.labels = values.map(el => el.label)
//       myLineChart.data.datasets[0].data = values.map(el => el.value) 
//       myLineChart.update();

//       if(myLineChart.data.datasets[0].data[9] > 75){
//         const risk = document.getElementById("risk")
//         const alert = document.getElementById("alert")
//         risk.innerHTML = "HIGH RISK"
//         alert.classList.add("alert-danger")
//         alert.classList.remove("alert-success")
//       }else{
//         const risk = document.getElementById("risk")
//         const alert = document.getElementById("alert")
//         risk.innerHTML = "LOW RISK"
//         alert.classList.remove("alert-danger")
//         alert.classList.add("alert-success")

//       }
//     });
// }, 1000);
// Area Chart Example
var ctx = document.getElementById("myAreaChart");
var myLineChart = new Chart(ctx, {
  type: "line",
  data: {
    labels: ["8:00", "8:10", "8:15", "8:20"],

    datasets: [
      {
        label: "RISK Level",
        lineTension: 0.3,
        backgroundColor: "rgba(78, 115, 223, 0.05)",
        borderColor: "rgba(78, 115, 223, 1)",
        pointRadius: 3,
        pointBackgroundColor: "rgba(78, 115, 223, 1)",
        pointBorderColor: "rgba(78, 115, 223, 1)",
        pointHoverRadius: 3,
        pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
        pointHoverBorderColor: "rgba(78, 115, 223, 1)",
        pointHitRadius: 10,
        pointBorderWidth: 2,
        data: [0, 50, 15, 10],
      },
    ],
  },
  options: {
    maintainAspectRatio: false,
    layout: {
      padding: {
        left: 10,
        right: 25,
        top: 25,
        bottom: 0,
      },
    },
    scales: {
      xAxes: [
        {
          time: {
            unit: "date",
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          ticks: {
            maxTicksLimit: 7,
          },
        },
      ],
      yAxes: [
        {
          ticks: {
            maxTicksLimit: 5,
            padding: 10,
            // Include a dollar sign in the ticks
            callback: function (value, index, values) {
              return number_format(value);
            },
          },
          gridLines: {
            color: "rgb(234, 236, 244)",
            zeroLineColor: "rgb(234, 236, 244)",
            drawBorder: false,
            borderDash: [2],
            zeroLineBorderDash: [2],
          },
        },
      ],
    },
    legend: {
      display: false,
    },
    tooltips: {
      backgroundColor: "rgb(255,255,255)",
      bodyFontColor: "#858796",
      titleMarginBottom: 10,
      titleFontColor: "#6e707e",
      titleFontSize: 14,
      borderColor: "#dddfeb",
      borderWidth: 1,
      xPadding: 15,
      yPadding: 15,
      displayColors: false,
      intersect: false,
      mode: "index",
      caretPadding: 10,
      callbacks: {
        label: function (tooltipItem, chart) {
          var datasetLabel =
            chart.datasets[tooltipItem.datasetIndex].label || "";
          return datasetLabel + " : " + number_format(tooltipItem.yLabel);
        },
      },
    },
  },
});
