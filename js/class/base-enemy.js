
var BaseEnemy = Class.create(BaseSprite, {
	"asset" : "enemy01.png",
	
	"initialize" : function(x,y,vx,vy) {
		var img = game.assets[this.asset];
		
		BaseSprite.call(this,img.width,img.height);
		this.image = img;
		this.frame = 3;
		this.x = x;
		this.y = y;
		this.vx = vx || 0;
		this.vy = vy || 0;
		this.hp = 1;		
		
		//if (angle)
		//	this.rotate(angle);
			
		this.addEventListener('enterframe' , this.tick);
		this.add();
	} , 
	"tick" : function() {
		this.x += this.vx;
		this.y += this.vy;
		if ( (this.x + this.width + 32 < 0) || 
			 (this.x - 32 > game.width) || 
			 (this.y + this.height + 32 < 0) || 
			 (this.y - 32 > game.height) ) 
		{
			this.die();
		}
	} , 
	"add" : function() {
		configs.scenes.main.enemies.addChild(this);
	},
	"damage" : function() {
		this.hp --;
		if (this.hp <=0) {
			this.die();
		}
	},
	"die" : function() {
		this.removeEventListener('enterframe', this.tick);
		configs.scenes.main.enemies.removeChild(this);
		
		new Explosion(this.x, this.y);
	}
});
