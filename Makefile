SRC = lib/jquery.alerts/jquery.alerts.js js/common.js js/config.js js/class/sound.js js/class/base-sprite.js js/class/bg.js js/class/player.js js/class/base-enemy.js js/class/enemy01.js js/class/enemy02.js js/class/explosion.js js/class/shot.js js/class/player-shot.js js/class/enemy-shot.js js/scenes/base.js js/scenes/bg.js js/scenes/main.js js/main.js 
COMB = js/min.js
all: ${COMB}
${COMB}: ${SRC}
	@@cat ${SRC} > ${COMB}

# clear: ${SRC}
# 	@@rm  ${SRC}
