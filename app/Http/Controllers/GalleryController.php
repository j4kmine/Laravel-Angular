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
    function uploadimage(Request $request){
        $galleryId = $request->input('galleryId');
        if(! $request->hasFile('file')){
            return response('No File Sent',400);
        }
        
        $validator =Validator::make($request->all(),[
            'galleryId'=>'required|integer',
            'file'=>'required:jpeg,jpg,png|max:6000',

        ]);
        if($validator->fails()){
            return response($validator->errors()->all(), 422);
        }
        // $mimeTypes = $request->file('file')->getClientMimeType();
        // $fileSize = $request->file('file')->getClientSize();
        // $filename ='gallery_'.$galleryId.'_'.uniqid().'.'.$request->file('file')->guessClientExtension();
        // $path = $request->file('file')->store('file');
        // $file = File::create([
        //     'file_name' => $filename,
        //     'mime_type' => $mimeTypes,
        //     'file_size' => $fileSize,
        //     'file_path' => $path,
        //      'type' => 'local',
        // ]);
        // DB::table('gallery_images')->insert([
        //     'gallery_id' => $galleryId,
        //     'file_id' => $file->id,
        // ]);
        // $fileImg = File::find($file->id);
        // $fileImg->status = 1;
        // $fileImg->save();
        
        $fileObj = new File;
        $fileUpload = $fileObj->uploadimagesmode($request);
        return response($fileUpload, 201);
    }
}
