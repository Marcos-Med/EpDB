import { useEffect, useState } from "react";
import { api } from "../libs/axios";

export const useProdsList = () => {
  const [prod, setProds] = useState<any[]>([]);

  // Função para buscar os produtos
  const fetchProds = async () => {
    try {
      const { data } = await api.get(`/api/products`); //Busca a lista de produtos
      setProds(data.map((value: any) => ({ //Insere no array
        id: String(value.Codigo_de_Barras),
        name: value.Nome,
        value: value.Valor

      })));
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  };

  // Carregar os produtos ao montar o componente
  useEffect(() => {
    fetchProds();
  }, []);

  return { prod, fetchProds }; //Devolve o array e a função de busca de produtos
};
