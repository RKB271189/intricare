<?php

namespace App\Http\Requests\User;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Support\Facades\Auth;

class Update extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        if (Auth::check()) {
            return true;
        }
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'id' => 'required',
            'name' => 'required',
            'email' => 'required|email',
            'phoneno' => 'required|mobile',
            'gender' => 'required'
        ];
    }
    public function messages()
    {
        return [
            'name.required' => 'Name is mandatory',
            'email.required' => 'Email is mandatory',
            'email.email' => 'Email should be valid',
            'phoneno.required' => 'Phone no is mandatory',            
            'phoneno.mobile' => 'Phone no must be valid 10 digit number',
            'gnder.required' => 'Gender is mandatory',
        ];
    }
    protected function failedValidation(Validator $validator)
    {
        $errors = $validator->errors()->first();
        throw new HttpResponseException(response()->json($errors, 400));
    }
}
