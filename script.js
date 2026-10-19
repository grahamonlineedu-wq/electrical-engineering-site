// Initialize Analytics Bar Chart
const ctxBar = document.getElementById('trafficBarChart').getContext('2d');
new Chart(ctxBar, {
  type: 'bar',
  data: {
    labels: ['Day 1', 'Day 3', 'Day 5', 'Day 7', 'Day 9', 'Day 11', 'Day 13', 'Day 15', 'Day 17', 'Day 19', 'Day 21', 'Day 23', 'Day 25', 'Day 27', 'Day 29', 'Day 31'],
    datasets: [{
      label: 'Site Traffic',
      data: [120, 190, 300, 250, 420, 310, 480, 520, 390, 610, 450, 700, 580, 810, 690, 920],
      backgroundColor: '#ff6b35',
      borderRadius: 4
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#94a3b8' } },
      y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#94a3b8' } }
    }
  }
});

// Initialize Device Pie Chart
const ctxPie = document.getElementById('devicePieChart').getContext('2d');
new Chart(ctxPie, {
  type: 'doughnut',
  data: {
    labels: ['Mobile Phone', 'Desktop / Laptop', 'Tablet'],
    datasets: [{
      data: [55, 35, 10],
      backgroundColor: ['#ff6b35', '#10b981', '#3b82f6'],
      borderWidth: 0
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: { color: '#94a3b8', boxWidth: 12 }
      }
    }
  }
});

function openArticleModal() {
  alert("CMS Article Editor Modal: Connect to your Neon PostgreSQL database URL to save live posts!");
}
