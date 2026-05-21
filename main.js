function processarAgenteLeads() {
  const API_KEY = ' SUA_API_KEY_AQUI '; // <--- Coloque sua chave entre as aspas
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // 1. Acessa a aba de Pesquisa e pega os filtros
  const abaInput = ss.getSheetByName("Pesquisa");
  const palavraChave = abaInput.getRange("A2").getValue();
  const local = abaInput.getRange("B2").getValue();
  const tipo = abaInput.getRange("C2").getValue();
  
  if (!palavraChave || !local) {
    SpreadsheetApp.getUi().alert("Por favor, preencha pelo menos Palavra-chave e Local na aba Pesquisa.");
    return;
  }

  const abaOutput = ss.getSheetByName("Leads Extraídos");

  // 2. LÓGICA DE DUPLICATAS: Lê nomes já salvos para não repetir
  let nomesJaSalvos = [];
  if (abaOutput.getLastRow() > 1) {
    nomesJaSalvos = abaOutput.getRange(2, 1, abaOutput.getLastRow() - 1, 1).getValues().flat();
  }

  // 3. Monta a busca e chama a API
  const queryFinal = encodeURIComponent(`${palavraChave} ${tipo} em ${local}`);
  const urlBusca = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${queryFinal}&key=${API_KEY}`;
  
  try {
    const response = UrlFetchApp.fetch(urlBusca);
    const resultados = JSON.parse(response.getContentText()).results;

    let novosLeadsContador = 0;

    for (let i = 0; i < resultados.length; i++) {
      if (novosLeadsContador >= 10) break; // Limite de 10 novos leads por clique

      let place = resultados[i];
      let nomePlace = place.name;

      // FILTRO: Nota 4.0+ e não pode ser duplicado
      if (place.rating >= 4.0 && !nomesJaSalvos.includes(nomePlace)) {
        
        // Busca Detalhes Profundos (Cota Pro)
        const urlDetalhes = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place.place_id}&fields=name,formatted_phone_number,website,user_ratings_total&key=${API_KEY}`;
        const detRes = UrlFetchApp.fetch(urlDetalhes);
        const detalhes = JSON.parse(detRes.getContentText()).result;

        if (detalhes) {
          const telefone = detalhes.formatted_phone_number;
          const site = detalhes.website;
          const avaliacoes = detalhes.user_ratings_total || 0;
          
          // 4. LÓGICA DE MATURIDADE DIGITAL
          let maturidade = "";
          if (!site && avaliacoes > 10) {
            maturidade = "💎 OPORTUNIDADE: Ótima nota, mas SEM SITE";
          } else if (site && avaliacoes > 50) {
            maturidade = "🥇 PREMIUM: Empresa consolidada";
          } else if (site && avaliacoes <= 10) {
            maturidade = "📈 EM CRESCIMENTO: Tem site, pouca prova social";
          } else if (!site && avaliacoes <= 10) {
            maturidade = "🌱 INICIANTE: Sem site e poucas avaliações";
          } else {
            maturidade = "⚠️ ANALISAR: Perfil manual";
          }

          // 5. REGRA DE QUALIFICAÇÃO: Ter Telefone OU Site
          if (telefone || site) {
            abaOutput.appendRow([
              detalhes.name,               // Coluna A
              telefone || "N/A",           // Coluna B
              site || "N/A",               // Coluna C
              place.rating,                // Coluna D
              avaliacoes,                  // Coluna E
              maturidade,                  // Coluna F
              place.formatted_address      // Coluna G
            ]);
            
            nomesJaSalvos.push(nomePlace); 
            novosLeadsContador++;
          }
        }
      }
    }
    
    if (novosLeadsContador === 0) {
      SpreadsheetApp.getUi().alert("Nenhum lead novo encontrado para esta busca.");
    } else {
      SpreadsheetApp.getUi().alert(`Sucesso! ${novosLeadsContador} novos leads adicionados e classificados.`);
    }

  } catch (e) {
    SpreadsheetApp.getUi().alert("Erro: " + e.message);
  }
}
