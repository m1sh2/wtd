import 'core-js/es6';
import 'core-js/es7/reflect';
require('zone.js/dist/zone');
require('jquery');

if (process.env.ENV === 'production') {
    // Production
} else {
    // Development
    Error['stackTraceLimit'] = Infinity;
    require('zone.js/dist/long-stack-trace-zone');
}