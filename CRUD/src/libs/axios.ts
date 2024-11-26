import axios from "axios";

import { API_BASE_URL } from "../config/apiConfig"; //URL base da API

export const api = axios.create({ //Cria uma conexão na API
    baseURL: API_BASE_URL,
    headers: {
      'Content-Type': 'application/json'
    }
  });