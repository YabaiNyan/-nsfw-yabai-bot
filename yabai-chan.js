// Req the gelbooru scraper api.
const gelbooru = require('./gelb');
// Req Discord api
const Discord = require('discord.js')
const client = new Discord.Client()

// Discord stuffs
const TOKEN = '<-- Enter Your Bot Token Here! -->'
const PREFIX = '>'

// Random Tags to search
const tags = ["loli","bottomless","large_breasts","pussy","nipples"]
const randomAmount = 1000

//set hloop to not running
var hloop = false

client.on('ready', () => {
    console.log('Yabai-Chan is ready! <3')
})

client.on('message', async message => {
    const command = message.content.toLowerCase().split(' ')[0]
    const arguments = message.content.split(' ')
    arguments.shift()
    if (command == `${PREFIX}ping`) {
        return message.reply('I\'m here! <3')
    }
    if (command == `${PREFIX}h`) {
        console.log("Yabai got a hentai request!")
        if (arguments.length < 1) {
            randTag = tags[Math.floor(Math.random()*tags.length)]
            console.log("Sending tag " + randTag + " to gelbooru!")
            gelbooru.getRandomImage(randomAmount, randTag, function (data) {
                if(data == 727){
                    return message.channel.send("Yabai didn't find anything this time! ;-; \n Maybe try again?")
                }
                console.log("Forwarding to User >^<")
                return message.channel.send(data)
            });
        }
        console.log("Sending tag " + arguments.join("_") + " to gelbooru!")
        gelbooru.getRandomImage(randomAmount, arguments.join("_"), function (data) {
            if(data == 727){
                return message.channel.send("Yabai didn't find anything this time! ;-;")
            }
            console.log("Forwarding to User >^<")
            return message.channel.send(data)
        });
    }
    if (command == `${PREFIX}hloop`) {
        console.log("Yabai got a hentailoop request!")
        if (arguments.length > 0) {
            if (arguments[0] == "stop"){
                clearInterval(hloop);
                hloop = false;
                return message.channel.send("Yabai-Chan is stoping the loop! <3")
            }
        }
        if (hloop != false){
            clearInterval(hloop);
            hloop = false;
        }
        message.channel.send("Yabai is readying the images!")
        var hloopArgs = arguments
        if(isNaN(hloopArgs[hloopArgs.length-1])){
            var hloopWait = 5000
        }else{
            var hloopWait = hloopArgs[hloopArgs.length-1]*1000
            hloopArgs.pop();
        }
        return hloop = setInterval(function(){
            console.log("Yabai is preparing a hentailoop request!")
            
            if (hloopArgs.length < 1) {
                randTag = tags[Math.floor(Math.random()*tags.length)]
                console.log("Sending tag " + randTag + " to gelbooru!")
                gelbooru.getRandomImage(randomAmount, randTag, function (data) {
                    if(data == 727){
                        message.channel.send("Something went wrong this time. >~<\nWait a second let me try again.")
                    }
                    console.log("Forwarding to User >^<")
                    message.channel.send(data)
                });
            }else{
                console.log("Sending tag " + hloopArgs.join("_") + " to gelbooru!")
                gelbooru.getRandomImage(randomAmount, hloopArgs.join("_"), function (data) {
                    if(data == 727){
                        message.channel.send("Yabai didn't find anything this time! ;-;")
                    }
                    console.log("Forwarding to User >^<")
                    message.channel.send(data)
                });
            }
        }, hloopWait);
    }
    if (command == `${PREFIX}purge`) {
        if (arguments.length < 1) {
            return message.channel.send('Please tell Yabai-Chan how many messages you want to delete! >a<')
        }
        if (arguments[0] > 100){
            return message.channel.send('Yabai-Chan can only delete up to 100 messages at a time you know!')
        }else{
            let deletedMessages = await message.channel.bulkDelete(arguments[0], true)
            return message.channel.send(`Yabai-Chan Deleted ${deletedMessages.size} messages!`)
        }
    }
})

client.login(TOKEN)


// Function call to search 500 images that are tagged with 'blond hair', and then log the URL of one of them.
//gelbooru.getRandomImage(500, "blond_hair", function (data) {
//    console.log(data);
//});