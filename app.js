const Manager = require("./library/Manager");
const Engineer = require("./library/Engineer");
const Intern = require("./library/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./library/htmlRenderer");
const teamMembers = [];

function managerInfo() {
    inquirer.prompt([
        {
            type: "input",
            name: "managerName",
            message: "What is this manager's name?"
        },
        {
            type: "input",
            name: "managerID",
            message: "What is this manager's employee ID number?"
        },
        {
            type: "input",
            name: "managerEmail",
            message: "What is this manager's business email address?"
        },
        {
            type: "input",
            name: "managerOfficeNumber",
            message: "What is this manager's office number?"
        },
    ])

        .then(response => {

            console.log(response);

            const manager = new Manager(
                response.managerName,
                response.managerID,
                response.managerEmail,
                response.managerOfficeNumber,
            );

            console.log(manager);

            teamMembers.push(manager);
        })
};

function engineerInfo() {
    inquirer.prompt([
        {
            type: "input",
            name: "engineerName",
            message: "What is this engineer's name?"
        },
        {
            type: "input",
            name: "engineerID",
            message: "What is this engineer's employee ID number?"
        },
        {
            type: "input",
            name: "engineerEmail",
            message: "What is this engineer's business email address?"
        },
        {
            type: "input",
            name: "githubUsername",
            message: "What is this engineer's github username?"
        },
    ])

        .then(response => {

            console.log(response);

            const engineer = new Engineer(
                response.engineerName,
                response.engineerID,
                response.engineerEmail,
                response.githubUsername,
            );

            console.log(engineer);

            teamMembers.push(engineer);
        })
};

function internInfo() {
    inquirer.prompt([
        {
            type: "input",
            name: "internName",
            message: "What is this intern's name?"
        },
        {
            type: "input",
            name: "internID",
            message: "What is this intern's employee ID number?"
        },
        {
            type: "input",
            name: "internEmail",
            message: "What is this intern's business email address?"
        },
        {
            type: "input",
            name: "internSchool",
            message: "What is the name of this intern's school?"
        },
    ])

        .then(response => {

            console.log(response);

            const intern = new Intern(
                response.internName,
                response.internID,
                response.internEmail,
                response.internSchool,
            );

            console.log(intern);

            teamMembers.push(intern);
        })
};

function addTeamMembers() {
    inquirer.prompt([
        {
            type: "list",
            name: "addTeamMembers",
            message: "Which type of team member would you like to add?",
            choices: ["Manager", "Engineer", "Intern", "None"]
        }
    ])

        .then(response => {

            if (response.addTeamMembers === "Manager") {
                managerInfo();
            }


            else if (response.addTeamMembers === "Engineer") {
                engineerInfo();
            }


            else if (response.addTeamMembers === "Intern") {
                internInfo();
            }

            else {
                generateHTML ();
            }

            console.log(response);
        });
}

addTeamMembers ();


function generateHTML () {

    fs.writeFile(outputPath, render (teamMembers), function (error) {

        if (error) throw error;

        console.log("Meet your team!");
    });
}

generateHTML ();


// Question type of role to add, don't want to add another, then goes to fs writer to generate output file

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
