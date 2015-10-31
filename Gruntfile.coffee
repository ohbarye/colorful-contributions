module.exports = (grunt) ->
  grunt.initConfig
    pkg: grunt.file.readJSON 'package.json'
    watch :
      coffee:
        files: ["source/coffee/**/*.coffee"]
        tasks: "coffee"
      haml:
        files: ["source/haml/**/*.haml"]
        tasks: "haml"
    coffee:
      compile :
        files: [
          expand: true
          cwd: "source/coffee/"
          src: ["**/*.coffee"]
          dest: "app/js/"
          ext: ".js"
        ]
    haml:
      dist:
        files:
          'app/html/popup.html': 'source/haml/popup.haml'
          'app/html/options.html': 'source/haml/options.haml'
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-haml'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.registerTask 'default', ['watch']

  return
