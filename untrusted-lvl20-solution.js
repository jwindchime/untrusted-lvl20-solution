
/*****************
 * bossFight.js *
 *****************
 *
 * NO FARTHER, DR. EVAL!!!!
 * YOU WILL NOT GET OUT OF HERE ALIVE!!!!
 * IT'S TIME YOU SEE MY TRUE FORM!!!!
 * FACE MY ROBOT WRATH!!!!!
 */

function startLevel(map) {
    map.defineObject('boss', {
        'type': 'dynamic',
        'symbol': '⊙',
        'color': 'red',
        'interval': 200,
        'onCollision': function (player) {
            player.killedBy('the boss');
        },
        'behavior': function (me) {
            if (!me.direction) {
                me.direction = 'right';
            }
            if (me.canMove(me.direction)) {
                me.move(me.direction);
            } else {
                me.direction = (me.direction == 'right') ? 'left' : 'right';
            }
            if (Math.random() < 0.3) {
                map.placeObject(me.getX(), me.getY() + 2, 'bullet');
            }
        },
        'onDestroy': function (me) {
            if (map.countObjects('boss') == 0) {
                map.placeObject(me.getX(), me.getY(), 'theAlgorithm');
            }
        }
    });

    map.defineObject('bullet', {
        'type': 'dynamic',
        'symbol': '.',
        'color': 'red',
        'interval': 100,
        'projectile': true,
        'behavior': function (me) {
            me.move('down');
        }
    });

    map.placePlayer(0, map.getHeight() - 3);
    map.placeObject(map.getWidth() - 1, map.getHeight() - 1, 'exit');

    // Not so tough now, huh?
    map.getPlayer().removeItem('phone');
    map.placeObject(map.getWidth() - 1, map.getHeight() - 3, 'phone');

    map.placeObject(0, map.getHeight() - 4, 'block');
    map.placeObject(1, map.getHeight() - 4, 'block');
    map.placeObject(2, map.getHeight() - 4, 'block');
    map.placeObject(2, map.getHeight() - 3, 'block');
    map.placeObject(map.getWidth() - 1, map.getHeight() - 4, 'block');
    map.placeObject(map.getWidth() - 2, map.getHeight() - 4, 'block');
    map.placeObject(map.getWidth() - 3, map.getHeight() - 4, 'block');
    map.placeObject(map.getWidth() - 3, map.getHeight() - 3, 'block');

    for (var x = 0; x < map.getWidth(); x++) {
        map.placeObject(x, 4, 'block');
    }

    map.placeObject(9, 5, 'boss');
    map.placeObject(11, 5, 'boss');
    map.placeObject(13, 5, 'boss');
    map.placeObject(15, 5, 'boss');
    map.placeObject(17, 5, 'boss');
    map.placeObject(19, 5, 'boss');
    map.placeObject(21, 5, 'boss');
    map.placeObject(23, 5, 'boss');
    map.placeObject(25, 5, 'boss');
    map.placeObject(27, 5, 'boss');
    map.placeObject(29, 5, 'boss');
    map.placeObject(31, 5, 'boss');

    map.placeObject(10, 6, 'boss');
    map.placeObject(12, 6, 'boss');
    map.placeObject(14, 6, 'boss');
    map.placeObject(16, 6, 'boss');
    map.placeObject(18, 6, 'boss');
    map.placeObject(20, 6, 'boss');
    map.placeObject(22, 6, 'boss');
    map.placeObject(24, 6, 'boss');
    map.placeObject(26, 6, 'boss');
    map.placeObject(28, 6, 'boss');
    map.placeObject(30, 6, 'boss');

    var player = map.getPlayer();
    var halfWidth = map.getWidth()/2;
    var shooting = false;
    var prevLevel = 'zero';
    var level = 5;
    var bulletType = 'normal';
    var count = 0;
    
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
    function moveToward(obj, type) {
        var target = obj.findNearest(type);
        var leftDist = obj.getX() - target.x;
        var upDist = obj.getY() - target.y;

        var direction;
        if (upDist == 0 && leftDist == 0) {
            return;
        } if (upDist > 0 && upDist >= leftDist) {
            direction = 'up';
        } else if (upDist < 0 && upDist < leftDist) {
            direction = 'down';
        } else if (leftDist > 0 && leftDist >= upDist) {
            direction = 'left';
        } else {
            direction = 'right';
        }

        obj.move(direction);
    }
    
    map.defineObject('wall', {
        'symbol': '#',
        'color': 'grey',
        'impassable': true
    });
    
    
    ////////////////////////
    //score keeping system//
    ////////////////////////
    
    map.defineObject('bumper', {
        'type' : 'dynamic',
        'symbol' : ' ',
        'projectile' : true,
        'interval' : 100,
        'behavior' : function (me) {
            me.move('up');
        }
    });
    
    map.defineObject('zero', {
        'type' : 'dynamic',
        'symbol' : '0',
        'onDestroy' : function (me) {
            map.placeObject(me.getX(), me.getY(), 'one');
        },
        'behavior': function () {}
    });
    
    map.defineObject('one', {
        'type' : 'dynamic',
        'symbol' : '1',
        'onDestroy' : function (me) {
            map.placeObject(me.getX(), me.getY(), 'two');
        },
        'behavior': function () {}
    });
    
    map.defineObject('two', {
        'type' : 'dynamic',
        'symbol' : '2',
        'onDestroy' : function (me) {
            map.placeObject(me.getX(), me.getY(), 'three');
        },
        'behavior': function () {}
    });
    
    map.defineObject('three', {
        'type' : 'dynamic',
        'symbol' : '3',
        'onDestroy' : function (me) {
            map.placeObject(me.getX(), me.getY(), 'four');
        },
        'behavior': function () {}
    });
    
    map.defineObject('four', {
        'type' : 'dynamic',
        'symbol' : '4',
        'onDestroy' : function (me) {
            map.placeObject(me.getX(), me.getY(), 'five');
        },
        'behavior': function () {}
    });
    
    map.defineObject('five', {
        'type' : 'dynamic',
        'symbol' : '5',
        'onDestroy' : function (me) {
            map.placeObject(me.getX(), me.getY(), 'six');
        },
        'behavior': function () {}
    });
    
    map.defineObject('six', {
        'type' : 'dynamic',
        'symbol' : '6',
        'onDestroy' : function (me) {
            map.placeObject(me.getX(), me.getY(), 'seven');
        },
        'behavior': function () {}
    });
    
    map.defineObject('seven', {
        'type' : 'dynamic',
        'symbol' : '7',
        'onDestroy' : function (me) {
            map.placeObject(me.getX(), me.getY(), 'eight');
        },
        'behavior': function () {}
    });
    
    map.defineObject('eight', {
        'type' : 'dynamic',
        'symbol' : '8',
        'onDestroy' : function (me) {
            map.placeObject(me.getX(), me.getY(), 'nine');
        },
        'behavior': function () {}
    });
    
    map.defineObject('nine', {
        'type' : 'dynamic',
        'symbol' : '9',
        'onDestroy' : function (me) {
            map.placeObject(me.getX(), me.getY(), 'zero');
            map.placeObject(me.getX() - 1, me.getY() + 1, 'bumper');
        },
        'behavior': function () {}
    });
    
    ///////////////////////////////
    //end of score keeping system//
    ///////////////////////////////
    
    
    ///////////////
    //shop system//
    ///////////////
    
    map.defineObject('gunShop', {
        'symbol': '❇',
        'color': 'pink',
        'onCollision': function (player) {
            if (player.hasItem('theAlgorithm')) {
                if (map.countObjects('normalShop') == 0) { 
                    player.removeItem('theAlgorithm');
                    map.writeStatus("Bought the Gun Shop");
                    var x = map.getWidth() - 1;
                    var y = map.getHeight() - 7;
                    map.placeObject(x, y, 'wall');
                    map.placeObject(x - 1, y, 'wall');
                    map.placeObject(x - 2, y, 'wall');
                    map.placeObject(x - 3, y, 'wall');
                    map.placeObject(x - 4, y, 'wall');
                    map.placeObject(x - 3, y + 1, 'wall');
                    map.placeObject(x - 4, y + 1, 'wall');
                    map.placeObject(x, y + 1, 'normalShop');
                    map.placeObject(x - 1, y + 1, 'shotgunShop');
                    map.placeObject(x - 2, y + 1, 'sniperShop');
                }
            }
        }
    });
    
    map.defineObject('normalShop', {
        'type': 'item',
        'symbol': '◉',
        'color': 'yellow',
        'onPickUp': function (player) {
            var x = map.getWidth() - 2;
            var y = map.getHeight() - 6;
            map.placeObject(x, y, 'shotgunShop');
            map.placeObject(x - 1, y, 'sniperShop');
            map.writeStatus("Machine Gun Equipped");
            bulletType = 'normal';
            player.removeItem('shotgunShop');
            player.removeItem('sniperShop');
        }
    });
    
    map.defineObject('shotgunShop', {
        'type': 'item',
        'symbol': '♆',
        'color': 'yellow',
        'onPickUp': function (player) {
            var x = map.getWidth() - 1;
            var y = map.getHeight() - 6;
            map.placeObject(x, y, 'normalShop');
            map.placeObject(x - 2, y, 'sniperShop');
            map.writeStatus("Shotgun Equipped");
            count = 0;
            bulletType = 'shotgun';
            player.removeItem('normalShop');
            player.removeItem('sniperShop');            
        }
    });
    
    map.defineObject('sniperShop', {
        'type': 'item',
        'symbol': '♐',
        'color': 'yellow',
        'onPickUp': function (player, me) {
            var x = map.getWidth() - 1;
            var y = map.getHeight() - 6;
            map.placeObject(x, y, 'normalShop');
            map.placeObject(x - 1, y, 'shotgunShop');
            map.writeStatus("Sniper Rifle Equipped");
            count = 0;
            bulletType = 'sniper';
            player.removeItem('shotgunShop');
            player.removeItem('normalShop');
        }
    });
    
    map.defineObject('homingShop', {
        'type': 'dynamic',
        'symbol': '♚',
        'color': 'yellow',
        'onCollision': function (player) {
            map.writeStatus("Homing Rocket Equipped");
            count = 0;
            bulletType = 'homing';
            player.removeItem('shotgunShop');
            player.removeItem('sniperShop');
            player.removeItem('normalShop');
        }
    });
    
    map.defineObject('wallShop', {
        'symbol' : '♜',
        'color': 'pink',
        'onCollision' : function (player) {
            if (player.hasItem('theAlgorithm'))
            {
                if (map.countObjects('shield') < 15)
                   {
                    player.removeItem('theAlgorithm');
                    if (map.countObjects('weakshield') == 0) {
                          if (map.countObjects('lastshield') == 0) {
                              map.writeStatus("Bought the Castle");
                        }
                    } else {
                        map.writeStatus("Repaired the Castle");
                    }
                    
                     for (var x = halfWidth - 5; x < halfWidth + 5; x++) {
                        map.placeObject(x, map.getHeight() - 3, 'shield');
                        map.placeObject(x, map.getHeight() - 4, 'shield');
                        map.placeObject(x, map.getHeight() - 5, 'shield');
                     }
                }
            }
        }
    });
    
    map.defineObject('knightShop', {
        'symbol': '♞',
        'color': 'pink',
        'onCollision': function (player) {
            if (player.hasItem('theAlgorithm'))
            {
                player.removeItem('theAlgorithm');
                map.writeStatus("Bought Reinforcements");
                map.placeObject(5, 19, 'knight');
                map.placeObject(7, 19, 'knight');
                map.placeObject(9, 19, 'knight');
                map.placeObject(11, 19, 'knight');
                map.placeObject(6, 18, 'knight');
                map.placeObject(8, 18, 'knight');
                map.placeObject(10, 18, 'knight');
            }
        }
    });
    
    map.defineObject('knight', {
        'type': 'dynamic',
        'symbol': '♞',
        'interval': 200,
        'behavior': function (me) {
            if (!me.direction) {
                me.direction = 'right';
            }
            if (me.canMove(me.direction)) {
                me.move(me.direction);
            } else {
                me.direction = (me.direction == 'right') ? 'left' : 'right';
            }
            if (Math.random() < 0.3) {
                map.placeObject(me.getX(), me.getY() - 2, 'antibullet');
            }
        }
    });
    
    map.defineObject('shield', {
        'type': 'dynamic',
        'symbol': '♜',
        'onDestroy': function(me) {
            map.placeObject(me.getX(), me.getY(), 'weakshield');
        },
        'behavior': function () {}
    });
    
    map.defineObject('weakshield', {
        'type': 'dynamic',
        'symbol': '♖',
        'onDestroy': function(me) {
            map.placeObject(me.getX(), me.getY(), 'lastshield');
        },
        'behavior': function () {}
    });
    
    map.defineObject('lastshield', {
        'type': 'dynamic',
        'symbol': '⌂',
        'behavior': function () {}
    });
    
    //////////////////////
    //end of shop system//
    //////////////////////
    
    
    ///////////
    //bullets//
    ///////////
    
    map.defineObject('antibullet', {
        'type': 'dynamic',
        'symbol': '.',
        'color': 'pink',
        'interval': 100,
        'projectile': true,
        'behavior': function (me) {
            me.move('up');
        }
    });
    
    map.defineObject('sniperbullet', {
        'type': 'dynamic',
        'symbol': '☨',
        'color': 'pink',
        'interval': 100,
        'projectile': true,
        'behavior': function (me) {
            me.move('up');
        },
        'onDestroy': function (me) {
            if (map.getObjectTypeAt(me.getX(), me.getY() - 1) != 'block') {
                if (map.getObjectTypeAt(me.getX(), me.getY() - 1) != 'wall') {
                    map.placeObject(me.getX(), me.getY(), 'sniperbullet');
                }
            }
        }
    });
    
    map.defineObject('homingbullet', {
        'type': 'dynamic',
        'symbol': '☝',
        'color': 'pink',
        'interval': 100,
        'projectile': true,
        'behavior': function (me) {
            if (map.countObjects(currBoss) > 0) {
                moveToward(me, currBoss);
            } else {
                me.move('up');
            }
        },
        'onDestroy': function (me) {
            map.placeObject(me.getX() - 1, me.getY(), 'antibullet');
            map.placeObject(me.getX(), me.getY(), 'antibullet');
            map.placeObject(me.getX() + 1, me.getY(), 'antibullet');
            map.placeObject(me.getX() - 1, me.getY() + 1, 'antibullet');
            map.placeObject(me.getX(), me.getY() + 1, 'antibullet');
            map.placeObject(me.getX() + 1, me.getY() + 1, 'antibullet');
        }
    });
    
    map.defineObject('nukebullet', {
        'type': 'dynamic',
        'symbol': '.',
        'color': 'green',
        'interval': 100,
        'projectile': true,
        'behavior': function (me) {
            me.move('down');
        },
        'onDestroy': function (me) {
            if (me.getY() < map.getHeight() - 1) {
                map.placeObject(me.getX(), me.getY(), 'nuke');
            }
         }
    });
    
    map.defineObject('nuke', {
        'type': 'dynamic',
        'symbol': '+',
        'color': 'green',
          'onCollision': function(player) {
            player.killedBy('a nuke');
        },
        'behavior': function () {}
    });
    
    map.defineObject('smartbullet', {
        'type': 'dynamic',
        'symbol': '.',
        'color': 'blue',
        'interval': 100,
        'projectile': true,
        'behavior': function (me) {
            me.move('down');
            if (me.getY() == player.getY() && Math.random() < 0.2) {
                map.placeObject(me.getX() - 1, me.getY(), 'sidewinderL');
                map.placeObject(me.getX() + 1, me.getY(), 'sidewinderR');
            }
        }
    });
    
    map.defineObject('sidewinderL', {
        'type': 'dynamic',
        'symbol': '<',
        'color': 'blue',
        'interval': 100,
        'projectile': true,
        'behavior': function (me) {
            me.move('left');
        }
    });
    
    map.defineObject('sidewinderR', {
        'type': 'dynamic',
        'symbol': '>',
        'color': 'blue',
        'interval': 100,
        'projectile': true,
        'behavior': function (me) {
            me.move('right');
        }
    });

    //////////////////
    //end of bullets//
    //////////////////
    
    
    //////////
    //bosses//
    //////////
    
    /*
    map.defineObject('antiboss', {
        'type': 'dynamic',
        'symbol': '⊙',
        'color': 'pink',
        'interval': 200,
        'behavior': function (me) {
            if (!me.direction) {
                me.direction = 'right';
            }
            if (me.canMove(me.direction)) {
                me.move(me.direction);
            } else {
                me.direction = (me.direction == 'right') ? 'left' : 'right';
            }
            if (Math.random() < 0.3) {
                map.placeObject(me.getX(), me.getY() - 2, 'antibullet');
            }
        }
    });
    */
    
    map.defineObject('nukeboss', {
        'type' : 'dynamic',
        'symbol' : '☢',
        'color': 'green',
        'interval': 200,
        'onCollision': function (player) {
            player.killedBy('the nukeboss');
        },
        'behavior': function (me) {
            if (!me.direction) {
                me.direction = 'right';
            }
            if (me.canMove(me.direction)) {
                me.move(me.direction);
            } else {
                me.direction = (me.direction == 'right') ? 'left' : 'right';
            }
            if (Math.random() < 0.2) {
                map.placeObject(me.getX(), me.getY() + 2, 'nukebullet');
            }
        },
        'onDestroy': function (me) {
            if (map.countObjects('nukeboss') == 0) {
                map.placeObject(me.getX(), me.getY(), 'theAlgorithm');
            }
        }
    });
    
    var health = 5;
    map.defineObject('superboss', {
        'type' : 'dynamic',
        'symbol' : '♎',
        'color': 'purple',
        'interval': 100,
        'onCollision': function (player) {
            player.killedBy('the superboss');
        },
        'behavior': function (me) {
            if (!me.direction) {
                me.direction = 'right';
            }
            if (me.direction == 'right') {
                me.direction = (Math.random() < 0.3) ? 'left' : 'right';
            } else {
                me.direction = (Math.random() < 0.3) ? 'right' : 'left';
            }
            if (me.canMove(me.direction)) {
                me.move(me.direction);
            }
            if (Math.random() < 0.5) {
                map.placeObject(me.getX(), me.getY() + 2, 'bullet');
            }
        },
        'onDestroy': function (me) {
            if (health > 0) {
                map.placeObject(me.getX(), me.getY(), 'superboss');
                health--;
            }
            if (map.countObjects('superboss') == 0) {
                map.placeObject(me.getX(), me.getY(), 'theAlgorithm');
            }
        }
    });
    
    map.defineObject('smartboss', {
        'type': 'dynamic',
        'symbol': '◍',
        'color': 'blue',
        'interval': 200,
        'onCollision': function (player) {
            player.killedBy('the smartboss');
        },
        'behavior': function (me) {
            if (!me.direction) {
                me.direction = 'right';
            }
            if (me.canMove(me.direction)) {
                me.move(me.direction);
            } else {
                me.direction = (me.direction == 'right') ? 'left' : 'right';
            }
            if (Math.random() < 0.1) {
                map.placeObject(me.getX(), me.getY() + 2, 'smartbullet');
            }
        },
        'onDestroy': function (me) {
            if (map.countObjects('smartboss') == 0) {
                map.placeObject(me.getX(), me.getY(), 'theAlgorithm');
            }
        }
    });
    
    /////////////////
    //end of bosses//
    /////////////////
    
    
    var bossTypes = ['boss', 'nukeboss', 'superboss', 'smartboss'];
    var bossPick = 0;
    var currBoss = bossTypes[bossPick];
    var bossesLeft = map.countObjects(currBoss);
    
    map.defineObject('next', {
        'symbol': 'Θ',
        'color': 'teal',
        'onCollision': function () {
            // reset boss wave
            if (map.countObjects(currBoss) == 0)
            {
                //make life difficult (eventually)
                if (map.getObjectTypeAt(2,0) != prevLevel && level < 10) {
                    for (var x = 0; x < map.getWidth(); x++) {
                        map.placeObject(x, level, 'wall');
                    }
                    level++;
                    prevLevel = map.getObjectTypeAt(2,0);
                }
                if (map.getObjectTypeAt(2,0) == 'five') {
                    var x = map.getWidth() - 2;
                    var y = map.getHeight() - 3;
                    map.placeObject(x, y, 'homingshop');
                }
                bossPick = getRandomInt(0, bossTypes.length - 1);
                currBoss = bossTypes[bossPick];
                if (bossPick == 2)
                {
                    health = 5;
                    map.placeObject(9, level, currBoss);
                } else {
                    for (var x = 9; x < 30; x += 2) {
                        map.placeObject(x, level, currBoss);
                      map.placeObject(x + 1, level + 1, currBoss);
                    }
                    map.placeObject(31, level, currBoss);
                }
                
                bossesLeft = map.countObjects(currBoss);
            }
       }
    });
    
    map.placeObject(3, map.getHeight() - 3, 'wall');
    map.placeObject(3, map.getHeight() - 4, 'wall');
    map.placeObject(map.getWidth() - 4, map.getHeight() - 3, 'wall');
    map.placeObject(map.getWidth() - 4, map.getHeight() - 4, 'wall');
    
    map.placeObject(0, map.getHeight() - 7, 'wall');
    map.placeObject(1, map.getHeight() - 7, 'wall');
    map.placeObject(2, map.getHeight() - 7, 'wall');
    map.placeObject(3, map.getHeight() - 7, 'wall');
    map.placeObject(4, map.getHeight() - 7, 'wall');
    map.placeObject(3, map.getHeight() - 6, 'wall');
    map.placeObject(4, map.getHeight() - 6, 'wall');
    map.placeObject(0, map.getHeight() - 6, 'wallShop');
    map.placeObject(1, map.getHeight() - 6, 'gunShop');
    map.placeObject(2, map.getHeight() - 6, 'knightShop');
    map.placeObject(1, map.getHeight() - 3, 'next');
    
    map.getPlayer().setPhoneCallback( function () {
        /*
        // antiboss solution
        for (var x = 9; x < 30; x += 2) {
                map.placeObject(x, 19, 'antiboss');
                map.placeObject(x + 1, 20, 'antiboss');
            }
            map.placeObject(31, 19, 'antiboss');
        */
        
        shooting = !shooting;
        
        
        // initialize score counter
        if (map.countObjects('zero') == 0) {
            map.placeObject(0, 0, 'zero');
            map.placeObject(1, 0, 'zero');
            map.placeObject(2, 0, 'zero');
            map.placeObject(3, 0, 'zero');
            map.placeObject(4, 0, 'zero');
            prevLevel = map.getObjectTypeAt(2, 0);

            map.startTimer (function () {
                if (map.countObjects(currBoss) != bossesLeft) {
                    map.placeObject(4, 1, 'bumper');
                    bossesLeft = map.countObjects(currBoss);
                }
            }, 100);
            
            map.startTimer (function () {
                if (shooting) {
                    var x = player.getX();
                    var y = player.getY() - 2;
                      switch (bulletType) {
                          case 'sniper':
                            if (count == 0) {
                                   map.placeObject(x, y, 'sniperbullet');
                                count++;
                            } else {
                                count = (count + 1) % 5;
                            }
                             break;
                          case 'shotgun':
                            if (count == 0) {
                                map.placeObject(x - 1, y, 'antibullet');
                                   map.placeObject(x, y, 'antibullet');
                                  map.placeObject(x + 1, y, 'antibullet');
                                count++;
                            } else {
                                count = (count + 1) % 3;
                            }
                              break;
                        case 'homing':
                            if (count == 0) {
                                map.placeObject(x, y, 'homingbullet');
                                count++;
                            } else {
                                count = (count + 1) % 5;
                            }
                            break;
                          default:
                                map.placeObject(x, y, 'antibullet');
                              break;
                      }
                }
            }, 150);
        }
    });

}

function validateLevel(map) {
    // called at start of level and whenever a callback executes
    map.validateAtMostXObjects(59, 'block');
    map.validateAtMostXObjects(1, 'phone');

    if (map.countObjects('theAlgorithm') > 0 && map.countObjects('boss') > 0) {
        throw "The Algorithm can only be dropped by the boss!";
    }

    // only called at start of level
    if (map.isStartOfLevel()) {
        map.validateAtMostXDynamicObjects(23);
        map.validateNoTimers();
    }
}

function onExit(map) {
    if (!map.getPlayer().hasItem('theAlgorithm')) {
        map.writeStatus("You must take back the Algorithm!!");
        return false;
    } else if (!map.getPlayer().hasItem('phone')) {
        map.writeStatus("We need the phone!");
        return false;
    } else {
        return true;
    }
}
     