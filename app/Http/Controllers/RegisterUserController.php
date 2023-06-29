<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRoleRequest;
use App\Http\Requests\UpdateUserRoleRequest;
use App\Models\UserRole;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;
use Redirect;
use Validator;
use Illuminate\Support\Str;

class RegisterUserController extends Controller
{
    /**
     * Регистрация данных пользователя
     * 
     * @param Request $request
     * 
     * @return JsonResponse
     */
    public function registerUser(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [ 
            'firstName' => 'required', 
            'secondName' => 'required', 
            'email' => 'required|email', 
            'password' => 'required', 
        ]);

        if ($validator->fails()) { 
            return response()->json(['error' => $validator->errors()], 401);
        }

        if (User::where('email', $request->email)->exists() == true) {
            return response()->json([
                'status' => 'error',
                'type' => 'email',
                'text' => 'Данный email уже используется!',
            ]);
        }

        $newUser = new User();
        $newUser->firstName = $request->firstName;
        $newUser->secondName = $request->secondName;
        $newUser->email = $request->email;
        $newUser->password = bcrypt($request->password);
        $newUser->save();

        return response()->json([
            'status' => 'success',
        ]);
    }
}