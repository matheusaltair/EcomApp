# Testes Unitários - EcomApp

Este diretório contém os testes unitários para as principais funcionalidades do aplicativo de e-commerce.

## Estrutura dos Testes

### 📁 `/store`
Testes para os stores Zustand que gerenciam o estado da aplicação:

- **`authStore.test.ts`** - Testes para funcionalidade de login
- **`cartStore.test.ts`** - Testes para adicionar itens ao carrinho
- **`logout.test.ts`** - Testes para funcionalidade de logout

### 📁 `/screens`
Testes para os componentes de tela:

- **`CartScreen.test.tsx`** - Testes para finalizar compra e interações do carrinho

## Funcionalidades Testadas

### 🔐 Login
- ✅ Login com credenciais válidas
- ✅ Falha no login com credenciais inválidas
- ✅ Estado de loading durante o processo
- ✅ Limpeza de erros

### 🛒 Carrinho
- ✅ Adicionar produtos ao carrinho
- ✅ Incrementar quantidade de produtos existentes
- ✅ Adicionar múltiplos produtos diferentes
- ✅ Cálculo correto do total de itens
- ✅ Cálculo correto do preço total

### 💳 Finalizar Compra
- ✅ Processo completo de checkout
- ✅ Exibição de notificação de sucesso
- ✅ Limpeza do carrinho após compra
- ✅ Navegação de volta à tela inicial
- ✅ Gerenciamento de quantidade de itens

### 🚪 Logout
- ✅ Logout com sucesso
- ✅ Limpeza do estado do usuário
- ✅ Persistência do estado após logout
- ✅ Funciona mesmo quando não logado

## Como Executar os Testes

### Executar todos os testes:
```bash
npm test
```

### Executar testes específicos:
```bash
# Apenas testes de login
npm test authStore.test.ts

# Apenas testes do carrinho
npm test cartStore.test.ts

# Apenas testes de checkout
npm test CartScreen.test.tsx

# Apenas testes de logout
npm test logout.test.ts
```

### Executar com coverage:
```bash
npm test -- --coverage
```

### Executar em modo watch:
```bash
npm test -- --watch
```

## Mocks Utilizados

- **AsyncStorage** - Para persistência de dados
- **React Navigation** - Para navegação entre telas
- **Notifee** - Para notificações push
- **Alert** - Para alertas do React Native
- **AuthPersist** - Para persistência da autenticação

## Casos de Teste Cobertos

### Login (4 testes)
1. Login bem-sucedido com credenciais válidas
2. Falha no login com credenciais inválidas
3. Estado de loading durante o processo
4. Limpeza de erros

### Carrinho (7 testes)
1. Adicionar novo produto
2. Adicionar múltiplas quantidades
3. Incrementar produto existente
4. Adicionar produtos diferentes
5. Quantidade padrão
6. Cálculo de total de itens
7. Cálculo de preço total

### Checkout (6 testes)
1. Renderização do carrinho com itens
2. Finalização da compra com sucesso
3. Exibição de carrinho vazio
4. Cálculo correto do total
5. Atualização de quantidade
6. Alerta para remoção de item

### Logout (5 testes)
1. Logout bem-sucedido
2. Chamada da função de persistência
3. Limpeza do estado
4. Logout quando não logado
5. Comportamento com erros existentes

## Cobertura Esperada

Os testes cobrem as principais funcionalidades do aplicativo:
- ✅ Autenticação (login/logout)
- ✅ Gerenciamento de carrinho
- ✅ Processo de checkout
- ✅ Estados de loading e erro
- ✅ Persistência de dados
- ✅ Navegação entre telas