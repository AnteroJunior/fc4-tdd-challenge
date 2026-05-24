# Desafio Técnico - Desenvolvimento Orientado a Testes (TDD)

## Sobre o Projeto

Este projeto consiste na implementação de testes automatizados utilizando a abordagem **TDD (Test-Driven Development)** em um sistema de reservas de propriedades.

O objetivo principal é validar o comportamento da aplicação através de:

- Testes unitários de mappers
- Testes end-to-end (E2E) de criação de usuários e propriedades
- Testes de regras de reembolso
- Testes de cancelamento de reservas

O projeto base utilizado foi o repositório:

- [https://github.com/devfullcycle/fc4-tdd](https://github.com/devfullcycle/fc4-tdd)

---

# Tecnologias Utilizadas

- Node.js
- TypeScript
- Jest
- Express
- SQLite
- TDD (Test-Driven Development)

---

# Estrutura dos Testes Implementados

## 1. Testes Unitários dos Mappers

### Arquivos

```bash
src/infrastructure/persistence/mappers/property_mapper.test.ts
src/infrastructure/persistence/mappers/booking_mapper.test.ts
```

### Objetivo

Validar:

- Conversão de entidades de persistência para domínio
- Conversão de entidades de domínio para persistência
- Validação de campos obrigatórios
- Tratamento de erros

### Cenários Implementados

#### Property Mapper

- Conversão correta de `PropertyEntity` para `Property`
- Conversão correta de `Property` para `PropertyEntity`
- Exceção ao faltar campos obrigatórios

#### Booking Mapper

- Conversão correta de `BookingEntity` para `Booking`
- Conversão correta de `Booking` para `BookingEntity`
- Exceção ao faltar campos obrigatórios

---

## 2. Testes E2E - Criação de Usuário

### Arquivo

```bash
src/infrastructure/web/user_controller_e2e.test.ts
```

### Endpoint Testado

```http
POST /users
```

### Funcionalidade Implementada

Método:

```bash
src/application/services/user_service.ts
```

### Cenários Implementados

#### Sucesso

- Criação de usuário com dados válidos

#### Erro de validação

- Nome vazio retorna:

```json
{
  "message": "O campo nome é obrigatório."
}
```

Com status HTTP:

```http
400 Bad Request
```

---

## 3. Testes E2E - Criação de Propriedade

### Arquivo

```bash
src/infrastructure/web/property_controller_e2e.test.ts
```

### Endpoint Testado

```http
POST /properties
```

### Funcionalidades Implementadas

Método:

```bash
src/application/services/property_service.ts
```

Validação implementada em:

```bash
src/domain/entities/property.ts
```

### Regras de Negócio

- O nome da propriedade é obrigatório
- A capacidade máxima deve ser maior que zero
- O preço base por noite deve ser maior que zero

### Cenários Implementados

#### Sucesso

- Criação de propriedade com dados válidos

#### Erros de validação

##### Nome vazio

```json
{
  "message": "O nome da propriedade é obrigatório."
}
```

##### maxGuests inválido

```json
{
  "message": "A capacidade máxima deve ser maior que zero."
}
```

##### basePricePerNight ausente

```json
{
  "message": "O preço base por noite é obrigatório."
}
```

Todos os cenários acima retornam:

```http
400 Bad Request
```

---

## 4. Testes de Políticas de Reembolso

### Arquivo

```bash
src/domain/cancelation/refund_rule_factory.test.ts
```

### Objetivo

Validar o comportamento da fábrica `RefundRuleFactory` de acordo com a antecedência do cancelamento da reserva.

### Cenários Implementados

#### FullRefund

Cancelamento realizado com mais de 7 dias de antecedência.

#### PartialRefund

Cancelamento realizado entre 1 e 7 dias antes do check-in.

#### NoRefund

Cancelamento realizado com menos de 1 dia de antecedência.

---

## 5. Testes de Cancelamento de Reserva

### Arquivo

```bash
src/application/services/booking_service.test.ts
```

### Cenário Adicionado

- Tentativa de cancelamento de uma reserva inexistente

### Resultado Esperado

```json
{
  "message": "Reserva não encontrada."
}
```

---

# Como Executar o Projeto

## Pré-requisitos

Antes de iniciar, você precisa ter instalado:

- Node.js 18+
- npm ou yarn

---

# Instalação

Clone o repositório:

```bash
git clone https://github.com/AnteroJunior/fc4-tdd-challenge
```

Acesse a pasta do projeto:

```bash
cd fc4-tdd-challenge
```

Instale as dependências:

```bash
npm install
```

---

# Executando os Testes

## Rodar todos os testes

```bash
npm test
```

## Rodar testes em modo watch

```bash
npm run test:watch
```

## Rodar testes com coverage

```bash
npm run test:coverage
```

---

# Estrutura do Projeto

```bash
src/
 ├── application/
 │   └── services/
 ├── domain/
 │   ├── cancelation/
 │   └── entities/
 ├── infrastructure/
 │   ├── persistence/
 │   │   └── mappers/
 │   └── web/
```

---

# Conceitos Aplicados

## TDD - Test Driven Development

Durante o desenvolvimento foi utilizada a abordagem:

1. Criar o teste
2. Executar o teste e validar a falha
3. Implementar a funcionalidade
4. Refatorar mantendo os testes verdes

---

# Cobertura dos Testes

Os testes cobrem:

- Regras de negócio
- Validações
- Fluxos de erro
- Conversão entre entidades
- Integração entre camadas
- Endpoints REST

---

# Melhorias Implementadas

Além dos testes solicitados, também foram adicionadas melhorias relacionadas a:

- Tratamento de erros
- Validações de domínio
- Garantia de integridade dos dados
- Segurança das regras de negócio

---

Desenvolvido como solução para o desafio técnico de TDD da Full Cycle.
