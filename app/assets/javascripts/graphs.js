document.addEventListener('turbolinks:load', () => {
  
  const convertDate = (date) => new Date(new Date(date).setHours(0, 0, 0, 0))

  const TODAY = convertDate(new Date())
  const A_WEEK_AGO = new Date(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate() - 6)
  const TWO_WEEKS_AGO = new Date(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate() - 13)
  const A_MONTH_AGO = new Date(TODAY.getFullYear(), TODAY.getMonth() - 1, TODAY.getDate() + 1)
  const THREE_MONTHS_AGO = new Date(TODAY.getFullYear(), TODAY.getMonth() - 3, TODAY.getDate() + 1)

  const chartWeightContext = document.getElementById("chart-weight").getContext('2d')

 
  const drawGraph = (from, to) => {
   
    let records = gon.weight_records.filter((record) => {
      let date = convertDate(record.date)
      return from <= date && date <= to
    })

    
    let dates = records.map((record) => {
      
      return record.date.replace(/^\d+-0*(\d+)-0*(\d+)$/, '$1/$2')
    })

    
    let weights = records.map((record) => record.weight)

    let weightData = {
      labels: dates,
      datasets: [{
        label: '体重(kg)',
        data: weights,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        spanGaps: true
      }]
    }

    let weightOption = {
      tooltips: {
        callbacks: {
          // ホバー（スマホならタップ）時のラベル表示を変更
          title: function (tooltipItems) {
            return tooltipItems[0].xLabel.replace(/^(\d+).(\d+)$/, ' $1 月 $2 日')
          },
          label: function (tooltipItem) {
            return '体重: ' + tooltipItem.yLabel + 'kg'
          }
        }
      }
    }

    new Chart(chartWeightContext, {
      type: 'line',
      data: weightData,
      options: weightOption
    })
  }

  // グラフの初期表示
  drawGraph(A_WEEK_AGO, TODAY)
})