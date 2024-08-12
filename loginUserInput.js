const performLogin = require('./performLogin');

  const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });
  // Function to request user credentials and attempt login
  async function loginProcedure(page, delay) {
    let loginSuccess = false;
    while (!loginSuccess) {
      const email = await new Promise((resolve) => {
        readline.question('\nEnter your email/username: ', resolve);
      });
      const password = await new Promise((resolve) => {
        readline.question('\nEnter your password: ', resolve);
      });

      loginSuccess = await performLogin(page, email, password, delay); // Assuming delay is handled inside performLogin
      if (loginSuccess) {
        console.log('\nLogin successful!');
        // Continue with the rest of your code here after successful login
      } else {
        console.log('\nLogin failed, please try again.');
        // The while loop will continue, asking the user for their credentials again
      }
    }
    readline.close();
  }
  
  module.exports = loginProcedure;
  