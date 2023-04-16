 
const token ='6233886410:AAGAh877C4n_u06VYV5DffA0xTMa9SA8WEU';
const TelegramBot = require('node-telegram-bot-api');
const { Await } = require('react-router-dom');
const bot = new TelegramBot(token, {polling:true});
const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());
 
const formURL = "https://tg-bot-livid.vercel.app"
bot.on('message', async (msg)=>{
    const chatId = msg.chat.id;
    const text = msg.text;
    if (text == '/start'){
        await bot.sendMessage(chatId,"ниже появиться кнопка ", {
            reply_markup:{
                inline_keyboard:[
                    [{text:'заполнить форму', web_app:{url:formURL + '/form'}} ]
                ]
            }
        })
   
        await bot.sendMessage(chatId,"Заходи в наш интернет магазин по кнопке ниже", {
            reply_markup:{
                inline_keyboard:[
                    [{text:'Сделать заказ', web_app:{url:formURL}} ]
                ]
            }
        })
    }
    
   
     
if (msg?.web_app_data?.data){
    try{
const data = JSON.parse(msg?.web_app_data?.data)
bot.sendMessage(chatId,'спасибо за обратную связь')
bot.sendMessage(chatId,'ваш город:' + data?.city)
bot.sendMessage(chatId, 'ваша страна:' +data.country)
setTimeout(async()=>{
    await bot.sendMessage(chatId,'Информация в этом чате')
},3000)
    }catch(e){
        console.log(e)
    }
}

 })
 app.post('/web-data', async (req, res)=>{
    const {queryId, products =[], totalPrice}= req.body;
    try {
        await bot.answerWebAppQuery(queryId, {
            type: 'article',
            id: queryId,
            title: 'Успешная покупка',
            input_message_content: {
                message_text: ` Поздравляю с покупкойб вы приобрели товар на сумму
                ${totalPrice}, ${products.map(item => item.title).john(',')}`
            }
        })
        return res.status(200).json({});
    } catch (e) {
        return res.status(500).json({})
    }
})
const PORT = 8000;
app.listen(PORT, () => console.log('server started on PORT'+ PORT))
/*
bot.on('message', (msg)=>{
    const chatId = msg.chat.id;
    const text = msg.text;
    if(text.toLowerCase() == 'sup')
        bot.sendMessage(chatId, "sup");


    else if(text.toLowerCase() == 'how are you'){
        bot.sendMessage(chatId, "not bad,you?");
    }
    
    else if(text.toLowerCase() == 'what are you made for?')
        bot.sendMessage(chatId, "idk");
    
    else if (text.toLowerCase() == 'give me a pic')
        bot.sendPhoto(chatId,'mma.jpg');

        else if (text.toLowerCase() == 'give me a pic2')
        bot.sendPhoto(chatId,'котик.jpg');

})
 
*/
