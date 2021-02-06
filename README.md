# Positions Manager

### Passos para acessar

1. Para rodar a api, digite o seguinte comando no terminal:
`yarn start` ou `npm run start`

1. Para rodar o frontend, digite o seguinte comando no terminal:
`yarn start` ou `npm run start`

Agora é só acessar o projeto na rota http://localhost:3000/

O CRUD dos usuários se encontra na rota http://localhost:3000/users
O CRUD dos usuários se encontra na rota http://localhost:3000/positions

#### Rotas da API

- **GET /users**: Essa rota deve retornar uma listagem com todos os usuários da aplicação.

`
{
    "success": true,
    "users": [
        {
            "id": 1,
            "first_name": "teste",
            "last_name": "testandp",
            "birth_date": null,
            "earnings": 1000,
            "position_id": 1
        }
]`

- **POST /users**: A rota deve receber: first_name, last_name, birth_date, earnings e position_id para criar um novo usuário.

- **PUT /users**: A rota deve receber: id, first_name, last_name, birth_date, earnings e position_id para atualizar os dados do usuário.


- **DELETE /users/:id**: A rota deve receber apenas o id do usuário passando o mesmo pela url, para excluír um usuário.

- **GET /positions**: Essa rota deve retornar uma listagem com todos os cargos da aplicação.

`
{
    "success": true,
    "users": [
        {
            "id": 1,
            "title": "teste",
			"description: "teste",
        }
]`

- **POST /positions**: A rota deve receber: title e description para criar um novo cargo.

- **PUT /positions**: A rota deve receber: title e description para atualizar os dados do cargo.

- **DELETE /positions/:id**: A rota deve receber apenas o id do cargo passando o mesmo pela url, para excluír um cargo.