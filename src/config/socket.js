import { Server } from 'socket.io';
import { Expo } from 'expo-server-sdk';
import ResponsavelDepartamento from '../models/responsavelDepartamento.js';
import Funcionario from '../models/funcionarios.js';
import ContaUtilizador from '../models/contaUtilizadores.js';
import dotenv from 'dotenv';
dotenv.config();


const expo = new Expo();
let io;

const setupSocket = (server) => {
    io = new Server(server, {
        cors: {
            // origin: [process.env.HOST]
            // origin: ['http://192.168.1.193:3000']
            origin: ["https://gdvc.onrender.com"],
            methods: ["GET", "POST"],
            credentials: true
        }
    });

    // console.log('Socket.io inicializado.');

    io.on('connection', (socket) => {
        // console.log(`connect: ${socket.id}`);

        socket.on('disconnect', () => {
            // console.log(`disconnect: ${socket.id}`);
        });

        socket.on('nova-visita-para-aprovar', async (departamento) => {
            console.log('Nova visita para aprovar:', departamento);

            io.emit('nova-visita-para-aprovar', departamento);
            sendPushNotification(departamento, 'Nova visita para aprovar');
        });
    });
    // Retornar a instância io para que possa ser usada em outro lugar
};

async function sendPushNotification(departamento, message) {
    try {
        const responsavel = await ResponsavelDepartamento.findOne({
            where: { departamento_id: departamento }
        });

        const funcionario = await Funcionario.findByPk(responsavel.funcionario_id);
        const contaUtilizador = await ContaUtilizador.findOne({
            where: { funcionario_id: funcionario.funcionario_id }
        });

        let messages = [];
        if (!Expo.isExpoPushToken(contaUtilizador.notification)) {
            console.error(`O token ${contaUtilizador.notification} não é válido.`);
            return;
        }

        messages.push({
            to: contaUtilizador.notification,
            sound: 'default',
            body: message,
            data: { message },
            priority: 'high',
            contentAvailable: true,
        });

        let chunks = expo.chunkPushNotifications(messages);
        let tickets = [];
        for (let chunk of chunks) {
            let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
            tickets.push(...ticketChunk);
        }
        console.log('Notificações enviadas:', tickets);
    } catch (error) {
        console.error('Erro ao enviar notificação push:', error);
    }
};

export {
    setupSocket,
    io,
    sendPushNotification
}