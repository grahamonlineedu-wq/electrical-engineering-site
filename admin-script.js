// Bar Chart Setup
const ctxBar = document.getElementById('barChart').getContext('2d');
new Chart(ctxBar, {
  type: 'bar',
  data: {
    labels: Array.from({length: 31}, (_, i) => i + 1),
    datasets: [{
      label: 'Site Visits',
      data: [120, 150, 180, 130, 210, 240, 290, 310, 280, 350, 390, 420, 380, 220, 210, 240, 280, 310, 360, 390, 410, 370, 330, 290, 250, 220, 210, 190, 180, 160, 140],
      backgroundColor: '#ff521b',
      borderRadius: 3,
      barThickness: 6
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { display: false }, ticks: { color: '#64748b', font: { size: 10 } } },
      y: { grid: { color: '#182545' }, ticks: { color: '#64748b', font: { size: 10 } } }
    }
  }
});

// Pie Chart Setup
const ctxPie = document.getElementById('pieChart').getContext('2d');
new Chart(ctxPie, {
  type: 'doughnut',
  data: {
    labels: ['Computer / Laptop', 'Telephone', 'Tablet'],
    datasets: [{
      data: [40, 40, 20],
      backgroundColor: ['#ff521b', '#ff7849', '#ffa07a'],
      borderWidth: 0
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '70%',
    plugins: { legend: { display: false } }
  }
});
