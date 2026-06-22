'use strict';

// Patch schema-utils BEFORE react-scripts loads webpack
const Module = require('module');
const originalLoad = Module._load;

Module._load = function(request, parent, isMain) {
  if (request === 'schema-utils' || request === 'schema-utils/dist/validate') {
    const schemaUtils = originalLoad.apply(this, arguments);
    if (schemaUtils && typeof schemaUtils.validate === 'function' && !schemaUtils.validateOptions) {
      schemaUtils.validateOptions = schemaUtils.validate;
    }
    if (typeof schemaUtils === 'function' && !schemaUtils.validateOptions) {
      const wrapped = schemaUtils;
      const patchedModule = function(...args) { return wrapped(...args); };
      patchedModule.validate = wrapped;
      patchedModule.validateOptions = wrapped;
      return patchedModule;
    }
    return schemaUtils;
  }
  return originalLoad.apply(this, arguments);
};

// Now run react-scripts build
require('react-scripts/scripts/build');