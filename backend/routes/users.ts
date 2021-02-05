const router = require('express-promise-router')();
const db = require("../database.ts");

router.get("/users", async (req, res) => {
    const users = await db("user");
    res.json({ users });
});

router.post("/users", async (req, res) => {
  const { user } = req.body;
    try{
        const result = await UsersService.insertUser(db, user);
        return res.status(200).json({ success: true, message: 'Usuário criado com sucesso!'});
    } catch (err){
        return res.status(500).json({ success: false, error: err.sqlMessage});
    }
});

router.put("/users", async (req, res) => {
    const { user } = req.body;
    try{
        const result = await UsersService.updateUser(db, user.id, user);
        return res.status(200).json({ success: true, message: 'Usuário atualizado com sucesso!'});
    } catch (err){
        return res.status(500).json({ success: false, error: err.sqlMessage});
    }
});

router.delete("/users/:id", async (req, res) => {
  const id = req.params.id;
    try{
        const result = await UsersService.deleteUser(db, id);
        return res.status(200).json({ success: true, message: 'Usuário excluído com sucesso!'});
    } catch (err){
        return res.status(500).json({ success: false, error: err.sqlMessage});
    }

});

const UsersService = {
    insertUser(db, newUser) {
        return db
            .insert(newUser)
            .into("user")
            .then(rows => {
                return rows;
            });
    },
    deleteUser(db, id) {
        return db("user")
            .where({ id })
            .delete();
    },
    updateUser(db, id, userFields) {
        return db("user")
            .where({ id })
            .update(userFields);
    }
};

module.exports = router;