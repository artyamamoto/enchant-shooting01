
var EnemyShot = Class.create(Shot, {
	"asset" : "shots.png",
	"shotframe" : 1 , 
	
	"initialize" : function(x,y,velocity,diff) {
		var v = velocity || 1;
		var diff = diff || {};
		
		var player = configs.scenes.main.player;
		vx = (player.x - x) + (diff.x || 0);
		vy = (player.y - y) + (diff.y || 0);
		var len = (vx * vx + vy * vy);
		if (len != 0) {
			len = Math.sqrt(len);
			vx = Math.min( v, vx / len * v);
			vy = Math.min( v, vy / len * v);
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
