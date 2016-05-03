/*jshint node:true*/
module.exports = {
  description: 'Installation blueprint for ember-pin',
  normalizeEntityName: function() {},
  beforeInstall: function() {
    return this.addAddonToProject('ember-windoc', '~0.1.1');
  }
};
