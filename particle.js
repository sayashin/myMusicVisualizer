function FireworkParticle(x, y, colour, angle, speed){
var x = x;
var y = y;
var colour = colour;
var angle = angle;

this.speed = speed;
    
    this.draw = function(){
        this.update();
        fill(colour);
        ellipse(x, y, 10, 10);
    }
    
    this.update = function(){
        this.speed -= 0.5;
        x += cos(angle) * speed;
        y += sin(angle) * speed;
    }
}