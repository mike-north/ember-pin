import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('pinned-content', 'Integration | Component | pinned content', {
  integration: true
});

test('it renders', function(assert) {

  let done = assert.async();
  Ember.run(() => {
    // Template block usage:
    this.render(hbs`
      {{#pinned-content}}
        template block text
      {{/pinned-content}}
    `);

    assert.equal(this.$().text().trim(), 'template block text');
    done();
  });
});

test('not fixed if neither top nor bottom specified', function(assert) {

  let done = assert.async();
  Ember.run(() => {
    // Template block usage:
    this.render(hbs`
      {{#pinned-content}}
        template block text
      {{/pinned-content}}
    `);
    assert.equal(this.$('.pinned-content').css('position'), 'static');
    done();
  });
});

test('fixed to top if top is huge', function(assert) {

  let done = assert.async();
  // Template block usage:
  Ember.run(() => {
    this.render(hbs`
      {{#pinned-content top=1000}}
        template block text
      {{/pinned-content}}
    `);

    assert.equal(this.$('.pinned-content').css('position'), 'fixed');
    assert.equal(this.$('.pinned-content').css('top'), '1000px');
    done();
  });
});
