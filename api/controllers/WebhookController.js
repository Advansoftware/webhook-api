/**
 * WebhookController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  // Método para criar um novo webhook
  create: async function (req, res) {
    // Receber os dados do webhook no corpo da requisição

    let data = req.body;
    let webhook = {};
    if (data.NotificationType === "ItemAdded") {
      // Salvar os dados do webhook no banco de dados

      webhook = await Webhook.create(data).fetch();
      //remover e colocar em cron (envio de mensagem telegram

      let linkDetails = `${data.ServerUrl}web/index.html#!/details?id=${data.ItemId}&serverId=${data.ServerId}`;
      let mensagem = `AdvanServer\n Novos ${
        data.ItemType === "Movie" ? "filmes" : "conteudos"
      }:\n ${
        data.SeriesName !== undefined
          ? data.SeriesName + "\nTemporada " + data.SeasonNumber00 + " - "
          : ""
      } ${data.Name}
      \n
      Para mais detalhes acesse o link a baixo:\n${linkDetails}
      `;

      console.log(mensagem);
      await sails.helpers.telegramBot(mensagem);
    }
    // Enviar uma resposta com o status 200 (OK) e o webhook criado
    return res.status(200).json(webhook);
  },
};
