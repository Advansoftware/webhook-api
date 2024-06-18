// api/controllers/WebhookController.js
const { Telegraf } = require("telegraf");
const axios = require('axios');
module.exports = {
  create: async function (req, res) {
    const bot = new Telegraf("6932592891:AAHQhOp7Y1u164F3humoQDPu3np3DHzDqUQ");
    let data = req.body;
    let apiKey = '83e2602c775d467a916fb08017966d1c';
    let webhook = {};

    if (data.NotificationType === "ItemAdded") {
      try {
        webhook = await Webhook.create(data).fetch();
        let itemId = data.ItemId;
        let linkDetails = `${data.ServerUrl}web/index.html#!/details?id=${itemId}&serverId=${data.ServerId}`;
        let image = `${data.ServerUrl}Items/${itemId}/Images/Backdrop?api_key=${apiKey}`;
        let mensagem = `AdvanServer\n Novos ${
          data.ItemType === "Movie" ? "filmes" : "conteúdos"
        } adicionados:\n ${
          data.SeriesName !== undefined
            ? data.SeriesName + "\nTemporada " + data.SeasonNumber00 + " - "
            : ""
        } ${data.Name}
        \nPara mais detalhes acesse o link abaixo:\n${linkDetails}`;

        console.log(mensagem);
        let response = await axios.get(image, { responseType: 'arraybuffer' });
        console.log('axios: ', response)
        let buffer = Buffer.from(response.data);
        // Envio de mensagem de texto para o Telegram
        const chatIds = [1655362615, 369036081];
        //await sails.helpers.telegramBot(mensagem, chatIds);

        // Obtenção do URL do pôster do Jellyfin usando o helper
         // Obtenção do URL do pôster do Jellyfin usando o helper
         
           // Enviar a imagem para o Telegram usando telegraf
           chatIds.forEach(chatId => bot.telegram.sendPhoto(chatId, { source: buffer }, { caption: mensagem }));
         
      } catch (error) {
        console.error('Erro ao processar o webhook:', error);
        return res.status(500).json({ error: 'Erro interno ao processar o webhook' });
      }
    }

    return res.status(200).json(webhook);
  },
};
