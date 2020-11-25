
var dog, normalDog, happyDog, sadDog, foodStock, foodS, database;
var feed, addFood;
var fedTime, lastFed;
var foodObj;
var gameState, changeState, readState;
var bedroomIMG, gardenIMG, washroomIMG;
var currentTime

function preload(){

    normalDog = loadImage("dogImg.png");
    happyDog = loadImage("dogImg1.png");
    bedroomIMG = loadImage("virtual pet images/Bed Room.png");
    gardenIMG = loadImage("virtual pet images/Garden.png");
    washroomIMG = loadImage("virtual pet images/Wash Room.png");

}

function setup(){

    var canvas = createCanvas(500,500);

    dog = createSprite(200,350,10,10);
    dog.addImage(normalDog);
    dog.scale = 0.12;

    database = firebase.database();

    foodObj = new Food();

    foodStock=database.ref('Food');
    foodStock.on("value",function(data){
        foodS=data.val();
        foodObj.updateFoodStock(foodS)
    })

    readState=database.ref("gameState");
    readState.on("value",function(data){
        gameState=data.val();
    })

    currentTime = hour();

    

    feed=createButton("Feed the dog");
    feed.position(600,115);
    feed.mousePressed(feedDog);

    addFood=createButton("Add food");
    addFood.position(700,115);
    addFood.mousePressed(addFoods);

    

    fedTime=database.ref('FeedTime');
    fedTime.on("value",function(data){
        lastFed=data.val();
    })

    


}

function draw(){
    background(46,139,87);

    foodObj.display();

    

    fill(255,255,254);
    textSize(15);
    
    if(lastFed>=12){
        text("Last Feed : "+lastFed%12 + " PM",50,30);
    }

    else if(lastFed==0){
        text("Last Feed : 12 AM",50,30);
    }

    else{
        text("Last Feed : "+lastFed + " AM",50,30);
    }

    if(gameState!="Hungry"){
        feed.hide();
        addFood.hide();
        dog.visible = false;
    }

    else{
        feed.show();
        addFood.show();
        dog.visible = true;
        

    }

    if(currentTime===(lastFed+1)){
        update("Playing");
        foodObj.garden();
    }

    else if(currentTime===(lastFed+2)){
        update("Sleeping");
        foodObj.bedroom();
    }

    else if(currentTime>(lastFed+2)&& currentTime<=(lastFed+4)){
        update("Bathing");
        foodObj.washroom();
    }

    else{
        update("Hungry");
        foodObj.display();
    }

    drawSprites();

    
}

function feedDog(){
    dog.addImage(happyDog);

    foodObj.updateFoodStock(foodObj.getFoodStock()-1);

    foodS = foodS - 1;

    database.ref('/').update({
        Food:foodS,
        FeedTime:hour()
    })

}

function addFoods(){
    foodS++
    dog.addImage(normalDog);

    foodObj.updateFoodStock(foodObj.getFoodStock()+1);
    
    database.ref('/').update({
        Food:foodS
    })
}

function update(state){
    database.ref("/").update({
        gameState:state
    })
}



