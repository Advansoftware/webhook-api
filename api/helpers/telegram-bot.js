const { Telegraf } = require("telegraf");
module.exports = {
  friendlyName: "Telegram bot",

  description: "",

  inputs: {
    message: {
      type: "string",
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
    // Importar a biblioteca Telegraf
    const { message } = inputs;
    // Criar uma instância do bot com o token do seu bot
    const bot = new Telegraf("6932592891:AAHQhOp7Y1u164F3humoQDPu3np3DHzDqUQ");
    // Enviar a mensagem "Olá mundo" para o número de celular usando o método sendMessage do bot
    try {
      await bot.telegram.sendMessage(1655362615, message);
    } catch (error) {
      return exits.error("Erro ao enviar a mensagem", error);
    }
    return exits.success("Mensagem enviada com sucesso");
  },
};
