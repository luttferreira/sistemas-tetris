# SISTEMAS-TETRIS
Sistema dockerizado simples com proxy reverso NGinx roteando para duas páginas: 
- localhost/resposta: Página estática apenas com uma imagem JPEG;
- localhost/tetris: Página contendo o jogo "Tetris" feito em HTML, CSS e Javascript, o qual possui um ranking salvo em um container MySQL. A comunicação entre o jogo e o Banco de Dados é feita via PHP.

Para iniciar o sistema, foi feito um arquivo docker-compose.yml que irá subir todos os 4 containers (nginx, db, tetris e resposta) ao se  executar o comando "docker-compose up --build".

# TELA DO JOGO
_localhost/tetris
![Image of tetris demo](https://github.com/luttferreira/sistemas-tetris/blob/master/tetris_demo.jpg)


# GAMEOVER E RANKING
![Image of ranking demo](https://github.com/luttferreira/sistemas-tetris/blob/master/ranking_demo.JPG)
