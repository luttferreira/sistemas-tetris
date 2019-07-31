// Coordenadas de cada parte da peça (todas as peças apresentam 4 partes ao todo
var parte1Linha = 0;
var parte2Linha = 0;
var parte3Linha = 0;
var parte4Linha = 0;

var parte1Coluna = 0;
var parte2Coluna = 0;
var parte3Coluna = 0;
var parte4Coluna = 0;

var guardado1Linha = 0;
var	guardado1Coluna = 0;		

var	guardado2Linha = 0;
var	guardado2Coluna = 0;
		
var	guardado3Linha = 0;
var	guardado3Coluna = 0;
		
var	guardado4Linha = 0;
var	guardado4Coluna = 0;

// variavel que contem o Shape atual

var shapeInicial = Math.floor((Math.random()*7)+1);
var proximoShape = 0; // shape guardada para ser liberada quando a shape corrente parar

// id e rotacao do shape atual

var idShape = 0; // guarda o id de cada shape
var rotacao; // guarda o sentido de rotacao da shape
var inicializa = false; // a shape deve ser inicializada ou guardada como proxima?

var velocidade = 1000; // variavel auxiliar para aumentar a velocidade de queda ao se apertar a tecla de seta para baixo
var velocidadeNormal = 1000;
var nome = ""; //nome do jogador que quebrou um record
var pontuacao = 0; // variavel que guarda a pontuação do jogador
var nivel = 1; // quanto maior o nivel, mais rapido e dificil será o jogo
var animacao; // variavel que guarda a animacao corrente
var proximo = 0; // variavel que guarda a proxima linha que o Shape irá tentar ocupar
var continua = true; // deu game over?
var reset = false; // precisa resetar os dados para iniciar um novo jogo?

var conteudo; // cada shape vai ter um conteudo diferente durante a queda
var blocoEstatico; // cada shape vai ter um conteudo diferente depois que parar de cair

var colorido = ""; // cor da shape

var pontuacaoParcial = 0;
var combo = 0; // quanto mais linhas o jogador faz ao mesmo tempo, mais pontos ele ganha

var qtdShapes = 0; // quantas shapes já foram liberadas?

var bateuRecord = false; // se o jogador tiver batido algum record, vira true
var posicaoRanking = 0; //qual foi a posicao que o jogador ficou no ranking?

var textoParaSalvar = ""; // que texto deve ser salvo no cookie?
var textoDividido = ""; // texto divido

var pausado = false;

/////////////////////////////
// CAMPO DE TETRIS(10 x 20)//
/////////////////////////////
Matriz = new Array (20);

for (i = 0; i < Matriz.length; ++i)
	Matriz [i] = new Array (10);
	
// Inicializacao da matriz
	
for (x = 0; x < 20; x++)
{
	for (y = 0; y < 10; y++)
	{
	
		Matriz [x][y] = "";
	
	}

}

//////////////////////////
// PROXIMA SHAPE (5 x 5)//
//////////////////////////	
matrizProximo = new Array (5);

for (i = 0; i < matrizProximo.length; ++i)
	matrizProximo [i] = new Array (5);
	
// Inicializacao da matriz
	
for (x = 0; x < 5; x++)
{
	for (y = 0; y < 5; y++)
	{
	
		matrizProximo [x][y] = "";
	
	}

}

///////////////////
//RANKING (5 x 3)//
///////////////////
tabelaRanking = new Array (5);

for (i = 0; i < 5; ++i)
	tabelaRanking [i] = new Array (3);	

function inicializaRanking()
{
	var aux = 0;
	for (x = 0; x < 5; x++)
	{
		for (y = 0; y < 3; y++)
		{
		
			tabelaRanking[x][y] = textoDividido[aux];
			aux++;
		
		}
	}
	
	aux = 0;
}
// Percorre o Ranking para saber se o jogador bateu algum record

function percorreRanking(minhaPontuacao)
{
	
	//consultarRanking();
	
	for(u = 0; u < 5; u++)
	{
		if(!bateuRecord)
		{
			if(minhaPontuacao >= tabelaRanking[u][1])
			{
				
				posicaoRanking = u;
				bateuRecord = true;
			
			}
		}
	}
	
	
	if(bateuRecord)
	{
		for(v = 4; v > posicaoRanking; v--)
		{
		
			tabelaRanking[v][0] = tabelaRanking[v - 1][0];
			tabelaRanking[v][1] = tabelaRanking[v - 1][1];
			tabelaRanking[v][2] = tabelaRanking[v - 1][2];
			
		}
		
		tabelaRanking[posicaoRanking][0] = "<input type='text' id='nome' value='DIGITE SEU NOME' onchange='confirmaRecord()'>";
		tabelaRanking[posicaoRanking][1] = pontuacao;
		tabelaRanking[posicaoRanking][2] = "Nivel: " + nivel;
		
		bateuRecord = false;
		
	}
	else {document.getElementById("info").innerHTML = "<input type='button' value='Jogar Novamente' onclick='criaShapeAleatorio(shapeInicial)'>";}
	
	imprimeRanking(tabelaRanking);
	
}

// confirma o nome do jogador recordista

function confirmaRecord()
{

	nome = document.getElementById("nome");

	tabelaRanking[posicaoRanking][0] = nome.value;
	document.getElementById("nome").disabled = true;
	
	salvarRecord();
	
	document.getElementById("info").innerHTML = "<input type='button' value='Jogar Novamente' onclick='criaShapeAleatorio(shapeInicial)'>";
}

function splitTexto()
{

	textoDividido = textoParaSalvar.split(";");

}

//funcao para imprimir o Ranking

function imprimeRanking(array)
{
	var html = "";
	
	html = html + "<table border>";
	var linha;
	for (linha = 0; linha < array.length; ++linha)
	{
		html = html + " <tr>";
		var coluna;
		for (coluna = 0; coluna < array[linha].length; ++coluna)
		{					
			html = html + "  <td>" + array[linha][coluna] + "</td>";			
		}
		html = html + " </tr>";
	}
	html = html + "</table>";
	
	document.getElementById("ranking").innerHTML = html;
}

// Funcao para limpar a matriz ao se iniciar um novo jogo

function limpaMatriz(matrizSuja) 
{

	for (x = 0; x < matrizSuja.length; x++)
	{
		for (y = 0; y < matrizSuja[x].length; y++)
		{
			
			Matriz [x][y] = "";

		}

	}

}

// Limpa a matriz de proximo guardado

function limpaGuardado() 
{

	for (x = 0; x < 5; x++)
	{
		for (y = 0; y < 5; y++)
		{
			
			matrizProximo[x][y] = "";

		}

	}

}

// Funcao para imprimir o campo de Tetris, colorindo-o

function imprimeMatriz (tabelaEscolhida, array)
{
	var html = "";
	
	html = html + "<table border>";
	var linha;
	for (linha = 0; linha < array.length; ++linha)
	{
		html = html + " <tr>";
		var coluna;
		for (coluna = 0; coluna < array[linha].length; ++coluna)
		{
			if(array[linha][coluna] == "01" || array[linha][coluna] == "x1")
			{
				colorido = "gold"; //bloco
			}
			
			if(array[linha][coluna] == "02" || array[linha][coluna] == "x2")
			{
				colorido = "darkorange"; //L
			}
			
			if(array[linha][coluna] == "03" || array[linha][coluna] == "x3")
			{
				colorido = "darkorchid"; //T
			}
			
			if(array[linha][coluna] == "04" || array[linha][coluna] == "x4")
			{
				colorido = "limegreen"; //S
			}
			
			if(array[linha][coluna] == "05" || array[linha][coluna] == "x5")
			{
				colorido = "turquoise"; //Barra
			}
			
			if(array[linha][coluna] == "06" || array[linha][coluna] == "x6")
			{
				colorido = "blue"; //L-Invertido
			}
			
			if(array[linha][coluna] == "07" || array[linha][coluna] == "x7")
			{
				colorido = "red"; //S-Invertido
			}
			
			if(array[linha][coluna] == "") 
			{
				colorido = "GhostWhite";
			}
			
			if(linha == 19)
			{
				colorido = "cadetblue";
			}
			
			html = html + "  <td style='background-color:" + colorido + "; color:" + colorido + "'>" + array[linha][coluna] + "</td>";
			
		}
		html = html + " </tr>";
	}
	html = html + "</table>";
	
	document.getElementById(tabelaEscolhida).innerHTML = html;
}

// Funcao para inicializar um shape criado

function inicializaShape(_conteudo) 
{	
	
	if(inicializa)
	{
		Matriz[parte1Linha][parte1Coluna] = _conteudo;
		Matriz[parte2Linha][parte2Coluna] = _conteudo;
		Matriz[parte3Linha][parte3Coluna] = _conteudo;
		Matriz[parte4Linha][parte4Coluna] = _conteudo;
	
		animacao = setInterval("paraBaixo()", velocidadeNormal);
	}
	else
	{
		limpaGuardado();
	
		matrizProximo[guardado1Linha][guardado1Coluna -= 2] = _conteudo;
		matrizProximo[guardado2Linha][guardado2Coluna -= 2] = _conteudo;
		matrizProximo[guardado3Linha][guardado3Coluna -= 2] = _conteudo;
		matrizProximo[guardado4Linha][guardado4Coluna -= 2] = _conteudo;
		
		imprimeMatriz("proximoGuardado", matrizProximo);
	}
}

/////////////////////////////////////////////////		
// Funcoes para criar diferentes tipos de Shape//
/////////////////////////////////////////////////
function criaBlockShape () 
{

	idShape = 1;
	conteudo = "01";
	blocoEstatico = "x1";
	rotacao = 1;
	
	if(inicializa)
	{
		parte1Linha = 0;
		parte1Coluna = 3;
		
		parte2Linha = 0;
		parte2Coluna = 4;
		
		parte3Linha = 1;
		parte3Coluna = 3;
		
		parte4Linha = 1;
		parte4Coluna = 4;
	}
	else
	{
		guardado1Linha = 2;
		guardado1Coluna = 3;
		
		guardado2Linha = 2;
		guardado2Coluna = 4;
		
		guardado3Linha = 3;
		guardado3Coluna = 3;
		
		guardado4Linha = 3;
		guardado4Coluna = 4;
		
	}
	
	inicializaShape(conteudo);
	
}

function criaLShape() 
{
	idShape = 2;
	conteudo = "02";
	blocoEstatico = "x2";
	rotacao = 1;
	
if(inicializa)
{
	parte1Linha = 0;
	parte1Coluna = 5;
	
	parte2Linha = 1;
	parte2Coluna = 3;
	
	parte3Linha = 1;
	parte3Coluna = 4;
	
	parte4Linha = 1;
	parte4Coluna = 5;
}
else
{
	
	guardado1Linha = 2;
	guardado1Coluna = 5;
	
	guardado2Linha = 3;
	guardado2Coluna = 3;
	
	guardado3Linha = 3;
	guardado3Coluna = 4;
	
	guardado4Linha = 3;
	guardado4Coluna = 5;

}
	inicializaShape(conteudo);
	
}

function criaTShape () 
{

	idShape = 3;
	conteudo = "03";
	blocoEstatico = "x3";
	rotacao = 1;
	
	if(inicializa)
	{
		parte1Linha = 0;
		parte1Coluna = 4;
		
		parte2Linha = 1;
		parte2Coluna = 3;
		
		parte3Linha = 1;
		parte3Coluna = 4;
		
		parte4Linha = 1;
		parte4Coluna = 5;
	}
	else
	{				
		guardado1Linha = 2;
		guardado1Coluna = 4;
		
		guardado2Linha = 3;
		guardado2Coluna = 3;
		
		guardado3Linha = 3;
		guardado3Coluna = 4;
		
		guardado4Linha = 3;
		guardado4Coluna = 5;				
	}
	inicializaShape(conteudo);
	
}

function criaSShape () 
{

	idShape = 4;
	conteudo = "04";
	blocoEstatico = "x4";
	rotacao = 1;
	
	if(inicializa)
	{
		parte1Linha = 0;
		parte1Coluna = 3;
		
		parte2Linha = 1;
		parte2Coluna = 3;
		
		parte3Linha = 1;
		parte3Coluna = 4;
		
		parte4Linha = 2;
		parte4Coluna = 4;
	}
	else
	{
		guardado1Linha = 1;
		guardado1Coluna = 3;
		
		guardado2Linha = 2;
		guardado2Coluna = 3;
		
		guardado3Linha = 2;
		guardado3Coluna = 4;
		
		guardado4Linha = 3;
		guardado4Coluna = 4;	
	}
	
	inicializaShape(conteudo);
	
}

function criaBarShape () 
{
	idShape = 5;
	conteudo = "05";
	blocoEstatico = "x5";
	rotacao = 1;
	
	if(inicializa)
	{
		parte1Linha = 1;
		parte1Coluna = 2;
		
		parte2Linha = 1;
		parte2Coluna = 3;
		
		parte3Linha = 1;
		parte3Coluna = 4;
		
		parte4Linha = 1;
		parte4Coluna = 5;
	}
	else
	{
		guardado1Linha = 3;
		guardado1Coluna = 3;
		
		guardado2Linha = 3;
		guardado2Coluna = 4;
		
		guardado3Linha = 3;
		guardado3Coluna = 5;
		
		guardado4Linha = 3;
		guardado4Coluna = 6;
	}
	
	inicializaShape(conteudo);

}

function criaLShapeInvertido () 
{
	idShape = 6;
	conteudo = "06";
	blocoEstatico = "x6";
	rotacao = 1;
	
	if(inicializa)
	{
		parte1Linha = 0;
		parte1Coluna = 3;
		
		parte2Linha = 1;
		parte2Coluna = 3;
		
		parte3Linha = 1;
		parte3Coluna = 4;
		
		parte4Linha = 1;
		parte4Coluna = 5;
	}
	else
	{
		guardado1Linha = 2;
		guardado1Coluna = 3;
		
		guardado2Linha = 3;
		guardado2Coluna = 3;
		
		guardado3Linha = 3;
		guardado3Coluna = 4;
		
		guardado4Linha = 3;
		guardado4Coluna = 5;
	}
	
	inicializaShape(conteudo);

}

function criaSShapeInvertido () 
{

	idShape = 7;
	conteudo = "07";
	blocoEstatico = "x7";
	rotacao = 1;
	
	if(inicializa)
	{
		parte1Linha = 0;
		parte1Coluna = 4;
		
		parte2Linha = 1;
		parte2Coluna = 3;
		
		parte3Linha = 1;
		parte3Coluna = 4;
		
		parte4Linha = 2;
		parte4Coluna = 3;
	}
	else
	{
		guardado1Linha = 1;
		guardado1Coluna = 4;
		
		guardado2Linha = 2;
		guardado2Coluna = 3;
		
		guardado3Linha = 2;
		guardado3Coluna = 4;
		
		guardado4Linha = 3;
		guardado4Coluna = 3;
	}
	inicializaShape(conteudo);
	
}

// Funções para animar e controlar as peças do jogo

function paraBaixo ()
{
	
	if(!pausado)
	{
	
		verificaInterseccao();
		
		if(proximo != 19)
		{	
		
			Matriz[parte1Linha][parte1Coluna] = "";
			Matriz[parte2Linha][parte2Coluna] = "";
			Matriz[parte3Linha][parte3Coluna] = "";
			Matriz[parte4Linha][parte4Coluna] = "";
		
			parte1Linha++;
			parte2Linha++;
			parte3Linha++;
			parte4Linha++;
			
			proximo = parte4Linha + 1;
			
			Matriz[parte1Linha][parte1Coluna] = conteudo;
			Matriz[parte2Linha][parte2Coluna] = conteudo;
			Matriz[parte3Linha][parte3Coluna] = conteudo;
			Matriz[parte4Linha][parte4Coluna] = conteudo;
			
			imprimeMatriz("tabela", Matriz);
			
		}
		else 
		{
			
			clearInterval(animacao);
			
			Matriz[parte1Linha][parte1Coluna] = blocoEstatico;
			Matriz[parte2Linha][parte2Coluna] = blocoEstatico;
			Matriz[parte3Linha][parte3Coluna] = blocoEstatico;
			Matriz[parte4Linha][parte4Coluna] = blocoEstatico;
			
			proximo = 0;
			
			verificaLinhaCompleta();

			imprimeMatriz("tabela", Matriz);
			
			continua = gameOver();
			
			if(continua)		
				criaShapeAleatorio(proximoShape);
		}
	}				
}

function moverDireita() 
{
	if(parte1Coluna < 9 && parte2Coluna < 9 && parte3Coluna < 9 && parte4Coluna < 9) 
	{			
		if((Matriz[parte1Linha][parte1Coluna + 1] != "x1" && Matriz[parte2Linha][parte2Coluna + 1] != "x1" && Matriz[parte3Linha][parte3Coluna + 1] != "x1" && Matriz[parte4Linha][parte4Coluna + 1] != "x1") && (Matriz[parte1Linha][parte1Coluna + 1] != "x2" && Matriz[parte2Linha][parte2Coluna + 1] != "x2" && Matriz[parte3Linha][parte3Coluna + 1] != "x2" && Matriz[parte4Linha][parte4Coluna + 1] != "x2") && (Matriz[parte1Linha][parte1Coluna + 1] != "x3" && Matriz[parte2Linha][parte2Coluna + 1] != "x3" && Matriz[parte3Linha][parte3Coluna + 1] != "x3" && Matriz[parte4Linha][parte4Coluna + 1] != "x3") && (Matriz[parte1Linha][parte1Coluna + 1] != "x4" && Matriz[parte2Linha][parte2Coluna + 1] != "x4" && Matriz[parte3Linha][parte3Coluna + 1] != "x4" && Matriz[parte4Linha][parte4Coluna + 1] != "x4") && (Matriz[parte1Linha][parte1Coluna + 1] != "x5" && Matriz[parte2Linha][parte2Coluna + 1] != "x5" && Matriz[parte3Linha][parte3Coluna + 1] != "x5" && Matriz[parte4Linha][parte4Coluna + 1] != "x5") && (Matriz[parte1Linha][parte1Coluna + 1] != "x6" && Matriz[parte2Linha][parte2Coluna + 1] != "x6" && Matriz[parte3Linha][parte3Coluna + 1] != "x6" && Matriz[parte4Linha][parte4Coluna + 1] != "x6") && (Matriz[parte1Linha][parte1Coluna + 1] != "x7" && Matriz[parte2Linha][parte2Coluna + 1] != "x7" && Matriz[parte3Linha][parte3Coluna + 1] != "x7" && Matriz[parte4Linha][parte4Coluna + 1] != "x7"))
		{
			Matriz[parte1Linha][parte1Coluna] = "";
			Matriz[parte2Linha][parte2Coluna] = "";
			Matriz[parte3Linha][parte3Coluna] = "";
			Matriz[parte4Linha][parte4Coluna] = "";
			
			parte1Coluna++;
			parte2Coluna++;
			parte3Coluna++;
			parte4Coluna++;
			
			Matriz[parte1Linha][parte1Coluna] = conteudo;
			Matriz[parte2Linha][parte2Coluna] = conteudo;
			Matriz[parte3Linha][parte3Coluna] = conteudo;
			Matriz[parte4Linha][parte4Coluna] = conteudo;
			
			imprimeMatriz("tabela", Matriz);
		}
	}
}

function moverEsquerda() 
{
	if(parte1Coluna >= 1 && parte2Coluna >= 1 && parte3Coluna >= 1 && parte4Coluna >= 1)
	{
		if((Matriz[parte1Linha][parte1Coluna - 1] != "x1" && Matriz[parte2Linha][parte2Coluna - 1] != "x1" && Matriz[parte3Linha][parte3Coluna - 1] != "x1" && Matriz[parte4Linha][parte4Coluna - 1] != "x1") && (Matriz[parte1Linha][parte1Coluna - 1] != "x2" && Matriz[parte2Linha][parte2Coluna - 1] != "x2" && Matriz[parte3Linha][parte3Coluna - 1] != "x2" && Matriz[parte4Linha][parte4Coluna - 1] != "x2") && (Matriz[parte1Linha][parte1Coluna - 1] != "x3" && Matriz[parte2Linha][parte2Coluna - 1] != "x3" && Matriz[parte3Linha][parte3Coluna - 1] != "x3" && Matriz[parte4Linha][parte4Coluna - 1] != "x3") && (Matriz[parte1Linha][parte1Coluna - 1] != "x4" && Matriz[parte2Linha][parte2Coluna - 1] != "x4" && Matriz[parte3Linha][parte3Coluna - 1] != "x4" && Matriz[parte4Linha][parte4Coluna - 1] != "x4") && (Matriz[parte1Linha][parte1Coluna - 1] != "x5" && Matriz[parte2Linha][parte2Coluna - 1] != "x5" && Matriz[parte3Linha][parte3Coluna - 1] != "x5" && Matriz[parte4Linha][parte4Coluna - 1] != "x5") && (Matriz[parte1Linha][parte1Coluna - 1] != "x6" && Matriz[parte2Linha][parte2Coluna - 1] != "x6" && Matriz[parte3Linha][parte3Coluna - 1] != "x6" && Matriz[parte4Linha][parte4Coluna - 1] != "x6") && (Matriz[parte1Linha][parte1Coluna - 1] != "x7" && Matriz[parte2Linha][parte2Coluna - 1] != "x7" && Matriz[parte3Linha][parte3Coluna - 1] != "x7" && Matriz[parte4Linha][parte4Coluna - 1] != "x7"))
		{
			Matriz[parte1Linha][parte1Coluna] = "";
			Matriz[parte2Linha][parte2Coluna] = "";
			Matriz[parte3Linha][parte3Coluna] = "";
			Matriz[parte4Linha][parte4Coluna] = "";
			
			parte1Coluna--;
			parte2Coluna--;
			parte3Coluna--;
			parte4Coluna--;
			
			Matriz[parte1Linha][parte1Coluna] = conteudo;
			Matriz[parte2Linha][parte2Coluna] = conteudo;
			Matriz[parte3Linha][parte3Coluna] = conteudo;
			Matriz[parte4Linha][parte4Coluna] = conteudo;
			
			imprimeMatriz("tabela", Matriz);
		}
	}
}

// Funcao para fazer as shapes cairem mais rapido ao se apertar para baixo

function aumentaVelocidade() 
{

	if(velocidade != 50)
	{
		clearInterval(animacao);
		
		velocidade = 50;
		
		animacao = setInterval("paraBaixo()", velocidade);
	}
}

// Volta a velocidade normal ao se soltar a seta para baixo

function normalizaVelocidade() 
{

	clearInterval(animacao);
	
	velocidade = 0;
	
	animacao = setInterval("paraBaixo()", velocidadeNormal);
	
}

function rotacionaShape()
{

	Matriz[parte1Linha][parte1Coluna] = "";
	Matriz[parte2Linha][parte2Coluna] = "";
	Matriz[parte3Linha][parte3Coluna] = "";
	Matriz[parte4Linha][parte4Coluna] = "";
	
	switch(idShape)
	{
		case 2:
		{
		
			if(rotacao == 1)
			{
				parte1Coluna--;
				parte2Linha--;
				parte2Coluna += 2;
				parte3Coluna++;
				parte4Linha++;
				
				rotacao = 2;
				
				break;
			}
			
			if(rotacao == 2)
			{
			
				if(parte4Coluna == 1)
				{
					parte1Coluna++;
					parte2Coluna++;
					parte3Coluna++;
					parte4Coluna++;
				}
			
				parte1Coluna--;
				parte2Coluna--;
				parte3Linha--;
				parte4Linha--;
				parte4Coluna -= 2;
				
				rotacao = 3;
				
				break;
			}
			
			if(rotacao == 3)
			{
				parte1Coluna++;
				parte2Linha++;
				parte3Linha += 2;
				parte3Coluna--;
				parte4Linha++;
				parte4Coluna += 2;
				
				rotacao = 4;
				
				break;
			}
			
			if(rotacao == 4)
			{
			
				if(parte4Coluna == 1)
				{
					parte1Coluna++;
					parte2Coluna++;
					parte3Coluna++;
					parte4Coluna++;
				}
			
				parte1Coluna++;
				parte2Coluna--;
				parte3Linha--;
				parte4Linha--;
				
				rotacao = 1;
				
				break;
			}
			
		}
		
		case 3:
		{
			if(rotacao == 1)
			{
				parte2Coluna++;
				parte3Coluna++;
				parte4Linha++;
				parte4Coluna--;
				
				rotacao = 2;
				break;	
			}
			
			if(rotacao == 2)
			{
				if(parte4Coluna == 0)
				{
					parte1Coluna++;
					parte2Coluna++;
					parte3Coluna++;
					parte4Coluna++;
				}
				
				parte1Linha++;
				parte1Coluna--;
										
				rotacao = 3;
				break;	
			}
			
			if(rotacao == 3)
			{
				parte1Linha--;
				parte1Coluna++;
				parte2Coluna--;
				parte3Coluna--;
										
				rotacao = 4;
				break;	
			}

			if(rotacao == 4)
			{
			
				if(parte4Coluna == 9)
				{
					parte1Coluna--;
					parte2Coluna--;
					parte3Coluna--;
					parte4Coluna--;
				}
				
				parte4Linha--;
				parte4Coluna++;
																	
				rotacao = 1;
				break;	
			}
						
		}
		
		case 4:
		{
		
			if(rotacao == 1)
			{	
				if(parte4Coluna == 9)
				{
				
					parte1Coluna--;
					parte2Coluna--;
					parte3Coluna--;
					parte4Coluna--;
				
				}
				
				parte1Coluna++;
				parte2Linha--;
				parte2Coluna += 2;
				parte3Coluna--;
				parte4Linha--;
				
				rotacao = 2;
				
				break;							
			}
			
			if(rotacao == 2)
			{
			
				parte1Coluna--;
				parte2Linha++;
				parte2Coluna -= 2;
				parte3Coluna++;
				parte4Linha++;
				
				rotacao = 1;
				
				break;
			
			}
		
		}
						
		case 5:
		{
			if(rotacao == 1)
			{
				parte1Linha--;
				parte1Coluna++;
				parte3Linha++;
				parte3Coluna--;
				parte4Linha += 2;
				parte4Coluna -= 2;
				
				rotacao = 2;
				break;
			}
			
			if(rotacao == 2)
			{
				if(parte1Coluna == 9)
					{
						parte1Coluna -= 2;
						parte2Coluna -= 2;
						parte3Coluna -= 2;
						parte4Coluna -= 2;
					}
					
					if(parte1Coluna == 8)
					{
						parte1Coluna--;
						parte2Coluna--;
						parte3Coluna--;
						parte4Coluna--;
					}
					
					if(parte1Coluna == 0)
					{
						parte1Coluna++;
						parte2Coluna++;
						parte3Coluna++;
						parte4Coluna++;
					}
			
				parte1Linha++;
				parte1Coluna--;
				parte3Linha--;
				parte3Coluna++;
				parte4Linha -= 2;
				parte4Coluna += 2;
				
				rotacao = 1;
				break;
			}
		
		}
		
		case 6:
		{
		
			if(rotacao == 1)
			{
			
				parte2Linha--;
				parte2Coluna++;
				parte3Coluna--;
				parte4Linha++;
				parte4Coluna -= 2;
				
				rotacao = 2;
				
				break;
			}
			
			if(rotacao == 2)
			{
			
				if(parte1Coluna == 8)
				{
						parte1Coluna--;
						parte2Coluna--;
						parte3Coluna--;
						parte4Coluna--;
				}
			
				parte3Linha--;
				parte3Coluna += 2;
				parte4Linha--;
				parte4Coluna += 2;
				
				rotacao = 3;
				
				break;
			}
			
			if(rotacao == 3)
			{
			
				parte1Coluna++;
				parte2Linha++;
				parte3Linha += 2;
				parte3Coluna -= 2;
				parte4Linha++;
				parte4Coluna--;
				
				rotacao = 4;
				
				break;
			}
			
			if(rotacao == 4)
			{
				
				if(parte1Coluna == 9)
				{
					parte1Coluna--;
					parte2Coluna--;
					parte3Coluna--;
					parte4Coluna--;
				}
				
				parte1Coluna--;
				parte2Coluna--;
				parte3Linha--;
				parte3Coluna++;
				parte4Linha--;
				parte4Coluna++;
				
				rotacao = 1;
				
				break;
			}
			
		}
		
		case 7:
		{
		
			if(rotacao == 1)
			{	
				if(parte4Coluna == 8)
				{
				
					parte1Coluna--;
					parte2Coluna--;
					parte3Coluna--;
					parte4Coluna--;
				
				}
				
				parte1Coluna--;
				parte2Linha--;
				parte2Coluna++;
				parte4Linha--;
				parte4Coluna += 2;
				
				rotacao = 2;
				
				break;							
			}
			
			if(rotacao == 2)
			{
			
				parte1Coluna++;
				parte2Linha++;
				parte2Coluna--;
				parte4Linha++;
				parte4Coluna -= 2;
				
				rotacao = 1;
				
				break;
			
			}
		
		}
	}
	
	Matriz[parte1Linha][parte1Coluna] = conteudo;
	Matriz[parte2Linha][parte2Coluna] = conteudo;
	Matriz[parte3Linha][parte3Coluna] = conteudo;
	Matriz[parte4Linha][parte4Coluna] = conteudo;
			
	imprimeMatriz("tabela", Matriz);
				
}

	// Capta as teclas pressionadas pelo jogador
document.onkeydown = function(evt) 
{

	evt = evt || window.event;
	switch (evt.keyCode) 
	{
		case 13:
			pausado = !pausado;
			esconderTabela();
			break;
		case 32:
			if(continua && !pausado)
				rotacionaShape();
			break;
		case 37:
			if(continua && !pausado)
				moverEsquerda();
			break;
		case 39:
			if(continua && !pausado)
				moverDireita();
			break;
		case 40:
			if(continua && !pausado)
				aumentaVelocidade();
			break;

	}
}

document.onkeyup = function(evt)
{

	evt = evt || window.event;
	switch (evt.keyCode) 
	{
	
		case 40:
			if(continua)
				normalizaVelocidade();
			break;

	}
}

// Funcao para criar Shapes aleatoriamente

function criaShapeAleatorio(shapeRandomico)
{
	
	document.getElementById("dados").innerHTML = "";
	
	qtdShapes++;
	
	if(qtdShapes == 20 || qtdShapes == 50 || qtdShapes == 100 || qtdShapes == 150 || qtdShapes == 210 || qtdShapes == 280 || qtdShapes == 350)
	{
		velocidadeNormal -= 125;
					
		document.getElementById("nivel").innerHTML = "Nivel: " + ++nivel;
	}
	
	if(qtdShapes == 450)
	{
	
		velocidadeNormal -= 62;
					
		document.getElementById("nivel").innerHTML = "Nivel: " + ++nivel;
	
	}
	
	if(reset)
	{			

		consultarRanking();
		continua = true;
		pausado = false;
		
		document.getElementById("nivel").innerHTML = "Nivel: 1";
		document.getElementById("pontuacao").innerHTML = "Pontos: 0";
		document.getElementById("ranking").innerHTML = "";
		document.getElementById("info").innerHTML = "";
		
		pontuacao = 0;
		nivel = 1;
		
		document.getElementById('tabela').style.visibility = 'visible';
		
		reset = false;
	}
	
	proximoShape = Math.floor((Math.random()*7)+1);
	
	inicializa = false;
	
	switch(proximoShape)
	{	
		case 1:
		  criaBlockShape();
		  break;
		case 2:
		  criaLShape();
		  break;
		case 3:
		  criaTShape();
		  break;
		case 4:
		  criaSShape();
		  break;
		case 5:
		  criaBarShape();
		  break;
		 case 6:
		  criaLShapeInvertido();
		  break;
		 case 7:
		  criaSShapeInvertido();
		  break;
	
	}
	
	inicializa = true;
	
	switch(shapeRandomico)
	{
	
		case 1:
		  criaBlockShape();
		  break;
		case 2:
		  criaLShape();
		  break;
		case 3:
		  criaTShape();
		  break;
		case 4:
		  criaSShape();
		  break;
		case 5:
		  criaBarShape();
		  break;
		 case 6:
		  criaLShapeInvertido();
		  break;
		case 7:
		  criaSShapeInvertido();
		  break;
	
	}

}

// Funcao que verifica se um Shape está colidindo com outro

function verificaInterseccao()
{

	if(Matriz[parte1Linha + 1][parte1Coluna] == "x1" || Matriz[parte2Linha + 1][parte2Coluna] == "x1" || Matriz[parte3Linha + 1][parte3Coluna] == "x1" || Matriz[parte4Linha + 1][parte4Coluna] == "x1" || Matriz[parte1Linha + 1][parte1Coluna] == "x2" || Matriz[parte2Linha + 1][parte2Coluna] == "x2" || Matriz[parte3Linha + 1][parte3Coluna] == "x2" || Matriz[parte4Linha + 1][parte4Coluna] == "x2" || Matriz[parte1Linha + 1][parte1Coluna] == "x3" || Matriz[parte2Linha + 1][parte2Coluna] == "x3" || Matriz[parte3Linha + 1][parte3Coluna] == "x3" || Matriz[parte4Linha + 1][parte4Coluna] == "x3" || Matriz[parte1Linha + 1][parte1Coluna] == "x4" || Matriz[parte2Linha + 1][parte2Coluna] == "x4" || Matriz[parte3Linha + 1][parte3Coluna] == "x4" || Matriz[parte4Linha + 1][parte4Coluna] == "x4" || Matriz[parte1Linha + 1][parte1Coluna] == "x5" || Matriz[parte2Linha + 1][parte2Coluna] == "x5" || Matriz[parte3Linha + 1][parte3Coluna] == "x5" || Matriz[parte4Linha + 1][parte4Coluna] == "x5" || Matriz[parte1Linha + 1][parte1Coluna] == "x6" || Matriz[parte2Linha + 1][parte2Coluna] == "x6" || Matriz[parte3Linha + 1][parte3Coluna] == "x6" || Matriz[parte4Linha + 1][parte4Coluna] == "x6" || Matriz[parte1Linha + 1][parte1Coluna] == "x7" || Matriz[parte2Linha + 1][parte2Coluna] == "x7" || Matriz[parte3Linha + 1][parte3Coluna] == "x7" || Matriz[parte4Linha + 1][parte4Coluna] == "x7")
		proximo = 19;
}

// Verifica se existem linhas completas na matriz. Em caso afirmativo, destroi a linha e desce tudo o que esta acima

function verificaLinhaCompleta()
{
	var acumulador = 0;
	
	for (i = 0; i < 20; i++)
	{
		for (j = 0; j < 10; j++)
		{
			if(Matriz [i][j] == "x1" || Matriz [i][j] == "x2" || Matriz [i][j] == "x3" || Matriz [i][j] == "x4" || Matriz [i][j] == "x5" || Matriz [i][j] == "x6" || Matriz [i][j] == "x7")
				acumulador++;
			
			if(acumulador == 10)
			{
				acumulador = 0;
				pontuacaoParcial += 100;
				
				destroiLinha(i);
				
				combo++;
			}
		}
		
		clearInterval(animacao);
		
		velocidade = velocidadeNormal;
		
		acumulador = 0;

	}
	
	pontuacaoParcial = pontuacaoParcial * combo * nivel;
	pontuacao = pontuacao + pontuacaoParcial;
	
	document.getElementById("pontuacao").innerHTML = "Pontos: " + pontuacao;
	
	pontuacaoParcial = 0;
	combo = 0;

}

// Funcao que destroi linhas e desce tudo acima dela

function destroiLinha(linha)
{
	
	for (a = linha; a > 0; a--)
	{
		for (b = 0; b < 10; b++)
		{
			Matriz[a][b] = Matriz[a - 1][b];
		}

	}
				
}

// Verifica se o jogo terminou

function gameOver()
{

	for (z = 0; z < 10; z++)
	{
	
		if(Matriz[0][z] == "x1" || Matriz[0][z] == "x2" || Matriz[0][z] == "x3" || Matriz[0][z] == "x4" || Matriz[0][z] == "x5" || Matriz[0][z] == "x6" || Matriz[0][z] == "x7")
		{	
			limpaMatriz(Matriz);
			
			document.getElementById("tabela").innerHTML = "GAME OVER";
			
			shapeInicial = Math.floor((Math.random()*7)+1);
			
			qtdShapes = 0;
				
			velocidadeNormal = 1000;
			
			reset = true;
			
			document.getElementById("proximoGuardado").innerHTML = "";
			
			percorreRanking(pontuacao);	
			
			return false;
		}
		
	}
	
	return true;
}

function esconderTabela() 
{

	if(pausado)
		document.getElementById('tabela').style.visibility = 'hidden';
	else document.getElementById('tabela').style.visibility = 'visible';
}

// Inicio do jogo!

criaShapeAleatorio(shapeInicial);

//////////////////////////////////////////////
//    AJAX (usado para salvar o Ranking)    //
//////////////////////////////////////////////

function consultarRanking() {
	
	var xhttp;
	xhttp = new XMLHttpRequest();
	
	xhttp.onreadystatechange = function() {
		
		if (this.readyState == 4 && this.status == 200) {
			
			textoParaSalvar = this.responseText;
			
			splitTexto();
	
			inicializaRanking();
		}
	};
	
	xhttp.open("GET", "/ranking", true);
	xhttp.send();
}

function salvarRecord() {
	
	var xhttp = new XMLHttpRequest();
	
	xhttp.onreadystatechange = function() {
		
		if (this.readyState == 4 && this.status == 200) {
			
			document.getElementById("dados").innerHTML = this.responseText;
			
		}
	}
	
	xhttp.open("POST", "/salvarecord", true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send("nome=" + nome.value + "&pontuacao=" + pontuacao + "&nivel=" + nivel);

}