var Discord = require('discord.js')
var noblox = require('noblox.js')

module.exports = {
    name: 'Promote',
    description: 'Promote command. It promotes a user in a ROBLOX Group.',
    async execute(message, msg, args) {
        if (!message.member.roles.cache.has('RANKONLYROLEIDHERE')) return message.reply(":x: You do not have permission to use this command!");
        const robloxname = args[1]
        if (!robloxname) return message.reply("Please Provide a Username!")
        await noblox.getIdFromUsername(robloxname)
            .then(async (robloxid) => {
                noblox.promote(process.env.GroupID, robloxid)
                    .then(async (sucsess) => { 
                        const embed = new Discord.MessageEmbed()
                        .setTitle(`:white_check_mark: Sucsessfully Promoted User`)
                        .setURL(`https://www.roblox.com/users/${robloxid}/profile`)
                        .setThumbnail(`https://www.roblox.com/headshot-thumbnail/image?userid=${robloxid}&width=420&height=420&format=png`)
                        .setColor('GREEN')
                        .addField('__Username__' , `${robloxname}`, true)
                        .addField('__Old Rank__' ,  `${sucsess.oldRole.name}` , true)
                        .addField('__New Rank__' ,  `${sucsess.newRole.name}` , true)
                        .setFooter('Ranking System')
                        .setTimestamp()
                        message.channel.send(embed)
                    })
                    .catch((err) => {
                        const errorembed = new Discord.MessageEmbed()
                        .setTitle(':x: Error')
                        .setDescription(`**Could not rank the user for the following reasons:**`)
                        .setColor('RED')
                        .addField('One,' , 'Invalid rank or username')
                        .addField('Two,' , 'Something went wrong with the cookie')
                        .addField('Three,' , 'Something went wrong with the code or some systems may have been updated, DM the CEO')
                        .setFooter('Ranking System')
                        .setTimestamp()
                        message.channel.send(errorembed)
                    })
            })
            .catch((err) => {
                const errorembed = new Discord.MessageEmbed()
                    .setTitle(':x: Error')
                    .setDescription(`**Could not rank the user for the following reasons:**`)
                    .setColor('RED')
                    .addField('One,', 'Invalid rank or username')
                    .addField('Two,', 'Something went wrong with the cookie')
                    .addField('Three,', 'Something went wrong with the code or some systems may have been updated, DM the CEO')
                    .setFooter('Ranking System')
                    .setTimestamp()
                message.channel.send(errorembed)
                console.log(err)
            })
    }
}
