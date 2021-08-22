<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Auth;
use App\User;

class OTPMail extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $data = Auth::user()->fresh();
        return $this->from('web@hmsiithb.com', 'HIMA Sistem Informasi ITHB')
            ->subject('Web HIMA SI - Register OTP')
            ->markdown('mails.otpmail')
            ->with([
                'name' => $data->name,
                'code' => $data->otp
            ]);
    }
}
