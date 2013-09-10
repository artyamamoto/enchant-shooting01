
var BaseSprite = Class.create(Sprite, {
	"initialize" : function(x,y) {
		Sprite.call(this,x,y);
		var self = this;
		
		self._tl = {
			"list" : [] , 
			"loop" : false, 
			"idx" : 0 , 
			"frame" : 0 
		};
		
		self.tl = {};
		self.tl.moveBy = function(x1,y1,framenum) {
			self._tl.list.push({
				"type"  : "moveBy" , 
				"arguments" : arguments 
			});
			return self.tl;
		};
		self.tl.move = function(vx,vy,func) {
			self._tl.list.push({
				"type" : "move" , 
				"arguments" : arguments 
			});
			return self.tl;
		};
		self.tl.loop = function(flg) {
			if (flg !== false) 
				flg = true;
			self._tl.loop = flg;
			return self.tl;
		};
		self.addEventListener('enterframe' , function() {
			if (this._tl.list.length <= 0)
				return;
			
			if (this._tl.list.length <= this._tl.idx) {
				if (this._tl.loop == false)
					return ;
				else 
					this._tl.idx %= this._tl.list.length;
			}
			
			var data = this._tl.list[this._tl.idx];
			switch(data.type) {
				case 'moveBy' :
				case 'move':
					if (this["_" + data.type].apply(this, data.arguments)) {
						this._tl.idx++;
						this._tl.frame = 0;
					}
				break;
			}
		});
	}  ,
	"_moveBy" : function(x1,y1,framenum) {
		var is_complete = false;
		
		if (this._tl.frame == 0) {
			this._tl.vx = (x1 - this.x) / framenum;
			this._tl.vy = (y1 - this.y) / framenum;
		} else if (this._tl.frame >= framenum) {
			this.x = x1;
			this.y = y1;
			is_complete = true;
		} else {
			this.x += this._tl.vx;
			this.y += this._tl.vy;
		}
		this._tl.frame++;
		return is_complete;
	} , 
	"_move" : function(vx,vy,callback) {
		this.x += vx;
		this.y += vy;
		var is_complete = (callback ?  callback.call(this) : false);
		return is_complete;
	}  
});
