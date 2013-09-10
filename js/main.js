
// enchant();

var game = game || {};

window.onload = function() {
	game = new Game(configs.game.width,configs.game.height);
	game.keybind(88,'a'); // X
	game.keybind(90,'b'); // Z
	game.fps = 64;
	game.preload.apply(game ,configs.resources);
	game.onload = function() {
		configs.scenes = {};
		//configs.scenes.bg = new BgScene(game);
		configs.scenes.main = new MainScene(game);
		
		configs.scenes.main.focus();
		//game.replaceScene( configs.scenes.bg );
		//game.pushScene( configs.scenes.main );	
	};
	game.start();
	/**
	async.parallel([
		function(next) {
			jQuery.get( configs.ajax.map.field, {}, function(data) {
				configs.map.field = data;
				next();
			});
		} ,
		function(next) {
			jQuery.get( configs.ajax.map.dungeon, {}, function(data) {
				configs.map.dungeon = data;
				next();
			});
		}
	], function() {
		game.start();
	}); **/
	/* jQuery.get( configs.ajax.map.field, {}, function(data) {
		configs.map.field = data;
		game.start();
	} , "json"); */
};
