<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Intervention\Image\Facades\Image;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
class File extends Model
{
	 protected $fillable = ['file_name', 'mime_type', 'file_size', 'file_path', 'status', 'type'];
	 public function uploadimagesmode(Request $request){
	 	  $mimeTypes = $request->file('file')->getClientMimeType();
	      $fileSize = $request->file('file')->getClientSize();
	      $extension = $request->file('file')->guessClientExtension();
	      $filename = uniqid().'.'.$request->file('file')->guessClientExtension();
	      $file = $request->file('file');
	      //$path = $request->file('file')->store('file');
	       $image = Image::make($file);
	      $galleryId = $request->input('galleryId');
	      $imageThumb = Image::make($file)->fit(320)->crop(320,240,0,0);
	      $imageThumb->encode($extension);
	      $imageMedium = Image::make($file)->resize(800,null,function($constrain){
	      	$constrain->aspectRatio();
	      });
	      $imageMedium->encode($extension);
	      $image->encode($extension);
	      Storage::put("gallery_{$galleryId}/main/".$filename,(string)$image, 'public');
	      Storage::put("gallery_{$galleryId}/medium/".$filename,(string)$imageMedium, 'public');
	      Storage::put("gallery_{$galleryId}/thumb/".$filename,(string)$imageThumb, 'public');
	        $file = File::create([
            'file_name' => $filename,
            'mime_type' => $mimeTypes,
            'file_size' => $fileSize,
            'file_path' => env('APP_URL') ."gallery_{$galleryId}/main/".$filename,
             'type' => 'local',
        ]);
        DB::table('gallery_images')->insert([
            'gallery_id' => $galleryId,
            'file_id' => $file->id,
        ]);
        $fileImg = File::find($file->id);
        $fileImg->status = 1;
        $fileImg->save();
        return [
            'file' => $fileImg,
            'file_id' => $file->id,
            'thumbUrl' => env('APP_URL') .'/blog/storage'. "/app/gallery_{$galleryId}/thumb/" . $filename,
            'url' => env('APP_URL') .'/blog/storage'. "/app/gallery_{$galleryId}/medium/" . $filename,
             'main' => env('APP_URL') .'/blog/storage'. "/app/gallery_{$galleryId}/main/" . $filename,
        ];
	 }
}
