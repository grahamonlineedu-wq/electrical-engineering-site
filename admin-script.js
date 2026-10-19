const ctxBar = document.getElementById('trafficBarChart').getContext('2d');
new Chart(ctxBar, {
  type: 'bar',
  data: {
    labels: ['Day 1', 'Day 3', 'Day 5', 'Day 7', 'Day 9', 'Day 11', 'Day 13', 'Day 15'],
    datasets: [{
      label: 'Site Traffic',
      data: [120, 190, 300, 250, 420, 310, 480, 520],
      backgroundColor: '#ff6b35',
      borderRadius: 4
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: { ticks: { color: '#94a3b8' } },
      y: { ticks: { color: '#94a3b8' } }
    }
  }
});

const ctxPie = document.getElementById('devicePieChart').getContext('2d');
new Chart(ctxPie, {
  type: 'doughnut',
  data: {
    labels: ['Mobile Phone', 'Desktop', 'Tablet'],
    datasets: [{
      data: [60, 30, 10],
      backgroundColor: ['#ff6b35', '#10b981', '#3b82f6'],
      borderWidth: 0
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: 'bottom', labels: { color: '#94a3b8' } } }
  }
});
