import { Employee } from './Employee';
import { EmployeeRepository } from './EmployeeRepository';

const employeeRepository = new EmployeeRepository();

export const getAllEmployees = async (): Promise<Employee[]> => {
  return await employeeRepository.getAll();
};

export const getEmployee = async (id: number): Promise<Employee | null> => {
  return await employeeRepository.getById(id);
};

export const createNewEmployee = async (data: Employee): Promise<Employee> => {
  return await employeeRepository.create(data);
};

export const updateExistingEmployee = async (id: number, data: Employee): Promise<Employee> => {
  return await employeeRepository.update(id, data);
};

export const deleteExistingEmployee = async (id: number): Promise<Employee> => {
  return await employeeRepository.delete(id);
};