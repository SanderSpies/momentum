/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
React.initializeTouchEvents(true);
var Momentum = require('momentum');
var scrollMomentum = new Momentum();

var Application = React.createClass({
  render: function() {
    return (<div style={{position:'relative', width: '100%', height: '100%'}}>
      <div onTouchMove={scrollMomentum.onTouchMove(this.onTouchMove)} onTouchEnd={scrollMomentum.onTouchEnd(this.onTouchEnd)}>
        oh hai there
      </div>
    </div>);
  },

  onTouchMove: function() {
    console.log('moving');
  },

  onTouchEnd: function() {

  }

});

if (typeof window !== 'undefined') {
  React.render(<Application />, document.getElementById('app'));
}

module.exports = Application;
