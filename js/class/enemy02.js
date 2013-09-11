
var Enemy02 = Class.create(BaseEnemy, {
	"asset" : "enemy02.png",
	
	"initialize" : function() {
		var x = rand( 36 , game.width - 72 );
		var y = -32;
		
		BaseEnemy.call(this, x, y);
		var self = this;
		this.tl
			.moveTo( x,  rand(1,15) , 30, enchant.Easing.EXPO_EASEOUT)
			.delay(2).then(function() {
				self.shot(-36);
				self.shot(-12);
				self.shot(12);
				self.shot(36);
			})
			.delay(10).then(function() {
				self.shot(-24);
				self.shot(0);
				self.shot(24);
				self.shot(48);
			})
			.delay(10).then(function() {
				self.shot(-36);
				self.shot(-12);
				self.shot(12);
				self.shot(36);
			})
			/* .moveBy( 10 , 0 , 12)
			.delay(2).then(function() {
				self.shot(0);
			})
			.moveBy( 10 , 0 , 12)
			.delay(2).then(function() {
				self.shot(0);
			})
			.moveBy( 10 , 0 , 12)
			.delay(2).then(function() {
				self.shot(0);
			}) */
			.moveTo( x + 30 , game.height + 64 , 120 , enchant.Easing.EXPO_EASEOUT );	
	} , 
	"tick" : function() {
		BaseEnemy.prototype.tick.call(this);
		/* if (game.frame % 36 == rand(0,35)) {
			var x = this.x + (this.width / 2) - 8;
			var y = this.y + (this.height / 2) - 8;
			var shot = new EnemyShot(x, y, 1);
		} */
	} , 
	"shot" : function(diff) {
		var x = this.x + (this.width / 2) - 8;
		var y = this.y + (this.height / 2) - 8;
		
		if (this.x > game.width / 2) 
			diff *= -1;
		
		var shot = new EnemyShot(x, y, 1.7, {"x":diff});
	}
});

