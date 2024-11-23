import { useEffect, useState } from "react";
import { api } from "../libs/axios";

export const useUsersList = () => { //Hook utilizado para requisitar a lista de clientes
  const [users, setUsers] = useState<any[]>([]);

  // Função para buscar os usuários
  const fetchUsers = async () => {
    try {
      const { data } = await api.get("/api/users"); //Requisita lista de cliente
      setUsers(data.map((value: any) => ({
        ...value, 
        id: String(value.id) 
      })));
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
