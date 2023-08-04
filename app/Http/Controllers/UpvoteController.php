<?php

namespace App\Http\Controllers;

use App\Models\Idea;
use App\Models\Upvote;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class UpvoteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Idea $idea)
    {
        //$upvotes = Upvote::all();

        return response()->json($idea->upvotes, 200);
    }

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
    public function store(Request $request, User $user, Idea $idea)
    {

        // Check if the user is authenticated
        if (!Auth::check()) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        // Check if the user has already upvoted this idea
        // $existingUpvote = Upvote::where('user_id', Auth::id())
        //     ->where('idea_id', $ideaId)
        //     ->first();

        // if ($existingUpvote) {
        //     return response()->json(['error' => 'You have already upvoted this idea.'], 400);
        // }

        // Check if the idea belongs to the user
         //$idea = Idea::where('user_id', $userId)->findOrFail($ideaId);

         //// Log the values of $user->id and $idea->id
        Log::info('User ID: ' . $user->id);
        Log::info('Idea ID: ' . $idea->id);
       

        // Create a new upvote for the idea        
        $upvote = new Upvote([
            'user_id' => $user->id,
            'idea_id' => $idea->id
        ]);
        

        $upvote->save();

        return response()->json($upvote, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Upvote $upvote)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Upvote $upvote)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Upvote $upvote)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Upvote $upvote)
    {
        
    }
}
