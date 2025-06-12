<?php

    include("services.php");

    try {

        $conexao = conectar();

        if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

            header("Access-Control-Allow-Methods: GET,POST,OPTIONS,DELETE,PUT");
            die();

        } else if ($_SERVER["REQUEST_METHOD"] === "POST") {

            $body = file_get_contents("php://input");
            $entrada = json_decode($body,true);

            if (
                !array_key_exists("url_verificar_permissao",$entrada) ||
                !array_key_exists("url_campanha",$entrada) ||
                !array_key_exists("uuid_campanha",$entrada) ||
                !array_key_exists("nome",$entrada) ||
                !array_key_exists("jogador",$entrada)
            ) {
                header("HTTP/1.1 400");
                die();
            }

            // Campanha para validar dados
            $lista_campanhas = obterCampanha($conexao,$entrada['url_campanha']);

            if (count($lista_campanhas) == 1) {
              // Campanha obtida
              $campanha = $lista_campanhas[0];

              if (verificarBoolean($campanha,'eh_visualizador')) {
                header("HTTP/1.1 401");
                die();
              } else {
                // Não é visualizador

                if ($campanha['uuid'] != $entrada['uuid_campanha']) {
                  header("HTTP/1.1 401");
                  die();
                } else {
                  // UUID da campanha correto

                  $entrada['eh_jogador'] = true;
                  if (verificarBoolean($campanha,'eh_narrador')) {
                    $entrada['eh_jogador'] = false;
                  }
                  $entrada['uuid_medida_peso_maximo'] = $campanha['uuid_medida_padrao'];
                  $entrada['peso_maximo'] = '0';

                  $uuid_personagem = inserirPersonagem($conexao,$entrada);

                  // Moedas
                  $moedas_utilizadas = obterMoedasUtilizadas($conexao,$entrada['uuid_campanha']);

                  foreach ($moedas_utilizadas as $moeda_utilizada) {
                      inserirMoedaPersonagem(
                          $conexao,
                          $moeda_utilizada['uuid_moeda'],
                          $uuid_personagem,
                          0 // quantidade
                      );
                  }
                  // Moedas

                  header("HTTP/1.1 200");
                  die();

                  // UUID da campanha correto
                }

                // Não é visualizador
              }

              // Campanha obtida
            } else {
              header("HTTP/1.1 400");
              die();
            }

        } else if ($_SERVER["REQUEST_METHOD"] === "PUT") {

            $body = file_get_contents("php://input");
            $entrada = json_decode($body,true);

            if (
                !array_key_exists("url",$entrada) ||
                !array_key_exists("uuid",$entrada) ||
                !array_key_exists("uuid_campanha",$entrada) ||
                !array_key_exists("nome",$entrada) ||
                !array_key_exists("jogador",$entrada) ||
                !array_key_exists("peso_maximo",$entrada) ||
                !array_key_exists("moedas",$entrada) ||
                !array_key_exists("url_narrador",$entrada) ||
                !array_key_exists("url_jogador",$entrada) ||
                !array_key_exists("url_visualizador",$entrada) ||
                !array_key_exists("eh_narrador",$entrada) ||
                !array_key_exists("eh_jogador",$entrada) ||
                !array_key_exists("eh_visualizador",$entrada)
            ) {
                header("HTTP/1.1 400");
                die();
            }

            // Validar permissão
            $lista = obterPersonagem($conexao,$entrada['url']);

            if (count($lista) == 1) {
              // Personagem obtido
              $personagem_obtido = $lista[0];

              if (
                (verificarBoolean($personagem_obtido,"eh_narrador") == $entrada["eh_narrador"]) &&
                (verificarBoolean($personagem_obtido,"eh_jogador") == $entrada["eh_jogador"]) &&
                (verificarBoolean($personagem_obtido,"eh_visualizador") == $entrada["eh_visualizador"]) && (
                  verificarBoolean($personagem_obtido,"eh_narrador") || verificarBoolean($personagem_obtido,"eh_jogador")
                )
              ) {
                // Alteração permitida

                $resultado = alterarPersonagem($conexao,$entrada);

                if ($resultado) {
                    obterDadosPersonagem($conexao,$resultado);
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
            } else {
              header("HTTP/1.1 400");
              die();
            }
            // Validar permissão

        } else if ($_SERVER["REQUEST_METHOD"] === "GET") {

            if (
                array_key_exists('campanha',$_GET)
            ) {
                $json = obterPersonagens($conexao,$_GET['campanha']);
                header('Content-Type: application/json');
                echo json_encode($json, JSON_UNESCAPED_UNICODE);
                die();
            } else if (
                array_key_exists("url",$_GET)
            ) {
                $lista = obterPersonagem($conexao,$_GET['url']);
                obterDadosPersonagem($conexao,$lista);
            } else {
                $json = obterPersonagens($conexao,null);
                header('Content-Type: application/json');
                echo json_encode($json, JSON_UNESCAPED_UNICODE);
                die();
            }


        } else if ($_SERVER["REQUEST_METHOD"] === "DELETE") {

            if (
                !array_key_exists("uuid",$_GET)
            ) {
                header("HTTP/1.1 400");
                die();
            } else {
                excluirPersonagem($conexao,$_GET['uuid']);

                header("HTTP/1.1 200");
                die();
            }

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
