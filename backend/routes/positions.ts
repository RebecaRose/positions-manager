const router = require('express-promise-router')();
const db = require("../database.ts");

router.get("/positions", async (req, res) => {
    const positions = await db("position");
    res.json({ success: true, positions });
});

router.post("/positions", async (req, res) => {
    const { position } = req.body;
    try{
        const result = await PositionsService.insertPosition(db, position);
        return res.status(200).json({ success: true, message: 'Cargo criado com sucesso!'});
    } catch (err){
        return res.status(500).json({ success: false, error: err.sqlMessage});
    }
});

router.put("/positions", async (req, res) => {
    const { position } = req.body;
    try{
        const result = await PositionsService.updatePosition(db, position.id, position);
        return res.status(200).json({ success: true, message: 'Cargo atualizado com sucesso!'});
    } catch (err){
        return res.status(500).json({ success: false, error: err.sqlMessage});
    }
});

router.delete("/positions/:id", async (req, res) => {
    const id = req.params.id;
    try{
        const result = await PositionsService.deletePosition(db, id);
        return res.status(200).json({ success: true, message: 'Cargo excluído com sucesso!'});
    } catch (err){
        return res.status(500).json({ success: false, error: err.sqlMessage});
    }

});

const PositionsService = {
    insertPosition(db, newPosition) {
        return db
        .insert(newPosition)
        .into("position")
        .then(rows => {
            return rows;
        });
    },
    deletePosition(db, id) {
      return db("position")
        .where({ id })
        .delete();
    },
    updatePosition(db, id, positionFields) {
        return db("position")
            .where({ id })
            .update(positionFields);
    }
};

module.exports = router;