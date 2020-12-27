## Textpattern Theme Development

This is a development set-up for a textpattern site which was inspired by this Textpattern forum post: https://forum.textpattern.com/viewtopic.php?pid=315426#p315426

With this set-up you can build static HTML pages with SCSS and Typescript support which do serve as page templates for your Textpattern theme later.
So simply start creating a base HTML site first and integrate its partials into your textpattern theme afterwards.

### How to start

#### Installation

Clone this repository and run `yarn install` to install all dependencies.

In the file `./theme-configuration.js` add the folder name of your theme in `themeName`.
In the file `src/txp-theme/manifest.json` change all relevant information about your new theme.

Download the latest Textpattern release from this site: https://textpattern.com/start/

Install textpattern in the folder `public` and serve the site with a local apache server like for example [Mamp](https://www.mamp.info).

In the Textpattern admin panel "Design" import your Textpattern theme you just named above from the local disc.
Assign all sections to your new theme.

Download the plugin `etc_flat` from the forum´s site: https://forum.textpattern.com/viewtopic.php?id=48528
Install and enable the plugin in the Textpattern plugins panel and set the mode of your textpattern site to either "debug" or "test".

That´s it. Now you can start developing your static HTML and port everythng into your theme's pagfes and forms.
Or skip the static HTML if you do not need this and integrate your new theme directly.


### Static HTML pages Development

This starter kit comes with a simple HTML pages set-up which compiles SCSS to CSS, supports custom fonts which are served from the local server, suppports background images in SCSS and transpiles TypeScript into JavaScript which is injected in a final bundle into the pages as well.

#### Develop

Run `yarn start` to start the Webpack-Dev-Server which opens the index html file and the corresponding transpiled JavaScript and CSS files on `localhost:8080`.

The Webpack-Dev-Server detects any changes on the source files which can be found in `src/ts/` for Typescript, `src/sass` for SCSS and `src/templates` for HTML, compiles the files again and reloads the site on `localhost:8080` accordingly.

#### Build

Running `yarn build` will compile all files and move them in a minified and compressed version to the folder `public/assets`.

#### Linting

Run `yarn lint` to detect (and auto-fix) TypeScript and JavaScript errors.

Run `yarn stylelint` to detect (and auto-fix) SCSS errors.

### Textpattern Theme Development

#### Develop

Run the local webback server with `yarn start`.

Now it is the time to integrate your static HTML into your textpattern theme.
As a starting point you will find the files of the [textpattern default theme](https://github.com/textpattern/textpattern-default-theme/tree/master/dist/four-point-nine) in the folder `src/txp-theme`.
These files simply provide you with hints where to start when integrating your HTML into textpattern pages and forms.

If any of the files in `src/txp-theme` are changed, webpack will copy over these files into `public/themes/<your-theme-name>`.

The plugin `etc_flat` will trigger a reload of the textpattern site in your open browser as soon as a theme file is changed
**=> hot reloading for TXP  is enabled !** 

#### Build

When you are done with developing your textpattern theme, go to the textpattern admin panel "Design" 

