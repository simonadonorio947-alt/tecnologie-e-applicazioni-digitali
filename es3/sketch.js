let font;

async function setup() {
  font = await loadFont("DejaVuSansMono-Bold.ttf");
  createCanvas(800, 600);
  background(255);
  textFont(font);
  textAlign(LEFT, BASELINE);

  // Ripete PLIN con spostamenti progressivi: prima copia piena, altre a contorno.
  for (let i = 0; i < 5; i++) {
    push();
    translate(42 + i * 31 + random(-3, 3), 142 + i * 27);
    textSize(112 + random(-2, 2));
    if (i === 0) {
      noStroke();
      fill(0);
    } else {
      noFill();
      stroke(0);
      strokeWeight(0.9);
    }
    text("PLIN", 0, 0);
    pop();
  }

  // Ripete BRRR alternando testo pieno e a contorno con i % 2.
  for (let i = 0; i < 4; i++) {
    push();
    translate(489 + i * 8 + random(-3, 3), 110 + i * 38);
    textSize(64);
    if (i % 2 === 0) {
      fill(0);
      noStroke();
    } else {
      noFill();
      stroke(0);
      strokeWeight(0.8);
    }
    text("BRRR", 0, 0);
    pop();
  }

  // Sovrappone tre SPLASH scalati: solo la copia centrale ha il riempimento.
  for (let i = 0; i < 3; i++) {
    push();
    translate(83 + i * 33 + random(-3, 3), 296 + i * 18);
    scale(1.13, 0.9);
    textSize(80);
    if (i === 1) {
      fill(0);
      noStroke();
    } else {
      noFill();
      stroke(0);
      strokeWeight(0.7);
    }
    text("SPLASH", 0, 0);
    pop();
  }

  // Sfalsa cinque BOOM con piccole variazioni casuali; l'ultimo e pieno.
  for (let i = 0; i < 5; i++) {
    push();
    translate(42 + i * 10 + random(-3, 3), 408 + i * 35);
    scale(1.07, 1);
    textSize(225 + random(-2, 2));
    if (i === 4) {
      fill(0);
      noStroke();
    } else {
      noFill();
      stroke(0);
      strokeWeight(0.85);
    }
    text("BOOM", 0, 0);
    pop();
  }

  // DIFFERENCE rende SPLASH bianco sul nero e nero sul bianco.
  push();
  blendMode(DIFFERENCE);
  fill(255);
  noStroke();
  translate(110 + random(-4, 4), 474 + random(-4, 4));
  rotate(-0.065);
  textSize(56);
  scale(1.2, 1);
  text("SPLASH", 0, 0);
  pop();

  // Ruota il sistema di coordinate di -90 gradi e dispone tre BRRR in successione.
  push();
  translate(756, 548);
  rotate(-HALF_PI);
  textSize(37);
  fill(0);
  noStroke();
  for (let i = 0; i < 3; i++) {
    text("BRRR", i * 105 + random(-2, 2), random(-2, 2));
  }
  pop();

}
