'use strict'

/*
 * adonis-framework
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

module.exports = function (View, Route, Config) {
  /**
   * Return url for the route
   */
  View.global('route', (...args) => Route.url(...args))

  /**
   * Make url for the assets file
   */
  View.global('assetsUrl', (url) => url && /^\/|^http(s)?/.test(url) ? url : `/${url}`)

  /**
   * Make link tag for css
   */
  View.global('style', function (url, skipPrefix = false) {
    url = !url.endsWith('.css') && !skipPrefix ? `${url}.css` : url
    return this.safe(`<link rel="stylesheet" href="${this.$globals.assetsUrl(url)}" />`)
  })

  /**
   * Make link tag for css
   * @deprecated
   */
  View.global('css', function (url, skipPrefix = false) {
    console.warn('The \'css\' view global is deprecated. Use \'style\' instead')
    return this.$globals.style.bind(this, url, skipPrefix)()
  })

  /**
   * Make script tag for javascript
   */
  View.global('script', function (url, skipPrefix = false) {
    url = !url.endsWith('.js') && !skipPrefix ? `${url}.js` : url
    return this.safe(`<script type="text/javascript" src="${this.$globals.assetsUrl(url)}"></script>`)
  })
}
