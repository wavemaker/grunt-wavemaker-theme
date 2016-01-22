/*global module,require*/
module.exports = function (grunt) {
    'use strict';

    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // configurable paths
    var wmBuildConfig = {
        themes_src: 'src',
        themes_dist: 'dist'
    };
    grunt.initConfig({
            config: wmBuildConfig,
            bower: {
                install: {
                    options: {
                        targetDir: './components',
                        layout: 'byComponent',
                        install: true,
                        verbose: false,
                        cleanTargetDir: true,
                        cleanBowerDir: false
                    }
                }
            },
            less: {
                themes: {

                    files: [
                        {
                            expand: true,
                            cwd: '<%= config.themes_dist %>/',
                            src: ['**/style.less'],
                            dest: '<%= config.themes_dist %>/',
                            ext: '.css'
                        }
                    ]
                }
            },
            copy: {
                themes: {
                    files: [
                        {
                            cwd: '<%= config.themes_src %>/',
                            src: '**',
                            expand: true,
                            dest: '<%= config.themes_dist %>/'
                        }]
                }
            }
        }
    );
    grunt.registerTask('themes', ['bower', 'copy', 'less:themes']);
};

