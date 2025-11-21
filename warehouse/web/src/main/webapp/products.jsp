<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<html lang="hu">
<head>
    <meta charset="UTF-8">
    <title>Products</title>

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">

    <style>
        body {
            background-color: #1a6d8c;
            min-height: 100vh;
        }

        .navbar-custom {
          border-bottom: 5px solid blue;
        }

        .navbar-brand {
          color: black !important;
          font-weight: 600;
        }

        .navbar-nav .nav-link {
          color: black !important;
        }

        .navbar-nav .nav-link:hover {
          color: #fff !important;
        }

        .table-card {
            background-color: #fff;
            border-radius: 15px;
            padding: 20px 30px;
            width: 90%;
            max-width: 1100px;
            margin: 40px auto;
        }

        #loadingOverlay {
            position: fixed;
            inset: 0;
            background: rgba(0,0,0,0.5);
            display: none;
            justify-content: center;
            align-items: center;
            z-index: 9999;
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
        <a class="navbar-brand" href="#">
            Warehouse
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ms-auto">
                <li class="nav-item"><a class="nav-link" href="/products">Products</a></li>
                <li class="nav-item"><a class="nav-link" href="#">Orders</a></li>
                <li class="nav-item"><a class="nav-link" href="/secured/profile.html">Profile</a></li>
            </ul>
        </div>
    </div>
</nav>

<div class="table-card">

    <h3 class="mb-4">Termékek</h3>

    <div class="row mb-4">
        <div class="col-4">
            <input id="filterName" class="form-control" placeholder="Keresés név alapján...">
        </div>

        <div class="col-4">
            <select id="filterCategory" class="form-control">
                <option value="">Minden kategória</option>
            </select>
        </div>

        <div class="col-3">
            <select id="filterUnit" class="form-control">
                <option value="">Minden mértékegység</option>
                <c:forEach var="u" items="${units}">
                    <option value="${u.id}">${u.name}</option>
                </c:forEach>
            </select>
        </div>

        <div class="col-1">
            <button class="btn btn-primary w-100" id="refreshBtn">
                <i class="bi bi-arrow-repeat"></i>
            </button>
        </div>
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
        <tbody id="productTableBody"></tbody>
    </table>

    <div id="pagination" class="mt-3 text-center"></div>

</div>

<script src="products.js"></script>

</body>
</html>
