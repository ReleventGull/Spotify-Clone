const client = require('./index')
const {dropTables, createTables} = require('./initdb')





const rebuildDb = async() => {
    client.connect()
    await dropTables()
    await createTables()
}

rebuildDb()
.catch((error) => console.error(error))
.then(() => client.end())