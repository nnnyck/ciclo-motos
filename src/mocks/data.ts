export type Service = {
  id: string;
  name: string;
  duration: string;
};

export const servicesMock: Service[] = [
  { id: "oil", name: "Troca de óleo", duration: "30 min" },
  { id: "brake", name: "Troca de pastilha de freio", duration: "45 min" },
  { id: "review", name: "Revisão completa", duration: "2h" },
];

export const availableSlotsMock: string[] = [
  "2025-09-17 09:00",
  "2025-09-17 11:00",
  "2025-09-17 14:00",
  "2025-09-18 10:00",
  "2025-09-18 16:00",
];

export const mockUser = {
  name: "Maria Eduarda",
  email: "maria@teste.com",
  phone: "(11) 99999-9999",
};
