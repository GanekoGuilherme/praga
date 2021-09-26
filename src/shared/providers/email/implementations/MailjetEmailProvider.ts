import mailjet from 'node-mailjet';

class MaijetEmailProvider {
    public async sendEmail(): Promise<void>{
        const conection = mailjet.connect('89eef36534b630648d7ac440e9b587d2', 'c3691c1abaca2e3d5b43df5a1917cd1f')
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
                      "Email": "guilhermeganeko@hotmail.com",
                      "Name": "Gui"
                    }
                  ],
                  "Subject": "Recuperação de senha",
                //   "TextPart": "My first Mailjet email",
                  "HTMLPart": "<h3>Olá Lucas, <br><br>    Clique <a href='https://www.google.com/'>aqui</a> para iniciar a recuperação de sua senha!</h3><h5> Caso o link acima não funcionar, copie a URL (http:www.google.com.br) e cole no navegador.</h5>",
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