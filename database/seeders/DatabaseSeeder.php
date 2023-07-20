<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Upvote;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        \App\Models\User::factory()->create([
            'name' => 'Jin Xu',
            'email' => 'jin@email.com',
            'password' => Hash::make('password')
        ]);

        \App\Models\User::factory(9)->create();

        $this->call([
            IdeaSeeder::class,
            UpvoteSeeder::class,
            CommentSeeder::class
        ]);
    }
}
