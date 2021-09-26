import mailjet from 'node-mailjet';

class MaijetEmailProvider {
    public async sendEmail(email, name, token): Promise<void>{
        const conection = mailjet.connect('89eef36534b630648d7ac440e9b587d2', 'c3691c1abaca2e3d5b43df5a1917cd1f')
        console.log(name.name)
        const request = conection.post("send", {'version': 'v3.1'})
            .request({
              "Messages":[
                {
                  "From": {
                    "Email": "guilhermemassaruganeko@gmail.com",
                    "Name": "AgroRadar"
                  },
                  "To": [
                    {
                      "Email": email,
                      "Name": name.name
                    }
                  ],
                  "Subject": "Recuperação de senha",
                  "HTMLPart": `<h3>Olá ${name.name}, <br><br>    Clique <a href='https://agroradar.herokuapp.com/cadastro-senha/${token}'>aqui</a> para iniciar a recuperação de sua senha!</h3><h5> Caso o link acima não funcionar, copie a URL (https://agroradar.herokuapp.com/cadastro-senha/${token}) e cole no navegador.</h5>`,
                  "CustomID": "AppGettingStartedTest"
                }
              ]
            });

        request
          .then((result) => {
            console.log(result.body)
          })
          .catch((err) => {
            console.log(err.statusCode)
          })
    }
}

export default MaijetEmailProvider;