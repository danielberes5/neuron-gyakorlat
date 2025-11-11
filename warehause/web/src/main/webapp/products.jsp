<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<html lang="hu">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Products</title>

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css">

    <style>
        body {
            background-color: #1a6d8c;
            min-height: 100vh;
            min-width: 25%;
            display: flex;
            flex-direction: column;
        }

        .navbar-custom {
            border-bottom: 5px solid blue;
        }

        .table-card {
            background-color: #fff;
            border-radius: 15px;
            padding: 20px 30px;
            width: 90%;
            max-width: 900px;
            margin: 50px auto;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }

        #loadingOverlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: none;
            justify-content: center;
            align-items: center;
            z-index: 9999;
        }

        #loadingOverlay .spinner-border {
            width: 4rem;
            height: 4rem;
        }
    </style>
</head>
<body>

<div id="loadingOverlay">
    <div class="text-center text-white">
        <div class="spinner-border text-light" role="status"></div>
        <h5 class="mt-3">Betöltés...</h5>
    </div>
</div>

<nav class="navbar navbar-expand-lg navbar-custom">
    <div class="container">
        <a class="navbar-brand" href="#">Warehouse</a>
    </div>
</nav>

<div class="table-card">

    <div class="d-flex justify-content-between align-items-center mb-4">
        <h3>Termékek listája</h3>
        <button class="btn btn-primary" id="refreshBtn">
            <i class="bi bi-arrow-clockwise"></i> Frissítés
        </button>
    </div>

    <table class="table table-bordered table-striped">
        <thead class="table-primary">
            <tr>
                <th>Név</th>
                <th>Kategória</th>
                <th>Mennyiségi egység</th>
                <th>Mértékegység</th>
                <th>Beszerzési ár</th>
                <th>Eladási ár</th>
                <th>Leírás</th>
            </tr>
        </thead>
        <tbody id="productTableBody">
            <c:forEach var="product" items="${sessionScope.products}">
                <tr>
                    <td>${product.name}</td>
                    <td>${product.category}</td>
                    <td>${product.quantityUnit}</td>
                    <td>${product.unit}</td>
                    <td>${product.purchasePrice}</td>
                    <td>${product.sellingPrice}</td>
                    <td>${product.description}</td>
                </tr>
            </c:forEach>
        </tbody>
    </table>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
<script src="products.js"></script>

</body>
</html>
