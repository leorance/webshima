<?php

use Illuminate\Support\Facades\Route;

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
    return Redirect::to('http://hmsiithb.com');
});

Route::get('loginrequired', function () {
    $response["status"] = 401;
    $response["data"] = "Login Required!";
    return $response;
    //return view('welcome');
})->name("loginrequired");