var Discord = require('discord.js')
var noblox = require('noblox.js')

module.exports = {
    name: 'SetRank',
    description: `The SetRank command SetRank's users in a group.`,
    async execute(message, msg, args) {
      if (!message.member.roles.cache.has('')) return message.reply(":x: You do not have permission to use this command!");
        const robloxname = args[1]
        const robloxid = await noblox.getIdFromUsername(robloxname)
            .then(async (robloxid) => {
                const rank = parseInt(args[2])
                await noblox.setRank({ group: process.env.GroupID, target: robloxid, rank: rank })
                    .then(async () => {
                        const rankname = await noblox.getRankNameInGroup(process.env.GroupID, robloxid)
                        const embed = new Discord.MessageEmbed()
                        .setTitle(`:white_check_mark: Sucsessfully Ranked User`)
                        .setURL(`https://www.roblox.com/users/${robloxid}/profile`)
                        .setThumbnail(`https://www.roblox.com/headshot-thumbnail/image?userid=${robloxid}&width=420&height=420&format=png`)
                        .setColor('GREEN')
                        .addField('__Username__' , `${robloxname}`, true)
                        .addField('__New Rank__' ,  `${rankname}` , true)
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
                        .addField('Three,' , 'Something went wrong with the code or some systems may have been updated, DM the Bot Developer')
                        .setFooter('Ranking System')
                        .setTimestamp()
                        message.channel.send(errorembed)
                        console.log(err)
                    })
            })
            .catch((err) => {
                const errorembed = new Discord.MessageEmbed()
                .setTitle(':x: Error')
                .setDescription(`**Could not rank the user for the following reasons:**`)
                .setColor('RED')
                .addField('One,' , 'Invalid rank or username')
                .addField('Two,' , 'Something went wrong with the cookie')
                .addField('Three,' , 'Something went wrong with the code or some systems may have been updated, DM the Bot Developer')
                .setFooter('Ranking System')
                .setTimestamp()
                message.channel.send(errorembed)
                console.log(err)
            })
    }
}
