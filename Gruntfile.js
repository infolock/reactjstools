module.exports = function( grunt ) {
	require( 'load-grunt-tasks' )( grunt );

	grunt.initConfig({
		pkg: grunt.file.readJSON( 'package.json' ),
		env: {
			grunt: {
				NODE_ENV: 'grunt'
			}
		},
        watch: {
			js: {
				files: 'public/js/**/*.js',
				tasks: 'webpack:build'
			}
        },
		eslint: {
			target: ['public/js/**/*.js'],
			options: {
				configFile: 'buildConfig/eslint.json'
			}
		}
	});

	grunt.registerTask( 'webpack', 'Runs webpack', function( which ) {
		var done = this.async();
		var webpack = require( 'webpack' );
		var config = require( 'buildConfig/webpack' );

		webpack( config, function( err, stats ) {
			if( stats.compilation.errors.length ) {
				var messages = ['\n'];

				stats.compilation.errors.forEach( function( error ) {
					if( messages.indexOf( error.message ) === -1 ) {
						messages.push( error.message );
					}
				});

				grunt.fail.warn( messages.join( '\n' ) );
			} else {
				done();
			}
		});
	});

	grunt.registerTask( 'default',
		[
			'env:grunt',
			'eslint:target',
			'webpack:build'
		]
	);

	grunt.registerTask( 'build', [ 'default' ] );
};
