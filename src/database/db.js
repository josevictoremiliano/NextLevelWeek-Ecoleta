const sqlite = require ("sqlite3").verbose()

//criar obg de operações na db

const db = new sqlite.Database("./src/database/database.db")

module.exports = db




// db.serialize(() => {

//     //criar uma tabela
//     db.run(`
//         CREATE TABLE IF NOT EXISTS locais (
//             id INTEGER PRIMARY KEY AUTOINCREMENT,
//             image TEXT,
//             nome TEXT,  
//             endereco TEXT,
//             endereco2 TEXT,
//             estado TEXT,
//             cidade TEXT,
//             items TEXT
//         );
//     `)
//     //inserir dados na tabela
//     const query = `
//         INSERT INTO locais (
//             image,
//             nome,
//             endereco,
//             endereco2,
//             estado,
//             cidade,
//             items
//         ) VALUES ( ?,?,?,?,?,?,? );
//     `
//     const values = [
//         "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcREAHsdLEv-UQFZH4xoJXPzTqjo4oEPElkmZO8SlpQS-kU2WIAa&usqp=CAU",
//         "Paper Site",
//         "Guilherme gamballa, Jardim América",
//         "Nº 260",
//         "Santa Catarina",
//         "Rio do Sul",
//         "Residuos Eletrônicos, Lâmpadas"
//     ]

//     function afterInsertData(err) {
//         if (err){
//             return console.log(err)
//         }
//         console.log("Cadastro realizado")
//         console.log(this)
//     }
//     // db.run(query, values, afterInsertData)
//     //cunsultar dados
//     db.all(`SELECT nome FROM locais`, function(err, rows){
//         if (err){
//             return console.log(err)
//         }
//         console.log("Estes são os registros")
//         console.log(rows)
//     })
//     // deletar dados de tabela
//     db.run(`DELETE FROM locais WHERE id = ?`, [2] ,function(err) {
//         if (err){
//             return console.log(err)
//         }
//         console.log("Deletado com sucesso")
//         console.log(rows)
//     })
// })