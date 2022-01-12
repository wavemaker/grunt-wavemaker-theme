INSTRUCTIONS
============

Install Prerequisites
--------

* Node.js v10.17.x+

You can check if you have Node and npm installed by typing:
<pre>
$ node --version && npm --version
</pre>

If you need to upgrade or install Node, the easiest way is to use an installer for your platform. Download the .msi for Windows or .pkg for Mac from the [NodeJS website](https://nodejs.org/download/).

* Git
You can check if you have Git installed by typing:
<pre>
$ git --version
</pre>
If you don't have Git, grab the installers from the [git website](http://git-scm.com/).


Install Grunt & Bower
--------

Once you’ve got Node installed, install the Grunt and Bower:
<pre>
$ npm install --g bower grunt-cli
</pre>

(Make sure above commands execute with sudo/administrator permissions depending on OS eg, UNIX)

Setup WaveMaker Theme Repository
--------
To clone the grunt-wavemaker-theme repository, use git clone:

<pre>
 git clone https://github.com/wavemaker/grunt-wavemaker-theme.git
 cd grunt-wavemaker-theme
 npm install
</pre>

Understanding the Repository
--------
<pre>
+--src
|  +--web
|     +--style.less
|     +--variable.less
|     +--.wmproject.properties
|     +--theme.png
|     +--fonts/
|  +--mobile
|     +--android
|        +--style.less
|        +--variable.less
|        +--fonts/
|     +--ios
|        +--style.less
|        +--variable.less
|        +--fonts/
|     +.wmproject.properties
|     +theme.png
|  +--bootswatch
|     +--style.less
|     +--variable.less
|     +--bootswatch.less
|     +--.wmproject.properties
|     +--theme.png
|     +--fonts/
+--dist
|  +--web.zip
|  +--mobile.zip
|  +--bootswatch.zip
+--Gruntfile.js
|
+--package.json
|
+--bower.json
</pre>

Fonts
-----
There will be references to Roboto regular fonts in the variables.less(src/web), to avail them please download Roboto regular fonts and paste them in fonts directory(src/web/fonts).

Build
--------
To build the WaveMaker Theme run the below command from grunt-wavemaker-theme directory

<pre>
cd grunt-wavemaker-theme
grunt themes
</pre>

