var five = require("johnny-five");
var board = new five.Board();

board.on("ready", function() {
  var proximity = new five.Proximity({
    controller: "HCSR04",
    pin: 7
  });

  var piezoRojo = new five.Piezo(3);
  var piezoAmarillo = new five.Piezo(3);
  var piezoVerde = new five.Piezo(3);
  board.repl.inject({
    piezoRojo: piezoRojo,
    piezoAmarillo: piezoAmarillo,
    piezoVerde: piezoVerde
  });

  proximity.on("data", function() {
    console.log("Proximity: ");
    console.log("  cm  : ", this.cm);
    console.log("  in  : ", this.in);
    console.log("-----------------");

    let ledRojo = five.Led(13);
    let ledAmarillo = five.Led(8);
    let ledVerde = five.Led(12);

    if(this.cm < 10 && this.cm > 0){
        ledRojo.on();
        piezoRojo.play({
            song: "A A A A A A A A A A A A A A A A",
            beats: 1 / 4
        });
    }else{
        piezoRojo.off();
        ledRojo.off();
    } 
    
    if(this.cm < 25 && this.cm > 10){
        ledRojo.off();
        ledAmarillo.on(); 
        piezoAmarillo.play({
            song: "A A A A A A A A A A - - - - - - - ",
            beats: 1 / 4
        });
    }else{
        piezoAmarillo.off();
        ledAmarillo.off();
    }

    if(this.cm < 50 && this.cm > 25){
        ledAmarillo.off();
        ledVerde.on();
        piezoVerde.play({
            song: "A - - - - - - - - - - - - - - ",
            beats: 1 / 4
        });
    }else{
        piezoVerde.off();
        ledRojo.off();
        ledAmarillo.off();
        ledVerde.off();
    }

  });

  /*proximity.on("change", function() {
    console.log("The obstruction has moved.");
  });*/
});
