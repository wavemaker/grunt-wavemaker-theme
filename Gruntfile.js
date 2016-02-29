/*global module,require*/
module.exports = function (grunt) {
    'use strict';

    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // configurable paths
    var wmBuildConfig = {
        themes_src: 'src',
        themes_tmp: 'tmp',
        themes_dist: 'dist',
        themes_fonts: 'components/bootstrap/fonts'
    };
    grunt.initConfig({
            config: wmBuildConfig,
            clean : ['<%= config.themes_dist %>/', '<%= config.themes_tmp %>/'],
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
                            cwd: '<%= config.themes_tmp %>/',
                            src: ['**/style.less'],
                            dest: '<%= config.themes_tmp %>/',
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
                            dot: true,
                            expand: true,
                            dest: '<%= config.themes_tmp %>/'
                        }]
                },
                fonts: {
                    files: [
                        {
                        cwd: '<%= config.themes_fonts%>/',
                        src: '*',
                        expand: true,
                        dest: '<%= config.themes_tmp %>/web/fonts'
                        },
                        {
                            cwd: '<%= config.themes_fonts%>/',
                            src: '*',
                            expand: true,
                            dest: '<%= config.themes_tmp %>/mobile/android/fonts'
                        },
                        {
                            cwd: '<%= config.themes_fonts%>/',
                            src: '*',
                            expand: true,
                            dest: '<%= config.themes_tmp %>/mobile/ios/fonts'
                        }
                    ]
                }
            },
            compress: {
                web: {
                    options: {
                        archive: '<%= config.themes_dist %>/web.zip',
                        mode: 'zip'
                    },
                    files: [{
                        src: ['**/*'],
                        dot: true,
                        cwd: '<%= config.themes_tmp %>/web/',
                        expand: true
                    }]
                },
                mobile: {
                    options: {
                        archive: '<%= config.themes_dist %>/mobile.zip',
                        mode: 'zip'
                    },
                    files: [{
                        src: ['**/*'],
                        dot: true,
                        cwd: '<%= config.themes_tmp %>/mobile/',
                        expand: true
                    }]
                },
                bootswatch: {
                    options: {
                        archive: '<%= config.themes_dist %>/bootswatch.zip',
                        mode: 'zip'
                    },
                    files: [{
                        src: ['**/*'],
                        dot: true,
                        cwd: '<%= config.themes_tmp %>/bootswatch/',
                        expand: true
                    }]
                }
            }
        }
    );
    grunt.registerTask('themes', ['clean', 'bower', 'copy', 'less:themes', 'compress']);
};

