
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

Para rodar os testes:

```bash
npm test
```

## Contribuição

1. Fork este repositório
2. Crie uma branch (`git checkout -b feature/nome-da-feature`)
3. Commit suas alterações (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nome-da-feature`)
5. Abra um Pull Request

---

Desenvolvido por Matheus Altair (https://github.com/matheusaltair)
