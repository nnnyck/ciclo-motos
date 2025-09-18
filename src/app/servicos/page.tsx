"use client";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { servicesMock, availableSlotsMock, mockUser } from "@/mocks/data";

type Service = {
  id: string;
  name: string;
  duration: string;
};

const fetchServices = async (): Promise<Service[]> => {
  return new Promise((resolve) =>
    setTimeout(
      () =>
        resolve([
          { id: "oil", name: "Troca de óleo", duration: "30 min" },
          { id: "brake", name: "Troca de pastilha de freio", duration: "45 min" },
          { id: "review", name: "Revisão completa", duration: "2h" },
        ]),
      300
    )
  );
};

const fetchAvailableSlots = async (): Promise<string[]> => {
  return new Promise((resolve) =>
    setTimeout(
      () =>
        resolve([
          "2025-09-17 09:00",
          "2025-09-17 11:00",
          "2025-09-17 14:00",
          "2025-09-18 10:00",
          "2025-09-18 16:00",
        ]),
      300
    )
  );
};

const fetchUser = async (): Promise<{ name: string; email: string; phone: string }> => {
  return new Promise((resolve) =>
    setTimeout(
      () =>
        resolve({
          name: "Maria Eduarda",
          email: "maria@teste.com",
          phone: "(11) 99999-9999",
        }),
      300
    )
  );
};

// Modal
function ConfirmationModal({
  service,
  slot,
  user,
  onClose,
  onAgendarOutro,
}: {
  service: Service;
  slot: string;
  user: { name: string; email: string; phone: string };
  onClose: () => void;
  onAgendarOutro: () => void;
}) {
  const [confirmed, setConfirmed] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => setVisible(true), []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => onClose(), 300);
  };

  const handleAgendarOutro = () => {
    setVisible(false);
    setTimeout(() => onAgendarOutro(), 300);
  };

  const navigateToHome = () => {
    window.location.href = "/";
  }

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-300 ${
        visible ? "bg-black/20 opacity-100" : "bg-black/0 opacity-0"
      }`}
    >
      <div
        className={`bg-white rounded-2xl shadow-xl p-8 max-w-md w-full transform transition-all duration-300 ${
          visible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
        }`}
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl font-bold"
        >
          &times;
        </button>

        <div className="flex justify-center mb-4">
          <FontAwesomeIcon
            icon={faCheckCircle}
            className={`text-5xl ${confirmed ? "text-green-500" : "text-gray-400"}`}
          />
        </div>

        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
          {confirmed ? "Agendamento Confirmado!" : "Confirme seu Agendamento"}
        </h2>

        <p className="text-center text-gray-600 mb-6">
          {confirmed
            ? `Seu agendamento foi realizado com sucesso!`
            : `Confira os dados abaixo e clique em confirmar para finalizar.`}
        </p>

        {!confirmed && (
          <>
            {/* Serviço e horário */}
            <div className="bg-gray-50 p-4 rounded-lg mb-4 space-y-2 text-gray-800">
              <p>
                <span className="font-semibold">Serviço:</span> {service.name}
              </p>
              <p>
                <span className="font-semibold">Horário:</span>{" "}
                {new Date(slot).toLocaleString("pt-BR", {
                  weekday: "short",
                  day: "2-digit",
                  month: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>

            {/* Informações do usuário */}
            <div className="bg-gray-50 p-4 rounded-lg mb-6 space-y-2 text-gray-800">
              <p>
                <span className="font-semibold">Nome:</span> {user.name}
              </p>
              <p>
                <span className="font-semibold">Email:</span> {user.email}
              </p>
              <p>
                <span className="font-semibold">Telefone:</span> {user.phone}
              </p>
            </div>

            <button
              onClick={() => setConfirmed(true)}
              className="w-full bg-green-500 text-white py-3 rounded-xl font-semibold hover:bg-green-600 transition"
            >
              Confirmar Agendamento
            </button>
          </>
        )}

        {confirmed && (
          <div className="flex flex-col gap-3">
            <button
              onClick={navigateToHome}
              className="w-full bg-[#f36a21] text-white py-3 rounded-xl font-semibold hover:bg-[#e05d1c] transition"
            >
              Voltar para a tela inicial
            </button>
            <button
              onClick={handleAgendarOutro}
              className="w-full bg-green-500 text-white py-3 rounded-xl font-semibold hover:bg-green-600 transition"
            >
              Agendar outro serviço
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function AgendarServicos() {
  const [services, setServices] = useState<Service[]>([]);
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [user, setUser] = useState<{ name: string; email: string; phone: string } | null>(null);

  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      const services = await fetchServices();
      setServices(services);

      const slots = await fetchAvailableSlots();
      setAvailableSlots(slots);

      const user = await fetchUser();
      setUser(user);
    };
    loadData();
  }, []);

  const handleAgendarOutro = () => {
    setShowModal(false);
    setSelectedService(null);
    setSelectedSlot(null);
  };

  return (
    <main className="bg-gray-50 min-h-screen py-12 px-4">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-extrabold text-gray-800">
          Agende seu Serviço
        </h1>
        <p className="text-gray-600 mt-2">
          Escolha o serviço, veja o tempo estimado e selecione um horário disponível.
        </p>
      </div>

      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8 space-y-6">
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Escolha o serviço:
          </label>
          <select
            className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-400 text-black border-gray-300"
            onChange={(e) =>
              setSelectedService(services.find((s) => s.id === e.target.value) || null)
            }
            value={selectedService?.id || ""}
          >
            <option value="" disabled>
              -- Selecione --
            </option>
            {services.map((service) => (
              <option key={service.id} value={service.id}>
                {service.name}
              </option>
            ))}
          </select>
        </div>

        {selectedService && (
          <div className="p-4 bg-blue-50 rounded-lg text-center">
            <p className="text-gray-700">
              Tempo estimado para realizar o serviço:{" "}
              <span className="font-semibold">{selectedService.duration}</span>
            </p>
          </div>
        )}

        {selectedService && (
          <div>
            <p className="font-medium text-gray-700 mb-3">
              Escolha um horário disponível:
            </p>
            <div className="grid grid-cols-2 gap-3">
              {availableSlots.map((slot) => (
                <button
                  key={slot}
                  onClick={() => setSelectedSlot(slot)}
                  className={`p-3 rounded-lg border text-sm transition ${
                    selectedSlot === slot
                      ? "text-white"
                      : "bg-gray-100 text-black hover:bg-gray-200 border-gray-300"
                  }`}
                  style={
                    selectedSlot === slot
                      ? { backgroundColor: "#f36a21", borderColor: "#f36a21" }
                      : {}
                  }
                >
                  {new Date(slot).toLocaleString("pt-BR", {
                    weekday: "short",
                    day: "2-digit",
                    month: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </button>
              ))}
            </div>
          </div>
        )}

        {selectedService && selectedSlot && user && (
          <div className="pt-4">
            <button
              className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition"
              onClick={() => setShowModal(true)}
            >
              Confirmar Agendamento
            </button>
          </div>
        )}
      </div>

      {showModal && selectedService && selectedSlot && user && (
        <ConfirmationModal
          service={selectedService}
          slot={selectedSlot}
          user={user}
          onClose={() => setShowModal(false)}
          onAgendarOutro={handleAgendarOutro}
        />
      )}
    </main>
  );
}
