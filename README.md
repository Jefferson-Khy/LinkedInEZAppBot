# Puppeteer Job Application Bot

This application is a simple Puppeteer script designed to automate job applications on LinkedIn "Easy Apply" and "Remote" options.

## Prerequisites

Before running this application, ensure you have Node.js and npm (Node Package Manager) installed on your machine. These tools are essential as they will allow you to run the script and install necessary dependencies. Visit [Node.js official website](https://nodejs.org/) for download and installation instructions.

## Setup

To set up the application on your local machine, follow these steps:

1. **Clone the repository**

2. **Navigate to the project directory**

3. **Install dependencies**: Run the following command to install the necessary dependencies: npm install

## Configuration

Before running the script, you need to make a few manual adjustments:

1. **Credentials**: The script currently does not prompt for usernames or passwords. You must enter your credentials manually in the script. Locate the `performLogin` function in `script.js` and replace placeholder credentials with your actual username and password.

2. **Job Title**: The script is preset to search for specific job title. If you wish to change the job title modify the `performSearch` function within `script.js` according to your preferences.

## Running the Application

Once the setup is complete and you've configured the script with your details, you can run the application with the following command: 
node script.js


## Important Notes

- This script is intended for educational purposes and personal use. Please use responsibly and ethically, respecting all terms of service of the job application platform.
- Ensure you have the legal right to automate actions on your account on the job application platform.
- The efficiency and success rate of the script can vary based on the website's layout changes, your internet connection, and other factors.





