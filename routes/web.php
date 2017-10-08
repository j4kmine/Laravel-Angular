<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('master');
});
Route::get('gallerylist','GalleryController@index');
Route::post('auth','UserController@auth');
Route::post('galleryadd','GalleryController@add');
Route::get('galleryget/{user}','GalleryController@show');
// Route::post('uploadfile',function(){
// 	return response('Success',200);
// });
Route::post('uploadfile', 'GalleryController@uploadimage');
Route::post('delete-single-image', 'GalleryController@deleteSingleImage');