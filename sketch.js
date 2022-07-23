const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground;
var rope;
var fruta;
var link;

function preload() {
  backgroun = loadImage("assets/background.png");
  melon = loadImage("assets/melon.png");
  mute = loadImage("assets/mute.png");
  rabbit = loadImage("assets/Rabbit-01.png");
  sad = loadAnimation("assets/sad_1.png", "assets/sad_2.png", "assets/sad_3.png")
  eat = loadAnimation("assets/eat_0.png", "assets/eat_1.png", "assets/eat_2.png", "assets/eat_3.png", "assets/eat_4.png")
  blink = loadAnimation("assets/blink_1.png", "assets/blink_1.png", "assets/blink_1.png", "assets/blink_1.png", "assets/blink_2.png", "assets/blink_3.png")
  blink.playing = true
  sad.playing = true
  eat.playing = true
  blink.looping = true
  sad.looping = false
  eat.looping = false
  air = loadSound("assets/air.wav")
  cutting = loadSound("assets/CuttingThroughFoliage.mp3")
  eating = loadSound("assets/eating_sound.mp3")
  ropecut = loadSound("assets/rope_cut.mp3")
  sadd = loadSound("assets/sad.wav")
  sound1 = loadSound("assets/sound1.mp3")
}

function setup() {
  sound1.play()
  sound1.setVolume(0.5)
  createCanvas(500, 700);
  frameRate(80);
  engine = Engine.create();
  world = engine.world;
  button = createImg("assets/cut_btn.png")
  button.position(215, 30)
  button.size(70, 70)
  button.mouseClicked(drop)
  button2 = createImg("assets/cut_btn.png")
  button2.position(420,120)
  button2.size(70, 70)
  button2.mouseClicked(dropp)
  button3 = createImg("assets/cut_btn.png")
  button3.position(40,140)
  button3.size(70, 70)
  button3.mouseClicked(droppp)
  mutee=createImg("assets/mute.png")
  mutee.position(400,50)
  mutee.size(70,70)
  mutee.mouseClicked(mutte)
  balao= createImg("assets/balloon.png")
  balao.position(10,350)
  balao.size(100,100)
  balao.mouseClicked(sopro)
  ground = new Ground(200, 680, 600, 20);
  rope = new Rope(6, { x: 245, y: 30 })
  ropee = new Rope(9, { x: 475, y: 150 })
  ropeee = new Rope(9, { x: 50, y: 150 })
  var frutaOptions = {
    density: 0.001
  }
  fruta = Bodies.circle(300, 300, 15, frutaOptions)
  Matter.Composite.add(rope.body, fruta)
  link = new Link(rope, fruta)
  link2 = new Link(ropee, fruta)
  link3 = new Link(ropeee, fruta)
  rectMode(CENTER);
  ellipseMode(RADIUS);
  imageMode(CENTER);
  textSize(50)
  blink.frameDelay = 20
  sad.frameDelay = 20
  eat.frameDelay = 20

  coelho = createSprite(250, 620, 20, 20)
  coelho.addAnimation("blink", blink)
  coelho.addAnimation("sad", sad)
  coelho.addAnimation("eat", eat)
  coelho.changeAnimation("blink")
  coelho.scale = 0.2
}

function draw() {
  background(51);
  ground.show();
  image(backgroun, width / 2, height / 2)

  drawSprites()
  Engine.update(engine);
  rope.show();
  ropee.show();
  ropeee.show();
  if (fruta != null) {

  image(melon, fruta.position.x, fruta.position.y, 50, 50)
  }
  if (collide(fruta,coelho)){
    coelho.changeAnimation("eat")
    eating.play()
  }
 if (fruta!=null&&fruta.position.y>650){
  coelho.changeAnimation("sad")
  sound1.stop()
  sadd.play()
  fruta=null
 }

}
function drop() {
  rope.break()
  link.detach()
  link = null
  ropecut.play()
}
function dropp() {
  ropee.break()
  link2.detach()
  link2 = null
  ropecut.play()
}
function droppp() {
  ropeee.break()
  link3.detach()
  link3 = null
  ropecut.play()
}
function collide(body,sprite){
  if(body!=null){
var d=dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y)
if(d<=80){
  World.remove(engine.world,fruta)
  fruta=null
  return true
}
else{
return false
}
} 

}
function mutte(){
  if(sound1.isPlaying()){
    sound1.stop()
  }
  else{
    sound1.play()
  }
}
function sopro(){
  Matter.Body.applyForce(fruta,{x:0,y:0},{x:0.01,y:0})
  air.play()
}