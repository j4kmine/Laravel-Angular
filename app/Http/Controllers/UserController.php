<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use User;
use Illuminate\Support\Facades\Auth;
class UserController extends Controller
{
    //
    public function auth(Request $request){
    	$credentials = [
    		'email'=>$request->input('email'),
    		'password'=>$request->input('password'),
    	];

    	if(!Auth::attempt($credentials)){
            Auth::login(Auth::user(), true);
    		return response('Username password does not match',403);
    	}

    	return response(Auth::user(),201);
    }
}
