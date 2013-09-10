

var GameoverScene = Class.create(BaseScene, {
	"initialize" : function(game) {
		var self = this;
		
		BaseScene.call(this);
		this.game = game;
		
		this.addChild(configs.scenes.main.bg);
		
		var img = new Sprite(189,97);
		img.images = game.assets['gameover.png'];
		img.x = (game.width - img.width) / 2;
		img.y = (game.height - img.height) / 2;
		this.addChild(img);
	} ,
	"replaceScene" : function() {
		this.game.replaceScene(this);
	}
});
