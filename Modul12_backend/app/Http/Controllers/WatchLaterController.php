<?php

namespace App\Http\Controllers;

use App\Models\WatchLater;
use Illuminate\Http\Request;

class WatchLaterController extends Controller
{
    // Menampilkan semua video "Watch Later" dari user tertentu
    public function index($id_user)
    {
        $watchLaters = WatchLater::where('id_user', $id_user)->with('content')->get();
        return response()->json($watchLaters);
    }

    // Menambah video ke "Watch Later"
    public function store(Request $request)
    {
        $request->validate([
            'id_user' => 'required|exists:users,id',
            'id_content' => 'required|exists:contents,id',
        ]);

        $watchLater = WatchLater::create([
            'id_user' => $request->id_user,
            'id_content' => $request->id_content,
            'date_added' => now(),
        ]);

        return response()->json(['message' => 'Video added to Watch Later', 'data' => $watchLater], 201);
    }

    // Menghapus video dari "Watch Later"
    public function destroy($id)
    {
        $watchLater = WatchLater::findOrFail($id);
        $watchLater->delete();

        return response()->json(['message' => 'Video removed from Watch Later']);
    }
}
