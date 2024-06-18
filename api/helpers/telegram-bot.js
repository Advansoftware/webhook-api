// api/helpers/telegramBot.js
const { Telegraf } = require("telegraf");

module.exports = {
  friendlyName: "Telegram bot",

  description: "Envia uma mensagem para IDs específicos no Telegram.",

  inputs: {
    message: {
      type: "string",
      description: "A mensagem a ser enviada.",
      required: true,
    },
    chatIds: {
      type: "ref",
      description: "Lista de IDs de chat para onde enviar a mensagem.",
      required: true,
    },
  },

  exits: {
    success: {
      outputType: "ref",
      description: "Mensagem enviada com sucesso",
    },
    error: {
      outputType: "ref",
      description: "Erro ao enviar a mensagem",
    },
  },

  fn: async function (inputs, exits) {
    const { message, chatIds } = inputs;

    // Criar uma instância do bot com o token do seu bot
    const bot = new Telegraf("6932592891:AAHQhOp7Y1u164F3humoQDPu3np3DHzDqUQ");

    try {
      for (let id of chatIds) {
        await bot.telegram.sendMessage(id, message);
      }
      return exits.success("Mensagem enviada com sucesso");
    } catch (error) {
      console.error('Erro ao enviar mensagem para o Telegram:', error);
      return exits.error("Erro ao enviar a mensagem", error);
    }
  },
};
