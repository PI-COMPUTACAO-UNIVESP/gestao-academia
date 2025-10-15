# Documento de Requisitos — Plataforma Web para Gestão de Academias (MVP)
**Data:** 09/10/2025  
**Versão:** 1.0  
**Fonte base:** Relatório Técnico-Científico do Projeto Integrador II (UNIVESP).  

---

## 1. Visão Geral
**Resumo do produto.** Plataforma web com banco de dados relacional, hospedada em nuvem, para **automatizar e centralizar** processos de academias: cadastro de alunos, planos, controle de mensalidades, relatórios gerenciais e acompanhamento de frequência. Foco em **usabilidade, segurança, acessibilidade** e **eficiência operacional**. 

**Objetivo do MVP.** Entregar rapidamente um sistema funcional que permita operar o básico da academia com confiabilidade, reduzindo controles manuais e erros. 

**Público-alvo.** Gestores/recepção de academias de pequeno e médio porte e, em fases futuras, alunos (autoatendimento). 

---

## 2. Escopo do MVP
### 2.1 Módulos incluídos
- **Cadastro de Alunos:** dados pessoais/contratuais, plano vigente, status de pagamento. 
- **Planos e Contratos:** criação/edição de tipos de plano (mensal, trimestral, anual) com valores/benefícios. 
- **Cobrança e Mensalidades:** registro de pagamentos; visualização de pendências e vencimentos; base para notificações. 
- **Relatórios Gerenciais:** financeiros, alunos ativos, inadimplência e análises por período. 
- **Frequência/Presença:** marcação de presença para acompanhamento de assiduidade. 

### 2.2 Fora do escopo (MVP)
- App mobile nativo; gateways de pagamento integrados; fidelidade/pontos; CRM avançado; BI completo; integrações externas (ex.: catracas) — apenas **planejados** para fases futuras.

---

## 3. Requisitos Funcionais (RF)
> Numeração RF-XX p/ rastreabilidade.

- **RF-01 — Gerenciar Alunos.** Criar/editar/excluir aluno; registrar plano, vencimento e status. (Módulo Cadastro)   
- **RF-02 — Gerenciar Planos.** Criar/editar tipos de plano com preço e periodicidade.   
- **RF-03 — Registrar Mensalidades.** Lançar pagamento, marcar como em aberto/vencido/quitado; listar por período.   
- **RF-04 — Relatórios Financeiros.** Gerar relatório de receitas por período e status de inadimplência.   
- **RF-05 — Relatórios Operacionais.** Listar alunos ativos/inativos; filtros por plano/período.   
- **RF-06 — Controle de Frequência.** Registrar presença e consultar histórico por aluno.   
- **RF-07 — Notificações Básicas.** Preparar envio de lembretes de vencimento (e-mail/whats **manual** no MVP).   
- **RF-08 — Acesso Administrativo.** Login de administrador/atendente para operar módulos do MVP. (derivado da necessidade de segurança e gestão) 

---

## 4. Requisitos Não Funcionais (RNF)
- **RNF-01 — Usabilidade & Acessibilidade.** Interface responsiva; navegação por teclado; etiquetas semânticas; leitura por tecnologias assistivas.   
- **RNF-02 — Desempenho.** Tabelas e relatórios do MVP devem carregar em ≤ 2 s com até 5 mil registros (ambiente acadêmico).  
- **RNF-03 — Segurança.** Autenticação, perfis mínimos (admin/atendente), criptografia de senhas; políticas de acesso básico.  
- **RNF-04 — Confiabilidade.** Registro de erros; logs de auditoria mínimos nos módulos de cobrança.  
- **RNF-05 — Portabilidade.** Hospedagem em nuvem (ex.: Azure/AWS), com deploy simples (CI/CD opcional).   
- **RNF-06 — Banco Relacional.** Modelagem normalizada usando MySQL/PostgreSQL. 

---

## 5. Regras de Negócio (RN)
- **RN-01 — Status de Pagamento.** Mensalidade possui estados *Em aberto* → *Vencida* → *Paga*; regras de transição controladas pelo lançamento.   
- **RN-02 — Plano Vigente.** Um aluno possui **um** plano vigente por período; alterações geram histórico.   
- **RN-03 — Relatórios Data-Driven.** Todos os relatórios obedecem filtros (período, status, plano) e exportação CSV (MVP).   
- **RN-04 — Frequência.** Registro atômico por aluno/data; impedir duplicidade no mesmo dia por padrão.

---

## 6. Modelo de Dados (rascunho)
**Entidades MVP:** `Aluno(id, nome, doc, contato, ativo)`, `Plano(id, nome, periodicidade, valor)`, `Contrato(id, alunoId, planoId, dtInicio, dtFim, status)`, `Mensalidade(id, contratoId, competencia, vencimento, status, dtPagamento, valor)`, `Presenca(id, alunoId, data, observacao)`, `Usuario(id, nome, perfil, email, senhaHash)`. (Aderente ao banco relacional citado.) 

---

## 7. Casos de Uso (alto nível)
- **UC-01 — Cadastrar Aluno** → RF-01  
- **UC-02 — Configurar Planos** → RF-02  
- **UC-03 — Lançar Pagamento** → RF-03  
- **UC-04 — Visualizar Relatórios Financeiros/Operacionais** → RF-04/RF-05  
- **UC-05 — Registrar Frequência** → RF-06  
- **UC-06 — Enviar/Registrar Notificação de Vencimento (manual)** → RF-07  
- **UC-07 — Autenticar Usuário Administrativo** → RF-08

**Fluxo exemplo (UC-03 — Lançar Pagamento):**
1) Atendente busca aluno/contrato → 2) Seleciona competência em aberto → 3) Informa valor/forma de pagamento → 4) Salva → 5) Sistema atualiza status e reflete no relatório.

---

## 8. Critérios de Aceite (MVP)
- RF-01: É possível criar/editar/excluir aluno e visualizar plano/status vigentes.  
- RF-03: Ao lançar um pagamento, a competência muda para **Paga** e aparece no relatório financeiro.  
- RF-05: Relatório de “Alunos Ativos” filtra por plano e período.  
- RF-06: Presença registrada aparece no histórico do aluno.  
- RNF-01: Navegação por teclado cobre todas as ações do CRUD; labels possuem `for`/`aria-*` consistentes. 

---

## 9. Requisitos de Acessibilidade (resumo orientativo)
- Contraste e tipografia legíveis; foco visível; ordem lógica de tabulação.  
- Textos alternativos nas imagens; feedbacks de erro e sucesso acessíveis.  
- Testes com leitor de tela e inspeção de acessibilidade do navegador. 

---

## 10. Restrições e Tecnologias de Referência
- **Cliente-Servidor** hospedado em nuvem (ex.: Azure/AWS); **Front-end** HTML5/CSS3/JS (possível React/Vue); **Back-end** Node/PHP; **BD** MySQL/PostgreSQL. (Referências metodológicas do relatório.) 
- Prazos conforme cronograma acadêmico (out–nov) para modelagem, desenvolvimento e testes. 

---

## 11. Backlog Inicial (priorizado)
1. **Setup Projeto & Deploy básico** (RNF-05/06)  
2. **RF-08** — Autenticação administrativa  
3. **RF-01** — CRUD Aluno  
4. **RF-02** — CRUD Plano  
5. **RF-03** — Lançar/gerir mensalidades  
6. **RF-04/RF-05** — Relatórios essenciais  
7. **RF-06** — Presença  
8. **RF-07** — Notificação manual (vencimentos)

---

## 12. Métricas de Sucesso (MVP)
- Operar cadastro+planos+mensalidades para ≥ 50 alunos de teste sem erros críticos.  
- Geração de relatórios em ≤ 2 s.  
- Checklist de acessibilidade básico aprovado. 


