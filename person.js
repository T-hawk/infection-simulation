class Person {
  constructor(quarentined = false, infected = false) {
    this.position = createVector(random(0, 500), random(0, 500))
    this.velocity = p5.Vector.random2D()
    this.speed = 0.5
    this.w = 10
    this.quarentined = quarentined

    this.time = 0

    if (infected) {
      this.state = "INFECTED"
    } else {
      this.state = "HEALTHY"
    }
  }

  move() {
    const recovery = 200
    if (this.state == "INFECTED") {
      this.time += 0.1
    }
    if (!this.quarentined) {
      this.position = p5.Vector.add(this.position, p5.Vector.mult(this.velocity, this.speed))
      if (this.position.x + this.w / 2 > 500 || this.position.x - this.w / 2 < 0) {
        this.velocity.x = -this.velocity.x
      }
      if (this.position.y + this.w / 2 > 500 || this.position.y - this.w / 2 < 0) {
        this.velocity.y = -this.velocity.y
      }
    }
    if (this.time > recovery) {
      this.state = "RECOVERED"
    }
  }

  show() {
    if (this.state == "HEALTHY") {
      fill(10, 230, 40, 100)
    } else if (this.state == "INFECTED") {
      fill(230, 0, 40, 100)
    } else if (this.state == "RECOVERED") {
      fill(0, 40, 230, 100)
    }

    noStroke()

    ellipse(this.position.x, this.position.y, this.w)
  }

  collide(other) {
    if (this.state == "INFECTED" || other.state == "INFECTED"){
      if (this.position.dist(other.position) < this.w) {
        other.state = "INFECTED"
        this.state = "INFECTED"
      }
    }
  }
}