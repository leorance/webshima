<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Support\Facades\Auth;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;
    protected $responsebase;
    protected $errordata = [];

    function responseBase($status, $data)
    {
        $responsebase["status"] = $status;
        $responsebase["time"] = date("d-m-Y H:i:s");
        $responsebase["data"] = $data;
        if($this->errordata != null){
            $responsebase["error"] = $this->errordata;
        }
        $user = Auth::User();
        if($user != null){
            $responsebase["user"] = $user;
        } else {
            $responsebase["user"] = null;
        }

        return response()->json($responsebase, $status);
    }

    public function checkAdmin()
    {
        $user =  Auth::user();
        $is_admin = $user->is_admin;
        
        if ($is_admin != 1)
        {   
            $response = $this->responseBase(400, "You Don't Have Access To Do This Action!");
            return $response; 
        } 
    }

    public function checkVerified()
    {
        $user =  Auth::user();
        $is_verified = $user->email_verified_at;
        
        if ($is_verified == null)
        {   
            $response = $this->responseBase(400, "You Must Verified Your Account First!");
            return $response; 
        } 
    }
}

//  $responsebase["user"] = Auth::user(); || untuk return user
