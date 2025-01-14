
# 🛍️ Aplicação de Gestão de Pagamentos e Saldos

Bem-vindo o **Sistema de Gerenciamento On-Line de Pagamentos**. Esta aplicação foi desenvolvida com **Ruby on Rails** no back-end e **React** no front-end, integrados em um única aplicação Rails,
oferecendo uma interface elegante e funcionalidades avançadas.

---

## 🚀 Funcionalidades

- **Cadastro de Logistas e Vendedores:** Crie, edite e gerencie Lojistas e Vendedores facilmente.
- **Gestão de Comissões:** Associe comissões personalizadas para cada vendedor.
- **Transações Financeiras:** Registre pagamentos, visualize saldos e históricos de transações.
- **Integração com Gateways de Pagamento:** Suporte ao Mercado Pago e PagSeguro.
- **Busca Avançada:** Utilize a pesquisa eficiente com `pg_search`.
- **Autenticação e Autorização:** Gerencie acessos com Devise, Devise Token Auth e Pundit.

---

## 🛠️ Tecnologias Utilizadas

### Backend
- [Ruby on Rails](https://rubyonrails.org/) 🌟
- [Devise](https://github.com/heartcombo/devise) para autenticação.
- [Devise Token Auth](https://github.com/lynndylanhurley/devise_token_auth) para autenticação baseada em tokens.
- [Pundit](https://github.com/varvet/pundit) para controle de autorização.
- [PgSearch](https://github.com/Casecommons/pg_search) para buscas avançadas.
- Banco de Dados: [PostgreSQL](https://www.postgresql.org/)

### Frontend
- [React](https://react.dev/) ⚛️
- [Redux](https://redux.js.org/) para gerenciamento de estado global.
- [Tailwind CSS](https://tailwindcss.com/) para estilização.
- [Flowbite React](https://flowbite-react.com/) para componentes UI.

---

## 🖥️ Instalação e Configuração

### Pré-requisitos
Certifique-se de ter as seguintes ferramentas instaladas:
- [Docker](https://www.docker.com/) 🐳
- [Node.js](https://nodejs.org/) (versão 16 ou superior)
- [Ruby](https://www.ruby-lang.org/) (versão 3.2+)

### Passos para Configuração

1. Clone este repositório:
   ```bash
   git clone https://github.com/dicarvalhoti/sigep.git
   cd sigep
   ```

2. Configure o Docker:
   ```bash
   docker build -t sigep .
   ```

3. Instale as dependências do Rails:
   ```bash
   docker run --env-file .env sigep bundle install  
   ```

4. Configure o banco de dados:
   ```bash
   docker-compose run web rails db:setup
   ```
5. Inicie o servidor:
   ```bash
   docker-compose up
   ```

Acesse a aplicação em [http://localhost:3000](http://localhost:3000).

---

## 🛡️ Segurança
- Variáveis sensíveis como `DEVISE_JWT_SECRET_KEY`, `DB_PASSWORD`,  devem ser configuradas em arquivos `.env`. Veja um exemplo no arquivo `.env.example`.

---

## 🧑‍💻 Contribuindo

Contribuições são bem-vindas! Por favor, abra um [issue](https://github.com/seu-usuario/seu-repositorio/issues) para discutir qualquer ideia ou problema.

---

## 📄 Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

---

## 📝 Contato

- Desenvolvedor: [Jeová Guilherme de Carvalho Filho](https://github.com/dicarvalhoti)
- Email: dicarvalhoti@gmail.com
- 
