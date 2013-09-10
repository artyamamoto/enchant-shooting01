

var BaseScene = Class.create(Scene, {
	"initialize" : function(game) {
		Scene.call(this);
		this.game = game;
	} , 
	"replaceScene" : function() {
		this.game.replaceScene(this);
	} ,
	"focus" : function() {
		this.game.replaceScene(this);
	}
});
