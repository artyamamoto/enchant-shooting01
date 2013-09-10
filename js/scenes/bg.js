// 使っていない

var BgScene = Class.create(BaseScene, {
	"initialize" : function(game) {
		BaseScene.call(this);
		this.game = game;
		
		this.bg = new Bg();
		this.addChild(this.bg);
	} ,
	"replaceScene" : function() {
		this.game.replaceScene(this);
	}
});
