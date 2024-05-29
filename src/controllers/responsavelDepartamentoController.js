import ResponsavelDepartamento from '../models/responsavelDepartamento.js';
import Funcionario from '../models/funcionarios.js';
import Departamento from '../models/departamentos.js';
import ContaUtilizador from '../models/contaUtilizadores.js';


const getResponsavelDepartamentos = async (req, res) => {
    try {
        const responsavelDepartamentos = await ResponsavelDepartamento.findAll({
            include: [
                {
                    model: Funcionario,
                    attributes: ['nome_completo'],
                },
                {
                    model: Departamento,
                    attributes: ['empresa_id'],


                }
            ],
        });
        return res.json({ Status: "Success", responsavelDepartamentos: responsavelDepartamentos });
    } catch (error) {
        return res.json({ Error: error });
    }
}

const getResponsavelDepartamentoById = async (req, res) => {
    try {
        const responsavelDepartamento = await ResponsavelDepartamento.findOne({
            where: {
                departamento_id: req.params.id1,
                funcionario_id: req.params.id2
            }
        });
        if (!responsavelDepartamento) {
            return res.json({ Error: "ResponsavelDepartamento não encontrado" });
        }
        return res.json({ Status: "Success", responsavelDepartamento: responsavelDepartamento });
    } catch (error) {
        return res.json({ Error: error });
    }
}

const getresponvalpordepartamento = async (req, res) => {
    try {
        const responsaveldepartamento = await ResponsavelDepartamento.findAll({
            where: {
                departamento_id: req.body.departamento_id || req.body.id
            }
        });

        if (responsaveldepartamento.length == 0) {
            console.log("entrou")
            const create = await ResponsavelDepartamento.create({
                departamento_id: req.body.departamento_id,
                funcionario_id: req.body.funcionario_id
            });
            if (!create)
                return res.json({ Error: "Erro ao criar responsavel departamento" });
            return res.json({ Status: "Success", create: create });
        }
        return res.json({ Status: "Existe", responsaveldepartamento: responsaveldepartamento });
    } catch (error) {
        return res.json({ Error: error });
    }
}





const createResponsavelDepartamento = async (req, res) => {
    try {
        

        
        const departamento = await Departamento.create({
            empresa_id: req.body.empresa_id,
            nome: req.body.nome
        });

        
        
        const contaUtilizadorExistente = await ContaUtilizador.findOne({
            where: {
                funcionario_id: req.body.funcionario_id
            }
        });
        
        if (contaUtilizadorExistente && contaUtilizadorExistente.tipo_utilizador === "nivel3" ) {
          
           
            const responsavelDepartamento = await ResponsavelDepartamento.create({
                departamento_id: departamento.departamento_id,
                funcionario_id: req.body.funcionario_id
            });
            
           

            return res.json({ Status: "Success", responsavelDepartamento: responsavelDepartamento });
        } else {
            
            let contaUtilizador;
            const email = await Funcionario.findOne({
                where: {
                    funcionario_id: req.body.funcionario_id
                }
            });
            if (!contaUtilizadorExistente) {
                contaUtilizador = await ContaUtilizador.create({
                    funcionario_id: req.body.funcionario_id,
                    tipo_utilizador: "nivel3",
                    email: email.email,
                    password: req.body.password
                });
            } if(contaUtilizadorExistente && contaUtilizadorExistente.tipo_utilizador !== "nivel3") {
               

                
                contaUtilizador = await ContaUtilizador.update(
                    { 
                        tipo_utilizador: "nivel3" 
                    },
                    { where: { funcionario_id: req.body.funcionario_id } }
                );
            }
            
            
            const responsavelDepartamento = await ResponsavelDepartamento.create({
                departamento_id: departamento.departamento_id,
                funcionario_id: req.body.funcionario_id
            });
        
            return res.json({ Status: "Success", responsavelDepartamento: responsavelDepartamento });
        }
        
    } catch (error) {
        return res.json({ Error: error.message });
    }
}

const updateResponsavelDepartamento = async (req, res) => {
    try {
        const responsavelDepartamento = await ResponsavelDepartamento.findAll({
            where: {
                departamento_id: req.body.departamento_id,
                funcionario_id: req.params.funcionario_id,
            }
        });
        if (!responsavelDepartamento) {
            return res.json({ Error: "ResponsavelDepartamento não encontrado" });
        }
        await ResponsavelDepartamento.update(req.body);
        return res.json({ Status: "Success", responsavelDepartamento: responsavelDepartamento });
    } catch (error) {
        return res.json({ Error: error });
    }
}

const deleteResponsavelDepartamento = async (req, res) => {
    try {
        const responsavelDepartamento = await ResponsavelDepartamento.findOne({
            where: {
                departamento_id: req.params.id1,
                funcionario_id: req.params.id2
            }
        });
        if (!responsavelDepartamento) {
            return res.json({ Error: "ResponsavelDepartamento não encontrado" });
        }
        await responsavelDepartamento.destroy();
        return res.json({ Status: "Success", responsavelDepartamento: responsavelDepartamento });
    } catch (error) {
        return res.json({ Error: error });
    }
}

const getResponsavel = async (req, res) => {
    try {
        const responsaveldepartamento = await ResponsavelDepartamento.findAll({
            include: [
                {
                    model: Funcionario,
                    attributes: ['nome_completo'],
                },
                {
                    model: Departamento,
                    attributes: ['empresa_id'],


                }
            ],
            where: {
                departamento_id: req.body.departamento_id || req.body.id
            }
        });
        if (!responsaveldepartamento) {
            return res.json({ Error: "ResponsavelDepartamento não encontrado" });
        }
        return res.json({ Status: "Success", responsaveldepartamento: responsaveldepartamento });
    } catch (error) {
        return res.json({ Error: error });
    }
}

export {
    getResponsavelDepartamentos,
    getResponsavelDepartamentoById,
    createResponsavelDepartamento,
    updateResponsavelDepartamento,
    deleteResponsavelDepartamento,
    getresponvalpordepartamento,
    getResponsavel
}

