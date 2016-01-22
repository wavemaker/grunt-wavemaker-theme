INSTRUCTIONS
============

Building
--------
In order to build WaveMaker Theme download and install Nodejs from below link:

* Nodejs  0.10.26 (http://nodejs.org/dist/v0.10.26/)

To install grunt-cli and bower (bower depends on Node and npm. It's installed globally using npm:)
(Make sure that git is installed as some grunt-cli/bower packages require it to be fetched and installed)

<pre>
 npm install -g grunt-cli
 npm install -g bower
</pre>

(Make sure above commands execute with sudo/administrator permissions depending on OS eg, UNIX)

To clone the grunt-wavemaker-theme repository, use git clone:

<pre>
 git clone git@github.com:wavemaker/grunt-wavemaker-theme.git
 cd grunt-wavemaker-theme
</pre>

To build the complete WaveMaker distribution run the below command from grunt-wavemaker-theme directory

<pre>
grunt themes
</pre>
