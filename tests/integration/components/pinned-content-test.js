import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { run } from '@ember/runloop';

module('Integration | Component | pinned-content', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    let done = assert.async();

    // Template block usage:
    await render(hbs`
      {{#pinned-content}}
        template block text
      {{/pinned-content}}
    `);

    assert.equal(
      this.$()
        .text()
        .trim(),
      'template block text'
    );
    done();
  });

  test('not fixed if neither top nor bottom specified', async function(assert) {
    let done = assert.async();
    // Template block usage:
    await render(hbs`
      {{#pinned-content}}
        template block text
      {{/pinned-content}}
    `);
    assert.equal(this.$('.pinned-content').css('position'), 'static');
    done();
  });

  test('width is preserved when fixed', async function(assert) {
    let done = assert.async();
    // Template block usage:
    this.set('top', -100);
    await render(hbs`
      <div style="width: 600px; height: 2000px">
        {{#pinned-content top=top}}
          <div style="width: 402px; display: inline-block">
            template block text
          </div>
        {{/pinned-content}}
      </div>
    `);
    assert.equal(
      this.$('.pinned-content')
        .attr('style')
        .indexOf('width: 600px') >= 0,
      false
    );
    this.set('top', 1000); // Trigger "Fixed to top"
    run.later(() => {
      assert.equal(
        this.$('.pinned-content')
          .attr('style')
          .indexOf('width: 600px') >= 0,
        true
      );
      done();
    }, 100);
  });
});
