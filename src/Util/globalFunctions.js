export const logout = () => {
    if (window.confirm("Çıkış yapmak istiyor musun?") === true) {
        localStorage.clear()
        window.location.reload()
    } else {
        return false
    }
}

export const addItem = (id) => {
    let nowData = JSON.parse(localStorage.getItem("userInventory"))
    if (nowData.inventory.some(item => item === id)) return alert("Bu ürün zaten sepette.")
    nowData.inventory.push(id)
    nowData = JSON.stringify(nowData)
    localStorage.setItem("userInventory", nowData)
}

export const removeItem = (id) => {
    let nowData = JSON.parse(localStorage.getItem("userInventory"))
    if (!nowData.inventory.some(item => item === id)) return alert("Bu ürün zaten sepetenizde yok.")
    nowData.inventory = nowData.inventory.filter(item => item !== id)
    nowData = JSON.stringify(nowData)
    localStorage.setItem("userInventory", nowData)
}