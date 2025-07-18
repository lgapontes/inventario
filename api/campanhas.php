<?php

    include("services.php");
    $ADMIN_UUID = parse_ini_file("admin.ini")['admin_uuid'];

    function checkBooleanFalse($objeto,$propriedade) {
      if ( (is_null($objeto[$propriedade])) || ($objeto[$propriedade] == '') ) {
        $objeto[$propriedade] = 0;
      } else {
        $objeto[$propriedade] = 1;
      }
      return $objeto;
    }

    function converterBooleansCampanha($campanha) {
      $campanha = checkBooleanFalse($campanha,"controlar_peso");
      $campanha = checkBooleanFalse($campanha,"permitir_incluir_item");
      $campanha = checkBooleanFalse($campanha,"permitir_alterar_item");
      $campanha = checkBooleanFalse($campanha,"permitir_alterar_quantidade_item");
      $campanha = checkBooleanFalse($campanha,"permitir_excluir_item");
      $campanha = checkBooleanFalse($campanha,"permitir_entregar_item");
      $campanha = checkBooleanFalse($campanha,"permitir_alterar_moedas");
      $campanha = checkBooleanFalse($campanha,"permitir_entregar_moedas");
      return $campanha;
    }

    try {

        $conexao = conectar();

        if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

            header("Access-Control-Allow-Methods: GET,POST,OPTIONS,DELETE,PUT");
            die();

        } else if ($_SERVER["REQUEST_METHOD"] === "POST") {

            $body = file_get_contents("php://input");
            $entrada = json_decode($body,true);

            if (
                !array_key_exists("nome",$entrada) ||
                !array_key_exists("narrador",$entrada) ||
                !array_key_exists("sistema",$entrada) ||
                !array_key_exists("url_narrador",$entrada)
            ) {
                header("HTTP/1.1 400");
                die();
            }

            inserirCampanha($conexao,$entrada);

            header("HTTP/1.1 200");
            die();

        } else if ($_SERVER["REQUEST_METHOD"] === "PUT") {

            $body = file_get_contents("php://input");
            $entrada = json_decode($body,true);

            if (
                !array_key_exists("url",$entrada) ||
                !array_key_exists("uuid",$entrada) ||
                !array_key_exists("nome",$entrada) ||
                !array_key_exists("sistema",$entrada) ||
                !array_key_exists("narrador",$entrada) ||
                !array_key_exists("data_cadastro",$entrada) ||
                !array_key_exists("controlar_peso",$entrada) ||
                !array_key_exists("permitir_incluir_item",$entrada) ||
                !array_key_exists("permitir_alterar_item",$entrada) ||
                !array_key_exists("permitir_alterar_quantidade_item",$entrada) ||
                !array_key_exists("permitir_excluir_item",$entrada) ||
                !array_key_exists("permitir_entregar_item",$entrada) ||
                !array_key_exists("permitir_alterar_moedas",$entrada) ||
                !array_key_exists("permitir_entregar_moedas",$entrada) ||
                !array_key_exists("uuid_medida_padrao",$entrada) ||
                !array_key_exists("moedas_utilizadas",$entrada) ||
                !array_key_exists("url_narrador",$entrada) ||
                !array_key_exists("url_jogador",$entrada) ||
                !array_key_exists("url_visualizador",$entrada)
            ) {
                header("HTTP/1.1 400");
                die();
            }

            $lista = obterCampanha($conexao,$entrada['url']);
            if (count($lista) == 1) {
                $campanha = $lista[0];
                if ($campanha['eh_narrador'] && ($entrada['uuid'] == $campanha['uuid'])) {

                    $entrada = converterBooleansCampanha($entrada);
                    $url_narrador = alterarCampanha($conexao,$entrada);

                    if ($url_narrador) {
                        obterDadosCampanha($conexao,$url_narrador);                        
                    } else {
                        header("HTTP/1.1 400");
                        die();
                    }

                } else {
                    header("HTTP/1.1 401");
                    die();
                }
            } else {
                header("HTTP/1.1 401");
                die();
            }

        } else if ($_SERVER["REQUEST_METHOD"] === "GET") {

            $admin = false;
            if (
                array_key_exists("admin",$_GET)
            ) {
              if ($ADMIN_UUID == $_GET['admin']) {
                $admin = true;
              }
            }

            if (
                !array_key_exists("url",$_GET)
            ) {
                $json = obterCampanhas($conexao,$admin);
                header('Content-Type: application/json');
                echo json_encode($json, JSON_UNESCAPED_UNICODE);
                die();
            } else {
                obterDadosCampanha($conexao,$_GET['url']);
            }


        } else if ($_SERVER["REQUEST_METHOD"] === "DELETE") {

            if (
                !array_key_exists("uuid",$_GET)
            ) {
                header("HTTP/1.1 400");
                die();
            } else {
                excluirCampanha($conexao,$_GET['uuid']);

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
