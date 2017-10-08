<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
class Gallery extends Model
{
    //
    protected $fillable =['name','user_id'];
    public function getSingleGallery($id){
    	$gallery = Gallery::where('id', $id)->first();
    	$gallery->images = $this->getGalleryImagesUrl($id, $gallery->id);
    	return $gallery;
    }
    private function getGalleryImagesUrl($id,$galleryid){
    	$file = DB::table('gallery_images')
    	   		->where('gallery_id',$galleryid)
    	   		->join('files','files.id','=','gallery_images.file_id')
    	   		->get();
    	$finalData =[];
    	foreach ($file as $key => $value) {
    		$finalData[$key]=[
    			'file_id'=>$value->id,
    			  'thumbUrl' => env('APP_URL') .'/storage'. "/app/gallery_{$galleryid}/thumb/" . $value->file_name,
            	  'url' => env('APP_URL') .'/storage'. "/app/gallery_{$galleryid}/medium/" . $value->file_name,
                   'main' => env('APP_URL') .'/storage'. "/app/gallery_{$galleryid}/main/" . $value->file_name,
    		];
    	}
    	return $finalData;
    }
    public function getCreatedAttribut($value){
    	return Carbon::createFromFormat('Y-m-d H:i:s',$value)->diffForHumans();
    }
    public function user(){
    	return $this->belongsTo('App\User');
    }
}
