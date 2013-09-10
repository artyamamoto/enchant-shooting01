
var PlayerShot = Class.create(Shot, {
	"asset" : "shots.png",
	"shotframe" : 3 , 
	
	"tick" : function() {
		Shot.prototype.tick.call(this);
	}
});
