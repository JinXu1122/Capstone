<?php

use App\Http\Controllers\IdeaController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    // Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    // Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    // Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::post('/ideas/create', [IdeaController::class, 'store'])->name('ideas.store');
    Route::post('/ideas/{idea}/upvotes', [IdeaController::class, 'upvote'])->name('ideas.upvote');
    Route::post('/ideas/{idea}/comments', [IdeaController::class, 'addComment'])->name('ideas.comment');
    Route::put('/ideas/{idea}', [IdeaController::class, 'update'])->name('ideas.update');
    Route::delete('/ideas/{idea}', [IdeaController::class, 'destroy'])->name('ideas.destroy');

});

 Route::get('/ideas', [IdeaController::class, 'index'])->name('ideas.index');
// // Route to get upvotes for an idea
// Route::get('ideas/{idea}/upvotes', [UpvoteController::class, 'index']);
// // Route to get comments for an idea
// Route::get('ideas/{idea}/comments', [CommentController::class, 'index']);


require __DIR__.'/auth.php';
