<?php

    include("banco.php");

    try {

        $conexao = conectar();

        if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

            header("Access-Control-Allow-Methods: GET,POST,OPTIONS,DELETE,PUT");
            die();

        } else if ($_SERVER["REQUEST_METHOD"] === "POST") {

          header("HTTP/1.1 405");
          die();

        } else if ($_SERVER["REQUEST_METHOD"] === "PUT") {

          header("HTTP/1.1 405");
          die();

        } else if ($_SERVER["REQUEST_METHOD"] === "GET") {

          $json = obterSistemas($conexao);
          header('Content-Type: application/json');
          echo json_encode($json, JSON_UNESCAPED_UNICODE);
          die();

        } if ($_SERVER["REQUEST_METHOD"] === "DELETE") {

          header("HTTP/1.1 405");
          die();

        } else {
            header("HTTP/1.1 405");
            die();
        }

        desconectar($conexao);

    } catch (Exception $e) {
        echo $e;
        header("HTTP/1.1 500");
        die();
    }
