// Hilma af Klint, "Svaven", 1915.
// Fase 1: riproduzione geometrica senza parametri.

function setup() {
  createCanvas(600, 600);
  colorMode(HSL);
  angleMode(DEGREES);
  noStroke();

  background(10, 60, 43);

  // Semicerchi esterni: avorio a sinistra, azzurro a destra.
  fill(45, 20, 88);
  arc(300, 300, 324, 324, 90, 270, PIE);
  fill(206, 45, 53);
  arc(300, 300, 324, 324, -90, 90, PIE);

  // Semicerchi interni: nero a sinistra, giallo a destra.
  fill(0, 0, 12);
  arc(300, 300, 216, 216, 90, 270, PIE);
  fill(46, 75, 64);
  arc(300, 300, 216, 216, -90, 90, PIE);

  // Il piccolo semicerchio rosa copre solo la parte destra.
  fill(12, 60, 73);
  arc(300, 300, 108, 108, -90, 90, PIE);
}
