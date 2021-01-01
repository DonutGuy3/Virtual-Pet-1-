//Create variables here
var database;
var foodS, foodStock, dog, dogImg, dogImg1

function preload()
{
  //load images here
  dogImg = loadImage("Dog.png")
  dogImg1 = loadImage("happydog.png")
}

function setup() {
  createCanvas(500, 500);
  
  database = firebase.database()

  dog = createSprite(250, 300, 150, 150)
  dog.addImage(dogImg)
  dog.scale = 0.15

  foodStock = database.ref("food");
  foodStock.on("value", readStock)
}


function draw() { 
  background("black") 

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS)
    dog.addImage(dogImg1)
  }

  drawSprites();
  //add styles here
fill(255)
stroke("black")
text("Food remaining: "+ foodS, 170, 200)
textSize(13)
text("Press up arrow key to feed dog", 130, 10, 300, 20)
}

function readStock(data){
  foodS = data.val()
}

function writeStock(x){
  if (x <= 0){
    x = 0
  }
  else{
    x = x - 1
  }
  database.ref("/").update({
    food: x
  })
}



