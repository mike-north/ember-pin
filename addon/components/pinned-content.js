import { inject as service } from '@ember/service';
import Component from '@ember/component';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/string';
import { run } from '@ember/runloop';
import layout from '../templates/components/pinned-content';

export default Component.extend({
  classNames: ['pinned-content'],
  attributeBindings: ['style'],
  top: null,
  bottom: null,
  windoc: service(),
  layout,
  _unfixedWidth: null,
  didInsertElement() {
    this._super(...arguments);
    this._saveUnfixedWidth();
    run.scheduleOnce('afterRender', () => {
      this.set('_initialOffsetTop', this.$().offset().top);
      this.set('_initialHeight', this.$().height());
      this.set('_initialOffsetLeft', this.$().offset().left);
    });
  },

  _saveUnfixedWidth() {
    if (this.$() && !(this.get('_fixedToTop') || this.get('_fixedToBottom'))) {
      this.set('_unfixedWidth', this.$().width());
    }
  },

  _fixedToTop: computed('_initialOffsetTop', 'windoc.scrollTop', 'top', function() {
    if (this.get('top') === null) {
      run.debounce(this, '_saveUnfixedWidth', 10);
      return false;
    } else {
      // console.log(this.get('windoc.scrollTop') ,this.get('top'));
      return this.get('windoc.scrollTop') + this.get('top') > this.get('_initialOffsetTop');
    }
  }),

  _fixedToBottom: computed(
    '_initialOffsetTop',
    '_initialHeight',
    'windoc.{clientHeight,scrollTop}',
    'bottom',
    function() {
      if (this.get('bottom') === null) {
        run.debounce(this, '_saveUnfixedWidth', 10);
        return false;
      } else {
        let trigger = this.get('_initialOffsetTop') + this.get('_initialHeight') + this.get('bottom');
        let pos = this.get('windoc.scrollTop') + this.get('windoc.clientHeight');
        return pos >= trigger;
      }
    }
  ),

  style: computed(
    '_initialOffsetTop',
    '_initialOffsetLeft',
    'top',
    'bottom',
    '_fixedToTop',
    '_fixedToBottom',
    function() {
      if (this.element) {
        let cssAttrs = [];
        if (this.get('_fixedToTop')) {
          cssAttrs.push(['position', 'fixed']);
          cssAttrs.push(['top', `${this.get('top')}px`]);
          cssAttrs.push(['left', `${this.get('_initialOffsetLeft')}px`]);
          if (this.get('_unfixedWidth')) {
            cssAttrs.push(['width', `${this.get('_unfixedWidth')}px`]);
          }
        } else if (this.get('_fixedToBottom')) {
          cssAttrs.push(['position', 'fixed']);
          cssAttrs.push(['bottom', `${this.get('bottom')}px`]);
          cssAttrs.push(['left', `${this.get('_initialOffsetLeft')}px`]);
          if (this.get('_unfixedWidth')) {
            cssAttrs.push(['width', `${this.get('_unfixedWidth')}px`]);
          }
        }
        return htmlSafe(
          cssAttrs
            .map(attr => {
              return `${attr[0]}: ${attr[1]}`;
            })
            .join('; ')
        );
      } else {
        return htmlSafe('');
      }
    }
  )
});
