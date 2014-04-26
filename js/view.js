$(document).ready(function() {
    Crafty.init(window.innerWidth, window.innderHeight);
	var bounds={left:0,right:window.innerWidth,top:0,bottom:window.innerHeight};
	var ecosystem={plants:0,herbivores:0,carnivores:0};
	var times=[];
	times.push(new Date());
    //plants
  var plantFactory=function(x,y){
	if (!x){var x=_.random(bounds.right-20)};
	if (!y){var y=_.random(bounds.bottom-20)};
	var chroma='rgb('+_.random(80,140)+','+_.random(160,220)+','+_.random(20,40)+')';
    var plant=Crafty.e("Plant, 2D, DOM, Color, Collision, Tween").color(chroma).attr({
	alpha:0.9,
        w: 20,
        h: 20,
        x:x,
        y:y,
	energy:20,
	age:0
    }).bind('EnterFrame', function() {
		var initialEnergy=this.energy;
			this.age++;
		if (this.energy>100){
			this.energy-=40;
			var seedlingX=this.x+_.random(-200,200);
			var seedlingY=this.y+_.random(-200,200);
			plantFactory(seedlingX,seedlingY);
			this.energy-=40;
			var seedlingX=this.x+_.random(-200,200);
			var seedlingY=this.y+_.random(-200,200);
			plantFactory(seedlingX,seedlingY);
			this.x+=40;
			this.y+=40;		
			}
		else{
			this.energy+=2;
			this.x-=1;
			this.y-=1;
			if (initialEnergy!=this.energy){
			}
			this.w=this.energy;
			this.h=this.energy;
			};
		
		if (this.energy<0 || this.age>120 || this.x<bounds.left || this.x>bounds.right || this.y>bounds.bottom || this.y<bounds.top){ecosystem.plants--;this.destroy()};
    	}).onHit('Herbivore', function() {
        	this.energy -= 20;
		this.x+=10;
		this.y+=10;
    	}).onHit('Plant',function(){
		if (_.random(1)>0){
			this.energy-=2;
			this.x+=1;
			this.y+=1;
			}
		else{this.energy-=1;this.x+=0.5;this.y+=0.5};
	});
	ecosystem.plants++;
	return plant;
	};
    //herbivores
    var herbivoreFactory=function(x,y){
	if (!x){var x=_.random(bounds.right-20)};
	if (!y){var y=_.random(bounds.bottom-20)};
	var animal=Crafty.e("Herbivore, 2D, DOM, Color, Collision, Tween").color('rgb(120,80,25)').attr({
        w: 20,
        h: 20,
        x:x,
        y:y,
	energy:200,
	ready:true
    }).bind('EnterFrame', function() {
		var randomSeed=_.random(10);
		if (randomSeed<2 && this.ready==true){
			this.ready==false;
			this.tween({
		        x:this.x+100*_.random(-10,10),
        		y:this.y+100*_.random(-10,10),
			ready:true
			},400);
		this.energy-=1;
		}
		if (this.energy<0|| this.x<bounds.left || this.x>bounds.right || this.y>bounds.bottom || this.y<bounds.top){ecosystem.herbivores--;this.destroy()};
		if (this.energy>500){herbivoreFactory(this.x,this.y);herbivoreFactory(this.x,this.y);this.energy-=400;};
    	}).onHit('Plant', function() {
        	this.energy += 20;
    	}).onHit('Carnivore', function() {
        	this.energy =0;
    	});
	ecosystem.herbivores++;
	return animal;
	};

//carnivores
    var carnivoreFactory=function(x,y){
	if (!x){var x=_.random(bounds.right-20)};
	if (!y){var y=_.random(bounds.bottom-20)};
	var animal=Crafty.e("Carnivore, 2D, DOM, Color, Collision, Tween").color('rgb(200,100,25)').attr({
        w: 20,
        h: 20,
        x:x,
        y:y,
	energy:200,
	ready:true
    }).bind('EnterFrame', function() {
		var randomSeed=_.random(10);
		if (randomSeed<2 && this.ready==true){
			this.ready==false;
			this.tween({
		        x:this.x+100*_.random(-10,10),
        		y:this.y+100*_.random(-10,10),
			ready:true
			},400);
		this.energy-=1;
		}
		if (this.energy<0|| this.x<bounds.left || this.x>bounds.right || this.y>bounds.bottom || this.y<bounds.top){ecosystem.carnivores--;this.destroy()};
		if (this.energy>500){carnivoreFactory(this.x,this.y);this.energy-=400;};
    	}).onHit('Herbivore', function() {
		//console.log(this.hit());
        	this.energy += 50;
    	});
	ecosystem.carnivores++;
	return animal;
	};



    var ftw=function(){
	var f=Crafty.e("FTW, 2D, DOM, Color, Collision, Tween").color('rgb(0,0,0)').attr({
	alpha:0.8,
        w: bounds.right,
        h: 0,
        x:0,
        y:100,
	ready:true
    	}).bind('EnterFrame',function(){
	if (ecosystem.plants<1 && ecosystem.herbivores<1 && ecosystem.carnivores<1 && this.ready==true){
		this.tween({h:100,ready:false},50);
		message("Game Over");
		times.push(new Date());
		console.log(times);
		};
	});
	return f;
	};

    var message=function(x){
	Crafty("Message").each(function(){this.destroy()});
	var f=Crafty.e("Message, 2D, DOM, Color, Text, Tween").attr({
	alpha:0,
        w:bounds.right,
        h: 100,
        x:0,
        y:150
    	}).text(x).textColor("#ffffff").bind('EnterFrame',function(){this.tween({alpha:1},100)});
	
	return f;
	};

	

for (var i=0;i<10;i++){herbivoreFactory();};
for (var i=0;i<10;i++){plantFactory();};
for (var i=0;i<8;i++){carnivoreFactory();};
ftw();

});
