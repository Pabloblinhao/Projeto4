const prompt = require("prompt-sync")();
console.clear();

let listOfChar = [];
let time = 40;
let isFigth = false;
let chose = '[1] Lutar \n[2] Treinar \n[3] Fugir'
let chose2 = 'Qual lado deseja seguir \n[1] Direito \n[2] Esquerdo ?'

let elcid = {
    ataque: 20,
    defesa: 10,
    vida: 100,
    bonus: +5,

    treinarAtaque: function () {
        this.ataque += 1;
        console.log(`O ataque do Elcid agora é: ${this.ataque}`);
    },

    skillsNoMomento: function() { 
        console.log(`No momento Elcid tem ${this.ataque} de ataque, ${this.defesa} de defesa e ${this.vida} de vida.`);
    },

    elcidGanha: function(inimigo) {
        console.log(`Você ganou do inimigo ${inimigo}`)
    }
}

// Função para condições
function condiction( condiction ) {
    if (condiction == 1) {
        figthByTurn('Herald', 10, 30);
    } else if ( condiction == 2 ) {
        traine();
    } else if ( condiction == 3 ) {
        run();
    }
}

// Função para treinamento
function traine() {
    time -= 2;
    elcid.treinarAtaque();
    console.log("Treino bem sucedido!!")
    elcid.skillsNoMomento();
    firstChalenge();
}

// Função para fugir
function run() {
    time -= 1;
    console.log('Fuga com sucesso!!')
    console.log('Tempo Restante ' + time);
}


// Função para criar Char
function setChar(n, f, v) {
    listOfChar.push({
        nome:  n,
        forca: f,
        vida: v
    });
}

function messagePosChalenge() {
    console.log();
    console.log();
    console.log('Desafio bem sucedido, siga com a jornada!');
    console.log();
    console.log();
    console.log();
    console.log('Estamos na metade de nossa jornada Elcid, precisamos seguir o mais rapido possivel!');
    console.log();
    console.log();
    console.log();
}

function telaInicio() {
    console.log('BEM VINDO A JORNADA DE ELCID');
    console.log('Um jogo do estilo ficção interativa');
    console.log('--Aperte ENTER para continuar--');
    prompt();
    console.clear();
    console.log('Elcid está a procura do rei da cidade de Falkirk localizada no sul, \nenfrentando invasões de rebeldes do norte, os Vikings. \nPara Elcid buscar ajuda, precisa enfrentar alguns vikings na jornada.');
}

function firstChalenge(message) {
    if ( time > 0 ) {
        console.log(message || 'Elcid em sua jornada, acha um inimigo que nunca tinha visto antes, oque você fara:');
        console.log(chose)
        let first = +prompt();
        
        while(first != 1 && first != 2 && first != 3) {
            console.log(chose);
            first = +prompt();  
        }

        condiction(first);
    }
    
}

function figthByTurn(n, f, v) {
    
    if ( time > 0 ) {
        setChar(n, f, v);

        let enemy = listOfChar.filter(p => p.nome === n);

        console.log(`Você esta diante do inimigo um feroz ${n}...`)

        let i = 1;

        while(enemy[0].vida > 0) {
            console.log();
            console.log();
            console.log( `\nTurno [${i}]`);
            console.log( `\nSua vida [${elcid.vida}]`);
            console.log( `\nVida Inimigo [${enemy[0].vida}]`);
            console.log();
            console.log();


            console.log("Oque você pretende fazer");
            console.log("[1] Bater \n[2] Defesa ");
            let opt = +prompt();

            while(opt !== 1 && opt !== 2) {
                console.log("[1]  Bater \n[2] Defesa ");
                opt = +prompt();  
            }
            
            if ( opt == 1 ) {
                if (Math.floor(Math.random() * 60) > 45) {
                    console.log('Você teve um ataque critico');
                    enemy[0].vida -= elcid.ataque * 2;
                } else {
                    enemy[0].vida -= elcid.ataque;
                }
            } else {
                console.log(" Defesa bem sucedida!!");
            }

            if (enemy[0].vida > 0) {
                if (Math.floor(Math.random() * 60) > 30) {
                    console.log('Inimigo acertou o ataque!!');
                    elcid.vida -= enemy[0].forca;
                } else {
                    console.log('Inimigo errou o ataque!!');
                }
            }
            

            i++;
            time -= 1;

            if (elcid.vida <= 0 ) {
                endGameLife();
                break;
            }

            if (time <= 0 ) {
                endGameTime();
                break;
            }
        }


        if ( enemy[0].vida <= 0) {
            console.log("Vitoria!! ");
            elcid.skillsNoMomento();
            console.log();
            console.log();
            console.log();
        }
    }
}

function secondChalenge() {
    if ( time > 0 ) {
        console.log('Logo a frente a estrada vira uma bifucarcao, lado direito contendo um lobo e lado esquerdo um urso.');
        console.log(chose2);
        let second = +prompt();
        
        while(second != 1 && second != 2) {
            console.log(chose2);
            second = +prompt();  
        }
        
        if (second == 1) {
            figthByTurn('Lobo', 15, 40);
        } else {
            figthByTurn('Urso', 20, 50);
        }

        time -= 10;
        console.log("Tempo restante da aventura: " + time);
    }
    
}

function endGameLife() {
    console.clear()
    console.log('Você morreu!!');
}

function endGameTime() {
    console.clear()
    console.log('Você morreu!!');
}

function finalChalenge() {
    if (time > 0) {
        console.log("Falta o ultimo obstaculo de sua jornada, o berseker conhecido como o 'esmaga ossos'");

        console.log('Você tem duas opções agora, tentar o ataque furtivo ou atacar de frente, oque pretende fazer ?');
        console.log('[1] Furtivo \n[2] Frente');
        let second = +prompt();
        
        while(second != 1 && second != 2) {
            console.log(chose2);
            second = +prompt();  
        }
    
        if (second == 1) {
            if (Math.floor(Math.random() * 60) > 50) {
                console.log("Você acertou o ataque furtivo e o inimigo sofre grande dano!")
                figthByTurn('Berseker', 30, 60);
            } else {
                console.log("Você errou o ataque furtivo e o inimigo esta furioso e teve aumento de força!")
                figthByTurn('Berseker', 40, 80);
            }
        } else {
            console.log("Você escolheu o ataque frontal! ")
            figthByTurn('Berseker', 30, 80);
        } 
    }
}


telaInicio();
firstChalenge('Elcid em sua jornada, acha um inimigo que nunca tinha visto antes, oque você fara:');
messagePosChalenge();
secondChalenge();

console.log("Parabens por enfrentar esse desfaio selvagem.");

finalChalenge();
console.log("Elcid você teve uma jornada dificil, parabéns por concluir sua jornada e levar a mensagem para o rei da cidaded de Falkirk.");
console.log("Tempo da jornada que restou " + time);
elcid.skillsNoMomento();
console.log("Elcid você Derrotou esses inimigos na sua jornada!");
for (let i = 0; i < listOfChar.length; i++) {
    console.log(listOfChar[i].nome);
}

    

