CREATE TABLE `sistemas` (
  `uuid` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `nome` varchar(400) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `data_exclusao` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`uuid`),
  UNIQUE KEY `nome_3` (`nome`),
  KEY `nome_4` (`nome`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- a66888e0-5259-424f-be09-c641b0040bc9
insert into sistemas (uuid,nome) values ('a66888e0-5259-424f-be09-c641b0040bc9','Advanced Dungeon & Dragons 2ed');

-- 59327a5d-ac29-4e90-b2f2-c95fb5e0251e
-- insert into sistemas (uuid,nome) values ('59327a5d-ac29-4e90-b2f2-c95fb5e0251e','Flechas & Magias');
-- update sistemas set data_exclusao = now() where uuid = '59327a5d-ac29-4e90-b2f2-c95fb5e0251e';

alter table itens_base add column `uuid_sistema` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT null;

alter table campanhas add column `uuid_sistema` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT null default 'a66888e0-5259-424f-be09-c641b0040bc9';

alter table campanhas alter column `uuid_sistema` drop default;

alter table personagens add column `data_exclusao` timestamp NULL DEFAULT NULL;

ALTER TABLE itens DROP COLUMN data_alteracao;

CREATE TABLE `itens_alteracoes` (
  `uuid` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `uuid_item` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `data_alteracao` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `alteracao` varchar(10000) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


alter table itens add column `detalhes` varchar(10000) CHARACTER SET utf8mb4 NULL AFTER descricao;

alter table itens_base add column `detalhes` varchar(10000) CHARACTER SET utf8mb4 NULL AFTER descricao;
