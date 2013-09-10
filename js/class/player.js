
var Player = Class.create(Sprite , {
	"initialize" : function(x,y) {
		Sprite.call(this, 24,24);
		this.image = game.assets['common.png'];
		
		this.frame = 2;
		this.x = x;
		this.y = y;
		this.vx = 0;
		this.vy = 0;
		//this.ax = 0;
		//this.ay = 0;
		console.log(this);
		
		this.is_start = 0;
		this.shooting = false;
		this.listen_key = false;
		
		this.life = 3;
		this.muteki = false;
		this.muteki_frame = 0;
			
		this.addEventListener('enterframe' , this.tick);
	} , 
	"tick" : function() {
		if (this.life <= 0)
			return;
		//var a = 0.1; // 加速度
		//var max_a = 0.6;
		var max_v = 5; // 最大速度　
		if (this.listen_key) {
			this.vx = this.vy = 0;
			if (game.input.up)    this.vy = -1 * max_v;
			if (game.input.down)  this.vy = max_v;
			if (game.input.left)  this.vx = -1 * max_v;
			if (game.input.right) this.vx = max_v;
		}	
		this.x = this._range( this.x + this.vx , 0, game.width - this.width );
		this.y = this._range( this.y + this.vy , 0, game.height - this.height );
		
		if (this.shooting) {
			if (game.frame % 3 == 0) {
				this.addShot();
			}
		}
		if (this.is_start) {
			switch(this.is_start) {
				case 1 :
					if (game.height / 2 > this.y) {
						this.vy = 2;
						this.is_start = 2;
					}
				break;
				case 2 :
					if (this.y > game.height - 64) {
						this.is_start = 0;
						this.vx = this.vy = 0;
						this.listen_key = true;
						this.shooting = true;	
						if (this._complete_callback)
							this._complete_callback.call(this);
					}
				break;
			}
		}
		
		if (this.muteki) {
			this.visible = !this.visible;
			if (this.muteki_frame > 0) {
				if (--this.muteki_frame <= 0) {
					this.muteki = false;
					this.muteki_frame = 0;
				}
			}
		} else {
			this.visible = true;
		} 
	} ,
	"damage" : function() {
		new Explosion(this.x, this.y);
		this.life --;
		if (this.life <= 0) {
			configs.scenes.main.setGameover();
		} else {
			this.muteki = true;
			this.initStart(function() {
				this.muteki_frame = 128;
			});
		}
	}, 
	"initStart" : function(complete_callback) {
		this.x = (game.width - 32)/2;
		this.y = game.height + 64 ;	
		this.vx = 0;
		this.vy = -2;
		this.is_start = 1;
		this.listen_key = false;
		this.shooting = false;
		this._complete_callback = complete_callback;	
	},
	"addShot" : function() {
		var x = 0, y = 0, vx = 0, vy = 0;
		x = this.x + 4;
		y = this.y - 16;
		vx = 0;
		vy = -9;
		var shot = new PlayerShot(x,y,vx,vy);
		
		var self = this;
		[1,-1].forEach(function(sign) {
			//angle = Math.PI * (0.1 * sign);
			
			x = self.x + 4 + 12 * sign; //self.width / 2 + (-1 * sign * 6);
			y = self.y - 12;
			vx = 3.5 * sign;//9 * Math.cos(angle) * -1;
			vy = -5.5;//9 * Math.abs(Math.sin(angle)) * -1;
			new PlayerShot(x,y,vx,vy, 180 * 0.15 * sign);
		});	
	},
	"_addShot" : function() {
		
	},
	"_range" : function(n,min,max) {
		if (! max) {
			max = Math.abs(min);
			min = -1 * max;
		}
		if (n > max) 
			n = max;
		if ( n < min)
			n = min;
		return n;
	}
});

