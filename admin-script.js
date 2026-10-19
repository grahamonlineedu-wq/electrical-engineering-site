const ctxBar = document.getElementById('barChart').getContext('2d');
new Chart(ctxBar, {
  type: 'bar',
  data: {
    labels: Array.from({length: 31}, (_, i) => `Day ${i + 1}`),
    datasets: [{
      label: 'Visits',
      data: [120, 150, 190, 140, 220, 250, 310, 280, 410, 290, 320, 370, 390, 420, 350, 480, 410, 520, 430, 610, 500, 650, 590, 720, 640, 810, 700, 890, 450, 520, 480],
      backgroundColor: '#ff521b',
      borderRadius: 4,
      barThickness: 6
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { display: false }, ticks: { color: '#8899a6', font: { size: 10 } } },
      y: { grid: { color: '#182545' }, ticks: { color: '#8899a6', font: { size: 10 } } }
    }
  }
});

const ctxPie = document.getElementById('pieChart').getContext('2d');
new Chart(ctxPie, {
  type: 'doughnut',
  data: {
    labels: ['Mobile Phone', 'Desktop / Laptop', 'Tablet'],
    datasets: [{
      data: [40, 40, 20],
      backgroundColor: ['#ff521b', '#10b981', '#3b82f6'],
      borderWidth: 0
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '75%',
    plugins: { legend: { display: false } }
  }
});
