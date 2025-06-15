<?php

    include("banco.php");

    function obterDadosCampanha($conexao,$url) {
        $lista = obterCampanha($conexao,$url);

        if (count($lista) == 1) {
            header('Content-Type: application/json');

            $campanha = $lista[0];

            if ($campanha['eh_visualizador']) {
                $campanha['url_narrador'] = '';
                $campanha['url_jogador'] = '';
            } else if ($campanha['eh_jogador']) {
                $campanha['url_narrador'] = '';
            }

            $retorno = array();
            $retorno['campanha'] = $campanha;
            $retorno['personagens'] = obterPersonagensPorCampanha($conexao,$campanha['uuid']);
            $retorno['moedas'] = obterMoedas($conexao);
            $retorno['moedas_utilizadas'] = obterMoedasUtilizadas($conexao,$campanha['uuid']);
            $retorno['medidas'] = obterMedidas($conexao);
            $retorno['sistemas'] = obterSistemas($conexao);

            echo json_encode($retorno, JSON_UNESCAPED_UNICODE);
            die();
        } else {
            header("HTTP/1.1 404");
            die();
        }
    }

    function obterDadosPersonagem($conexao,$lista) {
      if (count($lista) == 1) {

          $personagem = $lista[0];

          if ($personagem['eh_visualizador']) {
              $personagem['url_narrador'] = '';
              $personagem['url_jogador'] = '';
          } else if ($personagem['eh_jogador']) {
              $personagem['url_narrador'] = '';
          }

          $moedas_utilizadas = obterMoedasUtilizadas($conexao,$personagem['uuid_campanha']);
          $moedas_personagem = obterMoedasPersonagem($conexao,$personagem['uuid']);
          $moedas = array();

          foreach ($moedas_utilizadas as $moeda_utilizada) {

              $moeda = array();
              $moeda['uuid_moeda'] = $moeda_utilizada['uuid_moeda'];
              $moeda['uuid_personagem'] = $personagem['uuid'];
              $moeda['moeda'] = $moeda_utilizada['moeda'];
              $moeda['sigla'] = $moeda_utilizada['sigla'];
              $moeda['ordenacao'] = $moeda_utilizada['ordenacao'];
              $moeda['quantidade'] = 0;

              $nao_possui_moeda_utilizada = true;

              foreach ($moedas_personagem as $moeda_personagem) {
                  if ($moeda_personagem['uuid_moeda'] == $moeda_utilizada['uuid_moeda']) {
                      $moeda['quantidade'] = $moeda_personagem['quantidade'];

                      $nao_possui_moeda_utilizada = false;
                  }
              }

              if ($nao_possui_moeda_utilizada) {
                  inserirMoedaPersonagem(
                      $conexao,
                      $moeda['uuid_moeda'],
                      $moeda['uuid_personagem'],
                      $moeda['quantidade']
                  );
              }

              array_push($moedas,$moeda);
          }

          $personagem['moedas'] = $moedas;

          // Personagens da campanha para enviar moedas ou itens
          $personagens_campanha = obterPersonagens($conexao,$personagem['url_campanha']);
          $lista_personagens_campanha = array();

          foreach ($personagens_campanha as $entry) {
            if ($entry['uuid'] != $personagem['uuid']) {
              $personagem_campanha = array();
              $personagem_campanha['uuid'] = $entry['uuid'];
              $personagem_campanha['personagem'] = $entry['nome'] . ' (' . $entry['jogador'] . ')';
              array_push($lista_personagens_campanha,$personagem_campanha);
            }
          }

          $personagem['personagens_campanha'] = $lista_personagens_campanha;

          // Campanhas
          $todas_campanhas = obterCampanhasPorSistema($conexao,$personagem['uuid_campanha']);
          $campanhas = array();
          foreach ($todas_campanhas as $campanha) {
            if ($campanha['uuid'] != $personagem['uuid_campanha']) {
              $campanha_para_inserir = array();
              $campanha_para_inserir['uuid'] = $campanha['uuid'];
              $campanha_para_inserir['campanha'] = $campanha['nome'] . ' (' . $campanha['narrador'] . ')';
              array_push($campanhas,$campanha_para_inserir);
            }
          }
          $personagem['campanhas'] = $campanhas;

          header('Content-Type: application/json');
          echo json_encode($personagem, JSON_UNESCAPED_UNICODE);
          die();
      } else {
          header("HTTP/1.1 404");
          die();
      }
    }

    function alterarDadosPersonagem($conexao,$entrada) {
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
    }

    function alterarDadosCampanhaPersonagem($conexao,$entrada) {
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
    }
