<?php

    $DEBUG = true;

    /* Conexao */

    ini_set("include_path", '/home2/linuc318/php');
    ini_set("include_path", '/opt/cpanel/ea-php74/root/usr/share/pear');

    if ($DEBUG) {
        ini_set('display_errors', '1');
        ini_set('display_startup_errors', '1');
        error_reporting(E_ALL);
    }

    function conectar() {
        $LOCAWEB = true;

        if ($LOCAWEB) {
          // Conexao remota
          $conexao = mysqli_connect("localhost","linuc318_inventario_user","]VnA-Op9&N;C","linuc318_inventario");
        } else {
          // Conexao local
          $conexao = mysqli_connect("localhost","root","123eja","linuc318_inventario");
        }

        if (!$conexao) {
            throw new Exception("Erro no banco de dados: " . mysqli_connect_error());
        }
        $conexao->set_charset("utf8");
        return $conexao;
    }

    function desconectar($conexao) {
        mysqli_close($conexao);
    }

    function guidv4($data = null) {
        // Generate 16 bytes (128 bits) of random data or use the data passed into the function.
        $data = $data ?? random_bytes(16);
        assert(strlen($data) == 16);

        // Set version to 0100
        $data[6] = chr(ord($data[6]) & 0x0f | 0x40);
        // Set bits 6-7 to 10
        $data[8] = chr(ord($data[8]) & 0x3f | 0x80);

        // Output the 36 character UUID.
        return vsprintf('%s%s-%s-%s-%s-%s%s%s', str_split(bin2hex($data), 4));
    }

    /* Router */

    function obterPermissoesPorUrl($conexao,$url) {
        $registros = array();

        $query = <<<QUERY
        select
            IFNULL((select TRUE from campanhas
            where
            url_narrador = ? AND
            data_exclusao is null),FALSE) as eh_narrador_campanha,

            IFNULL((select TRUE from campanhas
            where
            url_jogador = ? AND
            data_exclusao is null),FALSE) as eh_jogador_campanha,

            IFNULL((select TRUE from campanhas
            where
            url_visualizador = ? AND
            data_exclusao is null),FALSE) as eh_visualizador_campanha,

            IFNULL((select TRUE from personagens
            inner join campanhas on campanhas.uuid = personagens.uuid_campanha
            where
            personagens.url_narrador = ? and
            campanhas.data_exclusao is null
            ),FALSE) as eh_narrador_personagem,

            IFNULL((select TRUE from personagens
            inner join campanhas on campanhas.uuid = personagens.uuid_campanha
            where
            personagens.url_jogador = ? and
            campanhas.data_exclusao is null
            ),FALSE) as eh_jogador_personagem,

            IFNULL((select TRUE from personagens
            inner join campanhas on campanhas.uuid = personagens.uuid_campanha
            where
            personagens.url_visualizador = ? and
            campanhas.data_exclusao is null
            ),FALSE) as eh_visualizador_personagem
        QUERY;

        $resultado = $conexao->execute_query($query, [$url,$url,$url,$url,$url,$url]);

        if ($resultado->num_rows > 0) {
            while($registro = $resultado->fetch_assoc()) {
                array_push($registros,$registro);
            }
        }

        return $registros;
    }

    function verificarBoolean($json,$campo) {
        if ($json[$campo] == 1) {
            return true;
        } else {
            return false;
        }
    }

    function converterBoolean($json,$campo) {
        if ($json[$campo] == 1) {
            $json[$campo] = true;
        } else {
            $json[$campo] = false;
        }
        return $json;
    }

    function verificarBooleanParaInteiro($json,$campo) {
        if ($json[$campo] == true) {
            return 1;
        } else {
            return 0;
        }
    }

    /* Router */

    /* Sistemas */

    function obterSistemas($conexao) {
        $registros = array();

        $query = "select * from sistemas where data_exclusao is null order by nome";

        $resultado = $conexao->query($query);
        if (!$resultado) {
            throw new Exception("Erro no banco de dados: " . $conexao->error);
        }

        if ($resultado->num_rows > 0) {
            while($registro = $resultado->fetch_assoc()) {
                array_push($registros,$registro);
            }
        }

        return $registros;
    }

    /* Sistemas */

    /* Moedas */

    function obterMoedas($conexao) {
        $registros = array();

        $query = "select * from moedas order by ordenacao";

        $resultado = $conexao->query($query);
        if (!$resultado) {
            throw new Exception("Erro no banco de dados: " . $conexao->error);
        }

        if ($resultado->num_rows > 0) {
            while($registro = $resultado->fetch_assoc()) {
                array_push($registros,$registro);
            }
        }

        return $registros;
    }

    function obterMoeda($conexao,$uuid) {
        $registros = array();

        $query = 'select * from moedas where uuid = ?';

        $resultado = $conexao->execute_query($query, [$uuid]);

        if ($resultado->num_rows > 0) {
            while($registro = $resultado->fetch_assoc()) {
                array_push($registros,$registro);
            }
        }

        return $registros;
    }

    function obterMoedasUtilizadas($conexao,$uuid_campanha) {
        $registros = array();

        $query = <<<QUERY
        select
            moedas.uuid as uuid_moeda,
            moedas.moeda as moeda,
            moedas.sigla as sigla,
            moedas.ordenacao as ordenacao,
            moedas_utilizadas.uuid_campanha
        from moedas_utilizadas
        inner join moedas on moedas.uuid = moedas_utilizadas.uuid_moeda
        where moedas_utilizadas.uuid_campanha = ?
        order by moedas.ordenacao
        QUERY;

        $resultado = $conexao->execute_query($query, [$uuid_campanha]);

        if ($resultado->num_rows > 0) {
            while($registro = $resultado->fetch_assoc()) {
                array_push($registros,$registro);
            }
        }

        return $registros;
    }

    function obterMoedasUtilizadas2($conexao,$uuid_campanha) {
        $registros = array();

        $query = 'select * from moedas_utilizadas where uuid_campanha = ?';

        $resultado = $conexao->execute_query($query, [$uuid_campanha]);

        if ($resultado->num_rows > 0) {
            while($registro = $resultado->fetch_assoc()) {
                array_push($registros,$registro);
            }
        }

        return $registros;
    }

    /* Medidas */

    function obterMedidas($conexao) {
        $registros = array();

        $query = "select * from medidas";

        $resultado = $conexao->query($query);
        if (!$resultado) {
            throw new Exception("Erro no banco de dados: " . $conexao->error);
        }

        if ($resultado->num_rows > 0) {
            while($registro = $resultado->fetch_assoc()) {
                array_push($registros,$registro);
            }
        }

        return $registros;
    }

    function obterMedida($conexao,$uuid) {
        $registros = array();

        $query = 'select * from medidas where uuid = ?';

        $resultado = $conexao->execute_query($query, [$uuid]);

        if ($resultado->num_rows > 0) {
            while($registro = $resultado->fetch_assoc()) {
                array_push($registros,$registro);
            }
        }

        return $registros;
    }

    function inserirMedida($conexao,$registro) {
        $query = 'insert into medidas (uuid, medida, sigla) VALUES (?, ?, ?)';

        $resultado = $conexao->execute_query($query,[
            $registro['uuid'],
            $registro['medida'],
            $registro['sigla']
        ]);

        if (!$resultado) {
            throw new Exception("Erro no banco de dados: " . $conexao->error);
        }
    }

    function alterarMedida($conexao,$registro) {
        $query = 'update medidas set medida=?, sigla=? where uuid=?';

        $resultado = $conexao->execute_query($query,[
            $registro['medida'],
            $registro['sigla'],
            $registro['uuid']
        ]);

        if (!$resultado) {
            throw new Exception("Erro no banco de dados: " . $conexao->error);
        }

        return obterMedida($conexao,$registro['uuid']);
    }

    function excluirMedida($conexao,$uuid) {
        $query = 'delete from medidas where uuid = ?';

        $resultado = $conexao->execute_query($query,[$uuid]);

        if (!$resultado) {
            throw new Exception("Erro no banco de dados: " . $conexao->error);
        }
    }

    function cadastrarMedidasPadrao() {
        $conexao = conectar();

        $medida1 = array();
        $medida1["uuid"] = '542fc103-6cbd-4ecc-b457-2959dd0ffe7f';
        $medida1["medida"] = 'Quilos';
        $medida1["sigla"] = 'kg';
        inserirMedida($conexao,$medida1);

        $medida2 = array();
        $medida2["uuid"] = 'c96c52c3-2e5a-4403-b7ae-d1d58ff65e2a';
        $medida2["medida"] = 'Gramas';
        $medida2["sigla"] = 'g';
        inserirMedida($conexao,$medida2);

        $medida3 = array();
        $medida3["uuid"] = '6092a47a-9369-4a19-bfee-0d7627ecc042';
        $medida3["medida"] = 'Libras';
        $medida3["sigla"] = 'lb';
        inserirMedida($conexao,$medida3);
    }

    /* Campanhas */

    function inserirCampanha($conexao,$registro) {
        $registro["uuid"] = guidv4();
        $registro["url_jogador"] = guidv4();
        $registro["url_visualizador"] = guidv4();

        $query = <<<QUERY
        insert into campanhas (
            uuid,
            nome,
            narrador,
            controlar_peso,
            permitir_incluir_item,
            permitir_alterar_item,
            permitir_alterar_quantidade_item,
            permitir_excluir_item,
            permitir_entregar_item,
            permitir_alterar_moedas,
            uuid_medida_padrao,
            url_narrador,
            url_jogador,
            url_visualizador,
            uuid_sistema
        ) VALUES (
            ?,
            ?,
            ?,
            true,
            true,
            true,
            true,
            true,
            true,
            true,
            '542fc103-6cbd-4ecc-b457-2959dd0ffe7f',
            ?,
            ?,
            ?,
            ?
        )
        QUERY;

        $resultado = $conexao->execute_query($query,[
            $registro['uuid'],
            $registro['nome'],
            $registro['narrador'],
            $registro['url_narrador'],
            $registro['url_jogador'],
            $registro['url_visualizador'],
            $registro['sistema']
        ]);

        if (!$resultado) {
            throw new Exception("Erro no banco de dados: " . $conexao->error);
        }

        // Preencher moedas utilizadas
        $moedas_utilizadas = array('982e8a4e-386c-4f4f-b394-c6a78fc636b0','a19f19a8-64e0-459e-8ec4-4b56f62af80c','60b339ec-e9ab-477e-838c-baccf2805e02');

        foreach ($moedas_utilizadas as $uuid_moeda) {
            $query = 'insert into moedas_utilizadas (uuid_moeda,uuid_campanha) values (?,?)';
            $resultado = $conexao->execute_query($query,[
                $uuid_moeda,
                $registro['uuid']
            ]);
            if (!$resultado) {
                throw new Exception("Erro no banco de dados: " . $conexao->error);
            }
        }
    }

    function alterarCampanha($conexao,$registro) {

        // Delete moedas utilizadas
        $query = 'delete from moedas_utilizadas where uuid_campanha = ?';
        $resultado = $conexao->execute_query($query,[$registro['uuid']]);
        if (!$resultado) {
            throw new Exception("Erro no banco de dados: " . $conexao->error);
        }

        // Preencher moedas utilizadas
        if (count($registro['moedas_utilizadas']) == 0) {
            array_push($registro['moedas_utilizadas'],'982e8a4e-386c-4f4f-b394-c6a78fc636b0');
            array_push($registro['moedas_utilizadas'],'a19f19a8-64e0-459e-8ec4-4b56f62af80c');
            array_push($registro['moedas_utilizadas'],'60b339ec-e9ab-477e-838c-baccf2805e02');
        }

        foreach ($registro['moedas_utilizadas'] as $uuid_moeda) {
            $query = 'insert into moedas_utilizadas (uuid_moeda,uuid_campanha) values (?,?)';
            $resultado = $conexao->execute_query($query,[
                $uuid_moeda,
                $registro['uuid']
            ]);
            if (!$resultado) {
                throw new Exception("Erro no banco de dados: " . $conexao->error);
            }
        }

        $query = <<<QUERY
        update campanhas set
            nome = ?,
            narrador = ?,
            controlar_peso = ?,
            permitir_incluir_item = ?,
            permitir_alterar_item = ?,
            permitir_alterar_quantidade_item = ?,
            permitir_excluir_item = ?,
            permitir_entregar_item = ?,
            permitir_alterar_moedas = ?,
            permitir_entregar_moedas = ?,
            uuid_medida_padrao = ?,
            uuid_sistema = ?
        where uuid = ?
        QUERY;

        $resultado = $conexao->execute_query($query,[
            $registro['nome'],
            $registro['narrador'],
            $registro['controlar_peso'],
            $registro['permitir_incluir_item'],
            $registro['permitir_alterar_item'],
            $registro['permitir_alterar_quantidade_item'],
            $registro['permitir_excluir_item'],
            $registro['permitir_entregar_item'],
            $registro['permitir_alterar_moedas'],
            $registro['permitir_entregar_moedas'],
            $registro['uuid_medida_padrao'],
            $registro['sistema'],
            $registro['uuid']
        ]);

        if (!$resultado) {
            throw new Exception("Erro no banco de dados: " . $conexao->error);
        }

        //return obterCampanha($conexao,$registro['uuid']);
        return $registro['url_narrador'];
    }

    function obterCampanhas($conexao,$admin) {
        $registros = array();

        $qual_url = 'url_visualizador';
        if ($admin) {
          $qual_url = 'url_narrador';
        }

        $query = <<<QUERY
          select
            campanhas.uuid as uuid,
            campanhas.nome as nome,
            campanhas.narrador as narrador,
            campanhas.$qual_url as url,
            '$qual_url' as qual_url,
            DATE_FORMAT(campanhas.data_cadastro, '%d/%m/%Y %H:%i:%s') as cadastro,
            sistemas.uuid as uuid_sistema,
            sistemas.nome as sistema
          from
            campanhas
            inner join sistemas on sistemas.uuid = campanhas.uuid_sistema
          where campanhas.data_exclusao is null
          order by campanhas.data_cadastro desc
        QUERY;

        $resultado = $conexao->query($query);
        if (!$resultado) {
            throw new Exception("Erro no banco de dados: " . $conexao->error);
        }

        if ($resultado->num_rows > 0) {
            while($registro = $resultado->fetch_assoc()) {
                array_push($registros,$registro);
            }
        }

        return $registros;
    }

    function obterCampanhasPorSistema($conexao,$uuid_campanha) {
        $registros = array();

        $query = <<<QUERY
          select
            campanhas.uuid as uuid,
            campanhas.nome as nome,
            campanhas.narrador as narrador,
            campanhas.url_visualizador as url_visualizador,
            DATE_FORMAT(campanhas.data_cadastro, '%d/%m/%Y %H:%i:%s') as cadastro,
            sistemas.uuid as uuid_sistema,
            sistemas.nome as sistema
          from
            campanhas
            inner join sistemas on sistemas.uuid = campanhas.uuid_sistema
          where
            campanhas.data_exclusao is null and
            campanhas.uuid_sistema = (select uuid_sistema from campanhas where uuid = ?)
          order by campanhas.data_cadastro desc
        QUERY;

        // $resultado = $conexao->query($query);
        $resultado = $conexao->execute_query($query, [$uuid_campanha]);

        if (!$resultado) {
            throw new Exception("Erro no banco de dados: " . $conexao->error);
        }

        if ($resultado->num_rows > 0) {
            while($registro = $resultado->fetch_assoc()) {
                array_push($registros,$registro);
            }
        }

        return $registros;
    }

    function obterCampanha($conexao,$url) {
        $registros = array();

        $query = <<<QUERY
        select
        	campanhas.uuid,
            campanhas.nome,
            campanhas.narrador,
            campanhas.controlar_peso,
            campanhas.permitir_incluir_item,
            campanhas.permitir_alterar_item,
            campanhas.permitir_alterar_quantidade_item,
            campanhas.permitir_excluir_item,
            campanhas.permitir_entregar_item,
            campanhas.permitir_alterar_moedas,
            campanhas.permitir_entregar_moedas,
            campanhas.uuid_medida_padrao,
            campanhas.url_narrador,
            campanhas.url_jogador,
            campanhas.url_visualizador,
            medidas.medida,
            medidas.sigla,
            CASE WHEN url_narrador = ?
            THEN true ELSE false END as eh_narrador,
            CASE WHEN url_jogador = ?
            THEN true ELSE false END as eh_jogador,
            CASE WHEN url_visualizador = ?
            THEN true ELSE false END as eh_visualizador,
            DATE_FORMAT(campanhas.data_cadastro, '%d/%m/%Y %H:%i:%s') as data_cadastro,
            sistemas.uuid as uuid_sistema,
            sistemas.nome as sistema
        from campanhas
        inner join medidas on medidas.uuid = campanhas.uuid_medida_padrao
        inner join sistemas on sistemas.uuid = campanhas.uuid_sistema
        where
        	(url_narrador = ? or
            url_jogador = ? or
            url_visualizador = ?) AND
            campanhas.data_exclusao is null
        QUERY;

        $resultado = $conexao->execute_query($query, [$url,$url,$url,$url,$url,$url]);

        if ($resultado->num_rows > 0) {
            while($registro = $resultado->fetch_assoc()) {
                array_push($registros,$registro);
            }
        }

        return $registros;
    }

    function excluirCampanha($conexao,$uuid) {
        $query = <<<QUERY
          update campanhas set
            data_exclusao = now()
          where uuid = ?
        QUERY;

        $resultado = $conexao->execute_query($query,[$uuid]);

        if (!$resultado) {
            throw new Exception("Erro no banco de dados: " . $conexao->error);
        }
    }

    /* Personagem */

    function inserirPersonagem($conexao,$registro) {
        $registro["uuid"] = guidv4();

        if ($registro["eh_jogador"]) {
          $registro["url_narrador"] = guidv4();
          $registro["url_jogador"] = $registro["url_verificar_permissao"];
        } else {
          $registro["url_narrador"] = $registro["url_verificar_permissao"];
          $registro["url_jogador"] = guidv4();
        }
        $registro["url_visualizador"] = guidv4();

        $query = <<<QUERY
          insert into personagens (
            uuid,
            uuid_campanha,
            nome,
            jogador,
            peso_maximo,
            uuid_medida_peso_maximo,
            url_narrador,
            url_jogador,
            url_visualizador
          ) VALUES (
            ?,
            ?,
            ?,
            ?,
            ?,
            ?,
            ?,
            ?,
            ?
          )
        QUERY;

        $resultado = $conexao->execute_query($query,[
            $registro['uuid'],
            $registro['uuid_campanha'],
            $registro['nome'],
            $registro['jogador'],
            $registro['peso_maximo'],
            $registro['uuid_medida_peso_maximo'],
            $registro["url_narrador"],
            $registro["url_jogador"],
            $registro["url_visualizador"]
        ]);

        if (!$resultado) {
            throw new Exception("Erro no banco de dados: " . $conexao->error);
        }

        return $registro["uuid"];
    }

    function alterarCampanhaPersonagem($conexao,$url,$uuid_personagem,$uuid_campanha) {

        $query = <<<QUERY
          update personagens set
            uuid_campanha=?
          where uuid=?
        QUERY;

        $resultado = $conexao->execute_query($query,[
            $uuid_campanha,
            $uuid_personagem
        ]);

        if (!$resultado) {
            throw new Exception("Erro no banco de dados: " . $conexao->error);
        }

        return obterPersonagem($conexao,$url);
    }

    function alterarPersonagem($conexao,$registro) {

        $query = <<<QUERY
          update personagens set
            nome=?,
            jogador=?,
            peso_maximo=?
          where uuid=?
        QUERY;

        $resultado = $conexao->execute_query($query,[
            $registro['nome'],
            $registro['jogador'],
            $registro['peso_maximo'],
            $registro['uuid']
        ]);

        foreach ($registro["moedas"] as $moeda) {
          atualizarMoedaPersonagem(
            $conexao,
            $moeda["uuid_moeda"],
            $moeda["uuid_personagem"],
            $moeda["quantidade"]
          );
        }

        if (!$resultado) {
            throw new Exception("Erro no banco de dados: " . $conexao->error);
        }

        return obterPersonagem($conexao,$registro['url']);
    }

    function alterarPersonagemEnviarMoedas($conexao,$quantidade_origem,$uuid_origem,$quantidade_destino,$uuid_destino,$uuid_moeda) {

        // Origem
        $query = <<<QUERY
          update moedas_personagens set
            quantidade=?
          where
            uuid_personagem=? and
            uuid_moeda=?
        QUERY;

        $resultado = $conexao->execute_query($query,[
            $quantidade_origem,
            $uuid_origem,
            $uuid_moeda
        ]);

        if (!$resultado) {
            throw new Exception("Erro no banco de dados: " . $conexao->error);
        }

        // Destino
        $resultado = $conexao->execute_query($query,[
            $quantidade_destino,
            $uuid_destino,
            $uuid_moeda
        ]);

        if (!$resultado) {
            throw new Exception("Erro no banco de dados: " . $conexao->error);
        }

    }

    function obterPersonagens($conexao,$url) {
        $registros = array();

        $qual_url = 'url_visualizador';

        if ($url) {
            $permissoes = obterPermissoesPorUrl($conexao,$url)[0];

            if ($permissoes['eh_narrador_campanha']) {
                $qual_url = 'url_narrador';
            }
            if ($permissoes['eh_jogador_campanha']) {
                $qual_url = 'url_jogador';
            }
        }

        $query = <<<QUERY
        select
        	personagens.uuid,
            personagens.nome,
            personagens.jogador,
            personagens.peso_maximo,
            personagens.uuid_medida_peso_maximo,
            medidas.medida,
            medidas.sigla,
            personagens.$qual_url as url,
            '$qual_url' as qual_url
        from personagens
        inner join medidas on medidas.uuid = personagens.uuid_medida_peso_maximo
        inner join campanhas on campanhas.uuid = personagens.uuid_campanha
        where
          personagens.data_exclusao is null and
          campanhas.data_exclusao is null and
          campanhas.$qual_url = ?
        order by personagens.nome, personagens.jogador
        QUERY;

        // echo $query;

        $resultado = $conexao->execute_query($query, [$url]);

        if (!$resultado) {
            throw new Exception("Erro no banco de dados: " . $conexao->error);
        }

        if ($resultado->num_rows > 0) {
            while($registro = $resultado->fetch_assoc()) {
                array_push($registros,$registro);
            }
        }

        return $registros;
    }

    function obterPersonagensPorCampanha($conexao,$uuid) {
        $registros = array();

        $query = <<<QUERY
        select
            personagens.uuid,
            personagens.uuid_campanha,
            personagens.nome,
            personagens.jogador,
            personagens.peso_maximo,
            personagens.uuid_medida_peso_maximo,
            medidas.medida,
            medidas.sigla
        from personagens
        inner join medidas on medidas.uuid = personagens.uuid_medida_peso_maximo
        inner join campanhas on campanhas.uuid = personagens.uuid_campanha
        where
          personagens.data_exclusao is null and
          campanhas.data_exclusao is null and
          personagens.uuid_campanha = ?
        QUERY;

        $resultado = $conexao->execute_query($query, [$uuid]);

        if ($resultado->num_rows > 0) {
            while($registro = $resultado->fetch_assoc()) {
                array_push($registros,$registro);
            }
        }

        return $registros;
    }

    function obterPermissoesPersonagem($conexao,$url) {
        $registros = array();

        $query = <<<QUERY
        select
        	  personagens.uuid,
            personagens.uuid_campanha,
            CASE WHEN personagens.url_narrador = ?
            THEN true ELSE false END as eh_narrador,
            CASE WHEN personagens.url_jogador = ?
            THEN true ELSE false END as eh_jogador,
            CASE WHEN personagens.url_visualizador = ?
            THEN true ELSE false END as eh_visualizador,
            campanhas.controlar_peso,
            campanhas.permitir_incluir_item,
            campanhas.permitir_alterar_item,
            campanhas.permitir_alterar_quantidade_item,
            campanhas.permitir_excluir_item,
            campanhas.permitir_entregar_item,
            campanhas.permitir_alterar_moedas,
            campanhas.permitir_entregar_moedas
        from personagens
        inner join campanhas on campanhas.uuid = personagens.uuid_campanha
        where
        	(
        	    personagens.url_narrador = ? or
                personagens.url_jogador = ? or
                personagens.url_visualizador = ?
            )
        QUERY;

        $resultado = $conexao->execute_query($query, [$url,$url,$url,$url,$url,$url]);

        if ($resultado->num_rows > 0) {
            while($registro = $resultado->fetch_assoc()) {
                array_push($registros,$registro);
            }
        }

        return $registros;
    }

    function obterPersonagem($conexao,$url) {
        $registros = array();

        $query = <<<QUERY
        select
        	personagens.uuid,
            personagens.uuid_campanha,
            personagens.nome,
            personagens.jogador,
            personagens.peso_maximo,
            personagens.uuid_medida_peso_maximo,
            medidas.medida,
            medidas.sigla,
            personagens.url_narrador,
            personagens.url_jogador,
            personagens.url_visualizador,
            campanhas.uuid_medida_padrao,
            campanhas.uuid_sistema,

            CASE WHEN personagens.url_narrador = ?
            THEN true ELSE false END as eh_narrador,
            CASE WHEN personagens.url_jogador = ?
            THEN true ELSE false END as eh_jogador,
            CASE WHEN personagens.url_visualizador = ?
            THEN true ELSE false END as eh_visualizador,

            CASE
                WHEN personagens.url_narrador = ? THEN campanhas.url_narrador
                WHEN personagens.url_jogador = ? THEN campanhas.url_jogador
                WHEN personagens.url_visualizador = ? THEN campanhas.url_visualizador
                ELSE campanhas.url_visualizador
            END as url_campanha,

            CASE
                WHEN personagens.url_narrador = ? THEN campanhas.narrador
                WHEN personagens.url_jogador = ? THEN personagens.jogador
                ELSE ''
            END as quem_esta_acessando,

            json_object(
                'controlar_peso',campanhas.controlar_peso,
                'permitir_incluir_item',campanhas.permitir_incluir_item,
                'permitir_alterar_item',campanhas.permitir_alterar_item,
                'permitir_alterar_quantidade_item',campanhas.permitir_alterar_quantidade_item,
                'permitir_excluir_item',campanhas.permitir_excluir_item,
                'permitir_entregar_item',campanhas.permitir_entregar_item,
                'permitir_alterar_moedas',campanhas.permitir_alterar_moedas,
                'permitir_entregar_moedas',campanhas.permitir_entregar_moedas
            ) as permissoes

        from personagens
        inner join medidas on medidas.uuid = personagens.uuid_medida_peso_maximo
        inner join campanhas on campanhas.uuid = personagens.uuid_campanha
        where
        	personagens.data_exclusao is null and
          campanhas.data_exclusao is null and
          (
        	    personagens.url_narrador = ? or
              personagens.url_jogador = ? or
              personagens.url_visualizador = ?
          )
        QUERY;

        $resultado = $conexao->execute_query($query, [$url,$url,$url,$url,$url,$url,$url,$url,$url,$url,$url]);

        if ($resultado->num_rows > 0) {
            while($registro = $resultado->fetch_assoc()) {
                $registro["peso_maximo"] = str_replace(".",",",$registro["peso_maximo"]);
                array_push($registros,$registro);
            }
        }

        return $registros;
    }

    function obterMoedaPersonagem($conexao,$uuid_personagem,$uuid_moeda) {
        $registros = array();

        $query = <<<QUERY
        select
            moedas_personagens.uuid_moeda as uuid_moeda,
            moedas_personagens.uuid_personagem as uuid_personagem,
            moedas_personagens.quantidade as quantidade,
            moedas.moeda as moeda,
            moedas.sigla as sigla,
            moedas.ordenacao as ordenacao
        from moedas_personagens
        inner join moedas on moedas.uuid = moedas_personagens.uuid_moeda
        where
            moedas_personagens.uuid_personagem = ? and
            moedas_personagens.uuid_moeda = ?
        QUERY;

        $resultado = $conexao->execute_query($query, [$uuid_personagem,$uuid_moeda]);

        if ($resultado->num_rows > 0) {
            while($registro = $resultado->fetch_assoc()) {
                array_push($registros,$registro);
            }
        }

        return $registros;
    }

    function obterMoedasPersonagem($conexao,$uuid) {
        $registros = array();

        $query = <<<QUERY
        select
            moedas_personagens.uuid_moeda as uuid_moeda,
            moedas_personagens.uuid_personagem as uuid_personagem,
            moedas_personagens.quantidade as quantidade,
            moedas.moeda as moeda,
            moedas.sigla as sigla,
            moedas.ordenacao as ordenacao
        from moedas_personagens
        inner join moedas on moedas.uuid = moedas_personagens.uuid_moeda
        where moedas_personagens.uuid_personagem = ?
        QUERY;

        $resultado = $conexao->execute_query($query, [$uuid]);

        if ($resultado->num_rows > 0) {
            while($registro = $resultado->fetch_assoc()) {
                array_push($registros,$registro);
            }
        }

        return $registros;
    }

    function inserirMoedaPersonagem($conexao,$uuid_moeda,$uuid_personagem,$quantidade) {
        $query = 'insert into moedas_personagens (uuid_moeda, uuid_personagem, quantidade) VALUES (?, ?, ?)';

        $resultado = $conexao->execute_query($query,[
            $uuid_moeda,
            $uuid_personagem,
            $quantidade
        ]);

        if (!$resultado) {
            throw new Exception("Erro no banco de dados: " . $conexao->error);
        }
    }

    function atualizarMoedaPersonagem($conexao,$uuid_moeda,$uuid_personagem,$quantidade) {

        if ($quantidade < 0) {
          $quantidade = 0;
        }

        $query = <<<QUERY
          update moedas_personagens set
            quantidade = ?
          where
            uuid_moeda = ? and
            uuid_personagem = ?
        QUERY;

        $resultado = $conexao->execute_query($query,[
            $quantidade,
            $uuid_moeda,
            $uuid_personagem
        ]);

        if (!$resultado) {
            throw new Exception("Erro no banco de dados: " . $conexao->error);
        }
    }

    function excluirPersonagem($conexao,$uuid) {
        $query = <<<QUERY
          update personagens set
            data_exclusao = now()
          where uuid = ?
        QUERY;

        $resultado = $conexao->execute_query($query,[$uuid]);

        if (!$resultado) {
            throw new Exception("Erro no banco de dados: " . $conexao->error);
        }
    }

    /* Itens */

    function inserirItem($conexao,$registro) {
        if ($registro['quantidade'] < 1) {
            $registro['quantidade'] = 0;
        }

        $query = <<<QUERY
          insert into itens (
            uuid,
            uuid_personagem,
            descricao,
            detalhes,
            quantidade,
            peso_unitario,
            uuid_medida_peso_unitario,
            data_cadastro
          ) VALUES (
            ?,
            ?,
            ?,
            ?,
            ?,
            ?,
            ?,
            (SELECT CURRENT_TIMESTAMP())
          )
        QUERY;

        $resultado = $conexao->execute_query($query,[
            $registro['uuid'],
            $registro['uuid_personagem'],
            $registro['descricao'],
            $registro['detalhes'],
            $registro['quantidade'],
            $registro['peso_unitario'],
            $registro['uuid_medida_peso_unitario']
        ]);

        if (!$resultado) {
            throw new Exception("Erro no banco de dados: " . $conexao->error);
        }

        $uuid_itens_alteracoes = guidv4();
        $query = 'insert into itens_alteracoes (uuid,uuid_item,alteracao) values (?,?,?)';

        $resultado = $conexao->execute_query($query,[
            $uuid_itens_alteracoes,
            $registro['uuid'],
            $registro['mensagem']
        ]);

        if (!$resultado) {
            throw new Exception("Erro no banco de dados: " . $conexao->error);
        }

        return obterUltimaAlteracaoItem($conexao,$registro['uuid']);
    }

    function obterPermissoesParaItensPorUrlPersonagem($conexao,$url) {
        $registros = array();

        $query = <<<QUERY
        select
            CASE WHEN personagens.url_narrador = ?
            THEN true ELSE false END as eh_narrador,
            CASE WHEN personagens.url_jogador = ?
            THEN true ELSE false END as eh_jogador,
            CASE WHEN personagens.url_visualizador = ?
            THEN true ELSE false END as eh_visualizador,
            campanhas.controlar_peso,
            campanhas.permitir_incluir_item,
            campanhas.permitir_alterar_item,
            campanhas.permitir_alterar_quantidade_item,
            campanhas.permitir_excluir_item,
            campanhas.permitir_entregar_item,
            campanhas.permitir_alterar_moedas,
            campanhas.permitir_entregar_moedas
        from personagens
        inner join campanhas on campanhas.uuid = personagens.uuid_campanha
        where
          personagens.data_exclusao is null and
          campanhas.data_exclusao is null and
          (
              personagens.url_narrador = ? or
              personagens.url_jogador = ? or
              personagens.url_visualizador = ?
          )
        QUERY;

        $resultado = $conexao->execute_query($query, [$url,$url,$url,$url,$url,$url]);

        if ($resultado->num_rows > 0) {
            while($registro = $resultado->fetch_assoc()) {
              $registro = converterBoolean($registro,'eh_narrador');
              $registro = converterBoolean($registro,'eh_jogador');
              $registro = converterBoolean($registro,'eh_visualizador');
              $registro = converterBoolean($registro,'controlar_peso');
              $registro = converterBoolean($registro,'permitir_incluir_item');
              $registro = converterBoolean($registro,'permitir_alterar_item');
              $registro = converterBoolean($registro,'permitir_alterar_quantidade_item');
              $registro = converterBoolean($registro,'permitir_excluir_item');
              $registro = converterBoolean($registro,'permitir_entregar_item');
              $registro = converterBoolean($registro,'permitir_alterar_moedas');
              $registro = converterBoolean($registro,'permitir_entregar_moedas');
              array_push($registros,$registro);
            }
        }

        return $registros;
    }

    function obterUltimaAlteracaoItem($conexao,$uuid) {
      $registros = array();

      $query = <<<QUERY
        select
        CONCAT(DATE_FORMAT(max(data_alteracao), '%d/%m/%Y %H:%i:%s'),CONCAT(': ',alteracao)) as mensagem
        from itens_alteracoes
        where uuid_item = ?
        group by alteracao, data_alteracao
        order by data_alteracao desc limit 1
      QUERY;

      $resultado = $conexao->execute_query($query,[$uuid]);
      if (!$resultado) {
          throw new Exception("Erro no banco de dados: " . $conexao->error);
      }

      if ($resultado->num_rows > 0) {
          while($registro = $resultado->fetch_assoc()) {
              array_push($registros,$registro);
          }
      }

      return $registros;
    }

    function alterarQuantidadeItem($conexao,$uuid,$quantidade,$mensagem) {

        $query = 'update itens set quantidade=? where uuid=?';

        $resultado = $conexao->execute_query($query,[
            $quantidade,
            $uuid
        ]);

        if (!$resultado) {
            throw new Exception("Erro no banco de dados: " . $conexao->error);
        }

        $uuid_itens_alteracoes = guidv4();
        $query = 'insert into itens_alteracoes (uuid,uuid_item,alteracao) values (?,?,?)';

        $resultado = $conexao->execute_query($query,[
            $uuid_itens_alteracoes,
            $uuid,
            $mensagem
        ]);

        if (!$resultado) {
            throw new Exception("Erro no banco de dados: " . $conexao->error);
        }

        return obterUltimaAlteracaoItem($conexao,$uuid);
    }

    function alterarItem($conexao,$registro) {
        if ($registro['quantidade'] < 1) {
            $registro['quantidade'] = 0;
        }

        $query = <<<QUERY
          update itens set
            descricao=?,
            detalhes=?,
            quantidade=?,
            peso_unitario=?,
            uuid_medida_peso_unitario=?
          where uuid=?
        QUERY;

        $resultado = $conexao->execute_query($query,[
            $registro['descricao'],
            $registro['detalhes'],
            $registro['quantidade'],
            $registro['peso_unitario'],
            $registro['uuid_medida_peso_unitario'],
            $registro['uuid']
        ]);

        if (!$resultado) {
            throw new Exception("Erro no banco de dados: " . $conexao->error);
        }

        $uuid_itens_alteracoes = guidv4();
        $query = 'insert into itens_alteracoes (uuid,uuid_item,alteracao) values (?,?,?)';

        $resultado = $conexao->execute_query($query,[
            $uuid_itens_alteracoes,
            $registro['uuid'],
            $registro['mensagem']
        ]);

        if (!$resultado) {
            throw new Exception("Erro no banco de dados: " . $conexao->error);
        }

        return obterUltimaAlteracaoItem($conexao,$registro['uuid']);
    }

    function obterItensPorPersonagem($conexao,$url_personagem) {
        $registros = array();

        $query = <<<QUERY
          select
            itens.uuid,
            itens.uuid_personagem,
            itens.descricao,
            IFNULL(itens.detalhes, '') as detalhes,
            itens.quantidade,
            itens.peso_unitario,
            itens.uuid_medida_peso_unitario,
            medidas.medida,
            medidas.sigla,
            DATE_FORMAT(itens.data_cadastro, '%d/%m/%Y %H:%i:%s') as data_cadastro,
            CASE WHEN personagens.url_narrador = ?
            THEN true ELSE false END as eh_narrador,
            CASE WHEN personagens.url_jogador = ?
            THEN true ELSE false END as eh_jogador,
            CASE WHEN personagens.url_visualizador = ?
            THEN true ELSE false END as eh_visualizador,
            (
              select
              CONCAT(DATE_FORMAT(max(inner1.data_alteracao), '%d/%m/%Y %H:%i:%s'),CONCAT(': ',inner1.alteracao))
              from itens_alteracoes as inner1
              where inner1.uuid_item = itens.uuid
              group by inner1.alteracao, inner1.data_alteracao
              order by inner1.data_alteracao desc limit 1
            ) as alteracao
          from itens
          inner join medidas on medidas.uuid = itens.uuid_medida_peso_unitario
          inner join personagens on personagens.uuid = itens.uuid_personagem
          where
            itens.data_exclusao is null and
            (
                personagens.url_narrador = ? or
                personagens.url_jogador = ? or
                personagens.url_visualizador = ?
            )
          order by itens.descricao
        QUERY;

        $resultado = $conexao->execute_query($query,[
            $url_personagem,
            $url_personagem,
            $url_personagem,
            $url_personagem,
            $url_personagem,
            $url_personagem
        ]);
        if (!$resultado) {
            throw new Exception("Erro no banco de dados: " . $conexao->error);
        }

        if ($resultado->num_rows > 0) {
            while($registro = $resultado->fetch_assoc()) {
                $registro = converterBoolean($registro,'eh_narrador');
                $registro = converterBoolean($registro,'eh_jogador');
                $registro = converterBoolean($registro,'eh_visualizador');
                $registro["peso_unitario"] = str_replace(".",",",$registro["peso_unitario"]);
                array_push($registros,$registro);
            }
        }

        return $registros;
    }

    function obterItensBase($conexao,$uuid_sistema) {
        $registros = array();

        $query = <<<QUERY
          select
            itens_base.id,
            itens_base.descricao,
            IFNULL(itens_base.detalhes, '') as detalhes,
            itens_base.peso_unitario,
            itens_base.uuid_medida_peso_unitario,
            medidas.medida,
            medidas.sigla
          from itens_base
          inner join medidas on medidas.uuid = itens_base.uuid_medida_peso_unitario
          where
            itens_base.uuid_sistema = ?
          order by itens_base.descricao
        QUERY;

        $resultado = $conexao->execute_query($query,[$uuid_sistema]);
        if (!$resultado) {
            throw new Exception("Erro no banco de dados: " . $conexao->error);
        }

        if ($resultado->num_rows > 0) {
            while($registro = $resultado->fetch_assoc()) {
                $registro["peso_unitario"] = str_replace(".",",",$registro["peso_unitario"]);
                array_push($registros,$registro);
            }
        }

        return $registros;
    }

    /*
    function obterItens($conexao) {
        $registros = array();

        $query = "select *, CASE WHEN data_exclusao is null THEN false ELSE true END as excluido from itens";

        $resultado = $conexao->query($query);
        if (!$resultado) {
            throw new Exception("Erro no banco de dados: " . $conexao->error);
        }

        if ($resultado->num_rows > 0) {
            while($registro = $resultado->fetch_assoc()) {
                array_push($registros,$registro);
            }
        }

        return $registros;
    }

    function obterItem($conexao,$uuid) {
        $registros = array();

        $query = 'select *, CASE WHEN data_exclusao is null THEN false ELSE true END as excluido from itens where uuid = ?';

        $resultado = $conexao->execute_query($query, [$uuid]);

        if ($resultado->num_rows > 0) {
            while($registro = $resultado->fetch_assoc()) {
                array_push($registros,$registro);
            }
        }

        return $registros;
    }

    function obterItemPorPersonagem($conexao,$uuid_personagem) {
        $registros = array();

        $query = 'select *, CASE WHEN data_exclusao is null THEN false ELSE true END as excluido from itens where $uuid_personagem = ?';

        $resultado = $conexao->execute_query($query, [$uuid]);

        if ($resultado->num_rows > 0) {
            while($registro = $resultado->fetch_assoc()) {
                array_push($registros,$registro);
            }
        }

        return $registros;
    }
    */

    function excluirItem($conexao,$uuid,$mensagem) {
        $query = 'update itens set data_exclusao=(SELECT CURRENT_TIMESTAMP()) where uuid = ?';

        $resultado = $conexao->execute_query($query,[$uuid]);

        if (!$resultado) {
            throw new Exception("Erro no banco de dados: " . $conexao->error);
        }

        $uuid_itens_alteracoes = guidv4();
        $query = 'insert into itens_alteracoes (uuid,uuid_item,alteracao) values (?,?,?)';

        $resultado = $conexao->execute_query($query,[
            $uuid_itens_alteracoes,
            $uuid,
            $mensagem
        ]);

        if (!$resultado) {
            throw new Exception("Erro no banco de dados: " . $conexao->error);
        }
    }
