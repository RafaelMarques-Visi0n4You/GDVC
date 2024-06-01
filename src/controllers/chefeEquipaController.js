import ChefeEquipa from "../models/chefeEquipa.js";
import Funcionario from "../models/funcionarios.js";
import ContaUtilizador from "../models/contaUtilizador.js";
import bcrypt from "bcrypt";

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

        console.log(chefesEquipa);

        const contaUtilizadorExistente = await ContaUtilizador.findOne({
            where: {
                funcionario_id: req.body.funcionario_id
            }
        });

        if (chefesEquipa.length == 0) {

           
            if(contaUtilizadorExistente && contaUtilizadorExistente.tipo_utilizador === "nivel2"){

                const create = await ChefeEquipa.create(req.body);
                if (!create)
                    return res.json({ Error: "Erro ao criar chefe de equipa" });

            
                return res.json({ Status: "Success", create: create });

            }else{
                
                let contaUtilizador;
                const email = await Funcionario.findOne({
                    where: {
                        funcionario_id: req.body.funcionario_id
                    }
                });
                const password = "1234567";
                const hashedPassword = await bcrypt.hash(password.toString(), 10);
                if (!contaUtilizadorExistente) {
                    contaUtilizador = await ContaUtilizador.create({
                        funcionario_id: req.body.funcionario_id,
                        tipo_utilizador: "nivel2",
                        email: email.email,
                        password: hashedPassword,
                    });
                } if(contaUtilizadorExistente && contaUtilizadorExistente.tipo_utilizador !== "nivel2") {
                    // Atualizar o tipo_utilizador para "nivel3" se a conta existir mas não for "nivel3"
    
                    
                    contaUtilizador = await ContaUtilizador.update(
                        { 
                            tipo_utilizador: "nivel2" 
                        },
                        { where: { funcionario_id: req.body.funcionario_id } }
                    );
                }
                
                
                const chefeequipa = await ChefeEquipa.create({
                    equipa_id: req.body.equipa_id,
                    funcionario_id: req.body.funcionario_id
                });
            
                return res.json({ Status: "Success", chefeequipa: chefeequipa });
            }
        }
        return res.json({ Status: "Existe", chefesEquipa: chefesEquipa });
        } catch (error) {
            return res.json({ Error: error.message });
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
    try{

        const contaUtilizadorExistente = await ContaUtilizador.findOne({
            where: {
                funcionario_id: req.body.funcionario_id,
            }
        });
        
        
        if (contaUtilizadorExistente && contaUtilizadorExistente.tipo_utilizador === "nivel2" ) {
          
          
           const chefeequipa = await ChefeEquipa.findAll({
            where: {
                equipa_id: req.body.equipa_id || req.body.id
            }
        });
        
           
           
            await ChefeEquipa.update(req.body, {
                where: {
                    equipa_id: req.body.equipa_id || req.body.id,
                    
                }
            });
            return res.json({ Status: "Success", chefeequipa: chefeequipa });

        } else {
            console.log("ContaUtilizador não existe ou não é do tipo 'nivel2'");

           const  email = await Funcionario.findOne({
                where: {
                    funcionario_id: req.body.funcionario_id
                }
            });
            
            let contaUtilizador;
            const password = "1234567";
            const hashedPassword = await bcrypt.hash(password.toString(), 10);
            
            if (!contaUtilizadorExistente) {
                contaUtilizador = await ContaUtilizador.create({
                    funcionario_id: req.body.funcionario_id,
                    tipo_utilizador: "nivel2",
                    email: email.email,
                    password: hashedPassword,
                });
            } if(contaUtilizadorExistente && contaUtilizadorExistente.tipo_utilizador !== "nivel2") {
               

                
                contaUtilizador = await ContaUtilizador.update(
                    { 
                        tipo_utilizador: "nivel2" 
                    },
                    { where: { funcionario_id: req.body.funcionario_id } }
                );
            }
            
            
            const Chefeequipa = await ChefeEquipa.findAll({
                where: {
                    equipa_id: req.body.equipa_id || req.body.id,
                }
            });
            if (!Chefeequipa) {
                return res.json({ Error: "ResponsavelDepartamento não encontrado" });
            }
            await ChefeEquipa.update(req.body, {
                where: {
                    equipa_id: req.body.equipa_id || req.body.id,
                    
                }
            });
            return res.json({ Status: "Success", Chefeequipa: Chefeequipa });
        }
        
    } catch (error) {
        return res.json({ Error: error.message });
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