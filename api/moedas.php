<?php

    include("services.php");

    try {

        $conexao = conectar();

        if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

            header("Access-Control-Allow-Methods: GET,POST,OPTIONS,DELETE,PUT");
            die();

        } else if ($_SERVER["REQUEST_METHOD"] === "PUT") {

            $body = file_get_contents("php://input");
            $entrada = json_decode($body,true);

            if (
                !array_key_exists("moeda",$entrada) ||
                !array_key_exists("personagem",$entrada) ||
                !array_key_exists("quantidade",$entrada) ||
                !array_key_exists("url",$entrada)
            ) {
                header("HTTP/1.1 400");
                die();
            }

            $lista = obterPermissoesPersonagem($conexao,$entrada['url']);

            if (count($lista) == 1) {
              // Personagem obtido
              $personagem_obtido = $lista[0];

              if (
                (
                  verificarBoolean($personagem_obtido,"eh_narrador") ||
                  verificarBoolean($personagem_obtido,"eh_jogador")
                ) &&
                verificarBoolean($personagem_obtido,"permitir_entregar_moedas")
              ) {
                // Alteração permitida

                $moedas_personagem_origem = obterMoedaPersonagem(
                  $conexao,
                  $personagem_obtido['uuid'],
                  $entrada['moeda']
                );

                $moedas_personagem_destino = obterMoedaPersonagem(
                  $conexao,
                  $entrada["personagem"],
                  $entrada['moeda']
                );

                if (
                  (count($moedas_personagem_origem) == 1) &&
                  (count($moedas_personagem_destino) == 1)
                ) {

                  $moeda_personagem_origem = $moedas_personagem_origem[0];
                  $moeda_personagem_destino = $moedas_personagem_destino[0];

                  if ($entrada['quantidade'] <= $moeda_personagem_origem['quantidade']) {
                    // Tem moedas suficientes

                    $quantidade_origem = $moeda_personagem_origem['quantidade'] - $entrada['quantidade'];
                    $quantidade_destino = $moeda_personagem_destino['quantidade'] + $entrada['quantidade'];

                    alterarPersonagemEnviarMoedas(
                      $conexao,
                      $quantidade_origem,
                      $personagem_obtido['uuid'],
                      $quantidade_destino,
                      $entrada["personagem"],
                      $entrada['moeda']
                    );

                    $lista_personagens = obterPersonagem($conexao,$entrada['url']);
                    obterDadosPersonagem($conexao,$lista_personagens);

                    // Tem moedas suficientes
                  } else {
                    header("HTTP/1.1 400");
                    die();
                  }

                } else {
                  header("HTTP/1.1 400");
                  die();
                }

                // Alteração permitida
              } else {
                header("HTTP/1.1 401");
                die();
              }

              // Personagem obtido
            }

        } else if ($_SERVER["REQUEST_METHOD"] === "POST") {

            /*
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
            */

            header("HTTP/1.1 405");
            die();

        } else if ($_SERVER["REQUEST_METHOD"] === "GET") {

            if (
                !array_key_exists("uuid",$_GET)
            ) {
                $json = obterMoedas($conexao);
                header('Content-Type: application/json');
                echo json_encode($json, JSON_UNESCAPED_UNICODE);
                die();
            } else {
                $lista = obterMoeda($conexao,$_GET['uuid']);

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
