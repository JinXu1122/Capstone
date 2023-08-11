<?php

use App\Http\Controllers\IdeaController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\UpvoteController;
use App\Models\Comment;
use App\Models\Upvote;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

// a protected group of routes
Route::middleware(['auth:sanctum'])->group(function() {
    // any route in here is protected
    Route::apiResource('users.ideas', IdeaController::class);

    // Route to update an idea
    Route::put('ideas/{idea}', [IdeaController::class, 'update']);

    // Route to delete an idea
    Route::delete('ideas/{idea}', [IdeaController::class, 'destroy']);

    // Route for upvoting an idea
    Route::post('users/{user}/ideas/{idea}/upvotes', [UpvoteController::class, 'store']);

    // Route for commenting an idea
    Route::post('users/{user}/ideas/{idea}/comments', [CommentController::class, 'store']);
});

//unprotected group of routes
Route::apiResource('ideas', IdeaController::class);
Route::apiResource('ideas.comments', CommentController::class);
Route::apiResource('ideas.upvotes', UpvoteController::class);



