<?php

    include("banco.php");

    try {

        $conexao = conectar();

        if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

            header("Access-Control-Allow-Methods: GET,POST,OPTIONS,DELETE,PUT");
            die();

        } else if ($_SERVER["REQUEST_METHOD"] === "POST") {

            $body = file_get_contents("php://input");
            $entrada = json_decode($body,true);

            if (
                !array_key_exists("uuid",$entrada) ||
                !array_key_exists("medida",$entrada) ||
                !array_key_exists("sigla",$entrada)
            ) {
                header("HTTP/1.1 400");
                die();
            }

            inserirMedida($conexao,$entrada);

            header("HTTP/1.1 200");
            die();

        } else if ($_SERVER["REQUEST_METHOD"] === "PUT") {

            $body = file_get_contents("php://input");
            $entrada = json_decode($body,true);

            if (
                !array_key_exists("uuid",$entrada) ||
                !array_key_exists("medida",$entrada) ||
                !array_key_exists("sigla",$entrada)
            ) {
                header("HTTP/1.1 400");
                die();
            }

            $resultado = alterarMedida($conexao,$entrada);

            if ($resultado) {

                if (count($resultado) == 1) {
                    header('Content-Type: application/json');
                    echo json_encode($resultado[0],JSON_UNESCAPED_UNICODE);
                    die();
                } else {
                    header("HTTP/1.1 400");
                    die();
                }

            } else {
                header("HTTP/1.1 400");
                die();
            }

        } else if ($_SERVER["REQUEST_METHOD"] === "GET") {

            if (
                !array_key_exists("uuid",$_GET)
            ) {
                $json = obterMedidas($conexao);
                header('Content-Type: application/json');
                echo json_encode($json, JSON_UNESCAPED_UNICODE);
                die();
            } else {
                $lista = obterMedida($conexao,$_GET['uuid']);

                if (count($lista) == 1) {
                    header('Content-Type: application/json');
                    echo json_encode($lista[0], JSON_UNESCAPED_UNICODE);
                    die();
                } else {
                    header("HTTP/1.1 404");
                    die();
                }
            }


        } if ($_SERVER["REQUEST_METHOD"] === "DELETE") {

          header("HTTP/1.1 405");
          die();

          /*
          if (
              !array_key_exists("uuid",$_GET)
          ) {
              header("HTTP/1.1 400");
              die();
          } else {
              excluirMedida($conexao,$_GET['uuid']);

              header("HTTP/1.1 200");
              die();
          }
          */

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
