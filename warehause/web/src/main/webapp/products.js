const refreshBtn = document.getElementById("refreshBtn");
const tableBody = document.getElementById("productTableBody");
const loading = document.getElementById("loadingOverlay");

refreshBtn.addEventListener("click", () => {
    loading.style.display = "flex";

    fetch("/api/ProductService/getProducts")
        .then(res => res.json())
        .then(products => {
            tableBody.innerHTML = "";
            products.forEach(p => {
                const row = tableBody.insertRow();
                row.insertCell().textContent = p.name;
                row.insertCell().textContent = p.category;
                row.insertCell().textContent = p.quantityUnit;
                row.insertCell().textContent = p.unit;
                row.insertCell().textContent = p.purchasePrice;
                row.insertCell().textContent = p.sellingPrice;
                row.insertCell().textContent = p.description;
            });
        })
        .catch(err => alert("Hiba adatbetöltés közben!"))
        .finally(() => loading.style.display = "none");
});
