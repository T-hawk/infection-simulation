var population = []

var ctx = document.getElementById('chart').getContext('2d');
var data = [1, 100, 0]

var myChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      datasets: [{data: data}],
      labels: ["Healthy", "Infected", "Recovered"],
      backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f"]
    },
    options: {
      title: {
        display: true,
        text: 'Virus infection'
      }
    }
});

function postData(i, h, r) {
  data = [i, h, r]
}

function setup() {
  createCanvas(500, 500)

  for (let i = 0; i <= 100; i++) {
    if (i == 1) {
      population.push(new Person(false, true))
    } else if (i < 75){
      population.push(new Person(true))
    } else {
      population.push(new Person())
    }
  }
}

function draw() {
  background(65)
  myChart.data = {
      datasets: [{
        data: data,
        backgroundColor: ["rgb(10, 230, 40)", "rgb(230, 0, 40)", "rgb(0, 40, 230)"]
      }],
      labels: ["Healthy", "Infected", "Recovered"],
  }
  myChart.update(0)
  var infected = []
  var healthy = []
  var recovered = []


  for (let i = 0; i < population.length; i++) {
    for (let j = 0; j < population.length; j++) {
      population[i].collide(population[j])
    }
    switch(population[i].state) {
      case "INFECTED":
        infected.push(population[i])
        break
      case "HEALTHY":
        healthy.push(population[i])
        break
      case "RECOVERED":
        recovered.push(population[i])
        break
    }
    population[i].show()
    population[i].move()
  }

  postData(healthy.length, infected.length, recovered.length)
  document.getElementById("infected").innerHTML = "Infected: " + infected.length
  document.getElementById("healthy").innerHTML = "Healthy: " + healthy.length
  document.getElementById("recovered").innerHTML = "Recovered: " + recovered.length
}