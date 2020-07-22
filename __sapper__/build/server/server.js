'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var sirv = _interopDefault(require('sirv'));
var polka = _interopDefault(require('polka'));
var compression = _interopDefault(require('compression'));
var fs = _interopDefault(require('fs'));
var path = _interopDefault(require('path'));
var richTextHtmlRenderer = require('@contentful/rich-text-html-renderer');
var Stream = _interopDefault(require('stream'));
var http = _interopDefault(require('http'));
var Url = _interopDefault(require('url'));
var https = _interopDefault(require('https'));
var zlib = _interopDefault(require('zlib'));

// Ordinarily, you'd generate this data from markdown files in your
// repo, or fetch them from a database of some kind. But in order to
// avoid unnecessary dependencies in the starter template, and in the
// service of obviousness, we're just going to leave it here.

// This file is called `_posts.js` rather than `posts.js`, because
// we don't want to create an `/blog/posts` route — the leading
// underscore tells Sapper not to do that.

const posts = [
	{
		title: 'What is Sapper?',
		slug: 'what-is-sapper',
		html: `
			<p>First, you have to know what <a href='https://svelte.dev'>Svelte</a> is. Svelte is a UI framework with a bold new idea: rather than providing a library that you write code with (like React or Vue, for example), it's a compiler that turns your components into highly optimized vanilla JavaScript. If you haven't already read the <a href='https://svelte.dev/blog/frameworks-without-the-framework'>introductory blog post</a>, you should!</p>

			<p>Sapper is a Next.js-style framework (<a href='blog/how-is-sapper-different-from-next'>more on that here</a>) built around Svelte. It makes it embarrassingly easy to create extremely high performance web apps. Out of the box, you get:</p>

			<ul>
				<li>Code-splitting, dynamic imports and hot module replacement, powered by webpack</li>
				<li>Server-side rendering (SSR) with client-side hydration</li>
				<li>Service worker for offline support, and all the PWA bells and whistles</li>
				<li>The nicest development experience you've ever had, or your money back</li>
			</ul>

			<p>It's implemented as Express middleware. Everything is set up and waiting for you to get started, but you keep complete control over the server, service worker, webpack config and everything else, so it's as flexible as you need it to be.</p>
		`
	},

	{
		title: 'How to use Sapper',
		slug: 'how-to-use-sapper',
		html: `
			<h2>Step one</h2>
			<p>Create a new project, using <a href='https://github.com/Rich-Harris/degit'>degit</a>:</p>

			<pre><code>npx degit "sveltejs/sapper-template#rollup" my-app
			cd my-app
			npm install # or yarn!
			npm run dev
			</code></pre>

			<h2>Step two</h2>
			<p>Go to <a href='http://localhost:3000'>localhost:3000</a>. Open <code>my-app</code> in your editor. Edit the files in the <code>src/routes</code> directory or add new ones.</p>

			<h2>Step three</h2>
			<p>...</p>

			<h2>Step four</h2>
			<p>Resist overdone joke formats.</p>
		`
	},

	{
		title: 'Why the name?',
		slug: 'why-the-name',
		html: `
			<p>In war, the soldiers who build bridges, repair roads, clear minefields and conduct demolitions — all under combat conditions — are known as <em>sappers</em>.</p>

			<p>For web developers, the stakes are generally lower than those for combat engineers. But we face our own hostile environment: underpowered devices, poor network connections, and the complexity inherent in front-end engineering. Sapper, which is short for <strong>S</strong>velte <strong>app</strong> mak<strong>er</strong>, is your courageous and dutiful ally.</p>
		`
	},

	{
		title: 'How is Sapper different from Next.js?',
		slug: 'how-is-sapper-different-from-next',
		html: `
			<p><a href='https://github.com/zeit/next.js'>Next.js</a> is a React framework from <a href='https://zeit.co'>Zeit</a>, and is the inspiration for Sapper. There are a few notable differences, however:</p>

			<ul>
				<li>It's powered by <a href='https://svelte.dev'>Svelte</a> instead of React, so it's faster and your apps are smaller</li>
				<li>Instead of route masking, we encode route parameters in filenames. For example, the page you're looking at right now is <code>src/routes/blog/[slug].svelte</code></li>
				<li>As well as pages (Svelte components, which render on server or client), you can create <em>server routes</em> in your <code>routes</code> directory. These are just <code>.js</code> files that export functions corresponding to HTTP methods, and receive Express <code>request</code> and <code>response</code> objects as arguments. This makes it very easy to, for example, add a JSON API such as the one <a href='blog/how-is-sapper-different-from-next.json'>powering this very page</a></li>
				<li>Links are just <code>&lt;a&gt;</code> elements, rather than framework-specific <code>&lt;Link&gt;</code> components. That means, for example, that <a href='blog/how-can-i-get-involved'>this link right here</a>, despite being inside a blob of HTML, works with the router as you'd expect.</li>
			</ul>
		`
	},

	{
		title: 'How can I get involved?',
		slug: 'how-can-i-get-involved',
		html: `
			<p>We're so glad you asked! Come on over to the <a href='https://github.com/sveltejs/svelte'>Svelte</a> and <a href='https://github.com/sveltejs/sapper'>Sapper</a> repos, and join us in the <a href='https://svelte.dev/chat'>Discord chatroom</a>. Everyone is welcome, especially you!</p>
		`
	}
];

posts.forEach(post => {
	post.html = post.html.replace(/^\t{3}/gm, '');
});

const contents = JSON.stringify(posts.map(post => {
	return {
		title: post.title,
		slug: post.slug
	};
}));

function get(req, res) {
	res.writeHead(200, {
		'Content-Type': 'application/json'
	});

	res.end(contents);
}

var route_0 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	get: get
});

const lookup = new Map();
posts.forEach(post => {
	lookup.set(post.slug, JSON.stringify(post));
});

function get$1(req, res, next) {
	// the `slug` parameter is available because
	// this file is called [slug].json.js
	const { slug } = req.params;

	if (lookup.has(slug)) {
		res.writeHead(200, {
			'Content-Type': 'application/json'
		});

		res.end(lookup.get(slug));
	} else {
		res.writeHead(404, {
			'Content-Type': 'application/json'
		});

		res.end(JSON.stringify({
			message: `Not found`
		}));
	}
}

var route_1 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	get: get$1
});

// Ordinarily, you'd generate this data from markdown files in your
// repo, or fetch them from a database of some kind. But in order to
// avoid unnecessary dependencies in the starter template, and in the
// service of obviousness, we're just going to leave it here.

// This file is called `_posts.js` rather than `posts.js`, because
// we don't want to create an `/work/posts` route — the leading
// underscore tells Sapper not to do that.

const posts$1 = [{
		title: '芝助',
		slug: 'shibasuke',
		thum: '../../../images/works/works_thum01.jpg',
		hero: '../../../images/works/works_hero01.jpg',
		despriction: 'WEBデザイン',
		html: `
			<p>First, you have to know what <a href='https://svelte.dev'>Svelte</a> is. Svelte is a UI framework with a bold new idea: rather than providing a library that you write code with (like React or Vue, for example), it's a compiler that turns your components into highly optimized vanilla JavaScript. If you haven't already read the <a href='https://svelte.dev/blog/frameworks-without-the-framework'>introductory blog post</a>, you should!</p>

			<p>Sapper is a Next.js-style framework (<a href='blog/how-is-sapper-different-from-next'>more on that here</a>) built around Svelte. It makes it embarrassingly easy to create extremely high performance web apps. Out of the box, you get:</p>

			<ul>
				<li>Code-splitting, dynamic imports and hot module replacement, powered by webpack</li>
				<li>Server-side rendering (SSR) with client-side hydration</li>
				<li>Service worker for offline support, and all the PWA bells and whistles</li>
				<li>The nicest development experience you've ever had, or your money back</li>
			</ul>

			<p>It's implemented as Express middleware. Everything is set up and waiting for you to get started, but you keep complete control over the server, service worker, webpack config and everything else, so it's as flexible as you need it to be.</p>
		`
	},

	{
		title: '自動デイサービス ハートシップ',
		slug: 'heartsite',
		thum: '../../../images/works/works_thum03.jpg',
		hero: '../../../images/works/works_hero03.jpg',
		despriction: 'WEBデザイン',
		html: `
			<h2>Step one</h2>
			<p>Create a new project, using <a href='https://github.com/Rich-Harris/degit'>degit</a>:</p>

			<pre><code>npx degit "sveltejs/sapper-template#rollup" my-app
			cd my-app
			npm install # or yarn!
			npm run dev
			</code></pre>

			<h2>Step two</h2>
			<p>Go to <a href='http://localhost:3000'>localhost:3000</a>. Open <code>my-app</code> in your editor. Edit the files in the <code>src/routes</code> directory or add new ones.</p>

			<h2>Step three</h2>
			<p>...</p>

			<h2>Step four</h2>
			<p>Resist overdone joke formats.</p>
		`
	},

	{
		title: 'ヒマリ',
		slug: 'himari',
		thum: '../../../images/works/works_thum02.jpg',
		hero: '../../../images/works/works_hero02.jpg',
		despriction: 'ワイヤー制作、UI設計、ユーザーインタビュー、LPO',
		html: `
			<p>In war, the soldiers who build bridges, repair roads, clear minefields and conduct demolitions — all under combat conditions — are known as <em>sappers</em>.</p>

			<p>For web developers, the stakes are generally lower than those for combat engineers. But we face our own hostile environment: underpowered devices, poor network connections, and the complexity inherent in front-end engineering. Sapper, which is short for <strong>S</strong>velte <strong>app</strong> mak<strong>er</strong>, is your courageous and dutiful ally.</p>
		`
	},

	{
		title: '芝助 名刺制作',
		slug: 'shibasukemeisi',
		thum: '../../../images/works/works_thum04.jpg',
		hero: '../../../images/works/works_hero04.jpg',
		despriction: 'ノベルティ制作',
		html: `
			<p><a href='https://github.com/zeit/next.js'>Next.js</a> is a React framework from <a href='https://zeit.co'>Zeit</a>, and is the inspiration for Sapper. There are a few notable differences, however:</p>

			<ul>
				<li>It's powered by <a href='https://svelte.dev'>Svelte</a> instead of React, so it's faster and your apps are smaller</li>
				<li>Instead of route masking, we encode route parameters in filenames. For example, the page you're looking at right now is <code>src/routes/blog/[slug].svelte</code></li>
				<li>As well as pages (Svelte components, which render on server or client), you can create <em>server routes</em> in your <code>routes</code> directory. These are just <code>.js</code> files that export functions corresponding to HTTP methods, and receive Express <code>request</code> and <code>response</code> objects as arguments. This makes it very easy to, for example, add a JSON API such as the one <a href='blog/how-is-sapper-different-from-next.json'>powering this very page</a></li>
				<li>Links are just <code>&lt;a&gt;</code> elements, rather than framework-specific <code>&lt;Link&gt;</code> components. That means, for example, that <a href='blog/how-can-i-get-involved'>this link right here</a>, despite being inside a blob of HTML, works with the router as you'd expect.</li>
			</ul>
		`
	},
];

posts$1.forEach(post => {
	post.html = post.html.replace(/^\t{3}/gm, '');
});

const contents$1 = JSON.stringify(posts$1.map(post => {
	return {
		title: post.title,
		slug: post.slug,
		despriction: post.despriction,
		thum: post.thum

	};
}));

function get$2(req, res) {
	res.writeHead(200, {
		'Content-Type': 'application/json'
	});

	res.end(contents$1);
}

var route_2 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	get: get$2
});

const lookup$1 = new Map();
posts$1.forEach(post => {
	lookup$1.set(post.slug, JSON.stringify(post));
});

function get$3(req, res, next) {
	// the `slug` parameter is available because
	// this file is called [slug].json.js
	const { slug } = req.params;

	if (lookup$1.has(slug)) {
		res.writeHead(200, {
			'Content-Type': 'application/json'
		});

		res.end(lookup$1.get(slug));
	} else {
		res.writeHead(404, {
			'Content-Type': 'application/json'
		});

		res.end(JSON.stringify({
			message: `Not found`
		}));
	}
}

var route_3 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	get: get$3
});

function noop() { }
function run(fn) {
    return fn();
}
function blank_object() {
    return Object.create(null);
}
function run_all(fns) {
    fns.forEach(run);
}
function safe_not_equal(a, b) {
    return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
}
function null_to_empty(value) {
    return value == null ? '' : value;
}

let current_component;
function set_current_component(component) {
    current_component = component;
}
function get_current_component() {
    if (!current_component)
        throw new Error(`Function called outside component initialization`);
    return current_component;
}
function setContext(key, context) {
    get_current_component().$$.context.set(key, context);
}
const escaped = {
    '"': '&quot;',
    "'": '&#39;',
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;'
};
function escape(html) {
    return String(html).replace(/["'&<>]/g, match => escaped[match]);
}
function each(items, fn) {
    let str = '';
    for (let i = 0; i < items.length; i += 1) {
        str += fn(items[i], i);
    }
    return str;
}
const missing_component = {
    $$render: () => ''
};
function validate_component(component, name) {
    if (!component || !component.$$render) {
        if (name === 'svelte:component')
            name += ' this={...}';
        throw new Error(`<${name}> is not a valid SSR component. You may need to review your build config to ensure that dependencies are compiled, rather than imported as pre-compiled modules`);
    }
    return component;
}
let on_destroy;
function create_ssr_component(fn) {
    function $$render(result, props, bindings, slots) {
        const parent_component = current_component;
        const $$ = {
            on_destroy,
            context: new Map(parent_component ? parent_component.$$.context : []),
            // these will be immediately discarded
            on_mount: [],
            before_update: [],
            after_update: [],
            callbacks: blank_object()
        };
        set_current_component({ $$ });
        const html = fn(result, props, bindings, slots);
        set_current_component(parent_component);
        return html;
    }
    return {
        render: (props = {}, options = {}) => {
            on_destroy = [];
            const result = { title: '', head: '', css: new Set() };
            const html = $$render(result, props, {}, options);
            run_all(on_destroy);
            return {
                html,
                css: {
                    code: Array.from(result.css).map(css => css.code).join('\n'),
                    map: null // TODO
                },
                head: result.title + result.head
            };
        },
        $$render
    };
}
function add_attribute(name, value, boolean) {
    if (value == null || (boolean && !value))
        return '';
    return ` ${name}${value === true ? '' : `=${typeof value === 'string' ? JSON.stringify(escape(value)) : `"${value}"`}`}`;
}

/*

Based off glamor's StyleSheet, thanks Sunil ❤️

high performance StyleSheet for css-in-js systems

- uses multiple style tags behind the scenes for millions of rules
- uses `insertRule` for appending in production for *much* faster performance

// usage

import { StyleSheet } from '@emotion/sheet'

let styleSheet = new StyleSheet({ key: '', container: document.head })

styleSheet.insert('#box { border: 1px solid red; }')
- appends a css rule into the stylesheet

styleSheet.flush()
- empties the stylesheet of all its contents

*/
// $FlowFixMe
function sheetForTag(tag) {
  if (tag.sheet) {
    // $FlowFixMe
    return tag.sheet;
  } // this weirdness brought to you by firefox

  /* istanbul ignore next */


  for (var i = 0; i < document.styleSheets.length; i++) {
    if (document.styleSheets[i].ownerNode === tag) {
      // $FlowFixMe
      return document.styleSheets[i];
    }
  }
}

function createStyleElement(options) {
  var tag = document.createElement('style');
  tag.setAttribute('data-emotion', options.key);

  if (options.nonce !== undefined) {
    tag.setAttribute('nonce', options.nonce);
  }

  tag.appendChild(document.createTextNode(''));
  return tag;
}

var StyleSheet =
/*#__PURE__*/
function () {
  function StyleSheet(options) {
    this.isSpeedy = options.speedy === undefined ? undefined === 'production' : options.speedy;
    this.tags = [];
    this.ctr = 0;
    this.nonce = options.nonce; // key is the value of the data-emotion attribute, it's used to identify different sheets

    this.key = options.key;
    this.container = options.container;
    this.before = null;
  }

  var _proto = StyleSheet.prototype;

  _proto.insert = function insert(rule) {
    // the max length is how many rules we have per style tag, it's 65000 in speedy mode
    // it's 1 in dev because we insert source maps that map a single rule to a location
    // and you can only have one source map per style tag
    if (this.ctr % (this.isSpeedy ? 65000 : 1) === 0) {
      var _tag = createStyleElement(this);

      var before;

      if (this.tags.length === 0) {
        before = this.before;
      } else {
        before = this.tags[this.tags.length - 1].nextSibling;
      }

      this.container.insertBefore(_tag, before);
      this.tags.push(_tag);
    }

    var tag = this.tags[this.tags.length - 1];

    if (this.isSpeedy) {
      var sheet = sheetForTag(tag);

      try {
        // this is a really hot path
        // we check the second character first because having "i"
        // as the second character will happen less often than
        // having "@" as the first character
        var isImportRule = rule.charCodeAt(1) === 105 && rule.charCodeAt(0) === 64; // this is the ultrafast version, works across browsers
        // the big drawback is that the css won't be editable in devtools

        sheet.insertRule(rule, // we need to insert @import rules before anything else
        // otherwise there will be an error
        // technically this means that the @import rules will
        // _usually_(not always since there could be multiple style tags)
        // be the first ones in prod and generally later in dev
        // this shouldn't really matter in the real world though
        // @import is generally only used for font faces from google fonts and etc.
        // so while this could be technically correct then it would be slower and larger
        // for a tiny bit of correctness that won't matter in the real world
        isImportRule ? 0 : sheet.cssRules.length);
      } catch (e) {
        {
          console.warn("There was a problem inserting the following rule: \"" + rule + "\"", e);
        }
      }
    } else {
      tag.appendChild(document.createTextNode(rule));
    }

    this.ctr++;
  };

  _proto.flush = function flush() {
    // $FlowFixMe
    this.tags.forEach(function (tag) {
      return tag.parentNode.removeChild(tag);
    });
    this.tags = [];
    this.ctr = 0;
  };

  return StyleSheet;
}();

function stylis_min (W) {
  function M(d, c, e, h, a) {
    for (var m = 0, b = 0, v = 0, n = 0, q, g, x = 0, K = 0, k, u = k = q = 0, l = 0, r = 0, I = 0, t = 0, B = e.length, J = B - 1, y, f = '', p = '', F = '', G = '', C; l < B;) {
      g = e.charCodeAt(l);
      l === J && 0 !== b + n + v + m && (0 !== b && (g = 47 === b ? 10 : 47), n = v = m = 0, B++, J++);

      if (0 === b + n + v + m) {
        if (l === J && (0 < r && (f = f.replace(N, '')), 0 < f.trim().length)) {
          switch (g) {
            case 32:
            case 9:
            case 59:
            case 13:
            case 10:
              break;

            default:
              f += e.charAt(l);
          }

          g = 59;
        }

        switch (g) {
          case 123:
            f = f.trim();
            q = f.charCodeAt(0);
            k = 1;

            for (t = ++l; l < B;) {
              switch (g = e.charCodeAt(l)) {
                case 123:
                  k++;
                  break;

                case 125:
                  k--;
                  break;

                case 47:
                  switch (g = e.charCodeAt(l + 1)) {
                    case 42:
                    case 47:
                      a: {
                        for (u = l + 1; u < J; ++u) {
                          switch (e.charCodeAt(u)) {
                            case 47:
                              if (42 === g && 42 === e.charCodeAt(u - 1) && l + 2 !== u) {
                                l = u + 1;
                                break a;
                              }

                              break;

                            case 10:
                              if (47 === g) {
                                l = u + 1;
                                break a;
                              }

                          }
                        }

                        l = u;
                      }

                  }

                  break;

                case 91:
                  g++;

                case 40:
                  g++;

                case 34:
                case 39:
                  for (; l++ < J && e.charCodeAt(l) !== g;) {
                  }

              }

              if (0 === k) break;
              l++;
            }

            k = e.substring(t, l);
            0 === q && (q = (f = f.replace(ca, '').trim()).charCodeAt(0));

            switch (q) {
              case 64:
                0 < r && (f = f.replace(N, ''));
                g = f.charCodeAt(1);

                switch (g) {
                  case 100:
                  case 109:
                  case 115:
                  case 45:
                    r = c;
                    break;

                  default:
                    r = O;
                }

                k = M(c, r, k, g, a + 1);
                t = k.length;
                0 < A && (r = X(O, f, I), C = H(3, k, r, c, D, z, t, g, a, h), f = r.join(''), void 0 !== C && 0 === (t = (k = C.trim()).length) && (g = 0, k = ''));
                if (0 < t) switch (g) {
                  case 115:
                    f = f.replace(da, ea);

                  case 100:
                  case 109:
                  case 45:
                    k = f + '{' + k + '}';
                    break;

                  case 107:
                    f = f.replace(fa, '$1 $2');
                    k = f + '{' + k + '}';
                    k = 1 === w || 2 === w && L('@' + k, 3) ? '@-webkit-' + k + '@' + k : '@' + k;
                    break;

                  default:
                    k = f + k, 112 === h && (k = (p += k, ''));
                } else k = '';
                break;

              default:
                k = M(c, X(c, f, I), k, h, a + 1);
            }

            F += k;
            k = I = r = u = q = 0;
            f = '';
            g = e.charCodeAt(++l);
            break;

          case 125:
          case 59:
            f = (0 < r ? f.replace(N, '') : f).trim();
            if (1 < (t = f.length)) switch (0 === u && (q = f.charCodeAt(0), 45 === q || 96 < q && 123 > q) && (t = (f = f.replace(' ', ':')).length), 0 < A && void 0 !== (C = H(1, f, c, d, D, z, p.length, h, a, h)) && 0 === (t = (f = C.trim()).length) && (f = '\x00\x00'), q = f.charCodeAt(0), g = f.charCodeAt(1), q) {
              case 0:
                break;

              case 64:
                if (105 === g || 99 === g) {
                  G += f + e.charAt(l);
                  break;
                }

              default:
                58 !== f.charCodeAt(t - 1) && (p += P(f, q, g, f.charCodeAt(2)));
            }
            I = r = u = q = 0;
            f = '';
            g = e.charCodeAt(++l);
        }
      }

      switch (g) {
        case 13:
        case 10:
          47 === b ? b = 0 : 0 === 1 + q && 107 !== h && 0 < f.length && (r = 1, f += '\x00');
          0 < A * Y && H(0, f, c, d, D, z, p.length, h, a, h);
          z = 1;
          D++;
          break;

        case 59:
        case 125:
          if (0 === b + n + v + m) {
            z++;
            break;
          }

        default:
          z++;
          y = e.charAt(l);

          switch (g) {
            case 9:
            case 32:
              if (0 === n + m + b) switch (x) {
                case 44:
                case 58:
                case 9:
                case 32:
                  y = '';
                  break;

                default:
                  32 !== g && (y = ' ');
              }
              break;

            case 0:
              y = '\\0';
              break;

            case 12:
              y = '\\f';
              break;

            case 11:
              y = '\\v';
              break;

            case 38:
              0 === n + b + m && (r = I = 1, y = '\f' + y);
              break;

            case 108:
              if (0 === n + b + m + E && 0 < u) switch (l - u) {
                case 2:
                  112 === x && 58 === e.charCodeAt(l - 3) && (E = x);

                case 8:
                  111 === K && (E = K);
              }
              break;

            case 58:
              0 === n + b + m && (u = l);
              break;

            case 44:
              0 === b + v + n + m && (r = 1, y += '\r');
              break;

            case 34:
            case 39:
              0 === b && (n = n === g ? 0 : 0 === n ? g : n);
              break;

            case 91:
              0 === n + b + v && m++;
              break;

            case 93:
              0 === n + b + v && m--;
              break;

            case 41:
              0 === n + b + m && v--;
              break;

            case 40:
              if (0 === n + b + m) {
                if (0 === q) switch (2 * x + 3 * K) {
                  case 533:
                    break;

                  default:
                    q = 1;
                }
                v++;
              }

              break;

            case 64:
              0 === b + v + n + m + u + k && (k = 1);
              break;

            case 42:
            case 47:
              if (!(0 < n + m + v)) switch (b) {
                case 0:
                  switch (2 * g + 3 * e.charCodeAt(l + 1)) {
                    case 235:
                      b = 47;
                      break;

                    case 220:
                      t = l, b = 42;
                  }

                  break;

                case 42:
                  47 === g && 42 === x && t + 2 !== l && (33 === e.charCodeAt(t + 2) && (p += e.substring(t, l + 1)), y = '', b = 0);
              }
          }

          0 === b && (f += y);
      }

      K = x;
      x = g;
      l++;
    }

    t = p.length;

    if (0 < t) {
      r = c;
      if (0 < A && (C = H(2, p, r, d, D, z, t, h, a, h), void 0 !== C && 0 === (p = C).length)) return G + p + F;
      p = r.join(',') + '{' + p + '}';

      if (0 !== w * E) {
        2 !== w || L(p, 2) || (E = 0);

        switch (E) {
          case 111:
            p = p.replace(ha, ':-moz-$1') + p;
            break;

          case 112:
            p = p.replace(Q, '::-webkit-input-$1') + p.replace(Q, '::-moz-$1') + p.replace(Q, ':-ms-input-$1') + p;
        }

        E = 0;
      }
    }

    return G + p + F;
  }

  function X(d, c, e) {
    var h = c.trim().split(ia);
    c = h;
    var a = h.length,
        m = d.length;

    switch (m) {
      case 0:
      case 1:
        var b = 0;

        for (d = 0 === m ? '' : d[0] + ' '; b < a; ++b) {
          c[b] = Z(d, c[b], e).trim();
        }

        break;

      default:
        var v = b = 0;

        for (c = []; b < a; ++b) {
          for (var n = 0; n < m; ++n) {
            c[v++] = Z(d[n] + ' ', h[b], e).trim();
          }
        }

    }

    return c;
  }

  function Z(d, c, e) {
    var h = c.charCodeAt(0);
    33 > h && (h = (c = c.trim()).charCodeAt(0));

    switch (h) {
      case 38:
        return c.replace(F, '$1' + d.trim());

      case 58:
        return d.trim() + c.replace(F, '$1' + d.trim());

      default:
        if (0 < 1 * e && 0 < c.indexOf('\f')) return c.replace(F, (58 === d.charCodeAt(0) ? '' : '$1') + d.trim());
    }

    return d + c;
  }

  function P(d, c, e, h) {
    var a = d + ';',
        m = 2 * c + 3 * e + 4 * h;

    if (944 === m) {
      d = a.indexOf(':', 9) + 1;
      var b = a.substring(d, a.length - 1).trim();
      b = a.substring(0, d).trim() + b + ';';
      return 1 === w || 2 === w && L(b, 1) ? '-webkit-' + b + b : b;
    }

    if (0 === w || 2 === w && !L(a, 1)) return a;

    switch (m) {
      case 1015:
        return 97 === a.charCodeAt(10) ? '-webkit-' + a + a : a;

      case 951:
        return 116 === a.charCodeAt(3) ? '-webkit-' + a + a : a;

      case 963:
        return 110 === a.charCodeAt(5) ? '-webkit-' + a + a : a;

      case 1009:
        if (100 !== a.charCodeAt(4)) break;

      case 969:
      case 942:
        return '-webkit-' + a + a;

      case 978:
        return '-webkit-' + a + '-moz-' + a + a;

      case 1019:
      case 983:
        return '-webkit-' + a + '-moz-' + a + '-ms-' + a + a;

      case 883:
        if (45 === a.charCodeAt(8)) return '-webkit-' + a + a;
        if (0 < a.indexOf('image-set(', 11)) return a.replace(ja, '$1-webkit-$2') + a;
        break;

      case 932:
        if (45 === a.charCodeAt(4)) switch (a.charCodeAt(5)) {
          case 103:
            return '-webkit-box-' + a.replace('-grow', '') + '-webkit-' + a + '-ms-' + a.replace('grow', 'positive') + a;

          case 115:
            return '-webkit-' + a + '-ms-' + a.replace('shrink', 'negative') + a;

          case 98:
            return '-webkit-' + a + '-ms-' + a.replace('basis', 'preferred-size') + a;
        }
        return '-webkit-' + a + '-ms-' + a + a;

      case 964:
        return '-webkit-' + a + '-ms-flex-' + a + a;

      case 1023:
        if (99 !== a.charCodeAt(8)) break;
        b = a.substring(a.indexOf(':', 15)).replace('flex-', '').replace('space-between', 'justify');
        return '-webkit-box-pack' + b + '-webkit-' + a + '-ms-flex-pack' + b + a;

      case 1005:
        return ka.test(a) ? a.replace(aa, ':-webkit-') + a.replace(aa, ':-moz-') + a : a;

      case 1e3:
        b = a.substring(13).trim();
        c = b.indexOf('-') + 1;

        switch (b.charCodeAt(0) + b.charCodeAt(c)) {
          case 226:
            b = a.replace(G, 'tb');
            break;

          case 232:
            b = a.replace(G, 'tb-rl');
            break;

          case 220:
            b = a.replace(G, 'lr');
            break;

          default:
            return a;
        }

        return '-webkit-' + a + '-ms-' + b + a;

      case 1017:
        if (-1 === a.indexOf('sticky', 9)) break;

      case 975:
        c = (a = d).length - 10;
        b = (33 === a.charCodeAt(c) ? a.substring(0, c) : a).substring(d.indexOf(':', 7) + 1).trim();

        switch (m = b.charCodeAt(0) + (b.charCodeAt(7) | 0)) {
          case 203:
            if (111 > b.charCodeAt(8)) break;

          case 115:
            a = a.replace(b, '-webkit-' + b) + ';' + a;
            break;

          case 207:
          case 102:
            a = a.replace(b, '-webkit-' + (102 < m ? 'inline-' : '') + 'box') + ';' + a.replace(b, '-webkit-' + b) + ';' + a.replace(b, '-ms-' + b + 'box') + ';' + a;
        }

        return a + ';';

      case 938:
        if (45 === a.charCodeAt(5)) switch (a.charCodeAt(6)) {
          case 105:
            return b = a.replace('-items', ''), '-webkit-' + a + '-webkit-box-' + b + '-ms-flex-' + b + a;

          case 115:
            return '-webkit-' + a + '-ms-flex-item-' + a.replace(ba, '') + a;

          default:
            return '-webkit-' + a + '-ms-flex-line-pack' + a.replace('align-content', '').replace(ba, '') + a;
        }
        break;

      case 973:
      case 989:
        if (45 !== a.charCodeAt(3) || 122 === a.charCodeAt(4)) break;

      case 931:
      case 953:
        if (!0 === la.test(d)) return 115 === (b = d.substring(d.indexOf(':') + 1)).charCodeAt(0) ? P(d.replace('stretch', 'fill-available'), c, e, h).replace(':fill-available', ':stretch') : a.replace(b, '-webkit-' + b) + a.replace(b, '-moz-' + b.replace('fill-', '')) + a;
        break;

      case 962:
        if (a = '-webkit-' + a + (102 === a.charCodeAt(5) ? '-ms-' + a : '') + a, 211 === e + h && 105 === a.charCodeAt(13) && 0 < a.indexOf('transform', 10)) return a.substring(0, a.indexOf(';', 27) + 1).replace(ma, '$1-webkit-$2') + a;
    }

    return a;
  }

  function L(d, c) {
    var e = d.indexOf(1 === c ? ':' : '{'),
        h = d.substring(0, 3 !== c ? e : 10);
    e = d.substring(e + 1, d.length - 1);
    return R(2 !== c ? h : h.replace(na, '$1'), e, c);
  }

  function ea(d, c) {
    var e = P(c, c.charCodeAt(0), c.charCodeAt(1), c.charCodeAt(2));
    return e !== c + ';' ? e.replace(oa, ' or ($1)').substring(4) : '(' + c + ')';
  }

  function H(d, c, e, h, a, m, b, v, n, q) {
    for (var g = 0, x = c, w; g < A; ++g) {
      switch (w = S[g].call(B, d, x, e, h, a, m, b, v, n, q)) {
        case void 0:
        case !1:
        case !0:
        case null:
          break;

        default:
          x = w;
      }
    }

    if (x !== c) return x;
  }

  function T(d) {
    switch (d) {
      case void 0:
      case null:
        A = S.length = 0;
        break;

      default:
        if ('function' === typeof d) S[A++] = d;else if ('object' === typeof d) for (var c = 0, e = d.length; c < e; ++c) {
          T(d[c]);
        } else Y = !!d | 0;
    }

    return T;
  }

  function U(d) {
    d = d.prefix;
    void 0 !== d && (R = null, d ? 'function' !== typeof d ? w = 1 : (w = 2, R = d) : w = 0);
    return U;
  }

  function B(d, c) {
    var e = d;
    33 > e.charCodeAt(0) && (e = e.trim());
    V = e;
    e = [V];

    if (0 < A) {
      var h = H(-1, c, e, e, D, z, 0, 0, 0, 0);
      void 0 !== h && 'string' === typeof h && (c = h);
    }

    var a = M(O, e, c, 0, 0);
    0 < A && (h = H(-2, a, e, e, D, z, a.length, 0, 0, 0), void 0 !== h && (a = h));
    V = '';
    E = 0;
    z = D = 1;
    return a;
  }

  var ca = /^\0+/g,
      N = /[\0\r\f]/g,
      aa = /: */g,
      ka = /zoo|gra/,
      ma = /([,: ])(transform)/g,
      ia = /,\r+?/g,
      F = /([\t\r\n ])*\f?&/g,
      fa = /@(k\w+)\s*(\S*)\s*/,
      Q = /::(place)/g,
      ha = /:(read-only)/g,
      G = /[svh]\w+-[tblr]{2}/,
      da = /\(\s*(.*)\s*\)/g,
      oa = /([\s\S]*?);/g,
      ba = /-self|flex-/g,
      na = /[^]*?(:[rp][el]a[\w-]+)[^]*/,
      la = /stretch|:\s*\w+\-(?:conte|avail)/,
      ja = /([^-])(image-set\()/,
      z = 1,
      D = 1,
      E = 0,
      w = 1,
      O = [],
      S = [],
      A = 0,
      R = null,
      Y = 0,
      V = '';
  B.use = T;
  B.set = U;
  void 0 !== W && U(W);
  return B;
}

var weakMemoize = function weakMemoize(func) {
  // $FlowFixMe flow doesn't include all non-primitive types as allowed for weakmaps
  var cache = new WeakMap();
  return function (arg) {
    if (cache.has(arg)) {
      // $FlowFixMe
      return cache.get(arg);
    }

    var ret = func(arg);
    cache.set(arg, ret);
    return ret;
  };
};

// https://github.com/thysultan/stylis.js/tree/master/plugins/rule-sheet
// inlined to avoid umd wrapper and peerDep warnings/installing stylis
// since we use stylis after closure compiler
var delimiter = '/*|*/';
var needle = delimiter + '}';

function toSheet(block) {
  if (block) {
    Sheet.current.insert(block + '}');
  }
}

var Sheet = {
  current: null
};
var ruleSheet = function ruleSheet(context, content, selectors, parents, line, column, length, ns, depth, at) {
  switch (context) {
    // property
    case 1:
      {
        switch (content.charCodeAt(0)) {
          case 64:
            {
              // @import
              Sheet.current.insert(content + ';');
              return '';
            }
          // charcode for l

          case 108:
            {
              // charcode for b
              // this ignores label
              if (content.charCodeAt(2) === 98) {
                return '';
              }
            }
        }

        break;
      }
    // selector

    case 2:
      {
        if (ns === 0) return content + delimiter;
        break;
      }
    // at-rule

    case 3:
      {
        switch (ns) {
          // @font-face, @page
          case 102:
          case 112:
            {
              Sheet.current.insert(selectors[0] + content);
              return '';
            }

          default:
            {
              return content + (at === 0 ? delimiter : '');
            }
        }
      }

    case -2:
      {
        content.split(needle).forEach(toSheet);
      }
  }
};
var removeLabel = function removeLabel(context, content) {
  if (context === 1 && // charcode for l
  content.charCodeAt(0) === 108 && // charcode for b
  content.charCodeAt(2) === 98 // this ignores label
  ) {
      return '';
    }
};

var isBrowser = typeof document !== 'undefined';
var rootServerStylisCache = {};
var getServerStylisCache = isBrowser ? undefined : weakMemoize(function () {
  var getCache = weakMemoize(function () {
    return {};
  });
  var prefixTrueCache = {};
  var prefixFalseCache = {};
  return function (prefix) {
    if (prefix === undefined || prefix === true) {
      return prefixTrueCache;
    }

    if (prefix === false) {
      return prefixFalseCache;
    }

    return getCache(prefix);
  };
});

var createCache = function createCache(options) {
  if (options === undefined) options = {};
  var key = options.key || 'css';
  var stylisOptions;

  if (options.prefix !== undefined) {
    stylisOptions = {
      prefix: options.prefix
    };
  }

  var stylis = new stylis_min(stylisOptions);

  {
    // $FlowFixMe
    if (/[^a-z-]/.test(key)) {
      throw new Error("Emotion key must only contain lower case alphabetical characters and - but \"" + key + "\" was passed");
    }
  }

  var inserted = {}; // $FlowFixMe

  var container;

  if (isBrowser) {
    container = options.container || document.head;
    var nodes = document.querySelectorAll("style[data-emotion-" + key + "]");
    Array.prototype.forEach.call(nodes, function (node) {
      var attrib = node.getAttribute("data-emotion-" + key); // $FlowFixMe

      attrib.split(' ').forEach(function (id) {
        inserted[id] = true;
      });

      if (node.parentNode !== container) {
        container.appendChild(node);
      }
    });
  }

  var _insert;

  if (isBrowser) {
    stylis.use(options.stylisPlugins)(ruleSheet);

    _insert = function insert(selector, serialized, sheet, shouldCache) {
      var name = serialized.name;
      Sheet.current = sheet;

      if ( serialized.map !== undefined) {
        var map = serialized.map;
        Sheet.current = {
          insert: function insert(rule) {
            sheet.insert(rule + map);
          }
        };
      }

      stylis(selector, serialized.styles);

      if (shouldCache) {
        cache.inserted[name] = true;
      }
    };
  } else {
    stylis.use(removeLabel);
    var serverStylisCache = rootServerStylisCache;

    if (options.stylisPlugins || options.prefix !== undefined) {
      stylis.use(options.stylisPlugins); // $FlowFixMe

      serverStylisCache = getServerStylisCache(options.stylisPlugins || rootServerStylisCache)(options.prefix);
    }

    var getRules = function getRules(selector, serialized) {
      var name = serialized.name;

      if (serverStylisCache[name] === undefined) {
        serverStylisCache[name] = stylis(selector, serialized.styles);
      }

      return serverStylisCache[name];
    };

    _insert = function _insert(selector, serialized, sheet, shouldCache) {
      var name = serialized.name;
      var rules = getRules(selector, serialized);

      if (cache.compat === undefined) {
        // in regular mode, we don't set the styles on the inserted cache
        // since we don't need to and that would be wasting memory
        // we return them so that they are rendered in a style tag
        if (shouldCache) {
          cache.inserted[name] = true;
        }

        return rules;
      } else {
        // in compat mode, we put the styles on the inserted cache so
        // that emotion-server can pull out the styles
        // except when we don't want to cache it which was in Global but now
        // is nowhere but we don't want to do a major right now
        // and just in case we're going to leave the case here
        // it's also not affecting client side bundle size
        // so it's really not a big deal
        if (shouldCache) {
          cache.inserted[name] = rules;
        } else {
          return rules;
        }
      }
    };
  }

  {
    // https://esbench.com/bench/5bf7371a4cd7e6009ef61d0a
    var commentStart = /\/\*/g;
    var commentEnd = /\*\//g;
    stylis.use(function (context, content) {
      switch (context) {
        case -1:
          {
            while (commentStart.test(content)) {
              commentEnd.lastIndex = commentStart.lastIndex;

              if (commentEnd.test(content)) {
                commentStart.lastIndex = commentEnd.lastIndex;
                continue;
              }

              throw new Error('Your styles have an unterminated comment ("/*" without corresponding "*/").');
            }

            commentStart.lastIndex = 0;
            break;
          }
      }
    });
    stylis.use(function (context, content, selectors) {
      switch (context) {
        case -1:
          {
            var flag = 'emotion-disable-server-rendering-unsafe-selector-warning-please-do-not-use-this-the-warning-exists-for-a-reason';
            var unsafePseudoClasses = content.match(/(:first|:nth|:nth-last)-child/g);

            if (unsafePseudoClasses && cache.compat !== true) {
              unsafePseudoClasses.forEach(function (unsafePseudoClass) {
                var ignoreRegExp = new RegExp(unsafePseudoClass + ".*\\/\\* " + flag + " \\*\\/");
                var ignore = ignoreRegExp.test(content);

                if (unsafePseudoClass && !ignore) {
                  console.error("The pseudo class \"" + unsafePseudoClass + "\" is potentially unsafe when doing server-side rendering. Try changing it to \"" + unsafePseudoClass.split('-child')[0] + "-of-type\".");
                }
              });
            }

            break;
          }
      }
    });
  }

  var cache = {
    key: key,
    sheet: new StyleSheet({
      key: key,
      container: container,
      nonce: options.nonce,
      speedy: options.speedy
    }),
    nonce: options.nonce,
    inserted: inserted,
    registered: {},
    insert: _insert
  };
  return cache;
};

/* eslint-disable */
// Inspired by https://github.com/garycourt/murmurhash-js
// Ported from https://github.com/aappleby/smhasher/blob/61a0530f28277f2e850bfc39600ce61d02b518de/src/MurmurHash2.cpp#L37-L86
function murmur2(str) {
  // 'm' and 'r' are mixing constants generated offline.
  // They're not really 'magic', they just happen to work well.
  // const m = 0x5bd1e995;
  // const r = 24;
  // Initialize the hash
  var h = 0; // Mix 4 bytes at a time into the hash

  var k,
      i = 0,
      len = str.length;

  for (; len >= 4; ++i, len -= 4) {
    k = str.charCodeAt(i) & 0xff | (str.charCodeAt(++i) & 0xff) << 8 | (str.charCodeAt(++i) & 0xff) << 16 | (str.charCodeAt(++i) & 0xff) << 24;
    k =
    /* Math.imul(k, m): */
    (k & 0xffff) * 0x5bd1e995 + ((k >>> 16) * 0xe995 << 16);
    k ^=
    /* k >>> r: */
    k >>> 24;
    h =
    /* Math.imul(k, m): */
    (k & 0xffff) * 0x5bd1e995 + ((k >>> 16) * 0xe995 << 16) ^
    /* Math.imul(h, m): */
    (h & 0xffff) * 0x5bd1e995 + ((h >>> 16) * 0xe995 << 16);
  } // Handle the last few bytes of the input array


  switch (len) {
    case 3:
      h ^= (str.charCodeAt(i + 2) & 0xff) << 16;

    case 2:
      h ^= (str.charCodeAt(i + 1) & 0xff) << 8;

    case 1:
      h ^= str.charCodeAt(i) & 0xff;
      h =
      /* Math.imul(h, m): */
      (h & 0xffff) * 0x5bd1e995 + ((h >>> 16) * 0xe995 << 16);
  } // Do a few final mixes of the hash to ensure the last few
  // bytes are well-incorporated.


  h ^= h >>> 13;
  h =
  /* Math.imul(h, m): */
  (h & 0xffff) * 0x5bd1e995 + ((h >>> 16) * 0xe995 << 16);
  return ((h ^ h >>> 15) >>> 0).toString(36);
}

var unitlessKeys = {
  animationIterationCount: 1,
  borderImageOutset: 1,
  borderImageSlice: 1,
  borderImageWidth: 1,
  boxFlex: 1,
  boxFlexGroup: 1,
  boxOrdinalGroup: 1,
  columnCount: 1,
  columns: 1,
  flex: 1,
  flexGrow: 1,
  flexPositive: 1,
  flexShrink: 1,
  flexNegative: 1,
  flexOrder: 1,
  gridRow: 1,
  gridRowEnd: 1,
  gridRowSpan: 1,
  gridRowStart: 1,
  gridColumn: 1,
  gridColumnEnd: 1,
  gridColumnSpan: 1,
  gridColumnStart: 1,
  msGridRow: 1,
  msGridRowSpan: 1,
  msGridColumn: 1,
  msGridColumnSpan: 1,
  fontWeight: 1,
  lineHeight: 1,
  opacity: 1,
  order: 1,
  orphans: 1,
  tabSize: 1,
  widows: 1,
  zIndex: 1,
  zoom: 1,
  WebkitLineClamp: 1,
  // SVG-related properties
  fillOpacity: 1,
  floodOpacity: 1,
  stopOpacity: 1,
  strokeDasharray: 1,
  strokeDashoffset: 1,
  strokeMiterlimit: 1,
  strokeOpacity: 1,
  strokeWidth: 1
};

function memoize(fn) {
  var cache = {};
  return function (arg) {
    if (cache[arg] === undefined) cache[arg] = fn(arg);
    return cache[arg];
  };
}

var ILLEGAL_ESCAPE_SEQUENCE_ERROR = "You have illegal escape sequence in your template literal, most likely inside content's property value.\nBecause you write your CSS inside a JavaScript string you actually have to do double escaping, so for example \"content: '\\00d7';\" should become \"content: '\\\\00d7';\".\nYou can read more about this here:\nhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#ES2018_revision_of_illegal_escape_sequences";
var UNDEFINED_AS_OBJECT_KEY_ERROR = "You have passed in falsy value as style object's key (can happen when in example you pass unexported component as computed key).";
var hyphenateRegex = /[A-Z]|^ms/g;
var animationRegex = /_EMO_([^_]+?)_([^]*?)_EMO_/g;

var isCustomProperty = function isCustomProperty(property) {
  return property.charCodeAt(1) === 45;
};

var isProcessableValue = function isProcessableValue(value) {
  return value != null && typeof value !== 'boolean';
};

var processStyleName = memoize(function (styleName) {
  return isCustomProperty(styleName) ? styleName : styleName.replace(hyphenateRegex, '-$&').toLowerCase();
});

var processStyleValue = function processStyleValue(key, value) {
  switch (key) {
    case 'animation':
    case 'animationName':
      {
        if (typeof value === 'string') {
          return value.replace(animationRegex, function (match, p1, p2) {
            cursor = {
              name: p1,
              styles: p2,
              next: cursor
            };
            return p1;
          });
        }
      }
  }

  if (unitlessKeys[key] !== 1 && !isCustomProperty(key) && typeof value === 'number' && value !== 0) {
    return value + 'px';
  }

  return value;
};

{
  var contentValuePattern = /(attr|calc|counters?|url)\(/;
  var contentValues = ['normal', 'none', 'counter', 'open-quote', 'close-quote', 'no-open-quote', 'no-close-quote', 'initial', 'inherit', 'unset'];
  var oldProcessStyleValue = processStyleValue;
  var msPattern = /^-ms-/;
  var hyphenPattern = /-(.)/g;
  var hyphenatedCache = {};

  processStyleValue = function processStyleValue(key, value) {
    if (key === 'content') {
      if (typeof value !== 'string' || contentValues.indexOf(value) === -1 && !contentValuePattern.test(value) && (value.charAt(0) !== value.charAt(value.length - 1) || value.charAt(0) !== '"' && value.charAt(0) !== "'")) {
        console.error("You seem to be using a value for 'content' without quotes, try replacing it with `content: '\"" + value + "\"'`");
      }
    }

    var processed = oldProcessStyleValue(key, value);

    if (processed !== '' && !isCustomProperty(key) && key.indexOf('-') !== -1 && hyphenatedCache[key] === undefined) {
      hyphenatedCache[key] = true;
      console.error("Using kebab-case for css properties in objects is not supported. Did you mean " + key.replace(msPattern, 'ms-').replace(hyphenPattern, function (str, _char) {
        return _char.toUpperCase();
      }) + "?");
    }

    return processed;
  };
}

var shouldWarnAboutInterpolatingClassNameFromCss = true;

function handleInterpolation(mergedProps, registered, interpolation, couldBeSelectorInterpolation) {
  if (interpolation == null) {
    return '';
  }

  if (interpolation.__emotion_styles !== undefined) {
    if ( interpolation.toString() === 'NO_COMPONENT_SELECTOR') {
      throw new Error('Component selectors can only be used in conjunction with babel-plugin-emotion.');
    }

    return interpolation;
  }

  switch (typeof interpolation) {
    case 'boolean':
      {
        return '';
      }

    case 'object':
      {
        if (interpolation.anim === 1) {
          cursor = {
            name: interpolation.name,
            styles: interpolation.styles,
            next: cursor
          };
          return interpolation.name;
        }

        if (interpolation.styles !== undefined) {
          var next = interpolation.next;

          if (next !== undefined) {
            // not the most efficient thing ever but this is a pretty rare case
            // and there will be very few iterations of this generally
            while (next !== undefined) {
              cursor = {
                name: next.name,
                styles: next.styles,
                next: cursor
              };
              next = next.next;
            }
          }

          var styles = interpolation.styles + ";";

          if ( interpolation.map !== undefined) {
            styles += interpolation.map;
          }

          return styles;
        }

        return createStringFromObject(mergedProps, registered, interpolation);
      }

    case 'function':
      {
        if (mergedProps !== undefined) {
          var previousCursor = cursor;
          var result = interpolation(mergedProps);
          cursor = previousCursor;
          return handleInterpolation(mergedProps, registered, result, couldBeSelectorInterpolation);
        } else {
          console.error('Functions that are interpolated in css calls will be stringified.\n' + 'If you want to have a css call based on props, create a function that returns a css call like this\n' + 'let dynamicStyle = (props) => css`color: ${props.color}`\n' + 'It can be called directly with props or interpolated in a styled call like this\n' + "let SomeComponent = styled('div')`${dynamicStyle}`");
        }

        break;
      }

    case 'string':
      {
        var matched = [];
        var replaced = interpolation.replace(animationRegex, function (match, p1, p2) {
          var fakeVarName = "animation" + matched.length;
          matched.push("const " + fakeVarName + " = keyframes`" + p2.replace(/^@keyframes animation-\w+/, '') + "`");
          return "${" + fakeVarName + "}";
        });

        if (matched.length) {
          console.error('`keyframes` output got interpolated into plain string, please wrap it with `css`.\n\n' + 'Instead of doing this:\n\n' + [].concat(matched, ["`" + replaced + "`"]).join('\n') + '\n\nYou should wrap it with `css` like this:\n\n' + ("css`" + replaced + "`"));
        }
      }

      break;
  } // finalize string values (regular strings and functions interpolated into css calls)


  if (registered == null) {
    return interpolation;
  }

  var cached = registered[interpolation];

  if ( couldBeSelectorInterpolation && shouldWarnAboutInterpolatingClassNameFromCss && cached !== undefined) {
    console.error('Interpolating a className from css`` is not recommended and will cause problems with composition.\n' + 'Interpolating a className from css`` will be completely unsupported in a future major version of Emotion');
    shouldWarnAboutInterpolatingClassNameFromCss = false;
  }

  return cached !== undefined && !couldBeSelectorInterpolation ? cached : interpolation;
}

function createStringFromObject(mergedProps, registered, obj) {
  var string = '';

  if (Array.isArray(obj)) {
    for (var i = 0; i < obj.length; i++) {
      string += handleInterpolation(mergedProps, registered, obj[i], false);
    }
  } else {
    for (var _key in obj) {
      var value = obj[_key];

      if (typeof value !== 'object') {
        if (registered != null && registered[value] !== undefined) {
          string += _key + "{" + registered[value] + "}";
        } else if (isProcessableValue(value)) {
          string += processStyleName(_key) + ":" + processStyleValue(_key, value) + ";";
        }
      } else {
        if (_key === 'NO_COMPONENT_SELECTOR' && undefined !== 'production') {
          throw new Error('Component selectors can only be used in conjunction with babel-plugin-emotion.');
        }

        if (Array.isArray(value) && typeof value[0] === 'string' && (registered == null || registered[value[0]] === undefined)) {
          for (var _i = 0; _i < value.length; _i++) {
            if (isProcessableValue(value[_i])) {
              string += processStyleName(_key) + ":" + processStyleValue(_key, value[_i]) + ";";
            }
          }
        } else {
          var interpolated = handleInterpolation(mergedProps, registered, value, false);

          switch (_key) {
            case 'animation':
            case 'animationName':
              {
                string += processStyleName(_key) + ":" + interpolated + ";";
                break;
              }

            default:
              {
                if ( _key === 'undefined') {
                  console.error(UNDEFINED_AS_OBJECT_KEY_ERROR);
                }

                string += _key + "{" + interpolated + "}";
              }
          }
        }
      }
    }
  }

  return string;
}

var labelPattern = /label:\s*([^\s;\n{]+)\s*;/g;
var sourceMapPattern;

{
  sourceMapPattern = /\/\*#\ssourceMappingURL=data:application\/json;\S+\s+\*\//;
} // this is the cursor for keyframes
// keyframes are stored on the SerializedStyles object as a linked list


var cursor;
var serializeStyles = function serializeStyles(args, registered, mergedProps) {
  if (args.length === 1 && typeof args[0] === 'object' && args[0] !== null && args[0].styles !== undefined) {
    return args[0];
  }

  var stringMode = true;
  var styles = '';
  cursor = undefined;
  var strings = args[0];

  if (strings == null || strings.raw === undefined) {
    stringMode = false;
    styles += handleInterpolation(mergedProps, registered, strings, false);
  } else {
    if ( strings[0] === undefined) {
      console.error(ILLEGAL_ESCAPE_SEQUENCE_ERROR);
    }

    styles += strings[0];
  } // we start at 1 since we've already handled the first arg


  for (var i = 1; i < args.length; i++) {
    styles += handleInterpolation(mergedProps, registered, args[i], styles.charCodeAt(styles.length - 1) === 46);

    if (stringMode) {
      if ( strings[i] === undefined) {
        console.error(ILLEGAL_ESCAPE_SEQUENCE_ERROR);
      }

      styles += strings[i];
    }
  }

  var sourceMap;

  {
    styles = styles.replace(sourceMapPattern, function (match) {
      sourceMap = match;
      return '';
    });
  } // using a global regex with .exec is stateful so lastIndex has to be reset each time


  labelPattern.lastIndex = 0;
  var identifierName = '';
  var match; // https://esbench.com/bench/5b809c2cf2949800a0f61fb5

  while ((match = labelPattern.exec(styles)) !== null) {
    identifierName += '-' + // $FlowFixMe we know it's not null
    match[1];
  }

  var name = murmur2(styles) + identifierName;

  {
    // $FlowFixMe SerializedStyles type doesn't have toString property (and we don't want to add it)
    return {
      name: name,
      styles: styles,
      map: sourceMap,
      next: cursor,
      toString: function toString() {
        return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop).";
      }
    };
  }
};

var isBrowser$1 = typeof document !== 'undefined';
function getRegisteredStyles(registered, registeredStyles, classNames) {
  var rawClassName = '';
  classNames.split(' ').forEach(function (className) {
    if (registered[className] !== undefined) {
      registeredStyles.push(registered[className]);
    } else {
      rawClassName += className + " ";
    }
  });
  return rawClassName;
}
var insertStyles = function insertStyles(cache, serialized, isStringTag) {
  var className = cache.key + "-" + serialized.name;

  if ( // we only need to add the styles to the registered cache if the
  // class name could be used further down
  // the tree but if it's a string tag, we know it won't
  // so we don't have to add it to registered cache.
  // this improves memory usage since we can avoid storing the whole style string
  (isStringTag === false || // we need to always store it if we're in compat mode and
  // in node since emotion-server relies on whether a style is in
  // the registered cache to know whether a style is global or not
  // also, note that this check will be dead code eliminated in the browser
  isBrowser$1 === false && cache.compat !== undefined) && cache.registered[className] === undefined) {
    cache.registered[className] = serialized.styles;
  }

  if (cache.inserted[serialized.name] === undefined) {
    var stylesForSSR = '';
    var current = serialized;

    do {
      var maybeStyles = cache.insert("." + className, current, cache.sheet, true);

      if (!isBrowser$1 && maybeStyles !== undefined) {
        stylesForSSR += maybeStyles;
      }

      current = current.next;
    } while (current !== undefined);

    if (!isBrowser$1 && stylesForSSR.length !== 0) {
      return stylesForSSR;
    }
  }
};

function insertWithoutScoping(cache, serialized) {
  if (cache.inserted[serialized.name] === undefined) {
    return cache.insert('', serialized, cache.sheet, true);
  }
}

function merge(registered, css, className) {
  var registeredStyles = [];
  var rawClassName = getRegisteredStyles(registered, registeredStyles, className);

  if (registeredStyles.length < 2) {
    return className;
  }

  return rawClassName + css(registeredStyles);
}

var createEmotion = function createEmotion(options) {
  var cache = createCache(options); // $FlowFixMe

  cache.sheet.speedy = function (value) {
    if ( this.ctr !== 0) {
      throw new Error('speedy must be changed before any rules are inserted');
    }

    this.isSpeedy = value;
  };

  cache.compat = true;

  var css = function css() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var serialized = serializeStyles(args, cache.registered, undefined);
    insertStyles(cache, serialized, false);
    return cache.key + "-" + serialized.name;
  };

  var keyframes = function keyframes() {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    var serialized = serializeStyles(args, cache.registered);
    var animation = "animation-" + serialized.name;
    insertWithoutScoping(cache, {
      name: serialized.name,
      styles: "@keyframes " + animation + "{" + serialized.styles + "}"
    });
    return animation;
  };

  var injectGlobal = function injectGlobal() {
    for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    var serialized = serializeStyles(args, cache.registered);
    insertWithoutScoping(cache, serialized);
  };

  var cx = function cx() {
    for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      args[_key4] = arguments[_key4];
    }

    return merge(cache.registered, css, classnames(args));
  };

  return {
    css: css,
    cx: cx,
    injectGlobal: injectGlobal,
    keyframes: keyframes,
    hydrate: function hydrate(ids) {
      ids.forEach(function (key) {
        cache.inserted[key] = true;
      });
    },
    flush: function flush() {
      cache.registered = {};
      cache.inserted = {};
      cache.sheet.flush();
    },
    // $FlowFixMe
    sheet: cache.sheet,
    cache: cache,
    getRegisteredStyles: getRegisteredStyles.bind(null, cache.registered),
    merge: merge.bind(null, cache.registered, css)
  };
};

var classnames = function classnames(args) {
  var cls = '';

  for (var i = 0; i < args.length; i++) {
    var arg = args[i];
    if (arg == null) continue;
    var toAdd = void 0;

    switch (typeof arg) {
      case 'boolean':
        break;

      case 'object':
        {
          if (Array.isArray(arg)) {
            toAdd = classnames(arg);
          } else {
            toAdd = '';

            for (var k in arg) {
              if (arg[k] && k) {
                toAdd && (toAdd += ' ');
                toAdd += k;
              }
            }
          }

          break;
        }

      default:
        {
          toAdd = arg;
        }
    }

    if (toAdd) {
      cls && (cls += ' ');
      cls += toAdd;
    }
  }

  return cls;
};

var _createEmotion = createEmotion(),
    keyframes = _createEmotion.keyframes,
    css = _createEmotion.css;

var Color = {

  /*---------------------------------------------------------------------------------------------------------------------
    1. Color
  ---------------------------------------------------------------------------------------------------------------------*/
  /*	1.1 Main
  ---------------------------------------------------------------------------------------------------------------------*/
  /* ベースカラー */
  Primary: '#856D47',
  Key: '#2AC7C9',
  Secondary: '#CC4344',
  SecondaryDark: 'darken(#CC4344, 20 %)',
  Tertiary: '#427C7E',
  Success: '#088312',
  Warning: '#e6e200',
  White: '#FDFDFD',
  Error: 'red',
  Underline: '#ff0',

  /* テキストカラー(若い番号から使用頻度高) */
  Text200: '#222',
  Text100: '#222',

  /* リンクカラー(若い番号から使用頻度高) */
  Link200: '#ff0096',
  Link100: '#222',

  /* 無彩色(若い番号から使用頻度高) */
  Gray600: '#7b7d81',
  Gray500: '#C5C5C5',
  Gray400: 'lighten(#222, 16%)',
  Gray300: 'lighten(#FDFDFD, 16%)',
  Gray200: '#F2F3F4',
  Gray100: '#FDFDFD',


  /*	1.2 Font
  ---------------------------------------------------------------------------------------------------------------------*/
  //フォントサイズ 10px基準/rem
  FontSizeBase: '1.4',


  //font
  FontFamilyBase: 'noto-sans-cjk-jp, sans-serif',
  FontFamilyEng100: 'urw-din, sans-serif',

  /*	1.3 Bg
  ---------------------------------------------------------------------------------------------------------------------*/

  /* 無彩色(若い番号から使用頻度高) */
  //   BgOVR: 'rgba(107, 103, 94, 0.3)',
  //   Bg300: '#d7d4c5',
  //   Bg200: ${ key },
  // Bg100: '#FDFDFD',

};

/*---------------------------------------------------------------------------------------------------------------------
	fontsize
---------------------------------------------------------------------------------------------------------------------*/
function rem(size) {
  return {
    fontSize: (size / 16) + 'rem',
  };
}
/*---------------------------------------------------------------------------------------------------------------------
	preset
---------------------------------------------------------------------------------------------------------------------*/
/*------------
▼ブレイクポイントのルール▼
モバイルファーストとして設計
*〜479px：SP縦
* 480px〜：SP横
* 768px〜tab
* 1280px〜PC(小）
* 1920px〜PC（大）
------------*/
const breakpoints = [480, 768, 1040, 1920];
const mq = breakpoints.map(
  bp => `@media (min-width: ${bp}px)`
);

/*---------------------------------------------------------------------------------------------------------------------
  1. Variables
---------------------------------------------------------------------------------------------------------------------*/
/*	1.1 Layout
---------------------------------------------------------------------------------------------------------------------*/

const leftP = css`
  margin-left: 16px;

  ${mq[1]}{
    margin-left: 240px;
  }
`;


//天地左右flex
const centerF = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

//justify : 両端揃えの設定
const justify = css`
  text-align: justify;
  text-justify: inter-ideograph;
`;

//天地左右
function center(direction) {
  if (direction == 'xy') {
    return {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    };
  } else if (direction == 'x') {
    return {
      //左寄せ
      position: 'absolute',
      left: '50%',
      transform: 'translateX(-50%)',
    };
  } else if (direction == 'y') {
    return {
      // 右寄せ
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
    };
  }}

const gridLayout = css`
  display: grid;
  display: -ms-grid;
`;

//border-radius
const radius = css`
  border-radius: 2px;
`;

const secP = css`
  padding: 32px 24px;
  ${mq[1]} {
    padding: 64px 24px;
  }
`;

const maxW = css`
  max-width: 680px;
`;

//SP横幅一括
const sp96 = css`
  width: 96%;
  margin: auto;
`;

//文字が溢れた際の表示を … にする（複数行対応, Chrome/Safariのみ）
const lineTruncate = css`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

/*	2.2 背景
---------------------------------------------------------------------------------------------------------------------*/
//背景画像
//img
// export const imgPath = '../static/image/',

// export function backgroundImage(fileName) {
//   return {
//     backgroundImage: 'url(' + imgPath + fileName + ') no-repeat 50% 50% / cover',
//   }
// };

//ブロックの縦横比を設定
// 第１引数：（必須）幅
// 第２引数：（必須）高さ
// 第３引数：背景画像を指定する際のみ画像へのパス
// export function aspectRatio(width, height, image_path = null) {
//   return {
//     display: 'block',
//     width: '100%',
//     height: '0',
//     paddingTop: '(' + height + ' / ' + width + ') * 100%',

//     if(image_path) {
//       return {
//         background: 'url(' + image_path + ') 50% 50% no-repeat/cover',
//       }
//     }
//   }
// }

//ウィンドウ幅のブロックを作る
const fullWidth = css`
  margin-left: calc((100vw - 100%) / -2);
  margin-right: calc((100vw - 100%) / -2);
  max-width: auto;    // IE対策
  max-width: initial;
`;

/*	2.3 その他
---------------------------------------------------------------------------------------------------------------------*/
//shadow
const shadow = css`
  box-shadow: 0 8px 16px rgba(0,0,0,0.12);
`;

//clearfix
const clearfix = css`
  &::after {
    content: "";
    display: block;
    clear: both;
  }
`;

// // z-index
// export function z(name, childname = '0') {
//   let getkey = map.get(zMap, name);
//   if (childname != 0) {
//     return {
//       index(getkey, childname);
//     }
//   } else {
//     return {
//       inspect(index(zMap, (name, getkey)));
//   }
// }
// }

//common

// hX の共通 style
function HcommonStyle() {
  return {
    color: Color.Text100,
  };
}

// h1 の style
const H1 = css`
  ${HcommonStyle()}
  fontSize: "24px",
`;

// h2 の style
const display1 = css`
    ${HcommonStyle()}
    ${rem(17)}
    text-transform: capitalize;
    margin-bottom: 1rem;

  ${mq[1]}{
    ${rem(34)}
  }
`;

const display2 = css`
    ${HcommonStyle()}
    ${rem(24)}
    -webkit-text-stroke: .03em ${Color.Text100};
    color: transparent;
    text-transform: uppercase;
    letter-spacing: .03em;
    margin-bottom: 1rem;

  ${mq[1]}{
    ${rem(48)}
  }
`;

const mainHeading = css`
    ${HcommonStyle()}
    ${rem(18)}

  ${mq[1]}{
    ${rem(24)}
  }
`;

const subHeading = css`
    ${HcommonStyle()}
    ${rem(16)}

  ${mq[1]}{
    ${rem(18)}
  }
`;

const hTitle = css`
    ${HcommonStyle()}
    ${rem(18)}

  ${mq[1]}{
    ${rem(22)}
  }
`;

const BodyBold = css`
    ${HcommonStyle()}
    ${rem(13)}
  font-weight: bold;

    ${mq[1]} {
    ${rem(14)}
  }
`;

const Body = css`
    ${HcommonStyle()}
    ${rem(13)}

  ${mq[1]}{
    ${rem(14)}
  }
`;

/* src/components/organisms/AppTwoColumnWide.svelte generated by Svelte v3.20.1 */

const AppTwoColumnWide = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let { img = "" } = $$props;
	let { title = "" } = $$props;
	let { despriction = "" } = $$props;
	let { body = "" } = $$props;

	//style
	const pointBlock = css`
    margin-bottom: 40px;

    ${mq[1]} {
      margin-bottom: 240px;
    }

    ${mq[2]} {
      margin-bottom: 320px;
    }

    &:nth-of-type(2) {
      .css-1tis47d {
        //苦渋の選択
        flex-direction: row-reverse;
        color: ${Color.White};
      }

      ${mq[1]} {
        .css-sb83h2{
          position: absolute;
          left: 0;
        }
      }

      .css-1fhl3r {
        background: ${Color.Gray600};
        color: ${Color.White};
      }

      .css-dwvb5m{
        color: ${Color.White};
      }
    }
  `;

	const pointItem = css`
    ${mq[1]} {
      display: flex;
      justify-content: space-between;
      align-items: start;
      position: relative;
    }
  `;

	const pointBody = css`
    text-align: left;
    padding: 16px 24px;

    ${mq[1]} {
      padding: 48px 56px;
      background: ${Color.White};
      width: 46%;
    }
  `;

	const pointImage = css`
    text-align: left;
    padding: 16px 24px;

    ${mq[1]} {
      position: absolute;
      top: 40px;
      bottom: 0;
      right: 0;
      width: calc(64% - 16px);
      z-index: -1;

      img{
        width: 100%;
        height: auto;
      }
    }
  `;

	if ($$props.img === void 0 && $$bindings.img && img !== void 0) $$bindings.img(img);
	if ($$props.title === void 0 && $$bindings.title && title !== void 0) $$bindings.title(title);
	if ($$props.despriction === void 0 && $$bindings.despriction && despriction !== void 0) $$bindings.despriction(despriction);
	if ($$props.body === void 0 && $$bindings.body && body !== void 0) $$bindings.body(body);

	return `<div${add_attribute("class", pointBlock, 0)}><div${add_attribute("class", pointItem, 0)}><section${add_attribute("class", pointBody, 0)}><h3${add_attribute("class", display1, 0)}>${escape(title)}</h3>
      ${escape(body)}</section>
    <div${add_attribute("class", pointImage, 0)}><img${add_attribute("src", img, 0)}${add_attribute("alt", despriction, 0)}></div></div></div>`;
});

/* src/components/atoms/AppSlideButtonItem.svelte generated by Svelte v3.20.1 */

const AppSlideButtonItem = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let { type = "button" } = $$props;
	let { areaLabel = "" } = $$props;
	let { className = "worksButtonPrev" } = $$props;

	const worksButtonPrev = css`
    list-style-type: none;
  `;

	const worksButtonNext = css`
    list-style-type: none;
  `;

	if ($$props.type === void 0 && $$bindings.type && type !== void 0) $$bindings.type(type);
	if ($$props.areaLabel === void 0 && $$bindings.areaLabel && areaLabel !== void 0) $$bindings.areaLabel(areaLabel);
	if ($$props.className === void 0 && $$bindings.className && className !== void 0) $$bindings.className(className);
	return `<button${add_attribute("class", className, 0)}${add_attribute("type", type, 0)}${add_attribute("aria-label", areaLabel, 0)}></button>`;
});

/* src/components/molecules/AppSlideButton.svelte generated by Svelte v3.20.1 */

const AppSlideButton = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	const worksButton = css`
    display: flex;
  `;

	return `<div${add_attribute("class", worksButton, 0)}>${validate_component(AppSlideButtonItem, "AppSlideButtonItem").$$render(
		$$result,
		{
			className: "worksButtonPrev",
			type: "button",
			areaLabel: "Previous"
		},
		{},
		{}
	)}
  ${validate_component(AppSlideButtonItem, "AppSlideButtonItem").$$render(
		$$result,
		{
			className: "worksButtonNext",
			type: "button",
			areaLabel: "Next"
		},
		{},
		{}
	)}</div>`;
});

/* src/components/molecules/AppSlideBody.svelte generated by Svelte v3.20.1 */

const AppSlideBody = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let { body = "" } = $$props;
	let { title = "" } = $$props;
	let { img = "" } = $$props;
	let { link = "" } = $$props;

	//style
	const itemBlock = css``;

	const itemText = css`
    order: 3;
  `;

	const itemImg = css`
    width: 100%;
    order: 1;
    heigth: auto;

    img{
      width: 100%;
      heigth: auto;
    }
  `;

	const itemBox = css`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    padding: 1.875em 1.875em 0.875em;
    box-shadow: 0px 8px 30px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    text-align: center;
    transition: all 0.4s ease-in-out;
    text-decoration: none;

    ${mq[1]} {
      &:hover{
        transform: translateY(-15px);
      }
    }
  `;

	const itemTitle = css`
    order: 2;
  `;

	if ($$props.body === void 0 && $$bindings.body && body !== void 0) $$bindings.body(body);
	if ($$props.title === void 0 && $$bindings.title && title !== void 0) $$bindings.title(title);
	if ($$props.img === void 0 && $$bindings.img && img !== void 0) $$bindings.img(img);
	if ($$props.link === void 0 && $$bindings.link && link !== void 0) $$bindings.link(link);

	return `<section${add_attribute("class", itemBlock, 0)}><a${add_attribute("class", itemBox, 0)}${add_attribute("href", link, 0)}><h3${add_attribute("class", (itemTitle), 0)}>${escape(title)}</h3>
    <figure${add_attribute("class", itemImg, 0)}><img${add_attribute("src", img, 0)}${add_attribute("alt", title, 0)}></figure>
    <div${add_attribute("class", itemText, 0)}>${escape(body)}</div></a></section>`;
});

/* src/components/organisms/AppSlideBlock.svelte generated by Svelte v3.20.1 */

const AppSlideBlock = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let { works = [] } = $$props;

	//style
	const slideBox = css`
    display: grid;
    grid-template-columns: 1fr;

    ${mq[1]} {
      grid-template-columns: 1fr 1fr 1fr;
      gap: 16px;
    }
  `;

	if ($$props.works === void 0 && $$bindings.works && works !== void 0) $$bindings.works(works);

	return `<div${add_attribute("class", slideBox, 0)}>${each(works, work => `${validate_component(AppSlideBody, "AppSlideBody").$$render($$result, Object.assign(work), {}, {})}`)}</div>

`;
});

/* src/components/organisms/AppSlide.svelte generated by Svelte v3.20.1 */

const AppSlide = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let { works = [] } = $$props;

	//style
	const slideBlock = css`
    ${mq[1]} {
    }
  `;

	if ($$props.works === void 0 && $$bindings.works && works !== void 0) $$bindings.works(works);

	return `<div${add_attribute("class", slideBlock, 0)}>${validate_component(AppSlideBlock, "AppSlideBlock").$$render($$result, { works }, {}, {})}
  ${validate_component(AppSlideButton, "AppSlideButton").$$render($$result, {}, {}, {})}</div>`;
});

/* src/components/atoms/AppInput.svelte generated by Svelte v3.20.1 */

const css$1 = {
	code: "input.svelte-1u1t0uw{border-radius:0;transition-duration:0.4s}",
	map: "{\"version\":3,\"file\":\"AppInput.svelte\",\"sources\":[\"AppInput.svelte\"],\"sourcesContent\":[\"<script>\\n  //common\\n  import { css, keyframes } from \\\"emotion\\\";\\n  import Color from \\\"../../../static/style/Color.js\\\";\\n  import { mq, rem, breakpoints } from \\\"../../../static/style/Base.js\\\";\\n  import { center, secP, sp96 } from \\\"../../../static/style/Variables.js\\\";\\n\\n  export let value = \\\"\\\";\\n  export let placeholder = \\\"\\\";\\n\\n  //style\\n\\n  const text = css`\\n    background: ${Color.Gray200};\\n    line-height: 2;\\n    ${rem(13)};\\n    width: 100%;\\n    max-width: 560px;\\n\\n    ${mq[1]}{\\n      ${rem(15)};\\n      height: 60px;\\n      padding-left: 17px;\\n    }\\n  `;\\n</script>\\n\\n<style>\\ninput, textarea {\\n  /* border: 1px solid #ccc; */\\n  border-radius: 0;\\n  transition-duration: 0.4s;\\n}\\n</style>\\n\\n<input type=\\\"text\\\" {value} {placeholder} class={text} />\\n\"],\"names\":[],\"mappings\":\"AA4BA,KAAK,eAAW,CAAC,AAEf,aAAa,CAAE,CAAC,CAChB,mBAAmB,CAAE,IAAI,AAC3B,CAAC\"}"
};

const AppInput = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let { value = "" } = $$props;
	let { placeholder = "" } = $$props;

	//style
	const text = css`
    background: ${Color.Gray200};
    line-height: 2;
    ${rem(13)};
    width: 100%;
    max-width: 560px;

    ${mq[1]}{
      ${rem(15)};
      height: 60px;
      padding-left: 17px;
    }
  `;

	if ($$props.value === void 0 && $$bindings.value && value !== void 0) $$bindings.value(value);
	if ($$props.placeholder === void 0 && $$bindings.placeholder && placeholder !== void 0) $$bindings.placeholder(placeholder);
	$$result.css.add(css$1);
	return `<input type="${"text"}"${add_attribute("value", value, 0)}${add_attribute("placeholder", placeholder, 0)} class="${escape(null_to_empty(text)) + " svelte-1u1t0uw"}">`;
});

/* src/components/organisms/AppForm.svelte generated by Svelte v3.20.1 */

const AppForm = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	const formBlock = css`
      margin-bottom: 24px;

		${mq[1]} {
			max-width: ${breakpoints[1]}px;
			margin-bottom: 40px;
		}
  `;

	return `<form name="${"contact"}" method="${"POST"}" netlify${add_attribute("class", formBlock, 0)}>
  ${validate_component(AppInput, "AppInput").$$render($$result, {}, {}, {})}</form>`;
});

/* src/routes/index.svelte generated by Svelte v3.20.1 */

const css$1$1 = {
	code: ".visionBlock.svelte-1iv9oiq.svelte-1iv9oiq{width:42%}.visionTitle.svelte-1iv9oiq.svelte-1iv9oiq{margin-bottom:1rem}.visionBody.svelte-1iv9oiq p.svelte-1iv9oiq{margin-bottom:1rem}",
	map: "{\"version\":3,\"file\":\"index.svelte\",\"sources\":[\"index.svelte\"],\"sourcesContent\":[\"<script>\\n  //common\\n  import { css, keyframes } from \\\"emotion\\\";\\n  import Color from \\\"../../static/style/Color.js\\\";\\n  import { mq, rem, breakpoints } from \\\"../../static/style/Base.js\\\";\\n  import { center, secP, sp96, leftP } from \\\"../../static/style/Variables.js\\\";\\n  import { display1, display2 } from \\\"../../static/style/Title.js\\\";\\n\\n  //compornents\\n  // import AppTitle from \\\"../components/atoms/itle.svelte\\\";\\n  import AppTwoColumnWide from \\\"../components/organisms/AppTwoColumnWide.svelte\\\";\\n  import AppSlide from \\\"../components/organisms/AppSlide.svelte\\\";\\n  import AppForm from \\\"../components/organisms/AppForm.svelte\\\";\\n  import AppCvButton from \\\"../components/atoms/AppCvButton.svelte\\\";\\n\\n  //variables\\n  let points = [\\n    {\\n      id: 1,\\n      img: \\\"../images/top/point_img01.jpg\\\",\\n      title: \\\"UI/UX\\\",\\n      despriction: \\\"UI/UX\\\",\\n      body:\\n        \\\"ワイヤー制作、UI設計、ユーザーインタビュー、LPO、デザインガイドライン作成など幅広く対応できます。受託制作でCMSデザインを経験し、インハウスでサービスUI、LPOでPDCAを回しながら、スタートアップならではDPCAも展開中です。UX勉強中。\\\"\\n    },\\n    {\\n      id: 2,\\n      img: \\\"../images/top/point_img02.jpg\\\",\\n      title: \\\"frontend\\\",\\n      despriction: \\\"frontend\\\",\\n      body:\\n        \\\"マークアップ、スタイルからCSSアニメーション、JSフレームワーク制作まで行います。セマンティックで秩序あるコーディングを行います。アクセシビリティやりたい勢です。\\\"\\n    },\\n    {\\n      id: 3,\\n      img: \\\"../images/top/point_img03.jpg\\\",\\n      title: \\\"marketing\\\",\\n      despriction: \\\"marketing\\\",\\n      body: \\\"GAなどの解析\\\"\\n    }\\n  ];\\n\\n  let works = [\\n    {\\n      id: Math.random(),\\n      link: \\\"\\\",\\n      img: \\\"../images/works/works_thum01.jpg\\\",\\n      title: \\\"hogehoge\\\",\\n      despriction: \\\"UI/UX\\\",\\n      body: \\\"ああああああああああああああああああ\\\"\\n    },\\n    {\\n      id: Math.random(),\\n      link: \\\"\\\",\\n      img: \\\"../images/works/works_thum02.jpg\\\",\\n      title: \\\"芝助\\\",\\n      despriction: \\\"芝助\\\",\\n      body: \\\"芝助芝助芝助芝助芝助芝助芝助芝助芝助芝助芝助芝助芝助芝助芝助芝助\\\"\\n    },\\n    {\\n      id: Math.random(),\\n      link: \\\"\\\",\\n      img: \\\"../images/works/works_thum03.jpg\\\",\\n      title: \\\"UI/UX\\\",\\n      despriction: \\\"UI/UX\\\",\\n      body:\\n        \\\"ワイヤー制作、UI設計、ユーザーインタビュー、LPO、\\\"\\n    }\\n  ];\\n  //style\\n\\n  //animation\\n  const scrollBar = keyframes`\\n    0% {\\n      transform: translate(0, 0);\\n      opacity: 0;\\n    }\\n    50% {\\n      opacity: 1;\\n    }\\n    100% {\\n      transform: translate(40px,0);\\n      opacity: 0;\\n  `;\\n\\n  //hero\\n  const hero = css`\\n    ${leftP};\\n    background: ${Color.Gray500};\\n    height: 90vh;\\n    position: relative;\\n  `;\\n\\n  const heroImg = css`\\n    width: 72vmin;\\n    height: 120vmin;\\n    border: 4px solid ${Color.White};\\n    margin: auto;\\n    ${center(\\\"xy\\\")};\\n\\n    ${mq[1]} {\\n      width: 40vmin;\\n      height: 68vmin;\\n    }\\n  `;\\n\\n  const heroBody = css`\\n    text-align: left;\\n    position: absolute;\\n    left: 1rem;\\n    bottom: 1rem;\\n    ${rem(10)};\\n    font-family: ${Color.FontFamilyEng100};\\n\\n    ${mq[1]} {\\n      left: -12vmin;\\n      bottom: -2rem;\\n    }\\n  `;\\n\\n  function scrollLine(bg = Color.Text100, left = \\\"3rem\\\") {\\n    return {\\n      content: \\\"''\\\",\\n      width: \\\"80px\\\",\\n      height: \\\"1px\\\",\\n      position: \\\"absolute\\\",\\n      top: \\\"14px\\\",\\n      left: left,\\n      background: bg\\n    };\\n  }\\n\\n  const scroll = css`\\n    transform: rotate(90deg);\\n    position: absolute;\\n    right: 8px;\\n    bottom 80px;\\n    ${rem(14)};\\n    font-family: ${Color.FontFamilyEng100};\\n    text-transform: capitalize;\\n    font-weight: bold;\\n\\n    &::after{\\n      ${scrollLine(Color.Text100, \\\"3rem\\\")};\\n      animation: ${scrollBar} 1.2s infinite;\\n    }\\n  `;\\n\\n  //vision\\n  const vision = css`\\n    ${sp96};\\n    padding: 4rem 0;\\n    position: relative;\\n    ${leftP};\\n\\n    ${mq[1]} {\\n      max-width: ${breakpoints[2]}px;\\n      padding: 120px 0;\\n      display: flex;\\n      justify-content: space-between;\\n      ${rem(14)};\\n    }\\n\\n    &::before {\\n      content: \\\"portfolio\\\";\\n      position: absolute;\\n      top: -8px;\\n      right: 0;\\n      text-transform: uppercase;\\n      font-weight: bold;\\n      color: ${Color.Gray200};\\n      z-index: -1;\\n      ${rem(40)};\\n      line-height: 1;\\n\\n      ${mq[1]} {\\n        ${rem(80)};\\n        top: -18px;\\n      }\\n    }\\n  `;\\n\\n  const visionCopy = css`\\n    line-height: 1;\\n    ${rem(60)};\\n    text-transform: uppercase;\\n    font-weight: bold;\\n    margin-bottom: 2rem;\\n\\n    ${mq[1]} {\\n      ${rem(140)};\\n    }\\n  `;\\n\\n  //point\\n  const point = css`\\n    position: relative;\\n    overflow: hidden;\\n  `;\\n\\n  const pointBlock = css`\\n    ${sp96};\\n    padding: 4rem 0;\\n    ${leftP};\\n\\n    ${mq[1]} {\\n      max-width: ${breakpoints[2]}px;\\n      padding: 120px 0;\\n      ${rem(14)};\\n    }\\n  `;\\n\\n  const pointBackground = css`\\n    position: absolute;\\n    top: 80px;\\n    left: 0;\\n    width: 50%;\\n    background-color: #f2f3f4;\\n    height: 100%;\\n    z-index: -10;\\n  `;\\n\\n  //works\\n  const work = css`\\n    width: 100%;\\n  `;\\n\\n  const workWrap = css`\\n    ${sp96};\\n    ${leftP};\\n    padding: 4rem 0;\\n\\n    ${mq[1]} {\\n      max-width: ${breakpoints[2]}px;\\n      padding: 120px 0;\\n      ${rem(14)};\\n    }\\n  `;\\n\\n  //contact\\n  const contact = css`\\n    width: 100%;\\n  `;\\n  const contactWrap = css`\\n    ${sp96};\\n    ${leftP};\\n    padding: 4rem 0;\\n\\n    ${mq[1]} {\\n      max-width: ${breakpoints[2]}px;\\n      padding: 120px 0;\\n      ${rem(14)};\\n    }\\n  `;\\n</script>\\n\\n<style>\\n  .visionBlock {\\n    width: 42%;\\n  }\\n\\n  .visionTitle {\\n    margin-bottom: 1rem;\\n  }\\n  .visionBody p {\\n    margin-bottom: 1rem;\\n  }\\n</style>\\n\\n<svelte:head>\\n  <title>Hello Noel | murakami naomi's portfolio site</title>\\n</svelte:head>\\n\\n<div class={hero}>\\n  <div class={heroImg}>\\n    <p class={heroBody}>\\n      Web/UI Design,\\n      <br />\\n      UX,\\n      <br />\\n      Frontend,\\n      <br />\\n      Illustration\\n    </p>\\n  </div>\\n  <div class={scroll}>scroll</div>\\n</div>\\n\\n<div class={vision}>\\n  <div class={visionCopy}>\\n    my\\n    <br />\\n    vision\\n  </div>\\n  <section class=\\\"visionBlock\\\">\\n    <h2 class=\\\"visionTitle #{display1}\\\">\\n      サービスと技術を繋ぐ\\n      <br />\\n      ヒトとモノを繋ぐ\\n    </h2>\\n    <div class=\\\"visionBody\\\">\\n      <p>aaaaaaaaaaaaaaaaaa</p>\\n      <p>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</p>\\n      <p>\\n        aaaaaaaaaaaaaaaaaaaaaaaab\\n        <br />\\n        aaaaaaaaaaaa\\n      </p>\\n    </div>\\n  </section>\\n</div>\\n\\n<div class={point}>\\n  <div class={pointBackground} />\\n  <section class={pointBlock}>\\n    <h2 class={display2}>skills</h2>\\n\\n    {#each points as point (point.id)}\\n      <AppTwoColumnWide {...point} />\\n    {/each}\\n  </section>\\n</div>\\n\\n<div class={work}>\\n  <section class={workWrap}>\\n    <h2 class={display2}>works</h2>\\n    <AppSlide {works} />\\n  </section>\\n</div>\\n\\n<div class={contact}>\\n  <section class={contactWrap}>\\n    <h2 class={display2}>contact</h2>\\n    <AppForm />\\n  </section>\\n</div>\\n\"],\"names\":[],\"mappings\":\"AAiQE,YAAY,8BAAC,CAAC,AACZ,KAAK,CAAE,GAAG,AACZ,CAAC,AAED,YAAY,8BAAC,CAAC,AACZ,aAAa,CAAE,IAAI,AACrB,CAAC,AACD,0BAAW,CAAC,CAAC,eAAC,CAAC,AACb,aAAa,CAAE,IAAI,AACrB,CAAC\"}"
};

function scrollLine(bg = Color.Text100, left = "3rem") {
	return {
		content: "''",
		width: "80px",
		height: "1px",
		position: "absolute",
		top: "14px",
		left,
		background: bg
	};
}

const Routes = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let points = [
		{
			id: 1,
			img: "../images/top/point_img01.jpg",
			title: "UI/UX",
			despriction: "UI/UX",
			body: "ワイヤー制作、UI設計、ユーザーインタビュー、LPO、デザインガイドライン作成など幅広く対応できます。受託制作でCMSデザインを経験し、インハウスでサービスUI、LPOでPDCAを回しながら、スタートアップならではDPCAも展開中です。UX勉強中。"
		},
		{
			id: 2,
			img: "../images/top/point_img02.jpg",
			title: "frontend",
			despriction: "frontend",
			body: "マークアップ、スタイルからCSSアニメーション、JSフレームワーク制作まで行います。セマンティックで秩序あるコーディングを行います。アクセシビリティやりたい勢です。"
		},
		{
			id: 3,
			img: "../images/top/point_img03.jpg",
			title: "marketing",
			despriction: "marketing",
			body: "GAなどの解析"
		}
	];

	let works = [
		{
			id: Math.random(),
			link: "",
			img: "../images/works/works_thum01.jpg",
			title: "hogehoge",
			despriction: "UI/UX",
			body: "ああああああああああああああああああ"
		},
		{
			id: Math.random(),
			link: "",
			img: "../images/works/works_thum02.jpg",
			title: "芝助",
			despriction: "芝助",
			body: "芝助芝助芝助芝助芝助芝助芝助芝助芝助芝助芝助芝助芝助芝助芝助芝助"
		},
		{
			id: Math.random(),
			link: "",
			img: "../images/works/works_thum03.jpg",
			title: "UI/UX",
			despriction: "UI/UX",
			body: "ワイヤー制作、UI設計、ユーザーインタビュー、LPO、"
		}
	];

	//style
	//animation
	const scrollBar = keyframes`
    0% {
      transform: translate(0, 0);
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      transform: translate(40px,0);
      opacity: 0;
  `;

	//hero
	const hero = css`
    ${leftP};
    background: ${Color.Gray500};
    height: 90vh;
    position: relative;
  `;

	const heroImg = css`
    width: 72vmin;
    height: 120vmin;
    border: 4px solid ${Color.White};
    margin: auto;
    ${center("xy")};

    ${mq[1]} {
      width: 40vmin;
      height: 68vmin;
    }
  `;

	const heroBody = css`
    text-align: left;
    position: absolute;
    left: 1rem;
    bottom: 1rem;
    ${rem(10)};
    font-family: ${Color.FontFamilyEng100};

    ${mq[1]} {
      left: -12vmin;
      bottom: -2rem;
    }
  `;

	const scroll = css`
    transform: rotate(90deg);
    position: absolute;
    right: 8px;
    bottom 80px;
    ${rem(14)};
    font-family: ${Color.FontFamilyEng100};
    text-transform: capitalize;
    font-weight: bold;

    &::after{
      ${scrollLine(Color.Text100, "3rem")};
      animation: ${scrollBar} 1.2s infinite;
    }
  `;

	//vision
	const vision = css`
    ${sp96};
    padding: 4rem 0;
    position: relative;
    ${leftP};

    ${mq[1]} {
      max-width: ${breakpoints[2]}px;
      padding: 120px 0;
      display: flex;
      justify-content: space-between;
      ${rem(14)};
    }

    &::before {
      content: "portfolio";
      position: absolute;
      top: -8px;
      right: 0;
      text-transform: uppercase;
      font-weight: bold;
      color: ${Color.Gray200};
      z-index: -1;
      ${rem(40)};
      line-height: 1;

      ${mq[1]} {
        ${rem(80)};
        top: -18px;
      }
    }
  `;

	const visionCopy = css`
    line-height: 1;
    ${rem(60)};
    text-transform: uppercase;
    font-weight: bold;
    margin-bottom: 2rem;

    ${mq[1]} {
      ${rem(140)};
    }
  `;

	//point
	const point = css`
    position: relative;
    overflow: hidden;
  `;

	const pointBlock = css`
    ${sp96};
    padding: 4rem 0;
    ${leftP};

    ${mq[1]} {
      max-width: ${breakpoints[2]}px;
      padding: 120px 0;
      ${rem(14)};
    }
  `;

	const pointBackground = css`
    position: absolute;
    top: 80px;
    left: 0;
    width: 50%;
    background-color: #f2f3f4;
    height: 100%;
    z-index: -10;
  `;

	//works
	const work = css`
    width: 100%;
  `;

	const workWrap = css`
    ${sp96};
    ${leftP};
    padding: 4rem 0;

    ${mq[1]} {
      max-width: ${breakpoints[2]}px;
      padding: 120px 0;
      ${rem(14)};
    }
  `;

	//contact
	const contact = css`
    width: 100%;
  `;

	const contactWrap = css`
    ${sp96};
    ${leftP};
    padding: 4rem 0;

    ${mq[1]} {
      max-width: ${breakpoints[2]}px;
      padding: 120px 0;
      ${rem(14)};
    }
  `;

	$$result.css.add(css$1$1);

	return `${($$result.head += `${($$result.title = `<title>Hello Noel | murakami naomi&#39;s portfolio site</title>`, "")}`, "")}

<div class="${escape(null_to_empty(hero)) + " svelte-1iv9oiq"}"><div class="${escape(null_to_empty(heroImg)) + " svelte-1iv9oiq"}"><p class="${escape(null_to_empty(heroBody)) + " svelte-1iv9oiq"}">Web/UI Design,
      <br>
      UX,
      <br>
      Frontend,
      <br>
      Illustration
    </p></div>
  <div class="${escape(null_to_empty(scroll)) + " svelte-1iv9oiq"}">scroll</div></div>

<div class="${escape(null_to_empty(vision)) + " svelte-1iv9oiq"}"><div class="${escape(null_to_empty(visionCopy)) + " svelte-1iv9oiq"}">my
    <br>
    vision
  </div>
  <section class="${"visionBlock svelte-1iv9oiq"}"><h2 class="${"visionTitle #" + escape(display1) + " svelte-1iv9oiq"}">サービスと技術を繋ぐ
      <br>
      ヒトとモノを繋ぐ
    </h2>
    <div class="${"visionBody svelte-1iv9oiq"}"><p class="${"svelte-1iv9oiq"}">aaaaaaaaaaaaaaaaaa</p>
      <p class="${"svelte-1iv9oiq"}">aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</p>
      <p class="${"svelte-1iv9oiq"}">aaaaaaaaaaaaaaaaaaaaaaaab
        <br>
        aaaaaaaaaaaa
      </p></div></section></div>

<div class="${escape(null_to_empty(point)) + " svelte-1iv9oiq"}"><div class="${escape(null_to_empty(pointBackground)) + " svelte-1iv9oiq"}"></div>
  <section class="${escape(null_to_empty(pointBlock)) + " svelte-1iv9oiq"}"><h2 class="${escape(null_to_empty(display2)) + " svelte-1iv9oiq"}">skills</h2>

    ${each(points, point => `${validate_component(AppTwoColumnWide, "AppTwoColumnWide").$$render($$result, Object.assign(point), {}, {})}`)}</section></div>

<div class="${escape(null_to_empty(work)) + " svelte-1iv9oiq"}"><section class="${escape(null_to_empty(workWrap)) + " svelte-1iv9oiq"}"><h2 class="${escape(null_to_empty(display2)) + " svelte-1iv9oiq"}">works</h2>
    ${validate_component(AppSlide, "AppSlide").$$render($$result, { works }, {}, {})}</section></div>

<div class="${escape(null_to_empty(contact)) + " svelte-1iv9oiq"}"><section class="${escape(null_to_empty(contactWrap)) + " svelte-1iv9oiq"}"><h2 class="${escape(null_to_empty(display2)) + " svelte-1iv9oiq"}">contact</h2>
    ${validate_component(AppForm, "AppForm").$$render($$result, {}, {}, {})}</section></div>`;
});

/* src/components/atoms/AppTag.svelte generated by Svelte v3.20.1 */

const AppTag = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let { label = "" } = $$props;

	//style
	const tagItem = css`
    ${rem(10)};
    display: inline-block;
    background: ${Color.Text100};
    color: ${Color.White};
    padding: 4px 12px;
    margin-right: 8px;
    margin-bottom: 8px;
    text-align: center;

    ${mq[1]} {
      ${rem(12)};
    }
  `;

	if ($$props.label === void 0 && $$bindings.label && label !== void 0) $$bindings.label(label);
	return `<li${add_attribute("class", tagItem, 0)}>${escape(label)}</li>`;
});

/* src/components/organisms/AppTagList.svelte generated by Svelte v3.20.1 */

const AppTagList = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let { tags = [] } = $$props;

	//style
	//tag
	const tagBlock = css`
    margin-top: 16px;

    ${mq[1]}{
      margin-top: 32px;
    }
  `;

	const tagList = css`
    display: flex;
    flex-wrap: wrap;
  `;

	if ($$props.tags === void 0 && $$bindings.tags && tags !== void 0) $$bindings.tags(tags);
	return `<div${add_attribute("class", tagBlock, 0)}><ul${add_attribute("class", tagList, 0)}>${each(tags, tag => `${validate_component(AppTag, "AppTag").$$render($$result, Object.assign(tag), {}, {})}`)}</ul></div>`;
});

/* src/components/organisms/AppTwoColumnProf.svelte generated by Svelte v3.20.1 */

const AppTwoColumnProf = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let { img = "" } = $$props;
	let { title = "" } = $$props;
	let { despriction = "" } = $$props;
	let { body = "" } = $$props;

	let tags = [
		{ id: 1, label: "Photoshop" },
		{ id: 2, label: "XD" },
		{ id: 3, label: "Figma" },
		{ id: 4, label: "Illustrator" },
		{ id: 5, label: "HTML/CSS" },
		{ id: 6, label: "Pug" },
		{ id: 7, label: "Sass" },
		{ id: 8, label: "Git" },
		{ id: 9, label: "Gulp" },
		{ id: 10, label: "jQuery" },
		{ id: 11, label: "WordPress" },
		{ id: 12, label: "React" },
		{ id: 13, label: "Vue(Nuxt)" },
		{ id: 14, label: "Svlete" },
		{ id: 15, label: "SpriteStudio" }
	];

	//style
	const pointBlock = css`
    margin-bottom: 40px;
		max-width: 980px;

    ${mq[1]} {
    }

    ${mq[2]} {
    }
    `;

	const pointItem = css`
    ${mq[1]} {
      display: flex;
      justify-content: flex-end;
      align-items: start;
      position: relative;
    }
  `;

	const pointBody = css`
    text-align: left;
    padding: 16px 24px;

    ${mq[1]} {
      padding: 48px 56px;
      width: 56%;
      position: relative;
      z-index: 2;
    }
  `;

	const pointText = css`
    > p {
      margin-bottom: 1rem;
    }
  `;

	const pointImage = css`

    ${mq[1]} {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      width: calc(64% - 16px);
      z-index: 1;
      background: ${Color.White};

      img{
        width: 100%;
        height: auto;
      }
    }
  `;

	if ($$props.img === void 0 && $$bindings.img && img !== void 0) $$bindings.img(img);
	if ($$props.title === void 0 && $$bindings.title && title !== void 0) $$bindings.title(title);
	if ($$props.despriction === void 0 && $$bindings.despriction && despriction !== void 0) $$bindings.despriction(despriction);
	if ($$props.body === void 0 && $$bindings.body && body !== void 0) $$bindings.body(body);

	return `<div${add_attribute("class", pointBlock, 0)}><div${add_attribute("class", pointItem, 0)}><section${add_attribute("class", pointBody, 0)}><h3${add_attribute("class", display1, 0)}>${escape(title)}</h3>
      <div${add_attribute("class", pointText, 0)}>${body}</div>
      ${validate_component(AppTagList, "AppTagList").$$render($$result, { tags }, {}, {})}</section>
    <div${add_attribute("class", pointImage, 0)}><img${add_attribute("src", img, 0)}${add_attribute("alt", despriction, 0)}></div></div></div>`;
});

/* src/routes/about.svelte generated by Svelte v3.20.1 */
let careerTitle = "2020年";

const About = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let points = [
		{
			id: 1,
			img: "../images/about/prof_img01.jpg",
			title: "村上 奈緒美",
			despriction: "村上 奈緒美 WEB/UIデザイナー",
			body: `<p>一般職、ゲームイラストレーターを経てWEB業界へきました。<br>
				受託制作会社でWEBデザイナー・コーダー・ディレクター兼任後、インハウスのUIデザイナーとして働いています。</p><p>普段はGAなどのデータ分析をもとに、WEBサービスのUI開発でLPOやABテストを行うことで、PDCAを回しています。</p><p>マークアップ（CSS,アニメーション）が得意で、趣味はフロンエンドの個人開発です。Vue(Nuxt),Reactチョットデキル。</p>`
		}
	];

	let careers = [
		{
			id: 1,
			title: careerTitle,
			time: "2020/01/19",
			body: "ヤフー名古屋 TechMeetup デザインを語ろう"
		},
		{
			id: 2,
			title: careerTitle,
			time: "2020/02/15",
			body: "バナーワークショップ 現役デザイナーに学ぶ　魅力的なバナーの作り方"
		},
		{
			id: 3,
			title: careerTitle,
			time: "2020/06/01",
			body: "なごやデザイナーLT大会"
		}
	];

	const about = css`
		background: ${Color.Gray200};
    ${rem(13)};
	`;

	const aboutBlock = css`
		${leftP};
		${sp96};
    padding: 4rem 0;

		${mq[1]} {
			padding-top: 80px;
      max-width: ${breakpoints[2]}px;
		}
	`;

	const aboutHero = css`
		margin-bottom: 24px;

		${mq[1]} {
			max-width: ${breakpoints[1]}px;
			margin-bottom: 40px;
		}
	`;

	const aboutBox = css`
		background: ${Color.White};
		padding: 16px 24px;

		${mq[1]} {
			max-width: ${breakpoints[1]}px;
			padding: 48px 56px;
			${rem(14)};
		}
	`;

	const aboutBoxSub = css`
		padding: 16px 0 0;

		${mq[1]} {
			max-width: ${breakpoints[2]}px;
			padding: 48px 0 0;
			${rem(14)};
		}
	`;

	//point
	const point = css`
    position: relative;
    overflow: hidden;
  `;

	const pointBlock = css`
    padding: 4rem 0;

    ${mq[1]} {
      padding: 40px 0;
      ${rem(14)};
    }
  `;

	const pointBackground = css`
    position: absolute;
    top: 80px;
    left: 0;
    height: 100%;
		z-index: -10;
	`;

	const aboutCareer = css`
    margin-bottom: 24px;

		${mq[1]} {
			max-width: ${breakpoints[1]}px;
			margin-bottom: 40px;
		}
	`;

	const aboutCareerBlock = css`
		margin-top: 24px;
	`;

	const aboutCareerList = css`
		margin-top: 8px;

		${mq[1]}{
			display: flex;
		}

		dd {
     margin-right: 2rem;
		}
	`;

	return `${($$result.head += `${($$result.title = `<title>About | murakami naomi&#39;s portfolio site</title>`, "")}`, "")}

<div${add_attribute("class", about, 0)}><div${add_attribute("class", aboutBlock, 0)}><section${add_attribute("class", aboutHero, 0)}><h1${add_attribute("class", display2, 0)}>about</h1>

			<section${add_attribute("class", aboutBox, 0)}><h2${add_attribute("class", display1, 0)}>portfolio widh Svelte</h2>
				<p>こちらは村上奈緒美のポートフォリオです。</p>
				<p>最近の活動記録など載せています。</p></section></section>

		<div${add_attribute("class", aboutBoxSub, 0)}><section${add_attribute("class", point, 0)}><h2${add_attribute("class", display2, 0)}>profile</h2>
				${each(points, point => `${validate_component(AppTwoColumnProf, "AppTwoColumnProf").$$render($$result, Object.assign(point), {}, {})}`)}</section></div>

		<section${add_attribute("class", aboutCareer, 0)}><h2${add_attribute("class", mainHeading, 0)}>登壇履歴</h2>
			<section${add_attribute("class", aboutCareerBlock, 0)}>${each(careers, career => `<dl${add_attribute("class", aboutCareerList, 0)}><dd>${escape(career.time)}</dd><dt>${escape(career.body)}</dt></dl>`)}</section></section></div></div>`;
});

const contentful = require('contentful');

//contentfulの設定値
const client = contentful.createClient({
  space: process.env.CTF_SPACE_ID,
  accessToken: process.env.CTF_CDA_ACCESS_TOKEN
});


//記事一覧取得と記事取得

// slug指定で記事取得。これid指定の方が綺麗だからできるなら後で直す。
const fetchEntryByContentIdAndSlug = (id, slug) => client.getEntries({
    content_type: id,
    'fields.slug[in]': slug
  })
  .then((response) => response.items[0])
  .catch((error) => {
    console.error(error);
  });

// 記事一覧取得
const fetchEntriesForContentId = (id, orderBy) => client.getEntries({
    content_type: id,
    order: orderBy
  })
  .then((response) => {
    return response.items
  })
  .catch((error) => {
    console.error(error);
  });

  const getArticles = () => fetchEntriesForContentId('article');
  const getArticle = (slug) => fetchEntryByContentIdAndSlug('article', slug);

/* src/routes/blog/index.svelte generated by Svelte v3.20.1 */

const css$1$2 = {
	code: "ul.svelte-1frg2tf{margin:0 0 1em 0;line-height:1.5}",
	map: "{\"version\":3,\"file\":\"index.svelte\",\"sources\":[\"index.svelte\"],\"sourcesContent\":[\"<script context=\\\"module\\\">\\n  //common\\n  import { css, keyframes } from \\\"emotion\\\";\\n  import Color from \\\"../../../static/style/Color.js\\\";\\n  import { mq, rem, breakpoints } from \\\"../../../static/style/Base.js\\\";\\n  import { center, secP, sp96, leftP } from \\\"../../../static/style/Variables.js\\\";\\n  import { display1, display2 } from \\\"../../../static/style/Title.js\\\";\\n\\n  //compornents\\n  // import AppTitle from \\\"../components/atoms/itle.svelte\\\";\\n  import AppTwoColumnWide from \\\"../../components/organisms/AppTwoColumnWide.svelte\\\";\\n  import AppSlide from \\\"../../components/organisms/AppSlide.svelte\\\";\\n  import AppForm from \\\"../../components/organisms/AppForm.svelte\\\";\\n\\timport AppCvButton from \\\"../../components/atoms/AppCvButton.svelte\\\";\\n\\n\\t//function\\n\\timport { getArticles } from '../../api/cms.js'\\n\\n\\texport function preload({ params, query }) {\\n\\t\\t\\treturn getArticles()\\n\\t\\t\\t\\t\\t\\t\\t.then(posts => {\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\treturn { posts };\\n\\t\\t\\t\\t\\t\\t\\t});\\n\\t}\\n\\n</script>\\n\\n<script>\\n\\texport let posts;\\n\\n\\t//animation\\n\\n\\tconst aboutBlock = css `\\n\\t\\t${leftP};\\n\\t\\t${sp96};\\n    padding: 4rem 0;\\n\\n\\t\\t${mq[1]} {\\n\\t\\t\\tpadding-top: 80px;\\n      max-width: ${breakpoints[2]}px;\\n\\t\\t}\\n\\t`;\\n</script>\\n\\n<style>\\n\\tul {\\n\\t\\tmargin: 0 0 1em 0;\\n\\t\\tline-height: 1.5;\\n\\t}\\n</style>\\n\\n<svelte:head>\\n\\t<title>blog | murakami naomi's portfolio site</title>\\n</svelte:head>\\n\\n<h1>blog</h1>\\n\\n<ul>\\n\\t{#each posts as post}\\n\\t\\t<li><a rel='prefetch' href='{post.fields.slug}'>{post.fields.title}</a></li>\\n\\t{/each}\\n</ul>\\n\"],\"names\":[],\"mappings\":\"AA6CC,EAAE,eAAC,CAAC,AACH,MAAM,CAAE,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC,CACjB,WAAW,CAAE,GAAG,AACjB,CAAC\"}"
};

function preload({ params, query }) {
	return getArticles().then(posts => {
		return { posts };
	});
}

const Blog = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let { posts } = $$props;

	//animation
	const aboutBlock = css`
		${leftP};
		${sp96};
    padding: 4rem 0;

		${mq[1]} {
			padding-top: 80px;
      max-width: ${breakpoints[2]}px;
		}
	`;

	if ($$props.posts === void 0 && $$bindings.posts && posts !== void 0) $$bindings.posts(posts);
	$$result.css.add(css$1$2);

	return `${($$result.head += `${($$result.title = `<title>blog | murakami naomi&#39;s portfolio site</title>`, "")}`, "")}

<h1>blog</h1>

<ul class="${"svelte-1frg2tf"}">${each(posts, post => `<li><a rel="${"prefetch"}"${add_attribute("href", post.fields.slug, 0)}>${escape(post.fields.title)}</a></li>`)}</ul>`;
});

/* src/routes/blog/[slug].svelte generated by Svelte v3.20.1 */

const css$2 = {
	code: ".content.svelte-gnxal1 h2{font-size:1.4em;font-weight:500}.content.svelte-gnxal1 pre{background-color:#f9f9f9;box-shadow:inset 1px 1px 5px rgba(0,0,0,0.05);padding:0.5em;border-radius:2px;overflow-x:auto}.content.svelte-gnxal1 pre code{background-color:transparent;padding:0}.content.svelte-gnxal1 ul{line-height:1.5}.content.svelte-gnxal1 li{margin:0 0 0.5em 0}",
	map: "{\"version\":3,\"file\":\"[slug].svelte\",\"sources\":[\"[slug].svelte\"],\"sourcesContent\":[\"<script context=\\\"module\\\">\\n\\timport { documentToHtmlString } from '@contentful/rich-text-html-renderer';\\n\\timport { getArticle } from '../../api/cms.js'\\n\\n\\texport function preload({ params, query }) {\\n\\t\\t\\treturn getArticle(params.slug)\\n\\t\\t\\t\\t\\t.then(post => {\\n\\t\\t\\t\\t\\t\\t\\tlet html = documentToHtmlString(post.fields.body)\\n\\t\\t\\t\\t\\t\\t\\tpost.html = html\\n\\t\\t\\t\\t\\t\\t\\tconsole.log(post)\\n\\t\\t\\t\\t\\t\\t\\treturn { post };\\n\\t\\t\\t\\t\\t});\\n\\t}\\n</script>\\n\\n<script>\\n\\texport let post;\\n</script>\\n\\n<style>\\n\\t/*\\n\\t\\tBy default, CSS is locally scoped to the component,\\n\\t\\tand any unused styles are dead-code-eliminated.\\n\\t\\tIn this page, Svelte can't know which elements are\\n\\t\\tgoing to appear inside the {{{post.html}}} block,\\n\\t\\tso we have to use the :global(...) modifier to target\\n\\t\\tall elements inside .content\\n\\t*/\\n\\t.content :global(h2) {\\n\\t\\tfont-size: 1.4em;\\n\\t\\tfont-weight: 500;\\n\\t}\\n\\n\\t.content :global(pre) {\\n\\t\\tbackground-color: #f9f9f9;\\n\\t\\tbox-shadow: inset 1px 1px 5px rgba(0,0,0,0.05);\\n\\t\\tpadding: 0.5em;\\n\\t\\tborder-radius: 2px;\\n\\t\\toverflow-x: auto;\\n\\t}\\n\\n\\t.content :global(pre) :global(code) {\\n\\t\\tbackground-color: transparent;\\n\\t\\tpadding: 0;\\n\\t}\\n\\n\\t.content :global(ul) {\\n\\t\\tline-height: 1.5;\\n\\t}\\n\\n\\t.content :global(li) {\\n\\t\\tmargin: 0 0 0.5em 0;\\n\\t}\\n</style>\\n\\n<svelte:head>\\n\\t<title>{post.fields.title} | murakami naomi's portfolio site</title>\\n</svelte:head>\\n\\n<h1>{post.fields.title}</h1>\\n\\n<div class='content'>\\n\\t{@html post.html}\\n</div>\\n\"],\"names\":[],\"mappings\":\"AA4BC,sBAAQ,CAAC,AAAQ,EAAE,AAAE,CAAC,AACrB,SAAS,CAAE,KAAK,CAChB,WAAW,CAAE,GAAG,AACjB,CAAC,AAED,sBAAQ,CAAC,AAAQ,GAAG,AAAE,CAAC,AACtB,gBAAgB,CAAE,OAAO,CACzB,UAAU,CAAE,KAAK,CAAC,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,CAC9C,OAAO,CAAE,KAAK,CACd,aAAa,CAAE,GAAG,CAClB,UAAU,CAAE,IAAI,AACjB,CAAC,AAED,sBAAQ,CAAC,AAAQ,GAAG,AAAC,CAAC,AAAQ,IAAI,AAAE,CAAC,AACpC,gBAAgB,CAAE,WAAW,CAC7B,OAAO,CAAE,CAAC,AACX,CAAC,AAED,sBAAQ,CAAC,AAAQ,EAAE,AAAE,CAAC,AACrB,WAAW,CAAE,GAAG,AACjB,CAAC,AAED,sBAAQ,CAAC,AAAQ,EAAE,AAAE,CAAC,AACrB,MAAM,CAAE,CAAC,CAAC,CAAC,CAAC,KAAK,CAAC,CAAC,AACpB,CAAC\"}"
};

function preload$1({ params, query }) {
	return getArticle(params.slug).then(post => {
		let html = richTextHtmlRenderer.documentToHtmlString(post.fields.body);
		post.html = html;
		console.log(post);
		return { post };
	});
}

const U5Bslugu5D = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let { post } = $$props;
	if ($$props.post === void 0 && $$bindings.post && post !== void 0) $$bindings.post(post);
	$$result.css.add(css$2);

	return `${($$result.head += `${($$result.title = `<title>${escape(post.fields.title)} | murakami naomi&#39;s portfolio site</title>`, "")}`, "")}

<h1>${escape(post.fields.title)}</h1>

<div class="${"content svelte-gnxal1"}">${post.html}</div>`;
});

/* src/routes/work/index.svelte generated by Svelte v3.20.1 */

function preload$2({ params, query }) {
	return this.fetch(`work.json`).then(r => r.json()).then(posts => {
		return { posts };
	});
}

const Work = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let { posts } = $$props;

	//animation
	const work = css`
		background: ${Color.Gray200};
    ${rem(13)};
	`;

	const workBlock = css`
		${leftP};
		${sp96};
    padding: 4rem 0;

		${mq[1]} {
			padding-top: 80px;
      max-width: calc(${breakpoints[1]}px - 240px) ;
		}

		${mq[1]} {
      max-width: ${breakpoints[2]}px;
		}
	`;

	const workBox = css`

		${mq[1]} {
		}
	`;

	const workContainer = css`
		list-style: none;
		display: grid;
		grid-gap: 8px;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: auto;

		${mq[1]} {
			${rem(14)};
			grid-gap: 16px;
			grid-auto-rows: 240px;
    	grid-template-columns: repeat(auto-fill, 240px);
		}

		${mq[2]} {
			max-width: ${breakpoints[2]}px;
			grid-template-columns: 1fr 1fr 1fr;
			grid-template-rows: auto;
		}
	`;

	const item = css`
		font-size: ${rem[14]};
		background: ${Color.White};
	`;

	const largeT = css`
		grid-column: 1/3;
		grid-row: auto;
	`;

	const large1 = css`
		${largeT};
		${mq[1]} {
			grid-column: 1 / 3;
			grid-row: 1 / 3;
		}
	`;

	const large2 = css`
		${largeT};
		${mq[1]} {
			grid-column: 3 / 5;
		}
	`;

	const large3 = css`
		${largeT};
		${mq[1]} {
			grid-column: 4 / 5;
			grid-row: 3 / 5;
		}
	`;

	const large4 = css`
		${largeT};
		${mq[1]} {
			grid-column: 2 / 4;
		}
	`;

	//////////////////
	const itemText = css`
    order: 3;
  `;

	const itemImg = css`
    width: 100%;
    order: 1;
    heigth: auto;

    img{
      width: 100%;
      heigth: auto;
    }
  `;

	const itemBox = css`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    padding: 1em 1em 0.5em;
    box-shadow: 0px 8px 30px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    text-align: center;
    transition: all 0.1s ease-in-out;
    text-decoration: none;

    ${mq[1]} {
    	padding: 1.875em 1.875em 0.875em;

      &:hover{
        opacity: 0.7;
      }
    }
  `;

	const itemTitle = css`
		order: 2;
		${rem(13)};

		${mq[1]} {
			${rem(16)};
    }
  `;

	if ($$props.posts === void 0 && $$bindings.posts && posts !== void 0) $$bindings.posts(posts);
	if ($$props.largeT === void 0 && $$bindings.largeT && largeT !== void 0) $$bindings.largeT(largeT);

	return `${($$result.head += `${($$result.title = `<title>Work | murakami naomi&#39;s portfolio site</title>`, "")}`, "")}

<div${add_attribute("class", work, 0)}><div${add_attribute("class", workBlock, 0)}><h1${add_attribute("class", display2, 0)}>work</h1>

			<div${add_attribute("class", workBox, 0)}><ul${add_attribute("class", workContainer, 0)}>${posts.length
	? each(posts, post => `
						<li${add_attribute("class", item, 0)}><a${add_attribute("class", itemBox, 0)} href="${"work/" + escape(post.slug)}" rel="${"prefetch"}"><h3${add_attribute("class", (itemTitle), 0)}>${escape(post.title)}</h3>
								<figure${add_attribute("class", itemImg, 0)}><img${add_attribute("src", post.thum, 0)}${add_attribute("alt", post.title, 0)}></figure>
								<div${add_attribute("class", itemText, 0)}>${escape(post.despriction)}</div></a>

						</li>`)
	: `<li>loading...</li>`}</ul></div></div></div>`;
});

/* src/routes/work/[slug].svelte generated by Svelte v3.20.1 */

const css$1$3 = {
	code: ".content.svelte-gnxal1 h2{font-size:1.4em;font-weight:500}.content.svelte-gnxal1 pre{background-color:#f9f9f9;box-shadow:inset 1px 1px 5px rgba(0,0,0,0.05);padding:0.5em;border-radius:2px;overflow-x:auto}.content.svelte-gnxal1 pre code{background-color:transparent;padding:0}.content.svelte-gnxal1 ul{line-height:1.5}.content.svelte-gnxal1 li{margin:0 0 0.5em 0}",
	map: "{\"version\":3,\"file\":\"[slug].svelte\",\"sources\":[\"[slug].svelte\"],\"sourcesContent\":[\"<script context=\\\"module\\\">\\n  //common\\n  import { css, keyframes } from \\\"emotion\\\";\\n  import Color from \\\"../../../static/style/Color.js\\\";\\n  import { mq, rem, breakpoints } from \\\"../../../static/style/Base.js\\\";\\n  import { center, secP, sp96, leftP } from \\\"../../../static/style/Variables.js\\\";\\n  import { display1, display2,mainHeading } from \\\"../../../static/style/Title.js\\\";\\n\\n  //compornents\\n  import AppTwoColumnWide from \\\"../../components/organisms/AppTwoColumnWide.svelte\\\";\\n\\timport AppSlide from \\\"../../components/organisms/AppSlide.svelte\\\";\\n\\n\\texport async function preload({ params, query }) {\\n\\t\\t// the `slug` parameter is available because\\n\\t\\t// this file is called [slug].svelte\\n\\t\\tconst res = await this.fetch(`work/${params.slug}.json`);\\n\\t\\tconst data = await res.json();\\n\\n\\t\\tif (res.status === 200) {\\n\\t\\t\\treturn { post: data };\\n\\t\\t} else {\\n\\t\\t\\tthis.error(res.status, data.message);\\n\\t\\t}\\n\\t}\\n</script>\\n\\n<script>\\n\\texport let post;\\n\\n\\n\\tconst work = css `\\n\\t\\tbackground: ${Color.Gray200};\\n    ${rem(13)};\\n\\t`;\\n\\n\\tconst workBlock = css `\\n\\t\\t${leftP};\\n\\t\\t${sp96};\\n    padding: 4rem 0;\\n\\n\\t\\t${mq[1]} {\\n\\t\\t\\tpadding-top: 80px;\\n      max-width: calc(${breakpoints[1]}px - 240px) ;\\n\\t\\t}\\n\\n\\t\\t${mq[1]} {\\n      max-width: ${breakpoints[2]}px;\\n\\t\\t}\\n\\t`;\\n\\n\\tconst workBox = css `\\n\\n\\t\\t${mq[1]} {\\n\\t\\t}\\n\\t`;\\n\\n</script>\\n\\n<style>\\n\\t/*\\n\\t\\tBy default, CSS is locally scoped to the component,\\n\\t\\tand any unused styles are dead-code-eliminated.\\n\\t\\tIn this page, Svelte can't know which elements are\\n\\t\\tgoing to appear inside the {{{post.html}}} block,\\n\\t\\tso we have to use the :global(...) modifier to target\\n\\t\\tall elements inside .content\\n\\t*/\\n\\t.content :global(h2) {\\n\\t\\tfont-size: 1.4em;\\n\\t\\tfont-weight: 500;\\n\\t}\\n\\n\\t.content :global(pre) {\\n\\t\\tbackground-color: #f9f9f9;\\n\\t\\tbox-shadow: inset 1px 1px 5px rgba(0,0,0,0.05);\\n\\t\\tpadding: 0.5em;\\n\\t\\tborder-radius: 2px;\\n\\t\\toverflow-x: auto;\\n\\t}\\n\\n\\t.content :global(pre) :global(code) {\\n\\t\\tbackground-color: transparent;\\n\\t\\tpadding: 0;\\n\\t}\\n\\n\\t.content :global(ul) {\\n\\t\\tline-height: 1.5;\\n\\t}\\n\\n\\t.content :global(li) {\\n\\t\\tmargin: 0 0 0.5em 0;\\n\\t}\\n</style>\\n\\n<svelte:head>\\n\\t<title>{post.title} | murakami naomi's portfolio site</title>\\n</svelte:head>\\n<div class={work}>\\n\\t<div class={workBlock}>\\n\\t\\t<h1>{post.title}</h1>\\n\\n\\t\\t<div class='content'>\\n\\t\\t\\t{@html post.html}\\n\\t\\t</div>\\n\\t</div>\\n</div>\\n\"],\"names\":[],\"mappings\":\"AAmEC,sBAAQ,CAAC,AAAQ,EAAE,AAAE,CAAC,AACrB,SAAS,CAAE,KAAK,CAChB,WAAW,CAAE,GAAG,AACjB,CAAC,AAED,sBAAQ,CAAC,AAAQ,GAAG,AAAE,CAAC,AACtB,gBAAgB,CAAE,OAAO,CACzB,UAAU,CAAE,KAAK,CAAC,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,CAC9C,OAAO,CAAE,KAAK,CACd,aAAa,CAAE,GAAG,CAClB,UAAU,CAAE,IAAI,AACjB,CAAC,AAED,sBAAQ,CAAC,AAAQ,GAAG,AAAC,CAAC,AAAQ,IAAI,AAAE,CAAC,AACpC,gBAAgB,CAAE,WAAW,CAC7B,OAAO,CAAE,CAAC,AACX,CAAC,AAED,sBAAQ,CAAC,AAAQ,EAAE,AAAE,CAAC,AACrB,WAAW,CAAE,GAAG,AACjB,CAAC,AAED,sBAAQ,CAAC,AAAQ,EAAE,AAAE,CAAC,AACrB,MAAM,CAAE,CAAC,CAAC,CAAC,CAAC,KAAK,CAAC,CAAC,AACpB,CAAC\"}"
};

async function preload$3({ params, query }) {
	// the `slug` parameter is available because
	// this file is called [slug].svelte
	const res = await this.fetch(`work/${params.slug}.json`);

	const data = await res.json();

	if (res.status === 200) {
		return { post: data };
	} else {
		this.error(res.status, data.message);
	}
}

const U5Bslugu5D$1 = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let { post } = $$props;

	const work = css`
		background: ${Color.Gray200};
    ${rem(13)};
	`;

	const workBlock = css`
		${leftP};
		${sp96};
    padding: 4rem 0;

		${mq[1]} {
			padding-top: 80px;
      max-width: calc(${breakpoints[1]}px - 240px) ;
		}

		${mq[1]} {
      max-width: ${breakpoints[2]}px;
		}
	`;

	const workBox = css`

		${mq[1]} {
		}
	`;

	if ($$props.post === void 0 && $$bindings.post && post !== void 0) $$bindings.post(post);
	$$result.css.add(css$1$3);

	return `${($$result.head += `${($$result.title = `<title>${escape(post.title)} | murakami naomi&#39;s portfolio site</title>`, "")}`, "")}
<div class="${escape(null_to_empty(work)) + " svelte-gnxal1"}"><div class="${escape(null_to_empty(workBlock)) + " svelte-gnxal1"}"><h1>${escape(post.title)}</h1>

		<div class="${"content svelte-gnxal1"}">${post.html}</div></div></div>`;
});

/* src/components/molecules/AppNavItem.svelte generated by Svelte v3.20.1 */

const AppNavItem = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let { segment } = $$props;
	let { type = "none" } = $$props;

	let attr = {
		none: { caption: "", segment: "undefined" },
		home: {
			caption: "home",
			link: "/",
			segment: "undefined"
		},
		about: {
			caption: "about",
			link: "about",
			segment: "about"
		},
		work: {
			caption: "work",
			link: "work",
			segment: "work"
		},
		blog: {
			caption: "blog",
			link: "blog",
			segment: "blog"
		},
		contact: {
			caption: "contact",
			link: "contact",
			segment: "contact"
		}
	};

	//style
	const current = css`
    content: ;
    text-transform: uppercase;
    font-family: ${Color.FontFamilyEng100};
    [aria-current] {
      background: ${Color.White};
      font-weight: 600;
    }
  `;

	const link = css`
    text-decoration: none;
    font-weight: bold;

    &:hover {
      background: rgba(255, 255, 255, 0.8);
    }
  `;

	if ($$props.segment === void 0 && $$bindings.segment && segment !== void 0) $$bindings.segment(segment);
	if ($$props.type === void 0 && $$bindings.type && type !== void 0) $$bindings.type(type);

	return `<li${add_attribute("class", current, 0)}><a${add_attribute("class", link, 0)}${add_attribute(
		"aria-current",
		segment === attr[type].segment
		? attr[type].caption
		: undefined,
		0
	)}${add_attribute("href", attr[type].link, 0)}>${escape(attr[type].caption)}</a></li>`;
});

/* src/components/atoms/AppDrowerWrap.svelte generated by Svelte v3.20.1 */

function drawerBase(height = "1px", width = "56%") {
	return {
		height,
		background: `${Color.Text100}`,
		transition: "all 0.25s ease-out",
		position: "absolute",
		left: "50%",
		top: "50%",
		transform: "translate(-50%,-50%)",
		width
	};
}

const AppDrowerWrap = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let { segment } = $$props;

	const list = css`
    list-style-type: none;
  `;

	const drawer = css`
    cursor: pointer;
    display: inline-block;
    height: 48px;
    width: 48px;
    position: relative;
  `;

	const drawerBorder = css`
    ${drawerBase()}

    &::before,
    &::after {
      content: "";
      ${drawerBase("100%", "100%")}
    }

    &::before {
      margin-top: -32%;
    }

    &::after {
      margin-top: 32%;
    }
  `;

	if ($$props.segment === void 0 && $$bindings.segment && segment !== void 0) $$bindings.segment(segment);

	return `<button${add_attribute("class", drawer, 0)} for="${"header-switch"}"><span${add_attribute("class", drawerBorder, 0)}></span></button>

${ ``}`;
});

/* src/components/organisms/AppNav.svelte generated by Svelte v3.20.1 */

function drawerBase$1(height = "1px", width = "56%") {
	return {
		height,
		background: `${Color.Text100}`,
		transition: "all 0.25s ease-out",
		position: "absolute",
		left: "50%",
		top: "50%",
		transform: "translate(-50%,-50%)",
		width
	};
}

const AppNav = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let { segment } = $$props;

	//style
	const sp = css`
    ${mq[1]} {
      display: none;
    }
  `;

	const pc = css`
    display: none;

    ${mq[1]} {
      display: block;
    }
  `;

	const nav = css`
    text-transform: uppercase;
  `;

	const list = css`
    list-style-type: none;
  `;

	const drawer = css`
    cursor: pointer;
    display: inline-block;
    height: 48px;
    width: 48px;
    position: relative;
  `;

	const drawerBorder = css`
    ${drawerBase$1()}

    &::before,
    &::after {
      content: "";
      ${drawerBase$1("100%", "100%")}
    }

    &::before {
      margin-top: -32%;
    }

    &::after {
      margin-top: 32%;
    }
  `;

	if ($$props.segment === void 0 && $$bindings.segment && segment !== void 0) $$bindings.segment(segment);

	return `<nav${add_attribute("class", nav, 0)}><div${add_attribute("class", sp, 0)}>${validate_component(AppDrowerWrap, "AppDrowerWrap").$$render($$result, {}, {}, {})}</div>

  <div${add_attribute("class", pc, 0)}><ul${add_attribute("class", list, 0)}>${validate_component(AppNavItem, "AppNavItem").$$render($$result, { segment, type: "home", value: "" }, {}, {})}
      ${validate_component(AppNavItem, "AppNavItem").$$render($$result, { segment, type: "about", value: "" }, {}, {})}
      ${validate_component(AppNavItem, "AppNavItem").$$render($$result, { segment, type: "work", value: "" }, {}, {})}
      ${validate_component(AppNavItem, "AppNavItem").$$render($$result, { segment, type: "blog", value: "" }, {}, {})}
      ${validate_component(AppNavItem, "AppNavItem").$$render($$result, { segment, type: "contact", value: "" }, {}, {})}</ul></div></nav>`;
});

/* static/images/common/logo.svg generated by Svelte v3.20.1 */

const logo = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let { width } = $$props;
	let { height } = $$props;
	let { viewBox } = $$props;
	let { fill } = $$props;
	let { stroke } = $$props;
	let { strokeWidth } = $$props;
	let { content } = $$props;
	if ($$props.width === void 0 && $$bindings.width && width !== void 0) $$bindings.width(width);
	if ($$props.height === void 0 && $$bindings.height && height !== void 0) $$bindings.height(height);
	if ($$props.viewBox === void 0 && $$bindings.viewBox && viewBox !== void 0) $$bindings.viewBox(viewBox);
	if ($$props.fill === void 0 && $$bindings.fill && fill !== void 0) $$bindings.fill(fill);
	if ($$props.stroke === void 0 && $$bindings.stroke && stroke !== void 0) $$bindings.stroke(stroke);
	if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0) $$bindings.strokeWidth(strokeWidth);
	if ($$props.content === void 0 && $$bindings.content && content !== void 0) $$bindings.content(content);
	return `<svg xmlns="${"http://www.w3.org/2000/svg"}" xmlns:xlink="${"http://www.w3.org/1999/xlink"}"${add_attribute("width", width, 0)}${add_attribute("height", height, 0)}${add_attribute("viewBox", viewBox, 0)}${add_attribute("fill", fill, 0)}${add_attribute("stroke", stroke, 0)}${add_attribute("strokeWidth", strokeWidth, 0)}>${"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 297.32 109.85\"><defs><style>.cls-1{fill:#251e1c;}</style></defs><g id=\"レイヤー_2\" data-name=\"レイヤー 2\"><g id=\"レイヤー_1-2\" data-name=\"レイヤー 1\"><path class=\"cls-1\" d=\"M72.94,45.12c.67.77.67,1.75,0,3a3.46,3.46,0,0,1-2.74,2c-2.26.09-4.56.24-6.91.43l-10,.86q-2,5.26-2.16,5.55-1.44,3.89-4,11.19c-1.73,4.88-2.79,7.86-3.17,9q-7.77,21.6-8.35,23.11-.36,1.08-2,7.34A3.12,3.12,0,0,1,32,109.85a6.79,6.79,0,0,1-2.88-2.31,5.21,5.21,0,0,1-.22-3.45,47.29,47.29,0,0,1,2-7.35Q32.33,92.57,38,77.09q2.94-8,5.47-14.76c.24-.72.68-1.9,1.33-3.53s1.12-2.88,1.4-3.74c.05-.1.27-1,.65-2.67a153.78,153.78,0,0,0-28.29,6.12c-1.73,4.71-2.64,7.2-2.74,7.49A121.93,121.93,0,0,0,12,80,12,12,0,0,0,12,84.65a3.27,3.27,0,0,1,.26,1.51,1.65,1.65,0,0,1-.83,1.37,7.25,7.25,0,0,1-2.67-1.66,5.94,5.94,0,0,1-1.51-2.52,7.51,7.51,0,0,1-.21-3.17A53.93,53.93,0,0,1,8.5,71.47c.33-1,.8-2.37,1.4-4.25s1-3.26,1.33-4.17c0,0,.1-.58.29-1.59A23.27,23.27,0,0,0,6.26,62.9c-2.16.82-3.55,1.32-4.17,1.52A4.34,4.34,0,0,1,0,61a28.28,28.28,0,0,1,4.43-2.88Q7,56.79,8.71,56.06c1.15-.48,2.79-1.12,4.9-1.94a2.11,2.11,0,0,0,.32-.14,1.3,1.3,0,0,1,.33-.15,3.42,3.42,0,0,0,.36-.14L20.3,39.5c.2-.52.48-1.39.87-2.59s.69-2.11.93-2.73q.79-1.95,2-5.76t1.84-5.55c.19-.48.54-1.5,1-3.06A33.22,33.22,0,0,1,28.44,16a13.42,13.42,0,0,1,1.8-2.81A3.67,3.67,0,0,1,31,13l.82,0c.63,1.29,1.06,2.23,1.3,2.81-.43,1.68-.88,3.37-1.33,5.07s-1,3.47-1.55,5.29-1.1,3.47-1.58,4.94-1.08,3.21-1.8,5.25-1.3,3.66-1.73,4.86-1.07,3-1.91,5.26l-1.84,5A228.6,228.6,0,0,1,49.1,46.06q5.34-14.12,5.69-15.34c.43-1.3.87-2.69,1.3-4.18s.9-3.15,1.4-5,.9-3.25,1.19-4.21c.1-.29.2-.63.32-1s.23-.72.33-1,.2-.61.32-1a5.4,5.4,0,0,0,.25-1c.05-.24.32-2,.8-5.12a2.14,2.14,0,0,1,2.73-.28q1.88,2.52,1.08,6.55-.44,2.23-1.15,4.93c-.48,1.8-.86,3.14-1.15,4l-1.66,5.11q-1.21,3.78-1.44,4.29-.21.8-3.81,12.45l1,.15,10-.87A16.68,16.68,0,0,1,70,44.4,13,13,0,0,1,72.94,45.12Z\"/><path class=\"cls-1\" d=\"M86.9,58.51a10.1,10.1,0,0,1-1.51,6.05,30.65,30.65,0,0,1-8.49,9.22,15.61,15.61,0,0,1-5.55,2.52,8.72,8.72,0,0,1-5.15-.4,8.27,8.27,0,0,1-3.92-3.35,23,23,0,0,1-1.66-2.81q-1.08-2.44.36-6.4a16.14,16.14,0,0,1,5.4-7.49,1.84,1.84,0,0,0,.44-.47,2.46,2.46,0,0,1,.5-.54A15.85,15.85,0,0,1,70,53c2.6-1.1,4.56-.41,5.91,2.09a1.36,1.36,0,0,0,.14.36,1.77,1.77,0,0,0,.29.43,5.72,5.72,0,0,1,1,2.59,5.33,5.33,0,0,1-.25,2.56,8.31,8.31,0,0,1-1.19,2.19A7.8,7.8,0,0,1,74.16,65q-4.39,3.39-9,2.38h-.65a4.33,4.33,0,0,0-.18,2.55,2.7,2.7,0,0,0,1.77,1.34,7.64,7.64,0,0,0,4.6.28,16.47,16.47,0,0,0,6.63-3.88q5.53-5,7.27-10.44a6.59,6.59,0,0,1,.79-1A2.18,2.18,0,0,1,86.9,58.51ZM72.58,56.93a13.25,13.25,0,0,0-5.84,5.76,7,7,0,0,0,4.47-1.84A4.46,4.46,0,0,0,72.58,56.93Z\"/><path class=\"cls-1\" d=\"M126.43,8.83a8.79,8.79,0,0,1,1.37,3.06c.38,1.37.65,2.22.79,2.56-.14,2.21-.21,3.38-.21,3.53-.1.62-.26,1.56-.47,2.8s-.37,2.16-.47,2.74a3.64,3.64,0,0,1-1,2.45c-.29,1.58-.43,2.42-.43,2.52a27.71,27.71,0,0,0-1,2.7c-.41,1.17-.71,2-.9,2.55-.1.24-.21.5-.33.76l-.36.79c-.12.27-.24.52-.36.76s-.24.49-.36.75-.23.52-.32.76A117.3,117.3,0,0,1,115.78,50q-1.23,1.93-3.39,5.61a8.48,8.48,0,0,0-.86,2.16A19.2,19.2,0,0,0,111,60c-.14.72-.26,1.53-.36,2.41s-.17,1.59-.21,2.09-.11,1.33-.18,2.49-.14,1.87-.18,2.16c-.15,1.87-.22,2.88-.22,3a23.66,23.66,0,0,0,.29,5.54c.09.44.14.68.14.72a2,2,0,0,0-.21.9,3,3,0,0,0,.1.83c.08.24.18.54.33.9s.24.61.29.76q.29,1.08,2.16,6a5.78,5.78,0,0,0,.72,1.44c.24.29.56.75,1,1.37a8.07,8.07,0,0,1,.68,1.15c.15.15.89,1,2.23,2.52a7.92,7.92,0,0,0,4.4-.07,2.92,2.92,0,0,1,1.72,3.6,3.93,3.93,0,0,1-2.23,1.37,3,3,0,0,1-1.58,0,5.58,5.58,0,0,1-2.09-.94,23.18,23.18,0,0,1-6.19-6c-.29-.39-.69-1-1.19-1.8s-.88-1.4-1.12-1.73-.28-.67-.57-1.44a3.22,3.22,0,0,0-1.08-1.59,6.3,6.3,0,0,0-.72-2.41,6.33,6.33,0,0,1-.72-2.48,6.56,6.56,0,0,0-.72-2.67,4.83,4.83,0,0,1-.29-1.22c-.05-.43-.1-.9-.14-1.4s-.1-.93-.15-1.26a1.54,1.54,0,0,0,.22-.83,6.05,6.05,0,0,0-.11-1,5.38,5.38,0,0,1-.11-.86l.22-4.18s0-.4-.07-1.08a5.37,5.37,0,0,0-.76.62,5.47,5.47,0,0,0-.5.54l-.54.64a4.48,4.48,0,0,0-.44.58,37.42,37.42,0,0,1-7.48,7.34,7.82,7.82,0,0,1-4.11,1.66,3.05,3.05,0,0,1-3-1.3q-.22-.36-3.1-4.39c-.43-2.25-.67-3.5-.72-3.74a7.75,7.75,0,0,1-.07-2.31c.14-1,.3-2.37.47-4.24s.3-3.22.39-4c.1-.48.26-1.17.47-2.08s.35-1.44.4-1.59c.48-2.21.77-3.57.86-4.1a3.68,3.68,0,0,1,.4-1.33,4,4,0,0,0,.39-1.55,9.74,9.74,0,0,1,.65-2.67q.23-.65.54-1.83c.22-.79.43-1.5.65-2.13a11.3,11.3,0,0,1,.76-1.72,7.1,7.1,0,0,0,.28-1,4.71,4.71,0,0,1,.22-.79q.44-1.31,2-6c.43-1.3.69-2,.79-2.23.29-.77.71-2,1.26-3.85a32.22,32.22,0,0,1,1.47-4.07,21.39,21.39,0,0,0,.87-2c.29-.77.59-1.52.9-2.27l.83-2a22.18,22.18,0,0,1,2.37-4,4.13,4.13,0,0,1,3.89-1.73,2,2,0,0,1,1.37,1.16,10.76,10.76,0,0,0,.93,1.94,8.69,8.69,0,0,1,1.08,6.26,53.26,53.26,0,0,1-1,5.55,26.55,26.55,0,0,0-.58,3.09,6.82,6.82,0,0,1-.65,2.24c-.48,1-1.1,2.47-1.87,4.39s-1.27,3.14-1.51,3.67A40.67,40.67,0,0,1,101,40.55a31.79,31.79,0,0,0-2,4.21.52.52,0,0,1-.22.36,2.13,2.13,0,0,0-.79.54,3.75,3.75,0,0,0-.57,1c-.2.45-.32.73-.36.83a14.29,14.29,0,0,1-3,3.6q-.42.36-2.16,2.37a7,7,0,0,0-1.51,3.39,13,13,0,0,1-.43,2,15.63,15.63,0,0,0-.43,1.87c0,.34-.1.74-.15,1.19s-.08.91-.1,1.37a6.23,6.23,0,0,1-.18,1.19,16.52,16.52,0,0,0,0,3.2A13.55,13.55,0,0,1,89.06,71l.36,1.08a2.09,2.09,0,0,0,2.24-.29q3.81-3.39,4.32-4c1-1.06,2.68-3,5-5.9q.28-.36,4.6-6.2a15.53,15.53,0,0,0,1.95-5c.19-.68.65-2.64,1.37-5.91a8.93,8.93,0,0,1,.36-1.65c.19-.68.34-1.31.46-1.91a17.08,17.08,0,0,0,.26-1.69q.06-.44,1.08-3.6.72-2.31,1.44-5.62c.09-.53.22-1.1.39-1.73s.34-1.17.51-1.65.36-1.05.57-1.7a15.79,15.79,0,0,0,.47-1.62c.14-.43.29-.92.43-1.47s.29-1.09.43-1.62.29-1,.44-1.44a44.39,44.39,0,0,1,2.8-7.42,9.26,9.26,0,0,0,.65-1.22,5.42,5.42,0,0,1,4.18-4,3.85,3.85,0,0,1,.93.25,2.46,2.46,0,0,1,.83.58l.65.64A5.1,5.1,0,0,1,126.43,8.83ZM92.67,47.57A8.32,8.32,0,0,0,92.23,50,36,36,0,0,0,95,45.66q1.65-3,2.45-4.72c1-2.49,1.68-4.08,1.87-4.75a1.31,1.31,0,0,1,.5-.79,1.69,1.69,0,0,0,.51-1,2,2,0,0,1,.18-.83c.12-.26.26-.56.43-.9s.3-.6.39-.79a4,4,0,0,0,.22-1.26,3.05,3.05,0,0,1,.36-1.4,1.92,1.92,0,0,0,.36-.87,3.89,3.89,0,0,1,0-1.4,12.2,12.2,0,0,1,.4-1.58A11.34,11.34,0,0,0,103,24a7.93,7.93,0,0,1,.22-.82c.09-.32.16-.58.21-.8s.1-.48.15-.79a6.78,6.78,0,0,0,.07-.83,13.11,13.11,0,0,1,.21-3.45l-.21-.72-.43.57c-.39.87-.65,1.52-.8,1.95a19,19,0,0,1-.93,2.7c-.48,1.17-.82,2-1,2.55s-.49,1.46-1,2.92a26,26,0,0,0-1.12,3.49,1.71,1.71,0,0,1-.22.33.58.58,0,0,0-.14.25,5,5,0,0,0-.43,1.08A8.07,8.07,0,0,1,97.2,34c-.14.48-.35,1.08-.61,1.8l-.54,1.44c-.1.29-.33.85-.69,1.69a11.09,11.09,0,0,0-.68,2A55.65,55.65,0,0,1,92.67,47.57ZM124,14.16a.68.68,0,0,0,0-.36.56.56,0,0,0-.22-.29.74.74,0,0,0-.46-.14q-3.11,8.85-3.67,10.8-.23,1-3.1,10.58a13.13,13.13,0,0,0-.72,3.67A9.58,9.58,0,0,0,117.29,36c.19-.53.66-1.65,1.4-3.35s1.31-3,1.69-4a3.62,3.62,0,0,1,.36-.9,9.3,9.3,0,0,0,.47-1,3.62,3.62,0,0,0,.25-.86,6.55,6.55,0,0,1,.22-.8c.1-.28.18-.54.25-.75s.15-.47.22-.76a3.4,3.4,0,0,0,.11-.79,9.27,9.27,0,0,1,.21-1.15,12.52,12.52,0,0,1,.43-1.33,6.38,6.38,0,0,0,.36-1.12,5.73,5.73,0,0,0,.36-1.58A11.48,11.48,0,0,1,124,14.16Z\"/><path class=\"cls-1\" d=\"M142.27,56.35c.1.53.17,1,.22,1.3a5.18,5.18,0,0,1-3,2.59c-.24.1-.51.19-.82.29l-.83.25c-.24.07-.52.17-.83.29l-.83.32a3.19,3.19,0,0,0-1.44,1.3,22.57,22.57,0,0,0-1.22,2.81A17.3,17.3,0,0,1,124,75.43a3.56,3.56,0,0,1-2.84.11,4.88,4.88,0,0,1-2.34-2,4.09,4.09,0,0,1-.65-1,9.2,9.2,0,0,0-.5-.93,7.4,7.4,0,0,1-.36-6.77,20.5,20.5,0,0,1,5-7.78,5.25,5.25,0,0,0,1.08-1.65,8.81,8.81,0,0,1,3.24-4.18,3.84,3.84,0,0,1,3.6-.83,4.64,4.64,0,0,1,2.88,2.7l1.72,3.67c.72-.19,1.72-.43,3-.72s2.2-.48,2.77-.57l.94.43A3.32,3.32,0,0,1,142.27,56.35ZM123.91,70.1a18.59,18.59,0,0,0,3.89-3.7,8,8,0,0,0,1.8-3.71c-1.06-.24-2.09-.46-3.1-.65-.28-.29-.63-.62-1-1s-.68-.65-.83-.79a18.46,18.46,0,0,0-2.88,5.44,10.25,10.25,0,0,0-.79,5.07C121.73,71.23,122.71,71,123.91,70.1Zm4-12.88a3,3,0,0,0,1.48.46,7,7,0,0,0,1.83-.54c-.09-.67-.14-1-.14-1.08a2.24,2.24,0,0,0-1.15-.79C129.07,55.08,128.4,55.73,127.87,57.22Z\"/><path class=\"cls-1\" d=\"M223.92,24a48.43,48.43,0,0,1-.36,9.8c-.1.72-.31,2-.65,4a41.23,41.23,0,0,0-.58,4.5c-.09.77-.2,1.55-.32,2.34s-.29,1.62-.5,2.49-.42,1.6-.61,2.23-.44,1.43-.73,2.41-.52,1.74-.71,2.27a56.8,56.8,0,0,1-6.63,14.4,91.78,91.78,0,0,1-9.21,12.67q-6.5,7-11.53,10.15c-2.73,1.68-5.2,2.19-7.41,1.51a9.39,9.39,0,0,1-2.52-1.08,13.1,13.1,0,0,1-6-12A120.43,120.43,0,0,1,177.62,64c.15-.81.43-2.62.87-5.43s.76-5,1-6.52q1.65-9.8,1.87-11.73-2.1,4.61-2.16,4.82c-.34.82-1.08,2.7-2.24,5.65s-2.08,5.39-2.8,7.31-1.4,3.84-2,5.76c-.38,1.2-.77,2.46-1.15,3.78s-.76,2.65-1.12,4-.69,2.6-1,3.78-.68,2.52-1.09,4-.73,2.79-1,3.85a50.84,50.84,0,0,1-2.08,5.87,24.77,24.77,0,0,1-2.45,4.64,3.09,3.09,0,0,1-1.87-3.38,59.4,59.4,0,0,1,2.87-16.63A30.08,30.08,0,0,0,164.38,70c.38-1.66.67-2.82.86-3.5q.28-.78,3.09-9.07c1.4-4.17,2.14-6.38,2.24-6.62q2.66-6.27,6.33-14.55,1.88-4.24,3.46-7,.87-1.44,5.11-8.28l.72-.72a3.32,3.32,0,0,1,1.51.36,4.86,4.86,0,0,1,1.05.65,12.58,12.58,0,0,1,1,1.08c.46.52.76.86.91,1a2.73,2.73,0,0,1,.14,1.88,26.63,26.63,0,0,1-.86,4.24,82.06,82.06,0,0,0-2,8.86q-1.08,5.84-1.37,7.2-2.09,9.36-4.32,25.34c-.19,1.2-.34,2.45-.43,3.75s-.18,2.83-.25,4.61-.14,3-.18,3.74a11.83,11.83,0,0,0,.14,1.73Q182,88,185,87.46a13.11,13.11,0,0,0,4.89-1.88,37.63,37.63,0,0,0,5.47-4.39A74,74,0,0,0,206.5,67.51a67.86,67.86,0,0,0,9.36-21.38,124.26,124.26,0,0,0,2.59-15.63c.09-1,.2-2.38.32-4.28s.23-3.3.32-4.21.06-1.59,0-2-.11-1.1-.25-2-.24-1.59-.29-2a21.58,21.58,0,0,0-1.08-5.83,2.81,2.81,0,0,1,.94-3.75A13.47,13.47,0,0,1,220,7.61,14.18,14.18,0,0,1,223.85,17c0,.53,0,1.7,0,3.53A23.83,23.83,0,0,0,223.92,24Z\"/><path class=\"cls-1\" d=\"M245.3,56.35c.1.53.17,1,.22,1.3a5.19,5.19,0,0,1-3,2.59c-.25.1-.52.19-.83.29l-.83.25c-.24.07-.52.17-.83.29l-.83.32a3.19,3.19,0,0,0-1.44,1.3,22.57,22.57,0,0,0-1.22,2.81A17.3,17.3,0,0,1,227,75.43a3.56,3.56,0,0,1-2.84.11,4.88,4.88,0,0,1-2.34-2,4.09,4.09,0,0,1-.65-1,9.2,9.2,0,0,0-.5-.93,7.4,7.4,0,0,1-.36-6.77,20.5,20.5,0,0,1,5-7.78,5.25,5.25,0,0,0,1.08-1.65,8.81,8.81,0,0,1,3.24-4.18,3.84,3.84,0,0,1,3.6-.83,4.64,4.64,0,0,1,2.88,2.7l1.72,3.67c.73-.19,1.72-.43,3-.72s2.2-.48,2.77-.57l.94.43A3.32,3.32,0,0,1,245.3,56.35ZM226.94,70.1a18.59,18.59,0,0,0,3.89-3.7,8,8,0,0,0,1.8-3.71c-1.06-.24-2.09-.46-3.09-.65-.29-.29-.64-.62-1-1s-.68-.65-.83-.79a18.46,18.46,0,0,0-2.88,5.44,10.25,10.25,0,0,0-.79,5.07C224.76,71.23,225.74,71,226.94,70.1Zm4-12.88a3,3,0,0,0,1.48.46,7,7,0,0,0,1.83-.54c-.09-.67-.14-1-.14-1.08a2.24,2.24,0,0,0-1.15-.79C232.1,55.08,231.43,55.73,230.9,57.22Z\"/><path class=\"cls-1\" d=\"M265.61,58.51a10.17,10.17,0,0,1-1.52,6.05,30.65,30.65,0,0,1-8.49,9.22,15.54,15.54,0,0,1-5.55,2.52,8.68,8.68,0,0,1-5.14-.4A8.25,8.25,0,0,1,241,72.55a21.51,21.51,0,0,1-1.65-2.81q-1.08-2.44.36-6.4a16,16,0,0,1,5.4-7.49,1.87,1.87,0,0,0,.43-.47,2.46,2.46,0,0,1,.5-.54,15.34,15.34,0,0,1,2.67-1.8c2.59-1.1,4.56-.41,5.9,2.09a1.36,1.36,0,0,0,.14.36,1.77,1.77,0,0,0,.29.43,5.74,5.74,0,0,1,1,2.59,5.46,5.46,0,0,1-.26,2.56,8.28,8.28,0,0,1-1.18,2.19A8.06,8.06,0,0,1,252.86,65q-4.4,3.39-9,2.38h-.65a4.33,4.33,0,0,0-.18,2.55,2.7,2.7,0,0,0,1.77,1.34,7.68,7.68,0,0,0,4.61.28A16.5,16.5,0,0,0,256,67.66q5.55-5,7.27-10.44a7.5,7.5,0,0,1,.79-1A2.2,2.2,0,0,1,265.61,58.51Zm-14.33-1.58a13.23,13.23,0,0,0-5.83,5.76,7,7,0,0,0,4.46-1.84A4.46,4.46,0,0,0,251.28,56.93Z\"/><path class=\"cls-1\" d=\"M297.29,5a28.73,28.73,0,0,1-1.66,10.65q-.21.72-.54,1.77c-.22.69-.41,1.29-.58,1.8s-.36,1.08-.57,1.72-.42,1.25-.61,1.8-.41,1.13-.65,1.73-.48,1.17-.72,1.69a101.82,101.82,0,0,1-9.87,17.57,13.59,13.59,0,0,1-1,1.33c-.39.46-.78.92-1.19,1.37s-.78.87-1.12,1.23L277.56,49c-.48.53-.87.93-1.15,1.22l-4,4a9.06,9.06,0,0,0-2.66,4.61c-.24.82-.53,1.85-.86,3.1s-.63,2.32-.87,3.24-.49,2-.75,3.13-.47,2.27-.62,3.27a31.72,31.72,0,0,0-.5,5.91,17.45,17.45,0,0,0,1,6A9.4,9.4,0,0,1,269,84.9a18.58,18.58,0,0,1,1.4,2.27c-.53.91-1,1.44-1.55,1.58a2.39,2.39,0,0,1-1.91-.57,12,12,0,0,1-5.4-11.52c0-.34,0-1.11.08-2.31a53,53,0,0,1,1.72-12.24,74.91,74.91,0,0,1,3.39-10.44,40.12,40.12,0,0,0,1.65-4.61c.63-2,1-3.26,1.23-3.74s.31-.89.5-1.37.37-.92.54-1.33.37-.86.61-1.37.44-.92.58-1.26.91-2.3,2.3-5.9c.58-1.54.89-2.33.94-2.38q2.67-5.68,5.18-11c.29-.63.94-2,1.95-4S284,11,284.54,9.84a32.9,32.9,0,0,1,3.75-6.41,17.23,17.23,0,0,1,2.3-2.3A4.8,4.8,0,0,1,292.43.05a8.87,8.87,0,0,1,2.62.14C295.87,1.92,296.61,3.53,297.29,5Zm-4.9,4.24s-.1-.5-.29-1.36h-.5q-2.39,4-4.57,8.35t-4.47,9.43q-2.26,5.12-3.67,8.5T275,43.54l.21.18q.15.11.15.18a50.59,50.59,0,0,0,3.09-4.4c.24-.33.92-1.41,2-3.24l2.27-3.74c.41-.67,1-1.73,1.83-3.17s1.49-2.73,2-3.89,1-2.32,1.51-3.52c.19-.44.59-1.37,1.19-2.81s1.07-2.64,1.4-3.6a21.42,21.42,0,0,0,.8-2.95,9.44,9.44,0,0,1,.43-1.7A11.14,11.14,0,0,0,292.39,9.26Z\"/></g></g></svg>"}</svg>`;
});

/* src/components/atoms/AppHeadLogo.svelte generated by Svelte v3.20.1 */

const AppHeadLogo = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	const logo$1 = css`
    width: 108px;
    height: 40px;

    svg {
      width: 100%;
      height: 100%;
    }

    ${mq[1]} {
      width: 154px;
      height: 56px;
    }
  `;

	const logoTip = css`
    display: none;

    ${mq[1]} {
      display: block;
      ${rem(12)};
      font-family: ${Color.FontFamilyEng100};
    }
  `;

	const block = css`
    ${mq[1]} {
      margin-bottom: 18px;
    }
  `;

	return `<div${add_attribute("class", block, 0)}><div${add_attribute("class", logo$1, 0)}>${validate_component(logo, "HeadLogo").$$render($$result, {}, {}, {})}</div>
  <aside${add_attribute("class", logoTip, 0)}>Murakami Naomi’s portfolio</aside></div>`;
});

/* src/components/molecules/AppHeadBox.svelte generated by Svelte v3.20.1 */

const AppHeadBox = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let { segment } = $$props;

	//style
	const header = css`
    display: flex;
    padding: 8px 16px;

    ${mq[1]} {
      flex-direction: column-reverse;
      padding: 32px 16px 48px 40px;
    }
  `;

	if ($$props.segment === void 0 && $$bindings.segment && segment !== void 0) $$bindings.segment(segment);

	return `<header${add_attribute("class", header, 0)}>${validate_component(AppNav, "AppNav").$$render($$result, { segment }, {}, {})}

  
  ${validate_component(AppHeadLogo, "AppHeadLogo").$$render($$result, {}, {}, {})}</header>`;
});

/* src/components/organisms/AppHead.svelte generated by Svelte v3.20.1 */

const AppHead = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	const header = css`
    position: fixed;
    z-index: 100;

    ${mq[1]} {
      max-width: 260px;
    }
  `;

	return `<div${add_attribute("class", header, 0)}>${validate_component(AppHeadBox, "AppHeadBox").$$render($$result, {}, {}, {})}</div>`;
});

/* src/components/atoms/AppFootText.svelte generated by Svelte v3.20.1 */

const AppFootText = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	const timestamp = new Date();
	const year = timestamp.getFullYear();

	//style
	const copy = css`
    ${rem(10)};
    color: ${Color.White};
    text-align: center;
    font-weight: 600;
    font-family: ${Color.FontFamilyEng100};
    letter-spacing: 0.2em;
  `;

	return `<p${add_attribute("class", copy, 0)}><small>© ${escape(year)} Hello Noel</small></p>`;
});

/* src/components/organisms/AppFoot.svelte generated by Svelte v3.20.1 */

const AppFoot = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	const footer = css`
    padding: 4rem;
    background: ${Color.Gray500};
  `;

	return `<footer${add_attribute("class", footer, 0)}>${validate_component(AppFootText, "AppFootText").$$render($$result, {}, {}, {})}</footer>`;
});

/* src/routes/_layout.svelte generated by Svelte v3.20.1 */

const Layout = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let { segment } = $$props;
	if ($$props.segment === void 0 && $$bindings.segment && segment !== void 0) $$bindings.segment(segment);

	return `${validate_component(AppHead, "Header").$$render($$result, { segment }, {}, {})}

<main>${$$slots.default ? $$slots.default({}) : ``}</main>

${validate_component(AppFoot, "Footer").$$render($$result, {}, {}, {})}`;
});

/* src/routes/_error.svelte generated by Svelte v3.20.1 */

const css$1$4 = {
	code: "h1.svelte-bdpjbw,p.svelte-bdpjbw{margin:0 auto}p.svelte-bdpjbw{margin:1em auto;font-size:14px}",
	map: "{\"version\":3,\"file\":\"_error.svelte\",\"sources\":[\"_error.svelte\"],\"sourcesContent\":[\"<script>\\n  //common\\n  import { css, keyframes } from \\\"emotion\\\";\\n  import Color from \\\"../../static/style/Color.js\\\";\\n  import { mq, rem, breakpoints } from \\\"../../static/style/Base.js\\\";\\n  import { center, secP, sp96, leftP } from \\\"../../static/style/Variables.js\\\";\\n\\timport { display1, display2 } from \\\"../../static/style/Title.js\\\";\\n\\n\\texport let status;\\n\\texport let error;\\n\\n\\tconst dev = undefined === 'development';\\n\\n\\tconst aboutBlock = css `\\n\\t${leftP};\\n\\t${sp96};\\n\\tpadding: 4rem 0;\\n\\n\\t${mq[1]} {\\n\\t\\tpadding-top: 80px;\\n\\t\\tmax-width: ${breakpoints[2]}px;\\n\\t}\\n`;\\n</script>\\n\\n<style>\\n\\th1, p {\\n\\t\\tmargin: 0 auto;\\n\\t}\\n\\n\\tp {\\n\\t\\tmargin: 1em auto;\\n\\t\\tfont-size: 14px;\\n\\t}\\n</style>\\n\\n<svelte:head>\\n\\t<title>{status}</title>\\n</svelte:head>\\n\\n<h1 class={display1}>{status}</h1>\\n\\n<p>{error.message}</p>\\n\\n{#if dev && error.stack}\\n\\t<pre>{error.stack}</pre>\\n{/if}\\n\"],\"names\":[],\"mappings\":\"AA0BC,gBAAE,CAAE,CAAC,cAAC,CAAC,AACN,MAAM,CAAE,CAAC,CAAC,IAAI,AACf,CAAC,AAED,CAAC,cAAC,CAAC,AACF,MAAM,CAAE,GAAG,CAAC,IAAI,CAChB,SAAS,CAAE,IAAI,AAChB,CAAC\"}"
};

const Error$1 = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let { status } = $$props;
	let { error } = $$props;

	const aboutBlock = css`
	${leftP};
	${sp96};
	padding: 4rem 0;

	${mq[1]} {
		padding-top: 80px;
		max-width: ${breakpoints[2]}px;
	}
`;

	if ($$props.status === void 0 && $$bindings.status && status !== void 0) $$bindings.status(status);
	if ($$props.error === void 0 && $$bindings.error && error !== void 0) $$bindings.error(error);
	$$result.css.add(css$1$4);

	return `${($$result.head += `${($$result.title = `<title>${escape(status)}</title>`, "")}`, "")}

<h1 class="${escape(null_to_empty(display1)) + " svelte-bdpjbw"}">${escape(status)}</h1>

<p class="${"svelte-bdpjbw"}">${escape(error.message)}</p>

${ ``}`;
});

// This file is generated by Sapper — do not edit it!

const d = decodeURIComponent;

const manifest = {
	server_routes: [
		{
			// blog/index.json.js
			pattern: /^\/blog.json$/,
			handlers: route_0,
			params: () => ({})
		},

		{
			// blog/[slug].json.js
			pattern: /^\/blog\/([^\/]+?).json$/,
			handlers: route_1,
			params: match => ({ slug: d(match[1]) })
		},

		{
			// work/index.json.js
			pattern: /^\/work.json$/,
			handlers: route_2,
			params: () => ({})
		},

		{
			// work/[slug].json.js
			pattern: /^\/work\/([^\/]+?).json$/,
			handlers: route_3,
			params: match => ({ slug: d(match[1]) })
		}
	],

	pages: [
		{
			// index.svelte
			pattern: /^\/$/,
			parts: [
				{ name: "index", file: "index.svelte", component: Routes }
			]
		},

		{
			// about.svelte
			pattern: /^\/about\/?$/,
			parts: [
				{ name: "about", file: "about.svelte", component: About }
			]
		},

		{
			// blog/index.svelte
			pattern: /^\/blog\/?$/,
			parts: [
				{ name: "blog", file: "blog/index.svelte", component: Blog, preload: preload }
			]
		},

		{
			// blog/[slug].svelte
			pattern: /^\/blog\/([^\/]+?)\/?$/,
			parts: [
				null,
				{ name: "blog_$slug", file: "blog/[slug].svelte", component: U5Bslugu5D, preload: preload$1, params: match => ({ slug: d(match[1]) }) }
			]
		},

		{
			// work/index.svelte
			pattern: /^\/work\/?$/,
			parts: [
				{ name: "work", file: "work/index.svelte", component: Work, preload: preload$2 }
			]
		},

		{
			// work/[slug].svelte
			pattern: /^\/work\/([^\/]+?)\/?$/,
			parts: [
				null,
				{ name: "work_$slug", file: "work/[slug].svelte", component: U5Bslugu5D$1, preload: preload$3, params: match => ({ slug: d(match[1]) }) }
			]
		}
	],

	root: Layout,
	root_preload: () => {},
	error: Error$1
};

const build_dir = "__sapper__/build";

const subscriber_queue = [];
/**
 * Create a `Writable` store that allows both updating and reading by subscription.
 * @param {*=}value initial value
 * @param {StartStopNotifier=}start start and stop notifications for subscriptions
 */
function writable(value, start = noop) {
    let stop;
    const subscribers = [];
    function set(new_value) {
        if (safe_not_equal(value, new_value)) {
            value = new_value;
            if (stop) { // store is ready
                const run_queue = !subscriber_queue.length;
                for (let i = 0; i < subscribers.length; i += 1) {
                    const s = subscribers[i];
                    s[1]();
                    subscriber_queue.push(s, value);
                }
                if (run_queue) {
                    for (let i = 0; i < subscriber_queue.length; i += 2) {
                        subscriber_queue[i][0](subscriber_queue[i + 1]);
                    }
                    subscriber_queue.length = 0;
                }
            }
        }
    }
    function update(fn) {
        set(fn(value));
    }
    function subscribe(run, invalidate = noop) {
        const subscriber = [run, invalidate];
        subscribers.push(subscriber);
        if (subscribers.length === 1) {
            stop = start(set) || noop;
        }
        run(value);
        return () => {
            const index = subscribers.indexOf(subscriber);
            if (index !== -1) {
                subscribers.splice(index, 1);
            }
            if (subscribers.length === 0) {
                stop();
                stop = null;
            }
        };
    }
    return { set, update, subscribe };
}

const CONTEXT_KEY = {};

/* src/node_modules/@sapper/internal/App.svelte generated by Svelte v3.20.1 */

const App = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let { stores } = $$props;
	let { error } = $$props;
	let { status } = $$props;
	let { segments } = $$props;
	let { level0 } = $$props;
	let { level1 = null } = $$props;
	setContext(CONTEXT_KEY, stores);
	if ($$props.stores === void 0 && $$bindings.stores && stores !== void 0) $$bindings.stores(stores);
	if ($$props.error === void 0 && $$bindings.error && error !== void 0) $$bindings.error(error);
	if ($$props.status === void 0 && $$bindings.status && status !== void 0) $$bindings.status(status);
	if ($$props.segments === void 0 && $$bindings.segments && segments !== void 0) $$bindings.segments(segments);
	if ($$props.level0 === void 0 && $$bindings.level0 && level0 !== void 0) $$bindings.level0(level0);
	if ($$props.level1 === void 0 && $$bindings.level1 && level1 !== void 0) $$bindings.level1(level1);

	return `


${validate_component(Layout, "Layout").$$render($$result, Object.assign({ segment: segments[0] }, level0.props), {}, {
		default: () => `${error
		? `${validate_component(Error$1, "Error").$$render($$result, { error, status }, {}, {})}`
		: `${validate_component(level1.component || missing_component, "svelte:component").$$render($$result, Object.assign(level1.props), {}, {})}`}`
	})}`;
});

function get_server_route_handler(routes) {
	async function handle_route(route, req, res, next) {
		req.params = route.params(route.pattern.exec(req.path));

		const method = req.method.toLowerCase();
		// 'delete' cannot be exported from a module because it is a keyword,
		// so check for 'del' instead
		const method_export = method === 'delete' ? 'del' : method;
		const handle_method = route.handlers[method_export];
		if (handle_method) {
			if (process.env.SAPPER_EXPORT) {
				const { write, end, setHeader } = res;
				const chunks = [];
				const headers = {};

				// intercept data so that it can be exported
				res.write = function(chunk) {
					chunks.push(Buffer.from(chunk));
					write.apply(res, arguments);
				};

				res.setHeader = function(name, value) {
					headers[name.toLowerCase()] = value;
					setHeader.apply(res, arguments);
				};

				res.end = function(chunk) {
					if (chunk) chunks.push(Buffer.from(chunk));
					end.apply(res, arguments);

					process.send({
						__sapper__: true,
						event: 'file',
						url: req.url,
						method: req.method,
						status: res.statusCode,
						type: headers['content-type'],
						body: Buffer.concat(chunks).toString()
					});
				};
			}

			const handle_next = (err) => {
				if (err) {
					res.statusCode = 500;
					res.end(err.message);
				} else {
					process.nextTick(next);
				}
			};

			try {
				await handle_method(req, res, handle_next);
			} catch (err) {
				console.error(err);
				handle_next(err);
			}
		} else {
			// no matching handler for method
			process.nextTick(next);
		}
	}

	return function find_route(req, res, next) {
		for (const route of routes) {
			if (route.pattern.test(req.path)) {
				handle_route(route, req, res, next);
				return;
			}
		}

		next();
	};
}

/*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */

/**
 * Module exports.
 * @public
 */

var parse_1 = parse;
var serialize_1 = serialize;

/**
 * Module variables.
 * @private
 */

var decode = decodeURIComponent;
var encode = encodeURIComponent;
var pairSplitRegExp = /; */;

/**
 * RegExp to match field-content in RFC 7230 sec 3.2
 *
 * field-content = field-vchar [ 1*( SP / HTAB ) field-vchar ]
 * field-vchar   = VCHAR / obs-text
 * obs-text      = %x80-FF
 */

var fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;

/**
 * Parse a cookie header.
 *
 * Parse the given cookie header string into an object
 * The object has the various cookies as keys(names) => values
 *
 * @param {string} str
 * @param {object} [options]
 * @return {object}
 * @public
 */

function parse(str, options) {
  if (typeof str !== 'string') {
    throw new TypeError('argument str must be a string');
  }

  var obj = {};
  var opt = options || {};
  var pairs = str.split(pairSplitRegExp);
  var dec = opt.decode || decode;

  for (var i = 0; i < pairs.length; i++) {
    var pair = pairs[i];
    var eq_idx = pair.indexOf('=');

    // skip things that don't look like key=value
    if (eq_idx < 0) {
      continue;
    }

    var key = pair.substr(0, eq_idx).trim();
    var val = pair.substr(++eq_idx, pair.length).trim();

    // quoted values
    if ('"' == val[0]) {
      val = val.slice(1, -1);
    }

    // only assign once
    if (undefined == obj[key]) {
      obj[key] = tryDecode(val, dec);
    }
  }

  return obj;
}

/**
 * Serialize data into a cookie header.
 *
 * Serialize the a name value pair into a cookie string suitable for
 * http headers. An optional options object specified cookie parameters.
 *
 * serialize('foo', 'bar', { httpOnly: true })
 *   => "foo=bar; httpOnly"
 *
 * @param {string} name
 * @param {string} val
 * @param {object} [options]
 * @return {string}
 * @public
 */

function serialize(name, val, options) {
  var opt = options || {};
  var enc = opt.encode || encode;

  if (typeof enc !== 'function') {
    throw new TypeError('option encode is invalid');
  }

  if (!fieldContentRegExp.test(name)) {
    throw new TypeError('argument name is invalid');
  }

  var value = enc(val);

  if (value && !fieldContentRegExp.test(value)) {
    throw new TypeError('argument val is invalid');
  }

  var str = name + '=' + value;

  if (null != opt.maxAge) {
    var maxAge = opt.maxAge - 0;
    if (isNaN(maxAge)) throw new Error('maxAge should be a Number');
    str += '; Max-Age=' + Math.floor(maxAge);
  }

  if (opt.domain) {
    if (!fieldContentRegExp.test(opt.domain)) {
      throw new TypeError('option domain is invalid');
    }

    str += '; Domain=' + opt.domain;
  }

  if (opt.path) {
    if (!fieldContentRegExp.test(opt.path)) {
      throw new TypeError('option path is invalid');
    }

    str += '; Path=' + opt.path;
  }

  if (opt.expires) {
    if (typeof opt.expires.toUTCString !== 'function') {
      throw new TypeError('option expires is invalid');
    }

    str += '; Expires=' + opt.expires.toUTCString();
  }

  if (opt.httpOnly) {
    str += '; HttpOnly';
  }

  if (opt.secure) {
    str += '; Secure';
  }

  if (opt.sameSite) {
    var sameSite = typeof opt.sameSite === 'string'
      ? opt.sameSite.toLowerCase() : opt.sameSite;

    switch (sameSite) {
      case true:
        str += '; SameSite=Strict';
        break;
      case 'lax':
        str += '; SameSite=Lax';
        break;
      case 'strict':
        str += '; SameSite=Strict';
        break;
      case 'none':
        str += '; SameSite=None';
        break;
      default:
        throw new TypeError('option sameSite is invalid');
    }
  }

  return str;
}

/**
 * Try decoding a string using a decoding function.
 *
 * @param {string} str
 * @param {function} decode
 * @private
 */

function tryDecode(str, decode) {
  try {
    return decode(str);
  } catch (e) {
    return str;
  }
}

var cookie = {
	parse: parse_1,
	serialize: serialize_1
};

var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$';
var unsafeChars = /[<>\b\f\n\r\t\0\u2028\u2029]/g;
var reserved = /^(?:do|if|in|for|int|let|new|try|var|byte|case|char|else|enum|goto|long|this|void|with|await|break|catch|class|const|final|float|short|super|throw|while|yield|delete|double|export|import|native|return|switch|throws|typeof|boolean|default|extends|finally|package|private|abstract|continue|debugger|function|volatile|interface|protected|transient|implements|instanceof|synchronized)$/;
var escaped$1 = {
    '<': '\\u003C',
    '>': '\\u003E',
    '/': '\\u002F',
    '\\': '\\\\',
    '\b': '\\b',
    '\f': '\\f',
    '\n': '\\n',
    '\r': '\\r',
    '\t': '\\t',
    '\0': '\\0',
    '\u2028': '\\u2028',
    '\u2029': '\\u2029'
};
var objectProtoOwnPropertyNames = Object.getOwnPropertyNames(Object.prototype).sort().join('\0');
function devalue(value) {
    var counts = new Map();
    function walk(thing) {
        if (typeof thing === 'function') {
            throw new Error("Cannot stringify a function");
        }
        if (counts.has(thing)) {
            counts.set(thing, counts.get(thing) + 1);
            return;
        }
        counts.set(thing, 1);
        if (!isPrimitive(thing)) {
            var type = getType(thing);
            switch (type) {
                case 'Number':
                case 'String':
                case 'Boolean':
                case 'Date':
                case 'RegExp':
                    return;
                case 'Array':
                    thing.forEach(walk);
                    break;
                case 'Set':
                case 'Map':
                    Array.from(thing).forEach(walk);
                    break;
                default:
                    var proto = Object.getPrototypeOf(thing);
                    if (proto !== Object.prototype &&
                        proto !== null &&
                        Object.getOwnPropertyNames(proto).sort().join('\0') !== objectProtoOwnPropertyNames) {
                        throw new Error("Cannot stringify arbitrary non-POJOs");
                    }
                    if (Object.getOwnPropertySymbols(thing).length > 0) {
                        throw new Error("Cannot stringify POJOs with symbolic keys");
                    }
                    Object.keys(thing).forEach(function (key) { return walk(thing[key]); });
            }
        }
    }
    walk(value);
    var names = new Map();
    Array.from(counts)
        .filter(function (entry) { return entry[1] > 1; })
        .sort(function (a, b) { return b[1] - a[1]; })
        .forEach(function (entry, i) {
        names.set(entry[0], getName(i));
    });
    function stringify(thing) {
        if (names.has(thing)) {
            return names.get(thing);
        }
        if (isPrimitive(thing)) {
            return stringifyPrimitive(thing);
        }
        var type = getType(thing);
        switch (type) {
            case 'Number':
            case 'String':
            case 'Boolean':
                return "Object(" + stringify(thing.valueOf()) + ")";
            case 'RegExp':
                return thing.toString();
            case 'Date':
                return "new Date(" + thing.getTime() + ")";
            case 'Array':
                var members = thing.map(function (v, i) { return i in thing ? stringify(v) : ''; });
                var tail = thing.length === 0 || (thing.length - 1 in thing) ? '' : ',';
                return "[" + members.join(',') + tail + "]";
            case 'Set':
            case 'Map':
                return "new " + type + "([" + Array.from(thing).map(stringify).join(',') + "])";
            default:
                var obj = "{" + Object.keys(thing).map(function (key) { return safeKey(key) + ":" + stringify(thing[key]); }).join(',') + "}";
                var proto = Object.getPrototypeOf(thing);
                if (proto === null) {
                    return Object.keys(thing).length > 0
                        ? "Object.assign(Object.create(null)," + obj + ")"
                        : "Object.create(null)";
                }
                return obj;
        }
    }
    var str = stringify(value);
    if (names.size) {
        var params_1 = [];
        var statements_1 = [];
        var values_1 = [];
        names.forEach(function (name, thing) {
            params_1.push(name);
            if (isPrimitive(thing)) {
                values_1.push(stringifyPrimitive(thing));
                return;
            }
            var type = getType(thing);
            switch (type) {
                case 'Number':
                case 'String':
                case 'Boolean':
                    values_1.push("Object(" + stringify(thing.valueOf()) + ")");
                    break;
                case 'RegExp':
                    values_1.push(thing.toString());
                    break;
                case 'Date':
                    values_1.push("new Date(" + thing.getTime() + ")");
                    break;
                case 'Array':
                    values_1.push("Array(" + thing.length + ")");
                    thing.forEach(function (v, i) {
                        statements_1.push(name + "[" + i + "]=" + stringify(v));
                    });
                    break;
                case 'Set':
                    values_1.push("new Set");
                    statements_1.push(name + "." + Array.from(thing).map(function (v) { return "add(" + stringify(v) + ")"; }).join('.'));
                    break;
                case 'Map':
                    values_1.push("new Map");
                    statements_1.push(name + "." + Array.from(thing).map(function (_a) {
                        var k = _a[0], v = _a[1];
                        return "set(" + stringify(k) + ", " + stringify(v) + ")";
                    }).join('.'));
                    break;
                default:
                    values_1.push(Object.getPrototypeOf(thing) === null ? 'Object.create(null)' : '{}');
                    Object.keys(thing).forEach(function (key) {
                        statements_1.push("" + name + safeProp(key) + "=" + stringify(thing[key]));
                    });
            }
        });
        statements_1.push("return " + str);
        return "(function(" + params_1.join(',') + "){" + statements_1.join(';') + "}(" + values_1.join(',') + "))";
    }
    else {
        return str;
    }
}
function getName(num) {
    var name = '';
    do {
        name = chars[num % chars.length] + name;
        num = ~~(num / chars.length) - 1;
    } while (num >= 0);
    return reserved.test(name) ? name + "_" : name;
}
function isPrimitive(thing) {
    return Object(thing) !== thing;
}
function stringifyPrimitive(thing) {
    if (typeof thing === 'string')
        return stringifyString(thing);
    if (thing === void 0)
        return 'void 0';
    if (thing === 0 && 1 / thing < 0)
        return '-0';
    var str = String(thing);
    if (typeof thing === 'number')
        return str.replace(/^(-)?0\./, '$1.');
    return str;
}
function getType(thing) {
    return Object.prototype.toString.call(thing).slice(8, -1);
}
function escapeUnsafeChar(c) {
    return escaped$1[c] || c;
}
function escapeUnsafeChars(str) {
    return str.replace(unsafeChars, escapeUnsafeChar);
}
function safeKey(key) {
    return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key) ? key : escapeUnsafeChars(JSON.stringify(key));
}
function safeProp(key) {
    return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key) ? "." + key : "[" + escapeUnsafeChars(JSON.stringify(key)) + "]";
}
function stringifyString(str) {
    var result = '"';
    for (var i = 0; i < str.length; i += 1) {
        var char = str.charAt(i);
        var code = char.charCodeAt(0);
        if (char === '"') {
            result += '\\"';
        }
        else if (char in escaped$1) {
            result += escaped$1[char];
        }
        else if (code >= 0xd800 && code <= 0xdfff) {
            var next = str.charCodeAt(i + 1);
            // If this is the beginning of a [high, low] surrogate pair,
            // add the next two characters, otherwise escape
            if (code <= 0xdbff && (next >= 0xdc00 && next <= 0xdfff)) {
                result += char + str[++i];
            }
            else {
                result += "\\u" + code.toString(16).toUpperCase();
            }
        }
        else {
            result += char;
        }
    }
    result += '"';
    return result;
}

// Based on https://github.com/tmpvar/jsdom/blob/aa85b2abf07766ff7bf5c1f6daafb3726f2f2db5/lib/jsdom/living/blob.js

// fix for "Readable" isn't a named export issue
const Readable = Stream.Readable;

const BUFFER = Symbol('buffer');
const TYPE = Symbol('type');

class Blob {
	constructor() {
		this[TYPE] = '';

		const blobParts = arguments[0];
		const options = arguments[1];

		const buffers = [];
		let size = 0;

		if (blobParts) {
			const a = blobParts;
			const length = Number(a.length);
			for (let i = 0; i < length; i++) {
				const element = a[i];
				let buffer;
				if (element instanceof Buffer) {
					buffer = element;
				} else if (ArrayBuffer.isView(element)) {
					buffer = Buffer.from(element.buffer, element.byteOffset, element.byteLength);
				} else if (element instanceof ArrayBuffer) {
					buffer = Buffer.from(element);
				} else if (element instanceof Blob) {
					buffer = element[BUFFER];
				} else {
					buffer = Buffer.from(typeof element === 'string' ? element : String(element));
				}
				size += buffer.length;
				buffers.push(buffer);
			}
		}

		this[BUFFER] = Buffer.concat(buffers);

		let type = options && options.type !== undefined && String(options.type).toLowerCase();
		if (type && !/[^\u0020-\u007E]/.test(type)) {
			this[TYPE] = type;
		}
	}
	get size() {
		return this[BUFFER].length;
	}
	get type() {
		return this[TYPE];
	}
	text() {
		return Promise.resolve(this[BUFFER].toString());
	}
	arrayBuffer() {
		const buf = this[BUFFER];
		const ab = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
		return Promise.resolve(ab);
	}
	stream() {
		const readable = new Readable();
		readable._read = function () {};
		readable.push(this[BUFFER]);
		readable.push(null);
		return readable;
	}
	toString() {
		return '[object Blob]';
	}
	slice() {
		const size = this.size;

		const start = arguments[0];
		const end = arguments[1];
		let relativeStart, relativeEnd;
		if (start === undefined) {
			relativeStart = 0;
		} else if (start < 0) {
			relativeStart = Math.max(size + start, 0);
		} else {
			relativeStart = Math.min(start, size);
		}
		if (end === undefined) {
			relativeEnd = size;
		} else if (end < 0) {
			relativeEnd = Math.max(size + end, 0);
		} else {
			relativeEnd = Math.min(end, size);
		}
		const span = Math.max(relativeEnd - relativeStart, 0);

		const buffer = this[BUFFER];
		const slicedBuffer = buffer.slice(relativeStart, relativeStart + span);
		const blob = new Blob([], { type: arguments[2] });
		blob[BUFFER] = slicedBuffer;
		return blob;
	}
}

Object.defineProperties(Blob.prototype, {
	size: { enumerable: true },
	type: { enumerable: true },
	slice: { enumerable: true }
});

Object.defineProperty(Blob.prototype, Symbol.toStringTag, {
	value: 'Blob',
	writable: false,
	enumerable: false,
	configurable: true
});

/**
 * fetch-error.js
 *
 * FetchError interface for operational errors
 */

/**
 * Create FetchError instance
 *
 * @param   String      message      Error message for human
 * @param   String      type         Error type for machine
 * @param   String      systemError  For Node.js system error
 * @return  FetchError
 */
function FetchError(message, type, systemError) {
  Error.call(this, message);

  this.message = message;
  this.type = type;

  // when err.type is `system`, err.code contains system error code
  if (systemError) {
    this.code = this.errno = systemError.code;
  }

  // hide custom error implementation details from end-users
  Error.captureStackTrace(this, this.constructor);
}

FetchError.prototype = Object.create(Error.prototype);
FetchError.prototype.constructor = FetchError;
FetchError.prototype.name = 'FetchError';

let convert;
try {
	convert = require('encoding').convert;
} catch (e) {}

const INTERNALS = Symbol('Body internals');

// fix an issue where "PassThrough" isn't a named export for node <10
const PassThrough = Stream.PassThrough;

/**
 * Body mixin
 *
 * Ref: https://fetch.spec.whatwg.org/#body
 *
 * @param   Stream  body  Readable stream
 * @param   Object  opts  Response options
 * @return  Void
 */
function Body$1(body) {
	var _this = this;

	var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
	    _ref$size = _ref.size;

	let size = _ref$size === undefined ? 0 : _ref$size;
	var _ref$timeout = _ref.timeout;
	let timeout = _ref$timeout === undefined ? 0 : _ref$timeout;

	if (body == null) {
		// body is undefined or null
		body = null;
	} else if (isURLSearchParams(body)) {
		// body is a URLSearchParams
		body = Buffer.from(body.toString());
	} else if (isBlob(body)) ; else if (Buffer.isBuffer(body)) ; else if (Object.prototype.toString.call(body) === '[object ArrayBuffer]') {
		// body is ArrayBuffer
		body = Buffer.from(body);
	} else if (ArrayBuffer.isView(body)) {
		// body is ArrayBufferView
		body = Buffer.from(body.buffer, body.byteOffset, body.byteLength);
	} else if (body instanceof Stream) ; else {
		// none of the above
		// coerce to string then buffer
		body = Buffer.from(String(body));
	}
	this[INTERNALS] = {
		body,
		disturbed: false,
		error: null
	};
	this.size = size;
	this.timeout = timeout;

	if (body instanceof Stream) {
		body.on('error', function (err) {
			const error = err.name === 'AbortError' ? err : new FetchError(`Invalid response body while trying to fetch ${_this.url}: ${err.message}`, 'system', err);
			_this[INTERNALS].error = error;
		});
	}
}

Body$1.prototype = {
	get body() {
		return this[INTERNALS].body;
	},

	get bodyUsed() {
		return this[INTERNALS].disturbed;
	},

	/**
  * Decode response as ArrayBuffer
  *
  * @return  Promise
  */
	arrayBuffer() {
		return consumeBody.call(this).then(function (buf) {
			return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
		});
	},

	/**
  * Return raw response as Blob
  *
  * @return Promise
  */
	blob() {
		let ct = this.headers && this.headers.get('content-type') || '';
		return consumeBody.call(this).then(function (buf) {
			return Object.assign(
			// Prevent copying
			new Blob([], {
				type: ct.toLowerCase()
			}), {
				[BUFFER]: buf
			});
		});
	},

	/**
  * Decode response as json
  *
  * @return  Promise
  */
	json() {
		var _this2 = this;

		return consumeBody.call(this).then(function (buffer) {
			try {
				return JSON.parse(buffer.toString());
			} catch (err) {
				return Body$1.Promise.reject(new FetchError(`invalid json response body at ${_this2.url} reason: ${err.message}`, 'invalid-json'));
			}
		});
	},

	/**
  * Decode response as text
  *
  * @return  Promise
  */
	text() {
		return consumeBody.call(this).then(function (buffer) {
			return buffer.toString();
		});
	},

	/**
  * Decode response as buffer (non-spec api)
  *
  * @return  Promise
  */
	buffer() {
		return consumeBody.call(this);
	},

	/**
  * Decode response as text, while automatically detecting the encoding and
  * trying to decode to UTF-8 (non-spec api)
  *
  * @return  Promise
  */
	textConverted() {
		var _this3 = this;

		return consumeBody.call(this).then(function (buffer) {
			return convertBody(buffer, _this3.headers);
		});
	}
};

// In browsers, all properties are enumerable.
Object.defineProperties(Body$1.prototype, {
	body: { enumerable: true },
	bodyUsed: { enumerable: true },
	arrayBuffer: { enumerable: true },
	blob: { enumerable: true },
	json: { enumerable: true },
	text: { enumerable: true }
});

Body$1.mixIn = function (proto) {
	for (const name of Object.getOwnPropertyNames(Body$1.prototype)) {
		// istanbul ignore else: future proof
		if (!(name in proto)) {
			const desc = Object.getOwnPropertyDescriptor(Body$1.prototype, name);
			Object.defineProperty(proto, name, desc);
		}
	}
};

/**
 * Consume and convert an entire Body to a Buffer.
 *
 * Ref: https://fetch.spec.whatwg.org/#concept-body-consume-body
 *
 * @return  Promise
 */
function consumeBody() {
	var _this4 = this;

	if (this[INTERNALS].disturbed) {
		return Body$1.Promise.reject(new TypeError(`body used already for: ${this.url}`));
	}

	this[INTERNALS].disturbed = true;

	if (this[INTERNALS].error) {
		return Body$1.Promise.reject(this[INTERNALS].error);
	}

	let body = this.body;

	// body is null
	if (body === null) {
		return Body$1.Promise.resolve(Buffer.alloc(0));
	}

	// body is blob
	if (isBlob(body)) {
		body = body.stream();
	}

	// body is buffer
	if (Buffer.isBuffer(body)) {
		return Body$1.Promise.resolve(body);
	}

	// istanbul ignore if: should never happen
	if (!(body instanceof Stream)) {
		return Body$1.Promise.resolve(Buffer.alloc(0));
	}

	// body is stream
	// get ready to actually consume the body
	let accum = [];
	let accumBytes = 0;
	let abort = false;

	return new Body$1.Promise(function (resolve, reject) {
		let resTimeout;

		// allow timeout on slow response body
		if (_this4.timeout) {
			resTimeout = setTimeout(function () {
				abort = true;
				reject(new FetchError(`Response timeout while trying to fetch ${_this4.url} (over ${_this4.timeout}ms)`, 'body-timeout'));
			}, _this4.timeout);
		}

		// handle stream errors
		body.on('error', function (err) {
			if (err.name === 'AbortError') {
				// if the request was aborted, reject with this Error
				abort = true;
				reject(err);
			} else {
				// other errors, such as incorrect content-encoding
				reject(new FetchError(`Invalid response body while trying to fetch ${_this4.url}: ${err.message}`, 'system', err));
			}
		});

		body.on('data', function (chunk) {
			if (abort || chunk === null) {
				return;
			}

			if (_this4.size && accumBytes + chunk.length > _this4.size) {
				abort = true;
				reject(new FetchError(`content size at ${_this4.url} over limit: ${_this4.size}`, 'max-size'));
				return;
			}

			accumBytes += chunk.length;
			accum.push(chunk);
		});

		body.on('end', function () {
			if (abort) {
				return;
			}

			clearTimeout(resTimeout);

			try {
				resolve(Buffer.concat(accum, accumBytes));
			} catch (err) {
				// handle streams that have accumulated too much data (issue #414)
				reject(new FetchError(`Could not create Buffer from response body for ${_this4.url}: ${err.message}`, 'system', err));
			}
		});
	});
}

/**
 * Detect buffer encoding and convert to target encoding
 * ref: http://www.w3.org/TR/2011/WD-html5-20110113/parsing.html#determining-the-character-encoding
 *
 * @param   Buffer  buffer    Incoming buffer
 * @param   String  encoding  Target encoding
 * @return  String
 */
function convertBody(buffer, headers) {
	if (typeof convert !== 'function') {
		throw new Error('The package `encoding` must be installed to use the textConverted() function');
	}

	const ct = headers.get('content-type');
	let charset = 'utf-8';
	let res, str;

	// header
	if (ct) {
		res = /charset=([^;]*)/i.exec(ct);
	}

	// no charset in content type, peek at response body for at most 1024 bytes
	str = buffer.slice(0, 1024).toString();

	// html5
	if (!res && str) {
		res = /<meta.+?charset=(['"])(.+?)\1/i.exec(str);
	}

	// html4
	if (!res && str) {
		res = /<meta[\s]+?http-equiv=(['"])content-type\1[\s]+?content=(['"])(.+?)\2/i.exec(str);

		if (res) {
			res = /charset=(.*)/i.exec(res.pop());
		}
	}

	// xml
	if (!res && str) {
		res = /<\?xml.+?encoding=(['"])(.+?)\1/i.exec(str);
	}

	// found charset
	if (res) {
		charset = res.pop();

		// prevent decode issues when sites use incorrect encoding
		// ref: https://hsivonen.fi/encoding-menu/
		if (charset === 'gb2312' || charset === 'gbk') {
			charset = 'gb18030';
		}
	}

	// turn raw buffers into a single utf-8 buffer
	return convert(buffer, 'UTF-8', charset).toString();
}

/**
 * Detect a URLSearchParams object
 * ref: https://github.com/bitinn/node-fetch/issues/296#issuecomment-307598143
 *
 * @param   Object  obj     Object to detect by type or brand
 * @return  String
 */
function isURLSearchParams(obj) {
	// Duck-typing as a necessary condition.
	if (typeof obj !== 'object' || typeof obj.append !== 'function' || typeof obj.delete !== 'function' || typeof obj.get !== 'function' || typeof obj.getAll !== 'function' || typeof obj.has !== 'function' || typeof obj.set !== 'function') {
		return false;
	}

	// Brand-checking and more duck-typing as optional condition.
	return obj.constructor.name === 'URLSearchParams' || Object.prototype.toString.call(obj) === '[object URLSearchParams]' || typeof obj.sort === 'function';
}

/**
 * Check if `obj` is a W3C `Blob` object (which `File` inherits from)
 * @param  {*} obj
 * @return {boolean}
 */
function isBlob(obj) {
	return typeof obj === 'object' && typeof obj.arrayBuffer === 'function' && typeof obj.type === 'string' && typeof obj.stream === 'function' && typeof obj.constructor === 'function' && typeof obj.constructor.name === 'string' && /^(Blob|File)$/.test(obj.constructor.name) && /^(Blob|File)$/.test(obj[Symbol.toStringTag]);
}

/**
 * Clone body given Res/Req instance
 *
 * @param   Mixed  instance  Response or Request instance
 * @return  Mixed
 */
function clone(instance) {
	let p1, p2;
	let body = instance.body;

	// don't allow cloning a used body
	if (instance.bodyUsed) {
		throw new Error('cannot clone body after it is used');
	}

	// check that body is a stream and not form-data object
	// note: we can't clone the form-data object without having it as a dependency
	if (body instanceof Stream && typeof body.getBoundary !== 'function') {
		// tee instance body
		p1 = new PassThrough();
		p2 = new PassThrough();
		body.pipe(p1);
		body.pipe(p2);
		// set instance body to teed body and return the other teed body
		instance[INTERNALS].body = p1;
		body = p2;
	}

	return body;
}

/**
 * Performs the operation "extract a `Content-Type` value from |object|" as
 * specified in the specification:
 * https://fetch.spec.whatwg.org/#concept-bodyinit-extract
 *
 * This function assumes that instance.body is present.
 *
 * @param   Mixed  instance  Any options.body input
 */
function extractContentType(body) {
	if (body === null) {
		// body is null
		return null;
	} else if (typeof body === 'string') {
		// body is string
		return 'text/plain;charset=UTF-8';
	} else if (isURLSearchParams(body)) {
		// body is a URLSearchParams
		return 'application/x-www-form-urlencoded;charset=UTF-8';
	} else if (isBlob(body)) {
		// body is blob
		return body.type || null;
	} else if (Buffer.isBuffer(body)) {
		// body is buffer
		return null;
	} else if (Object.prototype.toString.call(body) === '[object ArrayBuffer]') {
		// body is ArrayBuffer
		return null;
	} else if (ArrayBuffer.isView(body)) {
		// body is ArrayBufferView
		return null;
	} else if (typeof body.getBoundary === 'function') {
		// detect form data input from form-data module
		return `multipart/form-data;boundary=${body.getBoundary()}`;
	} else if (body instanceof Stream) {
		// body is stream
		// can't really do much about this
		return null;
	} else {
		// Body constructor defaults other things to string
		return 'text/plain;charset=UTF-8';
	}
}

/**
 * The Fetch Standard treats this as if "total bytes" is a property on the body.
 * For us, we have to explicitly get it with a function.
 *
 * ref: https://fetch.spec.whatwg.org/#concept-body-total-bytes
 *
 * @param   Body    instance   Instance of Body
 * @return  Number?            Number of bytes, or null if not possible
 */
function getTotalBytes(instance) {
	const body = instance.body;


	if (body === null) {
		// body is null
		return 0;
	} else if (isBlob(body)) {
		return body.size;
	} else if (Buffer.isBuffer(body)) {
		// body is buffer
		return body.length;
	} else if (body && typeof body.getLengthSync === 'function') {
		// detect form data input from form-data module
		if (body._lengthRetrievers && body._lengthRetrievers.length == 0 || // 1.x
		body.hasKnownLength && body.hasKnownLength()) {
			// 2.x
			return body.getLengthSync();
		}
		return null;
	} else {
		// body is stream
		return null;
	}
}

/**
 * Write a Body to a Node.js WritableStream (e.g. http.Request) object.
 *
 * @param   Body    instance   Instance of Body
 * @return  Void
 */
function writeToStream(dest, instance) {
	const body = instance.body;


	if (body === null) {
		// body is null
		dest.end();
	} else if (isBlob(body)) {
		body.stream().pipe(dest);
	} else if (Buffer.isBuffer(body)) {
		// body is buffer
		dest.write(body);
		dest.end();
	} else {
		// body is stream
		body.pipe(dest);
	}
}

// expose Promise
Body$1.Promise = global.Promise;

/**
 * headers.js
 *
 * Headers class offers convenient helpers
 */

const invalidTokenRegex = /[^\^_`a-zA-Z\-0-9!#$%&'*+.|~]/;
const invalidHeaderCharRegex = /[^\t\x20-\x7e\x80-\xff]/;

function validateName(name) {
	name = `${name}`;
	if (invalidTokenRegex.test(name) || name === '') {
		throw new TypeError(`${name} is not a legal HTTP header name`);
	}
}

function validateValue(value) {
	value = `${value}`;
	if (invalidHeaderCharRegex.test(value)) {
		throw new TypeError(`${value} is not a legal HTTP header value`);
	}
}

/**
 * Find the key in the map object given a header name.
 *
 * Returns undefined if not found.
 *
 * @param   String  name  Header name
 * @return  String|Undefined
 */
function find(map, name) {
	name = name.toLowerCase();
	for (const key in map) {
		if (key.toLowerCase() === name) {
			return key;
		}
	}
	return undefined;
}

const MAP = Symbol('map');
class Headers {
	/**
  * Headers class
  *
  * @param   Object  headers  Response headers
  * @return  Void
  */
	constructor() {
		let init = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;

		this[MAP] = Object.create(null);

		if (init instanceof Headers) {
			const rawHeaders = init.raw();
			const headerNames = Object.keys(rawHeaders);

			for (const headerName of headerNames) {
				for (const value of rawHeaders[headerName]) {
					this.append(headerName, value);
				}
			}

			return;
		}

		// We don't worry about converting prop to ByteString here as append()
		// will handle it.
		if (init == null) ; else if (typeof init === 'object') {
			const method = init[Symbol.iterator];
			if (method != null) {
				if (typeof method !== 'function') {
					throw new TypeError('Header pairs must be iterable');
				}

				// sequence<sequence<ByteString>>
				// Note: per spec we have to first exhaust the lists then process them
				const pairs = [];
				for (const pair of init) {
					if (typeof pair !== 'object' || typeof pair[Symbol.iterator] !== 'function') {
						throw new TypeError('Each header pair must be iterable');
					}
					pairs.push(Array.from(pair));
				}

				for (const pair of pairs) {
					if (pair.length !== 2) {
						throw new TypeError('Each header pair must be a name/value tuple');
					}
					this.append(pair[0], pair[1]);
				}
			} else {
				// record<ByteString, ByteString>
				for (const key of Object.keys(init)) {
					const value = init[key];
					this.append(key, value);
				}
			}
		} else {
			throw new TypeError('Provided initializer must be an object');
		}
	}

	/**
  * Return combined header value given name
  *
  * @param   String  name  Header name
  * @return  Mixed
  */
	get(name) {
		name = `${name}`;
		validateName(name);
		const key = find(this[MAP], name);
		if (key === undefined) {
			return null;
		}

		return this[MAP][key].join(', ');
	}

	/**
  * Iterate over all headers
  *
  * @param   Function  callback  Executed for each item with parameters (value, name, thisArg)
  * @param   Boolean   thisArg   `this` context for callback function
  * @return  Void
  */
	forEach(callback) {
		let thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

		let pairs = getHeaders(this);
		let i = 0;
		while (i < pairs.length) {
			var _pairs$i = pairs[i];
			const name = _pairs$i[0],
			      value = _pairs$i[1];

			callback.call(thisArg, value, name, this);
			pairs = getHeaders(this);
			i++;
		}
	}

	/**
  * Overwrite header values given name
  *
  * @param   String  name   Header name
  * @param   String  value  Header value
  * @return  Void
  */
	set(name, value) {
		name = `${name}`;
		value = `${value}`;
		validateName(name);
		validateValue(value);
		const key = find(this[MAP], name);
		this[MAP][key !== undefined ? key : name] = [value];
	}

	/**
  * Append a value onto existing header
  *
  * @param   String  name   Header name
  * @param   String  value  Header value
  * @return  Void
  */
	append(name, value) {
		name = `${name}`;
		value = `${value}`;
		validateName(name);
		validateValue(value);
		const key = find(this[MAP], name);
		if (key !== undefined) {
			this[MAP][key].push(value);
		} else {
			this[MAP][name] = [value];
		}
	}

	/**
  * Check for header name existence
  *
  * @param   String   name  Header name
  * @return  Boolean
  */
	has(name) {
		name = `${name}`;
		validateName(name);
		return find(this[MAP], name) !== undefined;
	}

	/**
  * Delete all header values given name
  *
  * @param   String  name  Header name
  * @return  Void
  */
	delete(name) {
		name = `${name}`;
		validateName(name);
		const key = find(this[MAP], name);
		if (key !== undefined) {
			delete this[MAP][key];
		}
	}

	/**
  * Return raw headers (non-spec api)
  *
  * @return  Object
  */
	raw() {
		return this[MAP];
	}

	/**
  * Get an iterator on keys.
  *
  * @return  Iterator
  */
	keys() {
		return createHeadersIterator(this, 'key');
	}

	/**
  * Get an iterator on values.
  *
  * @return  Iterator
  */
	values() {
		return createHeadersIterator(this, 'value');
	}

	/**
  * Get an iterator on entries.
  *
  * This is the default iterator of the Headers object.
  *
  * @return  Iterator
  */
	[Symbol.iterator]() {
		return createHeadersIterator(this, 'key+value');
	}
}
Headers.prototype.entries = Headers.prototype[Symbol.iterator];

Object.defineProperty(Headers.prototype, Symbol.toStringTag, {
	value: 'Headers',
	writable: false,
	enumerable: false,
	configurable: true
});

Object.defineProperties(Headers.prototype, {
	get: { enumerable: true },
	forEach: { enumerable: true },
	set: { enumerable: true },
	append: { enumerable: true },
	has: { enumerable: true },
	delete: { enumerable: true },
	keys: { enumerable: true },
	values: { enumerable: true },
	entries: { enumerable: true }
});

function getHeaders(headers) {
	let kind = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'key+value';

	const keys = Object.keys(headers[MAP]).sort();
	return keys.map(kind === 'key' ? function (k) {
		return k.toLowerCase();
	} : kind === 'value' ? function (k) {
		return headers[MAP][k].join(', ');
	} : function (k) {
		return [k.toLowerCase(), headers[MAP][k].join(', ')];
	});
}

const INTERNAL = Symbol('internal');

function createHeadersIterator(target, kind) {
	const iterator = Object.create(HeadersIteratorPrototype);
	iterator[INTERNAL] = {
		target,
		kind,
		index: 0
	};
	return iterator;
}

const HeadersIteratorPrototype = Object.setPrototypeOf({
	next() {
		// istanbul ignore if
		if (!this || Object.getPrototypeOf(this) !== HeadersIteratorPrototype) {
			throw new TypeError('Value of `this` is not a HeadersIterator');
		}

		var _INTERNAL = this[INTERNAL];
		const target = _INTERNAL.target,
		      kind = _INTERNAL.kind,
		      index = _INTERNAL.index;

		const values = getHeaders(target, kind);
		const len = values.length;
		if (index >= len) {
			return {
				value: undefined,
				done: true
			};
		}

		this[INTERNAL].index = index + 1;

		return {
			value: values[index],
			done: false
		};
	}
}, Object.getPrototypeOf(Object.getPrototypeOf([][Symbol.iterator]())));

Object.defineProperty(HeadersIteratorPrototype, Symbol.toStringTag, {
	value: 'HeadersIterator',
	writable: false,
	enumerable: false,
	configurable: true
});

/**
 * Export the Headers object in a form that Node.js can consume.
 *
 * @param   Headers  headers
 * @return  Object
 */
function exportNodeCompatibleHeaders(headers) {
	const obj = Object.assign({ __proto__: null }, headers[MAP]);

	// http.request() only supports string as Host header. This hack makes
	// specifying custom Host header possible.
	const hostHeaderKey = find(headers[MAP], 'Host');
	if (hostHeaderKey !== undefined) {
		obj[hostHeaderKey] = obj[hostHeaderKey][0];
	}

	return obj;
}

/**
 * Create a Headers object from an object of headers, ignoring those that do
 * not conform to HTTP grammar productions.
 *
 * @param   Object  obj  Object of headers
 * @return  Headers
 */
function createHeadersLenient(obj) {
	const headers = new Headers();
	for (const name of Object.keys(obj)) {
		if (invalidTokenRegex.test(name)) {
			continue;
		}
		if (Array.isArray(obj[name])) {
			for (const val of obj[name]) {
				if (invalidHeaderCharRegex.test(val)) {
					continue;
				}
				if (headers[MAP][name] === undefined) {
					headers[MAP][name] = [val];
				} else {
					headers[MAP][name].push(val);
				}
			}
		} else if (!invalidHeaderCharRegex.test(obj[name])) {
			headers[MAP][name] = [obj[name]];
		}
	}
	return headers;
}

const INTERNALS$1 = Symbol('Response internals');

// fix an issue where "STATUS_CODES" aren't a named export for node <10
const STATUS_CODES = http.STATUS_CODES;

/**
 * Response class
 *
 * @param   Stream  body  Readable stream
 * @param   Object  opts  Response options
 * @return  Void
 */
class Response {
	constructor() {
		let body = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
		let opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

		Body$1.call(this, body, opts);

		const status = opts.status || 200;
		const headers = new Headers(opts.headers);

		if (body != null && !headers.has('Content-Type')) {
			const contentType = extractContentType(body);
			if (contentType) {
				headers.append('Content-Type', contentType);
			}
		}

		this[INTERNALS$1] = {
			url: opts.url,
			status,
			statusText: opts.statusText || STATUS_CODES[status],
			headers,
			counter: opts.counter
		};
	}

	get url() {
		return this[INTERNALS$1].url || '';
	}

	get status() {
		return this[INTERNALS$1].status;
	}

	/**
  * Convenience property representing if the request ended normally
  */
	get ok() {
		return this[INTERNALS$1].status >= 200 && this[INTERNALS$1].status < 300;
	}

	get redirected() {
		return this[INTERNALS$1].counter > 0;
	}

	get statusText() {
		return this[INTERNALS$1].statusText;
	}

	get headers() {
		return this[INTERNALS$1].headers;
	}

	/**
  * Clone this response
  *
  * @return  Response
  */
	clone() {
		return new Response(clone(this), {
			url: this.url,
			status: this.status,
			statusText: this.statusText,
			headers: this.headers,
			ok: this.ok,
			redirected: this.redirected
		});
	}
}

Body$1.mixIn(Response.prototype);

Object.defineProperties(Response.prototype, {
	url: { enumerable: true },
	status: { enumerable: true },
	ok: { enumerable: true },
	redirected: { enumerable: true },
	statusText: { enumerable: true },
	headers: { enumerable: true },
	clone: { enumerable: true }
});

Object.defineProperty(Response.prototype, Symbol.toStringTag, {
	value: 'Response',
	writable: false,
	enumerable: false,
	configurable: true
});

const INTERNALS$2 = Symbol('Request internals');

// fix an issue where "format", "parse" aren't a named export for node <10
const parse_url = Url.parse;
const format_url = Url.format;

const streamDestructionSupported = 'destroy' in Stream.Readable.prototype;

/**
 * Check if a value is an instance of Request.
 *
 * @param   Mixed   input
 * @return  Boolean
 */
function isRequest(input) {
	return typeof input === 'object' && typeof input[INTERNALS$2] === 'object';
}

function isAbortSignal(signal) {
	const proto = signal && typeof signal === 'object' && Object.getPrototypeOf(signal);
	return !!(proto && proto.constructor.name === 'AbortSignal');
}

/**
 * Request class
 *
 * @param   Mixed   input  Url or Request instance
 * @param   Object  init   Custom options
 * @return  Void
 */
class Request {
	constructor(input) {
		let init = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

		let parsedURL;

		// normalize input
		if (!isRequest(input)) {
			if (input && input.href) {
				// in order to support Node.js' Url objects; though WHATWG's URL objects
				// will fall into this branch also (since their `toString()` will return
				// `href` property anyway)
				parsedURL = parse_url(input.href);
			} else {
				// coerce input to a string before attempting to parse
				parsedURL = parse_url(`${input}`);
			}
			input = {};
		} else {
			parsedURL = parse_url(input.url);
		}

		let method = init.method || input.method || 'GET';
		method = method.toUpperCase();

		if ((init.body != null || isRequest(input) && input.body !== null) && (method === 'GET' || method === 'HEAD')) {
			throw new TypeError('Request with GET/HEAD method cannot have body');
		}

		let inputBody = init.body != null ? init.body : isRequest(input) && input.body !== null ? clone(input) : null;

		Body$1.call(this, inputBody, {
			timeout: init.timeout || input.timeout || 0,
			size: init.size || input.size || 0
		});

		const headers = new Headers(init.headers || input.headers || {});

		if (inputBody != null && !headers.has('Content-Type')) {
			const contentType = extractContentType(inputBody);
			if (contentType) {
				headers.append('Content-Type', contentType);
			}
		}

		let signal = isRequest(input) ? input.signal : null;
		if ('signal' in init) signal = init.signal;

		if (signal != null && !isAbortSignal(signal)) {
			throw new TypeError('Expected signal to be an instanceof AbortSignal');
		}

		this[INTERNALS$2] = {
			method,
			redirect: init.redirect || input.redirect || 'follow',
			headers,
			parsedURL,
			signal
		};

		// node-fetch-only options
		this.follow = init.follow !== undefined ? init.follow : input.follow !== undefined ? input.follow : 20;
		this.compress = init.compress !== undefined ? init.compress : input.compress !== undefined ? input.compress : true;
		this.counter = init.counter || input.counter || 0;
		this.agent = init.agent || input.agent;
	}

	get method() {
		return this[INTERNALS$2].method;
	}

	get url() {
		return format_url(this[INTERNALS$2].parsedURL);
	}

	get headers() {
		return this[INTERNALS$2].headers;
	}

	get redirect() {
		return this[INTERNALS$2].redirect;
	}

	get signal() {
		return this[INTERNALS$2].signal;
	}

	/**
  * Clone this request
  *
  * @return  Request
  */
	clone() {
		return new Request(this);
	}
}

Body$1.mixIn(Request.prototype);

Object.defineProperty(Request.prototype, Symbol.toStringTag, {
	value: 'Request',
	writable: false,
	enumerable: false,
	configurable: true
});

Object.defineProperties(Request.prototype, {
	method: { enumerable: true },
	url: { enumerable: true },
	headers: { enumerable: true },
	redirect: { enumerable: true },
	clone: { enumerable: true },
	signal: { enumerable: true }
});

/**
 * Convert a Request to Node.js http request options.
 *
 * @param   Request  A Request instance
 * @return  Object   The options object to be passed to http.request
 */
function getNodeRequestOptions(request) {
	const parsedURL = request[INTERNALS$2].parsedURL;
	const headers = new Headers(request[INTERNALS$2].headers);

	// fetch step 1.3
	if (!headers.has('Accept')) {
		headers.set('Accept', '*/*');
	}

	// Basic fetch
	if (!parsedURL.protocol || !parsedURL.hostname) {
		throw new TypeError('Only absolute URLs are supported');
	}

	if (!/^https?:$/.test(parsedURL.protocol)) {
		throw new TypeError('Only HTTP(S) protocols are supported');
	}

	if (request.signal && request.body instanceof Stream.Readable && !streamDestructionSupported) {
		throw new Error('Cancellation of streamed requests with AbortSignal is not supported in node < 8');
	}

	// HTTP-network-or-cache fetch steps 2.4-2.7
	let contentLengthValue = null;
	if (request.body == null && /^(POST|PUT)$/i.test(request.method)) {
		contentLengthValue = '0';
	}
	if (request.body != null) {
		const totalBytes = getTotalBytes(request);
		if (typeof totalBytes === 'number') {
			contentLengthValue = String(totalBytes);
		}
	}
	if (contentLengthValue) {
		headers.set('Content-Length', contentLengthValue);
	}

	// HTTP-network-or-cache fetch step 2.11
	if (!headers.has('User-Agent')) {
		headers.set('User-Agent', 'node-fetch/1.0 (+https://github.com/bitinn/node-fetch)');
	}

	// HTTP-network-or-cache fetch step 2.15
	if (request.compress && !headers.has('Accept-Encoding')) {
		headers.set('Accept-Encoding', 'gzip,deflate');
	}

	let agent = request.agent;
	if (typeof agent === 'function') {
		agent = agent(parsedURL);
	}

	if (!headers.has('Connection') && !agent) {
		headers.set('Connection', 'close');
	}

	// HTTP-network fetch step 4.2
	// chunked encoding is handled by Node.js

	return Object.assign({}, parsedURL, {
		method: request.method,
		headers: exportNodeCompatibleHeaders(headers),
		agent
	});
}

/**
 * abort-error.js
 *
 * AbortError interface for cancelled requests
 */

/**
 * Create AbortError instance
 *
 * @param   String      message      Error message for human
 * @return  AbortError
 */
function AbortError(message) {
  Error.call(this, message);

  this.type = 'aborted';
  this.message = message;

  // hide custom error implementation details from end-users
  Error.captureStackTrace(this, this.constructor);
}

AbortError.prototype = Object.create(Error.prototype);
AbortError.prototype.constructor = AbortError;
AbortError.prototype.name = 'AbortError';

// fix an issue where "PassThrough", "resolve" aren't a named export for node <10
const PassThrough$1 = Stream.PassThrough;
const resolve_url = Url.resolve;

/**
 * Fetch function
 *
 * @param   Mixed    url   Absolute url or Request instance
 * @param   Object   opts  Fetch options
 * @return  Promise
 */
function fetch(url, opts) {

	// allow custom promise
	if (!fetch.Promise) {
		throw new Error('native promise missing, set fetch.Promise to your favorite alternative');
	}

	Body$1.Promise = fetch.Promise;

	// wrap http.request into fetch
	return new fetch.Promise(function (resolve, reject) {
		// build request object
		const request = new Request(url, opts);
		const options = getNodeRequestOptions(request);

		const send = (options.protocol === 'https:' ? https : http).request;
		const signal = request.signal;

		let response = null;

		const abort = function abort() {
			let error = new AbortError('The user aborted a request.');
			reject(error);
			if (request.body && request.body instanceof Stream.Readable) {
				request.body.destroy(error);
			}
			if (!response || !response.body) return;
			response.body.emit('error', error);
		};

		if (signal && signal.aborted) {
			abort();
			return;
		}

		const abortAndFinalize = function abortAndFinalize() {
			abort();
			finalize();
		};

		// send request
		const req = send(options);
		let reqTimeout;

		if (signal) {
			signal.addEventListener('abort', abortAndFinalize);
		}

		function finalize() {
			req.abort();
			if (signal) signal.removeEventListener('abort', abortAndFinalize);
			clearTimeout(reqTimeout);
		}

		if (request.timeout) {
			req.once('socket', function (socket) {
				reqTimeout = setTimeout(function () {
					reject(new FetchError(`network timeout at: ${request.url}`, 'request-timeout'));
					finalize();
				}, request.timeout);
			});
		}

		req.on('error', function (err) {
			reject(new FetchError(`request to ${request.url} failed, reason: ${err.message}`, 'system', err));
			finalize();
		});

		req.on('response', function (res) {
			clearTimeout(reqTimeout);

			const headers = createHeadersLenient(res.headers);

			// HTTP fetch step 5
			if (fetch.isRedirect(res.statusCode)) {
				// HTTP fetch step 5.2
				const location = headers.get('Location');

				// HTTP fetch step 5.3
				const locationURL = location === null ? null : resolve_url(request.url, location);

				// HTTP fetch step 5.5
				switch (request.redirect) {
					case 'error':
						reject(new FetchError(`redirect mode is set to error: ${request.url}`, 'no-redirect'));
						finalize();
						return;
					case 'manual':
						// node-fetch-specific step: make manual redirect a bit easier to use by setting the Location header value to the resolved URL.
						if (locationURL !== null) {
							// handle corrupted header
							try {
								headers.set('Location', locationURL);
							} catch (err) {
								// istanbul ignore next: nodejs server prevent invalid response headers, we can't test this through normal request
								reject(err);
							}
						}
						break;
					case 'follow':
						// HTTP-redirect fetch step 2
						if (locationURL === null) {
							break;
						}

						// HTTP-redirect fetch step 5
						if (request.counter >= request.follow) {
							reject(new FetchError(`maximum redirect reached at: ${request.url}`, 'max-redirect'));
							finalize();
							return;
						}

						// HTTP-redirect fetch step 6 (counter increment)
						// Create a new Request object.
						const requestOpts = {
							headers: new Headers(request.headers),
							follow: request.follow,
							counter: request.counter + 1,
							agent: request.agent,
							compress: request.compress,
							method: request.method,
							body: request.body,
							signal: request.signal,
							timeout: request.timeout
						};

						// HTTP-redirect fetch step 9
						if (res.statusCode !== 303 && request.body && getTotalBytes(request) === null) {
							reject(new FetchError('Cannot follow redirect with body being a readable stream', 'unsupported-redirect'));
							finalize();
							return;
						}

						// HTTP-redirect fetch step 11
						if (res.statusCode === 303 || (res.statusCode === 301 || res.statusCode === 302) && request.method === 'POST') {
							requestOpts.method = 'GET';
							requestOpts.body = undefined;
							requestOpts.headers.delete('content-length');
						}

						// HTTP-redirect fetch step 15
						resolve(fetch(new Request(locationURL, requestOpts)));
						finalize();
						return;
				}
			}

			// prepare response
			res.once('end', function () {
				if (signal) signal.removeEventListener('abort', abortAndFinalize);
			});
			let body = res.pipe(new PassThrough$1());

			const response_options = {
				url: request.url,
				status: res.statusCode,
				statusText: res.statusMessage,
				headers: headers,
				size: request.size,
				timeout: request.timeout,
				counter: request.counter
			};

			// HTTP-network fetch step 12.1.1.3
			const codings = headers.get('Content-Encoding');

			// HTTP-network fetch step 12.1.1.4: handle content codings

			// in following scenarios we ignore compression support
			// 1. compression support is disabled
			// 2. HEAD request
			// 3. no Content-Encoding header
			// 4. no content response (204)
			// 5. content not modified response (304)
			if (!request.compress || request.method === 'HEAD' || codings === null || res.statusCode === 204 || res.statusCode === 304) {
				response = new Response(body, response_options);
				resolve(response);
				return;
			}

			// For Node v6+
			// Be less strict when decoding compressed responses, since sometimes
			// servers send slightly invalid responses that are still accepted
			// by common browsers.
			// Always using Z_SYNC_FLUSH is what cURL does.
			const zlibOptions = {
				flush: zlib.Z_SYNC_FLUSH,
				finishFlush: zlib.Z_SYNC_FLUSH
			};

			// for gzip
			if (codings == 'gzip' || codings == 'x-gzip') {
				body = body.pipe(zlib.createGunzip(zlibOptions));
				response = new Response(body, response_options);
				resolve(response);
				return;
			}

			// for deflate
			if (codings == 'deflate' || codings == 'x-deflate') {
				// handle the infamous raw deflate response from old servers
				// a hack for old IIS and Apache servers
				const raw = res.pipe(new PassThrough$1());
				raw.once('data', function (chunk) {
					// see http://stackoverflow.com/questions/37519828
					if ((chunk[0] & 0x0F) === 0x08) {
						body = body.pipe(zlib.createInflate());
					} else {
						body = body.pipe(zlib.createInflateRaw());
					}
					response = new Response(body, response_options);
					resolve(response);
				});
				return;
			}

			// for br
			if (codings == 'br' && typeof zlib.createBrotliDecompress === 'function') {
				body = body.pipe(zlib.createBrotliDecompress());
				response = new Response(body, response_options);
				resolve(response);
				return;
			}

			// otherwise, use response as-is
			response = new Response(body, response_options);
			resolve(response);
		});

		writeToStream(req, request);
	});
}
/**
 * Redirect code matching
 *
 * @param   Number   code  Status code
 * @return  Boolean
 */
fetch.isRedirect = function (code) {
	return code === 301 || code === 302 || code === 303 || code === 307 || code === 308;
};

// expose Promise
fetch.Promise = global.Promise;

function get_page_handler(
	manifest,
	session_getter
) {
	const get_build_info =  (assets => () => assets)(JSON.parse(fs.readFileSync(path.join(build_dir, 'build.json'), 'utf-8')));

	const template =  (str => () => str)(read_template(build_dir));

	const has_service_worker = fs.existsSync(path.join(build_dir, 'service-worker.js'));

	const { server_routes, pages } = manifest;
	const error_route = manifest.error;

	function bail(req, res, err) {
		console.error(err);

		const message =  'Internal server error';

		res.statusCode = 500;
		res.end(`<pre>${message}</pre>`);
	}

	function handle_error(req, res, statusCode, error) {
		handle_page({
			pattern: null,
			parts: [
				{ name: null, component: error_route }
			]
		}, req, res, statusCode, error || new Error('Unknown error in preload function'));
	}

	async function handle_page(page, req, res, status = 200, error = null) {
		const is_service_worker_index = req.path === '/service-worker-index.html';
		const build_info




 = get_build_info();

		res.setHeader('Content-Type', 'text/html');
		res.setHeader('Cache-Control',  'max-age=600');

		// preload main.js and current route
		// TODO detect other stuff we can preload? images, CSS, fonts?
		let preloaded_chunks = Array.isArray(build_info.assets.main) ? build_info.assets.main : [build_info.assets.main];
		if (!error && !is_service_worker_index) {
			page.parts.forEach(part => {
				if (!part) return;

				// using concat because it could be a string or an array. thanks webpack!
				preloaded_chunks = preloaded_chunks.concat(build_info.assets[part.name]);
			});
		}

		if (build_info.bundler === 'rollup') {
			// TODO add dependencies and CSS
			const link = preloaded_chunks
				.filter(file => file && !file.match(/\.map$/))
				.map(file => `<${req.baseUrl}/client/${file}>;rel="modulepreload"`)
				.join(', ');

			res.setHeader('Link', link);
		} else {
			const link = preloaded_chunks
				.filter(file => file && !file.match(/\.map$/))
				.map((file) => {
					const as = /\.css$/.test(file) ? 'style' : 'script';
					return `<${req.baseUrl}/client/${file}>;rel="preload";as="${as}"`;
				})
				.join(', ');

			res.setHeader('Link', link);
		}

		const session = session_getter(req, res);

		let redirect;
		let preload_error;

		const preload_context = {
			redirect: (statusCode, location) => {
				if (redirect && (redirect.statusCode !== statusCode || redirect.location !== location)) {
					throw new Error(`Conflicting redirects`);
				}
				location = location.replace(/^\//g, ''); // leading slash (only)
				redirect = { statusCode, location };
			},
			error: (statusCode, message) => {
				preload_error = { statusCode, message };
			},
			fetch: (url, opts) => {
				const parsed = new Url.URL(url, `http://127.0.0.1:${process.env.PORT}${req.baseUrl ? req.baseUrl + '/' :''}`);

				if (opts) {
					opts = Object.assign({}, opts);

					const include_cookies = (
						opts.credentials === 'include' ||
						opts.credentials === 'same-origin' && parsed.origin === `http://127.0.0.1:${process.env.PORT}`
					);

					if (include_cookies) {
						opts.headers = Object.assign({}, opts.headers);

						const cookies = Object.assign(
							{},
							cookie.parse(req.headers.cookie || ''),
							cookie.parse(opts.headers.cookie || '')
						);

						const set_cookie = res.getHeader('Set-Cookie');
						(Array.isArray(set_cookie) ? set_cookie : [set_cookie]).forEach(str => {
							const match = /([^=]+)=([^;]+)/.exec(str);
							if (match) cookies[match[1]] = match[2];
						});

						const str = Object.keys(cookies)
							.map(key => `${key}=${cookies[key]}`)
							.join('; ');

						opts.headers.cookie = str;
					}
				}

				return fetch(parsed.href, opts);
			}
		};

		let preloaded;
		let match;
		let params;

		try {
			const root_preloaded = manifest.root_preload
				? manifest.root_preload.call(preload_context, {
					host: req.headers.host,
					path: req.path,
					query: req.query,
					params: {}
				}, session)
				: {};

			match = error ? null : page.pattern.exec(req.path);


			let toPreload = [root_preloaded];
			if (!is_service_worker_index) {
				toPreload = toPreload.concat(page.parts.map(part => {
					if (!part) return null;

					// the deepest level is used below, to initialise the store
					params = part.params ? part.params(match) : {};

					return part.preload
						? part.preload.call(preload_context, {
							host: req.headers.host,
							path: req.path,
							query: req.query,
							params
						}, session)
						: {};
				}));
			}

			preloaded = await Promise.all(toPreload);
		} catch (err) {
			if (error) {
				return bail(req, res, err)
			}

			preload_error = { statusCode: 500, message: err };
			preloaded = []; // appease TypeScript
		}

		try {
			if (redirect) {
				const location = Url.resolve((req.baseUrl || '') + '/', redirect.location);

				res.statusCode = redirect.statusCode;
				res.setHeader('Location', location);
				res.end();

				return;
			}

			if (preload_error) {
				handle_error(req, res, preload_error.statusCode, preload_error.message);
				return;
			}

			const segments = req.path.split('/').filter(Boolean);

			// TODO make this less confusing
			const layout_segments = [segments[0]];
			let l = 1;

			page.parts.forEach((part, i) => {
				layout_segments[l] = segments[i + 1];
				if (!part) return null;
				l++;
			});

			const props = {
				stores: {
					page: {
						subscribe: writable({
							host: req.headers.host,
							path: req.path,
							query: req.query,
							params
						}).subscribe
					},
					preloading: {
						subscribe: writable(null).subscribe
					},
					session: writable(session)
				},
				segments: layout_segments,
				status: error ? status : 200,
				error: error ? error instanceof Error ? error : { message: error } : null,
				level0: {
					props: preloaded[0]
				},
				level1: {
					segment: segments[0],
					props: {}
				}
			};

			if (!is_service_worker_index) {
				let l = 1;
				for (let i = 0; i < page.parts.length; i += 1) {
					const part = page.parts[i];
					if (!part) continue;

					props[`level${l++}`] = {
						component: part.component,
						props: preloaded[i + 1] || {},
						segment: segments[i]
					};
				}
			}

			const { html, head, css } = App.render(props);

			const serialized = {
				preloaded: `[${preloaded.map(data => try_serialize(data)).join(',')}]`,
				session: session && try_serialize(session, err => {
					throw new Error(`Failed to serialize session data: ${err.message}`);
				}),
				error: error && try_serialize(props.error)
			};

			let script = `__SAPPER__={${[
				error && `error:${serialized.error},status:${status}`,
				`baseUrl:"${req.baseUrl}"`,
				serialized.preloaded && `preloaded:${serialized.preloaded}`,
				serialized.session && `session:${serialized.session}`
			].filter(Boolean).join(',')}};`;

			if (has_service_worker) {
				script += `if('serviceWorker' in navigator)navigator.serviceWorker.register('${req.baseUrl}/service-worker.js');`;
			}

			const file = [].concat(build_info.assets.main).filter(file => file && /\.js$/.test(file))[0];
			const main = `${req.baseUrl}/client/${file}`;

			if (build_info.bundler === 'rollup') {
				if (build_info.legacy_assets) {
					const legacy_main = `${req.baseUrl}/client/legacy/${build_info.legacy_assets.main}`;
					script += `(function(){try{eval("async function x(){}");var main="${main}"}catch(e){main="${legacy_main}"};var s=document.createElement("script");try{new Function("if(0)import('')")();s.src=main;s.type="module";s.crossOrigin="use-credentials";}catch(e){s.src="${req.baseUrl}/client/shimport@${build_info.shimport}.js";s.setAttribute("data-main",main);}document.head.appendChild(s);}());`;
				} else {
					script += `var s=document.createElement("script");try{new Function("if(0)import('')")();s.src="${main}";s.type="module";s.crossOrigin="use-credentials";}catch(e){s.src="${req.baseUrl}/client/shimport@${build_info.shimport}.js";s.setAttribute("data-main","${main}")}document.head.appendChild(s)`;
				}
			} else {
				script += `</script><script src="${main}">`;
			}

			let styles;

			// TODO make this consistent across apps
			// TODO embed build_info in placeholder.ts
			if (build_info.css && build_info.css.main) {
				const css_chunks = new Set();
				if (build_info.css.main) css_chunks.add(build_info.css.main);
				page.parts.forEach(part => {
					if (!part) return;
					const css_chunks_for_part = build_info.css.chunks[part.file];

					if (css_chunks_for_part) {
						css_chunks_for_part.forEach(file => {
							css_chunks.add(file);
						});
					}
				});

				styles = Array.from(css_chunks)
					.map(href => `<link rel="stylesheet" href="client/${href}">`)
					.join('');
			} else {
				styles = (css && css.code ? `<style>${css.code}</style>` : '');
			}

			// users can set a CSP nonce using res.locals.nonce
			const nonce_attr = (res.locals && res.locals.nonce) ? ` nonce="${res.locals.nonce}"` : '';

			const body = template()
				.replace('%sapper.base%', () => `<base href="${req.baseUrl}/">`)
				.replace('%sapper.scripts%', () => `<script${nonce_attr}>${script}</script>`)
				.replace('%sapper.html%', () => html)
				.replace('%sapper.head%', () => `<noscript id='sapper-head-start'></noscript>${head}<noscript id='sapper-head-end'></noscript>`)
				.replace('%sapper.styles%', () => styles);

			res.statusCode = status;
			res.end(body);
		} catch(err) {
			if (error) {
				bail(req, res, err);
			} else {
				handle_error(req, res, 500, err);
			}
		}
	}

	return function find_route(req, res, next) {
		if (req.path === '/service-worker-index.html') {
			const homePage = pages.find(page => page.pattern.test('/'));
			handle_page(homePage, req, res);
			return;
		}

		for (const page of pages) {
			if (page.pattern.test(req.path)) {
				handle_page(page, req, res);
				return;
			}
		}

		handle_error(req, res, 404, 'Not found');
	};
}

function read_template(dir = build_dir) {
	return fs.readFileSync(`${dir}/template.html`, 'utf-8');
}

function try_serialize(data, fail) {
	try {
		return devalue(data);
	} catch (err) {
		if (fail) fail(err);
		return null;
	}
}

var mime_raw = "application/andrew-inset\t\t\tez\napplication/applixware\t\t\t\taw\napplication/atom+xml\t\t\t\tatom\napplication/atomcat+xml\t\t\t\tatomcat\napplication/atomsvc+xml\t\t\t\tatomsvc\napplication/ccxml+xml\t\t\t\tccxml\napplication/cdmi-capability\t\t\tcdmia\napplication/cdmi-container\t\t\tcdmic\napplication/cdmi-domain\t\t\t\tcdmid\napplication/cdmi-object\t\t\t\tcdmio\napplication/cdmi-queue\t\t\t\tcdmiq\napplication/cu-seeme\t\t\t\tcu\napplication/davmount+xml\t\t\tdavmount\napplication/docbook+xml\t\t\t\tdbk\napplication/dssc+der\t\t\t\tdssc\napplication/dssc+xml\t\t\t\txdssc\napplication/ecmascript\t\t\t\tecma\napplication/emma+xml\t\t\t\temma\napplication/epub+zip\t\t\t\tepub\napplication/exi\t\t\t\t\texi\napplication/font-tdpfr\t\t\t\tpfr\napplication/gml+xml\t\t\t\tgml\napplication/gpx+xml\t\t\t\tgpx\napplication/gxf\t\t\t\t\tgxf\napplication/hyperstudio\t\t\t\tstk\napplication/inkml+xml\t\t\t\tink inkml\napplication/ipfix\t\t\t\tipfix\napplication/java-archive\t\t\tjar\napplication/java-serialized-object\t\tser\napplication/java-vm\t\t\t\tclass\napplication/javascript\t\t\t\tjs\napplication/json\t\t\t\tjson map\napplication/jsonml+json\t\t\t\tjsonml\napplication/lost+xml\t\t\t\tlostxml\napplication/mac-binhex40\t\t\thqx\napplication/mac-compactpro\t\t\tcpt\napplication/mads+xml\t\t\t\tmads\napplication/marc\t\t\t\tmrc\napplication/marcxml+xml\t\t\t\tmrcx\napplication/mathematica\t\t\t\tma nb mb\napplication/mathml+xml\t\t\t\tmathml\napplication/mbox\t\t\t\tmbox\napplication/mediaservercontrol+xml\t\tmscml\napplication/metalink+xml\t\t\tmetalink\napplication/metalink4+xml\t\t\tmeta4\napplication/mets+xml\t\t\t\tmets\napplication/mods+xml\t\t\t\tmods\napplication/mp21\t\t\t\tm21 mp21\napplication/mp4\t\t\t\t\tmp4s\napplication/msword\t\t\t\tdoc dot\napplication/mxf\t\t\t\t\tmxf\napplication/octet-stream\tbin dms lrf mar so dist distz pkg bpk dump elc deploy\napplication/oda\t\t\t\t\toda\napplication/oebps-package+xml\t\t\topf\napplication/ogg\t\t\t\t\togx\napplication/omdoc+xml\t\t\t\tomdoc\napplication/onenote\t\t\t\tonetoc onetoc2 onetmp onepkg\napplication/oxps\t\t\t\toxps\napplication/patch-ops-error+xml\t\t\txer\napplication/pdf\t\t\t\t\tpdf\napplication/pgp-encrypted\t\t\tpgp\napplication/pgp-signature\t\t\tasc sig\napplication/pics-rules\t\t\t\tprf\napplication/pkcs10\t\t\t\tp10\napplication/pkcs7-mime\t\t\t\tp7m p7c\napplication/pkcs7-signature\t\t\tp7s\napplication/pkcs8\t\t\t\tp8\napplication/pkix-attr-cert\t\t\tac\napplication/pkix-cert\t\t\t\tcer\napplication/pkix-crl\t\t\t\tcrl\napplication/pkix-pkipath\t\t\tpkipath\napplication/pkixcmp\t\t\t\tpki\napplication/pls+xml\t\t\t\tpls\napplication/postscript\t\t\t\tai eps ps\napplication/prs.cww\t\t\t\tcww\napplication/pskc+xml\t\t\t\tpskcxml\napplication/rdf+xml\t\t\t\trdf\napplication/reginfo+xml\t\t\t\trif\napplication/relax-ng-compact-syntax\t\trnc\napplication/resource-lists+xml\t\t\trl\napplication/resource-lists-diff+xml\t\trld\napplication/rls-services+xml\t\t\trs\napplication/rpki-ghostbusters\t\t\tgbr\napplication/rpki-manifest\t\t\tmft\napplication/rpki-roa\t\t\t\troa\napplication/rsd+xml\t\t\t\trsd\napplication/rss+xml\t\t\t\trss\napplication/rtf\t\t\t\t\trtf\napplication/sbml+xml\t\t\t\tsbml\napplication/scvp-cv-request\t\t\tscq\napplication/scvp-cv-response\t\t\tscs\napplication/scvp-vp-request\t\t\tspq\napplication/scvp-vp-response\t\t\tspp\napplication/sdp\t\t\t\t\tsdp\napplication/set-payment-initiation\t\tsetpay\napplication/set-registration-initiation\t\tsetreg\napplication/shf+xml\t\t\t\tshf\napplication/smil+xml\t\t\t\tsmi smil\napplication/sparql-query\t\t\trq\napplication/sparql-results+xml\t\t\tsrx\napplication/srgs\t\t\t\tgram\napplication/srgs+xml\t\t\t\tgrxml\napplication/sru+xml\t\t\t\tsru\napplication/ssdl+xml\t\t\t\tssdl\napplication/ssml+xml\t\t\t\tssml\napplication/tei+xml\t\t\t\ttei teicorpus\napplication/thraud+xml\t\t\t\ttfi\napplication/timestamped-data\t\t\ttsd\napplication/vnd.3gpp.pic-bw-large\t\tplb\napplication/vnd.3gpp.pic-bw-small\t\tpsb\napplication/vnd.3gpp.pic-bw-var\t\t\tpvb\napplication/vnd.3gpp2.tcap\t\t\ttcap\napplication/vnd.3m.post-it-notes\t\tpwn\napplication/vnd.accpac.simply.aso\t\taso\napplication/vnd.accpac.simply.imp\t\timp\napplication/vnd.acucobol\t\t\tacu\napplication/vnd.acucorp\t\t\t\tatc acutc\napplication/vnd.adobe.air-application-installer-package+zip\tair\napplication/vnd.adobe.formscentral.fcdt\t\tfcdt\napplication/vnd.adobe.fxp\t\t\tfxp fxpl\napplication/vnd.adobe.xdp+xml\t\t\txdp\napplication/vnd.adobe.xfdf\t\t\txfdf\napplication/vnd.ahead.space\t\t\tahead\napplication/vnd.airzip.filesecure.azf\t\tazf\napplication/vnd.airzip.filesecure.azs\t\tazs\napplication/vnd.amazon.ebook\t\t\tazw\napplication/vnd.americandynamics.acc\t\tacc\napplication/vnd.amiga.ami\t\t\tami\napplication/vnd.android.package-archive\t\tapk\napplication/vnd.anser-web-certificate-issue-initiation\tcii\napplication/vnd.anser-web-funds-transfer-initiation\tfti\napplication/vnd.antix.game-component\t\tatx\napplication/vnd.apple.installer+xml\t\tmpkg\napplication/vnd.apple.mpegurl\t\t\tm3u8\napplication/vnd.aristanetworks.swi\t\tswi\napplication/vnd.astraea-software.iota\t\tiota\napplication/vnd.audiograph\t\t\taep\napplication/vnd.blueice.multipass\t\tmpm\napplication/vnd.bmi\t\t\t\tbmi\napplication/vnd.businessobjects\t\t\trep\napplication/vnd.chemdraw+xml\t\t\tcdxml\napplication/vnd.chipnuts.karaoke-mmd\t\tmmd\napplication/vnd.cinderella\t\t\tcdy\napplication/vnd.claymore\t\t\tcla\napplication/vnd.cloanto.rp9\t\t\trp9\napplication/vnd.clonk.c4group\t\t\tc4g c4d c4f c4p c4u\napplication/vnd.cluetrust.cartomobile-config\t\tc11amc\napplication/vnd.cluetrust.cartomobile-config-pkg\tc11amz\napplication/vnd.commonspace\t\t\tcsp\napplication/vnd.contact.cmsg\t\t\tcdbcmsg\napplication/vnd.cosmocaller\t\t\tcmc\napplication/vnd.crick.clicker\t\t\tclkx\napplication/vnd.crick.clicker.keyboard\t\tclkk\napplication/vnd.crick.clicker.palette\t\tclkp\napplication/vnd.crick.clicker.template\t\tclkt\napplication/vnd.crick.clicker.wordbank\t\tclkw\napplication/vnd.criticaltools.wbs+xml\t\twbs\napplication/vnd.ctc-posml\t\t\tpml\napplication/vnd.cups-ppd\t\t\tppd\napplication/vnd.curl.car\t\t\tcar\napplication/vnd.curl.pcurl\t\t\tpcurl\napplication/vnd.dart\t\t\t\tdart\napplication/vnd.data-vision.rdz\t\t\trdz\napplication/vnd.dece.data\t\t\tuvf uvvf uvd uvvd\napplication/vnd.dece.ttml+xml\t\t\tuvt uvvt\napplication/vnd.dece.unspecified\t\tuvx uvvx\napplication/vnd.dece.zip\t\t\tuvz uvvz\napplication/vnd.denovo.fcselayout-link\t\tfe_launch\napplication/vnd.dna\t\t\t\tdna\napplication/vnd.dolby.mlp\t\t\tmlp\napplication/vnd.dpgraph\t\t\t\tdpg\napplication/vnd.dreamfactory\t\t\tdfac\napplication/vnd.ds-keypoint\t\t\tkpxx\napplication/vnd.dvb.ait\t\t\t\tait\napplication/vnd.dvb.service\t\t\tsvc\napplication/vnd.dynageo\t\t\t\tgeo\napplication/vnd.ecowin.chart\t\t\tmag\napplication/vnd.enliven\t\t\t\tnml\napplication/vnd.epson.esf\t\t\tesf\napplication/vnd.epson.msf\t\t\tmsf\napplication/vnd.epson.quickanime\t\tqam\napplication/vnd.epson.salt\t\t\tslt\napplication/vnd.epson.ssf\t\t\tssf\napplication/vnd.eszigno3+xml\t\t\tes3 et3\napplication/vnd.ezpix-album\t\t\tez2\napplication/vnd.ezpix-package\t\t\tez3\napplication/vnd.fdf\t\t\t\tfdf\napplication/vnd.fdsn.mseed\t\t\tmseed\napplication/vnd.fdsn.seed\t\t\tseed dataless\napplication/vnd.flographit\t\t\tgph\napplication/vnd.fluxtime.clip\t\t\tftc\napplication/vnd.framemaker\t\t\tfm frame maker book\napplication/vnd.frogans.fnc\t\t\tfnc\napplication/vnd.frogans.ltf\t\t\tltf\napplication/vnd.fsc.weblaunch\t\t\tfsc\napplication/vnd.fujitsu.oasys\t\t\toas\napplication/vnd.fujitsu.oasys2\t\t\toa2\napplication/vnd.fujitsu.oasys3\t\t\toa3\napplication/vnd.fujitsu.oasysgp\t\t\tfg5\napplication/vnd.fujitsu.oasysprs\t\tbh2\napplication/vnd.fujixerox.ddd\t\t\tddd\napplication/vnd.fujixerox.docuworks\t\txdw\napplication/vnd.fujixerox.docuworks.binder\txbd\napplication/vnd.fuzzysheet\t\t\tfzs\napplication/vnd.genomatix.tuxedo\t\ttxd\napplication/vnd.geogebra.file\t\t\tggb\napplication/vnd.geogebra.tool\t\t\tggt\napplication/vnd.geometry-explorer\t\tgex gre\napplication/vnd.geonext\t\t\t\tgxt\napplication/vnd.geoplan\t\t\t\tg2w\napplication/vnd.geospace\t\t\tg3w\napplication/vnd.gmx\t\t\t\tgmx\napplication/vnd.google-earth.kml+xml\t\tkml\napplication/vnd.google-earth.kmz\t\tkmz\napplication/vnd.grafeq\t\t\t\tgqf gqs\napplication/vnd.groove-account\t\t\tgac\napplication/vnd.groove-help\t\t\tghf\napplication/vnd.groove-identity-message\t\tgim\napplication/vnd.groove-injector\t\t\tgrv\napplication/vnd.groove-tool-message\t\tgtm\napplication/vnd.groove-tool-template\t\ttpl\napplication/vnd.groove-vcard\t\t\tvcg\napplication/vnd.hal+xml\t\t\t\thal\napplication/vnd.handheld-entertainment+xml\tzmm\napplication/vnd.hbci\t\t\t\thbci\napplication/vnd.hhe.lesson-player\t\tles\napplication/vnd.hp-hpgl\t\t\t\thpgl\napplication/vnd.hp-hpid\t\t\t\thpid\napplication/vnd.hp-hps\t\t\t\thps\napplication/vnd.hp-jlyt\t\t\t\tjlt\napplication/vnd.hp-pcl\t\t\t\tpcl\napplication/vnd.hp-pclxl\t\t\tpclxl\napplication/vnd.hydrostatix.sof-data\t\tsfd-hdstx\napplication/vnd.ibm.minipay\t\t\tmpy\napplication/vnd.ibm.modcap\t\t\tafp listafp list3820\napplication/vnd.ibm.rights-management\t\tirm\napplication/vnd.ibm.secure-container\t\tsc\napplication/vnd.iccprofile\t\t\ticc icm\napplication/vnd.igloader\t\t\tigl\napplication/vnd.immervision-ivp\t\t\tivp\napplication/vnd.immervision-ivu\t\t\tivu\napplication/vnd.insors.igm\t\t\tigm\napplication/vnd.intercon.formnet\t\txpw xpx\napplication/vnd.intergeo\t\t\ti2g\napplication/vnd.intu.qbo\t\t\tqbo\napplication/vnd.intu.qfx\t\t\tqfx\napplication/vnd.ipunplugged.rcprofile\t\trcprofile\napplication/vnd.irepository.package+xml\t\tirp\napplication/vnd.is-xpr\t\t\t\txpr\napplication/vnd.isac.fcs\t\t\tfcs\napplication/vnd.jam\t\t\t\tjam\napplication/vnd.jcp.javame.midlet-rms\t\trms\napplication/vnd.jisp\t\t\t\tjisp\napplication/vnd.joost.joda-archive\t\tjoda\napplication/vnd.kahootz\t\t\t\tktz ktr\napplication/vnd.kde.karbon\t\t\tkarbon\napplication/vnd.kde.kchart\t\t\tchrt\napplication/vnd.kde.kformula\t\t\tkfo\napplication/vnd.kde.kivio\t\t\tflw\napplication/vnd.kde.kontour\t\t\tkon\napplication/vnd.kde.kpresenter\t\t\tkpr kpt\napplication/vnd.kde.kspread\t\t\tksp\napplication/vnd.kde.kword\t\t\tkwd kwt\napplication/vnd.kenameaapp\t\t\thtke\napplication/vnd.kidspiration\t\t\tkia\napplication/vnd.kinar\t\t\t\tkne knp\napplication/vnd.koan\t\t\t\tskp skd skt skm\napplication/vnd.kodak-descriptor\t\tsse\napplication/vnd.las.las+xml\t\t\tlasxml\napplication/vnd.llamagraphics.life-balance.desktop\tlbd\napplication/vnd.llamagraphics.life-balance.exchange+xml\tlbe\napplication/vnd.lotus-1-2-3\t\t\t123\napplication/vnd.lotus-approach\t\t\tapr\napplication/vnd.lotus-freelance\t\t\tpre\napplication/vnd.lotus-notes\t\t\tnsf\napplication/vnd.lotus-organizer\t\t\torg\napplication/vnd.lotus-screencam\t\t\tscm\napplication/vnd.lotus-wordpro\t\t\tlwp\napplication/vnd.macports.portpkg\t\tportpkg\napplication/vnd.mcd\t\t\t\tmcd\napplication/vnd.medcalcdata\t\t\tmc1\napplication/vnd.mediastation.cdkey\t\tcdkey\napplication/vnd.mfer\t\t\t\tmwf\napplication/vnd.mfmp\t\t\t\tmfm\napplication/vnd.micrografx.flo\t\t\tflo\napplication/vnd.micrografx.igx\t\t\tigx\napplication/vnd.mif\t\t\t\tmif\napplication/vnd.mobius.daf\t\t\tdaf\napplication/vnd.mobius.dis\t\t\tdis\napplication/vnd.mobius.mbk\t\t\tmbk\napplication/vnd.mobius.mqy\t\t\tmqy\napplication/vnd.mobius.msl\t\t\tmsl\napplication/vnd.mobius.plc\t\t\tplc\napplication/vnd.mobius.txf\t\t\ttxf\napplication/vnd.mophun.application\t\tmpn\napplication/vnd.mophun.certificate\t\tmpc\napplication/vnd.mozilla.xul+xml\t\t\txul\napplication/vnd.ms-artgalry\t\t\tcil\napplication/vnd.ms-cab-compressed\t\tcab\napplication/vnd.ms-excel\t\t\txls xlm xla xlc xlt xlw\napplication/vnd.ms-excel.addin.macroenabled.12\t\txlam\napplication/vnd.ms-excel.sheet.binary.macroenabled.12\txlsb\napplication/vnd.ms-excel.sheet.macroenabled.12\t\txlsm\napplication/vnd.ms-excel.template.macroenabled.12\txltm\napplication/vnd.ms-fontobject\t\t\teot\napplication/vnd.ms-htmlhelp\t\t\tchm\napplication/vnd.ms-ims\t\t\t\tims\napplication/vnd.ms-lrm\t\t\t\tlrm\napplication/vnd.ms-officetheme\t\t\tthmx\napplication/vnd.ms-pki.seccat\t\t\tcat\napplication/vnd.ms-pki.stl\t\t\tstl\napplication/vnd.ms-powerpoint\t\t\tppt pps pot\napplication/vnd.ms-powerpoint.addin.macroenabled.12\t\tppam\napplication/vnd.ms-powerpoint.presentation.macroenabled.12\tpptm\napplication/vnd.ms-powerpoint.slide.macroenabled.12\t\tsldm\napplication/vnd.ms-powerpoint.slideshow.macroenabled.12\t\tppsm\napplication/vnd.ms-powerpoint.template.macroenabled.12\t\tpotm\napplication/vnd.ms-project\t\t\tmpp mpt\napplication/vnd.ms-word.document.macroenabled.12\tdocm\napplication/vnd.ms-word.template.macroenabled.12\tdotm\napplication/vnd.ms-works\t\t\twps wks wcm wdb\napplication/vnd.ms-wpl\t\t\t\twpl\napplication/vnd.ms-xpsdocument\t\t\txps\napplication/vnd.mseq\t\t\t\tmseq\napplication/vnd.musician\t\t\tmus\napplication/vnd.muvee.style\t\t\tmsty\napplication/vnd.mynfc\t\t\t\ttaglet\napplication/vnd.neurolanguage.nlu\t\tnlu\napplication/vnd.nitf\t\t\t\tntf nitf\napplication/vnd.noblenet-directory\t\tnnd\napplication/vnd.noblenet-sealer\t\t\tnns\napplication/vnd.noblenet-web\t\t\tnnw\napplication/vnd.nokia.n-gage.data\t\tngdat\napplication/vnd.nokia.n-gage.symbian.install\tn-gage\napplication/vnd.nokia.radio-preset\t\trpst\napplication/vnd.nokia.radio-presets\t\trpss\napplication/vnd.novadigm.edm\t\t\tedm\napplication/vnd.novadigm.edx\t\t\tedx\napplication/vnd.novadigm.ext\t\t\text\napplication/vnd.oasis.opendocument.chart\t\todc\napplication/vnd.oasis.opendocument.chart-template\totc\napplication/vnd.oasis.opendocument.database\t\todb\napplication/vnd.oasis.opendocument.formula\t\todf\napplication/vnd.oasis.opendocument.formula-template\todft\napplication/vnd.oasis.opendocument.graphics\t\todg\napplication/vnd.oasis.opendocument.graphics-template\totg\napplication/vnd.oasis.opendocument.image\t\todi\napplication/vnd.oasis.opendocument.image-template\toti\napplication/vnd.oasis.opendocument.presentation\t\todp\napplication/vnd.oasis.opendocument.presentation-template\totp\napplication/vnd.oasis.opendocument.spreadsheet\t\tods\napplication/vnd.oasis.opendocument.spreadsheet-template\tots\napplication/vnd.oasis.opendocument.text\t\t\todt\napplication/vnd.oasis.opendocument.text-master\t\todm\napplication/vnd.oasis.opendocument.text-template\tott\napplication/vnd.oasis.opendocument.text-web\t\toth\napplication/vnd.olpc-sugar\t\t\txo\napplication/vnd.oma.dd2+xml\t\t\tdd2\napplication/vnd.openofficeorg.extension\t\toxt\napplication/vnd.openxmlformats-officedocument.presentationml.presentation\tpptx\napplication/vnd.openxmlformats-officedocument.presentationml.slide\tsldx\napplication/vnd.openxmlformats-officedocument.presentationml.slideshow\tppsx\napplication/vnd.openxmlformats-officedocument.presentationml.template\tpotx\napplication/vnd.openxmlformats-officedocument.spreadsheetml.sheet\txlsx\napplication/vnd.openxmlformats-officedocument.spreadsheetml.template\txltx\napplication/vnd.openxmlformats-officedocument.wordprocessingml.document\tdocx\napplication/vnd.openxmlformats-officedocument.wordprocessingml.template\tdotx\napplication/vnd.osgeo.mapguide.package\t\tmgp\napplication/vnd.osgi.dp\t\t\t\tdp\napplication/vnd.osgi.subsystem\t\t\tesa\napplication/vnd.palm\t\t\t\tpdb pqa oprc\napplication/vnd.pawaafile\t\t\tpaw\napplication/vnd.pg.format\t\t\tstr\napplication/vnd.pg.osasli\t\t\tei6\napplication/vnd.picsel\t\t\t\tefif\napplication/vnd.pmi.widget\t\t\twg\napplication/vnd.pocketlearn\t\t\tplf\napplication/vnd.powerbuilder6\t\t\tpbd\napplication/vnd.previewsystems.box\t\tbox\napplication/vnd.proteus.magazine\t\tmgz\napplication/vnd.publishare-delta-tree\t\tqps\napplication/vnd.pvi.ptid1\t\t\tptid\napplication/vnd.quark.quarkxpress\t\tqxd qxt qwd qwt qxl qxb\napplication/vnd.realvnc.bed\t\t\tbed\napplication/vnd.recordare.musicxml\t\tmxl\napplication/vnd.recordare.musicxml+xml\t\tmusicxml\napplication/vnd.rig.cryptonote\t\t\tcryptonote\napplication/vnd.rim.cod\t\t\t\tcod\napplication/vnd.rn-realmedia\t\t\trm\napplication/vnd.rn-realmedia-vbr\t\trmvb\napplication/vnd.route66.link66+xml\t\tlink66\napplication/vnd.sailingtracker.track\t\tst\napplication/vnd.seemail\t\t\t\tsee\napplication/vnd.sema\t\t\t\tsema\napplication/vnd.semd\t\t\t\tsemd\napplication/vnd.semf\t\t\t\tsemf\napplication/vnd.shana.informed.formdata\t\tifm\napplication/vnd.shana.informed.formtemplate\titp\napplication/vnd.shana.informed.interchange\tiif\napplication/vnd.shana.informed.package\t\tipk\napplication/vnd.simtech-mindmapper\t\ttwd twds\napplication/vnd.smaf\t\t\t\tmmf\napplication/vnd.smart.teacher\t\t\tteacher\napplication/vnd.solent.sdkm+xml\t\t\tsdkm sdkd\napplication/vnd.spotfire.dxp\t\t\tdxp\napplication/vnd.spotfire.sfs\t\t\tsfs\napplication/vnd.stardivision.calc\t\tsdc\napplication/vnd.stardivision.draw\t\tsda\napplication/vnd.stardivision.impress\t\tsdd\napplication/vnd.stardivision.math\t\tsmf\napplication/vnd.stardivision.writer\t\tsdw vor\napplication/vnd.stardivision.writer-global\tsgl\napplication/vnd.stepmania.package\t\tsmzip\napplication/vnd.stepmania.stepchart\t\tsm\napplication/vnd.sun.xml.calc\t\t\tsxc\napplication/vnd.sun.xml.calc.template\t\tstc\napplication/vnd.sun.xml.draw\t\t\tsxd\napplication/vnd.sun.xml.draw.template\t\tstd\napplication/vnd.sun.xml.impress\t\t\tsxi\napplication/vnd.sun.xml.impress.template\tsti\napplication/vnd.sun.xml.math\t\t\tsxm\napplication/vnd.sun.xml.writer\t\t\tsxw\napplication/vnd.sun.xml.writer.global\t\tsxg\napplication/vnd.sun.xml.writer.template\t\tstw\napplication/vnd.sus-calendar\t\t\tsus susp\napplication/vnd.svd\t\t\t\tsvd\napplication/vnd.symbian.install\t\t\tsis sisx\napplication/vnd.syncml+xml\t\t\txsm\napplication/vnd.syncml.dm+wbxml\t\t\tbdm\napplication/vnd.syncml.dm+xml\t\t\txdm\napplication/vnd.tao.intent-module-archive\ttao\napplication/vnd.tcpdump.pcap\t\t\tpcap cap dmp\napplication/vnd.tmobile-livetv\t\t\ttmo\napplication/vnd.trid.tpt\t\t\ttpt\napplication/vnd.triscape.mxs\t\t\tmxs\napplication/vnd.trueapp\t\t\t\ttra\napplication/vnd.ufdl\t\t\t\tufd ufdl\napplication/vnd.uiq.theme\t\t\tutz\napplication/vnd.umajin\t\t\t\tumj\napplication/vnd.unity\t\t\t\tunityweb\napplication/vnd.uoml+xml\t\t\tuoml\napplication/vnd.vcx\t\t\t\tvcx\napplication/vnd.visio\t\t\t\tvsd vst vss vsw\napplication/vnd.visionary\t\t\tvis\napplication/vnd.vsf\t\t\t\tvsf\napplication/vnd.wap.wbxml\t\t\twbxml\napplication/vnd.wap.wmlc\t\t\twmlc\napplication/vnd.wap.wmlscriptc\t\t\twmlsc\napplication/vnd.webturbo\t\t\twtb\napplication/vnd.wolfram.player\t\t\tnbp\napplication/vnd.wordperfect\t\t\twpd\napplication/vnd.wqd\t\t\t\twqd\napplication/vnd.wt.stf\t\t\t\tstf\napplication/vnd.xara\t\t\t\txar\napplication/vnd.xfdl\t\t\t\txfdl\napplication/vnd.yamaha.hv-dic\t\t\thvd\napplication/vnd.yamaha.hv-script\t\thvs\napplication/vnd.yamaha.hv-voice\t\t\thvp\napplication/vnd.yamaha.openscoreformat\t\t\tosf\napplication/vnd.yamaha.openscoreformat.osfpvg+xml\tosfpvg\napplication/vnd.yamaha.smaf-audio\t\tsaf\napplication/vnd.yamaha.smaf-phrase\t\tspf\napplication/vnd.yellowriver-custom-menu\t\tcmp\napplication/vnd.zul\t\t\t\tzir zirz\napplication/vnd.zzazz.deck+xml\t\t\tzaz\napplication/voicexml+xml\t\t\tvxml\napplication/wasm\t\t\t\twasm\napplication/widget\t\t\t\twgt\napplication/winhlp\t\t\t\thlp\napplication/wsdl+xml\t\t\t\twsdl\napplication/wspolicy+xml\t\t\twspolicy\napplication/x-7z-compressed\t\t\t7z\napplication/x-abiword\t\t\t\tabw\napplication/x-ace-compressed\t\t\tace\napplication/x-apple-diskimage\t\t\tdmg\napplication/x-authorware-bin\t\t\taab x32 u32 vox\napplication/x-authorware-map\t\t\taam\napplication/x-authorware-seg\t\t\taas\napplication/x-bcpio\t\t\t\tbcpio\napplication/x-bittorrent\t\t\ttorrent\napplication/x-blorb\t\t\t\tblb blorb\napplication/x-bzip\t\t\t\tbz\napplication/x-bzip2\t\t\t\tbz2 boz\napplication/x-cbr\t\t\t\tcbr cba cbt cbz cb7\napplication/x-cdlink\t\t\t\tvcd\napplication/x-cfs-compressed\t\t\tcfs\napplication/x-chat\t\t\t\tchat\napplication/x-chess-pgn\t\t\t\tpgn\napplication/x-conference\t\t\tnsc\napplication/x-cpio\t\t\t\tcpio\napplication/x-csh\t\t\t\tcsh\napplication/x-debian-package\t\t\tdeb udeb\napplication/x-dgc-compressed\t\t\tdgc\napplication/x-director\t\t\tdir dcr dxr cst cct cxt w3d fgd swa\napplication/x-doom\t\t\t\twad\napplication/x-dtbncx+xml\t\t\tncx\napplication/x-dtbook+xml\t\t\tdtb\napplication/x-dtbresource+xml\t\t\tres\napplication/x-dvi\t\t\t\tdvi\napplication/x-envoy\t\t\t\tevy\napplication/x-eva\t\t\t\teva\napplication/x-font-bdf\t\t\t\tbdf\napplication/x-font-ghostscript\t\t\tgsf\napplication/x-font-linux-psf\t\t\tpsf\napplication/x-font-pcf\t\t\t\tpcf\napplication/x-font-snf\t\t\t\tsnf\napplication/x-font-type1\t\t\tpfa pfb pfm afm\napplication/x-freearc\t\t\t\tarc\napplication/x-futuresplash\t\t\tspl\napplication/x-gca-compressed\t\t\tgca\napplication/x-glulx\t\t\t\tulx\napplication/x-gnumeric\t\t\t\tgnumeric\napplication/x-gramps-xml\t\t\tgramps\napplication/x-gtar\t\t\t\tgtar\napplication/x-hdf\t\t\t\thdf\napplication/x-install-instructions\t\tinstall\napplication/x-iso9660-image\t\t\tiso\napplication/x-java-jnlp-file\t\t\tjnlp\napplication/x-latex\t\t\t\tlatex\napplication/x-lzh-compressed\t\t\tlzh lha\napplication/x-mie\t\t\t\tmie\napplication/x-mobipocket-ebook\t\t\tprc mobi\napplication/x-ms-application\t\t\tapplication\napplication/x-ms-shortcut\t\t\tlnk\napplication/x-ms-wmd\t\t\t\twmd\napplication/x-ms-wmz\t\t\t\twmz\napplication/x-ms-xbap\t\t\t\txbap\napplication/x-msaccess\t\t\t\tmdb\napplication/x-msbinder\t\t\t\tobd\napplication/x-mscardfile\t\t\tcrd\napplication/x-msclip\t\t\t\tclp\napplication/x-msdownload\t\t\texe dll com bat msi\napplication/x-msmediaview\t\t\tmvb m13 m14\napplication/x-msmetafile\t\t\twmf wmz emf emz\napplication/x-msmoney\t\t\t\tmny\napplication/x-mspublisher\t\t\tpub\napplication/x-msschedule\t\t\tscd\napplication/x-msterminal\t\t\ttrm\napplication/x-mswrite\t\t\t\twri\napplication/x-netcdf\t\t\t\tnc cdf\napplication/x-nzb\t\t\t\tnzb\napplication/x-pkcs12\t\t\t\tp12 pfx\napplication/x-pkcs7-certificates\t\tp7b spc\napplication/x-pkcs7-certreqresp\t\t\tp7r\napplication/x-rar-compressed\t\t\trar\napplication/x-research-info-systems\t\tris\napplication/x-sh\t\t\t\tsh\napplication/x-shar\t\t\t\tshar\napplication/x-shockwave-flash\t\t\tswf\napplication/x-silverlight-app\t\t\txap\napplication/x-sql\t\t\t\tsql\napplication/x-stuffit\t\t\t\tsit\napplication/x-stuffitx\t\t\t\tsitx\napplication/x-subrip\t\t\t\tsrt\napplication/x-sv4cpio\t\t\t\tsv4cpio\napplication/x-sv4crc\t\t\t\tsv4crc\napplication/x-t3vm-image\t\t\tt3\napplication/x-tads\t\t\t\tgam\napplication/x-tar\t\t\t\ttar\napplication/x-tcl\t\t\t\ttcl\napplication/x-tex\t\t\t\ttex\napplication/x-tex-tfm\t\t\t\ttfm\napplication/x-texinfo\t\t\t\ttexinfo texi\napplication/x-tgif\t\t\t\tobj\napplication/x-ustar\t\t\t\tustar\napplication/x-wais-source\t\t\tsrc\napplication/x-x509-ca-cert\t\t\tder crt\napplication/x-xfig\t\t\t\tfig\napplication/x-xliff+xml\t\t\t\txlf\napplication/x-xpinstall\t\t\t\txpi\napplication/x-xz\t\t\t\txz\napplication/x-zmachine\t\t\t\tz1 z2 z3 z4 z5 z6 z7 z8\napplication/xaml+xml\t\t\t\txaml\napplication/xcap-diff+xml\t\t\txdf\napplication/xenc+xml\t\t\t\txenc\napplication/xhtml+xml\t\t\t\txhtml xht\napplication/xml\t\t\t\t\txml xsl\napplication/xml-dtd\t\t\t\tdtd\napplication/xop+xml\t\t\t\txop\napplication/xproc+xml\t\t\t\txpl\napplication/xslt+xml\t\t\t\txslt\napplication/xspf+xml\t\t\t\txspf\napplication/xv+xml\t\t\t\tmxml xhvml xvml xvm\napplication/yang\t\t\t\tyang\napplication/yin+xml\t\t\t\tyin\napplication/zip\t\t\t\t\tzip\naudio/adpcm\t\t\t\t\tadp\naudio/basic\t\t\t\t\tau snd\naudio/midi\t\t\t\t\tmid midi kar rmi\naudio/mp4\t\t\t\t\tm4a mp4a\naudio/mpeg\t\t\t\t\tmpga mp2 mp2a mp3 m2a m3a\naudio/ogg\t\t\t\t\toga ogg spx\naudio/s3m\t\t\t\t\ts3m\naudio/silk\t\t\t\t\tsil\naudio/vnd.dece.audio\t\t\t\tuva uvva\naudio/vnd.digital-winds\t\t\t\teol\naudio/vnd.dra\t\t\t\t\tdra\naudio/vnd.dts\t\t\t\t\tdts\naudio/vnd.dts.hd\t\t\t\tdtshd\naudio/vnd.lucent.voice\t\t\t\tlvp\naudio/vnd.ms-playready.media.pya\t\tpya\naudio/vnd.nuera.ecelp4800\t\t\tecelp4800\naudio/vnd.nuera.ecelp7470\t\t\tecelp7470\naudio/vnd.nuera.ecelp9600\t\t\tecelp9600\naudio/vnd.rip\t\t\t\t\trip\naudio/webm\t\t\t\t\tweba\naudio/x-aac\t\t\t\t\taac\naudio/x-aiff\t\t\t\t\taif aiff aifc\naudio/x-caf\t\t\t\t\tcaf\naudio/x-flac\t\t\t\t\tflac\naudio/x-matroska\t\t\t\tmka\naudio/x-mpegurl\t\t\t\t\tm3u\naudio/x-ms-wax\t\t\t\t\twax\naudio/x-ms-wma\t\t\t\t\twma\naudio/x-pn-realaudio\t\t\t\tram ra\naudio/x-pn-realaudio-plugin\t\t\trmp\naudio/x-wav\t\t\t\t\twav\naudio/xm\t\t\t\t\txm\nchemical/x-cdx\t\t\t\t\tcdx\nchemical/x-cif\t\t\t\t\tcif\nchemical/x-cmdf\t\t\t\t\tcmdf\nchemical/x-cml\t\t\t\t\tcml\nchemical/x-csml\t\t\t\t\tcsml\nchemical/x-xyz\t\t\t\t\txyz\nfont/collection\t\t\t\t\tttc\nfont/otf\t\t\t\t\totf\nfont/ttf\t\t\t\t\tttf\nfont/woff\t\t\t\t\twoff\nfont/woff2\t\t\t\t\twoff2\nimage/bmp\t\t\t\t\tbmp\nimage/cgm\t\t\t\t\tcgm\nimage/g3fax\t\t\t\t\tg3\nimage/gif\t\t\t\t\tgif\nimage/ief\t\t\t\t\tief\nimage/jpeg\t\t\t\t\tjpeg jpg jpe\nimage/ktx\t\t\t\t\tktx\nimage/png\t\t\t\t\tpng\nimage/prs.btif\t\t\t\t\tbtif\nimage/sgi\t\t\t\t\tsgi\nimage/svg+xml\t\t\t\t\tsvg svgz\nimage/tiff\t\t\t\t\ttiff tif\nimage/vnd.adobe.photoshop\t\t\tpsd\nimage/vnd.dece.graphic\t\t\t\tuvi uvvi uvg uvvg\nimage/vnd.djvu\t\t\t\t\tdjvu djv\nimage/vnd.dvb.subtitle\t\t\t\tsub\nimage/vnd.dwg\t\t\t\t\tdwg\nimage/vnd.dxf\t\t\t\t\tdxf\nimage/vnd.fastbidsheet\t\t\t\tfbs\nimage/vnd.fpx\t\t\t\t\tfpx\nimage/vnd.fst\t\t\t\t\tfst\nimage/vnd.fujixerox.edmics-mmr\t\t\tmmr\nimage/vnd.fujixerox.edmics-rlc\t\t\trlc\nimage/vnd.ms-modi\t\t\t\tmdi\nimage/vnd.ms-photo\t\t\t\twdp\nimage/vnd.net-fpx\t\t\t\tnpx\nimage/vnd.wap.wbmp\t\t\t\twbmp\nimage/vnd.xiff\t\t\t\t\txif\nimage/webp\t\t\t\t\twebp\nimage/x-3ds\t\t\t\t\t3ds\nimage/x-cmu-raster\t\t\t\tras\nimage/x-cmx\t\t\t\t\tcmx\nimage/x-freehand\t\t\t\tfh fhc fh4 fh5 fh7\nimage/x-icon\t\t\t\t\tico\nimage/x-mrsid-image\t\t\t\tsid\nimage/x-pcx\t\t\t\t\tpcx\nimage/x-pict\t\t\t\t\tpic pct\nimage/x-portable-anymap\t\t\t\tpnm\nimage/x-portable-bitmap\t\t\t\tpbm\nimage/x-portable-graymap\t\t\tpgm\nimage/x-portable-pixmap\t\t\t\tppm\nimage/x-rgb\t\t\t\t\trgb\nimage/x-tga\t\t\t\t\ttga\nimage/x-xbitmap\t\t\t\t\txbm\nimage/x-xpixmap\t\t\t\t\txpm\nimage/x-xwindowdump\t\t\t\txwd\nmessage/rfc822\t\t\t\t\teml mime\nmodel/iges\t\t\t\t\tigs iges\nmodel/mesh\t\t\t\t\tmsh mesh silo\nmodel/vnd.collada+xml\t\t\t\tdae\nmodel/vnd.dwf\t\t\t\t\tdwf\nmodel/vnd.gdl\t\t\t\t\tgdl\nmodel/vnd.gtw\t\t\t\t\tgtw\nmodel/vnd.mts\t\t\t\t\tmts\nmodel/vnd.vtu\t\t\t\t\tvtu\nmodel/vrml\t\t\t\t\twrl vrml\nmodel/x3d+binary\t\t\t\tx3db x3dbz\nmodel/x3d+vrml\t\t\t\t\tx3dv x3dvz\nmodel/x3d+xml\t\t\t\t\tx3d x3dz\ntext/cache-manifest\t\t\t\tappcache\ntext/calendar\t\t\t\t\tics ifb\ntext/css\t\t\t\t\tcss\ntext/csv\t\t\t\t\tcsv\ntext/html\t\t\t\t\thtml htm\ntext/n3\t\t\t\t\t\tn3\ntext/plain\t\t\t\t\ttxt text conf def list log in\ntext/prs.lines.tag\t\t\t\tdsc\ntext/richtext\t\t\t\t\trtx\ntext/sgml\t\t\t\t\tsgml sgm\ntext/tab-separated-values\t\t\ttsv\ntext/troff\t\t\t\t\tt tr roff man me ms\ntext/turtle\t\t\t\t\tttl\ntext/uri-list\t\t\t\t\turi uris urls\ntext/vcard\t\t\t\t\tvcard\ntext/vnd.curl\t\t\t\t\tcurl\ntext/vnd.curl.dcurl\t\t\t\tdcurl\ntext/vnd.curl.mcurl\t\t\t\tmcurl\ntext/vnd.curl.scurl\t\t\t\tscurl\ntext/vnd.dvb.subtitle\t\t\t\tsub\ntext/vnd.fly\t\t\t\t\tfly\ntext/vnd.fmi.flexstor\t\t\t\tflx\ntext/vnd.graphviz\t\t\t\tgv\ntext/vnd.in3d.3dml\t\t\t\t3dml\ntext/vnd.in3d.spot\t\t\t\tspot\ntext/vnd.sun.j2me.app-descriptor\t\tjad\ntext/vnd.wap.wml\t\t\t\twml\ntext/vnd.wap.wmlscript\t\t\t\twmls\ntext/x-asm\t\t\t\t\ts asm\ntext/x-c\t\t\t\t\tc cc cxx cpp h hh dic\ntext/x-fortran\t\t\t\t\tf for f77 f90\ntext/x-java-source\t\t\t\tjava\ntext/x-nfo\t\t\t\t\tnfo\ntext/x-opml\t\t\t\t\topml\ntext/x-pascal\t\t\t\t\tp pas\ntext/x-setext\t\t\t\t\tetx\ntext/x-sfv\t\t\t\t\tsfv\ntext/x-uuencode\t\t\t\t\tuu\ntext/x-vcalendar\t\t\t\tvcs\ntext/x-vcard\t\t\t\t\tvcf\nvideo/3gpp\t\t\t\t\t3gp\nvideo/3gpp2\t\t\t\t\t3g2\nvideo/h261\t\t\t\t\th261\nvideo/h263\t\t\t\t\th263\nvideo/h264\t\t\t\t\th264\nvideo/jpeg\t\t\t\t\tjpgv\nvideo/jpm\t\t\t\t\tjpm jpgm\nvideo/mj2\t\t\t\t\tmj2 mjp2\nvideo/mp4\t\t\t\t\tmp4 mp4v mpg4\nvideo/mpeg\t\t\t\t\tmpeg mpg mpe m1v m2v\nvideo/ogg\t\t\t\t\togv\nvideo/quicktime\t\t\t\t\tqt mov\nvideo/vnd.dece.hd\t\t\t\tuvh uvvh\nvideo/vnd.dece.mobile\t\t\t\tuvm uvvm\nvideo/vnd.dece.pd\t\t\t\tuvp uvvp\nvideo/vnd.dece.sd\t\t\t\tuvs uvvs\nvideo/vnd.dece.video\t\t\t\tuvv uvvv\nvideo/vnd.dvb.file\t\t\t\tdvb\nvideo/vnd.fvt\t\t\t\t\tfvt\nvideo/vnd.mpegurl\t\t\t\tmxu m4u\nvideo/vnd.ms-playready.media.pyv\t\tpyv\nvideo/vnd.uvvu.mp4\t\t\t\tuvu uvvu\nvideo/vnd.vivo\t\t\t\t\tviv\nvideo/webm\t\t\t\t\twebm\nvideo/x-f4v\t\t\t\t\tf4v\nvideo/x-fli\t\t\t\t\tfli\nvideo/x-flv\t\t\t\t\tflv\nvideo/x-m4v\t\t\t\t\tm4v\nvideo/x-matroska\t\t\t\tmkv mk3d mks\nvideo/x-mng\t\t\t\t\tmng\nvideo/x-ms-asf\t\t\t\t\tasf asx\nvideo/x-ms-vob\t\t\t\t\tvob\nvideo/x-ms-wm\t\t\t\t\twm\nvideo/x-ms-wmv\t\t\t\t\twmv\nvideo/x-ms-wmx\t\t\t\t\twmx\nvideo/x-ms-wvx\t\t\t\t\twvx\nvideo/x-msvideo\t\t\t\t\tavi\nvideo/x-sgi-movie\t\t\t\tmovie\nvideo/x-smv\t\t\t\t\tsmv\nx-conference/x-cooltalk\t\t\t\tice\n";

const map = new Map();

mime_raw.split('\n').forEach((row) => {
	const match = /(.+?)\t+(.+)/.exec(row);
	if (!match) return;

	const type = match[1];
	const extensions = match[2].split(' ');

	extensions.forEach(ext => {
		map.set(ext, type);
	});
});

function lookup$2(file) {
	const match = /\.([^\.]+)$/.exec(file);
	return match && map.get(match[1]);
}

function middleware(opts


 = {}) {
	const { session, ignore } = opts;

	let emitted_basepath = false;

	return compose_handlers(ignore, [
		(req, res, next) => {
			if (req.baseUrl === undefined) {
				let { originalUrl } = req;
				if (req.url === '/' && originalUrl[originalUrl.length - 1] !== '/') {
					originalUrl += '/';
				}

				req.baseUrl = originalUrl
					? originalUrl.slice(0, -req.url.length)
					: '';
			}

			if (!emitted_basepath && process.send) {
				process.send({
					__sapper__: true,
					event: 'basepath',
					basepath: req.baseUrl
				});

				emitted_basepath = true;
			}

			if (req.path === undefined) {
				req.path = req.url.replace(/\?.*/, '');
			}

			next();
		},

		fs.existsSync(path.join(build_dir, 'service-worker.js')) && serve({
			pathname: '/service-worker.js',
			cache_control: 'no-cache, no-store, must-revalidate'
		}),

		fs.existsSync(path.join(build_dir, 'service-worker.js.map')) && serve({
			pathname: '/service-worker.js.map',
			cache_control: 'no-cache, no-store, must-revalidate'
		}),

		serve({
			prefix: '/client/',
			cache_control:  'max-age=31536000, immutable'
		}),

		get_server_route_handler(manifest.server_routes),

		get_page_handler(manifest, session || noop$1)
	].filter(Boolean));
}

function compose_handlers(ignore, handlers) {
	const total = handlers.length;

	function nth_handler(n, req, res, next) {
		if (n >= total) {
			return next();
		}

		handlers[n](req, res, () => nth_handler(n+1, req, res, next));
	}

	return !ignore
		? (req, res, next) => nth_handler(0, req, res, next)
		: (req, res, next) => {
			if (should_ignore(req.path, ignore)) {
				next();
			} else {
				nth_handler(0, req, res, next);
			}
		};
}

function should_ignore(uri, val) {
	if (Array.isArray(val)) return val.some(x => should_ignore(uri, x));
	if (val instanceof RegExp) return val.test(uri);
	if (typeof val === 'function') return val(uri);
	return uri.startsWith(val.charCodeAt(0) === 47 ? val : `/${val}`);
}

function serve({ prefix, pathname, cache_control }



) {
	const filter = pathname
		? (req) => req.path === pathname
		: (req) => req.path.startsWith(prefix);

	const cache = new Map();

	const read =  (file) => (cache.has(file) ? cache : cache.set(file, fs.readFileSync(path.resolve(build_dir, file)))).get(file);

	return (req, res, next) => {
		if (filter(req)) {
			const type = lookup$2(req.path);

			try {
				const file = decodeURIComponent(req.path.slice(1));
				const data = read(file);

				res.setHeader('Content-Type', type);
				res.setHeader('Cache-Control', cache_control);
				res.end(data);
			} catch (err) {
				res.statusCode = 404;
				res.end('not found');
			}
		} else {
			next();
		}
	};
}

function noop$1(){}

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

polka() // You can also use Express
	.use(
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		middleware()
	)
	.listen(PORT, err => {
		if (err) console.log('error', err);
	});
