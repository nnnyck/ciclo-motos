'use client'

export default function AccessDenied() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center p-6 border rounded shadow-lg">
        <h1 className="text-2xl font-bold mb-4">🚫 Acesso Negado</h1>
        <p className="text-gray-600">
          Você não possui permissão para acessar esta página. Redirecionando...
        </p>
      </div>
    </div>
  )
}
