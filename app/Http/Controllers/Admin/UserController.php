<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\User\Create;
use App\Http\Requests\User\Update;
use App\ORM_Model\Fld_User\UserInterface;
use App\Usables_Extensions\ImageStore;
use Exception;

class UserController extends Controller
{
    use ImageStore;
    private $userRepository;
    public function __construct(UserInterface $userInterface)
    {
        $this->userRepository = $userInterface;
    }
    public function get()
    {
        try {
            $users = $this->userRepository->Select();
            return response()->json($users, 200);
        } catch (Exception $ex) {
            $this->WriteGeneralException($ex);
            return response()->json($this->ExceptionResponse($ex), 500);
        }
    }
    public function store(Create $request)
    {
        try {
            $params = $request->except('_method', '_token', 'image');
            $user = $this->userRepository->Save($params, true);
            $filename = '';
            $error = '';
            $this->SaveImageFromWeb($request, $filename, $error);
            $this->userRepository->Update($user['id'], ['image' => $filename], false);
            return response()->json('User created successfully.', 200);
        } catch (Exception $ex) {
            $this->WriteGeneralException($ex);
            return response()->json($this->ExceptionResponse($ex), 500);
        }
    }
    public function getprimary($id)
    {
        try {
            $user = $this->userRepository->SearchOrFail($id);
            return response()->json($user, 200);;
        } catch (Exception $ex) {
            $this->WriteGeneralException($ex);
            return response()->json($this->ExceptionResponse($ex), 500);
        }
    }
    public function update(Update $request)
    {
        $isreturn = false;
        $filename = '';
        $error = '';
        try {
            $id = $request->id;
            $params = $request->except('_method', '_token', 'id');
            $this->userRepository->Update($id, $params, $isreturn);
            $this->SaveImageFromWeb($request, $filename, $error);
            return response()->json("User updated successfully", 200);
        } catch (Exception $ex) {
            $this->WriteGeneralException($ex);
            return response()->json($this->ExceptionResponse($ex), 500);
        }
    }
    public function delete($id)
    {
        try {
            $delete = $this->userRepository->Remove($id);
            if ($delete === 0)
                throw new Exception("Unable to delete");
            return response()->json("User deleted successfully.", 200);
        } catch (Exception $ex) {
            $this->WriteGeneralException($ex);
            return response()->json($this->ExceptionResponse($ex), 500);
        }
    }
}
