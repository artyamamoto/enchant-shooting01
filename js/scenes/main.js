

var MainScene = Class.create(BaseScene, {
	"status" : configs.GAME_STATUS.START , 
	
	"initialize" : function(game) {
		var self = this;
		
		BaseScene.call(this);
		this.game = game;
		
		this.bg = new Bg();
		this.addChild(this.bg);
		
		this.life = new Label('');
		this.life.x = 10;
		this.life.y = 10;
		this.life.font = '16px sans-serif';
		this.life.color = '#ffff00';
		this.life.addEventListener('enterframe' , function() {
			this.text = 'Life: ';
			for (var i=self.player.life; i>0;i--) 
				this.text += '★';
		});
		this.addChild(this.life);

		// this.player = new Player( (game.width - 32)/2 , game.height - 64);
		this.player = new Player( (game.width - 32)/2 , game.height + 64  );
		this.addChild(this.player);

		this.pad = new Pad();
		this.pad.x = 0;
		this.pad.y = 220;
		this.addChild(this.pad);
		
		this.shots = new Group();
		this.addChild(this.shots);
		
		this.enemies = new Group();
		this.addChild(this.enemies);
		
		this.enemyshots = new Group();
		this.addChild(this.enemyshots);
		
		this.effects = new Group();
		this.addChild(this.effects);
			
		this.initStart();	
		this.addEventListener('enterframe' , this.tick);
	} ,
	"setGameover" : function() {
		this.status = configs.GAME_STATUS.GAMEOVER;
		this.removeChild(this.player);
		this.removeChild(this.shots);
		this.removeChild(this.enemies);
		this.removeChild(this.enemyshots);
		this.removeChild(this.effects);
		this.removeChild(this.life);	

		var img = new Sprite(189,97);
		img.image = game.assets['gameover.png'];
		img.x = (game.width - img.width) / 2;
		img.y = (game.height - img.height) / 2;
		this.addChild(img);
		//} , 2000);
	}	,	
	"initStart" : function() {
		var self = this;
		this.status = configs.GAME_STATUS.START;
		this.player.initStart(function() {
			self.status = configs.GAME_STATUS.GAME;
		});	
	}, 
	"tick" : function() {
		if (this.status == configs.GAME_STATUS.GAMEOVER)
			return;
		
		switch(this.status) {
			//=== スタート
			case configs.GAME_STATUS.START :
			break;
			case configs.GAME_STATUS.GAME : 
				if (game.frame % 24 == 0) {
					this.addEnemy();
				}
				this.checkIntersect();
			break;
		}
	} ,  
	"checkIntersect" : function() {
		for (var e = this.enemies.childNodes.length-1; e >=0; e--) {
			var enemy = this.enemies.childNodes[e];
			for (var i = this.shots.childNodes.length-1; i >=0 ; i--) {
				var shot = this.shots.childNodes[i];
				
				if (enemy.intersect(shot)) {
					shot.die();
					enemy.damage();
				}
			}
			if (! this.player.muteki) {
				if (this.player.within(enemy, 10)) {
					enemy.die();
					this.player.damage();
				}
			}
		}
		if (! this.player.muteki) {
			for (var i = this.enemyshots.childNodes.length-1; i>=0; i--) {
				var shot = this.enemyshots.childNodes[i];
				if (this.player.within(shot,10)) {
					shot.die();
					this.player.damage();
				}
			}
		}
	},
	"addEnemy" : function() {
		if (this.enemies.childNodes.length < 2) {
			Enemy01.addGroup();
		}
	},
	"replaceScene" : function() {
		this.game.replaceScene(this);
	}
});
