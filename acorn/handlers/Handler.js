const ApiAction = resource('acorn/Handler')

ApiAction.beforeCreate(apiAction => {
    console.log(apiAction)
    const res = resource(apiAction.$type)
    switch (apiAction.action) {
        case 'CREATE':
            apiAction.result = res.create(apiAction.payload)
            break;
        case 'UPDATE':
            apiAction.result = res.create(apiAction.payload)
            break;
        case 'DELETE':
            apiAction.result = res.delete(apiAction.payload)
            break;
        case 'GET':
            apiAction.result = res.get(apiAction.params.id, apiAction.params)
            break;
        case 'LIST':
            apiAction.result = res.list(apiAction.params)
            break;
    }

    return apiAction
})