document.addEventListener('turbolinks:load', () => {
   let lineLabel = gon.chart_label
   let lineData = gon.chart_data
    


    const lineChartData = {
      labels: lineLabel,
      datasets: [{
        label: '体重(kg)',
        data: lineData,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        spanGaps: true
      }]
    }

    const lineChartOption = {
      title: {
        display: true,
        text: '折れ線グラフ'
      },
      tooltips: {
        callbacks: {
          title: function (tooltipItems) {
            return tooltipItems[0].xLabel.replace(/^(\d+).(\d+)$/, ' $1 月 $2 日')
          },
          label: function (tooltipItem) {
            return '体重: ' + tooltipItem.yLabel + 'kg'
          }
        }
      }
    }

    const lineChartContext = document.getElementById("line-chart").getContext('2d')
    new Chart(lineChartContext, {
      type: 'line',
      data: lineChartData,
      options: lineChartOption
    
})