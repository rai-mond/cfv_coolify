const db = require("../models");
var Data= db.data;
var objMap = {
    "cName":"",
    "map":"",
    "Summary": "Devices",
    "gruppi": {
      "camara letto": [
        {
          "id": "214202181039PM",
          "Tipo": "Luce",
          "Nome_Device": "Appliche",
          "Icona": "shelly4.svg"
        },
        {
          "id": "218202173757PM",
          "Tipo": "Luce",
          "Nome_Device": "Barra Led ",
          "Icona": "sensore.svg"
        },
        {
          "id": "2/14/2021 9:02:03 PM",
          "Tipo": "Tapparella",
          "Nome_Device": "Porta Letto",
          "Icona": "cancello.svg"
        },
        {
          "id": "2/14/2021 9:03:16 PM",
          "Tipo": "Tapparella",
          "Nome_Device": "Finestra Letto",
          "Icona": "shelly4.svg"
        }
      ],
      "garagio": [],
      "giardino": [],
      "corridoio": [
        {
          "id": "214202180835PM",
          "Tipo": "Luce",
          "Nome_Device": "Corridoio",
          "Icona": "tesata"
        }
      ],
      "cucina": [
        {
          "id": "214202144317PM",
          "Tipo": "Luce",
          "Nome_Device": "Cucina",
          "Icona": "1"
        },
        {
          "id": "2/14/2021 8:48:47 PM",
          "Tipo": "Tapparella",
          "Nome_Device": "Cucina",
          "Icona": "tapparella"
        }
      ],
      "letto 2": [
        {
          "id": "214202181414PM",
          "Tipo": "Luce",
          "Nome_Device": "Letto",
          "Icona": "1"
        }
      ],
      "salone": [
        {
          "id": "214202143832PM",
          "Tipo": "Luce",
          "Nome_Device": "Sala",
          "Icona": "1"
        },
        {
          "id": "214202144029PM",
          "Tipo": "Luce",
          "Nome_Device": "Divano",
          "Icona": "1"
        },
        {
          "id": "214202173304PM",
          "Tipo": "Luce",
          "Nome_Device": "Cappa ",
          "Icona": "1"
        },
        {
          "id": "2/14/2021 8:49:27 PM",
          "Tipo": "Tapparella",
          "Nome_Device": "Salone",
          "Icona": "tapparella"
        },
        {
          "id": "12122021192202",
          "Tipo": "Generic",
          "Nome_Device": "Televisore ",
          "Icona": "tv"
        },
        {
          "id": "14022021163549",
          "Tipo": "Posizione",
          "Nome_Device": "divano destro",
          "Icona": "1"
        },
        {
          "id": "16052021210518",
          "Tipo": "Posizione",
          "Nome_Device": "divano sinistra",
          "Icona": "1"
        }
      ],
      "ingresso": [
        {
          "id": "214202143727PM",
          "Tipo": "Luce",
          "Nome_Device": "Ingresso",
          "Icona": "1"
        }
      ],
      "bagno": [
        {
          "id": "2/14/2021 8:57:01 PM",
          "Tipo": "Tapparella",
          "Nome_Device": "Bagno",
          "Icona": "tapparella"
        }
      ]
    },
    "Gruppi_Stanze": [
      "camara letto",
      "garagio",
      "giardino",
      "corridoio",
      "cucina",
      "letto 2",
      "salone",
      "ingresso",
      "bagno"
    ]
  }
  

module.exports = function(app) {
    
    app.post('/api/user/map', function (req, res) {
        var resul;
        Data.findOne({name:req.body.name},(error, success) =>{       
            resul=success.users[0].cName
            
            res.status(200).send(resul)
        });
        //res.send('User Homepage')
    })
    app.post('/api/user/data', function(req,res){
        

        Data.estimatedDocumentCount((err, count) => {
            if (!err && count === 0) {
                objMap.cName=req.body.cName;
                objMap.map=req.body.map;
              new Data({
                _id:count,
                name:req.body.uName,
                users:[]       
              }).save(err => {
                if (err) {
                  console.log("error", err);
                }
                dbUp(req.body.uName,req.body.cName);
                console.log("added 'data' to data collection");
              });
        
            }else{
                objMap.cName=req.body.cName;
                objMap.map=req.body.map;
                dbUp(req.body.uName,req.body.cName);
            }
          });
          
    })
  
};

function dbUp(r,c){
    
    Data.findOne(
      { name:r },
      (error, success) =>{
       if (error) {
        console.log(error);
  
        } else{
          searrch(success,objMap,r,c)
        }
      })
    
        
  }
  function searrch(s,o,r,c){
    Data.exists({users:o}).exec(function(err,succ){
      if(err){
        console.log(err);
      }else{
        if(s===null){
          return
        }else{
          if(s.users.length==0){
            Data.findOneAndUpdate(
              { name: r }, 
              { $push: { users: o  } },
              function (error, success) {
                  if (error) {
                     console.log(error);
                  }else{
                    console.log("added map");
                  }
              }
            )
          }else{
           
            var b=0;
            for(a=0;a<s.users.length;a++){
              if(s.users[a].cName!==c){
                b++
              }else{
                b=s.users.length+1;
              }
            }
            if(s.users.length==b){
              
                Data.findOneAndUpdate(
                    { name: r }, 
                    { $push: { users: o  } },
                    function (error, success) {
                        if (error) {
                           console.log(error);
                        }else{
                          console.log("added map");
                        }
                    }
                  )
            }
            b=0;
            
          }
          
        }
        
      }
   })
  }


