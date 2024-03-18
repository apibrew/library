const NewStartup = resource('talents/NewStartup')
const Startup = resource('talents/Startup')
const User = resource('system/User')


NewStartup.beforeCreate(record => {
    console.log('NewStartup.beforeCreate', record)

    const user = User.create({
        username: record.slug,
        password: record.password,
        roles: [
            {
                "name":'Startup'
            }
        ]
    })


    Startup.create({
        slug: record.slug,
        user: user,
    })
})
