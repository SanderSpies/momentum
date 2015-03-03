'use strict';


var initialVelocity;
var deceleration;
var touchDuration;
var touchDistance;

class Momentum {

  constructor() {
    this.initialVelocity = -1;
    this.deceleration = -1;
    this.touchDistance = -1;
    this.previousTouches = [];
    this.touchHistory = [];
    this.touchMoveFn = null;
  }

  onTouchMove(f) {
    var func = this.touchMoveFn = f;
    var self = this;
    return function(e) {
      var touchHistory = self.touchHistory;
      var currentTime = Date.now();
      if (!touchHistory.length || ((currentTime - touchHistory[touchHistory.length - 1].time) > 20)) {
        // store previous touch positions for 500ms
        touchHistory.push({
          time: currentTime,
          touches: e.touches
        });

        if (currentTime - touchHistory[0].time > 500) {
          touchHistory.shift();
        }
      }
    }
  }

  onTouchEnd() {
    var self = this;
    return function(e) {
      var touchHistory = self.touchHistory;
      var firstItem = touchHistory[0];
      var endTime = Date.now();
      while (touchHistory.length && endTime - firstItem.time > 500) {
        touchHistory.shift();
      }
      var startTime = firstItem.time;
      var duration = endTime - startTime;
      if (duration) {
        var changedTouches = e.changedTouches;
        var initialTouches = firstItem.touches;
        for (var i = 0, l = changedTouches.length; i < l; i++) {
          var touch = changedTouches[i];
          var touchId = touch.id;
          for (var j = 0, l2 = initialTouches.length; j < l2; j++) {
            var initialTouch = initialTouches[j];
            var initialTouchId = initialTouch.id;
            if (initialTouchId === touchId) {
              var velocityX = (touch.clientX - initialTouch.clientX) / duration;
              var velocityY = (touch.clientY - initialTouch.clientY) / duration;
              self._dispatchMomentumTouches(touch, velocityX, velocityY, endTime);


              console.log('duration:', duration);
              console.log('delta x:', touch.clientX - initialTouch.clientX, ', delta y:', touch.clientY - initialTouch.clientY);
              console.log('todo momentummmmm');
            }
          }
        }
      }

      // TODO: delete the right history entries :-/
      self.touchHistory = [];
    }
  }

  _dispatchMomentumTouches(touch, velocityX, velocityY, endTime) {
    console.log(arguments);
    var currentTime = Date.now() - endTime;
    var posX = velocityX * (currentTime - currentTime * currentTime / 4800);
    var posY = velocityY * (currentTime - currentTime * currentTime / 4800);
    console.log(touch);
    console.log(posX, posY);
    console.log('foo:', currentTime);
    if (currentTime < 2350) {
      var self = this;
      setTimeout(function(){
        self._dispatchMomentumTouches(touch, velocityX, velocityY, endTime);
      }, 100);
    }
  }
}

module.exports = Momentum;