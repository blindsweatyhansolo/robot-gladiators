var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

console.log(playerName, playerAttack, playerHealth);

var enemyName = "Roborto";
var enemyHealth = 50;
var enemyAttack = 12;

var fight = function() {
    window.alert("Welcome to Robot Gladiators!");

    var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");
    
    if (promptFight === "fight" || promptFight === "FIGHT") {
        
        enemyHealth = enemyHealth - playerAttack;
        console.log(
            playerName + " attacked " + enemyName + "! " + enemyName + " now has " + enemyHealth + " health remaining."
        );
        
        if (enemyHealth <= 0) {
            window.alert(enemyName + " has been defeated!");
        } else {
            window.alert(enemyName + " still has " + enemyHealth + " health left!");
        }

        playerHealth = playerHealth - enemyAttack;
        console.log(
            "Ouch! " + enemyName + " hit " + playerName + " back! " + playerName + " now has " + playerHealth + " health remaining!"
        );

        if (playerHealth <= 0) {
            window.alert(playerName + " has died!");
        } else {
            window.alert(playerName + " still has " + playerHealth + " health left!")
        }
    } else if (promptFight === "skip" || promptFight === "SKIP") {
        var confirmSkip = window.confirm("Are you sure you'd like to quit?");
            // window.confirm stores user input as a variable (true/false)
        if (confirmSkip) {
            window.alert(playerName + " has chosen to skip the fight! BOO!");
            // create penalty for skipping, -2 to playerMoney
            playerMoney = playerMoney - 2;  
            window.alert("Too bad. You still owe the entry fee. You now have " + playerMoney + " currency left.");
        }
        else {
            fight();
        }
    } else {
        window.alert("You need to choose a valid option, try again!");
    }
};

fight();
