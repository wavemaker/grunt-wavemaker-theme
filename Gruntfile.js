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
        themes_fonts: 'components/bootstrap',
        themes_icons: 'components/wavicon',
        web_zip : 'web.zip',
        mobile_zip : 'mobile.zip',
        bootswatch_zip : 'bootswatch.zip'
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
            xmlstoke: {
                web: {
                    options: {
                        actions: [
                            {type: 'R', xpath: '/properties/entry[@key="version"]', saveAs: 'web-version'},
                            {type: 'R', xpath: '/properties/entry[@key="name"]', saveAs: 'web-name'}
                        ]
                    },
                    files: [
                        {'<%= config.themes_tmp %>/.wmproject.properties' : '<%= config.themes_tmp %>/web/.wmproject.properties'}
                    ]
                },
                mobile: {
                    options: {
                        actions: [
                            {type: 'R', xpath: '/properties/entry[@key="version"]', saveAs: 'mobile-version'},
                            {type: 'R', xpath: '/properties/entry[@key="name"]', saveAs: 'mobile-name'}
                        ]
                    },
                    files: [
                        {'<%= config.themes_tmp %>/.wmproject.properties' : '<%= config.themes_tmp %>/mobile/.wmproject.properties'}
                    ]
                },
                bootswatch: {
                    options: {
                        actions: [
                            {type: 'R', xpath: '/properties/entry[@key="version"]', saveAs: 'bootswatch-version'},
                            {type: 'R', xpath: '/properties/entry[@key="name"]', saveAs: 'bootswatch-name'}
                        ]
                    },
                    files: [
                        {'<%= config.themes_tmp %>/.wmproject.properties' : '<%= config.themes_tmp %>/bootswatch/.wmproject.properties'}
                    ]
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
                }
            },
            compress: {
                web: {
                    options: {
                        archive: wmBuildConfig.web_zip,
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
                        archive: wmBuildConfig.mobile_zip,
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
                        archive: wmBuildConfig.bootswatch_zip,
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
    grunt.registerTask('generate_archive_paths', function () {
        wmBuildConfig.web_zip       =  wmBuildConfig.themes_dist + '/' + grunt.option("web-name") + '_'+ grunt.option("web-version") + '.zip',
        grunt.config.set('compress.web.options.archive', wmBuildConfig.web_zip);

        wmBuildConfig.mobile_zip     = wmBuildConfig.themes_dist + '/' + grunt.option("mobile-name") + '_'+ grunt.option("mobile-version") + '.zip',
            grunt.config.set('compress.mobile.options.archive', wmBuildConfig.mobile_zip);

        wmBuildConfig.bootswatch_zip = wmBuildConfig.themes_dist + '/' + grunt.option("bootswatch-name") + '_'+ grunt.option("bootswatch-version") + '.zip';
        grunt.config.set('compress.bootswatch.options.archive', wmBuildConfig.bootswatch_zip);
    });
    grunt.registerTask("load-fonts", "copy fonts into themes", function () {
        var copy, platform;
        grunt.file.expand('src/**/fonts').forEach(function (dir) {
            copy = grunt.config.get('copy') || {};
            platform = dir.split('/')[2];
            copy[dir] = {
                files: [
                    {
                        cwd: wmBuildConfig.themes_fonts + '/fonts',
                        dest: dir,
                        expand: true,
                        src: ['*']
                    }
                ]
            };
            if (platform === 'ios') {
                copy[dir + '-wavicons'] = {
                    files: [
                        {
                            cwd: wmBuildConfig.themes_icons + '/' + platform + '/fonts',
                            dest: dir,
                            expand: true,
                            src: ['*']
                        }
                    ]
                };
            }
            grunt.config.set('copy', copy);
        });
        grunt.task.run('copy');
    });
    grunt.registerTask('themes', ['clean', 'bower', 'copy', 'load-fonts', 'less:themes', 'xmlstoke', 'generate_archive_paths', 'compress']);
};

