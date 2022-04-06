const moment = require('moment')
const uuid = require('uuid')

let members = [
    {
        id: uuid.v4(),
        username: 'JohnSnow',
        name: 'John Snow',
        gender: 'male',
        created_at: moment().format('YYYY-MM-DD HH:mm:ss')
    },
    {
        id: uuid.v4(),
        username: 'EvaSmith',
        name: 'Eva Smith',
        gender: 'female',
        created_at: moment().format('YYYY-MM-DD HH:mm:ss')
    }
];

module.exports = {
    "get": () => members,
    "first": (username) => {
        const member = members.filter((member) => {
            return member.username === username
        })

        return member.length > 0 ? member.pop() : {}
    }
}