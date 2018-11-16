# Interactive Hall Display

Welcome! This is the source code repository for the Interactive Hall Display located outside James Madison University's Computer Science department.

This display provides updates, announcements, and events to the student body throughout the semester. Students are welcome to fork this repository and submit pull-requests to add functionality to the display. 

If you have questions about the contents of this repository, please contact `bowersjc@jmu.edu` or an executive member of the JMU Game Development club.

Game Development Executives for Fall 2018:

President: Jason Zareski -- <zareskj@dukes.jmu.edu>\
Vice President: Nicholas Halvorsen -- <halvornr@dukes.jmu.edu>

## Installing Dependencies

The Interactive-Hall-Display requires NodeJS to run.  
This application runs on a NodeJS-based web application server [called Express](https://expressjs.com/en/api.html).  
Communication between the users and server are handled [by Socket.IO](https://socket.io/docs/).

[You can download NodeJS from here](https://nodejs.org/en/) or install it via homebrew with the following Terminal command:  
`brew install nodejs`

After installing NodeJS, install the following modules using NPM:  
`npm install socketio` && `npm install express`

## Running & Interacting with the Server

Open the following file with a text editor of your preference: `index.js`.

On line 14, change the following line from running on port 80 to an available port of your choice:  
`var server = require('http').createServer(app).listen(process.env.PORT || 80);`.

This is the port that the NodeJS server will run on.  
You should manually configure this port depending upon your local system's port configuration.  

You can run the server by navigating to the project directory and running `./server.sh`.

In your browser, you can visit the following URLs:


| URL      | Usage     |
| ---      | ---       |
| http://localhost:PORT/ | Controller Screen |
| http://localhost:PORT/player.html? |App Homepage |
| http://localhost:PORT/player.html?sketch=gamename | Navigates to a specific game page. |

You can also view the live information on the board by visiting:  
`http://halldisplay.cs.jmu.edu`

## Adding a Game

All game files are JavaScript files that are stored within the following directory: `framework/games/`

Feel free to reference the basic template file (`sketch2.js`) or other student creations when creating your game!

## Adding Slides

All slides are HTML files that are stored within the following directory: `framework/`

Clubs are encouraged to add club information by following the provided template file. (`slides-example.html`)

## Adding your Student Information

All student information should be specified with the following functions within your `<game-name>.js` file:
```
function  githubAccount() { return  "<student-github-username>"; }
function  userpic() { return  "<student-picture-name>.png"; }
function  graddate() { return  "JMU 'XX"; }
```

If you wish to have a picture, save your picture as a Portable Network Graphic (`.png`) into the following directory: `framework/img/coders/`

Please follow the naming convention when inserting your picture into this directory.  
Your picture's filename should be your last name followed by the first letter of your first name. (`bowersj.png`)

Any inappropriate or suggestive pictures will be removed.