const express = require("express")
const server = express()

//banco de dados
const db = require("./database/db")

//config puplic

server.use(express.static("public"))

//habilita req.body
server.use(express.urlencoded({extended: true}))
//template end
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true,
})

//pagina inical
//req = Requisição
//res = Resposta
server.get("/", function(req, res){
    return res.render("index.html")
})
server.get("/cadastro", function(req, res){
    //ler os dados da URL / query strings

    return res.render("cadastro.html")
})
server.post("/savepoint", (req, res) =>{

       // inserir dados na tabela
       const query = `
       INSERT INTO locais (
           image,
           nome,
           endereco,
           endereco2,
           estado,
           cidade,
           items
       ) VALUES ( ?,?,?,?,?,?,? );
   `
   const values = [
       req.body.image,
       req.body.nome,
       req.body.endereco,
       req.body.endereco2,
       req.body.estado,
       req.body.cidade,
       req.body.items,
   ]

   function afterInsertData(err) {
       if (err){
        console.log(err)
        return res.render("cadastro.html", {saved: false})
        
       }
       console.log("Cadastro realizado")
       console.log(this)
       return res.render("cadastro.html", {saved: true})

   }
   db.run(query, values, afterInsertData)
})
//Pagina de resultados, busca funcional
server.get("/pagina-resultados", function(req, res){

    const search = req.query.search
    if(search == ""){
        //pesquisa vazia
        return res.render("pagina-resultados.html", {total: 0})
    }

    //pegar dados no db
    db.all(`SELECT * FROM locais WHERE cidade LIKE '%${search}%'`, function(err, rows){
            if (err){
                return console.log(err)
            }
            const total = rows.length
            return res.render("pagina-resultados.html", {locais: rows, total})
        })

})


//ligar o servidor
server.listen(3000)
