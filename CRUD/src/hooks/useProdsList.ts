import { useEffect, useState } from "react";
import { api } from "../libs/axios";

export const useProdsList = () => {
  const [prod, setProds] = useState<any[]>([]);

  // Função para buscar os usuários
  const fetchProds = async () => {
    try {
      const { data } = await api.get("/api/products");
      setProds(data.map((value: any) => ({
        ...value, 
        id: String(value.code) 
      })));
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  };

  // Carregar os usuários ao montar o componente
  useEffect(() => {
    fetchProds();
  }, []);

  return { prod, fetchProds };
};
