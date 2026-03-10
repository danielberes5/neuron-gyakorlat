const refreshBtn = document.getElementById("refreshBtn");
const tableBody = document.getElementById("productTableBody");
const loading = document.getElementById("loadingOverlay");
const filterName = document.getElementById("filterName");
const filterCategory = document.getElementById("filterCategory");
const filterUnit = document.getElementById("filterUnit");
const pagination = document.getElementById("pagination");

let currentPage = 1;
const pageSize = 3;

function loadCategories() {
    fetch("/api/categories")
        .then(res => res.json())
        .then(categories => {
            categories.forEach(c => {
                const opt = document.createElement("option");
                opt.value = c.id;
                opt.textContent = c.name;
                filterCategory.appendChild(opt);
            });
        });
}

function loadProducts(page = 1) {
    currentPage = page;

    const params = new URLSearchParams({
        page: page,
        pageSize: pageSize,
        name: filterName.value,
        categoryId: filterCategory.value,
        unitId: filterUnit.value
    });

    loading.style.display = "flex";

    fetch("/api/ProductService/getProducts?" + params)
        .then(res => res.json())
        .then(data => {
            tableBody.innerHTML = "";

            data.items.forEach(p => {
                const row = tableBody.insertRow();
                row.insertCell().textContent = p.name;
                row.insertCell().textContent = p.category.name;
                row.insertCell().textContent = p.quantityUnit;
                row.insertCell().textContent = p.unit.name;
                row.insertCell().textContent = p.purchasePrice;
                row.insertCell().textContent = p.sellingPrice;
                row.insertCell().textContent = p.description;
            });

            buildPagination(data.page, data.pageSize, data.total);
        })
        .catch(() => console.error("REST hiba:", err)/*alert("Hiba adatbetöltés közben!")*/)
        .finally(() => loading.style.display = "none");
}

function buildPagination(page, pageSize, total) {
    const totalPages = Math.ceil(total / pageSize);

    pagination.innerHTML = "";

    for (let p = 1; p <= totalPages; p++) {
        const btn = document.createElement("button");
        btn.textContent = p;
        btn.className = "btn btn-sm btn-outline-primary mx-1";

        if (p === page) {
            btn.classList.add("active");
        }

        btn.addEventListener("click", () => loadProducts(p));

        pagination.appendChild(btn);
    }
}

refreshBtn.addEventListener("click", () => loadProducts(1));

filterName.addEventListener("input", () => loadProducts(1));
filterCategory.addEventListener("change", () => loadProducts(1));
filterUnit.addEventListener("change", () => loadProducts(1));

loadCategories();
loadProducts(1);
