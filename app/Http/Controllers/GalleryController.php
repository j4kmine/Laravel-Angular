<?php

namespace App\Http\Controllers;

use App\File;
use App\Gallery;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
class GalleryController extends Controller
{
    
    public function index(){
        return Gallery::all();
    }
    public function show($id){
       
         return Gallery::where('id', $id)->first();

    }
    public function add(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|min:3',
        ]);
        if ($validator->fails()) {
            return response($validator->errors()->all(), 422);
        }
        $gallery = Gallery::create([
            'name' => $request->input('name'),
            'user_id' => 1,
        ]);
        return response($gallery, 201);
    }
}
