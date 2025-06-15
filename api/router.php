<?php

    include("banco.php");

    try {

        $conexao = conectar();

        if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

            header("Access-Control-Allow-Methods: GET,OPTIONS");
            die();

        } else if ($_SERVER["REQUEST_METHOD"] === "GET") {

            if (
                !array_key_exists("url",$_GET)
            ) {
                header("HTTP/1.1 401");
                die();
            } else {

                $lista = obterPermissoesPorUrl($conexao,$_GET['url']);

                if (count($lista) == 1) {
                    $pagina = $lista[0];
                    $pagina['url'] = $_GET['url'];
                    $pagina['possui_url'] = true;

                    $pagina = converterBoolean($pagina,'eh_narrador_campanha');
                    $pagina = converterBoolean($pagina,'eh_jogador_campanha');
                    $pagina = converterBoolean($pagina,'eh_visualizador_campanha');
                    $pagina = converterBoolean($pagina,'eh_narrador_personagem');
                    $pagina = converterBoolean($pagina,'eh_jogador_personagem');
                    $pagina = converterBoolean($pagina,'eh_visualizador_personagem');

                    if (
                      $pagina['eh_narrador_campanha'] == false &&
                      $pagina['eh_jogador_campanha'] == false &&
                      $pagina['eh_visualizador_campanha'] == false &&
                      $pagina['eh_narrador_personagem'] == false &&
                      $pagina['eh_jogador_personagem'] == false &&
                      $pagina['eh_visualizador_personagem'] == false
                    ) {
                      header("HTTP/1.1 204");
                      die();
                    } else {
                      header('Content-Type: application/json');
                      echo json_encode($pagina, JSON_UNESCAPED_UNICODE);
                      die();
                    }

                } else {
                    header("HTTP/1.1 404");
                    die();
                }
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
