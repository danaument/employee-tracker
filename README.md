# Title: Employee Tracker

## Table of Contents:
* [Description](#Description)
* [Installation](#Installation)
* [Usage](#Usage)
* [Demo Video](#video)
* [Notes from Dan](#Notes)
* [Credits](#Credits)
* [License](#License)

### <a name="Description">Description:</a>
This application is a homework assignment for UT's web dev coding bootcamp.  It uses the inquirer.js and mysql.js packages to generate create a CLI environment for viewing and updating employee information.

### <a name="Installation">Installation:</a>
The application's dependencies can be installed using the following command in the directory containing the files, including the package.json file: 

```bash
npm i
```

I also made some JavaScript files to create the database (createdatabase.js) and to seed the database with sample values (seedfordemo.js).  All of the JavaScript files will need to updated with the correct mysql connection values before they will function properly.

### <a name="Usage">Usage:</a>
The application can be invoked using the following command: 

```bash
node emptracker.js
```

The user can follow the command line interface prompts to interact in various ways with the employees, roles, and departments in the database.

### <a name="video">Demo Video: </a>



### <a name="Notes">Notes from Dan:  </a>
I spent most of my time on this project researching and working with async and await so that I could place my mysql query functions in a separate file.  I'm under the impression that this is a better way of doing things (rather than having one giant js file).  If I have a chance to revisit this project, I will better nest the inquirer prompts and handle additional database actions (e.g. DELETE). 

### <a name="Credits">Credits: </a>
This project was completed by Dan Aument using code and assets provided by The Coding Boot Camp at UT Austin in partnership with Trilogy Education Services. I made extensive use of the "Two_Tables" example from our class repo.

### <a name="License">License: </a>

Distributed under the MIT License

MIT License

Copyright (c) 2020 Daniel Aument

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.