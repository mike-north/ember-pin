# ember-pin [![Build Status](https://travis-ci.org/levanto-financial/ember-pin.svg?branch=master)](https://travis-ci.org/levanto-financial/ember-pin)

![ember-pin](http://i65.tinypic.com/bhwzn8.gif)

[![Build Status](https://travis-ci.org/mike-north/ember-pin.svg?branch=master)](https://travis-ci.org/mike-north/ember-pin)
[![npm version](https://badge.fury.io/js/ember-pin.svg)](http://badge.fury.io/js/ember-pin)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

Pin elements of your UI, triggered by scrolling.

## Use

Install this addon with ember-cli

```
ember install ember-pin
```

And then wrap whatever you want inside the `{{pinned-content}}` component, defining either the `top` or `bottom` property (numeric values, in pixels)

```hbs
{{#pinned-content top=20}}
  <div class="card">
    <div class="card-content">
      <span class="card-title">Top-Pinned</span>
      <p>
        This card should snap to the top
        of the viewport as the user starts
        scrolling down
      </p>
    </div>
  </div>
{{/pinned-content}}
```

## Collaborate

- `git clone` this repository
- `npm install`
- `bower install`

## Running

- `ember server`
- Visit your app at http://localhost:4200.

## Running Tests

- `npm test` (Runs `ember try:testall` to test your addon against multiple Ember versions)
- `ember test`
- `ember test --server`

## Building

- `ember build`

For more information on using ember-cli, visit [http://ember-cli.com/](http://ember-cli.com/).
