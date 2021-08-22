<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\User;
use App\Vote_Candidate;


class CandidateController extends Controller
{  
    
    public function add(Request $request)
    {
        $check = $this->checkAdmin();
        if ($check == null)
        {
            $data = Vote_Candidate::create($request -> all());
            $response = $this->responseBase(201, $data);
    
            return $response;
        }
        else 
        {
            return $check;
        }

    }

    public function disableCandidate(Request $request)
    {
        $check = $this->checkAdmin();
        if ($check == null)
        {
            $data = Vote_Candidate::find($request->id);
            if ($data == null) {
                $response = $this->responseBase(404, "Data not Found");
                return $response;
            } 
            else 
            {
                $data = Vote_Candidate::where("id", "=", $data->id)->update($request->all());
                $response = $this->responseBase(200, $data);
                return $response;
            }
        }
        else 
        {
            return $check;
        }

    }

    public function activeCandidate() 
    {
        $data = Vote_Candidate::where("status","=","1")->get();
        $response = $this->responseBase(200, $data);
        return $response;
    }

    public function getCandidateById(Request $request)
    {
        $check = $this->checkAdmin();
        if ($check == null)
        {
            $data = Vote_Candidate::find($request->id);
            $response = $this->responseBase(200, $data);
            return $response;
        }
        else 
        {
            return $check;
        }
    }

    public function update(Request $request)
    {
        $check = $this->checkAdmin();
        if ($check == null)
        {
            $data = Vote_Candidate::find($request->id);
                if ($data == null) {
                $response = $this->responseBase(404, "Data not Found");
                return $response;
            } 
            else 
            {
                $data = Vote_Candidate::where("id", "=", $data->id)->update($request->all());
                $response = $this->responseBase(200, $data);
                return $response;
            }
        }
        else 
        {
            return $check;
        }
    }

    public function getAllCandidate()
    {
        $check = $this->checkAdmin();
        if ($check == null)
        {
            $data = Vote_Candidate::all();
            $response = $this->responseBase(200, $data);
            return $response;
        }
        else 
        {
            return $check;
        }
    }

}
