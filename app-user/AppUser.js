const AppUser = resource('AppUser')
const User = resource('system', 'User')

const mapUserTo = (record) => {
    return {
        id: record.id,
        username: record.username,
        password: record.password,
        roles: [
            {
                "name": 'chat-user'
            }
        ]
    }
}

const mapUserFrom = (record) => {
    return {
        id: record.id,
        username: record.username,
        password: record.password,
    }
}

AppUser.bindCreate(User, mapUserFrom, mapUserTo)
AppUser.bindList(User, mapUserFrom, mapUserTo)
