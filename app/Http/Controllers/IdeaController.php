<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Idea;
use App\Models\Upvote;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class IdeaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $ideas = Idea::withCount('upvotes', 'comments')->get();

        return Inertia::render('Ideas/Index', [
            'ideas' => $ideas,
            'auth' => Auth::check() ? [
                'user' => [
                    'id' => auth()->id(),
                    'name' => auth()->user()->name,
                ],
                'token' => session()->get('token'),
            ] : null
        ]);
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
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'title' => ['required', 'max:255'],
            'content' => ['required'],
        ]);
    
        // Create a new idea associated with the logged-in user
        $idea = new Idea([
            'title' => $validatedData['title'],
            'content' => $validatedData['content']
        ]);

        $request->user()->ideas()->save($idea);

        return redirect(route('ideas.index'));
        
    }

    public function upvote(Idea $idea)
    {
        // Create and save a new Upvote
        $upvote = new Upvote([
            'user_id' => auth()->id(),
        ]);

        $idea->upvotes()->save($upvote);

        return back();
    }

    public function addComment(Request $request, Idea $idea)
    {
        $request->validate([
            'content' => 'required|string',
        ]);

        // Create and associate the comment with the idea
        $comment = new Comment([
            'user_id' => auth()->id(),
            'content' => $request->input('content')
        ]);

        $idea->comments()->save($comment);

        //return back()->with('success', 'Comment added successfully.');
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
        // Validate the incoming request data
        $request->validate([
            'title' => ['required', 'max:255'],
            'content' => ['required'],
        ]);

        $idea->title = $request->input('title');
        $idea->content = $request->input('content');

        $idea->save();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Idea $idea)
    {
        $idea->delete();
    }
}
