'use client';

import { useEffect, useState } from 'react';

// Tipos básicos
interface Producto {
  id: string;
  nombre: string;
  precio: number;
  costo: number;
  stock: number;
  categoria: string;
}

interface Venta {
  id: string;
  fecha: string;
  productos: { producto: Producto; cantidad: number }[];
  total: number;
}

// Base de datos local simple
const obtenerProductos = (): Producto[] => {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem('printco_productos');
  return data ? JSON.parse(data) : [];
};

const guardarProductos = (productos: Producto[]) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('printco_productos', JSON.stringify(productos));
};

const cargarProductosIniciales = () => {
  if (obtenerProductos().length > 0) return;

  const productosIniciales: Producto[] = [
    { id: '1', nombre: 'A4 OBRA 80 GRS BLANCO Y NEGRO SIMPLE FAZ', precio: 100, costo: 40, stock: 1000, categoria: 'impresion' },
    { id: '2', nombre: 'A4 OBRA 80 GRS BLANCO Y NEGRO DOBLE FAZ', precio: 75, costo: 25, stock: 1000, categoria: 'impresion' },
    { id: '3', nombre: 'A4 OBRA 80 GRS COLOR SIMPLE FAZ', precio: 200, costo: 80, stock: 1000, categoria: 'impresion' },
    { id: '4', nombre: 'A4 OBRA 80 GRS COLOR DOBLE FAZ', precio: 150, costo: 50, stock: 1000, categoria: 'impresion' },
    { id: '5', nombre: 'A4 OBRA 180 GRS COLOR', precio: 800, costo: 300, stock: 1000, categoria: 'impresion' },
    { id: '6', nombre: 'A4 OBRA 240 GRS COLOR', precio: 1000, costo: 300, stock: 1000, categoria: 'impresion' },
    { id: '7', nombre: 'A4 AUTOADHESIVO COLOR', precio: 1500, costo: 370, stock: 1000, categoria: 'impresion' },
    { id: '8', nombre: 'A4 ILUSTRACION 150 GRS COLOR', precio: 1000, costo: 235, stock: 1000, categoria: 'impresion' },
    { id: '9', nombre: 'ENCUADERNADO 20MM', precio: 2300, costo: 456, stock: 1000, categoria: 'servicios' },
    { id: '10', nombre: 'ENCUADERNADO 25MM', precio: 2500, costo: 530, stock: 1000, categoria: 'servicios' }
  ];

  guardarProductos(productosIniciales);
};

export default function HomePage() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    cargarProductosIniciales();
    setProductos(obtenerProductos());
    setCargando(false);
  }, []);

  if (cargando) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando Print & Co...</p>
        </div>
      </div>
    );
  }

  const ventasHoy = 0; // Simplificado por ahora
  const stockBajo = productos.filter(p => p.stock < 50).length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          🏪 Print & Co
        </h1>
        <p className="text-xl text-gray-600">
          Sistema de Ventas Profesional
        </p>
        <div className="mt-4 inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm">
          <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
          Sistema Operativo • {new Date().toLocaleDateString('es-AR')}
        </div>
      </div>

      {/* Métricas Principales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <div className="text-3xl font-bold text-blue-600 mb-2">
            {productos.length}
          </div>
          <div className="text-sm text-gray-600">Productos Cargados</div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 text-center">
          <div className="text-3xl font-bold text-green-600 mb-2">
            {ventasHoy}
          </div>
          <div className="text-sm text-gray-600">Ventas Hoy</div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 text-center">
          <div className="text-3xl font-bold text-red-600 mb-2">
            {stockBajo}
          </div>
          <div className="text-sm text-gray-600">Stock Bajo</div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 text-center">
          <div className="text-3xl font-bold text-purple-600 mb-2">
            $0
          </div>
          <div className="text-sm text-gray-600">Ingresos Hoy</div>
        </div>
      </div>

      {/* Navegación Rápida */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-6 text-center hover:shadow-md transition-shadow cursor-pointer">
          <div className="text-2xl mb-2">💰</div>
          <div className="font-medium text-gray-900">Nueva Venta</div>
          <div className="text-sm text-gray-500">Registrar venta</div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 text-center hover:shadow-md transition-shadow cursor-pointer">
          <div className="text-2xl mb-2">📦</div>
          <div className="font-medium text-gray-900">Productos</div>
          <div className="text-sm text-gray-500">Gestionar catálogo</div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 text-center hover:shadow-md transition-shadow cursor-pointer">
          <div className="text-2xl mb-2">📊</div>
          <div className="font-medium text-gray-900">Stock</div>
          <div className="text-sm text-gray-500">Control inventario</div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 text-center hover:shadow-md transition-shadow cursor-pointer">
          <div className="text-2xl mb-2">📈</div>
          <div className="font-medium text-gray-900">Reportes</div>
          <div className="text-sm text-gray-500">Análisis y métricas</div>
        </div>
      </div>

      {/* Lista de Productos */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900">
            📋 Tus Productos Cargados
          </h2>
          <p className="text-sm text-gray-600">
            Productos específicos de tu imprenta listos para usar
          </p>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {productos.slice(0, 9).map((producto) => (
              <div key={producto.id} className="border rounded-lg p-4 hover:shadow-sm transition-shadow">
                <div className="font-medium text-gray-900 mb-1">
                  {producto.nombre}
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-green-600 font-medium">
                    ${producto.precio.toLocaleString()}
                  </span>
                  <span className="text-gray-500">
                    Stock: {producto.stock}
                  </span>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Costo: ${producto.costo.toLocaleString()} • Margen: {((producto.precio - producto.costo) / producto.precio * 100).toFixed(1)}%
                </div>
              </div>
            ))}
          </div>

          {productos.length > 9 && (
            <div className="text-center mt-4">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Ver todos los {productos.length} productos
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Sistema Funcionando */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">
            🎉 ¡Print & Co Está Operativo!
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-blue-800 mb-2">✅ Sistema Web</h3>
              <p className="text-sm text-blue-700">
                Funciona en cualquier navegador, acceso desde cualquier dispositivo.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-blue-800 mb-2">🖥️ App de Escritorio</h3>
              <p className="text-sm text-blue-700">
                Aplicación nativa con menús y atajos del sistema operativo.
              </p>
            </div>
          </div>
          
          <div className="mt-6 space-y-2">
            <p className="text-blue-800 font-medium">
              🤖 Stock Automatizado • 📊 Control Financiero • 📈 Reportes Ejecutivos
            </p>
            <p className="text-sm text-blue-600">
              {productos.length} productos específicos de tu imprenta ya cargados y listos para usar
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}