(function(){
	//________________________Initial Setup Function
	$(document).ready(function(){

		fitCanvas();//Calls function to fit the canvas to the screen
		mouseMove(1);//Initialize the Mouse Movement Tracker

		$(document).click(function(){//event listener for clicks
			branchControl(0,0,0,0,1);
		});

		$('canvas').mousemove(function(){//eventlistener for mouseover on the canvas
			mouseMove();
		});

		$(document).keypress(function(e){//event listener for spacebar press
			if(e.keyCode == '32' | e.keyCode == '0'){ 
				location.reload();
			}
		});
	});
	//________________________End Initial Setup Function
	

	//________________________Fit the Canvas to the Screen
	function fitCanvas(){
		$canvas = $('canvas').get(0);//get the canvas DOM element
		$context = $canvas.getContext("2d");//get the context of the canvas
		$($canvas).css('width',$(document).width()-3+"px");//Set the canvas size based on browser size
		$($canvas).css('height',$(document).height()-3+"px");//Set the canvas size based on browser size
		$context.canvas.height = $(document).height();//Set the canvas size based on browser size
		$context.canvas.width = $(document).width();//Set the canvas size based on browser size
	}
	//________________________End Fit the Canvas to the Screen


	//________________________Mouse Coordinate Collection
	function mouseMove(initVal){//collects mouse coordinates
		if(initVal){//if passed an init value it declares variable base values and passes the init request down the line
			$mouseMoveCounter = 0;
			mouseMoveConvert(0,0,1);//init call for next function in line
		}else{//if the init value is not passed the rest of the function will run
			event = event || window.event;
			$mousePosX = event.pageX;//measuring mouse X value
			$mousePosY = event.pageY;//measuring mouse Y value
			$mouseMoveCounter ++;//Incrementing mouse mmovement counter
			if($mouseMoveCounter>=6){//if the mouse movement counter reaches the defined value it will call the mouse movement conversion
				$mouseMoveCounter = 0;//reset the counter
				mouseMoveConvert($mousePosY,$mousePosX);//Call the conversion
			}
		}
	}
	//________________________End Mouse Coordinate Collection
	

	//________________________Convert Mouse Coordinates to Alter Growth Path
	function mouseMoveConvert(mousePosY,mousePosX,initVal){//plots growth path based on values given by the mouseMove function
		if(initVal){//if passed an init value it declares variable base values and passes the init request down the line
			$Y = ($(document).height());//sets the start value to the bottom of the page
			$X = ($(document).width())/2;//sets the start value to the middle of the page
			colourRadiusControl(0,0,1);//init call for next function in line
		}else{//if the init value is not passed the rest of the function will run
			if($Y >= mousePosY){//base value to mouse location comparisson
				$moveY = 6;
			}else if($Y <= mousePosY){
				$moveY = 2;
			}else{
				$moveY = 4;
			}

			if($X >= mousePosX){//base value to mouse location comparisson
				$moveX = -2;
			}else if ($X <= mousePosX){
				$moveX = 2;
			}else{
				$moveX = 0;
			}
			$Y = $Y-$moveY;//results of the comparisson determine the change in the Y value
			$X = $X+$moveX;//results of the comparisson determine the change in the X value

			colourRadiusControl($X,$Y);//New values sent to colour and radius control
		}
	}
	//________________________End Convert Mouse Coordinates to Alter Growth Path
	

	//________________________Colour and Radius Increments
	function colourRadiusControl(circleX,circleY,initValue){//increment the colour and radius values each time through
		if(initValue){//if passed an init value it declares variable base values and passes the init request down the line
			if( ($(document).width()) > ($(document).height()) ){//determine the base circle position relative to screen size
				$radius = $(document).height()/6;
			}else{
				$radius = $(document).width()/6;
			}
			$colorValue = 0;//set the initial color value to 0
			branchControl(0,0,0,0,0,1);//init call for next function in line
		}else{//if the init value is not passed the rest of the function will run
			$radius --;//increment the radius down
			$colorValue ++;//increment the colour value up
			branchControl(circleX,circleY,$colorValue,$radius);//pass the resulting values to the branch control
		}
	}
	//________________________End Colour and Radius Increments


	//________________________Directs Function Use Based on Number of Branches
	function branchControl(newCircleX,newCircleY,circleColour,circleRadius,branchCount,initValue){//Selects the path for the rest of the function depending on the number of branch clicks
		if(initValue){//if passed an init value it declares variable base values and passes the init request down the line
			$branch = 0;
			$
			branchOneNegative(0,1);
			branchOnePositive(0,1);
			draw(0,0,0,0,1);//init call for next function in line
		}else{//if the init value is not passed the rest of the function will run
			if(branchCount == 1){//if the user clicks this will run
				$branch++;//increments the branch stage count
				if($branch == 1){
					drawBranchOne(0,0,0,0,1);//initializes the first branch stage
				}else if($branch == 2){
					drawBranchTwo(0,0,0,0,1);//initializes the second branch stage
				}
			}else{//if no click is recieved this end will run
				if($branch == 2){//branch stage 2
					drawBranchTwo(newCircleX,newCircleY,circleColour,circleRadius);
				}else if($branch == 1){//branch stage 1
					drawBranchOne(newCircleX,newCircleY,circleColour,circleRadius);//call the circle drawing function to make branch stage 1
				}else{//branch stage 0
					draw(newCircleX,newCircleY,circleColour,circleRadius);//call the circle drawing function to continue the core
				}
			}
		}
	}
	//________________________End Directs Function Use Based on Number of Branches


	//________________________Circle Draw Function
	function draw(circlePositionX,circlePositionY,circleColour,circleRadius,initVal){//Draws a circle on the canvas with the given values
		if(initVal){//if passed an init value it declares variable base values and passes the init request down the line
			$positionX = ($(document).width())/2;//set the X position start value to the center of the screen
			$positionY = ($(document).height());//set the Y position start value
		}else{//if the init value is not passed the rest of the function will run
			if($radius >= 1){//this will stop the function if the circle gets too small
				$context.beginPath();//Start the path draw
				$context.arc(circlePositionX,circlePositionY,$radius,0,2*Math.PI);//Draw an arc to specifications
				$context.fillStyle="rgb("+$colorValue+",0,0)";//define the arc fill colour
				$context.fill();//fill the arc with the defined colour
			}
			$positionX = $positionX-(circlePositionX);//sets the values within the function to a new state allowing progress
			$positionY = $positionY-(circlePositionY);
		}
	
	}
	//________________________End Circle Draw Function
	


	function branchOneNegative(offsetValue,initValue,teirThreeBranch){
		if(initValue){
			$negativeOffset = 0;
		}else{
			$passValue = $negativeOffset-3;
			$negativeOffset = $passValue;
			return ($passValue);
		}
	}



	function branchOnePositive(offsetValue,initValue){
		if(initValue){
			$positiveOffset = 0;
		}else{
			$passValue = offsetValue+3;
			$positiveOffset = $passValue;
			return ($passValue);
		}
	}


	//________________________Double Circle Draw Function
	function drawBranchOne(circlePositionX,circlePositionY,circleColour,circleRadius,initValue){//Handles drawing circles during the first branch point
		if(initValue){//if passed an init value it declares variable base values and passes the init request down the line
			$negativeOffset = 0;
			$positiveOffset = 0;
		}else{//if the init value is not passed the rest of the function will run
			$negIncrement = branchOneNegative($negativeOffset);
			$posIncrement = branchOnePositive($positiveOffset);
			if($radius >= 1){//this will stop the function if the circle gets too small
				$context.beginPath();//Start the path draw
				$context.arc(circlePositionX+$posIncrement,circlePositionY,$radius,0,2*Math.PI);//Draw an arc to specifications
				$context.fillStyle="rgb("+$colorValue+",0,0)";//define the arc fill colour
				$context.fill();//fill the arc with the defined colour
			}
			if($radius >= 1){//this will stop the function if the circle gets too small
				$context.beginPath();//Start the path draw
				$context.arc(circlePositionX+$negIncrement,circlePositionY,$radius,0,2*Math.PI);//Draw an arc to specifications
				$context.fillStyle="rgb("+$colorValue+",0,0)";//define the arc fill colour
				$context.fill();//fill the arc with the defined colour
			}
			$positiveOffset = $posIncrement;
		}
	}
	//________________________End Double Circle Draw Function


	//________________________Quad Circle Draw Function
	function drawBranchTwo(circlePositionX,circlePositionY,circleColour,circleRadius,initValue){//Handles drawing circles during the second branch point
		if(initValue){//if passed an init value it declares variable base values and passes the init request down the line
			$negativeBase = 0;
			$positiveBase = 0;
		}else{
			console.log("X: "+circlePositionX);
			$positiveBase = branchOnePositive(circlePositionX);
			console.log("PosBase: "+$positiveBase);
			$negativeBase = branchOneNegative(circlePositionX);
			$rightBranchOne = rightBranchPositive($positiveBase);
			$rightBranchTwo = rightBranchNegative($positiveBase);
			$leftBranchOne = leftBranchPositive($negativeBase);
			$leftBranchTwo = leftBranchNegative($negativeBase);
			drawBranches($rightBranchOne, circlePositionY, circleColour, circleRadius);
			//console.log(circlePositionX);
			//console.log($rightBranchOne);
			//drawBranches($rightBranchTwo, circlePositionY, circleColour, circleRadius);
			//drawBranches($leftBranchOne, circlePositionY, circleColour, circleRadius);
			//drawBranches($leftBranchTwo, circlePositionY, circleColour, circleRadius);
		}
	}
	//________________________Quad Circle Draw Function
	


	function drawBranches(xVal,yVal,cVal,radius){
		if($radius >= 1){//this will stop the function if the circle gets too small
			$context.beginPath();//Start the path draw
			$context.arc(xVal,yVal,radius,0,2*Math.PI);//Draw an arc to specifications
			$context.fillStyle="rgb("+cVal+",0,0)";//define the arc fill colour
			$context.fill();//fill the arc with the defined colour
		}

	}



	function rightBranchNegative(xVal){
		$passValue = xVal-1;
		return ($passValue);
	}
	function rightBranchPositive(xVal){
		console.log(xVal);
		$passValue = xVal+4;
		return ($passValue);
	}
	function leftBranchNegative(xVal){
		$passValue = xVal-1;
		return ($passValue);
	}
	function leftBranchPositive(xVal){
		$passValue = xVal+4;
		return ($passValue);
	}
})();