
var Shot = Class.create(Sprite, {
	"asset" : null , // should overwrite
	"shotframe" : 3 , 
	
	"initialize" : function(x,y,vx,vy,angle) {
		var img = game.assets[this.asset];
		
		Sprite.call(this,16,16);
		this.image = img;
		this.frame = this.shotframe;
		this.x = x;
		this.y = y;
		this.vx = vx || 0;
		this.vy = vy || 0;
		
		if (angle)
			this.rotate(angle);
			
		this.addEventListener('enterframe' , this.tick);
		this.add();
	} , 
	"tick" : function() {
		this.x += this.vx;
		this.y += this.vy;
		if ( (this.x + this.width < 0) || 
			 (this.x > game.width) || 
			 (this.y + this.height < 0) || 
			 (this.y > game.height) ) 
		{
			this.die();
		}
	} , 
	"add" : function() {
		configs.scenes.main.shots.addChild(this);
	},
	"die" : function() {
		this.removeEventListener('enterframe', this.tick);
		configs.scenes.main.shots.removeChild(this);
	}
});
