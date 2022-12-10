let xBolinha = 300;
let yBolinha = 200;
let diametro = 25;
let raio = diametro / 2;
let velocidadeXBolinha = 5;
let velocidadeYBolinha = 5;

//placar do jogo
let meusPontos = 0;
let pontosDoOponente = 0;

//sons do jogo
let raquetada;
let ponto;
let trilha;

//variaveis da raquete
let xRaquete = 10;
let yRaquete = 160;
let comprimentoRaquete = 10;
let alturaRaquete = 70;
let colidiu = false;

//variaveis da raquete oponente
let xRaqueteOponente = 580;
let yRaqueteOponente = 160;
let velocidadeYOponete;

function preload(){
  trilha =  loadSound("Odesong.wav");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}


function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  mostraRaquete(xRaquete, yRaquete);
  moveRaquete();
  //verificaColisaoRaquete();
  verificaColisaoRaquete(xRaquete, yRaquete);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteOponente();
  verificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente);
  incluiPlacar();
  marcaPonto();
}

function mostraRaquete(x,y){
  rect(x,y,comprimentoRaquete, alturaRaquete);
  
}

function mostraBolinha(){
  circle(xBolinha, yBolinha, diametro);
  
}

function movimentaBolinha(){
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
  
}

function verificaColisaoBorda(){
  if(xBolinha + raio > width ||
     xBolinha - raio < 0){
    velocidadeXBolinha *= -1;
  }
  
  if(yBolinha + raio > height ||
     yBolinha - raio < 0){
    velocidadeYBolinha *= -1;
  }
  
}

function moveRaquete(){
  if (keyIsDown(UP_ARROW)){
    yRaquete -= 10;
  }
  if (keyIsDown(DOWN_ARROW)){
    yRaquete += 10;
  }
}

function movimentaRaqueteOponente(){
  velocidadeYOponente = yBolinha - yRaqueteOponente - comprimentoRaquete / 2  - 30;
  yRaqueteOponente  += velocidadeYOponente
}

function verificaColisaoRaquete(){
  if (xBolinha - raio < xRaquete + comprimentoRaquete && yBolinha - raio < yRaquete + alturaRaquete && yBolinha + raio > yRaquete){
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

function verificaColisaoRaquete(x, y){
    colidiu = collideRectCircle(x, y, comprimentoRaquete, alturaRaquete, xBolinha, yBolinha, raio);
    if (colidiu){
        velocidadeXBolinha *= -1;
      raquetada.play();
    }
}

function incluiPlacar(){
  stroke(255)
  textAlign(CENTER);
  textSize(28);
  fill(color(255,140,0));
  rect(147, 10, 45, 30);
  fill(color(255,140,0));
  rect(428, 10, 45,30);
  fill(255);
  text(meusPontos, 170, 35);
  text(pontosDoOponente, 450, 35);
}

function marcaPonto(){
  if (xBolinha > 585){
    meusPontos += 1;
  }
  if (xBolinha < 15){
    pontosDoOponente += 1;
    ponto.play();
  }
}