import { router } from '@inertiajs/react';

export default function Dashboard() {
  const logout = () => {
    router.post('/logout');
  };

  return (
    <div className="relative min-h-screen bg-gray-900 text-white">
      {/* Botón de Logout en la esquina superior derecha */}
      <button
        onClick={logout}
        className="absolute top-4 right-4 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md transition-colors"
      >
        Cerrar sesión
      </button>

      {/* Contenedor centrado */}
      <div className="flex items-center justify-center h-full">
        <h1 className="text-3xl font-bold">Bienvenido al Dashboard</h1>
      </div>
    </div>
  );
}