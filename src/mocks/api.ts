import { servicesMock, availableSlotsMock, mockUser, Service } from "./data";

export const fetchServices = async (): Promise<Service[]> => {
  return new Promise((resolve) => setTimeout(() => resolve(servicesMock), 300));
};

export const fetchAvailableSlots = async (): Promise<string[]> => {
  return new Promise((resolve) => setTimeout(() => resolve(availableSlotsMock), 300));
};

export const fetchUser = async (): Promise<{ name: string; email: string; phone: string }> => {
  return new Promise((resolve) => setTimeout(() => resolve(mockUser), 300));
};
