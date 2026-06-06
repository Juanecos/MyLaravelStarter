import { FormEvent } from 'react';
import { useForm } from '@inertiajs/react';

export default function Register() {
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    email: '',
    password: '',
    confirm_password: '',
  });

  const submit = (e: FormEvent) => {
    e.preventDefault();
    post('/register');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="w-full max-w-md p-8 bg-gray-800 rounded-xl shadow-lg">
        <h1 className="text-2xl font-semibold text-white mb-6 text-center">Registro</h1>
        
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-200">Nombre</label>
            <input
              type="text"
              placeholder="Nombre"
              value={data.name}
              onChange={(e) => setData('name', e.target.value)}
              className="mt-1 block w-full px-4 py-2 border rounded-md bg-gray-700 text-white placeholder-gray-400 focus:ring-purple-500 focus:border-purple-500 border-gray-600"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200">Email</label>
            <input
              type="email"
              placeholder="Email"
              value={data.email}
              onChange={(e) => setData('email', e.target.value)}
              className="mt-1 block w-full px-4 py-2 border rounded-md bg-gray-700 text-white placeholder-gray-400 focus:ring-purple-500 focus:border-purple-500 border-gray-600"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200">Contraseña</label>
            <input
              type="password"
              placeholder="Contraseña"
              value={data.password}
              onChange={(e) => setData('password', e.target.value)}
              className="mt-1 block w-full px-4 py-2 border rounded-md bg-gray-700 text-white placeholder-gray-400 focus:ring-purple-500 focus:border-purple-500 border-gray-600"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200">Confirmar Contraseña</label>
            <input
              type="password"
              placeholder="Confirmar Contraseña"
              value={data.confirm_password}
              onChange={(e) => setData('confirm_password', e.target.value)}
              className="mt-1 block w-full px-4 py-2 border rounded-md bg-gray-700 text-white placeholder-gray-400 focus:ring-purple-500 focus:border-purple-500 border-gray-600"
            />
            {errors.confirm_password && <p className="text-red-500 text-sm mt-1">{errors.confirm_password}</p>}
          </div>

          <button
            type="submit"
            disabled={processing}
            className="w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-md transition-colors disabled:opacity-50"
          >
            Registrarse
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-400">
          ¿Ya tienes cuenta? <a href="/login" className="text-purple-500 hover:underline">Inicia sesión</a>
        </p>
      </div>
    </div>
  );
}