const mongoose = require('mongoose');

const { Schema } = mongoose;

const chatMemberSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    name: { type: String, required: true }
});

const chatMessageSchema = new Schema({
    text: { type: String, required: true },
    senderId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    senderName: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    isRead: { type: Boolean, required: true }
});

const chatSchema = new Schema({
    members: [chatMemberSchema],
    type: { type: String, enum: ['group', 'private', 'channel'], required: true },
    messages: [chatMessageSchema],
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now },
    lastMessage: { type: String, required: false },
    unreadCount: { type: Number, default: 0 },
});
chatSchema.statics.findUserChats = async function (_id) {
    try {
        console.log(_id)
        const chats = await this.find({ 'members.userId': _id }).exec();
        return chats;
    } catch (error) {
        console.log(error);
        throw new Error('Ошибка при получении чатов пользователя');
    }
}
chatSchema.statics.handleChatMessage = async function (chatId, message, socket) {
    try {
        const getChat = await this.findById(chatId);
        const unreadCount = getChat.unreadCount;
        const dateNow = Date.now()
        const update = {
            $set: { lastMessage: JSON.stringify(message.text), updated: dateNow, unreadCount: unreadCount + 1 }, // преобразовать объект в строку
            $push: { messages: message }
        };
        const options = { new: true };
        const updatedChat = await this.findOneAndUpdate({ _id: chatId }, update, options);
        return updatedChat;
    } catch (err) {
        console.log(err);
    }
};

const chatMessage = mongoose.model('Chats', chatSchema);
module.exports = chatMessage;
