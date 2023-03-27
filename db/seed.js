const client = require('./index')

const dropTables = async() => {
    try {
        console.log("Starting drop tables")
        await client.query(`
        DROP TABLE IS EXISTS test
        `)
        console.log("finished dropping tables")
    }catch(error){
        console.error("There was an error dropping the tables", error)
        throw error
    }
}

const createTables = async() => {
    try {
        console.log('Starting create table')
        await client.query(`
        CREATE TABLE test (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255)
        )`
        )
        console.log("Finished creating the tables")
    }catch(error) {
        console.error("There was an error creating tables", error)
        throw error
    }
}

