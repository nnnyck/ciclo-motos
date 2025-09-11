import Card from "../components/Card"; // ajuste o caminho conforme seu projeto

export default function ProblemAgitation() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-[2.5rem] leading-[1.2] font-extrabold font-montserrat mb-6 text-gray-900">
            Cansado de problemas com sua moto?
          </h2>
          <p className="font-montserrat text-lg text-gray-500 max-w-3xl mx-auto">
            Sabemos como é frustrante lidar com mecânicos pouco confiáveis, reparos caros e vendedores de motos duvidosos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card
            title="Reparos Caros"
            description="Taxas escondidas e custos de mão de obra inflacionados"
            icon={
              <svg
                className="w-8 h-8 text-red-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" />
              </svg>
            }
            iconBgClass="bg-red-400"
          />

          <Card
            title="Falta de Confiança"
            description="Histórico duvidoso das motos e problemas ocultos"
            icon={
              <svg
                className="w-8 h-8 text-red-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" />
              </svg>
            }
            iconBgClass="bg-red-400"
          />

          <Card
            title="Atendimento Ruim"
            description="Longa espera e tratamento pouco profissional"
            icon={
              <svg
                className="w-8 h-8 text-red-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" />
              </svg>
            }
            iconBgClass="bg-red-400"
          />

          <Card
            title="Falta de Transparência"
            description="Preços pouco claros e processos de reparo misteriosos"
            icon={
              <svg
                className="w-8 h-8 text-red-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" />
              </svg>
            }
            iconBgClass="bg-red-400"
          />  
        </div>
      </div>
    </section>
  );
}
