import { useEffect, useState } from "react";
import { api } from "../libs/axios";
import { API_BASE_URL } from '../config/apiConfig';

export const useUsersList = () => { //Hook utilizado para requisitar a lista de clientes
  const [users, setUsers] = useState<any[]>([]);

  // Função para buscar os usuários
  const fetchUsers = async () => {
    try {
      const { data } = await api.get(`${API_BASE_URL}/api/users`); //Requisita lista de cliente
      console.log(data)
      setUsers(data.map((value: any) => ({
        id: String(value.ID),
        name: value.Nome,
        cpf: value.CPF,
        phone: value.Telefone
      })));
      console.log(users)
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    }
  };

  // Carregar os usuários ao montar o componente
  useEffect(() => {
    fetchUsers();
  }, []);

  return { users, fetchUsers };
};
