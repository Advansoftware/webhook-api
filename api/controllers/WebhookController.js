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

    // Mostrar os dados do webhook no console.log
    console.log(data);

    // Salvar os dados do webhook no banco de dados
    let webhook = await Webhook.create(data).fetch();

    // Enviar uma resposta com o status 200 (OK) e o webhook criado
    return res.status(200).json(webhook);
  },
};
