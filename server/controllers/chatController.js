const axios = require("axios");

class ChatController {
  static postChat(req, res, next) {
    const chat = encodeURIComponent(req.body.chat);
    let reply;
    axios({
      url: `https://api.wit.ai/message?q=${chat}`,
      method: "GET",
      headers: {
        Authorization: "Bearer PA72X3OCGU7CBYVPC4ZCMS4PBSQLRQYB",
      },
    })
      .then(({ data }) => {
        if (data.entities["section:section"][0].value === "navbar section") {
          reply =
            "A navigation bar is a user interface element within a webpage that contains links to other sections of the website. It is most commonly displayed as horizontal list of links at the top of each page.";
        } else if (
          data.entities["section:section"][0].value === "main section"
        ) {
          reply =
            "Main section is the first thing visitors will see when they visit your website. Putting catchy and interesting image or text in this section will make your visitors stay longer in your website!";
        } else if (
          data.entities["section:section"][0].value === "about section"
        ) {
          reply =
            "This is where you put the introduction of your company. Introduce your company to visitors by putting a simple description text about your company";
        } else if (
          data.entities["section:section"][0].value === "service section"
        ) {
          reply =
            "Service section is where you can introduce your products to visitors. Got any products to show? Let visitors to know about your products here!";
        } else if (
          data.entities["section:section"][0].value === "contact section"
        ) {
          reply =
            "Let your visitors know how to reach you. You can put your company email, phone, or address here.";
        } else if (
          data.entities["section:section"][0].value === "footer section"
        ) {
          reply =
            "Footer is the bottom part of your website. Commonly, social media links are put here.";
        } else {
          reply =
            "Ask me something like 'what does navbar mean?' or 'what is footer?'";
        }
        res.status(200).json({ message: reply });
        return reply;
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }

}

module.exports = ChatController;
