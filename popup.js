document.addEventListener('DOMContentLoaded', function() {
    var button = document.getElementById('myButton');
    button.addEventListener('click', function() {
      chrome.tabs.create({url: 'https://web.whatsapp.com'});
    });
  });

  // Packages
const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const chromedriver = require('chromedriver');
const { Key, Actions } = webdriver;
const { encode } = require('querystring');
const fs = require('fs');

// Config
const loginTime = 30;      // Time for login (in seconds)
const newMsgTime = 5;      // Time for a new message (in seconds)
const sendMsgTime = 5;     // Time for sending a message (in seconds)
const countryCode = 91;    // Set your country code

// Set up the Chrome driver
chrome.setDefaultService(new chrome.ServiceBuilder(chromedriver.path).build());
const driver = new webdriver.Builder().forBrowser('chrome').build();

// Encode message text
const msg = fs.readFileSync('message.txt', 'utf8');
const encodedMsg = encode({ text: msg });

// Open WhatsApp web
const link = 'https://web.whatsapp.com';
driver.get(link);
driver.sleep(loginTime * 1000);

// Loop through phone numbers list
const numbers = fs.readFileSync('numbers.txt', 'utf8').split('\n');
for (const num of numbers) {
  const formattedNum = `${countryCode}${num.trim()}`;
  const msgLink = `https://web.whatsapp.com/send/?phone=${formattedNum}&text=${encodedMsg}`;
  driver.get(msgLink);
  driver.sleep(newMsgTime * 1000);
  const actions = new Actions(driver);
  actions.sendKeys(Key.ENTER).perform();
  driver.sleep(sendMsgTime * 1000);
}

// Quit the driver
driver.quit();
