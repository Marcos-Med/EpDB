import { useEffect, useState } from "react";
import { api } from "../libs/axios";

export const useUsersList = () => {
  const [users, setUsers] = useState<any[]>([]);

  // Função para buscar os usuários
  const fetchUsers = async () => {
    try {
      const { data } = await api.get("/api/users");
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
