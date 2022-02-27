// GAME STATES
// "WIN" - Player robot has defeated all enemy robots
//      * Fight all enemy robots
//      * Defeat each enemy robot
// "LOSE" - Player's health is zero or less

var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
var enemyHealth = 50;
var enemyAttack = 12;

    // battle round
var fight = function(enemyName) {
        // while loop to call and execute fight function only if the player's health is > 0 AND enemy's health > 0
    while(playerHealth > 0 && enemyHealth > 0) {
            // ask player to fight or run
        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");
            // if choosing to SKIP fight
        if (promptFight === "skip" || promptFight === "SKIP") {
                // confirm player wants to skip
            var confirmSkip = window.confirm("Are you sure you'd like to quit?");
                // after confirming, end loop and get penalty
            if (confirmSkip) {
                window.alert(playerName + " has chosen to skip the fight! BOO!");
                        // create penalty for skipping, -10 to playerMoney, ends fight loop for current opponent
                    playerMoney = playerMoney - 10;
                    window.alert("Too bad. You still owe the entry fee. You now have " + playerMoney + " currency left.");
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

            // check PLAYER health, break while() loop if <= 0
        if (playerHealth <= 0) {
            window.alert(playerName + " has died!");
            break;
                // otherwise alert with player's remaining health, continue while() loop
        } else {
                    window.alert(playerName + " still has " + playerHealth + " health left!")
        }
    }
};
        
    // for loop that calls the fight function and loops to allow the player to fight every enemy robot 
for(var i = 0; i < enemyNames.length; i++) {
        // var created to store the current enemy robot
    var pickedEnemyName = enemyNames[i];
        //  reset enemyHealth to 50
    enemyHealth = 50;
        // call fight function with enemy robot from pickedEnemyName
    fight(pickedEnemyName);
}

