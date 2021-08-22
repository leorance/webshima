<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\User;
use App\PreUsers;
use Carbon\Carbon;
use Validator;
use Exception;

class UserController extends Controller
{
    public $successStatus = 200;
    /**
     * login api
     *
     * @return \Illuminate\Http\Response
     */
    public function login()
    {
        try {
            if (Auth::attempt(['email' => request('email'), 'password' => request('password')]) || Auth::attempt(['nim' => request('nim'), 'password' => request('password')])) {
                $user = Auth::user();

                $tokenResult = $user->createToken('Web');
                $token = $tokenResult->token;
                $token->expires_at = Carbon::now()->addDay();
                $token->save();

                $data['token_access'] = $tokenResult->accessToken;
                $data['token_detail'] = $token;
                $response = $this -> responseBase(200, $data);
                return $response;
                //return response()->json(['success' => $success], $this->successStatus);
            } else {
                $response = $this->responseBase(401, "Username / Password Wrong [E001]");
                return $response;
            }
        } catch (Exception $e) {
            $response = $this->responseBase(401, "Username / Password Wrong [E002]");
            return $response;
        }

    }
    /**
     * Register api
     *
     * @return \Illuminate\Http\Response
     */
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nim' => 'required',
            'name' => 'required',
            'phone' => 'required',
            'phone_wa' => 'required',
            'email' => 'required|email',
            'password' => 'required',
            'c_password' => 'required|same:password'
            //'is_admin' => 'required'
        ]);
        if ($validator->fails()) {
            $response = $this->responseBase(400, $validator->errors());
            return $response;
            //return response()->json(['error' => $validator->errors()], 401);
        }
        
        $userDB = User::whereNim($request->nim)->first();
        if ($userDB != null)
        {
            $response = $this->responseBase(400, "User Already Exist!");
            return $response;
        }
        else
        {
            $input = $request->all();
            $input['password'] = bcrypt($input['password']);
            $user = User::create($input);
            
            $response = $this->responseBase(200, $user);
           
            
            $preuserdb = PreUsers::whereNim($request->nim)->first();
            
            $preuser['nim'] = $preuserdb->nim;
            $preuser['name'] = $preuserdb->name;
            $preuser['status'] = 1;
            //dd($preuser);
            PreUsers::where("nim", "=", $preuserdb->nim)->update($preuser);
            
            return $response;
        }

    }

    public function preUsers(Request $request)
    {
        $preuser = PreUsers::whereNim($request->nim)->first();
        if($preuser == null)
        {
            $response = $this->responseBase(404, "NIM Not Found, Please Contact Administrator");
            return $response;
        }
        else if($preuser['status'] == 1)
        {
            $response = $this->responseBase(510, "NIM Already Registered");
            return $response;
        }
        else
        {
            $response = $this->responseBase(200, $preuser);
            return $response;
        } 
    }

    /**
     * details api
     *
     * @return \Illuminate\Http\Response
     */
    public function details()
    {
        $user = Auth::user();
        return response()->json(['success' => $user], $this->successStatus);
    }

    public function logout()
    {
        $user = Auth::user();
        $userTokens = $user->tokens;
        // dd($userToken);
        foreach($userTokens as $token) {
            $token->revoke();   
        }
        $response = $this->responseBase(200, "User Logged Out");
        $response['user'] = null;
        return $response;
        // $user = Auth::user()->token();
        // $user->revoke();
        // $response = $this->responseBase(200, "User Logged Out");
        // return $response;
    }

    public function update(Request $request)
    {
        $data = User::find($request->id);
        if ($data == null) {
            $response = $this->responseBase(404, "Data not Found");
            return $response;
        } else {
            $data = User::where("id", "=", $data->id)->update($request->all());
            $response = $this->responseBase(200, $data);
            return $response;
        }
    }

    public function updatePassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'password_old' => 'required',
            'password_new' => 'required',
            'c_password_new' => 'required|same:password_new'
        ]);
        if ($validator->fails()) {
            $response = $this->responseBase(400, $validator->errors());
            return $response;
        }
        
        $userDB = Auth::user();
        $password_old = bcrypt($request->password_old);
        if(Hash::check($request->password_old, $userDB->password))
        {
            $input['password'] = bcrypt($request->password_new);
            $user = User::where("id", "=", $userDB->id)->update($input);
            $response = $this->responseBase(200, $user);
            return $response;
        }
        else
        {
            $response = $this->responseBase(400, "Old Password Wrong");
            return $response;
        }  
    }

    public function otpverified(Request $request)
    {
        $user = Auth::user();
        //$data = User::find($user->id);
        if ($user->otp != $request->otp) {
            $response = $this->responseBase(400, "Wrong OTP Code");
            return $response;
        } else {
            $request['email_verified_at'] = Carbon::now()->toDateTimeString();
            
            $data = User::where("id", "=", $user->id)->update($request->all());
            $response = $this->responseBase(200, $data);
            return $response;
        }
    }

    public function updateIsAdmin(Request $request)
    {
        $check = $this->checkAdmin();
        if ($check == null)
        {
            $data = User::find($request->id);
            if ($data == null) {
                $response = $this->responseBase(404, "Data not Found");
                return $response;
            } 
            else 
            {
                $data = User::where("id", "=", $data->id)->update($request->all());
                $response = $this->responseBase(200, $data);
                return $response;
            }
        }
        else
        {
            return $check;
        }
        
    }

}
