-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Tempo de geração: 05/06/2025 às 09:21
-- Versão do servidor: 5.7.23-23
-- Versão do PHP: 8.1.32

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `linuc318_inventario`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `campanhas`
--

CREATE TABLE `campanhas` (
  `uuid` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nome` varchar(400) COLLATE utf8mb4_unicode_ci NOT NULL,
  `narrador` varchar(400) COLLATE utf8mb4_unicode_ci NOT NULL,
  `controlar_peso` tinyint(1) NOT NULL,
  `permitir_incluir_item` tinyint(1) NOT NULL DEFAULT '1',
  `permitir_alterar_item` tinyint(1) NOT NULL DEFAULT '1',
  `permitir_alterar_quantidade_item` tinyint(1) NOT NULL DEFAULT '1',
  `permitir_excluir_item` tinyint(1) NOT NULL DEFAULT '1',
  `permitir_entregar_item` tinyint(1) NOT NULL DEFAULT '1',
  `permitir_alterar_moedas` tinyint(1) NOT NULL DEFAULT '1',
  `permitir_entregar_moedas` tinyint(1) NOT NULL DEFAULT '1',
  `uuid_medida_padrao` char(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `url_narrador` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `url_jogador` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `url_visualizador` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `data_exclusao` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `campanhas`
--

INSERT INTO `campanhas` (`uuid`, `nome`, `narrador`, `controlar_peso`, `permitir_incluir_item`, `permitir_alterar_item`, `permitir_alterar_quantidade_item`, `permitir_excluir_item`, `permitir_entregar_item`, `permitir_alterar_moedas`, `permitir_entregar_moedas`, `uuid_medida_padrao`, `url_narrador`, `url_jogador`, `url_visualizador`, `data_cadastro`, `data_exclusao`) VALUES
('49f37b6d-4d7b-4192-bbb2-e9dc1bc30746', 'Ravenloft', 'SirLockee', 1, 1, 1, 1, 1, 1, 1, 1, '542fc103-6cbd-4ecc-b457-2959dd0ffe7f', '80d90634-5bc8-467a-8931-afc9b3ab0a4b', '6a54b06d-8e13-45c2-b4b1-4b5ee1f994e5', '00f238a2-c6f4-4506-a8ca-79fda2bb28e2', '2025-05-22 14:57:46', NULL),
('df901cea-04cf-40f1-900c-bf32d6689e78', 'Campanha AD&D 2ed Cormyr', 'SirLockee', 1, 1, 1, 1, 1, 1, 1, 1, '542fc103-6cbd-4ecc-b457-2959dd0ffe7f', '7aeae16c-29aa-4f75-85aa-109741605ab5', '7ac2bbb0-1d31-4830-8813-19beacda054b', '03e6fd6b-2fa2-47e5-85b5-70ca94262ac9', '2025-05-12 22:34:26', NULL);

-- --------------------------------------------------------

--
-- Estrutura para tabela `itens`
--

CREATE TABLE `itens` (
  `uuid` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `uuid_personagem` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `descricao` varchar(400) COLLATE utf8mb4_unicode_ci NOT NULL,
  `quantidade` int(11) NOT NULL,
  `peso_unitario` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `uuid_medida_peso_unitario` char(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `data_alteracao` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `data_exclusao` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `itens`
--

INSERT INTO `itens` (`uuid`, `uuid_personagem`, `descricao`, `quantidade`, `peso_unitario`, `uuid_medida_peso_unitario`, `data_cadastro`, `data_alteracao`, `data_exclusao`) VALUES
('3955cdaf-ff68-432a-be32-f99bca3fce76', '7138da3b-b91c-4ab8-98c6-95ffdf19bb3b', 'Adaga', 0, '1', '542fc103-6cbd-4ecc-b457-2959dd0ffe7f', '2025-04-30 12:19:39', '2025-04-30 17:49:29', '2025-04-30 17:49:29'),
('97a58c74-1a55-4cc8-a68e-7248835d3406', '7138da3b-b91c-4ab8-98c6-95ffdf19bb3b', 'Espada Curta2', 1, '1', '542fc103-6cbd-4ecc-b457-2959dd0ffe7f', '2025-04-30 17:53:35', '2025-04-30 18:10:35', '2025-04-30 18:16:33');

-- --------------------------------------------------------

--
-- Estrutura para tabela `itens_base`
--

CREATE TABLE `itens_base` (
  `id` int(11) NOT NULL,
  `descricao` varchar(400) COLLATE utf8mb4_unicode_ci NOT NULL,
  `peso_unitario` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `uuid_medida_peso_unitario` char(36) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '542fc103-6cbd-4ecc-b457-2959dd0ffe7f'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `medidas`
--

CREATE TABLE `medidas` (
  `uuid` char(36) COLLATE utf8_unicode_ci NOT NULL,
  `medida` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `sigla` varchar(100) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Despejando dados para a tabela `medidas`
--

INSERT INTO `medidas` (`uuid`, `medida`, `sigla`) VALUES
('11a90f8b-0fbe-476f-b5ec-f44ec6f5112d', 'Litros', 'l'),
('542fc103-6cbd-4ecc-b457-2959dd0ffe7f', 'Quilos', 'kg'),
('6092a47a-9369-4a19-bfee-0d7627ecc042', 'Libras', 'lb'),
('616febb5-3bc9-43ad-a45b-b511102038eb', 'Mililitro', 'ml'),
('c96c52c3-2e5a-4403-b7ae-d1d58ff65e2a', 'Gramas', 'g');

-- --------------------------------------------------------

--
-- Estrutura para tabela `moedas`
--

CREATE TABLE `moedas` (
  `uuid` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `moeda` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sigla` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ordenacao` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `moedas`
--

INSERT INTO `moedas` (`uuid`, `moeda`, `sigla`, `ordenacao`) VALUES
('0f88bf2c-a224-4990-b0cf-ea04dc22f0f1', 'Bits (1/10 Peça de Cerâmica)', 'bits', 0),
('1657f8c3-578a-4a1e-b4b0-8554e7b5479d', 'Trade Bar de Ouro', 'trade bar (ouro)', 8),
('60b339ec-e9ab-477e-838c-baccf2805e02', 'Peça de Cobre', 'pc', 2),
('9382c783-7888-4e15-9eb8-4777a22afee3', 'Trade Bar de Prata', 'trade bar (prata)', 7),
('982e8a4e-386c-4f4f-b394-c6a78fc636b0', 'Peça de Ouro', 'po', 5),
('996904ad-51ad-42ae-b831-6c08346e7bed', 'Peça de Electrum', 'pe', 4),
('a19f19a8-64e0-459e-8ec4-4b56f62af80c', 'Peça de Prata', 'pp', 3),
('b8d1653f-1cc3-436a-ad22-f87ab6b59e86', 'Peça de Platina', 'pl', 6),
('f2f2ac1d-f8dc-4dd2-a243-778155d8f98b', 'Peça de Cerâmica', 'pc', 1);

-- --------------------------------------------------------

--
-- Estrutura para tabela `moedas_personagens`
--

CREATE TABLE `moedas_personagens` (
  `uuid_moeda` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `uuid_personagem` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `quantidade` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `moedas_personagens`
--

INSERT INTO `moedas_personagens` (`uuid_moeda`, `uuid_personagem`, `quantidade`) VALUES
('0f88bf2c-a224-4990-b0cf-ea04dc22f0f1', '784c8ae6-f720-4035-ad9d-a3ac100da5fa', 0),
('1657f8c3-578a-4a1e-b4b0-8554e7b5479d', '784c8ae6-f720-4035-ad9d-a3ac100da5fa', 0),
('60b339ec-e9ab-477e-838c-baccf2805e02', '784c8ae6-f720-4035-ad9d-a3ac100da5fa', 0),
('9382c783-7888-4e15-9eb8-4777a22afee3', '784c8ae6-f720-4035-ad9d-a3ac100da5fa', 0),
('982e8a4e-386c-4f4f-b394-c6a78fc636b0', '784c8ae6-f720-4035-ad9d-a3ac100da5fa', 0),
('996904ad-51ad-42ae-b831-6c08346e7bed', '784c8ae6-f720-4035-ad9d-a3ac100da5fa', 0),
('a19f19a8-64e0-459e-8ec4-4b56f62af80c', '784c8ae6-f720-4035-ad9d-a3ac100da5fa', 0),
('b8d1653f-1cc3-436a-ad22-f87ab6b59e86', '784c8ae6-f720-4035-ad9d-a3ac100da5fa', 0),
('f2f2ac1d-f8dc-4dd2-a243-778155d8f98b', '784c8ae6-f720-4035-ad9d-a3ac100da5fa', 0);

-- --------------------------------------------------------

--
-- Estrutura para tabela `moedas_utilizadas`
--

CREATE TABLE `moedas_utilizadas` (
  `uuid_moeda` char(36) COLLATE utf8_unicode_ci NOT NULL,
  `uuid_campanha` char(36) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Despejando dados para a tabela `moedas_utilizadas`
--

INSERT INTO `moedas_utilizadas` (`uuid_moeda`, `uuid_campanha`) VALUES
('0f88bf2c-a224-4990-b0cf-ea04dc22f0f1', 'df901cea-04cf-40f1-900c-bf32d6689e78'),
('1657f8c3-578a-4a1e-b4b0-8554e7b5479d', 'df901cea-04cf-40f1-900c-bf32d6689e78'),
('60b339ec-e9ab-477e-838c-baccf2805e02', '49f37b6d-4d7b-4192-bbb2-e9dc1bc30746'),
('60b339ec-e9ab-477e-838c-baccf2805e02', 'a1ffff7c-72da-4785-9d9d-513d5d10fa5f'),
('60b339ec-e9ab-477e-838c-baccf2805e02', 'df901cea-04cf-40f1-900c-bf32d6689e78'),
('9382c783-7888-4e15-9eb8-4777a22afee3', 'df901cea-04cf-40f1-900c-bf32d6689e78'),
('982e8a4e-386c-4f4f-b394-c6a78fc636b0', '49f37b6d-4d7b-4192-bbb2-e9dc1bc30746'),
('982e8a4e-386c-4f4f-b394-c6a78fc636b0', 'a1ffff7c-72da-4785-9d9d-513d5d10fa5f'),
('982e8a4e-386c-4f4f-b394-c6a78fc636b0', 'df901cea-04cf-40f1-900c-bf32d6689e78'),
('996904ad-51ad-42ae-b831-6c08346e7bed', 'df901cea-04cf-40f1-900c-bf32d6689e78'),
('a19f19a8-64e0-459e-8ec4-4b56f62af80c', '49f37b6d-4d7b-4192-bbb2-e9dc1bc30746'),
('a19f19a8-64e0-459e-8ec4-4b56f62af80c', 'a1ffff7c-72da-4785-9d9d-513d5d10fa5f'),
('a19f19a8-64e0-459e-8ec4-4b56f62af80c', 'df901cea-04cf-40f1-900c-bf32d6689e78'),
('b8d1653f-1cc3-436a-ad22-f87ab6b59e86', 'df901cea-04cf-40f1-900c-bf32d6689e78'),
('f2f2ac1d-f8dc-4dd2-a243-778155d8f98b', 'df901cea-04cf-40f1-900c-bf32d6689e78');

-- --------------------------------------------------------

--
-- Estrutura para tabela `personagens`
--

CREATE TABLE `personagens` (
  `uuid` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `uuid_campanha` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nome` varchar(400) COLLATE utf8mb4_unicode_ci NOT NULL,
  `jogador` varchar(400) COLLATE utf8mb4_unicode_ci NOT NULL,
  `peso_maximo` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `uuid_medida_peso_maximo` char(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `url_narrador` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `url_jogador` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `url_visualizador` char(36) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `personagens`
--

INSERT INTO `personagens` (`uuid`, `uuid_campanha`, `nome`, `jogador`, `peso_maximo`, `uuid_medida_peso_maximo`, `url_narrador`, `url_jogador`, `url_visualizador`) VALUES
('784c8ae6-f720-4035-ad9d-a3ac100da5fa', 'df901cea-04cf-40f1-900c-bf32d6689e78', 'Hazar', 'Vicenzo', '20', '542fc103-6cbd-4ecc-b457-2959dd0ffe7f', 'b77e4239-e7e2-4f44-8093-de075f94f29e', '8964f770-0c1b-4eb5-b918-6d810589abf6', '6e1b9976-b8f9-49ce-84d6-3beb66fd163a');

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `campanhas`
--
ALTER TABLE `campanhas`
  ADD PRIMARY KEY (`uuid`),
  ADD UNIQUE KEY `url_narrador_2` (`url_narrador`),
  ADD UNIQUE KEY `url_jogador_2` (`url_jogador`),
  ADD UNIQUE KEY `url_visualizador_2` (`url_visualizador`),
  ADD KEY `url_narrador` (`url_narrador`),
  ADD KEY `url_jogador` (`url_jogador`),
  ADD KEY `url_visualizador` (`url_visualizador`);

--
-- Índices de tabela `itens`
--
ALTER TABLE `itens`
  ADD PRIMARY KEY (`uuid`);

--
-- Índices de tabela `itens_base`
--
ALTER TABLE `itens_base`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `medidas`
--
ALTER TABLE `medidas`
  ADD PRIMARY KEY (`uuid`);

--
-- Índices de tabela `moedas`
--
ALTER TABLE `moedas`
  ADD PRIMARY KEY (`uuid`);

--
-- Índices de tabela `moedas_personagens`
--
ALTER TABLE `moedas_personagens`
  ADD PRIMARY KEY (`uuid_moeda`,`uuid_personagem`);

--
-- Índices de tabela `moedas_utilizadas`
--
ALTER TABLE `moedas_utilizadas`
  ADD PRIMARY KEY (`uuid_moeda`,`uuid_campanha`);

--
-- Índices de tabela `personagens`
--
ALTER TABLE `personagens`
  ADD PRIMARY KEY (`uuid`),
  ADD UNIQUE KEY `url_narrador_2` (`url_narrador`),
  ADD UNIQUE KEY `url_jogador_2` (`url_jogador`),
  ADD UNIQUE KEY `url_visualizador_2` (`url_visualizador`),
  ADD KEY `url_narrador` (`url_narrador`),
  ADD KEY `url_jogador` (`url_jogador`),
  ADD KEY `url_visualizador` (`url_visualizador`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `itens_base`
--
ALTER TABLE `itens_base`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
