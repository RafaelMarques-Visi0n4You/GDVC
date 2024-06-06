import ResponsavelDepartamento from '../models/responsavelDepartamento.js';
import Funcionario from '../models/funcionarios.js';
import Departamento from '../models/departamentos.js';
import ContaUtilizador from '../models/contaUtilizadores.js';
import bcrypt from 'bcrypt';


const getResponsavelDepartamentos = async (req, res) => {
    try {
        const responsavelDepartamentos = await ResponsavelDepartamento.findAll({
            order: [
                ['departamento_id', 'ASC']
            ],
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
        const contaUtilizadorExistente = await ContaUtilizador.findOne({
            where: {
                funcionario_id: req.body.funcionario_id
            }
        });
        

        if (responsaveldepartamento.length == 0) {
        console.log("ResponsavelDepartamento não encontrado");
       

        
       
      
        if (contaUtilizadorExistente && contaUtilizadorExistente.tipo_utilizador === "nivel3" ) {
           
           
            const responsavelDepartamento = await ResponsavelDepartamento.create({
                departamento_id: req.body.departamento_id,
                funcionario_id: req.body.funcionario_id
            });
            
            console.log("ResponsavelDepartamento criado com sucesso");

            return res.json({ Status: "Success", responsavelDepartamento: responsavelDepartamento });
        } else {
            console.log("ContaUtilizador não existe ou não é do tipo 'nivel3'");
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
                    tipo_utilizador: "nivel3",
                    email: email.email,
                    password: hashedPassword,
                });
            } if(contaUtilizadorExistente && contaUtilizadorExistente.tipo_utilizador !== "nivel3" || contaUtilizadorExistente.tipo_utilizador !== "nivel4"  ) {
                // Atualizar o tipo_utilizador para "nivel3" se a conta existir mas não for "nivel3"

                console.log("ContaUtilizador existe mas não é do tipo 'nivel3'");
                contaUtilizador = await ContaUtilizador.update(
                    { 
                        tipo_utilizador: "nivel3" 
                    },
                    { where: { funcionario_id: req.body.funcionario_id } }
                );
            }
            
            // Criar o ResponsavelDepartamento
            const responsavelDepartamento = await ResponsavelDepartamento.create({
                departamento_id: req.body.departamento_id,
                funcionario_id: req.body.funcionario_id
            });
        
            return res.json({ Status: "Success", responsavelDepartamento: responsavelDepartamento });
        }
    }
    return res.json({ Status: "Existe", responsaveldepartamento: responsaveldepartamento });
    } catch (error) {
        return res.json({ Error: error.message });
    }
}

const verficarresponsavel = async (req, res) => {
    try {
        if(req.body.funcionario_id){
           
            const contaUtilizadorExistente = await ContaUtilizador.findOne({
                where: {
                    funcionario_id: req.body.funcionario_id
                }
            });
            if(!contaUtilizadorExistente){
                const departamento = await Departamento.create({
                    empresa_id: req.body.empresa_id,
                    nome: req.body.nome
                });
                return res.json({ Error: "Conta de utilizador não existe", departamento: departamento});
            }
            if(contaUtilizadorExistente && contaUtilizadorExistente.tipo_utilizador !== "nivel3" || contaUtilizadorExistente.tipo_utilizador !== "nivel4"  ){
                
                const contaUtilizador = await ContaUtilizador.update(
                    { 
                        tipo_utilizador: "nivel3" 
                    },
                    { where: { funcionario_id: req.body.funcionario_id } }
                );

                if(contaUtilizador){

                    const departamento = await Departamento.create({
                        empresa_id: req.body.empresa_id,
                        nome: req.body.nome});

                    const responsavelDepartamento = await ResponsavelDepartamento.create({
                        departamento_id: departamento.departamento_id,
                        funcionario_id: req.body.funcionario_id
                    });

                    if(responsavelDepartamento)
                        return res.json({ Status: "Success", responsavelDepartamento: responsavelDepartamento });
                }
            } if(contaUtilizadorExistente && contaUtilizadorExistente.tipo_utilizador === "nivel3"){

                const departamento = await Departamento.create({
                    empresa_id: req.body.empresa_id,
                    nome: req.body.nome
                });

                const responsavelDepartamento = await ResponsavelDepartamento.create({
                    departamento_id: departamento.departamento_id,
                    funcionario_id: req.body.funcionario_id
                });
                return res.json({ Status: "Success", responsavelDepartamento: responsavelDepartamento });
            }
        }
            else {
                if(req.body.funcionario_id === null){
                   
                const departamento = await Departamento.create({
                    empresa_id: req.body.empresa_id,
                    nome: req.body.nome
                });
                return res.json({ Status: "Success", departamento: departamento });
            }
        }
        } catch (error) {
            return res.json({ Error: error.message });
        }
    }

    const criarcontautilizador = async (req, res) => {
        try {
    
            const  {password } = req.body;
    
            const hashedPassword = await bcrypt.hash(password.toString(), 10);
            console.log("rotaaqui");
                const contaUtilizador = await ContaUtilizador.create({
                    funcionario_id: req.body.funcionario_id,
                    tipo_utilizador: "nivel3",
                    email: req.body.email,
                    password: hashedPassword
                });    
    
                if(contaUtilizador)
                    {
                        const responsavelDepartamento = await ResponsavelDepartamento.create({
                            departamento_id: req.body.departamento_id,
                            funcionario_id: req.body.funcionario_id
                        });
                        if(responsavelDepartamento)
                            return res.json({ Status: "Success", responsavelDepartamento: responsavelDepartamento });
                    }
    
                return res.json({ Status: "Success", contaUtilizador: contaUtilizador });
            } catch (error) {
                return res.json({ Error: error.message });
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
            
            if (!contaUtilizadorExistente) {
                contaUtilizador = await ContaUtilizador.create({
                    funcionario_id: req.body.funcionario_id,
                    tipo_utilizador: "nivel3",
                    email: req.body.email,
                    password: req.body.password
                });
            } if(contaUtilizadorExistente && contaUtilizadorExistente.tipo_utilizador !== "nivel3" || contaUtilizadorExistente.tipo_utilizador !== "nivel4"  ) {
               

                
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
    try{

        const contaUtilizadorExistente = await ContaUtilizador.findOne({
            where: {
                funcionario_id: req.body.funcionario_id,
            }
        });
        
        
        if (contaUtilizadorExistente && contaUtilizadorExistente.tipo_utilizador === "nivel3" ) {
          
           console.log("ContaUtilizador já existe e é do tipo 'nivel3aaaa");
           const responsavelDepartamento = await ResponsavelDepartamento.findOne({
            where: {
                departamento_id: req.body.departamento_id || req.body.id
            }
        });
        
            if (!responsavelDepartamento) {
                return res.json({ Error: "ResponsavelDepartamento não encontrado" });
            }
           
            await ResponsavelDepartamento.update(req.body, {
                where: {
                    departamento_id: req.body.departamento_id || req.body.id,
                    
                }
            });
            return res.json({ Status: "Success", responsavelDepartamento: responsavelDepartamento });

        } else {
            console.log("ContaUtilizador não existe ou não é do tipo 'nivel3'");

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
                    tipo_utilizador: "nivel3",
                    email: email.email,
                    password: hashedPassword,
                });
            } if(contaUtilizadorExistente && contaUtilizadorExistente.tipo_utilizador !== "nivel3" || contaUtilizadorExistente.tipo_utilizador !== "nivel4"  ) {
               

                
                contaUtilizador = await ContaUtilizador.update(
                    { 
                        tipo_utilizador: "nivel3" 
                    },
                    { where: { funcionario_id: req.body.funcionario_id } }
                );
            }
            
            
            const responsavelDepartamento = await ResponsavelDepartamento.findOne({
                where: {
                    departamento_id: req.body.departamento_id || req.body.id
                }
            });
            if (!responsavelDepartamento) {
                return res.json({ Error: "ResponsavelDepartamento não encontrado" });
            }
            await ResponsavelDepartamento.update(req.body, {
                where: {
                    departamento_id: req.body.departamento_id || req.body.id,
                    
                }
            });
            return res.json({ Status: "Success", responsavelDepartamento: responsavelDepartamento });
        }
        
    } catch (error) {
        return res.json({ Error: error.message });
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



const getresponsaveldetails = async (req, res) => {
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
    
    getresponsaveldetails,
    verficarresponsavel,
    criarcontautilizador
}

