// Illusione di Ouchi (Hajime Ouchi)

function setup() {
  createCanvas(600, 600);
  background(255);
  noStroke();
  fill(0);

  // Sfondo: passi di 120 pixel in orizzontale e 30 in verticale.
  for (let y = 0; y < 600; y += 30) {
    for (let x = 0; x < 600; x += 120) {
      rect(x, y, 60, 15);
      rect(x + 60, y + 15, 60, 15);
    }
  }

  // Ritaglio circolare del disco centrale.
  push();
  beginClip();
  circle(300, 300, 360);
  endClip();

  fill(255);
  rect(120, 120, 360, 360);
  fill(0);

  // Interno: passi di 30 pixel in orizzontale e 120 in verticale.
  for (let y = 120; y < 480; y += 120) {
    for (let x = 120; x < 480; x += 30) {
      rect(x, y, 15, 60);
      rect(x + 15, y + 60, 15, 60);
    }
  }
  pop();
}
