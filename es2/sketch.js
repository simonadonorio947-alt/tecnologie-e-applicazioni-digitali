// Hilma af Klint, "Svaven", 1915.
// Fase 2: tonalita casuali, scelte prima di disegnare.

function setup() {
  createCanvas(600, 600);
  colorMode(HSL);
  angleMode(DEGREES);
  noStroke();

  // Intervalli limitati per mantenere una palette vicina al quadro.
  let azzurro = int(random(195, 221)); 
  let giallo = int(random(40, 56));    
  let rosa = int(random(5, 21));       
  let sfondo = int(random(5, 21));     
  let chiaro = int(random(30, 61));    
  let scuro = int(random(190, 241));   

  background(sfondo, 60, 43);

  fill(chiaro, 20, 88);
  arc(300, 300, 324, 324, 90, 270, PIE);
  fill(azzurro, 45, 53);
  arc(300, 300, 324, 324, -90, 90, PIE);

  fill(scuro, 20, 12);
  arc(300, 300, 216, 216, 90, 270, PIE);
  fill(giallo, 75, 64);
  arc(300, 300, 216, 216, -90, 90, PIE);

  fill(rosa, 60, 73);
  arc(300, 300, 108, 108, -90, 90, PIE);
}