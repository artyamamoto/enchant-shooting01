
var Enemy01 = Class.create(BaseEnemy, {
	"asset" : "enemy01.png",
	
	"initialize" : function(x,y) {
		BaseEnemy.call(this, x, y);
		var self = this;
		var x2 = ((x > game.width / 2) ? -24 : 24);
		this.tl
			.moveTo( x,  game.height / 3 , 60, enchant.Easing.EXPO_EASEOUT)
			.delay(10)
			.then(function() {
				self.shot();
			})
			.delay(15)
			.then(function() {
				self.shot();
			})
			.moveBy( x2, -1 * game.height / 12 , 120, enchant.Easing.EXPO_EASEOUT)
			.delay(10)
			.moveTo( x + x2 , game.height + 64 , 60 );	
	} , 
	"tick" : function() {
		BaseEnemy.prototype.tick.call(this);
		/* if (game.frame % 36 == rand(0,35)) {
			var x = this.x + (this.width / 2) - 8;
			var y = this.y + (this.height / 2) - 8;
			var shot = new EnemyShot(x, y, 1);
		} */
	} , 
	"shot" : function() {
		var x = this.x + (this.width / 2) - 8;
		var y = this.y + (this.height / 2) - 8;
		var shot = new EnemyShot(x, y, 1.5);
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

