<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\User;
use App\Vote;
use App\Vote_Candidate;

class VoteController extends Controller
{
    public function addVote(Request $request)
    {
        $user = Auth::user();
        $response = $this->checkVerified();
        if($response != null)
        {
            return $response;
        }

        $response = Vote::whereVoter_id($user->id)->first();
        //dd($response);
        if($response != null)
        {
            $response = $this->responseBase(500, "You Already Vote!");
            return $response;
        }
        else
        {
            $input = $request->all();
            $input['voter_id'] = $user->id; 
            
            //dd($input); 
            $data = Vote::create($input);
            $response = $this->responseBase(200, $data);
            return $response;
        }
    }

    public function count()
    {
        $active_candidate = Vote_Candidate::where("status","=","1")->get();
        // dd($active_candidate);
        
        // $count = 0;
        $array_candidate = array();
        foreach($active_candidate as $ac) 
        {
            $data = Vote::where("candidate_id", "=", $ac->id);
            // dd($data);
            $countData = $data->count();

            $personal['choose_number'] = $ac->choose_number;
            $personal['name_pres'] = $ac->name_pres;
            $personal['name_vicepres'] = $ac->name_vicepres;
            //  = array($ac->choose_number,$ac->name_pres,$ac->name_vicepres);
            
            //echo "The count for $ac->name_pres is: $countData vote <br><br>";
            $resp['candidate'] = $personal;
            $resp["count"] = $countData;
            // $array_candidate = $resp;
            array_push($array_candidate,$resp);
            // $count++;
        }

        $response = $this->responseBase(200, $array_candidate);
        return $response;
    }

    public function checkbeforevote()
    {
        $user = Auth::user();
        $response = Vote::whereVoter_id($user->id)->first();
        if($response != null)
        {
            $data['is_vote'] = true;
            $response = $this->responseBase(500, $data);
            return $response;
        }
        else
        {
            $data['is_vote'] = false;
            $response = $this->responseBase(200, $data);
            return $response;
        }
    }
}
