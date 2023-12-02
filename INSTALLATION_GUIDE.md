# Node.js Installation Guide

## For Windows

### Download Node.js Installer:
1. Go to the official Node.js website: [Node.js Downloads](https://nodejs.org/en/download/).
2. Click on the "Windows Installer" option. This will download an `.msi` file that is suitable for Windows.

### Run the Installer:
- Once the download is complete, click on the downloaded `.msi` file to start the installation process.
- Follow the prompts in the Node.js Setup Wizard. Agree to the terms, choose the installation directory, and select the components to install (the default settings are typically fine).

### Install Node.js and npm:
- Let the installer run to completion. It will install both Node.js and npm (node package manager), which is used to manage Node.js packages.

### Verify Installation:
- To ensure Node.js and npm are installed correctly, open a command prompt and run the following commands:
  ```cmd
  node -v
  npm -v

# MySQL Workbench Installation Guide

## Installing MySQL Workbench

## Download MySQL Workbench:
1. Visit the official MySQL website: [MySQL Downloads](https://dev.mysql.com/downloads/workbench/).
2. Select the version of MySQL Workbench that corresponds to your operating system (Windows, macOS, or Linux).
3. Click the "Download" button. You may be asked to log in or sign up for an Oracle account. However, it is typically possible to skip this step by clicking on a "No thanks, just start my download" link.

## Install MySQL Workbench:
- **On Windows**: Run the downloaded .msi installer and follow the prompts to install MySQL Workbench.
- **On macOS**: Open the downloaded .dmg file, and drag the MySQL Workbench icon to the Applications folder.
- **On Linux**: The installation method varies by distribution. For example, using Debian-based systems (like Ubuntu), you can use the command: `sudo apt-get install mysql-workbench`.

## Launch MySQL Workbench:
After installation, open MySQL Workbench from your applications list or search for it in your system.

## Setting Up a New MySQL Database

## Connect to MySQL Server:
If you already have MySQL server installed, open MySQL Workbench and establish a connection to the server. If not, you need to install MySQL Server first. You can typically set up a new connection by clicking the "+" next to MySQL Connections and entering your server details.

## Create a New Database (Schema):
1. In the sidebar on the left under "Navigator", click on "Schemas".
2. Right-click in the Schemas area and choose "Create Schema...".
3. Enter a name for your new schema, configure any additional settings as necessary, and click "Apply".
4. Review the SQL statement that will be executed and click "Apply" to create the schema.
5. Click "Finish" once the schema has been created.

## Using a Schema from a Project Folder

### Locate the Schema File:
Find the .sql file in your project folder that contains the database schema. This is typically a text file with a series of SQL statements that define the structure of your database tables and other database objects.

### Import the Schema using MySQL Workbench:
1. In MySQL Workbench, connect to your MySQL server.
2. Select "Server" from the menu at the top, then "Data Import".
3. Choose "Import from Self-Contained File" and browse to select your .sql file from the project folder.
4. Select the default target schema or create a new one to import the tables into.
5. Click "Start Import" at the bottom right to import the schema into your MySQL database.

### Verify the Schema:
After the import is complete, switch back to the "Schemas" tab in the sidebar.
Click the "Refresh" button to view the list of databases.
Expand the database you imported the schema into and check to make sure all tables and objects have been correctly created.
