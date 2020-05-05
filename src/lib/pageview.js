/**
 * @fileoverview Run by all browsers in `script defer`. Used to trigger basic
 * Analytics, including with our known previous signed-in state that was cached
 * in `localStorage`.
 *
 *   * This file is built with Rollup, but separately to our core bundle: don't
 *     import any core site code as it'll be duplicated.
 *   * It's run in all browsers as a regular script (not "module"), and this
 *     includes all ancient browsers, e.g., IE11 or older.
 *   * It runs _before_ our core bundle (for supported browsers).
 */

import {getCLS, getFID, getLCP} from 'web-vitals';
import {dimensions, id, version} from 'webdev_analytics';
import {localStorage} from './utils/storage';

/**
 * See: https://github.com/GoogleChrome/web-vitals#using-analyticsjs
 * @param {Object} metric
 */
function sendToGoogleAnalytics({name, delta, id}) {
  ga('send', 'event', {
    eventCategory: 'Web Vitals',
    eventAction: name,
    // Google Analytics metrics must be integers, so the value is rounded.
    // For CLS the value is first multiplied by 1000 for greater precision
    // (note: increase the multiplier for greater precision if needed).
    eventValue: Math.round(name === 'CLS' ? delta * 1000 : delta),
    // The `id` value will be unique to the current page load. When sending
    // multiple values from the same page (e.g. for CLS), Google Analytics can
    // compute a total by grouping on this ID (note: requires `eventLabel` to
    // be a dimension in your report).
    eventLabel: id,
    // Use a non-interaction event to avoid affecting bounce rate.
    nonInteraction: true,
  });
}

// eslint-disable-next-line
window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
ga('create', id);
ga('set', 'transport', 'beacon');
ga('set', 'page', window.location.pathname);
ga('set', dimensions.SIGNED_IN, localStorage['webdev_isSignedIn'] ? 1 : 0);
ga('set', dimensions.TRACKING_VERSION, version);
ga('send', 'pageview');

// Track each of the Core Web Vitals.
getCLS(sendToGoogleAnalytics);
getFID(sendToGoogleAnalytics);
getLCP(sendToGoogleAnalytics);
