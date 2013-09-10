
var Enemy01 = Class.create(BaseEnemy, {
	"asset" : "enemy01.png",
	
	"initialize" : function(x,y) {
		BaseEnemy.call(this, x, y);
		
		var vx = ((x > game.width / 2) ? -2 : 2);
		this.tl
			.move( 0,  4 , function() { return (this.y > game.height / 3); })
			.move( vx, -2 , function() { return (this.y < game.height / 4); })
			.move( 0 , 6 );	
	} , 
	"tick" : function() {
		BaseEnemy.prototype.tick.call(this);
		if (game.frame % 36 == rand(0,35)) {
			var x = this.x + (this.width / 2) - 8;
			var y = this.y + (this.height / 2) - 8;
			var shot = new EnemyShot(x, y);
		}
	}  
});
Enemy01.addGroup = function() {
	var x = rand( 32 , game.width - 64);
	var loop = 5;
	var set = function() {
		if (configs.scenes.main.player.is_start) 
			return;
		
		new Enemy01(x, -16);
		if (loop-- > 0)
			setTimeout(set , 2000);
	};
	set();
};

