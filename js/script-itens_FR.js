let texto = "";
let LEVEL = 1;
// ⚒ $ ✠ 𝔓 𝔭 𝒜 ⨳ ♫ 🎗 ✄ ✂ ☖ ⚒ ⛉ ⛏ ⛻ ☆ ♡ ♰

// https://darksunadventures.blogspot.com/p/athasian-equipment-list.html

// CRIAR DETALHES

const P_ITENS_ITENS = [
  { nome: 'Sineta', preco: { quantidade: 1, moeda: 'po' }, peso: 0.1 },
  { nome: 'Algibeira Grande', preco: { quantidade: 1, moeda: 'po' }, peso: 0.5 },
  { nome: 'Algibeira Pequena', preco: { quantidade: 7, moeda: 'pp' }, peso: 0.3 },
  { nome: 'Baldric', detalhes: 'Bolsa pendurada do ombro ao quadril para carregar itens', preco: { quantidade: 7, moeda: 'pp' }, peso: 0.4 },
  { nome: 'Mochila', preco: { quantidade: 2, moeda: 'po' }, peso: 1 },
  { nome: 'Talha', preco: { quantidade: 5, moeda: 'po' }, peso: 2.5 },
  { nome: 'Tecido Comum (1Om)', preco: { quantidade: 7, moeda: 'po' }, peso: 5 },
  { nome: 'Tecido Fino (1Om)', preco: { quantidade: 50, moeda: 'po' }, peso: 5 },
  { nome: 'Tecido Suntuoso (1Om)', preco: { quantidade: 100, moeda: 'po' }, peso: 5 },
  { nome: 'Vela', preco: { quantidade: 1, moeda: 'pc' }, peso: 0 },
  { nome: 'Lona (1m),', preco: { quantidade: 4, moeda: 'pp' }, peso: 0.5 },
  { nome: 'Giz', preco: { quantidade: 1, moeda: 'pc' }, peso: 0 },
  { nome: 'Ganchos de Ferro (10x)', preco: { quantidade: 4, moeda: 'po' }, peso: 1 },
  { nome: 'Rede de Pesca', preco: { quantidade: 4, moeda: 'po' }, peso: 2.5 },
  { nome: 'Rede para Dormir', preco: { quantidade: 2, moeda: 'pp' }, peso: 2 },
  { nome: 'Pederneira', preco: { quantidade: 5, moeda: 'pp' }, peso: 0.1 },
  { nome: 'Garrafa de Vidro', preco: { quantidade: 10, moeda: 'po' }, peso: 0.1 },
  { nome: 'Garrafa de Barro', preco: { quantidade: 5, moeda: 'pc' }, peso: 0.2 },
  { nome: 'Água Benta', preco: { quantidade: 25, moeda: 'po' }, peso: 0.1 },
  { nome: 'Símbolo Divino', preco: { quantidade: 25, moeda: 'po' }, peso: 0.1 },
  { nome: 'Ampulheta', preco: { quantidade: 25, moeda: 'po' }, peso: 0.5 },
  { nome: 'Panela de Ferro', preco: { quantidade: 5, moeda: 'pc' }, peso: 1 },
  { nome: 'Farolete', preco: { quantidade: 150, moeda: 'po' }, peso: 25 },
  { nome: 'Lanterna Furta-Fogo', preco: { quantidade: 12, moeda: 'po' }, peso: 1.5 },
  { nome: 'Lanterna com Cobertura', preco: { quantidade: 7, moeda: 'po' }, peso: 1 },
  { nome: 'Cadeado Bom', preco: { quantidade: 100, moeda: 'po' }, peso: 0.5 },
  { nome: 'Cadeado Razoável', preco: { quantidade: 20, moeda: 'po' }, peso: 0.5 },
  { nome: 'Lente de Aumento', preco: { quantidade: 100, moeda: 'po' }, peso: 0.1 },
  { nome: 'Porta-Mapas', preco: { quantidade: 8, moeda: 'pp' }, peso: 0.3 },
  { nome: 'Mapa', preco: { quantidade: 1, moeda: 'po' }, peso: 0 },
  { nome: 'Porta-Pergaminhos', preco: { quantidade: 8, moeda: 'pp' }, peso: 0.3 },
  { nome: 'Balança de Comerciante', preco: { quantidade: 2, moeda: 'po' }, peso: 0.5 },
  { nome: 'Espelho Pequeno de Metal', preco: { quantidade: 10, moeda: 'po' }, peso: 0.2 },
  { nome: 'Alaúde', detalhes: 'Instrumento Musical', preco: { quantidade: 35, moeda: 'po' }, peso: 1 },
  { nome: 'Charamela', detalhes: 'Instrumento Musical', preco: { quantidade: 2, moeda: 'po' }, peso: 0.5 },
  { nome: 'Flauta Doce', detalhes: 'Instrumento Musical', preco: { quantidade: 2, moeda: 'po' }, peso: 0.5 },
  { nome: 'Flauta', detalhes: 'Instrumento Musical', preco: { quantidade: 12, moeda: 'po' }, peso: 1 },
  { nome: 'Gaita de Fole', detalhes: 'Instrumento Musical', preco: { quantidade: 30, moeda: 'po' }, peso: 2.5 },
  { nome: 'Lira', detalhes: 'Instrumento Musical', preco: { quantidade: 30, moeda: 'po' }, peso: 1 },
  { nome: 'Tambor', detalhes: 'Instrumento Musical', preco: { quantidade: 6, moeda: 'po' }, peso: 1.5 },
  { nome: 'Trombeta', detalhes: 'Instrumento Musical', preco: { quantidade: 3, moeda: 'po' }, peso: 1 },
  { nome: 'Viola', detalhes: 'Instrumento Musical', preco: { quantidade: 30, moeda: 'po' }, peso: 0.5 },
  { nome: 'Xilofone', detalhes: 'Instrumento Musical', preco: { quantidade: 25, moeda: 'po' }, peso: 4.5 },
  { nome: 'Óleo para Lamparina', preco: { quantidade: 6, moeda: 'pc' }, peso: 0.5 },
  { nome: 'Carvão para Lamparina', preco: { quantidade: 4, moeda: 'pc' }, peso: 0.5 },
  { nome: 'Papel', preco: { quantidade: 2, moeda: 'po' }, peso: 0 },
  { nome: 'Papiro', preco: { quantidade: 8, moeda: 'pp' }, peso: 0 },
  { nome: 'Pergaminho', preco: { quantidade: 1, moeda: 'po' }, peso: 0 },
  { nome: 'Perfume', preco: { quantidade: 5, moeda: 'po' }, peso: 0.3 },
  { nome: 'Piton', preco: { quantidade: 3, moeda: 'pc' }, peso: 0.5 },
  { nome: 'Aljava (vazia)', preco: { quantidade: 8, moeda: 'pp' }, peso: 0.3 },
  { nome: 'Corda de Cânhamo (5m)', preco: { quantidade: 5, moeda: 'pp' }, peso: 5 },
  { nome: 'Corda de Cânhamo (10m)', preco: { quantidade: 7, moeda: 'pp' }, peso: 7 },
  { nome: 'Corda de Cânhamo (15m)', preco: { quantidade: 1, moeda: 'po' }, peso: 10 },
  { nome: 'Corda de Cânhamo (20m)', preco: { quantidade: 2, moeda: 'po' }, peso: 15 },
  { nome: 'Corda de Fio de Seda (15m)', preco: { quantidade: 10, moeda: 'po' }, peso: 4 },
  { nome: 'Corda de Fio de Seda (5m)', preco: { quantidade: 6, moeda: 'po' }, peso: 1 },
  { nome: 'Saco Grande', preco: { quantidade: 2, moeda: 'pp' }, peso: 0.3 },
  { nome: 'Saco Pequeno', preco: { quantidade: 5, moeda: 'pc' }, peso: 0 },
  { nome: 'Cera para Velas, 500g', preco: { quantidade: 1, moeda: 'po' }, peso: 0.5 },
  { nome: 'Cera para Lacrar, 500g', preco: { quantidade: 1, moeda: 'po' }, peso: 0.5 },
  { nome: 'Agulha de Costura', preco: { quantidade: 5, moeda: 'pc' }, peso: 0 },
  { nome: 'Apito de Advertência', preco: { quantidade: 8, moeda: 'pp' }, peso: 0 },
  { nome: 'Anel com Selo Personalizado', preco: { quantidade: 5, moeda: 'po' }, peso: 0 },
  { nome: 'Sabão, 500g', preco: { quantidade: 5, moeda: 'pp' }, peso: 0.5 },
  { nome: 'Pequeno Telescópio', preco: { quantidade: 1000, moeda: 'po' }, peso: 0.5 },
  { nome: 'Tenda Grande', preco: { quantidade: 25, moeda: 'po' }, peso: 10 },
  { nome: 'Tenda Pavilhão', preco: { quantidade: 100, moeda: 'po' }, peso: 25 },
  { nome: 'Tenda Pequena', preco: { quantidade: 5, moeda: 'po' }, peso: 5 },
  { nome: 'Saco de Dormir', preco: { quantidade: 3, moeda: 'po' }, peso: 2 },
  { nome: 'Ferramentas para Ladrões', preco: { quantidade: 30, moeda: 'po' }, peso: 0.5 },
  { nome: 'Estojo Portátil para Escrita', preco: { quantidade: 30, moeda: 'po' }, peso: 0.2 },
  { nome: 'Velino', detalhes: 'Superfície de escrita feita de couro', preco: { quantidade: 1, moeda: 'po' }, peso: 0.3 },
  { nome: 'Tocha', preco: { quantidade: 1, moeda: 'pc' }, peso: 0.5 },
  { nome: 'Clepsidra', preco: { quantidade: 1000, moeda: 'po' }, peso: 100 },
  { nome: 'Esmeril', preco: { quantidade: 2, moeda: 'pc' }, peso: 0.5 },
  { nome: 'Odre de Vinho', preco: { quantidade: 8, moeda: 'pp' }, peso: 0.5 },
  { nome: 'Coberta de Inverno', preco: { quantidade: 3, moeda: 'po' }, peso: 2 },
  { nome: 'Tinta de Escrever, 10ml', preco: { quantidade: 8, moeda: 'po' }, peso: 0.1 },
  { nome: 'Carvão de Escrever, 10ml', preco: { quantidade: 1, moeda: 'po' }, peso: 0.1 },
  { nome: 'Bainha Grande (vazia)', preco: { quantidade: 4, moeda: 'po' }, peso: 0.3 },
  { nome: 'Bainha Pequena (vazia)', preco: { quantidade: 3, moeda: 'pc' }, peso: 0.3 },
  { nome: 'Barril Pequeno', preco: { quantidade: 8, moeda: 'pp' }, peso: 10 },
  { nome: 'Barril Grande', preco: { quantidade: 8, moeda: 'pp' }, peso: 100 },
  { nome: 'Cesto', preco: { quantidade: 6, moeda: 'pc' }, peso: 1 },
  { nome: 'Balde', preco: { quantidade: 6, moeda: 'pc' }, peso: 1 },
  { nome: 'Frasco', preco: { quantidade: 6, moeda: 'pc' }, peso: 0.3 },
  { nome: 'Jarra', preco: { quantidade: 8, moeda: 'pc' }, peso: 0.3 },
  { nome: 'Jarro', preco: { quantidade: 8, moeda: 'pc' }, peso: 0.3 },
  { nome: 'Caneca', preco: { quantidade: 4, moeda: 'pc' }, peso: 0.1 },
  { nome: 'Caixa Pequena', preco: { quantidade: 6, moeda: 'pp' }, peso: 10 },
  { nome: 'Caixa Grande', preco: { quantidade: 1, moeda: 'po' }, peso: 50 },
  { nome: 'Baú Pequeno', preco: { quantidade: 1, moeda: 'po' }, peso: 30 },
  { nome: 'Baú Grande', preco: { quantidade: 2, moeda: 'po' }, peso: 100 },
  { nome: 'Béquer', detalhes: 'Recipiente de boca larga', preco: { quantidade: 6, moeda: 'pc' }, peso: 0.5 },
  { nome: 'Estojo para Dardos', preco: { quantidade: 4, moeda: 'pc' }, peso: 0.2 },
  { nome: 'Cantil', preco: { quantidade: 6, moeda: 'pc' }, peso: 0.1 },
  { nome: 'Enchó', detalhes: 'Ferramenta de corte para moldar madeira', preco: { quantidade: 2, moeda: 'pp' }, peso: 1 },
  { nome: 'Bigorna', preco: { quantidade: 30, moeda: 'po' }, peso: 200 },
  { nome: 'Broca', detalhes: 'Ferramenta para furar madeira ou osso', preco: { quantidade: 5, moeda: 'pp' }, peso: 1 },
  { nome: 'Sovela', detalhes: 'Ferramenta para fazer furos em couro, madeira ou osso', preco: { quantidade: 5, moeda: 'pp' }, peso: 1 },
  { nome: 'Ferro de Marcar com Brasão', preco: { quantidade: 2, moeda: 'pp' }, peso: 2 },
  { nome: 'Pente de Cardar', detalhes: 'Usado para pentear lã', preco: { quantidade: 5, moeda: 'pc' }, peso: 1 },
  { nome: 'Esquadro de Carpinteiro', preco: { quantidade: 1, moeda: 'pp' }, peso: 3 },
  { nome: 'Cinzel', preco: { quantidade: 1, moeda: 'pp' }, peso: 0.3 },
  { nome: 'Grampo', preco: { quantidade: 1, moeda: 'pc' }, peso: 0.1 },
  { nome: 'Arnês de Escalada', preco: { quantidade: 1, moeda: 'po' }, peso: 1 },
  { nome: 'Pé-de-cabra', preco: { quantidade: 8, moeda: 'pp' }, peso: 1 },
  { nome: 'Kit de Disfarce', preco: { quantidade: 30, moeda: 'po' }, peso: 2 },
  { nome: 'Furadeira Manual', preco: { quantidade: 4, moeda: 'pp' }, peso: 1 },
  { nome: 'Lima', detalhes: 'Ferramenta com sulcos cortantes para moldar ou alisar superfícies', preco: { quantidade: 8, moeda: 'pc' }, peso: 1 },
  { nome: 'Pedra de Amolar', preco: { quantidade: 2, moeda: 'pc' }, peso: 0.5 },
  { nome: 'Enxada', preco: { quantidade: 5, moeda: 'pp' }, peso: 15 },
  { nome: 'Ferramentas de Serralheria', preco: { quantidade: 10, moeda: 'po' }, peso: 40 },
  { nome: 'Tear', preco: { quantidade: 30, moeda: 'po' }, peso: 50 },
  { nome: 'Prego', preco: { quantidade: 1, moeda: 'pc' }, peso: 0 },
  { nome: 'Tinta para Tingir Tecidos', preco: { quantidade: 2, moeda: 'po' }, peso: 10 },
  { nome: 'Picareta', preco: { quantidade: 6, moeda: 'pp' }, peso: 15 },
  { nome: 'Forcado', detalhes: 'Ferramenta agrícola com cabo longo e dentes', preco: { quantidade: 5, moeda: 'pp' }, peso: 1 },
  { nome: 'Plaina', detalhes: 'Ferramenta usada para remover a superfície áspera de madeira ou osso', preco: { quantidade: 5, moeda: 'pp' }, peso: 2 },
  { nome: 'Alicate', preco: { quantidade: 3, moeda: 'pp' }, peso: 1 },
  { nome: 'Lâmina de Arado', preco: { quantidade: 5, moeda: 'pp' }, peso: 1 },
  { nome: 'Roda de Oleiro', detalhes: 'Máquina usada para moldar cerâmica', preco: { quantidade: 6, moeda: 'po' }, peso: 70 },
  { nome: 'Roldana', preco: { quantidade: 3, moeda: 'pp' }, peso: 0.4 },
  { nome: 'Ancinho', preco: { quantidade: 6, moeda: 'pp' }, peso: 15 },
  { nome: 'Serra', preco: { quantidade: 6, moeda: 'pp' }, peso: 7 },
  { nome: 'Cajado de Pastor', preco: { quantidade: 4, moeda: 'pc' }, peso: 3 },
  { nome: 'Marreta', preco: { quantidade: 6, moeda: 'pp' }, peso: 15 },
  { nome: 'Vara de 3 Metros', preco: { quantidade: 2, moeda: 'pp' }, peso: 10 },
  { nome: 'Pá', preco: { quantidade: 6, moeda: 'pp' }, peso: 15 },
  { nome: 'Fuso (usado para fiar lã)', preco: { quantidade: 3, moeda: 'pc' }, peso: 0.1 },
  { nome: 'Pinça', preco: { quantidade: 6, moeda: 'pc' }, peso: 1 },
  { nome: 'Cunha', detalhes: 'Ferramenta triangular para rachar madeira ou pedras', preco: { quantidade: 4, moeda: 'pp' }, peso: 1 },
  { nome: 'Carrinho de Mão', preco: { quantidade: 1, moeda: 'po' }, peso: 50 },
  { nome: 'Molinete', preco: { quantidade: 8, moeda: 'pp' }, peso: 0.3 },
  { nome: 'Arame (1m)', preco: { quantidade: 3, moeda: 'pc' }, peso: 0.3 },
  { nome: 'Tintura de Cabelo', preco: { quantidade: 5, moeda: 'po' }, peso: 0.5 },
  { nome: 'Escova de Cabelo', preco: { quantidade: 2, moeda: 'pp' }, peso: 0.1 },
  { nome: 'Escova de Limpeza (dentes)', preco: { quantidade: 4, moeda: 'pp' }, peso: 0 },
  { nome: 'Óleo de Limpeza', preco: { quantidade: 3, moeda: 'po' }, peso: 0.3 },
  { nome: 'Cobertor', preco: { quantidade: 5, moeda: 'pp' }, peso: 3 },
  { nome: 'Odre de Ácido', preco: { quantidade: 20, moeda: 'po' }, peso: 0.3 },
  { nome: 'Conjunto de Fabricação de Chaves', preco: { quantidade: 30, moeda: 'po' }, peso: 10 },
  { nome: 'Peneira', preco: { quantidade: 2, moeda: 'pp' }, peso: 1 },
  { nome: 'Tigela', preco: { quantidade: 4, moeda: 'pc' }, peso: 0.5 },
  { nome: 'Caldeirão', preco: { quantidade: 1, moeda: 'pp' }, peso: 5 },
  { nome: 'Garfo', preco: { quantidade: 1, moeda: 'pc' }, peso: 0.1 },
  { nome: 'Chaleira', preco: { quantidade: 8, moeda: 'pc' }, peso: 0.3 },
  { nome: 'Faca de Cozinhar', preco: { quantidade: 1, moeda: 'pc' }, peso: 0.1 },
  { nome: 'Pilão', preco: { quantidade: 4, moeda: 'pc' }, peso: 0.2 },
  { nome: 'Travessa', preco: { quantidade: 2, moeda: 'pp' }, peso: 0.4 },
  { nome: 'Prato de Osso', preco: { quantidade: 1, moeda: 'pc' }, peso: 0.2 },
  { nome: 'Prato de Vidro', preco: { quantidade: 8, moeda: 'pc' }, peso: 0.2 },
  { nome: 'Prato de Ferro', preco: { quantidade: 1, moeda: 'pp' }, peso: 0.4 },
  { nome: 'Prato de Madeira', preco: { quantidade: 2, moeda: 'pc' }, peso: 0.2 },
  { nome: 'Xícara', preco: { quantidade: 4, moeda: 'pp' }, peso: 0.1 },
  { nome: 'Tripé', detalhes: 'Estrutura portátil para usar sobre o fogo', preco: { quantidade: 8, moeda: 'pp' }, peso: 1 },
  { nome: 'Quadro sem Pintura', preco: { quantidade: 1, moeda: 'pp' }, peso: 3 },
  { nome: 'Quadro com Pintura', preco: { quantidade: 10, moeda: 'po' }, peso: 3 },
  { nome: 'Tintas para Pintura', preco: { quantidade: 5, moeda: 'po' }, peso: 1 },
  { nome: 'Pincel para Pintura', preco: { quantidade: 1, moeda: 'po' }, peso: 1 },
  { nome: 'Taça de Osso', preco: { quantidade: 1, moeda: 'pc' }, peso: 1 },
  { nome: 'Taça de Vidro', preco: { quantidade: 1, moeda: 'po' }, peso: 1 },
  { nome: 'Taça de Madeira', preco: { quantidade: 3, moeda: 'pc' }, peso: 1 },
  { nome: 'Taça de Cristal', preco: { quantidade: 10, moeda: 'po' }, peso: 1 },
  { nome: 'Chave Rústica', preco: { quantidade: 2, moeda: 'pc' }, peso: 1 },
  { nome: 'Chave Simples', preco: { quantidade: 8, moeda: 'pc' }, peso: 1 },
  { nome: 'Chave Nobre', preco: { quantidade: 1, moeda: 'po' }, peso: 1 },
];

const P_ITENS_VESTIMENTAS_FINAL = [
  { peso: 0.5, nome: 'Botas de Montaria', preco: { quantidade: 3, moeda: 'po' } },
  { peso: 0.5, nome: 'Botas de Escalada', preco: { quantidade: 5, moeda: 'po' } },
  { peso: 0.5, nome: 'Calças', preco: { quantidade: 2, moeda: 'po' } },
  { peso: 0.3, nome: 'Túnica', preco: { quantidade: 8, moeda: 'pp' } },
  { peso: 0.3, nome: 'Camisa', preco: { quantidade: 8, moeda: 'pp' } },
  { peso: 0.4, nome: 'Botas Normais', preco: { quantidade: 1, moeda: 'po' } },
  { peso: 0.3, nome: 'Sapatos', preco: { quantidade: 1, moeda: 'po' } },
  { peso: 0.1, nome: 'Mitenes', detalhes: 'Luvas sem dedos', preco: { quantidade: 3, moeda: 'pp' } },
  { peso: 0.1, nome: 'Luvas', preco: { quantidade: 1, moeda: 'po' } },
  { peso: 0.1, nome: 'Luvas de Escalada', preco: { quantidade: 3, moeda: 'po' } },
  { peso: 0.5, nome: 'Manto Comum', preco: { quantidade: 9, moeda: 'pp' } },
  { peso: 0.5, nome: 'Manto com Ornamentos', preco: { quantidade: 20, moeda: 'po' } },
  { peso: 0.1, nome: 'Cinto', preco: { quantidade: 3, moeda: 'pp' } },
  { peso: 0.1, nome: 'Gibão de Seda', preco: { quantidade: 80, moeda: 'po' } },
  { peso: 0.1, nome: 'Sandálias', preco: { quantidade: 5, moeda: 'pc' } },
  { peso: 0.3, nome: 'Túnica Bordada', preco: { quantidade: 2, moeda: 'po' } },
  { peso: 0.2, nome: 'Vestido Simples', preco: { quantidade: 12, moeda: 'pp' } },
  { peso: 1, nome: 'Vestido Ornamentado', preco: { quantidade: 10, moeda: 'po' } },
  { peso: 1, nome: 'Túnica Nobre', preco: { quantidade: 50, moeda: 'po' } },
  { peso: 2, nome: 'Manto de Frio', preco: { quantidade: 1, moeda: 'po' } },
  { peso: 0.5, nome: 'Capa', preco: { quantidade: 8, moeda: 'pp' } },
  { peso: 0.1, nome: 'Capuz', preco: { quantidade: 1, moeda: 'po' } },
  { peso: 0.1, nome: 'Avental', preco: { quantidade: 5, moeda: 'pp' } },
  { peso: 0.1, nome: 'Barbeta', detalhes: 'Tira colocada sob o queixo até a cabeça', preco: { quantidade: 1, moeda: 'pp' } },
  { peso: 0.1, nome: 'Véu', preco: { quantidade: 1, moeda: 'po' } },
  { peso: 0.1, nome: 'Hijab', detalhes: 'Véu islâmico', preco: { quantidade: 1, moeda: 'po' } },
  { peso: 0.1, nome: 'Kipá', detalhes: 'Chapéu de judeus hassídicos', preco: { quantidade: 1, moeda: 'pp' } },
  { peso: 0.1, nome: 'Turbante', preco: { quantidade: 1, moeda: 'po' } },
  { peso: 0.5, nome: 'Braies', detalhes: 'Calças até os joelhos', preco: { quantidade: 2, moeda: 'po' } },
  { peso: 0.1, nome: 'Fivela (de cinto)', preco: { quantidade: 1, moeda: 'pp' } },
  { peso: 0.1, nome: 'Touca', preco: { quantidade: 1, moeda: 'pp' } },
  { peso: 0.1, nome: 'Chapéu', preco: { quantidade: 1, moeda: 'pp' } },
  { peso: 0.2, nome: 'Chapéu pontudo', preco: { quantidade: 1, moeda: 'po' } },
  { peso: 0.2, nome: 'Boina', preco: { quantidade: 1, moeda: 'pp' } },
  { peso: 0.5, nome: 'Batina', preco: { quantidade: 1, moeda: 'po' } },
  { peso: 0.1, nome: 'Coifa', detalhes: 'Acessório de cabeça que cobre os cabelos presos', preco: { quantidade: 1, moeda: 'pp' } },
  { peso: 0.1, nome: 'Chlamys', detalhes: 'Capa nobre', preco: { quantidade: 50, moeda: 'po' } },
  { peso: 0.5, nome: 'Ciclas', detalhes: 'Túnica mais longa', preco: { quantidade: 1, moeda: 'po' } },
  { peso: 0.1, nome: 'Fez', detalhes: 'Chapéu de feltro em formato de cone truncado', preco: { quantidade: 1, moeda: 'po' } },
  { peso: 0.4, nome: 'Garnache', detalhes: 'Vestimenta larga com mangas curtas e capuz', preco: { quantidade: 1, moeda: 'po' } },
  { peso: 0.1, nome: 'Lenço', preco: { quantidade: 5, moeda: 'pc' } },
  { peso: 0.1, nome: 'Kilt', detalhes: 'Saia escocesa', preco: { quantidade: 12, moeda: 'pp' } },
  { peso: 0.2, nome: 'Encharpe', preco: { quantidade: 8, moeda: 'pp' } },
  { peso: 0.5, nome: 'Robe', preco: { quantidade: 1, moeda: 'po' } },
  { peso: 0.2, nome: 'Faixa', preco: { quantidade: 5, moeda: 'pp' } },
  { peso: 0.3, nome: 'Escapular', detalhes: 'Vestimenta sem mangas com brasão usada sobre armadura', preco: { quantidade: 1, moeda: 'po' } },
  { peso: 0.1, nome: 'Cachecol', preco: { quantidade: 5, moeda: 'pp' } },
  { peso: 0.1, nome: 'Chinelos', preco: { quantidade: 5, moeda: 'pc' } },
  { peso: 0.1, nome: 'Sirwal', detalhes: 'Calças largas', preco: { quantidade: 2, moeda: 'po' } },
  { peso: 0.1, nome: 'Tabardo', detalhes: 'Casaco sem mangas usado sobre roupas ou armaduras', preco: { quantidade: 1, moeda: 'po' } },
  { peso: 0.1, nome: 'Colete', preco: { quantidade: 6, moeda: 'pp' } },
  { peso: 0.1, nome: 'Dishdasha', detalhes: 'Túnica longa do deserto', preco: { quantidade: 1, moeda: 'po' } },
  { peso: 0.1, nome: 'Kandura', detalhes: 'Túnica longa do deserto', preco: { quantidade: 1, moeda: 'po' } },
  { peso: 0.1, nome: 'Thobe', detalhes: 'Túnica longa do deserto', preco: { quantidade: 1, moeda: 'po' } },
  { peso: 0.1, nome: 'Ghutra', detalhes: 'Lenço de cabeça que protege do sol e da areia', preco: { quantidade: 1, moeda: 'po' } },
  { peso: 0.1, nome: 'Djellaba', detalhes: 'Túnica larga', preco: { quantidade: 1, moeda: 'po' } },
  { peso: 0.1, nome: 'Burca', detalhes: 'Véu que cobre o corpo e o rosto, deixando apenas os olhos', preco: { quantidade: 1, moeda: 'po' } },
];

const P_ITENS_ALIMENTOS = [
  { peso: 1, nome: 'Cerveja (1 garrafa)', preco: { quantidade: 1, moeda: 'pp' } },
  { peso: 1, nome: 'Cerveja Leve (1 garrafa)', preco: { quantidade: 2, moeda: 'pp' } },
  { peso: 1, nome: 'Hidromel (1 garrafa)', preco: { quantidade: 1, moeda: 'pp' } },
  { peso: 1, nome: 'Hidromel do Reino (1 garrafa)', preco: { quantidade: 1, moeda: 'po' } },
  { peso: 0.1, nome: 'Pão (1 dia)', preco: { quantidade: 5, moeda: 'pc' } },
  { peso: 0.1, nome: 'Lembas (1 dia)', preco: { quantidade: 1, moeda: 'po' } },
  { peso: 0.1, nome: 'Pão de Viagem (1 dia)', preco: { quantidade: 10, moeda: 'pc' } },
  { peso: 0.2, nome: 'Queijo (1 dia)', preco: { quantidade: 4, moeda: 'pp' } },
  { peso: 0.2, nome: 'Queijo Halfling (1 dia)', preco: { quantidade: 5, moeda: 'pp' } },
  { peso: 0.2, nome: 'Queijo de Viagem (1 dia)', preco: { quantidade: 5, moeda: 'pp' } },
  { peso: 1, nome: 'Vinho (1 garrafa)', preco: { quantidade: 2, moeda: 'pp' } },
  { peso: 1, nome: 'Vinho do Reino (1 garrafa)', preco: { quantidade: 1, moeda: 'po' } },
  { peso: 0.1, nome: 'Ovos (1 dia)', preco: { quantidade: 1, moeda: 'pc' } },
  { peso: 0.5, nome: 'Verduras Frescas, 500g', preco: { quantidade: 1, moeda: 'pc' } },
  { peso: 0.5, nome: 'Legumes Frescos, 500g', preco: { quantidade: 1, moeda: 'pc' } },
  { peso: 0.5, nome: 'Frutas, 500g', preco: { quantidade: 1, moeda: 'pc' } },
  { peso: 0.5, nome: 'Frutas Secas, 500g', preco: { quantidade: 1, moeda: 'pc' } },
  { peso: 0.5, nome: 'Frutas Vermelhas, 500g', preco: { quantidade: 3, moeda: 'pc' } },
  { peso: 0.5, nome: 'Frutas Cítricas, 500g', preco: { quantidade: 3, moeda: 'pc' } },
  { peso: 1, nome: 'Mel (1 garrafa)', preco: { quantidade: 5, moeda: 'pp' } },
  { peso: 0.5, nome: 'Carne, 500g', preco: { quantidade: 1, moeda: 'pp' } },
  { peso: 0.5, nome: 'Carne Seca, 500g', preco: { quantidade: 1, moeda: 'pp' } },
  { peso: 0.5, nome: 'Sopa, 500ml', preco: { quantidade: 5, moeda: 'pc' } },
  { peso: 0.3, nome: 'Ração de Viagem (1 dia)', preco: { quantidade: 0, moeda: 'po' } },
  { peso: 1, nome: 'Coldre de Água', preco: { quantidade: 1, moeda: 'pp' } },
  { peso: 1, nome: 'Chifre de Água', preco: { quantidade: 1, moeda: 'pp' } },
  { peso: 1, nome: 'Garrafa de Água', preco: { quantidade: 1, moeda: 'pp' } },
  { peso: 1, nome: 'Cantil de Água', preco: { quantidade: 1, moeda: 'pp' } },
  { peso: 0.5, nome: 'Peixe, 500g', preco: { quantidade: 3, moeda: 'po' } },
  { peso: 0.5, nome: 'Manteiga, 500g', preco: { quantidade: 2, moeda: 'pp' } },
  { peso: 0.5, nome: 'Açúcar Mascavo, 500g', preco: { quantidade: 1, moeda: 'po' } },
  { peso: 0.3, nome: 'Provisões Desidratadas (1 dia)', preco: { quantidade: 5, moeda: 'pp' } },
  { peso: 0.5, nome: 'Figos, 500g', preco: { quantidade: 3, moeda: 'pp' } },
  { peso: 0.5, nome: 'Nozes, 500g', preco: { quantidade: 1, moeda: 'po' } },
  { peso: 0.5, nome: 'Uvas Passas, 500g', preco: { quantidade: 2, moeda: 'pp' } },
  { peso: 0.5, nome: 'Arroz, 500g', preco: { quantidade: 2, moeda: 'pp' } },
  { peso: 0.5, nome: 'Sal, 500g', preco: { quantidade: 1, moeda: 'pp' } },
  { peso: 0.5, nome: 'Açafrão, 500g', preco: { quantidade: 15, moeda: 'po' } },
  { peso: 0.5, nome: 'Cravo, 500g', preco: { quantidade: 15, moeda: 'po' } },
  { peso: 0.5, nome: 'Pimenta, 500g', preco: { quantidade: 2, moeda: 'po' } },
  { peso: 0.5, nome: 'Gengibre, 500g', preco: { quantidade: 2, moeda: 'po' } },
  { peso: 0.5, nome: 'Canela, 500g', preco: { quantidade: 1, moeda: 'po' } },
  { peso: 1, nome: 'Cidra (1 garrafa)', preco: { quantidade: 8, moeda: 'po' } },
  { peso: 0.1, nome: 'Raízes Medicinais (1pv)', preco: { quantidade: 10, moeda: 'po' } },
  { peso: 0.1, nome: 'Folhas Medicinais (1pv)', preco: { quantidade: 10, moeda: 'po' } },
  { peso: 0.1, nome: 'Frutas Medicinais (1pv)', preco: { quantidade: 10, moeda: 'po' } },
  { peso: 0.3, nome: 'Poção de Cura (2d4+2)', preco: { quantidade: 60, moeda: 'po' } },
  { peso: 0.3, nome: 'Meia Poção de Cura (1d4+1)', preco: { quantidade: 30, moeda: 'po' } },
];

const P_ITENS_ESCUDOS = [
  { level: 2, nome: 'Escudo de Corpo de Madeira', ca: 1, preco: { quantidade: 7, moeda: 'po' }, peso: 7.5, ataques_por_rodada: 0, detalhes: [ "+1 CA contra ataques à distância" ] },
  { level: 1, nome: 'Broquei (escudo) de Madeira', ca: 1, preco: { quantidade: 1, moeda: 'po' }, peso: 1.5, ataques_por_rodada: 1, detalhes: [] },
  { level: 1, nome: 'Escudo Médio de Madeira', ca: 1, preco: { quantidade: 5, moeda: 'po' }, peso: 5, ataques_por_rodada: 0, detalhes: [] },
  { level: 1, nome: 'Escudo Pequeno de Madeira', ca: 1, preco: { quantidade: 2, moeda: 'po' }, peso: 2.5, ataques_por_rodada: 2, detalhes: [] },
  { level: 5, nome: 'Escudo de Corpo de Ferro', ca: 1, preco: { quantidade: 10, moeda: 'po' }, peso: 7.5, ataques_por_rodada: 0, detalhes: [ "+1 CA contra ataques à distância" ] },
  { level: 3, nome: 'Broquei (escudo) de Ferro', ca: 1, preco: { quantidade: 1, moeda: 'po' }, peso: 1.5, ataques_por_rodada: 1, detalhes: [] },
  { level: 3, nome: 'Escudo Médio de Ferro', ca: 1, preco: { quantidade: 7, moeda: 'po' }, peso: 5, ataques_por_rodada: 0, detalhes: [] },
  { level: 3, nome: 'Escudo Pequeno de Ferro', ca: 1, preco: { quantidade: 3, moeda: 'po' }, peso: 2.5, ataques_por_rodada: 2, detalhes: [] },
  { level: 5, nome: 'Escudo de Corpo de bronze', ca: 1, preco: { quantidade: 12, moeda: 'po' }, peso: 7.5, ataques_por_rodada: 0, detalhes: [ "+1 CA contra ataques à distância" ] },
  { level: 5, nome: 'Broquei (escudo) de bronze', ca: 1, preco: { quantidade: 2, moeda: 'po' }, peso: 1.5, ataques_por_rodada: 1, detalhes: [] },
  { level: 5, nome: 'Escudo Médio de bronze', ca: 1, preco: { quantidade: 9, moeda: 'po' }, peso: 5, ataques_por_rodada: 0, detalhes: [] },
  { level: 5, nome: 'Escudo Pequeno de bronze', ca: 1, preco: { quantidade: 5, moeda: 'po' }, peso: 2.5, ataques_por_rodada: 2, detalhes: [] },
];

const P_ITENS_ARMADURAS = [
  { level: 1, nome: 'Corselete de Couro Simples', ca: 8, preco: { quantidade: 5, moeda: 'po' }, peso: 7.5 },
  { level: 1, nome: 'Corselete de Couro Acolchoado', ca: 8, preco: { quantidade: 4, moeda: 'po' }, peso: 5 },
  { level: 1, nome: 'Corselete de Couro Batido', ca: 7, preco: { quantidade: 20, moeda: 'po' }, peso: 12.5 },
  { level: 2, nome: 'Loriga', ca: 7, preco: { quantidade: 100, moeda: 'po' }, peso: 15 },
  { level: 3, nome: 'Brigandina', ca: 6, preco: { quantidade: 120, moeda: 'po' }, peso: 17.5 },
  { level: 3, nome: 'Brunea', ca: 6, preco: { quantidade: 120, moeda: 'po' }, peso: 20 },
  { level: 4, nome: 'Gibão de Peles', ca: 6, preco: { quantidade: 15, moeda: 'po' }, peso: 15 },
  { level: 5, nome: 'Cota de Malha', ca: 5, preco: { quantidade: 75, moeda: 'po' }, peso: 20 },
  { level: 5, nome: 'Cota de Malha Élfica', ca: 5, preco: { quantidade: 200, moeda: 'po' }, peso: 10 },
  { level: 6, nome: 'Cota de Talas', ca: 4, preco: { quantidade: 80, moeda: 'po' }, peso: 20 },
  { level: 6, nome: 'Loriga Segmentada', ca: 4, preco: { quantidade: 200, moeda: 'po' }, peso: 17.5 },
  { level: 7, nome: 'Armadura de Bronze', ca: 4, preco: { quantidade: 400 , moeda: 'po' }, peso: 22.5 },
  { level: 8, nome: 'Armadura Simples', ca: 3, preco: { quantidade: 600, moeda: 'po' }, peso: 25 },
  { level: 9, nome: 'Armadura de Batalha', ca: 2, preco: { quantidade: 2000, moeda: 'po' }, peso: 30 },
  { level: 10, nome: 'Armadura Completa', ca: 1, preco: { quantidade: 4000, moeda: 'po' }, peso: 35 },
  { level: 1, nome: 'Elmo Grande', ca: 0, preco: { quantidade: 30, moeda: 'po' }, peso: 5 },
  { level: 1, nome: 'Basinet', ca: 0, preco: { quantidade: 8, moeda: 'po' }, peso: 2.5 },
];

const P_ITENS_MISSEIS = {
  "Dardo Farpado": { level: 1, quantidade: 1, preco: { quantidade: 1, moeda: 'pp' }, peso: 0, tamanho: 'Pequeno', tipo: 'Perfurante', velocidade: 0, dano_p: '1d3', dano_mg: '1d3', cadencia: '2/1' },
  "Dardo Agulha": { level: 1, quantidade: 1, preco: { quantidade: 2, moeda: 'pc' }, peso: 0, tamanho: 'Pequeno', tipo: 'Perfurante', velocidade: 0, dano_p: '1', dano_mg: '1', cadencia: '2/1' },
  "Flecha de Caça": { level: 1, quantidade: 1, preco: { quantidade: 3, moeda: 'pc' }, peso: 0, tamanho: 'Pequena', tipo: 'Perfurante', velocidade: 0, dano_p: '1d6', dano_mg: '1d6', cadencia: '2/1' },
  "Flecha da Guerra": { level: 1, quantidade: 1, preco: { quantidade: 5, moeda: 'pc' }, peso: 0, tamanho: 'Pequena', tipo: 'Perfurante', velocidade: 0, dano_p: '1d8', dano_mg: '1d8', cadencia: '2/1' },
  "Quadrelo de Mão": { level: 1, quantidade: 1, preco: { quantidade: 1, moeda: 'po' }, peso: 0, tamanho: 'Pequeno', tipo: 'Perfurante', velocidade: 0, dano_p: '1d3', dano_mg: '1d2', cadencia: '1/1' },
  "Quadrelo Grande": { level: 1, quantidade: 1, preco: { quantidade: 2, moeda: 'pp' }, peso: 0, tamanho: 'Pequeno', tipo: 'Perfurante', velocidade: 0, dano_p: '1d4+1', dano_mg: '1d6+1', cadencia: '1/1' },
  "Quadrelo Pequeno": { level: 1, quantidade: 1, preco: { quantidade: 1, moeda: 'pp' }, peso: 0, tamanho: 'Pequeno', tipo: 'Perfurante', velocidade: 0, dano_p: '1d4', dano_mg: '1d4', cadencia: '1/2' },
  "Chumbo de Funda": { level: 1, quantidade: 1, preco: { quantidade: 1, moeda: 'pc' }, peso: 0.3, tamanho: 'Pequeno', tipo: 'Concussão', velocidade: 0, dano_p: '1d4+1', dano_mg: '1d6+1', cadencia: '2/1' },
  "Pedra de Funda": { level: 1, quantidade: 1, preco: { quantidade: 1, moeda: 'pc' }, peso: 0.3, tamanho: 'Pequena', tipo: 'Concussão', velocidade: 4, dano_p: '1d4', dano_mg: '1d4', cadencia: '2/1' }
};

// Obsidiana
// Osso
// Pedra
// Madeira
// Ferro
// Prata
// Mithral
// Couro
// Peles
// Quitina de Kank (DarkSun)
// Quitina Brilhante de Hurrum (DarkSun)
// Carapaça de Mekillot (DarkSun)
// Carapaça de Inix (DarkSun)
// Placa de Braxat (DarkSun)
// Chifre de Braxat (DarkSun)
// Chifre

const P_ITENS_ARMAS = {
  "Arcabuz": { level: 10, preco: { quantidade: 500, moeda: 'po' }, peso: 5, tamanho: 'Média', tipo: 'Perfurante', velocidade: 15, dano_p: '1d10', dano_mg: '1d10', dano: 10, detalhes: [] },
  "Machado de Guerra": { level: 3, preco: { quantidade: 5, moeda: 'po' }, peso: 3.5, tamanho: 'Médio', tipo: 'Cortante', velocidade: 7, dano_p: '1d8', dano_mg: '1d8', dano: 8, detalhes: [] },
  "Zarabatana": { preco: { level: 1, quantidade: 5, moeda: 'po' }, peso: 1, tamanho: 'Grande', tipo: '', velocidade: 5, dano_p: '', dano_mg: '', dano: 3, detalhes: [] },
  "Arco Longo Composto": { level: 5, preco: { quantidade: 100, moeda: 'po' }, peso: 1.5, tamanho: 'Grande', tipo: '', velocidade: 7, dano_p: '', dano_mg: '', dano: 8, detalhes: [] },
  "Arco Curto Composto": { level: 5, preco: { quantidade: 75, moeda: 'po' }, peso: 1, tamanho: 'Médio', tipo: '', velocidade: 6, dano_p: '', dano_mg: '', dano: 6, detalhes: [] },
  "Arco Longo": { level: 3, preco: { quantidade: 75, moeda: 'po' }, peso: 1.5, tamanho: 'Grande', tipo: '', velocidade: 8, dano_p: '', dano_mg: '', dano: 8, detalhes: [] },
  "Arco Curto": { level: 1, preco: { quantidade: 30, moeda: 'po' }, peso: 1, tamanho: 'Médio', tipo: '', velocidade: 7, dano_p: '', dano_mg: '', dano: 6, detalhes: [] },
  "Clava": { level: 1, preco: { quantidade: 0, moeda: 'po' }, peso: 1.5, tamanho: 'Média', tipo: 'Concussão', velocidade: 4, dano_p: '1d6', dano_mg: '1d3', dano: 3, detalhes: [] },
  "Clava com Espinhos": { level: 1, preco: { quantidade: 0, moeda: 'po' }, peso: 1.5, tamanho: 'Média', tipo: 'Concussão', velocidade: 4, dano_p: '1d6+1', dano_mg: '1d3+1', dano: 3, detalhes: [] },
  "Besta de Mão": { level: 2, preco: { quantidade: 300, moeda: 'po' }, peso: 1.5, tamanho: 'Pequena', tipo: '', velocidade: 5, dano_p: '', dano_mg: '', dano: 2, detalhes: [] },
  "Besta Pesada": { level: 3, preco: { quantidade: 50, moeda: 'po' }, peso: 7, tamanho: 'Média', tipo: '', velocidade: 10, dano_p: '', dano_mg: '', dano: 7, detalhes: [] },
  "Besta Leve": { level: 1, preco: { quantidade: 35, moeda: 'po' }, peso: 3.5, tamanho: 'Média', tipo: '', velocidade: 7, dano_p: '', dano_mg: '', dano: 4, detalhes: [] },
  "Adaga": { level: 1, preco: { quantidade: 2, moeda: 'po' }, peso: 0, tamanho: 'Pequena', tipo: 'Perfurante', velocidade: 2, dano_p: '1d4', dano_mg: '1d3', dano: 3, detalhes: [] },
  "Punhal": { level: 1, preco: { quantidade: 2, moeda: 'po' }, peso: 0, tamanho: 'Pequeno', tipo: 'Perfurante', velocidade: 2, dano_p: '1d4', dano_mg: '1d3', dano: 3, detalhes: [] },
  "Dardo": { level: 1, preco: { quantidade: 5, moeda: 'pp' }, peso: 0.3, tamanho: 'Pequeno', tipo: 'Perfurante', velocidade: 2, dano_p: '1d3', dano_mg: '1d2', dano: 2, detalhes: [] },
  "Mangual de Infantaria": { level: 2, preco: { quantidade: 15, moeda: 'po' }, peso: 7.5, tamanho: 'Médio', tipo: 'Concussão', velocidade: 7, dano_p: '1d6+1', dano_mg: '2d4', dano: 8, detalhes: [] },
  "Mangual": { preco: { level: 2, quantidade: 10, moeda: 'po' }, peso: 5, tamanho: 'Médio', tipo: 'Concussão', velocidade: 7, dano_p: '1d6', dano_mg: '2d4', dano: 8, detalhes: [] },
  "Maça de Infantaria": { level: 2, preco: { quantidade: 8, moeda: 'po' }, peso: 5, tamanho: 'Média', tipo: 'Concussão', velocidade: 7, dano_p: '1d6+1', dano_mg: '1d6', dano: 6, detalhes: [] },
  "Maça": { level: 1, preco: { quantidade: 6, moeda: 'po' }, peso: 4, tamanho: 'Média', tipo: 'Concussão', velocidade: 7, dano_p: '1d6', dano_mg: '1d6', dano: 6, detalhes: [] },
  "Alvião de Infantaria": { level: 3, preco: { quantidade: 8, moeda: 'po' }, peso: 3, tamanho: 'Médio', tipo: 'Perfurante', velocidade: 7, dano_p: '1d6+1', dano_mg: '2d4', dano: 8, detalhes: [] },
  "Alvião": { level: 3, preco: { quantidade: 7, moeda: 'po' }, peso: 3, tamanho: 'Médio', tipo: 'Perfurante', velocidade: 7, dano_p: '1d6', dano_mg: '2d4', dano: 9, detalhes: [] },
  "Machadinha": { level: 1, preco: { quantidade: 1, moeda: 'po' }, peso: 2.5, tamanho: 'Média', tipo: 'Cortante', velocidade: 4, dano_p: '1d6', dano_mg: '1d6', dano: 6, detalhes: [] },
  "Arpão": { level: 2, preco: { quantidade: 20, moeda: 'po' }, peso: 3, tamanho: 'Grande', tipo: 'Perfurante', velocidade: 7, dano_p: '2d4', dano_mg: '2d6', dano: 13, detalhes: [] },
  "Mangual de Cavalaria": { level: 4, preco: { quantidade: 8, moeda: 'po' }, peso: 2.5, tamanho: 'Médio', tipo: 'Concussão', velocidade: 6, dano_p: '1d4+1', dano_mg: '1d4', dano: 4, detalhes: [] },
  "Maça de Cavalaria": { level: 3, preco: { quantidade: 5, moeda: 'po' }, peso: 3, tamanho: 'Média', tipo: 'Concussão', velocidade: 6, dano_p: '1d6', dano_mg: '1d4', dano: 4, detalhes: [] },
  "Alvião de Cavalaria": { level: 3, preco: { quantidade: 7, moeda: 'po' }, peso: 2, tamanho: 'Médio', tipo: 'Perfurante', velocidade: 5, dano_p: '1d4+1', dano_mg: '1d4', dano: 4, detalhes: [] },
  "Azagaia": { level: 1, preco: { quantidade: 5, moeda: 'pp' }, peso: 1, tamanho: 'Média', tipo: 'Perfurante', velocidade: 4, dano_p: '1d6', dano_mg: '1d6', dano: 6, detalhes: [] },
  "Faca": { level: 1, preco: { quantidade: 5, moeda: 'pp' }, peso: 0.3, tamanho: 'Pequena', tipo: 'Perfurante/Cortante', velocidade: 2, dano_p: '1d3', dano_mg: '1d2', dano: 2, detalhes: [] },
  "Lança de Cavalaria Pesada": { level: 5, preco: { quantidade: 15, moeda: 'po' }, peso: 7.5, tamanho: 'Grande', tipo: 'Perfurante', velocidade: 8, dano_p: '1d8+1', dano_mg: '3d6', dano: 20, detalhes: [ "Inflige dano duplo se usada com montaria" ] },
  "Lança de Cavalaria": { level: 3, preco: { quantidade: 6, moeda: 'po' }, peso: 2.5, tamanho: 'Grande', tipo: 'Perfurante', velocidade: 6, dano_p: '1d6', dano_mg: '1d8', dano: 8, detalhes: [ "Inflige dano duplo se usada com montaria" ] },
  "Lança de Tornoio": { level: 5, preco: { quantidade: 20, moeda: 'po' }, peso: 20, tamanho: 'Grande', tipo: 'Perfurante', velocidade: 10, dano_p: '1d3-1', dano_mg: '1d2-1', dano: 1, detalhes: [ "Inflige dano duplo se usada com montaria" ] },
  "Lança de Cavalaria Média": { level: 3, preco: { quantidade: 10, moeda: 'po' }, peso: 5, tamanho: 'Grande', tipo: 'Perfurante', velocidade: 7, dano_p: '1d6+1', dano_mg: '2d6', dano: 13, detalhes: [ "Inflige dano duplo se usada com montaria" ] },
  "Aprisionador": { level: 1, preco: { quantidade: 30, moeda: 'po' }, peso: 4, tamanho: 'Grande', tipo: '', velocidade: 7, dano_p: '', dano_mg: '', dano: 1, detalhes: [ "Derruba cavaleiro em golpe bem sucedido" ] },
  "Maça-Estrela": { level: 1, preco: { quantidade: 10, moeda: 'po' }, peso: 6, tamanho: 'Média', tipo: 'Concussão', velocidade: 7, dano_p: '2d4', dano_mg: '1d6+1', dano: 7, detalhes: [] },
  "Pique": { level: 2, preco: { quantidade: 5, moeda: 'po' }, peso: 6, tamanho: 'Grande', tipo: 'Perfurante', velocidade: 13, dano_p: '1d6', dano_mg: '1d12', dano: 12, detalhes: [ "Inflige dano duplo se firmemente presa para receber ataque" ] },
  "Bardiche": { level: 2, preco: { quantidade: 7, moeda: 'po' }, peso: 6, tamanho: 'Grande', tipo: 'Cortante', velocidade: 9, dano_p: '2d4', dano_mg: '2d6', dano: 13, detalhes: [] },
  "Bec de Corbin": { level: 2, preco: { quantidade: 8, moeda: 'po' }, peso: 5, tamanho: 'Grande', tipo: 'Perfurante/Concussão', velocidade: 9, dano_p: '1d8', dano_mg: '1d6', dano: 6, detalhes: [] },
  "Bill-Guisarme": { level: 2, preco: { quantidade: 7, moeda: 'po' }, peso: 7.5, tamanho: 'Grande', tipo: 'Perfurante/Cortante', velocidade: 10, dano_p: '2d4', dano_mg: '1d10', dano: 10, detalhes: [] },
  "Fauchard": { level: 2, preco: { quantidade: 5, moeda: 'po' }, peso: 3.5, tamanho: 'Grande', tipo: 'Perfurante/Cortante', velocidade: 8, dano_p: '1d6', dano_mg: '1d8', dano: 8, detalhes: [] },
  "Bordona": { level: 2, preco: { quantidade: 8, moeda: 'po' }, peso: 3.5, tamanho: 'Grande', tipo: 'Perfurante/Cortante', velocidade: 8, dano_p: '1d8', dano_mg: '1d10', dano: 10, detalhes: [] },
  "Glaive": { level: 2, preco: { quantidade: 6, moeda: 'po' }, peso: 4, tamanho: 'Grande', tipo: 'Cortante', velocidade: 8, dano_p: '1d6', dano_mg: '1d10', dano: 10, detalhes: [ "Inflige dano duplo contra atacantes Grandes ou maiores" ] },
  "Glaive Guisarme": { level: 2, preco: { quantidade: 10, moeda: 'po' }, peso: 5, tamanho: 'Grande', tipo: 'Perfurante/Cortante', velocidade: 9, dano_p: '2d4', dano_mg: '2d6', dano: 13, detalhes: [ "Inflige dano duplo contra atacantes Grandes ou maiores" ] },
  "Guisarme": { level: 2, preco: { quantidade: 5, moeda: 'po' }, peso: 4, tamanho: 'Grande', tipo: 'Cortante', velocidade: 8, dano_p: '2d4', dano_mg: '1d8', dano: 8, detalhes: [] },
  "Guisarme Voulge": { level: 2, preco: { quantidade: 8, moeda: 'po' }, peso: 7.5, tamanho: 'Grande', tipo: 'Perfurante/Cortante', velocidade: 10, dano_p: '2d4', dano_mg: '2d4', dano: 9, detalhes: [] },
  "Alabarda": { level: 2, preco: { quantidade: 10, moeda: 'po' }, peso: 7.5, tamanho: 'Grande', tipo: 'Perfurante/Cortante', velocidade: 9, dano_p: '1d10', dano_mg: '2d6', dano: 13, detalhes: [] },
  "Fauchard Gancho": { level: 2, preco: { quantidade: 10, moeda: 'po' }, peso: 4, tamanho: 'Grande', tipo: 'Perfurante/Cortante', velocidade: 9, dano_p: '1d4', dano_mg: '1d4', dano: 4, detalhes: [] },
  "Martelo Lucerno": { level: 2, preco: { quantidade: 7, moeda: 'po' }, peso: 7.5, tamanho: 'Grande', tipo: 'Perfurante/Concussão', velocidade: 9, dano_p: '2d4', dano_mg: '1d6', dano: 6, detalhes: [ "Inflige dano duplo se firmemente presa para receber ataque" ] },
  "Bidente": { level: 1, preco: { quantidade: 5, moeda: 'po' }, peso: 3.5, tamanho: 'Grande', tipo: 'Perfurante', velocidade: 7, dano_p: '1d8', dano_mg: '2d4', dano: 9, detalhes: [] },
  "Partisan": { level: 2, preco: { quantidade: 10, moeda: 'po' }, peso: 4, tamanho: 'Grande', tipo: 'Perfurante', velocidade: 9, dano_p: '1d6', dano_mg: '1d6+1', dano: 7, detalhes: [ "Inflige dano duplo se firmemente presa para receber ataque" ] },
  "Ranseur": { level: 2, preco: { quantidade: 6, moeda: 'po' }, peso: 3.5, tamanho: 'Grande', tipo: 'Perfurante', velocidade: 8, dano_p: '2d4', dano_mg: '2d4', dano: 9, detalhes: [ "Inflige dano duplo se firmemente presa para receber ataque" ] },
  "Spetum": { level: 2, preco: { quantidade: 5, moeda: 'po' }, peso: 3.5, tamanho: 'Grande', tipo: 'Perfurante', velocidade: 8, dano_p: '1d6+1', dano_mg: '2d6', dano: 13, detalhes: [ "Inflige dano duplo se firmemente presa para receber ataque" ] },
  "Voulge": { level: 2, preco: { quantidade: 5, moeda: 'po' }, peso: 6, tamanho: 'Grande', tipo: 'Cortante', velocidade: 10, dano_p: '2d4', dano_mg: '2d4', dano: 9, detalhes: [] },
  "Bordão": { level: 1, preco: { quantidade: 5, moeda: 'pc' }, peso: 2, tamanho: 'Grande', tipo: 'Concussão', velocidade: 4, dano_p: '1d6', dano_mg: '1d6', dano: 6, detalhes: [] },
  "Açoite": { level: 1, preco: { quantidade: 1, moeda: 'po' }, peso: 1, tamanho: 'Pequeno', tipo: '', velocidade: 5, dano_p: '1d4', dano_mg: '1d2', dano: 2, detalhes: [] },
  "Foice": { level: 1, preco: { quantidade: 6, moeda: 'pp' }, peso: 1.5, tamanho: 'Pequeno', tipo: 'Cortante', velocidade: 4, dano_p: '1d4+1', dano_mg: '1d4', dano: 4, detalhes: [] },
  "Funda": { level: 1, preco: { quantidade: 5, moeda: 'pc' }, peso: 0, tamanho: 'Pequena', tipo: '', velocidade: 6, dano_p: '', dano_mg: '', dano: 4, detalhes: [] },
  "Lança": { level: 1, preco: { quantidade: 8, moeda: 'pp' }, peso: 2.5, tamanho: 'Média', tipo: 'Perfurante', velocidade: 6, dano_p: '1d6', dano_mg: '1d8', dano: 8, detalhes: [] },
  "Cajado-Funda": { level: 1, preco: { quantidade: 2, moeda: 'pp' }, peso: 1, tamanho: 'Médio', tipo: '', velocidade: 11, dano_p: '', dano_mg: '', dano: 4, detalhes: [] },
  "Espada Bastarda": { level: 5, preco: { quantidade: 25, moeda: 'po' }, peso: 5, tamanho: 'Média', tipo: 'Cortante', velocidade: 6, dano_p: '1d8', dano_mg: '1d12', dano: 12, detalhes: [ "Com duas mãos possui Velocidade 8, Dano (PM) 2d4 e (G) 2d8" ] },
  "Espada Larga": { level: 5, preco: { quantidade: 10, moeda: 'po' }, peso: 2, tamanho: 'Média', tipo: 'Cortante', velocidade: 5, dano_p: '2d4', dano_mg: '1d6+1', dano: 7, detalhes: [] },
  "Khopesh": { level: 3, preco: { quantidade: 10, moeda: 'po' }, peso: 3.5, tamanho: 'Médio', tipo: 'Cortante', velocidade: 9, dano_p: '2d4', dano_mg: '1d6', dano: 6, detalhes: [] },
  "Espada Longa": { level: 2, preco: { quantidade: 15, moeda: 'po' }, peso: 2, tamanho: 'Média', tipo: 'Cortante', velocidade: 5, dano_p: '1d8', dano_mg: '1d12', dano: 12, detalhes: [] },
  "Cimitarra": { level: 1, preco: { quantidade: 15, moeda: 'po' }, peso: 2, tamanho: 'Média', tipo: 'Cortante', velocidade: 5, dano_p: '1d8', dano_mg: '1d8', dano: 8, detalhes: [] },
  "Espada Curta": { level: 1, preco: { quantidade: 10, moeda: 'po' }, peso: 1.5, tamanho: 'Pequena', tipo: 'Perfurante', velocidade: 3, dano_p: '1d6', dano_mg: '1d8', dano: 8, detalhes: [] },
  "Montante": { level: 8, preco: { quantidade: 50, moeda: 'po' }, peso: 7.5, tamanho: 'Grande', tipo: 'Cortante', velocidade: 10, dano_p: '1d10', dano_mg: '3d6', dano: 20, detalhes: [] },
  "Tridente": { level: 3, preco: { quantidade: 15, moeda: 'po' }, peso: 3.5, tamanho: 'Grande', tipo: 'Perfurante', velocidade: 7, dano_p: '1d6+1', dano_mg: '3d4', dano: 14, detalhes: [] },
  "Martelo de Batalha": { level: 3, preco: { quantidade: 10, moeda: 'po' }, peso: 4, tamanho: 'Médio', tipo: 'Concussão', velocidade: 4, dano_p: '1d6', dano_mg: '1d6+1', dano: 7, detalhes: [] },
  "Martelo": { level: 1, preco: { quantidade: 1, moeda: 'po' }, peso: 2, tamanho: 'Médio', tipo: 'Concussão', velocidade: 3, dano_p: '1d4', dano_mg: '1d4', dano: 4, detalhes: [] },
  "Chicote": { level: 1, preco: { quantidade: 1, moeda: 'pp' }, peso: 1, tamanho: 'Médio', tipo: '', velocidade: 8, dano_p: '1d2', dano_mg: '1', dano: 1, detalhes: [] },
  "Rapieira": { level: 1, preco: { quantidade: 10, moeda: 'po' }, peso: 1.5, tamanho: 'Pequena', tipo: 'Perfurante', velocidade: 3, dano_p: '1d6', dano_mg: '1d8', dano: 8, detalhes: [] },
  "Flamberge": { level: 3, preco: { quantidade: 10, moeda: 'po' }, peso: 2, tamanho: 'Média', tipo: 'Cortante', velocidade: 5, dano_p: '2d4', dano_mg: '1d6+1', dano: 7, detalhes: [] },
  "Gládio": { level: 1, preco: { quantidade: 12, moeda: 'po' }, peso: 1.5, tamanho: 'Pequeno', tipo: 'Perfurante', velocidade: 3, dano_p: '1d6', dano_mg: '1d6+1', dano: 7, detalhes: [] },
  "Falchion": { level: 1, preco: { quantidade: 12, moeda: 'po' }, peso: 1, tamanho: 'Pequeno', tipo: 'Cortante', velocidade: 3, dano_p: '1d4', dano_mg: '1d6', dano: 6, detalhes: [] },
  "Alfange": { level: 1, preco: { quantidade: 10, moeda: 'po' }, peso: 3.5, tamanho: 'Médio', tipo: 'Cortante', velocidade: 9, dano_p: '2d4', dano_mg: '1d6', dano: 6, detalhes: [] },
  "Claymore": { level: 5, preco: { quantidade: 50, moeda: 'po' }, peso: 7.5, tamanho: 'Grande', tipo: 'Cortante', velocidade: 10, dano_p: '1d10', dano_mg: '3d6', dano: 20, detalhes: [] },
  "Machete": { level: 1, preco: { quantidade: 5, moeda: 'po' }, peso: 1, tamanho: 'Pequena', tipo: 'Cortante', velocidade: 2, dano_p: '1d4', dano_mg: '1d4+1', dano: 5, detalhes: [] },
  "Sabre": { level: 1, preco: { quantidade: 10, moeda: 'po' }, peso: 3.5, tamanho: 'Médio', tipo: 'Cortante', velocidade: 9, dano_p: '2d4', dano_mg: '1d6', dano: 6, detalhes: [] },
  "Zweihander": { level: 3, preco: { quantidade: 25, moeda: 'po' }, peso: 5, tamanho: 'Médio', tipo: 'Cortante', velocidade: 6, dano_p: '1d8', dano_mg: '1d12', dano: 12, detalhes: [ "Com duas mãos possui Velocidade 8, Dano (PM) 2d4 e (G) 2d8" ] },
  "Wakizashi": { level: 5, preco: { quantidade: 20, moeda: 'po' }, peso: 1, tamanho: 'Pequena', tipo: 'Cortante', velocidade: 2, dano_p: '1d6+1', dano_mg: '1d8+1', dano: 9, detalhes: [] },
  "Katana": { level: 5, preco: { quantidade: 25, moeda: 'po' }, peso: 2, tamanho: 'Média', tipo: 'Cortante', velocidade: 4, dano_p: '1d8+1', dano_mg: '1d12+1', dano: 13, detalhes: [] },
  "Tachi": { level: 5, preco: { quantidade: 15, moeda: 'po' }, peso: 1.5, tamanho: 'Pequeno', tipo: 'Perfurante', velocidade: 3, dano_p: '1d6', dano_mg: '1d8', dano: 8, detalhes: [] },
  "Tanto": { level: 5, preco: { quantidade: 10, moeda: 'pp' }, peso: 0.3, tamanho: 'Pequeno', tipo: 'Perfurante', velocidade: 2, dano_p: '1d3', dano_mg: '1d3', dano: 3, detalhes: [] },
  "Shuriken": { level: 1, preco: { quantidade: 5, moeda: 'pp' }, peso: 0.3, tamanho: 'Pequena', tipo: 'Perfurante', velocidade: 2, dano_p: '1d2', dano_mg: '1d2', dano: 2, detalhes: [] },
  "Corrente": { level: 1, preco: { quantidade: 1, moeda: 'pp' }, peso: 1, tamanho: 'Média', tipo: '', velocidade: 8, dano_p: '1d2', dano_mg: '1', dano: 1, detalhes: [] },
  "Cajado": { level: 1, preco: { quantidade: 10, moeda: 'pp' }, peso: 1, tamanho: 'Grande', tipo: 'Concussão', velocidade: 3, dano_p: '1d4', dano_mg: '1d4', dano: 4, detalhes: [] },
  "Cetro": { level: 1, preco: { quantidade: 1, moeda: 'po' }, peso: 1, tamanho: 'Grande', tipo: 'Concussão', velocidade: 5, dano_p: '1d4', dano_mg: '1d4+1', dano: 5, detalhes: [] },
  "Cajado Pequeno": { level: 1, preco: { quantidade: 5, moeda: 'pp' }, peso: 1, tamanho: 'Médio', tipo: 'Concussão', velocidade: 3, dano_p: '1d3', dano_mg: '1d3', dano: 3, detalhes: [] },
  "Bastão": { level: 1, preco: { quantidade: 5, moeda: 'pp' }, peso: 1, tamanho: 'Médio', tipo: 'Concussão', velocidade: 3, dano_p: '1d3', dano_mg: '1d3', dano: 3, detalhes: [] },
  "Laço": { level: 1, preco: { quantidade: 1, moeda: 'pp' }, peso: 1, tamanho: 'Médio', tipo: '', velocidade: 8, dano_p: '1d2', dano_mg: '1', dano: 1, detalhes: [] },
};

// { level: 1, nome: '♔ Corselete de Couro Simples', ca: 8, preco: { quantidade: 5, moeda: 'po' }, peso: 7.5 },
function obter_escudo(escudo) {
  let detalhes = '';
  if (escudo.detalhes.length > 0) {
    detalhes = `, ${escudo.detalhes[0]}`;
  }
  return {
    descricao: escudo.nome,
    detalhes: `CA ${escudo.ca}, preço: ${escudo.preco.quantidade}${escudo.preco.moeda}${ (escudo.ataques_por_rodada > 0) ? (', Ataques por rodada: ' + escudo.ataques_por_rodada) : '' }${detalhes}`,
    peso_unitario: escudo.peso,
  };
}

function obter_armadura(escudo) {
  return {
    descricao: escudo.nome,
    detalhes: `CA ${escudo.ca}, preço: ${escudo.preco.quantidade}${escudo.preco.moeda}${ (escudo.ataques_por_rodada > 0) ? (', Ataques por rodada: ' + escudo.ataques_por_rodada) : '' }`,
    peso_unitario: escudo.peso,
  };
}

//console.log(obter_escudo(P_ITENS_ESCUDOS[0]));
//console.log(obter_armadura(P_ITENS_ARMADURAS[0]));

function obter_misseis(missel) {
  return {
    descricao: missel.nome,
    detalhes: `Dano (PM): ${missel.dano_p}, Dano (G): ${missel.dano_mg}, ${missel.tipo}, Disparos/Rodada: ${missel.cadencia}, ${missel.tamanho}, Velocidade ${missel.velocidade}, preço: ${missel.preco.quantidade}${missel.preco.moeda}`,
    peso_unitario: missel.peso,
  };
}

//console.log(obter_misseis("🏹 Quadrelo Pequeno",P_ITENS_MISSEIS["🏹 Quadrelo Pequeno"]));

function obter_arma(arma) {
  let danos = '';
  if ( (arma.dano_p != '') && (arma.dano_mg != '') ) {
    danos = `, Dano (PM): ${arma.dano_p}, Dano (G): ${arma.dano_mg}`;
  } else if ( (arma.dano_p != '') && (arma.dano_mg == '') ) {
    danos = `, Dano: ${arma.dano_p}`;
  } else if ( (arma.dano_p == '') && (arma.dano_mg != '') ) {
    danos = `, Dano: ${arma.dano_mg}`;
  }

  let tipo = '';
  if (arma.tipo != '') {
    tipo = `, ${arma.tipo}`;
  }

  let detalhes = '';
  if (arma.detalhes.length > 0) {
    detalhes = `, ${arma.detalhes[0]}`;
  }

  return {
    descricao: arma.nome,
    detalhes: `${arma.tamanho}${danos}${tipo}, Velocidade ${arma.velocidade}, preço: ${arma.preco.quantidade}${arma.preco.moeda}${detalhes}`,
    peso_unitario: arma.peso,
  };
}

//console.log(obter_arma("⚔ Katana",P_ITENS_ARMAS["⚔ Katana"]));

function obter_item(item) {
  // { peso: 0.5, nome: '⚜ Botas de Montaria', preco: { quantidade: 3, moeda: 'po' } },
  // tipo: '', velocidade: 5, dano_p: '', dano_mg: '',

  let detalhes = '';
  if ( (item.detalhes != undefined) && (item.detalhes != null) ) {
    detalhes = `${item.detalhes}, `;
  }

  return {
    descricao: item.nome,
    detalhes: `${detalhes}preço: ${item.preco.quantidade}${item.preco.moeda}`,
    peso_unitario: item.peso,
  };
}

//console.log(obter_item(P_ITENS_ITENS[0]));
//console.log(obter_item(P_ITENS_VESTIMENTAS_FINAL[7]));


function gerar_SQLs_mapear_objetos(lista,funcao) {
  return lista.map(
    (entry) => {
      if (funcao == 'obter_escudo') {
        return obter_escudo(entry);
      } else if (funcao == 'obter_armadura') {
        return obter_armadura(entry);
      } else if (funcao == 'obter_misseis') {
        return obter_misseis(entry);
      } else if (funcao == 'obter_arma') {
        return obter_arma(entry);
      } else {
        return obter_item(entry);
      }
    }
  );
}

function gerar_SQLs_criar_lista(nome_global,eh_key,funcao,callback) {
  let lista = nome_global;
  if (eh_key) {
    lista = Object.keys(nome_global).map(function(key){
        return Object.assign({}, {nome: key}, nome_global[key]);
    });
  }

  callback(gerar_SQLs_mapear_objetos(lista,funcao));
}

function gerar_SQLs_join_listas(listas,callback) {
  let listona = [];

  listas.forEach((lista, index_lista) => {
    lista.forEach((entry, index_entry) => {

      let index_encontrado = listona.findIndex(obj => {
        return obj.descricao === entry.descricao
      })
      if (index_encontrado == -1) {
        listona.push(entry);
      }

      if (index_entry == (lista.length - 1)) {
        if (index_lista == (listas.length - 1)) {
          callback(listona);
        }
      }
    });
  });
}

function gerar_SQLs_inner(callback) {
  let variaveis = [
    {
      global: P_ITENS_ITENS,
      eh_key: false,
      funcao: 'obter_item',
    },
    {
      global: P_ITENS_VESTIMENTAS_FINAL,
      eh_key: false,
      funcao: 'obter_item',
    },
    {
      global: P_ITENS_ALIMENTOS,
      eh_key: false,
      funcao: 'obter_item',
    },
    {
      global: P_ITENS_ESCUDOS,
      eh_key: false,
      funcao: 'obter_escudo',
    },
    {
      global: P_ITENS_ARMADURAS,
      eh_key: false,
      funcao: 'obter_armadura',
    },
    {
      global: P_ITENS_MISSEIS,
      eh_key: true,
      funcao: 'obter_misseis',
    },
    {
      global: P_ITENS_ARMAS,
      eh_key: true,
      funcao: 'obter_arma',
    },
  ];

  let listas = [];

  variaveis.forEach((entry, index) => {
    gerar_SQLs_criar_lista(entry.global,entry.eh_key,entry.funcao,(lista)=>{
      listas.push(lista);

      if (index == (variaveis.length - 1)) {
        gerar_SQLs_join_listas(listas,(listona)=>{
          callback(listona);
        });
      }
    });
  });
}

function gerar_SQLs() {
  gerar_SQLs_inner((listona)=>{
    let sql = `insert into itens_base (descricao,detalhes,peso_unitario,uuid_medida_peso_unitario,uuid_sistema) values `;
    listona.forEach((linha, index) => {
      sql += `\n\t('${linha.descricao}','${linha.detalhes}','${linha.peso_unitario}','542fc103-6cbd-4ecc-b457-2959dd0ffe7f','a66888e0-5259-424f-be09-c641b0040bc9')`;
      if (index < (listona.length - 1)) {
        sql += ',';
      }

      if (index == (listona.length - 1)) {
        console.log(sql);
      }
    });
  });
}

gerar_SQLs();
