let autoRotate = 0.0;
let ColorMode = false;
//defines a class to store RGB values
class Color{
	//make a random color
	constructor(red, green, blue){
		this.red = red;
		this.green = green;
		this.blue = blue;
	}
}

let PaletteArray = [new Color(96,8,175),new Color(250,19,4),new Color(245,94,0), new Color(17,211,204),new Color(1,61,221), new Color(126,32,101), new Color(25,229,203) , new Color(241,80,251), new Color(224,0,170)];
// REMOVED COLORS new Color(107,133,106),  , new Color(199,249,31) ,new Color(78,251,10) new Color(99,212,102), new Color(22,152,77),
//defines a Graph class specificly a star
class Star{
	//set n the number of lines, x location, y location and rotation scale then make a color array
	constructor(n,x,y,r, xVel, yVel){
		this.x = x;
		this.n = n;
		this.y = y;
		this.xVel = xVel;
		this.yVel = yVel;
		this.rotateScale = r;
		this.colorArray = [];
		
		let radius = this.x*this.x+this.y*this.y;
		this.radius = radius;
		//find smallest k here
		this.k = 1;
		let startingIndex = Math.floor(Math.random*PaletteArray.length);
		for(this.k = 1; this.n > Math.ceil((this.n+1.0)/this.k)*(this.k-1); this.k++);
		//comment out once pallet is done
		//this.k = PaletteArray.length +1;
		//if the color array doesn't contain enough colors fill more colors
		for(let i = 0; i < this.k; i++){
			if(ColorMode){
				this.colorArray.push(new Color(Math.random()*255,Math.random()*255,Math.random()*255));
			}
			else{
				this.colorArray.push(PaletteArray[i]);
			}
		}
	}
	//draw the graph
	makeGraph(){
		//push to start drawing this object
		push();
		//move it to the correct location
		translate(this.x,this.y);
		//rotate it based on personal scale and auto rotate to move from prevous position
		rotate((PI/180)*(this.rotateScale)*autoRotate);
		//build the star lines around a center.
		for(let i = 0 ; i < this.n ; i++)
		{
			rotate((PI*2)/(this.n));
			stroke(this.colorArray[i%(this.k-1)].red,this.colorArray[i%(this.k-1)].green,this.colorArray[i%(this.k-1)].blue);
			line(0,0,1600,0);
		}
		//said center
		fill(0,0,0);
		stroke(0,0,0);
		ellipse(0,0,3,3);
		//done with the star
		pop();
	}
	
	moveCenter(){
		/*
		this.x = Math.ceil(this.radius*Math.cos((PI)*millis()*10000000));
		
		this.y = Math.ceil(this.radius*Math.sin((PI)*millis()*10000000));
		*/
		
		if((this.x > 390 && this.xVel > 0) || (this.x < -390 && this.xVel < 0)){
			this.xVel = -this.xVel;
		}
		if((this.y > 390 && this.yVel > 0) || (this.y < -390 && this.yVel < 0))	
		{
			this.yVel = -this.yVel;
		}
		this.x = this.x + this.xVel;
		this.y = this.y + this.yVel;
	
	}
}
let graphArray = [new Star(Math.ceil(Math.random()*20)+10,0,0,.5)];
let movement = false;
let moveRate = .50;
function setup() {
	mycanvas = createCanvas(800,800);
	background(255); 
}

function draw() {
	//white background slowly 
	//background(255,255,255,5);
	//move 0,0 to center
	translate(width/2, height/2);
	//rotate(PI/180);
	//rotate(-PI/800*moveRate);
	//draw all the graphs
	for(let i = 0; i< graphArray.length; i++){
		if(movement){
			graphArray[i].moveCenter();
			//moveRate = moveRate+.5;
		}
		graphArray[i].makeGraph();
	}
	//rotate all the graphs
	autoRotate = autoRotate + .50;
	
}
function keyPressed()
{
	if(keyCode === BACKSPACE)
	{
		movement = !movement;
	}
	else if(keyCode === ENTER)
	{
		saveCanvas(mycanvas,"DrawMachine"+year()+ "_" +month()+"_"+day()+"_"+hour()+"_"+minute()+"_"+second(),"jpg");
	}
	else if(keyCode === SHIFT)
	{
		ColorMode = !ColorMode;
	}		
	
}

function mouseClicked() {
	//random n number of lines and a random rotate scale
	
	let na = Math.ceil(Math.random()*20)+10;
	let rotateScaleA = (Math.random()/4.0)+.5;
	
	let xVel = Math.floor(Math.random()*5) -2;
	let yVel = Math.floor(Math.random()*5) -2;
	/*
	let yVel;
	let xVel;
	if(mouseX-400 < 0){
		yVel = -1;
	}
	else{
		yVel = 1;
	}
	if(mouseY-400 <0)
	{
		xVel = 1;
	}
	else{
		xVel = -1;
	}
	*/
	//put that information into the graphArray to add it to the graph. with current X,Y mouse location
	graphArray.push(new Star(na,mouseX-400,mouseY-400,rotateScaleA,xVel,yVel));
}
