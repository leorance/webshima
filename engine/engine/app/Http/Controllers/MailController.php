<?php

namespace App\Http\Controllers;

use App\User;
use App\Mail\OTPMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Auth;

class MailController extends Controller
{
    
    public function send_email() 
        {
            $data = Auth::user();
            $six_digit_random_number = mt_rand(100000, 999999);
            
            $request['otp'] = "$six_digit_random_number";
             
           // dd($data);
            
            $status = User::where("id", "=", $data->id)->update($request);
           
            if ($status == 1)            
            {
                Mail::to($data->email)->send(OTPMail()); 
                $response = $this->responseBase(200, "OTP Message Has Been Sent To Registered Email!");
                return $response;
            }
            else
            {
                $response = $this->responseBase(400, "Failed to Send OTP Message to Registered Email!");
                return $response;
            }
        }
}
