# Classic Arcade Game Clone

This file contains **instructions** on how to run the game and how to play the game.

## Run the Game
To run the game perform following steps
- Unzip frontend-nanodegree-arcade-game.zip file
- Go to frontend-nanodegree-arcade-game folder
- Open index.html file in the browser

## Game Components
The game has two entities: The Player and  Several enemies (Bugs) 
Game contains a grid like structure in which there are 6 rows and 5 columns.
The rows contains following elements:
- The topmost row is water.
- The next three rows are paved scene on which enemies with varying speeds are moving.
- The last two rows are grass scene. The player is initially placed at the last row in the third column.



## How to play the Game
The goal of the player is to reach the water, without colliding into any one of the enemies. 
The player can move left, right, up and down. 
Once a the player collides with an enemy, the game is reset and the player moves back to the start square. 
Once the player reaches the water the game is won.

## Scoring
Each time player reaches water, player gains 10 points.
If player collides with the enemy players looses all the points previously earned and score is reset to 0.
The Player can see scores on the topmost left corner, once he runs the game.



