const parola = 'RABBIA';
const raggio = 44;
const lettere = [];
let mouseSulCanvas = false;

class Particle {
  constructor(punto) {
    this.origine = createVector(punto.x, punto.y);
    this.pos = this.origine.copy();
    this.vel = createVector(0, 0);
    this.deviazione = random(-0.55, 0.55);
    this.forza = random(0.7, 1.45);
    this.vicina = false;
  }

  display() {
    const distanza = dist(this.origine.x, this.origine.y, this.pos.x, this.pos.y);
    const movimento = max(distanza, this.vel.mag() * 2);
    const rosso = map(movimento, 1, 15, 0, 155, true);

    // Lo strappo allunga i frammenti nella direzione del movimento.
    stroke(rosso, 0, 0);
    strokeWeight(1.7);
    line(this.pos.x, this.pos.y,
      this.pos.x - this.vel.x * 0.65, this.pos.y - this.vel.y * 0.65);
    noStroke();
    fill(rosso, 0, 0);
    circle(this.pos.x, this.pos.y, 2.7);
  }

  update(cursore, letteraAttiva) {
    const distanza = dist(this.origine.x, this.origine.y, cursore.x, cursore.y);
    const vicina = letteraAttiva && distanza < raggio;

    // Un impulso quando il cursore entra nella zona di questo punto.
    if (vicina && !this.vicina) {
      const direzione = p5.Vector.sub(this.origine, cursore);
      const angolo = direzione.heading() + this.deviazione;
      const intensita = map(distanza, 0, raggio, 23, 13) * this.forza;
      this.vel.add(cos(angolo) * intensita, sin(angolo) * intensita, 0);
    }
    this.vicina = vicina;

    // Una molla smorzata riporta il punto sul contorno.
    const ritorno = p5.Vector.sub(this.origine, this.pos).mult(0.14);
    this.vel.add(ritorno).mult(0.80).limit(26);
    this.pos.add(this.vel);
  }
}

async function setup() {
  const font = await loadFont('DejaVuSansMono-Bold.ttf');
  const canvas = createCanvas(windowWidth, windowHeight);
  canvas.elt.addEventListener('mouseenter', () => { mouseSulCanvas = true; });
  canvas.elt.addEventListener('mouseleave', () => { mouseSulCanvas = false; });

  const corpo = 170;
  const spaziatura = 12;
  textFont(font);
  textSize(corpo);
  textAlign(LEFT, BASELINE);
  const ingombro = textBounds(parola, 0, 0);
  const larghezza = ingombro.w + spaziatura * (parola.length - 1);
  const lineaBase = -ingombro.y - ingombro.h / 2;
  let x = -ingombro.x - larghezza / 2;

  // In un font monospaziato, aggiungere la stessa lettera misura il passo.
  const campione = parola[0];
  const passo = textWidth(campione + campione) - textWidth(campione);

  for (const carattere of parola) {
    const punti = font.textToPoints(carattere, x, lineaBase, { sampleFactor: 0.34 });
    lettere.push(punti.map(punto => new Particle(punto)));
    x += passo + spaziatura;
  }
}

function draw() {
  background(255);
  const scala = min(1, width / 800, height / 320);
  translate(width / 2, height / 2);
  scale(scala);

  const cursore = createVector((mouseX - width / 2) / scala, (mouseY - height / 2) / scala);
  let attiva = null;
  let distanzaMinima = raggio;

  // Anche tra due lettere, solo il contorno più vicino riceve l'impulso.
  if (mouseSulCanvas) {
    for (const lettera of lettere) {
      for (const particella of lettera) {
        const { x, y } = particella.origine;
        const distanza = dist(x, y, cursore.x, cursore.y);
        if (distanza < distanzaMinima) {
          distanzaMinima = distanza;
          attiva = lettera;
        }
      }
    }
  }

  for (const lettera of lettere) {
    for (const particella of lettera) {
      particella.update(cursore, lettera === attiva);
      particella.display();
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
