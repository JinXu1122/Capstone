<?php

namespace Database\Seeders;

use App\Models\Idea;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class IdeaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //DB::table('ideas')->dba_insert
        Idea::factory()->count(10)->create();
    }
}
