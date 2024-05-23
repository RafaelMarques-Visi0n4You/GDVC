
import nodemailer from 'nodemailer';
import moment from 'moment';
import dotenv from 'dotenv';
dotenv.config();



async function sendEmail(dataArray) {
  const [
    userData,
    emailSupervisor,
    visitData,
    funcionarioData,
    contratoData,
    servicoData,
    clienteData,
    tarefasConcluidasData,
    tarefasNaoConcluidasData,
    anomaliasData,
    equipaData,
    nomeEquipa
  ] = dataArray;

  try {

    // console.log('userData', userData);
    var dataInicio = new Date(visitData.inicio_visita);
    var hora = dataInicio.getHours();
    var minuto = dataInicio.getMinutes();
    var horaInicioFormatada = hora + 'h' + (minuto < 10 ? '0' : '') + minuto;
    var dataFim = new Date(visitData.fim_visita);
    var hora = dataFim.getHours();
    var minuto = dataFim.getMinutes();
    var horaFimFormatada = hora + 'h' + (minuto < 10 ? '0' : '') + minuto;

    var dataVisita = new Date(visitData.data_visita);

    // Extraindo dia, mês e ano
    var dia = dataVisita.getDate();
    var mes = dataVisita.getMonth() + 1; // Os meses são indexados de 0 a 11, então somamos 1
    var ano = dataVisita.getFullYear();

    // Formatando a data no formato desejado (adicionando zeros à esquerda se necessário)
    var dataFormatada = (dia < 10 ? '0' : '') + dia + '/' + (mes < 10 ? '0' : '') + mes + '/' + ano;

    let htmlAnomalias = ''; // Definindo a variável antes do bloco if

    if (anomaliasData.length === 0) {
      //sem anomalias
      htmlAnomalias = `<div style="border-top: 1px solid #e2e3e4;"> 
                        <div style=" color:#b2b2b2 padding-top: 15px; width: 100%; font-size: 10px;  margin-bottom: 20px;">
                           Sem anomalias registadas
                        </div> 
                      </div>`;
    } else {
      //com anomalias

      htmlAnomalias = `<div style="border-top: 1px solid #e2e3e4;">
      <ul class="table-content">
        ${anomaliasData.map(anomalia => `
        <li class="list-item">
          ${anomalia.anomalia}<br />
            ${anomalia.fotografia === 'null' ? '' : `<strong>Foto:</strong>
          <a href="${anomalia.fotografia}" style="color: gray;">${anomalia.fotografia}</a>`}
        </li>
        `).join('')}
      </ul>
    </div>`;
    }

    let htmlTarefasConcluidas = ''; // Definindo a variável antes do bloco if


    if (tarefasConcluidasData.length === 0) {
      //sem tarefas concluidas
      htmlTarefasConcluidas = `<div style="border-top: 1px solid #e2e3e4; margin-bottom: 20px"> 
                        <div style=" color:#b2b2b2 padding-top: 15px; width: 100%; font-size: 10px;  margin-bottom: 20px;">
                           Sem tarefas concluidas
                        </div> 
                      </div>`;
    } else {
      //com tarefas concluidas

      htmlTarefasConcluidas = `<div style="border-top: 1px solid #e2e3e4; margin-bottom: 20px">
                    <ul class=" table-content">
                      ${tarefasConcluidasData.map(tarefa => `<li class="list-item">${tarefa.tarefas}</li>`).join('')}
                    </ul>
                    </div>`;
    }


    let htmlTarefasNaoConcluidas = ''; // Definindo a variável antes do bloco if

    if (tarefasNaoConcluidasData.length === 0) {
      //sem tarefas concluidas
      htmlTarefasNaoConcluidas = `<div style="border-top: 1px solid #e2e3e4; margin-bottom: 20px"> 
                        <div style=" color:#b2b2b2 padding-top: 15px; width: 100%; font-size: 10px;  margin-bottom: 20px;">
                           Todas as tarefas foram concluídas
                        </div> 
                      </div>`;
    } else {
      //com tarefas concluidas

      htmlTarefasNaoConcluidas = `<div style="border-top: 1px solid #e2e3e4; margin-bottom: 20px">
                    <ul class=" table-content">
                      ${tarefasNaoConcluidasData.map(tarefa => `<li class="list-item">${tarefa.tarefas}</li>`).join('')}
                    </ul>
                    </div>`;
    }



    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'fbwgaming@gmail.com',
        pass: process.env.MAIL_PASS,
      },
    });

    const mailOptions = {
      // from: userData.email, // O email do remetente deve ser o mesmo que o email do usuário autenticado no nodemailer
      to: emailSupervisor,
      subject: 'Relatório da Visita Efetuada',
      html: `
            <!DOCTYPE html>
              <html lang="en">
              <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="stylesheet" href="src/style.css" />
                <style>
                  body {
                    margin: 0;
                    padding: 0;
                    font-family: Arial, Helvetica, sans-serif;
                    background-color: #f1f1f1;
                    width: 100%;
                    font-size: 14px;
                    color: #313131;
                    min-width: 300px;
                    word-break: normal;
                  }
                  .container {
                    margin: 0 auto;
                    max-width: 600px;
                    padding-top: 50px;
                    padding-bottom: 50px;
                  }
                  .section-header {
                    font-weight: bold;
                    font-size: 32px;
                    line-height: 40px;
                    margin-bottom: 10px;
                  }
                  .section-content {
                    background-color: #ffffff;
                    padding: 30px;
                    line-height: 24px;
                  }
                  .table-content {
                    background-color: #ffffff;
                    line-height: 24px;
                  }
                  .section-content span {
                    font-size: 18px;
                    font-weight: bold;
                  }
                  .list-item {
                    text-align: left;
                    margin-bottom: 10px;
                  }
                </style>
              </head>
              <body>
                <div class="container">
                  <div>
                    <table style="width:100%">
                      <tr>
                        <td align="center">
                          <div class="section-header">Relatório da Visita</div>
                        </td>
                      </tr>
                    </table>
                  </div>
                  <div class="section-content">
                    <span>A visita foi efetuada com sucesso. Poderá consultar aqui todos os detalhes da mesma.</span>
                    <br /><br />
                    <div style="color:#b2b2b2;line-height:21px;padding:5px 0;">
                      <strong>NUMERO DA VISITA ${visitData.visita_id} </strong>
                    </div>
                    <table style="width: 100%; font-size: 16px; line-height: 24px; border-spacing: 0; margin-bottom: 20px; border-top: 1px solid #e2e3e4;">
                      <tr>
                        <td style="padding-top: 15px;"><strong>Data da Visita:</strong><br />${dataFormatada}</td>
                        <td style="padding-top: 15px;"><strong>Hora de Início:</strong><br />${horaInicioFormatada}</td>
                        <td style="padding-top: 15px;"><strong>Hora de Fim:</strong><br />${horaFimFormatada}</td>
                      </tr>
                    </table>
                    <div style="color:#b2b2b2;line-height:21px;padding:5px 0;">
                      <strong>CLIENTE:</strong>
                    </div>
                    <table style="width: 100%; font-size: 16px; line-height: 24px; border-spacing: 0; margin-bottom: 20px; border-top: 1px solid #e2e3e4;">
                        <tr>
                            <td style="padding-top: 15px;"><strong>Nome:</strong><br />${clienteData.nome_completo}</td>
                            <td style="padding-top: 15px;"><strong>Telefone:</strong><br />${clienteData.contacto}</td>
                        </tr>
                    </table>

                    <div style="color:#b2b2b2;line-height:21px;padding:5px 0;">
                      <strong>CONTRATO ${contratoData.nome}:</strong>
                    </div>
                    <table style="width: 100%; font-size: 16px; line-height: 24px; border-spacing: 0; margin-bottom: 20px; border-top: 1px solid #e2e3e4;">
                      <tr>
                        <td style="padding-top: 15px;"><strong>Serviço:</strong><br />${servicoData.nome}</td>
                      </tr>
                      <tr>
                        <td style="padding-top: 15px;"><strong>Descrição:</strong><br />${servicoData.descricao}</td>
                      </tr>
                    </table>
                    <div style="color:#b2b2b2;line-height:21px;padding:5px 0;">
                      <strong>TAREFAS REALIZADAS:</strong>
                    </div>
                    ${htmlTarefasConcluidas}
                    <div style="color:#b2b2b2;line-height:21px;padding:5px 0;">
                      <strong>TAREFAS NÃO REALIZADAS:</strong>
                    </div>
                    ${htmlTarefasNaoConcluidas}
                    <div style="color:#b2b2b2;line-height:21px;padding:5px 0;">
                    <strong>ANOMALIAS REGISTADAS:</strong>
                  </div>
                    ${htmlAnomalias}
                    </div>
                  </div>
                </div>
              </body>
              </html>
        `
    };

    await transporter.sendMail(mailOptions);
    console.log('Email com detalhes da visita enviado com sucesso');

  } catch (error) {
    console.log('Erro na funcao sendEmailWithoutNextVisit', error)
    console.error('Ocorreu um erro ao enviar o email:', error);
    throw new Error('Ocorreu um erro ao enviar o email.');
  }
};

async function sendEmailNextVisit(dataArray) {
  let [
    userData,
    emailSupervisor,
    visitData,
    funcionarioData,
    contratoData,
    servicoData,
    clienteData,
    tarefasConcluidasData,
    tarefasNaoConcluidasData,
    anomaliasData,
    equipaData,
    nomeEquipa,
    data,
    text
  ] = dataArray;

  try {

    console.log("Texto", text)
    if (!text)
      text = 'Sem motivo';
    console.log("Texto", text)
    var dataInicio = new Date(visitData.inicio_visita);
    var hora = dataInicio.getHours();
    var minuto = dataInicio.getMinutes();
    var horaInicioFormatada = hora + 'h' + (minuto < 10 ? '0' : '') + minuto;
    var dataFim = new Date(visitData.fim_visita);
    var hora = dataFim.getHours();
    var minuto = dataFim.getMinutes();
    var horaFimFormatada = hora + 'h' + (minuto < 10 ? '0' : '') + minuto;


    var dataVisita = new Date(visitData.data_visita);

    let htmlContent = ''; // Definindo a variável antes do bloco if
    // const primeiraData = moment(data[0].data_visita).format('DD/MM/YYYY');
    // const ultimaData = moment(data[data.length - 1].data_visita).format('DD/MM/YYYY');
    if (data.length > 0) {
      const primeiraData = moment(data[0].data_visita).format('DD/MM/YYYY');
      let ultimaData = '';

      if (data.length > 1) {
        ultimaData = moment(data[data.length - 1].data_visita).format('DD/MM/YYYY');
      }

      htmlContent = `${primeiraData}`;

      if (ultimaData !== '') {
        htmlContent += ` - ${ultimaData}`;
      }
    }

    let htmlAnomalias = ''; // Definindo a variável antes do bloco if

    if (anomaliasData.length === 0) {
      //sem anomalias
      htmlAnomalias = `<div style="border-top: 1px solid #e2e3e4; margin-bottom: 20px"> 
                        <div style=" color:#b2b2b2 padding-top: 15px; width: 100%; font-size: 10px;  margin-bottom: 20px;">
                           Sem anomalias registadas
                        </div> 
                      </div>`;
    } else {
      //com anomalias
      htmlAnomalias = `<div style="border-top: 1px solid #e2e3e4; margin-bottom: 20px">
      <ul class="table-content">
        ${anomaliasData.map(anomalia => `
        <li class="list-item">
          ${anomalia.anomalia}<br />
            ${anomalia.fotografia === 'null' ? '' : `<strong>Foto:</strong>
          <a href="${anomalia.fotografia}" style="color: gray;">${anomalia.fotografia}</a>`}
        </li>
        `).join('')}
      </ul>
    </div>`;
    }

    let htmlTarefasConcluidas = ''; // Definindo a variável antes do bloco if

    if (tarefasConcluidasData.length === 0) {
      //sem tarefas concluidas
      htmlTarefasConcluidas = `<div style="border-top: 1px solid #e2e3e4; margin-bottom: 20px"> 
                        <div style=" color:#b2b2b2 padding-top: 15px; width: 100%; font-size: 10px;  margin-bottom: 20px;">
                           Sem tarefas concluidas
                        </div> 
                      </div>`;
    } else {
      //com tarefas concluidas

      htmlTarefasConcluidas = `<div style="border-top: 1px solid #e2e3e4; margin-bottom: 20px">
                    <ul class=" table-content">
                      ${tarefasConcluidasData.map(tarefa => `<li class="list-item">${tarefa.tarefas}</li>`).join('')}
                    </ul>
                    </div>`;
    }

    let htmlTarefasNaoConcluidas = ''; // Definindo a variável antes do bloco if

    if (tarefasNaoConcluidasData.length === 0) {
      //sem tarefas concluidas
      htmlTarefasNaoConcluidas = `<div style="border-top: 1px solid #e2e3e4; margin-bottom: 20px"> 
                        <div style=" color:#b2b2b2 padding-top: 15px; width: 100%; font-size: 10px;  margin-bottom: 20px;">
                           Todas as tarefas foram concluídas
                        </div> 
                      </div>`;
    } else {
      //com tarefas concluidas

      htmlTarefasNaoConcluidas = `<div style="border-top: 1px solid #e2e3e4; margin-bottom: 20px">
                    <ul class=" table-content">
                      ${tarefasNaoConcluidasData.map(tarefa => `<li class="list-item">${tarefa.tarefas}</li>`).join('')}
                    </ul>
                    </div>`;
    }

    const horaInicioProximaVisitaFormatada = moment(data[0].hora_visita_inicio, 'HH:mm:ss').format('HH[h]mm');
    const horaFimProximaVisitaFormatada = moment(data[0].hora_visita_fim, 'HH:mm:ss').format('HH[h]mm');

    // Extraindo dia, mês e ano
    var dia = dataVisita.getDate();
    var mes = dataVisita.getMonth() + 1; // Os meses são indexados de 0 a 11, então somamos 1
    var ano = dataVisita.getFullYear();

    // Formatando a data no formato desejado (adicionando zeros à esquerda se necessário)
    var dataFormatada = (dia < 10 ? '0' : '') + dia + '/' + (mes < 10 ? '0' : '') + mes + '/' + ano;


    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'fbwgaming@gmail.com',
        pass: process.env.MAIL_PASS,
      },
    });

    const mailOptions = {
      // from: userData.email, // O email do remetente deve ser o mesmo que o email do usuário autenticado no nodemailer
      to: emailSupervisor,
      subject: 'Relatório da Visita Efetuada',
      html: `
      <!DOCTYPE html>
      <html lang="en">
      
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="src/style.css" />
        <style>
          body {
            margin: 0;
            padding: 0;
            font-family: Arial, Helvetica, sans-serif;
            background-color: #f1f1f1;
            width: 100%;
            font-size: 14px;
            color: #313131;
            min-width: 300px;
            word-break: normal;
          }
      
          .container {
            margin: 0 auto;
            max-width: 600px;
            padding-top: 50px;
            padding-bottom: 50px;
          }
      
          .section-header {
            font-weight: bold;
            font-size: 32px;
            line-height: 40px;
            margin-bottom: 10px;
          }
      
          .section-content {
            background-color: #ffffff;
            padding: 30px;
            line-height: 24px;
          }
      
          .table-content {
            background-color: #ffffff;
            line-height: 24px;
          }
      
          .section-content span {
            font-size: 18px;
            font-weight: bold;
          }
      
          .list-item {
            text-align: left;
            margin-bottom: 10px;
          }
        </style>
      </head>
      
      <body>
        <div class="container">
          <div>
            <table style="width:100%">
              <tr>
                <td align="center">
                  <div class="section-header">Relatório da Visita</div>
                </td>
              </tr>
            </table>
          </div>
          <div class="section-content">
            <span
                >A visita foi efetuada com sucesso. Poderá consultar aqui todos os
                detalhes da mesma.</span>
            <br /><br />
            <div style="color:#b2b2b2;line-height:21px;padding:5px 0;">
                      <strong>NUMERO DA VISITA ${visitData.visita_id} </strong>
                    </div>
            <table
              style="width: 100%; font-size: 16px; line-height: 24px; border-spacing: 0; margin-bottom: 20px; border-top: 1px solid #e2e3e4;">
              <tr>
                <td style="padding-top: 15px;"><strong>Data da Visita:</strong><br />${dataFormatada}</td>
                <td style="padding-top: 15px;"><strong>Hora de Início:</strong><br />${horaInicioFormatada}</td>
                <td style="padding-top: 15px;"><strong>Hora de Fim:</strong><br />${horaFimFormatada}</td>
              </tr>
            </table>
            <div style="color:#b2b2b2;line-height:21px;padding:5px 0;">
                      <strong>CLIENTE:</strong>
                    </div>
                    <table style="width: 100%; font-size: 16px; line-height: 24px; border-spacing: 0; margin-bottom: 20px; border-top: 1px solid #e2e3e4;">
                        <tr>
                            <td style="padding-top: 15px;"><strong>Nome:</strong><br />${clienteData.nome_completo}</td>
                            <td style="padding-top: 15px;"><strong>Telefone:</strong><br />${clienteData.contacto}</td>
                        </tr>
                    </table>
                    <div style="color:#b2b2b2;line-height:21px;padding:5px 0;">
                    <strong>CONTRATO ${contratoData.nome}:</strong>
                  </div>
                  <table style="width: 100%; font-size: 16px; line-height: 24px; border-spacing: 0; margin-bottom: 20px; border-top: 1px solid #e2e3e4;">
                    <tr>
                      <td style="padding-top: 15px;"><strong>Serviço:</strong><br />${servicoData.nome}</td>
                    </tr>
                    <tr>
                      <td style="padding-top: 15px;"><strong>Descrição:</strong><br />${servicoData.descricao}</td>
                    </tr>
                  </table>
            <div style="color:#b2b2b2;line-height:21px;padding:5px 0;">
              <strong>TAREFAS REALIZADAS:</strong>
            </div>
            ${htmlTarefasConcluidas}
            <div style="color:#b2b2b2;line-height:21px;padding:5px 0;">
              <strong>TAREFAS NÃO REALIZADAS:</strong>
            </div>
            ${htmlTarefasNaoConcluidas}
            <div style="color:#b2b2b2;line-height:21px;padding:5px 0;">
              <strong>ANOMALIAS REGISTADAS:</strong>
            </div>
            ${htmlAnomalias}
            <div style="color:#b2b2b2;line-height:21px;padding:5px 0;">
              <strong>VISITA REAGENDADA:</strong>
            </div>
            <table
              style="width: 100%; font-size: 16px; line-height: 24px; border-spacing: 0; margin-bottom: 20px; border-top: 1px solid #e2e3e4;">
              <tr>
                <td style="padding-top: 15px;"><strong>Data:</strong><br />${htmlContent}</td>
                <td style="padding-top: 15px;"><strong>Hora:</strong><br />${horaInicioProximaVisitaFormatada}</td>
                <td style="padding-top: 15px;"><strong>Motivo:</strong><br />${text}</td>
              </tr>
            </table>
          </div>
        </div>
      </body>
      
      </html>
        `
    };

    await transporter.sendMail(mailOptions);
    console.log('Email com detalhes da visita enviado com sucesso');

  } catch (error) {
    console.log('Erro na funcao sendEmailNextVisit', error)
    console.error('Ocorreu um erro ao enviar o email:', error);
    throw new Error('Ocorreu um erro ao enviar o email.');
  }
};


export {
  sendEmail, sendEmailNextVisit
}
