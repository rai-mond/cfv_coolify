const { NlpManager } = require('node-nlp');
const { dock, containerBootstrap } = require("@nlpjs/core");
const { LangPt } = require("@nlpjs/lang-pt");
const { Nlp } = require("@nlpjs/nlp")

let nlp;
let tempoTreino;
let respo


async function boot() {
  if (!nlp) {
    const start = Date.now();
    // let manager = new NlpManager({
    //   ner: { ducklingUrl: "https://ducklinghost/parse" }
    // });
    // manager.addLanguage(["pt"]);
    await dock.start();

    const container = dock.getContainer(); // await containerBootstrap();
    container.use(Nlp);
    container.use(LangPt);
    nlp = container.get("nlp");
    nlp.settings.autoSave = false;
    nlp.addLanguage("pt");

    nlp.addDocument("pt", "quem descobriu o brasil", "1");
    nlp.addAnswer("pt", "1", "Pedro Alvares Cabral");

    nlp.addDocument("pt", "quem foi zumbi", "2");
    nlp.addAnswer("pt", "2", "Zumbi dos palmares");

    nlp.addDocument("pt", "té mais", "greetings.bye");
    nlp.addDocument("pt", "tchau", "greetings.bye");
    nlp.addDocument("pt", "valeu", "greetings.bye");
    nlp.addDocument("pt", "até a próxima", "greetings.bye");
    nlp.addDocument("pt", "vou sentir saudades", "greetings.bye");
    nlp.addDocument("pt", "oi", "greetings.hello");
    nlp.addDocument("pt", "olá", "greetings.hello");
    nlp.addDocument("pt", "e aí", "greetings.hello");

    nlp.addAnswer("pt", "greetings.bye", "até a próxima");
    nlp.addAnswer("pt", "greetings.bye", "até breve");
    nlp.addAnswer("pt", "greetings.hello", "blz!");
    nlp.addAnswer("pt", "greetings.hello", "saudações!");

    nlp.addDocument("pt", "como está o tempo agora?", "tempo");
    nlp.addDocument("pt", "como estava o tempo ontem?", "tempo");
    nlp.addDocument("pt", "como estará o tempo amanhã?", "tempo");
    nlp.addDocument("pt", "como estará o tempo dia 20?", "tempo");
    nlp.addDocument("pt", "o tempo está chuvoso?", "tempo");
    nlp.addAnswer("pt", "tempo", "chuvoso");
    nlp.addAnswer("pt", "tempo", "quente");
    nlp.addAnswer("pt", "tempo", "com neblina");

    //const dia=nlp.addNerRegExRule('pt', 'dia', )
    //alert(Object.keys(dia))
    //nlp.addNerNamedEntityText('dia', 'diarelativo', ['pt'], ['amanhã'])
    ///alert(Object.keys(nlp.ner))
    //nlp.ner.addNamedEntity('email', 'regex');
    //nlp.addNerRuleOptionTexts('pt', 'dia', 'amanhã', )

    nlp.addDocument(
      "pt",
      "Agende ligar pra Giovanna, amanhã, 7 horas?",
      "agenda"
    );
    nlp.addAnswer(
      "pt",
      "agenda",
      "Compromisso: Ligar, contato: Giovanna, dia: 18/12/2020, hora: 7:00"
    );

    await nlp.train();
    //nlp.save();
    const end = Date.now();
    tempoTreino = end - start;
  }
  return nlp;
}

/*

function train(msg){
            manager.train();
            manager.save();
            console.log(' ue ue UE UE ---- ',msg)
            response = manager.process('en', 'I should go now');
            
            return  response
        }
*/

function useNLP(msg) {
    
    boot().then((r) => {
        
        return nlp.process("pt", msg.msg).then((res) => {
            
          return res;
        });
      })

}

// Train and save the model.
function testa(msg){
    return new Promise((Resolve, reject) => {
        if (msg) {
            useNLP(msg).then((ri)=>{
                console.log('useNLP  --   ',ri)
            })
            Resolve()
        }
        else {
          reject("The number is odd")
        }
      })
  
  
}


exports.expo = testa