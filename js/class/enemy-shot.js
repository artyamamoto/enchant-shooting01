
var EnemyShot = Class.create(Shot, {
	"asset" : "shots.png",
	"shotframe" : 1 , 
	
	"initialize" : function(x,y) {
		var player = configs.scenes.main.player;
		var vx = (player.x - x);
		var vy = (player.y - y);
		var len = (vx * vx + vy * vy);
		if (len != 0) {
			len = Math.sqrt(len);
			vx = Math.min( 3, vx / len * 3);
			vy = Math.min( 3, vy / len * 3);
		}
		Shot.call(this,x,y,vx,vy);
	},
	"tick" : function() {
		Shot.prototype.tick.call(this);
	} , 
	"add" : function() {
		configs.scenes.main.enemyshots.addChild(this);
	},
	"die" : function() {
		this.removeEventListener('enterframe', this.tick);
		configs.scenes.main.enemyshots.removeChild(this);
	}
});
