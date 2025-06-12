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
                !array_key_exists("uuid_personagem",$entrada) ||
                !array_key_exists("descricao",$entrada) ||
                !array_key_exists("quantidade",$entrada) ||
                !array_key_exists("peso_unitario",$entrada) ||
                !array_key_exists("uuid_medida_peso_unitario",$entrada)
            ) {
                header("HTTP/1.1 400");
                die();
            }

            inserirItem($conexao,$entrada);

            header("HTTP/1.1 200");
            die();       
        
        } else if ($_SERVER["REQUEST_METHOD"] === "PUT") {

            $body = file_get_contents("php://input");
            $entrada = json_decode($body,true);
            $resultado = array();
            
            if (
                array_key_exists("uuid",$entrada) &&
                array_key_exists("alterar_quantidade",$entrada)
            ) {
                $resultado = alterarQuantidadeItem($conexao,$entrada["uuid"],$entrada["alterar_quantidade"]);
            } else if (
                !array_key_exists("uuid",$entrada) ||
                !array_key_exists("uuid_personagem",$entrada) ||
                !array_key_exists("descricao",$entrada) ||
                !array_key_exists("quantidade",$entrada) ||
                !array_key_exists("peso_unitario",$entrada) ||
                !array_key_exists("uuid_medida_peso_unitario",$entrada)
            ) {
                header("HTTP/1.1 400");
                die();
            } else {
                $resultado = alterarItem($conexao,$entrada);
            }

            if ($resultado) {
                
                if (count($resultado) == 1) {
                    
                    $json = $resultado[0];
                    
                    if ($json['excluido'] == '0') {
                        $json['excluido'] = false;
                    } else {
                        $json['excluido'] = true;
                    }
                    
                    header('Content-Type: application/json');
                    echo json_encode($json,JSON_UNESCAPED_UNICODE);
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

            $json = null;

            if (
                !array_key_exists("uuid",$_GET)
            ) {
                $json = obterItens($conexao);
            } else if (
                array_key_exists("personagem",$_GET)
            ) {
                $json = obterItemPorPersonagem($conexao,$_GET['personagem']);
            } else {
                $lista = obterItem($conexao,$_GET['uuid']);
                
                if (count($lista) == 1) {
                    $json = $lista[0];
                }
            }
            
            if ($json == null) {
                header("HTTP/1.1 404");
                die();
            } else {
                if (is_array($json) && (!array_key_exists("excluido",$json))) {
                    foreach($json as $key=>$entry) {
                        if ($json[$key]['excluido'] == '0') {
                            $json[$key]['excluido'] = false;
                        } else {
                            $json[$key]['excluido'] = true;
                        }
                    }
                } else {
                    if ($json['excluido'] == '0') {
                        $json['excluido'] = false;
                    } else {
                        $json['excluido'] = true;
                    }
                }
                
                header('Content-Type: application/json');
                echo json_encode($json, JSON_UNESCAPED_UNICODE);
                die();
            }
            

        } if ($_SERVER["REQUEST_METHOD"] === "DELETE") {

            if (
                !array_key_exists("uuid",$_GET)
            ) {
                header("HTTP/1.1 400");
                die();
            } else {
                excluirItem($conexao,$_GET['uuid']);
                
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