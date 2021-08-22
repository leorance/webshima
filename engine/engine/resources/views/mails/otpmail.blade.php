@component('mail::message')
Hello **{{$name}}**,  {{-- use double space for line break --}}
Thank you registeration, this is your OTP **{{$code}}**

Sincerely,  
HIMA SI ITHB.
@endcomponent