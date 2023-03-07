# combate_game
Description:

An online multiplayer board game implementation of the classic Brazilian Combate game. 
Made with React, Node js, and Socket-io and deployed with Heroku app at: 
https://combategame1998.herokuapp.com

Rules:

The game Combate consists of a board of 10x10, and two teams (Red and Blue) 
each team has 40 pieces representing the different army ranks (soldier, corporal, 
sergeant, captain, blue-tenent, general, etc). 
The objective of the game is to capture the enemy flag before he captures yours, 
each player on its turn needs to move a piece and/or attack an enemy piece. 
The piece's rank determines the outcome of an attack, 
where the bigger rank kills the smaller rank with a few exceptions (spy & 5 star general, and corporal & bombs). 

Deployment Phase

Each player must deploy its troops before the game starts on any formation that they see fit according to their strategy. 
The Red player must deploy its troops on the first 4 rows of the board (from top to button) and the Blue player on the last 4 rows of the board. 
Once both players are done deploying, they must click the Start Game button to begin playing.

Attack 

When a player decides to attack, the outcome is decided based on pieces’ rank. 
If both pieces have the same rank both die, if they are different, however, the piece with the bigger rank wins the attack. 
The two exceptions to the rule are: the spy that has a rank of one but when in combat with a 5 star General it kills it, 
and the corporal and a bomb, bombs kill any piece that dares to attack it, with the exception of the corporal who can disarm it.

Ranks:
1 - spy 
2 - soldier
3 - corporal
4 - sargent
5 - tenant
6 - captain
7 - major
8 - colonel
9 - general
10 - 5 star general

