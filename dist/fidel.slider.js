/*!
 * fidel-slider - a generic slider using fidel
 * v0.1.1
 * https://github.com/jgallen23/fidel-slider
 * copyright JGA 2013
 * MIT License
*/

$.declare('slider', {
  defaults: {
    itemsPerPage: 1,
    duration: 500,
    itemClass: 'item',
    containerClass: 'container'
  },

  elements: {
    '[data-action=previous]': 'previousButton',
    '[data-action=next]': 'nextButton'
  },

  init: function() {
    this.currentPage = 1;
    var items = this.find('.'+this.itemClass);
    this.pageCount = Math.ceil(items.length/this.itemsPerPage);
    this.pageWidth = items.width()*this.itemsPerPage;
    this.container = this.find('.'+this.containerClass);
    this.container.queue('fx');
    this.el.css('width', this.pageWidth);
    this.updateButtons();
  },

  getCurrentPage: function() {
    return this.currentPage;
  },

  next: function(cb) {
    this.go(this.currentPage + 1, cb);
    this.emit('next');
  },

  previous: function(cb) {
    this.go(this.currentPage - 1, cb);
    this.emit('previous');
  },

  go: function(page, cb) {
    if (page > this.pageCount || page < 1) {
      if (typeof cb == 'function') {
        cb();
      }
      return;
    }
    this.currentPage = page;
    var width = '-'+this.pageWidth * (page - 1);
    this._slide(width, cb);
  },

  first: function(cb) {
    this.go(1, cb);
  },

  last: function(cb) {
    this.go(this.pageCount, cb);
  },

  _slide: function(width, cb) {
    var self = this;
    this.emit('beforeSlide');
    this.container.animate({
      left: width 
    }, self.duration, function() {
      self.emit('slide');
      self.updateButtons();
      if (typeof cb == 'function') { 
        cb();
      }
    });
  },

  updateButtons: function() {
    if (this.currentPage == 1) {
      this.previousButton.hide();
      this.emit('first');
    } else {
      this.previousButton.show();
    }
    if (this.currentPage == this.pageCount) {
      this.nextButton.hide();
      this.emit('last');
    } else {
      this.nextButton.show();
    }
  }
});
