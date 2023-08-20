const { Telegraf, Markup } = require('telegraf');
const fs = require('fs/promises')
const bot = new Telegraf('6581537227:AAGMNMJ0mZx0-Y8hqarZ2KVdYMda2nd-EGw');


async function start() {
  let rawData = await fs.readFile('recipes.json');
  let data = JSON.parse(rawData);

  bot.start(async (ctx) => {
    ctx.reply('Привіт! Я бот, який надсилає рецепти. Якщо потрібен рецепт - напишіть "Рецепти" та натисніть на кнопку.');
  });

  bot.on('text', async (ctx) => {
    let text = ctx.message.text;

    if(text.toLowerCase() == 'рецепти') {
      const keyboard = Markup.inlineKeyboard([
        Markup.button.callback('Млинці на кефірі', 'pancakesOnKefir'),
        Markup.button.callback('Чізкейк без випічки', 'cheesecakeWithoutBaking'),
        Markup.button.callback('Крамбл із абрикосами', 'crumbleWithApricots')
      ]);
    
      ctx.reply('Виберіть опцію:', keyboard);
    }
  });
  
  bot.action('pancakesOnKefir', async (ctx) => {
    const obj = data.pancakesOnKefir;

    ctx.replyWithPhoto({source: obj.image_url}, {caption: obj.text});
  });
  
  bot.action('cheesecakeWithoutBaking', async (ctx) => {
    const obj = data.cheesecakeWithoutBaking;

    ctx.replyWithPhoto({source: obj.image_url}, {caption: obj.text});
  });
  
  bot.action('crumbleWithApricots', async (ctx) => {
    const obj = data.crumbleWithApricots;

    ctx.replyWithPhoto({source: obj.image_url}, {caption: obj.text});
  });
  
  bot.launch();
}

start();