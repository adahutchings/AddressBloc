const inquirer = require('inquirer');

module.exports = class MenuController {
    constructor(){
        this.mainMenuQuestions = [
            {
                type: "list",
                name: "mainMenuChoice",
                message: "Please choose from an option below: ",
                choices: [
                    "Add new contact",
                    "Get Today's Date",
                    "Exit"
                ]
            }
        ];
        this.contacts = [];
    }

    main(){
        console.log('Welcome to AddressBlock!');
        inquirer.prompt(this.mainMenuQuestions).then((response) => {
            switch(response.mainMenuChoice){
                case "Add new contact":
                    this.addContact();
                    break;
                case "Exit":
                    this.exit();
                case "Get Today's Date":
                    this.getDate()
                    break;
                default:
                    console.log("Invalid Input");
                    this.main();
            }
        })
        .catch((err) => {
            console.log(err);
        });
    }

    clear(){
        console.log('\x1Bc');
    }

    addContact(){
        this.clear();
        console.log('addContact called');
        this.main();
    }

    exit(){
        console.log("Thanks for using AddressBloc!");
        process.exit();
    }

    getDate(){
        var now = new Date();
        var date = [now.getMonth() + 1, now.getDate(), now.getFullYear()];
        var time = [now.getHours(), now.getMinutes(), now.getSeconds()];
        var amPm = (time[0] < 12) ? "AM" : "PM";

        time[0] = (time[0] < 12 ) ? time[0] : time[0] -12;
        time[0] = time[0] || 12;

        for (var i = 1; i <3; i++){
            if(time[i] < 10 ){
                time[i] = "0" + time[i];
            }
        }
        var currentDate = date.join("-") + " " + time.join(":") + " " + amPm;
        console.log(currentDate);
        this.main();
    }
}
