import axios from "axios"

export const getStore = async () => {
    let { data } = await axios.get(`https://fakestoreapi.com/products/`).catch(() => {
        return false
    })
    return data
}