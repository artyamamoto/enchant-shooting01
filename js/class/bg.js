
var Bg = Class.create(Group, {
	"initialize" : function() {
		Group.call(this);
		
		this.idx = 0;
		this.images = [];
		for (var i=0; i<=5; i++) {
			var img = game.assets['map1' + i + '.png'];
			this.images.push(img);	
		}
		
		this.bg1 = this.createSprite(this.images[this.idx]);
		this.addChild(this.bg1);
		
		this.bg2 = this.createSprite(this.images[(this.idx + 1) % this.images.length]);
		this.bg2.y = -319;
		this.addChild(this.bg2);
		
		this.addEventListener('enterframe' , this.tick);
	
		this.vy = 3.5;//Math.floor(64 * 4 / game.fps);	
	} , 
	"createSprite" : function(img) {
		var s = new Sprite(img.width, img.height);
		s.image = img;
		return s;
	},
	"tick" : function() {
		this.bg1.y += this.vy;
		this.bg2.y += this.vy;
		
		if (this.bg1.y >= 319) {
			this.bg1.image = this.bg2.image;
			this.bg1.y = 0;
			this.bg2.image = this.images[(++this.idx) % this.images.length];
			this.bg2.y = -319;
		}
		
	}
});

