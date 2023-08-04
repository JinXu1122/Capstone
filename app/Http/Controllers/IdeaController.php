<?php

namespace App\Http\Controllers;

use App\Models\Idea;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Psy\Readline\Hoa\Console;

class IdeaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Retrieve all ideas from the database
        $ideas = Idea::all();

        // Return the ideas as a JSON response
        return response()->json($ideas, 200);
    }

    // public function index(User $user)
    // {
    //     if (Auth::id() !== $user->id) {
    //         return response()->json(['error' => 'Unauthorized'], 401);
    //     }
    //     return response()->json($user->ideas);
    // }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        Log::info(Auth::id());
        $idea = new Idea();
        $idea->title = $request->input('title');
        $idea->content = $request->input('content');
        $idea->user_id = Auth::id();

        $idea->save();

        return response()->json($idea, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Idea $idea)
    {
        return response()->json($idea, 200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Idea $idea)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Idea $idea)
    {
        // if (Auth::id() !== $idea->user_id) {
        //     return response()->json(['error' => 'Unauthorized'], 401);
        // }
        // Log::info(Auth::id());
        // Log::info($idea->user_id);

        $idea->title = $request->input('title');
        $idea->content = $request->input('content');

        $idea->save();

        return response()->json($idea, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Idea $idea)
    {
        // if (Auth::id() !== $idea->user_id) {
        //     return response()->json(['error' => 'Unauthorized'], 401);
        // }        

        $idea->delete();

        return response()->json($idea, 200);
    }
   
}
