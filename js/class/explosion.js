

var Explosion = Class.create(Sprite ,{
	"initialize" : function (x,y) {
		Sprite.call(this,24,24);
		this.image = game.assets['common.png'];
		this.frame = 10;
		this.x = x;
		this.y = y;
		this.scaleX = 2;
		this.scaleY = 2;
		
		this.addEventListener('enterframe', this.tick);
		this.add();
	} , 
	"tick" : function() {
		this.frame++;
		if (this.frame >= 18) {
			this.die();
		}
	} , 
	"add" : function() {
		configs.scenes.main.effects.addChild(this);
	},
	"die" : function() {
		this.removeEventListener('enterframe', this.tick);
		configs.scenes.main.effects.removeChild(this);
	}
});

