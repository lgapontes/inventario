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
          $resultado = array();

          if (
              array_key_exists("uuid",$entrada) &&
              array_key_exists("url_personagem",$entrada) &&
              array_key_exists("uuid_personagem",$entrada) &&
              array_key_exists("descricao",$entrada) &&
              array_key_exists("detalhes",$entrada) &&
              array_key_exists("quantidade",$entrada) &&
              array_key_exists("peso_unitario",$entrada) &&
              array_key_exists("uuid_medida_peso_unitario",$entrada) &&
              array_key_exists("mensagem",$entrada)
          ) {
            $lista_permissoes = obterPermissoesParaItensPorUrlPersonagem($conexao,$entrada["url_personagem"]);

            if (count($lista_permissoes) == 1) {
                $permissoes = $lista_permissoes[0];

                if (
                  ($permissoes["eh_narrador"] || $permissoes["eh_jogador"]) &&
                  $permissoes["permitir_incluir_item"]
                ) {
                  // Pode inserir item

                  $itens_alteracoes = inserirItem($conexao,$entrada);

                  if (count($itens_alteracoes) == 1) {

                      $json = $itens_alteracoes[0];

                      header('Content-Type: application/json');
                      echo json_encode($json,JSON_UNESCAPED_UNICODE);
                      die();
                  } else {
                      header("HTTP/1.1 400");
                      die();
                  }

                  // Pode inserir item
                } else {
                  header("HTTP/1.1 401");
                  die();
                }

            } else {
                header("HTTP/1.1 400");
                die();
            }
          } else {
              header("HTTP/1.1 400");
              die();
          }

        } else if ($_SERVER["REQUEST_METHOD"] === "PUT") {

            $body = file_get_contents("php://input");
            $entrada = json_decode($body,true);
            $resultado = array();

            if (
                array_key_exists("uuid",$entrada) &&
                array_key_exists("url_personagem",$entrada) &&
                array_key_exists("uuid_personagem",$entrada) &&
                array_key_exists("descricao",$entrada) &&
                array_key_exists("detalhes",$entrada) &&
                array_key_exists("quantidade",$entrada) &&
                array_key_exists("peso_unitario",$entrada) &&
                array_key_exists("uuid_medida_peso_unitario",$entrada) &&
                array_key_exists("mensagem",$entrada)
            ) {
              $lista_permissoes = obterPermissoesParaItensPorUrlPersonagem($conexao,$entrada["url_personagem"]);

              if (count($lista_permissoes) == 1) {
                  $permissoes = $lista_permissoes[0];

                  if (
                    ($permissoes["eh_narrador"] || $permissoes["eh_jogador"]) &&
                    $permissoes["permitir_alterar_item"]
                  ) {
                    // Pode alterar item

                    $itens_alteracoes = alterarItem($conexao,$entrada);

                    if (count($itens_alteracoes) == 1) {

                        $json = $itens_alteracoes[0];

                        header('Content-Type: application/json');
                        echo json_encode($json,JSON_UNESCAPED_UNICODE);
                        die();
                    } else {
                        header("HTTP/1.1 400");
                        die();
                    }

                    // Pode alterar item
                  } else {
                    header("HTTP/1.1 401");
                    die();
                  }

              } else {
                  header("HTTP/1.1 400");
                  die();
              }
            } else if (
                array_key_exists("url_personagem",$entrada) &&
                array_key_exists("uuid",$entrada) &&
                array_key_exists("quantidade",$entrada) &&
                array_key_exists("mensagem",$entrada)
            ) {
                $lista_permissoes = obterPermissoesParaItensPorUrlPersonagem($conexao,$entrada["url_personagem"]);

                if (count($lista_permissoes) == 1) {
                    $permissoes = $lista_permissoes[0];

                    if (
                      ($permissoes["eh_narrador"] || $permissoes["eh_jogador"]) &&
                      ($permissoes["permitir_alterar_quantidade_item"] || $permissoes["permitir_alterar_item"])
                    ) {
                      // Pode alterar item

                      $itens_alteracoes = alterarQuantidadeItem($conexao,$entrada["uuid"],$entrada["quantidade"],$entrada["mensagem"]);

                      if (count($itens_alteracoes) == 1) {

                          $json = $itens_alteracoes[0];

                          header('Content-Type: application/json');
                          echo json_encode($json,JSON_UNESCAPED_UNICODE);
                          die();
                      } else {
                          header("HTTP/1.1 400");
                          die();
                      }

                      // Pode alterar item
                    } else {
                      header("HTTP/1.1 401");
                      die();
                    }

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
                array_key_exists('personagem',$_GET)
            ) {
                $itens = obterItensPorPersonagem($conexao,$_GET['personagem']);
                $retorno = array();
                $retorno['itens'] = $itens;
                $retorno['medidas'] = obterMedidas($conexao);

                header('Content-Type: application/json');
                echo json_encode($retorno, JSON_UNESCAPED_UNICODE);
                die();
            } else if (
              array_key_exists('sistema',$_GET)
            ) {
              $itens_base = obterItensBase($conexao,$_GET['sistema']);

              header('Content-Type: application/json');
              echo json_encode($itens_base, JSON_UNESCAPED_UNICODE);
              die();              
            } else {
              header("HTTP/1.1 400");
              die();
            }

        } if ($_SERVER["REQUEST_METHOD"] === "DELETE") {

          if (
              !array_key_exists("uuid",$_GET) ||
              !array_key_exists("quem-esta-acessando",$_GET)
          ) {
              header("HTTP/1.1 400");
              die();
          } else {
              $mensagem = $_GET["quem-esta-acessando"] . " excluiu este item.";
              excluirItem($conexao,$_GET['uuid'],$mensagem);

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
