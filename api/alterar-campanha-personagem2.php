<?php

    include("services.php");

    try {

        $conexao = conectar();

        if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

            header("Access-Control-Allow-Methods: GET,POST,OPTIONS,DELETE,PUT");
            die();

        } else if ($_SERVER["REQUEST_METHOD"] === "POST") {

          header("HTTP/1.1 405");
          die();

        } else if ($_SERVER["REQUEST_METHOD"] === "PUT") {

          $body = file_get_contents("php://input");
          $entrada = json_decode($body,true);

          if (
              !array_key_exists("url",$entrada) ||
              !array_key_exists("campanha",$entrada)
          ) {
              header("HTTP/1.1 400");
              die();
          }

          // Validar permissão
          $lista = obterPersonagem($conexao,$entrada['url']);

          if (count($lista) == 1) {
            // Personagem obtido
            $personagem_obtido = $lista[0];

            if (verificarBoolean($personagem_obtido,"eh_narrador")) {
              // Pode alterar

              $resultado = alterarCampanhaPersonagem(
                $conexao,
                $entrada['url'],
                $personagem_obtido['uuid'],
                $entrada['campanha']
              );

              if ($resultado) {
                  obterDadosPersonagem($conexao,$resultado);
              } else {
                  header("HTTP/1.1 400");
                  die();
              }

              // Pode alterar
            } else {
              header("HTTP/1.1 401");
              die();
            }

            // Personagem obtido
          } else {
            header("HTTP/1.1 400");
            die();
          }
          // Validar permissão

        } else if ($_SERVER["REQUEST_METHOD"] === "GET") {

          header("HTTP/1.1 405");
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
