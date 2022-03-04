// GAME STATES
//      * State number of the round
// "WIN" - Player robot has defeated all enemy robots
//      * Fight all enemy robots
//      * Defeat each enemy robot
// "LOSE" - Player's health is zero or less
//      * Game over

    // generate random numeric value
var randomNumber = function(min, max) {
    /* var value = Math.floor(Math.random() * 21) + 40;
    * (Math.rand() * 21) = random number decimal between 0 and 20.xx, plus 40 to ensure that 40 is the minimum, 60 max
    * Math.floor rounds the number down to avoid decimals 
    * using [ var value = Math.floor(Math.random() * (max - min + 1) + min); ] allows us to set max and min parameters instead
    * ex: function(40, 60) sets the min 40 and max 60
    */
    var value = Math.floor(Math.random() * (max - min + 1) + min);
        // return statement creates a method that gives a string that can be stored in a variable to be called elsewhere, ALSO ends the function
    return value;
};

    // function to check if player wants to fight or skip
var fightOrSkip = function() {
        // ask player to fight or run
    var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");
    
        // conditional recursive function
        // can also be written [[ if (!promptFight) ]]
    if (promptFight === "" || promptFight === null) {
        window.alert("You must enter a valid response. Try again.");
        return fightOrSkip();
    }
        // .toLowerCase() changes input to always lowercase characters
    promptFight = promptFight.toLowerCase();

    if (promptFight === "skip") {
            // confirm player wants to skip
        var confirmSkip = window.confirm("Are you sure you'd like to quit?");

        if (confirmSkip) {
            window.alert(playerInfo.name + " has chosen to skip the fight! BOO!");
            window.alert("Too bad. You still owe the entry fee. You now have " + playerInfo.money + " dollars left.");
            playerInfo.money = Math.max(0, playerInfo.money - 10);

            return true;
        }
    }
    return false;
};


    // battle round (with enemyName as a parameter)
var fight = function(enemy) {
        // keep track of who goes first
    var isPlayerTurn = true;

        // randomize turn order
    if (Math.random() > 0.5) {
        isPlayerTurn = false;
    }

        // while loop to call and execute fight function only if the player's health is > 0 AND enemy's health > 0
    while(playerInfo.health > 0 && enemy.health > 0) {

        if (isPlayerTurn) {

            if (fightOrSkip()) {
                // if true, leave break loop and leave fight
            break;
            }
    
            var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);

            enemy.health = Math.max(0, enemy.health - damage);
            console.log(
                playerInfo.name + 
                " attacked " + 
                enemy.name + 
                "! " + 
                enemy.name + 
                " now has " + 
                enemy.health + 
                " health remaining."
            );

                // check ENEMY health, break while() loop if <= 0, get reward
            if (enemy.health <= 0) {
                window.alert(enemy.name + " has been defeated!");
                    // award player money for winning
                playerInfo.money = playerInfo.money + 20;
                    // break loop since enemy is dead
                break;
                    // otherwise alert with enemy's remaining health, continue while() loop
            }
            else {
                window.alert(enemy.name + " still has " + enemy.health + " health left!");
            }
        }
        else {
            var damage = randomNumber(enemy.attack - 3, enemy.attack);

            playerInfo.health = Math.max(0, playerInfo.health - damage);
            console.log(
                "Ouch! " + 
                enemy.name + 
                " hit " + 
                playerInfo.name + 
                " back! " + 
                playerInfo.name + 
                " now has " + 
                playerInfo.health + 
                " health remaining!"
            );

                // check PLAYER health, break while() loop if <= 0 (dead)
            if (playerInfo.health <= 0) {
                window.alert(playerInfo.name + " has died!");
                break;
                    // otherwise alert with player's remaining health, continue while() loop
            }
            else {
                window.alert(playerInfo.name + " still has " + playerInfo.health + " health left!");
            }
        }
        
            // switch turn order for next round
        isPlayerTurn = !isPlayerTurn;
    }
};
        
var startGame = function() {
        // reset player stats each new game using the reset function inside the playerInfo object
    playerInfo.reset();

        // for loop that calls the fight function and loops to allow the player to fight every enemy robot (one at a time)
    for(var i = 0; i < enemyInfo.length; i++) {
        console.log(playerInfo);

            // check state of player robot's health, if playerInfo.health > 0 (alive) keep fighting
        if (playerInfo.health > 0) {
                // display current round, (i + 1) used since i = 0 and there is no Round 0
            window.alert("Welcome to Robot Gladiators! ROUND " + ( i + 1 ));

                // pick new enemy based on the enemyInfo array index
            var pickedEnemyObj = enemyInfo[i];

                // reset enemy health to random number between 40 (min) and 60 (max)
            pickedEnemyObj.health = randomNumber(40, 60);
            
            console.log(pickedEnemyObj);

                // pass the pickedEnemyName variable into the fight function where it will assume the value of the enemyName parameter
            fight(pickedEnemyObj);

                // after the fight function is completed, if the player is alive AND there are still enemies to fight, enter shop
            if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
                var storeConfirm = window.confirm("The first is over, visit the store before the next round?");
                    // execute shop() function
                if (storeConfirm) {
                    shop();
                }
            }
        }
        else {
                // if playerInfo.health < 0 (dead), stop game
            window.alert("You have lost your robot in battle! Game Over, man!");
            break;
        }
    }
        // after loop ends, we are either out of health or enemies, execute endGame()
    endGame();
};

    // function to end game and store high score
var endGame = function() {
    window.alert("The game has ended, let's see how you did!");

        // check localStorage for high score, if null use 0
    var highScore = localStorage.getItem("highscore");
    if (highScore === null) {
        highScore = 0;
    }
        // if player has more money than high score, player has new high score
    if (playerInfo.money > highScore) {
        localStorage.setItem("highscore", playerInfo.money);
        localStorage.setItem("name", playerInfo.name);

        alert(playerInfo.name + " now has the high score of " + playerInfo.money + "!");
    }
    else {
        alert(playerInfo.name + " did not beat the high score of " + highScore + ". Git gud!");
    }
    
        // ask if player would like to replay
    var playAgainConfirm = window.confirm("Would you like to play again?");

    if (playAgainConfirm) {
            // restart game on confirm (yes/true)
        startGame();
    }
    else {
        window.alert("Thanks for playing Robot Gladiators! Come back soon!");
    }
};

    // shop function to be called between battles
var shop = function() {
        // ask player what they want to do
    var shopOptionPrompt = window.prompt(
        "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the shop? Please enter 1 for REFILL, 2 for UPGRADE or 3 for LEAVE."
    );
        // parseInt() converts inputed string values to integers
    shopOptionPrompt = parseInt(shopOptionPrompt);

        // switch cases for prompt inputs
    switch (shopOptionPrompt) {
        case 1:
            playerInfo.refillHealth();
            break;
        case 2:
            playerInfo.upgradeAttack();
            break;
        case 3:
            window.alert("Thank you, come again!");
            break;
        default:
            window.alert("You did not pick a valid option. Try again.");
            shop();
            break;
    }
};

    // function to set name
var getPlayerName = function() {
        // remember to initialize the var before the loop to guarantee entering loop at least once to run prompt
    var name = "";

    while(name === "" || name === null) {
        name = prompt("What is your robot's name?");
    }
    console.log("Your robot's name is " + name);
    return name;
};


/* GAME INFO / VARIABLES */

    // player robot variables (OBJECT)
var playerInfo = {
    name: getPlayerName(),
    health: 100,
    attack: 10,
    money: 10,
    reset: function() {
        this.health = 100;
        this.money = 10;
        this.attack = 10;
    },
    refillHealth: function() {
        if (this.money >= 7) {
            window.alert("Refilling player's health by 20 for 7 dollars.");
            this.health += 20;  // += is shorthand for this.health = this.health + 20
            this.money -= 7;
        }
        else {
            window.alert("You lack the funds!");
        }
    },
    upgradeAttack: function() {
        if (this.money >= 7) {
            window.alert("Upgrading player's attack by 6 for 7 dollars.");
            this.attack += 6;
            this.money -= 7;
        }
        else {
            window.alert("You lack the funds!");
        }
    }
};

    // enemy robot variables (OBJECT)
var enemyInfo = [
    {
        name: "Roborto",
        attack: randomNumber(10, 14)
    },
    {
        name: "Amy Android",
        attack: randomNumber(10, 14)
    },
    {
        name: "Robo Trumble",
        attack: randomNumber(10, 14)
    }
];

/* RUN / CALL GAME */

startGame();