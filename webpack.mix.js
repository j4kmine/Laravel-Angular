let mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/assets/js/app.js', 'public/js')
   .sass('resources/assets/sass/app.scss', 'public/css');
mix.scripts([
    'resources/assets/js/apps.js',
    
], 'public/js/apps.js');
mix.scripts([
    'resources/assets/js/controllers/userController.js',
    'resources/assets/js/controllers/globalController.js',
    'resources/assets/js/controllers/navController.js',
    'resources/assets/js/controllers/galleryController.js',
    'resources/assets/js/models/userModel.js',
], 'public/js/controllers.js');
mix.scripts([
    'resources/assets/js/models/userModel.js',
     'resources/assets/js/models/galleryModel.js',
], 'public/js/models.js');
