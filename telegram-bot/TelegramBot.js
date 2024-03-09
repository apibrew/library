const Message = resource('TelegramBot/Message')
const User = resource('TelegramBot/User')
const Chat = resource('TelegramBot/Chat')
const Config = resource('TelegramBot/Config')

Config.handleEach(config => {
    let running = true

    let offset = -1

    while (running) {
        try {
            const response = http.get("https://api.telegram.org/<bot-token>/getUpdates?timeout=60&offset=" + offset)

            const body = response.body.json()

            if (body.result.length === 0) {
                continue
            }

            offset = body.result[body.result.length - 1].update_id + 1
œ
            body.result.forEach(update => {
                const chat = Chat.apply({
                    botConfig: config,
                    firstName: update.message.chat.first_name,
                    lastName: update.message.chat.last_name,
                    chatId: update.message.chat.id,
                    chatType: update.message.chat.type,
                    username: update.message.chat.username
                })

                const user = User.apply({
                    botConfig: config,
                    firstName: update.message.from.first_name,
                    lastName: update.message.from.last_name,
                    userId: update.message.from.id,
                    isBot: update.message.from.is_bot,
                    username: update.message.from.username
                })

                Message.apply({
                    botConfig: config,
                    updateId: update.update_id,
                    messageId: update.message.message_id,
                    text: update.message.text,
                    from: user,
                    chat: chat,
                    date: update.message.date
                })
            })
        } catch (e) {
            console.error(e)
        }
    }

    return () => {
        running = false
        console.log('UnRegistered config: ', config)
    }
})

Message.beforeCreate(message => {
    const chat = Chat.load(message.chat)

    if (message.from) {
        return
    }

    http.get("https://api.telegram.org/<bot-token>/sendMessage?chat_id=" + chat.chatId + "&text=" + encodeURIComponent(message.text))
})