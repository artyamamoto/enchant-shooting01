/**
	jQuery Alert Dialogs Plugin ‰ü‘¢”Å
	
	¡ˆÈ‰º‚ÌÝ’è‚Ì’Ç‰Á
	  ¦ŒÄ‚Ño‚µŒã‚ÉƒŠƒZƒbƒg‚³‚ê‚é‚½‚ßAŒÄ‚Ño‚µ‘O‚É–ˆ‰ñ•Ï”‚ðXV‚·‚é•K—v‚ª‚ ‚éB
	
	$.alerts.buttonHTML  : (String) ƒ{ƒ^ƒ“•”•ª‚ÌHTML
	$.alerts.showClose   : (Bool)   ~ƒ{ƒ^ƒ“‚Ì•\Ž¦
	$.alerts.mybtns      : (Array)  {"#selector" : function() {}} ‚ÅƒR[ƒ‹ƒoƒbƒN‚ð’¼ÚŽw’è‚Å‚«‚é
	                                i$.alerts._hide() ‚àˆÃ–Ù‚É‚ÍŽÀs‚³‚ê‚È‚¢j
	$.alerts.beforeOK    : (Function) remove ‘O‚ÉŽÀs‚³‚ê‚é
	$.alerts.afterShow   : (Function) •\Ž¦’¼Œã
	
	$.showalert({
		"type" 		: "alert" , 
		"title" 	: title , 
		"message" 	: message , 		
		"value" 	: "",				// prompt‚Ì‚Ý
		
		"ok" 		: '&nbsp;OK&nbsp;', 			// null ‚Å”ñ•\Ž¦
		"cancel"	: '&nbsp;ƒLƒƒƒ“ƒZƒ‹&nbsp;' , 	// null ‚Å”ñ•\Ž¦
		"btn_html"	: '',							// ƒ{ƒ^ƒ“HTML iok/cancel‚É—Dæ‚·‚éj
		
		"closebtn" 	: false , 		// ~ƒ{ƒ^ƒ“•\Ž¦
		
		"callback" : function(r) {
			
		} , 
		"btn_callbacks" : {
			"#selector" : function() {
				// ‚»‚Ì‘¼‚Ìƒ{ƒ^ƒ“‚ðŽw’è‚µ‚½ê‡‚ÌƒR[ƒ‹ƒoƒbƒN
				// $.alerts._hide() ‚àˆÃ–Ù‚É‚ÍŽÀs‚³‚ê‚È‚¢
			}
		}
	});
	
	
*/

// jQuery Alert Dialogs Plugin
//
// Version 1.1
//
// Cory S.N. LaViska
// A Beautiful Site (http://abeautifulsite.net/)
// 14 May 2009
//
// Visit http://abeautifulsite.net/notebook/87 for more information
//
// Usage:
//		jAlert( message, [title, callback] )
//		jConfirm( message, [title, callback] )
//		jPrompt( message, [value, title, callback] )
// 
// History:
//
//		1.00 - Released (29 December 2008)
//
//		1.01 - Fixed bug where unbinding would destroy all resize events
//
// License:
// 
// This plugin is dual-licensed under the GNU General Public License and the MIT License and
// is copyright 2008 A Beautiful Site, LLC. 
//
(function($) {
	var htmlescape = htmlescape || function(str) {
		str = "" + str;
		str = str.replace(/&/g,'&amp;');
		str = str.replace(/>/g,'&gt;');
		str = str.replace(/</g,'&lt;');
		str = str.replace(/"/g, '&quot;');
		return str;
	};
	$.showalert = function(options, _title, _callback) {
		if (typeof options != "object") {
			// $.showalert("message"[,"title"][, function() {}])
			var s = options;
			_title = _title || null;
			_callback = _callback || null;
			
			if (typeof _title == "function") {
				_callback = _title;
				_title = null;
			}
			options = {
				"title" 	: _title,
				"message"	: s , 
				"ok"		: '&nbsp;OK&nbsp;' , 
				'ok_class'	: 'ok' , 
				'cancel'	: '' ,
				"callback" 	: _callback
			};
		}
	
		var type = options.type || "alert";
		var defaults = {
			"title"			: null , 
			"message"		: "" ,
			"value"			: "" , 							// prompt‚Ì‚Ý
			
			"ok"			: '&nbsp;OK&nbsp;', 			// null ‚Å”ñ•\Ž¦
			'ok_class'		: '', 
			"cancel"		: '&nbsp;ƒLƒƒƒ“ƒZƒ‹&nbsp;' ,	// null ‚Å”ñ•\Ž¦
			'cancel_class'	: '', 
			'btn_html' 		: '',							// ƒ{ƒ^ƒ“HTML iok/cancel‚æ‚è‚à—Dæ‚·‚éj
			"width"			: null,							// •
			
			'close_btn'		: false , 						// ~ƒ{ƒ^ƒ“•\Ž¦
			'callback'		: null , 						// ƒR[ƒ‹ƒoƒbƒN
			"btn_callbacks"	: null ,							// ‚»‚Ì‘¼ƒ{ƒ^ƒ“
			
			"before_ok"		: null ,						// OK ŽžƒR[ƒ‹ƒoƒbƒN’¼‘O
			"before_cancel" : null,							// ƒLƒƒƒ“ƒZƒ‹ƒR[ƒ‹ƒoƒbƒN’¼‘O
			"after_show" 	: null 							// •\Ž¦’¼Œã
		};
		if (type == "alert") {
			defaults.cancel = null;
		}
		
		options = $.extend(defaults ,options);
//		alert($.dump(options));
		//=== btn 
		if (options.btn_html) {
			$.alerts.buttonHTML = options.btn_html;
		} else {
			var s = '';
			if (options.ok) {
				s += '<input type="button" value="' + options.ok + '" id="popup_ok" ';
				if (options.ok_class) 
					s += 'class="'+ options.ok_class +'" ';
				s += '/>';
			} 
			if (options.cancel) {
				s += '<input type="button" value="' + options.cancel + '" id="popup_cancel" ';
				if (options.cancel_class) 
					s += 'class="'+ options.cancel_class +'" ';
				s += '/>';
			}
			$.alerts.buttonHTML = (s || '-');
		}
		
		//=== close btn 
		if (options.close_btn) {
			$.alerts.showClose = true;
		} else {
			$.alerts.showClose = false;
		}
		//=== callbacks
		if (options.btn_callbacks) {
			$.alerts.mybtns = options.btn_callbacks;
		}
		if (options.before_ok) {
			$.alerts.beforeOK = options.before_ok;
		}
		if (options.before_cancel) {
			$.alerts.beforeCancel = options.before_cancel;
		}
		if (options.after_show) {
			$.alerts.afterShow = options.after_show;
		}
		if (options.width) {
			$.alerts.width = options.width;
		}
		
		switch (type) {
			case 'alert' : 
				$.alerts.alert(options.message, options.title, options.callback);
			break;
			case 'confirm' : 
				$.alerts.confirm(options.message, options.title, options.callback);
			break;
			case 'prompt' : 
				$.alerts.prompt(options.message, options.value, options.title, options.callback);
			break;
		}
	};

	$.alerts = {
		
		// These properties can be read/written by accessing $.alerts.propertyName from your scripts at any time
		
		verticalOffset: -75,                // vertical offset of the dialog from center screen, in pixels
		horizontalOffset: 0,                // horizontal offset of the dialog from center screen, in pixels/
		repositionOnResize: true,           // re-centers the dialog on window resize
		overlayOpacity: .5,                // transparency level of overlay
		overlayColor: '#000',               // base color of overlay
		draggable: true,                    // make the dialogs draggable (requires UI Draggables plugin)
		okButton: '&nbsp;OK&nbsp;',         // text for the OK button
		cancelButton: '&nbsp;ƒLƒƒƒ“ƒZƒ‹&nbsp;', // text for the Cancel button
		dialogClass: null,                  // if specified, this class will be applied to all dialogs
		
		// ___CUSTOMIZE___
		buttonHTML : null , 
		showClose : false, 
		
		// Public methods
		
		alert: function(message, title, callback) {
			$.alerts._show(title, message, null, 'alert', function(result) {
				if( callback ) callback(result);
			});
		},
		
		confirm: function(message, title, callback) {
			$.alerts._show(title, message, null, 'confirm', function(result) {
				if( callback ) callback(result);
			});
		},
			
		prompt: function(message, value, title, callback) {
			$.alerts._show(title, message, value, 'prompt', function(result) {
				if( callback ) callback(result);
			});
		},
		
		// Private methods
		
		_show: function(title, msg, value, type, callback) {
			
			$.alerts._hide();
			$.alerts._overlay('show');
			
			if ($.alerts.showClose) {
				$("BODY").append(
				  '<div id="popup_container">' + 
				    '<h1 id="popup_title"></h1>' +
				  	'<div id="popup_close"><a href="javascript: void(0);">close</a></div>' + 
				    '<div id="popup_content">' +
				      '<div id="popup_message"></div>' +
					'</div>' +
				  '</div>' );
			} else {
				$("BODY").append(
				  '<div id="popup_container">' + 
				    '<h1 id="popup_title"></h1>' +
				    '<div id="popup_content">' +
				      '<div id="popup_message"></div>' +
					'</div>' +
				  '</div>' );
			}
			$.alerts.showClose = false;
			
			if( $.alerts.dialogClass ) $("#popup_container").addClass($.alerts.dialogClass);
			
			// IE6 Fix
			var pos = 'fixed';//($.browser.msie && parseInt($.browser.version) <= 6 ) ? 'absolute' : 'fixed'; 
			
			$("#popup_container").css({
				position: pos,
				zIndex: 99999,
				padding: 0,
				margin: 0
			});
			
			if (title) {
				// $("#popup_title").text(title).show();
				$("#popup_title").html( htmlescape(title).replace(/\n/,'<br />') ).show();
			} else 
				$("#popup_title").hide();
			$("#popup_content").addClass(type);
			
			if ($.alerts.html) {
				$("#popup_message").html(msg);
				$.alerts.html = false;
			} else 
				$("#popup_message").html( msg.replace(/\n/,'<br />') );
			
			
			$("#popup_container").css({
		//		minWidth: $("#popup_container").outerWidth(),
		//		maxWidth: $("#popup_container").outerWidth()
				minWidth: ($.alerts.width || $("#popup_container").outerWidth()),
				maxWidth: ($.alerts.width || $("#popup_container").outerWidth())
			}); 
			$.alerts.width = null;
			
			$.alerts._reposition();
			$.alerts._maintainPosition(true);
			
			switch( type ) {
				case 'alert':
					if ($.alerts.buttonHTML) {
						if ($.alerts.buttonHTML == "-") {
							// - ‚ÌŽž‚Í‰½‚à•\Ž¦‚µ‚È‚¢
						} else {
							$("#popup_message").after('<div id="popup_panel">' + $.alerts.buttonHTML + '</div>');
						}
						$.alerts.buttonHTML = null;
					} else {
						$("#popup_message").after('<div id="popup_panel"><input type="button" value="' + 
										$.alerts.okButton + '" id="popup_ok" /></div>');
					}
				//	$("#popup_ok").focus();
					$("#popup_ok").click( function() {
						if ($.alerts.beforeOK) {
							var func = $.alerts.beforeOK;
							func();
							$.alerts.beforeOK = null;
						}
						$.alerts._hide();
						callback(true);
					});
					$("#popup_ok").keypress( function(e) {
						if( e.keyCode == 13 || e.keyCode == 27 ) 
							$("#popup_ok").trigger('click');
					});
					$("#popup_cancel, #popup_close, #popup_overlay").click( function() {
						if ($.alerts.beforeCancel) {
							var func = $.alerts.beforeCancel;
							func();
							$.alerts.beforeCancel = null;
						}
						$.alerts._hide();
						if( callback ) callback(false);
					});

					// $.alerts.mybtns 
					if ($.alerts.mybtns ) {
						for (var k in $.alerts.mybtns) {
							var f = $.alerts.mybtns[k];
							$(k).click(f);
						}
					} 
					$.alerts.mybtns = null;
				break;
				case 'confirm':
					if ($.alerts.buttonHTML) {
						if ($.alerts.buttonHTML == "-") {
							// - ‚ÌŽž‚Í‰½‚à•\Ž¦‚µ‚È‚¢
						} else {
							$("#popup_message").after('<div id="popup_panel">' + $.alerts.buttonHTML + '</div>');
						}
						$.alerts.buttonHTML = null;
					} else {
						$("#popup_message").after(
								'<div id="popup_panel">'+ 
									'<input type="button" value="' + $.alerts.okButton + '" id="popup_ok" /> ' + 
									'<input type="button" value="' + $.alerts.cancelButton + '" id="popup_cancel" />' + 
								'</div>');
					}
					
					$("#popup_ok").click( function() {
						if ($.alerts.beforeOK) {
							var func = $.alerts.beforeOK;
							var res = func();
							if (res === false) 
								return;
							$.alerts.beforeOK = null;
						}
						$.alerts._hide();
						if( callback ) callback(true);
					});
					$(".popup_other_btns").click( function() {
						var $this = $(this);
						$.alerts._hide();
						if( callback ) callback($this.attr("id"));
					});
					$("#popup_cancel, #popup_close, #popup_overlay").click( function() {
						if ($.alerts.beforeCancel) {
							var func = $.alerts.beforeCancel;
							var res = func();
							if (res === false) 
								return;
							$.alerts.beforeCancel = null;
						}
						$.alerts._hide();
						if( callback ) callback(false);
					});
				//	$("#popup_ok").focus();
					$("#popup_ok, #popup_cancel").keypress( function(e) {
						if( e.keyCode == 13 ) $("#popup_ok").trigger('click');
						if( e.keyCode == 27 ) $("#popup_cancel").trigger('click');
					});
					
					// $.alerts.mybtns 
					if ($.alerts.mybtns ) {
						for (var k in $.alerts.mybtns) {
							var f = $.alerts.mybtns[k];
							$(k).click(f);
						}
					} 
					$.alerts.mybtns = null;
				break;
				case 'prompt':
					if ($.alerts.buttonHTML) {
						$("#popup_message")
							.append('<br /><input type="text" size="30" id="popup_prompt" />')
							.after('<div id="popup_panel">' + $.alerts.buttonHTML + '</div>');
						$.alerts.buttonHTML = null;
					} else {
						$("#popup_message")
							.append('<br /><input type="text" size="30" id="popup_prompt" />')
							.after(
								'<div id="popup_panel">' + 
									'<input type="button" value="' + $.alerts.okButton + '" id="popup_ok" /> ' + 
									'<input type="button" value="' + $.alerts.cancelButton + '" id="popup_cancel" />' + 
								'</div>');
					}
				
					$("#popup_prompt").width( $("#popup_message").width() );
					$("#popup_ok").click( function() {
						if ($.alerts.beforeOK) {
							var func = $.alerts.beforeOK;
							func();
							$.alerts.beforeOK = null;
						}
						var val = $("#popup_prompt").val();
						$.alerts._hide();
						if( callback ) callback( val );
					});
					$("#popup_cancel, #popup_close, #popup_overlay").click( function() {
						$.alerts._hide();
						if( callback ) callback( null );
					});
					$("#popup_prompt, #popup_ok, #popup_cancel").keypress( function(e) {
						if( e.keyCode == 13 ) $("#popup_ok").trigger('click');
						if( e.keyCode == 27 ) $("#popup_cancel").trigger('click');
					});
					if( value ) $("#popup_prompt").val(value);
					$("#popup_prompt").focus().select();
				break;
			}
			
			// Make draggable
			if( $.alerts.draggable ) {
				try {
					$("#popup_container").draggable({ handle: $("#popup_title") });
					$("#popup_title").css({ cursor: 'move' });
				} catch(e) { /* requires jQuery UI draggables */ }
			}
			
			// after show 
			if ($.alerts.afterShow) {
				var func = $.alerts.afterShow;
				func();
				
				$.alerts.afterShow = null;
			}
		},
		
		_hide: function() {
			$("#popup_container").remove();
			$.alerts._overlay('hide');
			$.alerts._maintainPosition(false);
		},
		
		_overlay: function(status) {
			switch( status ) {
				case 'show':
					$.alerts._overlay('hide');
					$("BODY").append('<div id="popup_overlay"></div>');
					$("#popup_overlay").css({
						position: 'absolute',
						zIndex: 99998,
						top: '0px',
						left: '0px',
						width: '100%',
						height: $(document).height(),
						background: $.alerts.overlayColor,
						opacity: $.alerts.overlayOpacity
					});
				break;
				case 'hide':
					$("#popup_overlay").remove();
				break;
			}
		},
		
		_reposition: function() {
			var top = (($(window).height() / 2) - ($("#popup_container").outerHeight() / 2)) + $.alerts.verticalOffset;
			var left = (($(window).width() / 2) - ($("#popup_container").outerWidth() / 2)) + $.alerts.horizontalOffset;
			if( top < 0 ) top = 0;
			if( left < 0 ) left = 0;
			
			// IE6 fix
			// if( $.browser.msie && parseInt($.browser.version) <= 6 ) top = top + $(window).scrollTop();
			
			$("#popup_container").css({
				top: top + 'px',
				left: left + 'px'
			});
			$("#popup_overlay").height( $(document).height() );
		},
		
		_maintainPosition: function(status) {
			if( $.alerts.repositionOnResize ) {
				switch(status) {
					case true:
						$(window).bind('resize', $.alerts._reposition);
					break;
					case false:
						$(window).unbind('resize', $.alerts._reposition);
					break;
				}
			}
		}
		
	}
	
	// Shortuct functions
	jAlert = function(message, title, callback) {
		if (typeof title == "function") {
			callback = title;
			title = null;
		}
		$.alerts.alert(message, title, callback);
	}
	
	jConfirm = function(message, title, callback) {
		if (typeof title == "function") {
			callback = title;
			title = null;
		}
		$.alerts.confirm(message, title, callback);
	};
		
	jPrompt = function(message, value, title, callback) {
		if (typeof title == "function") {
			callback = title;
			title = null;
		}
		$.alerts.prompt(message, value, title, callback);
	};
	
})(jQuery);


function rand(min, max) {
	if (arguments.length == 2) {
		
	} else if (arguments.length == 1) {
		max = min;
		min = 0;
	} else {
		return 0;
	}
	return Math.floor(Math.random() * max + min);
}
function intval(s,base,default_val) {
	default_val = default_val || 0;
	
	var type = typeof(s);
	if (type === 'boolean') {
		return +s;
	} else if (type === 'string') {
		try {
			var tmp = parseInt(s , base || 10);
			return (isNaN(tmp) || !isFinite(tmp)) ? 0 : tmp;
		} catch(e) {}
		
		return 0;
	} else if (type === 'number' && isFinite(s)) {
		return s | 0;
	} 
	return 0;
}
function is_function(v) {
	var r = false;
	if (v && typeof v == 'function')
		r = true;
	return r;
}

var async = {};
async.parallel = function(list,oncomplete) {
	var cnt = 0;
	var finish = function() {
		if (++cnt >= list.length) {
			oncomplete();
		}
	};
	for (var i=list.length -1; i>=0; i--) {
		var func = list[i];
		func.call(null, finish);
	}
};


var configs = {
	"game" : {
		width : 320 , 
		height : 320 
	}, 
	"resources" : [
		"common.png" ,"shots.png","enemy01.png","enemy02.png", 
		"start.png" , "gameover.png" , 
		"map10.png" , "map11.png", "map12.png" , "map13.png" , "map14.png" , "map15.png" , 
		// éŸ³å£°
		"bomb.wav", "lock.wav","STAR1.mp3", "BOSS.mp3" ,
	],
	"GAME_STATUS" : {
		"START" : 1 , 
		"GAME" : 2 , 
		"GAMEOVER" : 3  
	}
};


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


var BaseSprite = Class.create(Sprite, {
	"initialize" : function(x,y) {
		Sprite.call(this,x,y);
		var self = this;
	}  
});

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
		//var a = 0.1; // åŠ é€Ÿåº¦
		//var max_a = 0.6;
		var max_v = 5; // æœ€å¤§é€Ÿåº¦ã€€
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
			if (game.frame % 7 == 0) {
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
		configs.scenes.main.explodeEnemies();
		
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


var BaseEnemy = Class.create(BaseSprite, {
	"asset" : "enemy01.png",
	
	"initialize" : function(x,y,vx,vy) {
		var img = game.assets[this.asset];
		
		BaseSprite.call(this,img.width,img.height);
		this.image = img;
		this.frame = 3;
		this.x = x;
		this.y = y;
		this.vx = vx || 0;
		this.vy = vy || 0;
		this.hp = 1;		
		this.score = 1;
		
		//if (angle)
		//	this.rotate(angle);
			
		this.addEventListener('enterframe' , this.tick);
		this.add();
	} , 
	"tick" : function() {
		this.x += this.vx;
		this.y += this.vy;
		if ( (this.x + this.width + 32 < 0) || 
			 (this.x - 32 > game.width) || 
			 (this.y + this.height + 32 < 0) || 
			 (this.y - 32 > game.height) ) 
		{
			this.die();
		}
	} , 
	"add" : function() {
		configs.scenes.main.enemies.addChild(this);
	},
	"damage" : function() {
		this.hp --;
		if (this.hp <=0) {
			this.die();
		}
	},
	"die" : function() {
		this.removeEventListener('enterframe', this.tick);
		configs.scenes.main.enemies.removeChild(this);
		
		new Explosion(this.x, this.y);
	}
});

var Enemy01 = Class.create(BaseEnemy, {
	"asset" : "enemy01.png",
	
	"initialize" : function(x,y) {
		BaseEnemy.call(this, x, y);
		var self = this;
		var x2 = ((x > game.width / 2) ? -24 : 24);
		this.tl
			.moveTo( x,  game.height / 3 , 60, enchant.Easing.EXPO_EASEOUT)
			.delay(10)
			.then(function() {
				self.shot();
			})
			.delay(15)
			.then(function() {
				self.shot();
			})
			.moveBy( x2, -1 * game.height / 12 , 120, enchant.Easing.EXPO_EASEOUT)
			.delay(10)
			.moveTo( x + x2 , game.height + 64 , 60 );	
	} , 
	"tick" : function() {
		BaseEnemy.prototype.tick.call(this);
		/* if (game.frame % 36 == rand(0,35)) {
			var x = this.x + (this.width / 2) - 8;
			var y = this.y + (this.height / 2) - 8;
			var shot = new EnemyShot(x, y, 1);
		} */
	} , 
	"shot" : function() {
		var x = this.x + (this.width / 2) - 8;
		var y = this.y + (this.height / 2) - 8;
		var shot = new EnemyShot(x, y, 1.5);
	}
});
Enemy01.addGroup = function() {
	var x = rand( 32 , game.width - 64);
	var loop = 5;
	var set = function() {
		if (configs.scenes.main.player.is_start) 
			return;
		
		new Enemy01(x, -16);
		if (loop-- > 0)
			setTimeout(set , 2000);
	};
	set();
};


var Enemy02 = Class.create(BaseEnemy, {
	"asset" : "enemy02.png",
	
	"initialize" : function() {
		var x = rand( 36 , game.width - 72 );
		var y = -32;
		
		BaseEnemy.call(this, x, y);
		var self = this;
		this.tl
			.moveTo( x,  rand(1,15) , 30, enchant.Easing.EXPO_EASEOUT)
			.delay(2).then(function() {
				self.shot(-36);
				self.shot(-12);
				self.shot(12);
				self.shot(36);
			})
			.delay(10).then(function() {
				self.shot(-24);
				self.shot(0);
				self.shot(24);
				self.shot(48);
			})
			.delay(10).then(function() {
				self.shot(-36);
				self.shot(-12);
				self.shot(12);
				self.shot(36);
			})
			/* .moveBy( 10 , 0 , 12)
			.delay(2).then(function() {
				self.shot(0);
			})
			.moveBy( 10 , 0 , 12)
			.delay(2).then(function() {
				self.shot(0);
			})
			.moveBy( 10 , 0 , 12)
			.delay(2).then(function() {
				self.shot(0);
			}) */
			.moveTo( x + 30 , game.height + 64 , 120 , enchant.Easing.EXPO_EASEOUT );	
	} , 
	"tick" : function() {
		BaseEnemy.prototype.tick.call(this);
		/* if (game.frame % 36 == rand(0,35)) {
			var x = this.x + (this.width / 2) - 8;
			var y = this.y + (this.height / 2) - 8;
			var shot = new EnemyShot(x, y, 1);
		} */
	} , 
	"shot" : function(diff) {
		var x = this.x + (this.width / 2) - 8;
		var y = this.y + (this.height / 2) - 8;
		
		if (this.x > game.width / 2) 
			diff *= -1;
		
		var shot = new EnemyShot(x, y, 1.7, {"x":diff});
	}
});



var Explosion = Class.create(Sprite ,{
	"initialize" : function (x,y,sound) {
		Sprite.call(this,24,24);
		this.image = game.assets['common.png'];
		this.frame = 10;
		this.x = x;
		this.y = y;
		this.scaleX = 2;
		this.scaleY = 2;
		
		this.addEventListener('enterframe', this.tick);
		this.add(sound);
	} , 
	"tick" : function() {
		this.frame++;
		if (this.frame >= 18) {
			this.die();
		}
	} , 
	"add" : function(sound) {
		if (sound !== false)
			sound = true;
		configs.scenes.main.effects.addChild(this);
		Sound.play('bomb.wav',sound);
	},
	"die" : function() {
		this.removeEventListener('enterframe', this.tick);
		configs.scenes.main.effects.removeChild(this);
	}
});


var Shot = Class.create(Sprite, {
	"asset" : null , // should overwrite
	"shotframe" : 3 , 
	
	"initialize" : function(x,y,vx,vy,angle) {
		var img = game.assets[this.asset];
		
		Sprite.call(this,16,16);
		this.image = img;
		this.frame = this.shotframe;
		this.x = x;
		this.y = y;
		this.vx = vx || 0;
		this.vy = vy || 0;
		
		if (angle)
			this.rotate(angle);
			
		this.addEventListener('enterframe' , this.tick);
		this.add();
	} , 
	"tick" : function() {
		this.x += this.vx;
		this.y += this.vy;
		if ( (this.x + this.width < 0) || 
			 (this.x > game.width) || 
			 (this.y + this.height < 0) || 
			 (this.y > game.height) ) 
		{
			this.die();
		}
	} , 
	"add" : function() {
		configs.scenes.main.shots.addChild(this);
	},
	"die" : function() {
		this.removeEventListener('enterframe', this.tick);
		configs.scenes.main.shots.removeChild(this);
	}
});

var PlayerShot = Class.create(Shot, {
	"asset" : "shots.png",
	"shotframe" : 3 , 
	
	"tick" : function() {
		Shot.prototype.tick.call(this);
	}
});

var EnemyShot = Class.create(Shot, {
	"asset" : "shots.png",
	"shotframe" : 1 , 
	
	"initialize" : function(x,y,velocity,diff) {
		var v = velocity || 1;
		var diff = diff || {};
		
		var player = configs.scenes.main.player;
		vx = (player.x - x) + (diff.x || 0);
		vy = (player.y - y) + (diff.y || 0);
		var len = (vx * vx + vy * vy);
		if (len != 0) {
			len = Math.sqrt(len);
			vx = Math.min( v, vx / len * v);
			vy = Math.min( v, vy / len * v);
		}
		Shot.call(this,x,y,vx,vy);
	},
	"tick" : function() {
		Shot.prototype.tick.call(this);
	} , 
	"add" : function() {
		configs.scenes.main.enemyshots.addChild(this);
	},
	"die" : function() {
		this.removeEventListener('enterframe', this.tick);
		configs.scenes.main.enemyshots.removeChild(this);
	}
});


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
// ä½¿ã£ã¦ã„ãªã„

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
				this.text += 'â˜…';
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
		Sound.play('STAR1.mp3');
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
		
		game.end(this.score , 'ã‚ãªãŸã®ã‚¹ã‚³ã‚¢ã¯' +this.score+ 'ã§ã—ãŸã€‚');
		//} , 2000);
	}	,	
	"initStart" : function() {
		var self = this;
		this.status = configs.GAME_STATUS.START;
		this.player.initStart(function() {
			self.status = configs.GAME_STATUS.GAME;
		});
		this.score = 0;	
	}, 
	"tick" : function() {
		if (this.status == configs.GAME_STATUS.GAMEOVER)
			return;
		
		switch(this.status) {
			//=== ã‚¹ã‚¿ãƒ¼ãƒˆ
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
			if (!enemy) 
				continue;
			for (var i = this.shots.childNodes.length-1; i >=0 ; i--) {
				var shot = this.shots.childNodes[i];
				if (! shot)
					continue;
				
				if (enemy.intersect(shot)) {
					shot.die();
					enemy.damage();
					if (enemy.hp <= 0 && enemy.score > 0) 
						this.score += enemy.score;
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
				if (! shot)
					continue;
				
				if (this.player.within(shot,10)) {
					shot.die();
					this.player.damage();
				}
			}
		}
	},
	"addEnemy" : function() {
		if (this.player.is_start) 
			return;
		//if (this.enemies.childNodes.length < 2) {
		if (rand(0,10) < 2) 
			var tmp = new Enemy02();
		else 
			Enemy01.addGroup();
		//}
	},
	"explodeEnemies" : function() {
		enemies = this.enemies.childNodes;
		shots = this.enemyshots.childNodes;
		for (var i=enemies.length-1;i>=0;i--) {
			enemies[i].die();
		}
		for (var i=shots.length-1;i>=0;i--) {
			new Explosion( shots[i].x, shots[i].y , false);
			shots[i].die();
		}
		Sound.play('bomb.wav', true);
	},
	"replaceScene" : function() {
		this.game.replaceScene(this);
	}
});

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
