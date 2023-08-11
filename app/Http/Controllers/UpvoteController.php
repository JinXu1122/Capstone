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

        // 
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
        //
    }
}
