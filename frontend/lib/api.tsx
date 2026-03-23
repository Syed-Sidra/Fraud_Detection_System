import axios from "axios"

const API = axios.create({
  baseURL: "http://localhost:8080"
})

export const generateBulkTransactions = async (count:number) => {
  const res = await API.post(`/api/transactions/generate/bulk?count=${count}`)
  return res.data
}

export const checkFraud = async (transaction:any) => {
  const res = await API.post("/fraud/check", transaction)
  return res.data
}