# Google Maps Leads Extractor & Qualifier 🚀

Uma solução inteligente de automação desenvolvida em **Google Apps Script** integrada ao **Google Sheets**, projetada para acelerar a prospecção B2B. A ferramenta utiliza a API oficial do Google Maps para extrair leads qualificados com base em segmento e geolocalização, aplicando uma camada de inteligência de dados para classificar a maturidade digital de cada empresa.

## 🌟 Diferenciais da Ferramenta

Diferente de extratores comuns que apenas acumulam dados brutos, esta automação limpa e analisa as informações em tempo real, entregando uma segmentação estratégica:

* **Busca Customizada:** Varredura dinâmica por Palavra-Chave (Segmento) e Localidade (Cidade/Estado).
* **Classificação de Maturidade Automatizada:** Um algoritmo interno analisa métricas como nota de avaliação (*Rating*), volume de feedbacks e presença de site próprio para categorizar o lead:
  * 🥇 **PREMIUM:** Empresas consolidadas, com forte presença digital e avaliações positivas. Ideal para abordagens de alto valor.
  * 💎 **OPORTUNIDADE:** Empresas com excelente reputação local, mas que **não possuem site** ou canais digitais estruturados. O alvo perfeito para ofertas de desenvolvimento web, SEO e marketing digital.

## 🛠️ Tecnologias Utilizadas

* **Google Apps Script:** Lógica de backend e integração.
* **Google Maps API (Places API):** Mineração de dados geográficos e comerciais confiáveis.
* **Google Sheets:** Interface de usuário (UI) intuitiva e armazenamento de dados.

## 📋 Como Funciona (Fluxo do Usuário)

1. O usuário define o segmento (ex: *Clínica de Estética*) e o local (ex: *Belo Horizonte, MG*) na aba de pesquisas.
2. O script realiza as requisições HTTP para a API do Google Maps.
3. Os dados retornados (Nome, Telefone, Site, Rating, Total de Avaliações e Endereço) são populados na planilha.
4. A lógica de classificação roda automaticamente, adicionando as tags de maturidade.

## 🚀 Como Executar este Projeto

1. Crie uma planilha no seu Google Sheets.
2. Vá em **Extensões** > **Apps Script**.
3. Copie o código contido na pasta `/src` deste repositório e cole no editor do Apps Script.
4. Substitua a constante de configuração pela sua chave de API gerada no Google Cloud Platform:
   ```javascript
   const GOOGLE_MAPS_API_KEY = 'SUA_CHAVE_AQUI';

<img width="1271" height="295" alt="Captura de tela 2026-05-21 201350" src="https://github.com/user-attachments/assets/8f0783a7-1566-48ec-becb-9052d38fc42f" />
<img width="1905" height="767" alt="Captura de tela 2026-05-21 201326" src="https://github.com/user-attachments/assets/217ec82d-6c3f-4725-b45c-b9393f9a8543" />

