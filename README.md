<p align="center">
  <img src="./.github/readme-cover.svg" alt="WERT | arquivo backend: Referência da API e dos estudos de publicação." width="100%" />
</p>

# WERT · backend e estudos de AWS

Repositório histórico do projeto WERT, preservado como referência da implementação e dos estudos de integração e publicação.

## Explore o diferencial

| Ponto de entrada | O que observar |
| --- | --- |
| [Modelo de domínio](prisma/schema.prisma) | O schema documenta as relações da base histórica. |
| [Organização das rotas](src/application/routes) | Os endpoints são agrupados por recursos da aplicação. |

## Versão de portfólio recomendada

A documentação principal e a cópia revisada estão em [wert-backend](https://github.com/Will-Ifes/wert-backend). Comece por essa versão para conhecer o contexto, a arquitetura e os requisitos de execução.

## Conteúdo desta base

API em Express, TypeScript, Prisma e PostgreSQL, com módulos de gestão e testes de rotas. O repositório registra uma etapa de estudos de publicação em AWS; não há garantia de infraestrutura ou endereço de produção ativo.

<details>
<summary><strong>Organização e código</strong></summary>

### Caminhos de leitura

- [Rotas da API](src/application/routes).
- [Módulos de domínio](src/domain).
- [Schema de dados](prisma/schema.prisma).
- [Testes](tests).

</details>

<details>
<summary><strong>Executar e consultar</strong></summary>

### Executar e consultar

Use as instruções da [edição revisada](https://github.com/Will-Ifes/wert-backend#executar), observando que código e configuração podem divergir entre as bases. Os comandos efetivos deste repositório estão em [package.json](package.json).

</details>

<details>
<summary>Escopo e referências</summary>

Esta base histórica não deve ser tratada como modelo pronto para produção. Configurações, dados auxiliares e integrações antigas precisam de revisão antes de execução ou reutilização. Para demonstrações, utilize um ambiente próprio com dados fictícios.

</details>

---

Mantido por **Will Oliveira** · [Perfil](https://github.com/Will-Ifes) · [LinkedIn](https://www.linkedin.com/in/wildemberg-de-jesus-oliveira/)
