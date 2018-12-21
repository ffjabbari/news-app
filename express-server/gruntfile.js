module.exports = function (grunt) {
  "use strict";

  grunt.initConfig({
    copy: {
      build: {
        files: [
          {
            expand: true,
            cwd: "./src",
            src: ["**", "!\*\*/\*.ts"],
            dest: "./dist"
          }
        ]
      }
    },
    ts: {
      app: {
        files: [{
          src: ["src/\*\*/\*.ts", "!src/.baseDir.ts"],
          dest: "./dist"
        }],
        tsconfig: './tsconfig.json',
      }
    },
    watch: {
      ts: {
        files: ["src/\*\*/\*.ts"],
        tasks: ["ts"]
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-ts");

  grunt.registerTask("default", [
    "copy",
    "ts",
  ]);

};