// api/helpers/telegramBot.js
const { Telegraf, Markup } = require("telegraf");
const axios = require('axios');
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
    image: {
      type: "string",
      description: "Imagem do filme.",
      required: true,
    },
    linkDetails: {
      type: "string",
      description: "link de detalhes do servidor.",
      required: true,
    }
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
    const { message, chatIds, image, linkDetails } = inputs;
    let apiKey = '83e2602c775d467a916fb08017966d1c';
    const linkText = "Ver Detalhes"; // Texto do botão que abrirá o link
    const linkUrl = linkDetails; // URL do link que será aberto pelo botão
    // Criar uma instância do bot com o token do seu bot
    const bot = new Telegraf("6932592891:AAHQhOp7Y1u164F3humoQDPu3np3DHzDqUQ");
    let response = await axios.get(image, { responseType: 'arraybuffer' });
    let buffer = Buffer.from(response.data);
     // Formatar a mensagem
     const  REPOSITORY_UPDATE = `https://advanflix.shop:8443/Library/Refresh?api_key=${apiKey}`;
     
     const formattedMessage = `${message}\n`;
     // Montar o teclado inline com o botão do link
     const keyboard = Markup.inlineKeyboard([
      Markup.button.url(linkText, linkUrl),
      Markup.button.callback("Atualizar Bibliotecas", "update_books"),
     ]);

     bot.action('update_books', async (ctx) => {
      // Aqui você faria o pedido POST para sua API
      try {
        const response = await axios.post(REPOSITORY_UPDATE);
        // Resposta da API
        ctx.reply('Atualização iniciada com sucesso!');
      } catch (error) {
        // Erro ao fazer o pedido POST
        ctx.reply('Houve um erro ao atualizar as bibliotecas.');
      }
    });
    
    try {
      for (let id of chatIds) {
        await bot.telegram.sendPhoto(id, { source: buffer }, { caption: formattedMessage, parse_mode: 'HTML', reply_markup: keyboard.reply_markup });
      }
      bot.launch();
      return exits.success("Mensagem enviada com sucesso");
    } catch (error) {
      console.error('Erro ao enviar mensagem para o Telegram:', error);
      return exits.error("Erro ao enviar a mensagem", error);
    }
    
  },
  
};
