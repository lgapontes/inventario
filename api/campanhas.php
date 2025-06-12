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

                    $url_narrador = alterarCampanha($conexao,$entrada);

                    if ($url_narrador) {

                        obterDadosCampanha($conexao,$url_narrador);

                        /*
                        $retorno = array();
                        $retorno['url_narrador'] = $url_narrador;

                        header('Content-Type: application/json');
                        echo json_encode($retorno,JSON_UNESCAPED_UNICODE);
                        die();
                        */

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

            if (
                !array_key_exists("url",$_GET)
            ) {
                $json = obterCampanhas($conexao);
                header('Content-Type: application/json');
                echo json_encode($json, JSON_UNESCAPED_UNICODE);
                die();
            } else {
                obterDadosCampanha($conexao,$_GET['url']);

                /*
                $lista = obterCampanha($conexao,$_GET['url']);

                if (count($lista) == 1) {
                    header('Content-Type: application/json');

                    $campanha = $lista[0];
                    $retorno = array();
                    $retorno['campanha'] = $campanha;
                    $retorno['personagens'] = obterPersonagensPorCampanha($conexao,$campanha['uuid']);
                    $retorno['moedas'] = obterMoedas($conexao);
                    $retorno['moedas_utilizadas'] = obterMoedasUtilizadas($conexao,$campanha['uuid']);
                    $retorno['medidas'] = obterMedidas($conexao);

                    echo json_encode($retorno, JSON_UNESCAPED_UNICODE);
                    die();
                } else {
                    header("HTTP/1.1 404");
                    die();
                }
                */
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
