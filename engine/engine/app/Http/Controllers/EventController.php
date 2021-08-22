<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Event;

class EventController extends Controller
{
    public function add(Request $request)
    {
        $check = $this->checkAdmin();
        if ($check == null)
        {
            $data = Event::create($request -> all());
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
            $data = Event::find($request->id);
                if ($data == null) {
                $response = $this->responseBase(404, "Data not Found");
                return $response;
            } 
            else 
            {
                $data = Event::where("id", "=", $data->id)->update($request->all());
                $response = $this->responseBase(200, $data);
                return $response;
            }
        }
        else 
        {
            return $check;
        }
    }

    public function getAllEvent()
    {
        $check = $this->checkAdmin();
        if ($check == null)
        {
            $data = Event::all();
            $response = $this->responseBase(200, $data);
            return $response;
        }
        else 
        {
            return $check;
        }
    }
}
