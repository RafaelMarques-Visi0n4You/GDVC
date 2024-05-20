import ChefeEquipa from "../models/chefeEquipa.js";
import Funcionario from "../models/funcionarios.js";

const getChefesEquipa = async (req, res) => {
    try {
        const chefesEquipa = await ChefeEquipa.findAll({
            include: [
                {
                    model: Funcionario,
                    attributes: ['nome_completo'],
                },
            ]
        });
        return res.json({ Status: "Success", chefesEquipa: chefesEquipa });
    } catch (error) {
        return res.json({ Error: error });
    }
}



const getchefeporequipa = async (req, res) => {
    try {
        const chefesEquipa = await ChefeEquipa.findAll({
            where: {
                equipa_id: req.body.equipa_id
            },


        });
        if (chefesEquipa.length == 0) {

            const create = await ChefeEquipa.create(req.body);
            if (!create)
                return res.json({ Error: "Erro ao criar chefe de equipa" });
            return res.json({ Status: "Success", create: create });
        }
        return res.json({ Status: "Existe", chefesEquipa: chefesEquipa });
    } catch (error) {
        return res.json({ Error: error });
    }
}

const getChefeEquipaById = async (req, res) => {
    try {
        const chefeEquipa = await ChefeEquipa.findOne({
            where: {
                funcionario_id: req.params.id1,
                equipa_id: req.params.id2
            }
        });
        if (!chefeEquipa) {
            return res.json({ Error: "ChefeEquipa não encontrado" });
        }
        return res.json({ Status: "Success", chefeEquipa: chefeEquipa });
    } catch (error) {
        return res.json({ Error: error });
    }
}

const createChefeEquipa = async (req, res) => {
    try {
        const chefeEquipa = await ChefeEquipa.create(req.body);
        return res.json({ Status: "Success", chefeEquipa: chefeEquipa });
    } catch (error) {
        return res.json({ Error: error });
    }
}

const updateChefeEquipa = async (req, res) => {
    try {
        const chefeEquipa = await ChefeEquipa.findOne({
            where: {

                equipa_id: req.body.equipa_id
            }
        });
        if (!chefeEquipa) {
            return res.json({ Error: "ChefeEquipa não encontrado" });
        }
        console.log(req.body);
        const novochefe = await ChefeEquipa.update({
            funcionario_id: req.body.funcionario_id,
            equipa_id: req.body.equipa_id
        }, {
            where: {
                equipa_id: req.body.equipa_id
            }

        });
        if (!novochefe) {
            return res.json({ Error: "Erro ao atualizar chefe de equipa" });
        }
        return res.json({ Status: "Success", chefeEquipa: novochefe });
    } catch (error) {
        console.log(error);
        return res.json({ Error: error });
    }
}

const deleteChefeEquipa = async (req, res) => {
    try {
        const chefeEquipa = await ChefeEquipa.findOne({
            where: {
                funcionario_id: req.params.id1,
                equipa_id: req.params.id2
            }
        });
        if (!chefeEquipa) {
            return res.json({ Error: "ChefeEquipa não encontrado" });
        }
        await chefeEquipa.destroy();
        return res.json({ Status: "Success", chefeEquipa: chefeEquipa });
    } catch (error) {
        return res.json({ Error: error });
    }
}

export {
    getChefesEquipa,
    getChefeEquipaById,
    createChefeEquipa,
    updateChefeEquipa,
    deleteChefeEquipa,
    getchefeporequipa
}