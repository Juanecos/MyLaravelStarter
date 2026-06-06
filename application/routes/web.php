<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\LoginController;
use Inertia\Inertia;

// Route::inertia('/', 'welcome')->name('home');

// Route::get('/hola', function() {
//     return Inertia::render('HolaMundo',[
//         'mensaje' => 'Hola mundo desde Laravel + Inertia, que tal todo',
//     ]);
// });


// Route::get('/login', function () {
//     return Inertia::render('Auth/Login');
// });
// Route::get('/login', [LoginController::class, 'index'])->name('login');
// Route::post('/login', [LoginController::class, 'login']);
// Route::post('/logout', [LoginController::class, 'logout'])->name('logout');



// Login
Route::get('/login', [LoginController::class, 'showLogin'])->name('login');
Route::post('/login', [LoginController::class, 'login']);

// Registro
Route::get('/register', [LoginController::class, 'showRegister'])->name('register');
Route::post('/register', [LoginController::class, 'register']);

// Dashboard protegido
Route::get('/dashboard', [LoginController::class, 'dashboard'])->middleware('auth')->name('dashboard');

// Logout
Route::post('/logout', [LoginController::class, 'logout'])->name('logout');