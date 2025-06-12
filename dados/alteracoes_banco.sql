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
insert into sistemas (uuid,nome) values ('59327a5d-ac29-4e90-b2f2-c95fb5e0251e','Flechas & Magias');

alter table itens_base add column `uuid_sistema` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT null;

alter table campanhas add column `uuid_sistema` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT null default 'a66888e0-5259-424f-be09-c641b0040bc9';

alter table campanhas alter column `uuid_sistema` drop default;
