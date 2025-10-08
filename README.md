
# EcomApp

EcomApp é um aplicativo de e-commerce desenvolvido com React Native, projetado para oferecer uma experiência de compra simples e intuitiva para usuários mobile. O projeto possui integração com autenticação, gerenciamento de carrinho, navegação entre telas e componentes reutilizáveis.

## Funcionalidades

- Autenticação de usuários
- Listagem de produtos
- Adição e remoção de itens no carrinho
- Visualização do perfil do usuário
- Layout responsivo e componentes customizados

## Estrutura do Projeto

```text
EcomApp/
├── android/           # Projeto Android nativo
├── ios/               # Projeto iOS nativo
├── src/
│   ├── assets/        # Arquivos do projeto
│   ├── components/    # Componentes reutilizáveis
│   ├── navigation/    # Navegação entre telas
│   ├── screens/       # Telas do app
│   └── store/         # Gerenciamento de estado
├── App.tsx            # Entrada principal do app
├── package.json       # Dependências e scripts
└── README.md          # Documentação
```

## Instalação

1. Clone o repositório:

```bash
git clone https://github.com/matheusaltair/EcomApp.git
```

2. Instale as dependências:

```bash
npm install
# ou
yarn install
```

3. Execute o projeto:

- Android:

```bash
npx react-native run-android
```

- iOS:

```bash
npx pod-install
npx react-native run-ios
```

## Testes

O projeto possui uma suíte completa de testes com **28 testes** distribuídos em **6 suítes** principais, garantindo a qualidade e confiabilidade do código.

### 📊 Resumo dos Testes

- **Total:** 28 testes ✅
- **Suítes:** 6 grupos de testes
- **Cobertura:** Autenticação, Carrinho, Navegação e UI

### 🧪 Detalhamento dos Testes

#### 1. **🏠 App Principal** (`__tests__/App.test.tsx`)

- **1 teste:** Renderização correta do componente principal
  - Verifica se o App renderiza sem erros
  - Testa o processo de restore de autenticação

#### 2. **🔐 Autenticação - AuthStore** (`src/__tests__/store/authStore.test.ts`)

- **4 testes de login e estado:**
  - ✅ Login com credenciais válidas
  - ❌ Login com credenciais inválidas  
  - 🏗️ Inicialização com estado correto
  - 🧹 Limpeza de erros com `clearError()`

#### 3. **🛒 Carrinho - CartStore** (`src/__tests__/store/cartStore.test.ts`)

- **7 testes de funcionalidades do carrinho:**
  - ➕ Adicionar novo produto ao carrinho
  - 🔢 Adicionar múltiplas quantidades
  - ⬆️ Incrementar quantidade de produto existente
  - 📦 Adicionar produtos diferentes como itens separados
  - 1️⃣ Usar quantidade padrão (1) quando não especificada
  - 🧮 Calcular total de itens corretamente
  - 💰 Calcular preço total corretamente

#### 4. **🚪 Logout - AuthStore** (`src/__tests__/store/logout.test.ts`)

- **5 testes de logout:**
  - ✅ Fazer logout com sucesso
  - 💾 Chamar `persistAuth` após logout
  - 🧹 Manter estado limpo após logout
  - 🔓 Permitir logout mesmo quando não logado
  - ⚠️ Funcionar independentemente de erros existentes

#### 5. **🛍️ Tela do Carrinho** (`src/__tests__/screens/CartScreen.test.tsx`)

- **5 testes de checkout e funcionalidades:**
  - ✅ Adicionar itens e calcular total para checkout
  - 🗑️ Remover todos os itens após finalizar compra
  - ✏️ Atualizar quantidade de itens
  - ❌ Remover item específico do carrinho
  - 🎉 Simular processo completo de checkout (com notificações)

#### 6. **⚙️ Setup de Testes** (`src/__tests__/setup.ts`)

- **1 teste de configuração:**
  - ✅ Verificar se o setup está configurado corretamente

### 🎯 Funcionalidades Testadas

- **Autenticação:** Login, logout, persistência de dados
- **Carrinho:** Adicionar, remover, atualizar, calcular totais
- **Checkout:** Processo completo com notificações push
- **Estado da aplicação:** Inicialização e renderização
- **Persistência:** AsyncStorage e dados do usuário

### 🛠️ Tecnologias de Teste

- **Jest:** Framework de testes
- **React Test Renderer:** Testes de componentes React Native
- **Testing Library:** Utilitários de teste
- **Mocks:** React Native, AsyncStorage, Navigation, Notifee

### 🚀 Executar os Testes

```bash
# Executar todos os testes
npm test

# Executar testes em modo watch
npm test -- --watch

# Executar com cobertura
npm test -- --coverage
```

## Contribuição

1. Fork este repositório
2. Crie uma branch (`git checkout -b feature/nome-da-feature`)
3. Commit suas alterações (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nome-da-feature`)
5. Abra um Pull Request

---

Desenvolvido por [Matheus Altair](https://github.com/matheusaltair)
