<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('login', 'API\UserController@login');
Route::post('preusers', 'API\UserController@preUsers');
Route::post('register', 'API\UserController@register');
Route::get('activecandidate','CandidateController@activeCandidate');
      
Route::group(['middleware' => 'auth:api'], function(){
    Route::get('details', 'API\UserController@details');
    Route::get('logout', 'API\UserController@logout');
    Route::get('send-mail','MailController@send_email');
    Route::post('verified','API\UserController@otpverified');
    Route::put('user/update', 'API\UserController@update');
    Route::put('user/password', 'API\UserController@updatePassword');
    Route::put('user/isadmin', 'API\UserController@updateIsAdmin');

    Route::post('addcandidate','CandidateController@add');
    Route::put('candidatestatus','CandidateController@disableCandidate');
    Route::post('candidateid','CandidateController@getCandidateById');
    Route::post('candidateupdate','CandidateController@update');
    Route::get('allcandidate','CandidateController@getAllCandidate');

    Route::post('voting','VoteController@addVote');
    Route::post('count','VoteController@count');
    Route::get('check-vote','VoteController@checkbeforevote');

    Route::post('addevent','EventController@add');
    Route::post('updateevent','EventController@update');
    Route::get('getallevent','EventController@getAllEvent');
});
