import Ember from 'ember';
import layout from '../templates/components/pinned-content';

const { Component, inject, computed, String: { htmlSafe }, run } = Ember;

export default Component.extend({
  classNames: ['pinned-content'],
  attributeBindings: ['style'],
  top: null,
  bottom: null,
  windoc: inject.service(),
  layout,
  didInsertElement() {
    this._super(...arguments);
    run.scheduleOnce('afterRender', () => {
      this.set('_initialOffsetTop', this.$().offset().top);
      this.set('_initialOffsetLeft', this.$().offset().left);
    });
  },
  _fixedToTop: computed('_initialOffsetTop', 'windoc.scrollTop', 'top', function() {
    if (this.get('top') === null) {
      return false;
    } else {
      return (this.get('windoc.scrollTop') + this.get('top')) > this.get('_initialOffsetTop');
    }
  }),

  _fixedToBottom: computed('_initialOffsetTop', 'windoc.clientHeight', 'windoc.scrollBottom', 'bottom', function() {
    if (this.get('bottom') === null) {
      return false;
    } else {
      let x = (this.get('windoc.scrollHeight') - this.get('_initialOffsetTop'));
      let y = (this.get('windoc.scrollBottom') + this.get('bottom'));
      console.log(x, y);
      return y > this.get('bottom');
    }
  }),

  style: computed('_initialOffsetTop', '_initialOffsetLeft', 'top', 'bottom', '_fixedToTop', '_fixedToBottom', function() {
    if (this.element) {
      let cssAttrs = [];
      if (this.get('_fixedToTop')) {
        cssAttrs.push(['position', 'fixed']);
        cssAttrs.push(['top', `${this.get('top')}px`]);
        cssAttrs.push(['left', `${this.get('_initialOffsetLeft')}px`]);
      } else if (this.get('_fixedToBottom')) {
        cssAttrs.push(['position', 'fixed']);
        cssAttrs.push(['bottom', `${this.get('bottom')}px`]);
        cssAttrs.push(['left', `${this.get('_initialOffsetLeft')}px`]);
      }
      return htmlSafe(cssAttrs.map((attr) => {
        return `${attr[0]}: ${attr[1]}`;
      }).join('; '));
    } else {
      return htmlSafe('');
    }
  })
});
