
var Sound = new ( function(){
	var self = this;
	self.use = true;
	self.play = function(fname,is_clone) {
		if (self.use) {
			if (is_clone)
				game.assets[fname].clone().play();
			else
				game.assets[fname].play();
		}
	};
	self.stop = function(fname) {
		self.use && 
			game.assets[fname].stop();
	};
	return self;
})();

