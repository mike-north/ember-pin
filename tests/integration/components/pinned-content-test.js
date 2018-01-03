import { run } from '@ember/runloop';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('pinned-content', 'Integration | Component | pinned content', {
  integration: true
});

test('it renders', function(assert) {

  let done = assert.async();
  run(() => {
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
  run(() => {
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
  run(() => {
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

test('width is preserved when fixed', function(assert) {

  let done = assert.async();
  // Template block usage:
  this.set('top', -100);
  run(() => {
    this.render(hbs`
      <div style="width: 600px; height: 2000px">
        {{#pinned-content top=top}}
          <div style="width: 402px; display: inline-block">
            template block text
          </div>
        {{/pinned-content}}
      </div>
    `);
    assert.equal(this.$('.pinned-content').attr('style').indexOf('width: 600px') >= 0, false);
    this.set('top', 1000); // Trigger "Fixed to top"
    run.later(() => {
      assert.equal(this.$('.pinned-content').attr('style').indexOf('width: 600px') >= 0, true);
      done();
    }, 100);
  });
});
