class Food{
    constructor(){
        this.foodStock;
        this.lastFed;
        this.image = loadImage("Milk.png");
        //this.foodS;
    }

    getFoodStock(){
            return this.foodStock

    }

    updateFoodStock(foodStock){
        this.foodStock = foodStock
}

    deductFood(){
        if(this.foodStock>0){
            this.foodStock= this.foodStock-1;
        }

        else{
            this.foodStock=0;
        }
    }

    getFedTime(lastFed){
        this.lastFed = lastFed;
    }



    display(){

        var x= 80,y=100;
        imageMode(CENTER);

        if(this.foodStock!=0){
            for(var i=0; i<this.foodStock; i++){
                if(i%10===0){
                    x=80;
                    y=y+50;
                }
                image(this.image,x,y,50,50);
                x=x+30;
                
            }
        }

        drawSprites();
    }

    bedroom(){
        image(bedroomIMG,250,250,500,550);
    }

    garden(){
        image(gardenIMG,250,250,500,550);
    }

    washroom(){
        image(washroomIMG,250,250,500,550);
    }
}