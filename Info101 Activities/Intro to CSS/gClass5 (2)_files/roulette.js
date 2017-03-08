  var colors = ["#99ccff", "#6699cc", "#AAAAAA", "#99ccff",
               "#6699cc", "#AAAAAA", "#99ccff", "#6699cc",
               "#AAAAAA", "#99ccff", "#6699cc", "#AAAAAA"];
  var restaraunts = ["Two Coin", "One Coin", "Three Coin", "Two Coin",
                     "One Coin", "Three Coins", "Two Coins", "One Coin",
                     "Three Coin", "Two Coins", "One Coin", "Three Coins"];
  
  var startAngle = 0;
  var arc = Math.PI / 6;
  var spinTimeout = null;
  
  var spinArcStart = 10;
  var spinTime = 0;
  var spinTimeTotal = 0;
  
  var ctx;
  
  function draw() {
    drawRouletteWheel();
  }
  
  function drawRouletteWheel() {
    var canvas = document.getElementById("wheelcanvas");
	//G_vmlCanvasManager.initElement('canvas');
	//ctx = canvas.getContext('canvas');
    if (canvas.getContext) {
      var outsideRadius = 200;
      var textRadius = 160;
      var insideRadius = 125;
      
      ctx = canvas.getContext("2d");
      ctx.clearRect(0,0,200,200);
      
      
      ctx.strokeStyle = "black";
      ctx.lineWidth = 2;
      
      ctx.font = 'bold 12px sans-serif';
      
      for(var i = 0; i < 12; i++) {
        var angle = startAngle + i * arc;
        ctx.fillStyle = colors[i];
        
        ctx.beginPath();
        ctx.arc(250, 250, outsideRadius, angle, angle + arc, false);
        ctx.arc(250, 250, insideRadius, angle + arc, angle, true);
        ctx.stroke();
        ctx.fill();
        
        ctx.save();
        ctx.shadowOffsetX = -1;
        ctx.shadowOffsetY = -1;
        ctx.shadowBlur    = 0;
        ctx.shadowColor   = "rgb(220,220,220)";
        ctx.fillStyle = "black";
        ctx.translate(250 + Math.cos(angle + arc / 2) * textRadius, 250 + Math.sin(angle + arc / 2) * textRadius);
        ctx.rotate(angle + arc / 2 + Math.PI / 2);
        var text = restaraunts[i];
        ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
        ctx.restore();
      } 
      
      //Arrow
      ctx.fillStyle = "black";
      ctx.beginPath();
      ctx.moveTo(250 - 4, 250 - (outsideRadius + 5));
      ctx.lineTo(250 + 4, 250 - (outsideRadius + 5));
      ctx.lineTo(250 + 4, 250 - (outsideRadius - 5));
      ctx.lineTo(250 + 9, 250 - (outsideRadius - 5));
      ctx.lineTo(250 + 0, 250 - (outsideRadius - 13));
      ctx.lineTo(250 - 9, 250 - (outsideRadius - 5));
      ctx.lineTo(250 - 4, 250 - (outsideRadius - 5));
      ctx.lineTo(250 - 4, 250 - (outsideRadius + 5));
      ctx.fill();
    }
  }
  
//  function spin() {
//	$('#rouletteSpin').attr("disabled", "disabled");
//    spinAngleStart = Math.random() * 10 + 10;
//    spinTime = 0;
//    spinTimeTotal = Math.random() * 3 + 4 * 1000;
//    rotateWheel();
//	setTimeout('hideWheel()', 12000);
//  }
  
//  function hideWheel() {
//	$('#roulette').toggle(1000);
//  }
  
  function rotateWheel() {
    spinTime += 30;
    if(spinTime >= spinTimeTotal) {
      var candy = stopRotateWheel();
	 // updateWheelStatus(index);
	  //close the wheel, update rotate status
      return;
    }
    var spinAngle = spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);
    startAngle += (spinAngle * Math.PI / 180);
    drawRouletteWheel();
    spinTimeout = setTimeout('rotateWheel()', 30);
  }
  
  //return index ajax (So that wheel isn't rendered if the user comes back to topic)
  //So this is insecure and all of this index finding math should be done on the server
  //so that someone can't hack this and get unlimited candy by sending to the ajax url
  //that they earned a candy.
  function updateWheelStatus(candy) {
	var url = "";
	jquery.ajax(url+candy); //updates candy count and sets roulette spun = true
  }
  
  function stopRotateWheel() {
    clearTimeout(spinTimeout);
    var degrees = startAngle * 180 / Math.PI + 90;
    var arcd = arc * 180 / Math.PI;
    var index = Math.floor((360 - degrees % 360) / arcd);
    ctx.save();
    ctx.font = 'bold 30px sans-serif';
    var text = restaraunts[index] //resaraunts is the array of types
    ctx.fillText("You Won " + text, 250 - ctx.measureText("You Won " + text).width / 2, 250 + 10);
    ctx.restore();
	return restaraunts[index];
  }
  
  function easeOut(t, b, c, d) {
    var ts = (t/=d)*t;
    var tc = ts*t;
    return b+c*(tc + -3*ts + 3*t);
  }
  
 