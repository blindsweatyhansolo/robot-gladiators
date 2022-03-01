// GAME STATES
//      * State number of the round
// "WIN" - Player robot has defeated all enemy robots
//      * Fight all enemy robots
//      * Defeat each enemy robot
// "LOSE" - Player's health is zero or less
//      * Game over

    // player robot variables
var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;
    // enemy robot variables
var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
var enemyHealth = 50;
var enemyAttack = 12;

// console.log(enemyNames);
// console.log(enemyNames.length);
// console.log(enemyNames[0]);
// console.log(enemyNames[3]);


    // battle round (with enemyName as a parameter)
var fight = function(enemyName) {
        // while loop to call and execute fight function only if the player's health is > 0 AND enemy's health > 0
    while(playerHealth > 0 && enemyHealth > 0) {
            // ask player to fight or run
        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");
        
        // if choosing to SKIP fight
        if (promptFight === "skip" || promptFight === "SKIP") {
                // confirm player wants to skip
            var confirmSkip = window.confirm("Are you sure you'd like to quit?");
            
                // after confirming (yes/true), end loop (leave fight) and get penalty
            if (confirmSkip) {
                window.alert(playerName + " has chosen to skip the fight! BOO!");
                        // create penalty for skipping, -10 to playerMoney, ends fight loop for current opponent
                playerMoney = playerMoney - 10;
                // window.alert("Too bad. You still owe the entry fee. You now have " + playerMoney + " currency left.");
                console.log("playerMoney", playerMoney);
                break;
            }
        }

            // player attacks, subtract player's attack from enemy's health
        enemyHealth = enemyHealth - playerAttack;
        console.log(
            playerName + " attacked " + enemyName + "! " + enemyName + " now has " + enemyHealth + " health remaining."
        );

            // check ENEMY health, break while() loop if <= 0, get reward
        if (enemyHealth <= 0) {
            window.alert(enemyName + " has been defeated!");
                // award player money for winning
            playerMoney = playerMoney + 20;

            break;
                // otherwise alert with enemy's remaining health, continue while() loop
        } else {
            window.alert(enemyName + " still has " + enemyHealth + " health left!");
        }

            // enemy attacks, subtract enemy's attack from player's health
        playerHealth = playerHealth - enemyAttack;
        console.log(
            "Ouch! " + enemyName + " hit " + playerName + " back! " + playerName + " now has " + playerHealth + " health remaining!"
        );

            // check PLAYER health, break while() loop if <= 0 (dead)
        if (playerHealth <= 0) {
            window.alert(playerName + " has died!");
            break;
                // otherwise alert with player's remaining health, continue while() loop
        } else {
            window.alert(playerName + " still has " + playerHealth + " health left!");
        }
    }
};
        
var startGame = function() {
        // reset player stats each new game
    playerHealth = 100;
    playerAttack = 10;
    playerMoney = 10;

        // for loop that calls the fight function and loops to allow the player to fight every enemy robot (one at a time)
    for(var i = 0; i < enemyNames.length; i++) {
            // check state of player robot's health, if playerHealth > 0 (alive) keep fighting
        if (playerHealth > 0) {
                // display current round, (i + 1) used since i = 0 and there is no Round 0
            window.alert("Welcome to Robot Gladiators! ROUND " + ( i + 1 ));

                // pick new enemy based on the enemyNames array index
            var pickedEnemyName = enemyNames[i];

                // reset enemy health before new fight
            enemyHealth = 50;
            
                // pass the pickedEnemyName variable into the fight function where it will assume the value of the enemyName parameter
            fight(pickedEnemyName);

                // after the fight function is completed, if the player is alive AND there are still enemies to fight, enter shop
            if (playerHealth > 0 && i < enemyNames.length - 1) {
                var storeConfirm = window.confirm("The first is over, visit the store before the next round?");

                if (storeConfirm) {
                    shop();
                }
            }
        } else {
                // if playerHealth < 0 (dead), stop game
            window.alert("You have lost your robot in battle! Game Over!");
            break;
        }
    }
    
    endGame();
};


var endGame = function() {
    window.alert("The game as ended, let's see how you did!");

        // player wins if still alive
    if (playerHealth > 0) {
        window.alert("Great job, you survived the game! Your final score was " + playerMoney + "!");
    } else {
        window.alert("You've lost your robot in battle. RIP " + playerName);
    }
    
    var playAgainConfirm = window.confirm("Would you like to play again?");

    if (playAgainConfirm) {
            // restart game on confirm (yes/true)
        startGame();
    } else {
        window.alert("Thanks for playing Robot Gladiators! Come back soon!");
    }
};


var shop = function() {
        // ask player what they want to do
    var shopOptionPrompt = window.prompt(
        "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the shop? Please enter one: 'REFILL', 'UPGRADE' or 'LEAVE' to make a choice."
    );

    switch (shopOptionPrompt) {
        case "REFILL":
        case "refill":
            if (playerMoney >= 7) {
                window.alert("Refilling player's health by 20 for 7 dollars.");
                    // increase playerHealth, decrease money
                playerHealth = playerHealth + 20;
                playerMoney = playerMoney - 7;
            }
            else {
                window.alert("You don't have enough money!");
            }
            break;

        case "UPGRADE":
        case "upgrade":
            if (playerMoney >= 7) {
                window.alert("Upgrading player's attack by 6 for 7 dollars.");
                    // increase playerAttack, decrease money
                playerAttack = playerAttack + 6;
                playerMoney = playerMoney - 7;
            }
            else {
                window.alert("You don't have enough money!");
            }
            break;
        
        case "LEAVE":
        case "leave":
            window.alert("Leaving the store.");
                // function ends
            break;

        default:
            window.alert("You did not pick a valid option. Try again.");
                // call shop() again 
            shop();
            break;
    }
};

startGame();