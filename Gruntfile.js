
// 包装函数
module.exports = function(grunt) {

    // 任务配置,所有插件的配置信息
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        //以下配置用于工具，模块和逻辑层分离的情况
        concat: {
            basic_and_extras: {
                files: {
                    //新的文件的路径以及名称 : [有所的文件的路径名称]
                    'src/conanjs.base/0.0.1/conanjs.base.min.js': ['src/conanjs.base/0.0.1/conanjs.base.js'],
                    'src/conanjs.tips/0.0.1/conanjs.tips.min.js': ['src/conanjs.tips/0.0.1/conanjs.tips.js'],
                    'src/conanjs.slider/0.0.1/conanjs.slider.min.js': ['src/conanjs.slider/0.0.1/conanjs.slider.js'],
                    'src/conanjs.button/0.0.1/conanjs.button.min.js': ['src/conanjs.button/0.0.1/conanjs.button.js']
                }
            }
        },
        uglify: {
            my_target: {
                files: {
                    'src/conanjs.base/0.0.1/conanjs.base.min.js': ['src/conanjs.base/0.0.1/conanjs.base.js'],
                    'src/conanjs.tips/0.0.1/conanjs.tips.min.js': ['src/conanjs.tips/0.0.1/conanjs.tips.js'],
                    'src/conanjs.slider/0.0.1/conanjs.slider.min.js': ['src/conanjs.slider/0.0.1/conanjs.slider.js'],
                    'src/conanjs.button/0.0.1/conanjs.button.min.js': ['src/conanjs.button/0.0.1/conanjs.button.js']
                }
            }
        },
        cssmin: {
            combine: {
                files: {
                    'example/conanjs.base/0.0.1/conanjs.base.min.css' : ['example/conanjs.base/0.0.1/conanjs.base.css'],
                    'example/conanjs.tips/0.0.1/conanjs.tips.min.css' : ['example/conanjs.tips/0.0.1/conanjs.tips.css'],
                    'example/conanjs.slider/0.0.1/conanjs.slider.min.css' : ['example/conanjs.slider/0.0.1/conanjs.slider.css']
                }
            }
        }
    });

    // 告诉grunt我们将使用插件
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    // 告诉grunt当我们在终端中输入grunt时需要做些什么
    grunt.registerTask('default', ['concat', 'uglify','cssmin']);

};
