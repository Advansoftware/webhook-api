const axios = require("axios");

// api/controllers/WebhookController.js
module.exports = {
  create: async function (req, res) {
    let data = req.body;
    let apiKey = '83e2602c775d467a916fb08017966d1c';
    let webhook = {};

    if (data.NotificationType === "ItemAdded") {
      try {
        webhook = await Webhook.create(data).fetch();
        let itemId = data.ItemId;
        let linkDetails = `${data.ServerUrl}web/index.html#!/details?id=${itemId}&serverId=${data.ServerId}`;
        const image = `${data.ServerUrl}Items/${itemId}/Images/Primary?api_key=${apiKey}`;
        const {data: getMediaInfo} = await axios.get(`https://advanflix.shop:8443/Users/026600e993bd42cd82676144e8c5d3d5/Items/${itemId}?api_key=${apiKey}`);
        let format = getMediaInfo.MediaSources[0].Container;
        let mensagem = `Novos ${
          data.ItemType === "Movie" ? "filmes" : "conteúdos"
        } adicionados:\n ${
          data.SeriesName !== undefined
            ? data.SeriesName + "\nTemporada " + data.SeasonNumber00 + " - "
            : ""
        } ${data.Name}
        \nDetalhes:\n
        \nFormato: ${format} \n
        \nResolução: ${data.Video_0_Title} \n
        \n${format !== "mp4" ? "<b>Recomendada Conversão Para MP4.</b>": ""} \n
        \nPara mais detalhes acesse o link abaixo:\n`;
        // Envio de mensagem de texto para o Telegram
        const chatIds = [1655362615, 369036081];
        await sails.helpers.telegramBot(mensagem, chatIds, image, linkDetails);
      } catch (error) {
        console.error('Erro ao processar o webhook:', error);
        return res.status(500).json({ error: 'Erro interno ao processar o webhook' });
      }
    }
    return res.status(200).json(webhook);
  },
};
