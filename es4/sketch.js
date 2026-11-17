const RITARDO_MS = 500;
const FUCSIA = [255, 28, 174];
const CIANO = [0, 226, 255];

let puntoPrecedente = null;
let codaRiflesso = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  cursor(CROSS);
  azzeraDisegno();
}

function draw() {
  const ora = millis();

  if (puntoPrecedente && mouseIsPressed) {
    registraGesto(ora);
  }

  // Il riflesso legge la coda anche quando il mouse è già stato rilasciato.
  while (codaRiflesso.length > 0 && codaRiflesso[0].fine.tempo + RITARDO_MS <= ora) {
    const tratto = codaRiflesso.shift();
    push();
    translate(width, 0);
    scale(-1, 1);
    pennellata(tratto.inizio, tratto.fine, CIANO, RITARDO_MS);
    pop();
  }
}

function mousePressed(evento) {
  if (evento.button !== 0 || mouseX < 0 || mouseX >= width || mouseY < 0 || mouseY >= height) {
    return;
  }

  puntoPrecedente = null;
  registraGesto(millis());
}

function mouseReleased(evento) {
  if (evento.button === 0) {
    puntoPrecedente = null;
  }
}

function registraGesto(tempo) {
  const fine = { x: mouseX, y: mouseY, tempo };
  const inizio = puntoPrecedente || fine;
  pennellata(inizio, fine, FUCSIA, 0);
  codaRiflesso.push({ inizio, fine });
  puntoPrecedente = fine;
}

function punta(tempo) {
  // La punta ruota e la sua apertura oscilla come negli esempi della lezione.
  const apertura = map(sin(tempo / 175), -1, 1, 5, 26);
  const angolo = tempo / 360;
  return { x: cos(angolo) * apertura, y: sin(angolo) * apertura };
}

function pennellata(inizio, fine, colore, ritardo) {
  const prima = punta(inizio.tempo + ritardo);
  const dopo = punta(fine.tempo + ritardo);

  stroke(...colore, 43);
  strokeWeight(0.8);
  line(fine.x - dopo.x, fine.y - dopo.y, fine.x + dopo.x, fine.y + dopo.y);

  // Cinque fili. Ogni filo ha un alone largo e un tratto sottile sopra.
  for (let filo = -1; filo <= 1; filo += 0.5) {
    const x1 = inizio.x + prima.x * filo;
    const y1 = inizio.y + prima.y * filo;
    const x2 = fine.x + dopo.x * filo;
    const y2 = fine.y + dopo.y * filo;
    stroke(...colore, 38);
    strokeWeight(6);
    line(x1, y1, x2, y2);
    stroke(...colore, 235);
    strokeWeight(1.25);
    line(x1, y1, x2, y2);
  }
}

function azzeraDisegno() {
  background(0);
  stroke(41, 41, 53);
  strokeWeight(1);
  for (let y = 0; y < height; y += 13) {
    line(width / 2, y, width / 2, min(y + 4, height));
  }
  codaRiflesso = [];
  puntoPrecedente = null;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight, true);
  azzeraDisegno();
}

function keyReleased(evento) {
  if (evento.key === "Delete" || evento.key === "Backspace") {
    azzeraDisegno();
    return false;
  }
  if (evento.key === "s" || evento.key === "S") {
    saveCanvas("specchio-in-ritardo", "png");
  }
}
