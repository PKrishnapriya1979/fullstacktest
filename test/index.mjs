import fs from 'fs';

import puppeteer from 'puppeteer';
import { expect } from 'chai';
import cleanup from 'node-cleanup';
import assert from 'assert'
import _ from 'lodash';
import { error } from 'console';
const baseURL = 'http://192.168.253.177:3000'; // Replace with your actual application URL
//const baseURL = 'http://google.com';
const viewportSizesToTest = [
  { width: 320, height: 480 },
  { width: 768, height: 1024 },
  { width: 1440, height: 900 }];
const concurrentUsers = 5; // Number of concurrent users to simulate
var outputFilePath = 'responsive_test_results';
const result = 'result.json'
const error_log = 'pagenotfound.json'
let results = [];  
let fun_results =[];
const browsers = [];
// API request paramenters
var userID = 1;
var submit = 1;
var testusername_BDE = "emailverification4@kggeniuslabs.com";
var testpassword_BDE = "1234";
var testrole_BDE = '4';

async function runPuppeteer() {
  try {
    const browser = await puppeteer.launch(); // Launching the browser
    const page = await browser.newPage(); // Opening a new page
    await page.goto(baseURL); // Navigating to a URL
  } catch (error) {
    logErrorToFile(error);
    throw new Error('Failed to complete Puppeteer task: ' + error.message);
  }
}
function logErrorToFile(error) {
  const errorDetails = {
    errorMessage: error.message,
    stack: error.stack,
    timestamp: new Date().toISOString()
    };
   fs.writeFileSync(error_log, JSON.stringify(errorDetails, null, 2), 'utf-8');
}
async function writefunctionalResults(){
  
  const options = {
    encoding: 'utf8'
   };
   console.log(fun_results)
    fs.writeFileSync(result, JSON.stringify(fun_results), options);
    }
async function writeResultsToFile() {
  newData = results;
  fs.writeFileSync(outputFilePath, JSON.stringify(newData),null,2);
}
// async function closeBrowsers() {
//   for (const browser of browsers) {
//     try {
//       await browser.close();
//     } catch (err) {
//       console.error('Error closing browser:', err);
//     }
//   }
// }
runPuppeteer().catch(error => 
  {
      setTimeout(()=>{
         console.error('Error running Puppeteer:', error);
         process.exit(1);
       },1500
     )
    })
    cleanup((exitCode, signal) => {
      console.log('Cleanup on exit, closing browser instances...');
    });
// describe('Performance and Responsiveness Tests', async function () {      
//   this.timeout(60000); // Set a higher timeout for these tests
//     before(async () => {
//       outputFilePath = outputFilePath + userID + ".json";
//     });
//     after(async () => {
//       await writeResultsToFile();
//       await closeBrowsers();
//     });
//     it('should handle concurrent users and measure load time', async function () {
//       const loadTimes = await Promise.all(
//       Array.from({ length: concurrentUsers }).map(async (_, i) => {
//       const browser = await puppeteer.launch({
//       headless: false,
//         args: ['--no-sandbox', '--disable-setuid-sandbox'],
//       });
//       const page = await browser.newPage();
//       await page.setViewport(viewportSizesToTest[i % viewportSizesToTest.length]);
//       const startTime = Date.now();
//       await page.goto(baseURL, { waitUntil: 'networkidle0' });
//       const endTime = Date.now();
//       const loadTime = endTime - startTime;
//       await browser.close();
//       return loadTime;
//       })
//       );
//       const averageLoadTime = loadTimes.reduce((a, b) => a + b, 0) / loadTimes.length;
//       console.log(`Average page load time with ${concurrentUsers} concurrent users: ${averageLoadTime}ms`);
//       results.push({
//         attempt : submit+1,
//         testName: 'Concurrent User Load Time',
//         concurrentUsers,
//         loadTimes,
//         averageLoadTime,
//         timestamp: new Date().toISOString(),
//         });
//       // Assert that the average load time is within an acceptable limit
//       try{
//       expect(averageLoadTime).to.be.below(5000, 'Average load time is too high');
//     } catch(error)
//       {
//         console.log("error :",error.errorMessage)
//       }
//         });
//     viewportSizesToTest.forEach(viewport => {
//       it(`should render correctly at ${viewport.width}x${viewport.height}`, async () => {
//         const browser = await puppeteer.launch({
//           headless: true,
//           ignoreHTTPSErrors: true,
//           args: ['--no-sandbox', '--disable-setuid-sandbox'],
//             });
//         const page = await browser.newPage();
//         await page.setViewport(viewport);
//         await page.goto(baseURL, { waitUntil: 'networkidle0' });
//         const isResponsive = await page.evaluate((viewport) => {
//           return window.innerWidth >= viewport.width;
//             }, viewport);
//            await browser.close();
//            results.push({ viewport, isResponsive });
//            expect(isResponsive).to.be.true;
//       });
//     });  
    
//   });
// describe('Registration from ADMIN Login', function() {
//         this.timeout(60000);
//         let browser;
//         let page;
//         let passed = false
//         before(async function() {
//           this.timeout(60000);
//         });
//         after(async function() {
//           //await writefunctionalResults();
//           await closeBrowsers();
//         });
//         it('perform BDM creation from ADMIN', async function() {
//             this.timeout(30000);
//             var newUrl = baseURL+'/adduser/38';
//               try {      
//                 browser = await puppeteer.launch({
//                   headless: false,
//                   args: [
//                     '--no-sandbox',
//                     '--disable-setuid-sandbox',
//                     '--disable-infobars',
//                     '--disable-extensions',
//                     '--start-maximized'
//                   ],
//                   defaultViewport: null,
//                   userDataDir: './user_data',
//                   prefs: {
//                     'profile.managed_default_content_settings.geolocation': 2,
//                     'profile.managed_default_content_settings.notifications': 2,
//                     'profile.managed_default_content_settings.popups': 2
//                   }
//                 });
//                 page = await browser.newPage();
//                 await page.goto(baseURL, { waitUntil: 'networkidle0' });
//                 // Perform login actions
//                 await page.type('#email', 'nursingjobs@kggeniuslabs.com');
//                 await page.type('#password', 'admin@123');
//                 await page.click('button');
//                 await page.waitForNavigation({ waitUntil: 'networkidle0' });
//                 // Navigate to the add user page
//                 await page.goto(baseURL+'/adduser/38', { waitUntil: 'networkidle0' });
           
//                 // Fill in the registration form
//                 await page.type('#emp_name', 'testusertwo');
           
//                 await page.type('#phone_number', '1234567890');
//                 await page.type('#password', testpassword_BDE); // Replace with the correct value
//                 await page.select('select#head', 'admin');
//                 await page.type('#employee_id', '12');
//                 await page.type('#emailid', testusername_BDE); // Replace with the correct value
//                 await page.select('select#role', testrole_BDE); // Replace with the correct value
//                 // Submit the form
//                 await page.click('#b1');
//                 const res = await page.waitForNavigation({ timeout: 10000 });
//                 newUrl = res.url
//                 assert.strictEqual(newUrl, baseURL+'/admin/38', 'URL after navigation is correct');
//               }
//                 catch (error) {
//                     if (error.message === "URL after navigation is correct")
//                       passed = true;
//                     fun_results.push({
//                       attempt :submit,
//                       testName: 'perform BDM creation from ADMIN',
//                       error: error.message,
//                       passed: passed,
//                       timestamp: new Date().toISOString(),
//                       });
//                 } 
//             });
// });

// describe('Registration of ADMIN from ADMIN Login', function(){
//     this.timeout(60000);
//     let browser;
//     let page;        
//     before(async function() {       
//       this.timeout(30000);
//           // You may need to wait for the login page to load before proceeding
//       });
//     after(async function() {
//           // console.log("before writing : ", fun_results);
//           //await writefunctionalResults();
//       await closeBrowsers();
//       });
//     it('perform ADMIN creation from ADMIN - Negative test case', async function() {
//         this.timeout(60000);
//         console.log("Performing the test....")
//         try {      
//           browser = await puppeteer.launch({
//           headless: false,
//           args: [
//             '--no-sandbox',
//             '--disable-setuid-sandbox',
//             '--disable-infobars',
//             '--disable-extensions',
//             '--start-maximized'
//           ],
//           defaultViewport: null,
//           userDataDir: './user_data',
//           prefs: {
//             'profile.managed_default_content_settings.geolocation': 2,
//             'profile.managed_default_content_settings.notifications': 2,
//             'profile.managed_default_content_settings.popups': 2
//             }
//           });
//           page = await browser.newPage();
//           await page.goto(baseURL, { waitUntil: 'networkidle0' });
//           // Perform login actions
//           await page.type('#email', 'nursingjobs@kggeniuslabs.com');
//           await page.type('#password', 'admin@123');
//           await page.click('button');
//           await page.waitForNavigation({ waitUntil: 'networkidle0' });
//           await page.goto(baseURL+'/adduser/38');     
//           //console.log("inside page");
//           const selectSelector = 'select#role';
//           const valueToCheck = '1';
//           await page.waitForSelector(selectSelector);
//           const options = await page.$$eval(`${selectSelector} option`, options => options.map(option => option.value));
//           const valueFound = options.includes(valueToCheck);
//           if (!valueFound) {
//             throw new Error(`The value ADMIN was not found in the select element.`);
//             }
//           else{
//             fun_results.push({
//               testName: 'perform ADMIN creation from ADMIN - Negative test case',
//               error: "Admin should not be in the role assigned component",
//               passed: false,
//               timestamp: new Date().toISOString(),
//             });
//             }
//           } catch (error) {
//             console.error('Test execution error:', error);
//             fun_results.push({
//               testName: 'perform ADMIN creation from ADMIN - Negative test case',
//               error: error.message,
//               passed: true,
//               timestamp: new Date().toISOString(),
//             });
//           }
//         }); 
//     }); 





describe('Registration from ADMIN Login', function() {
    this.timeout(60000);
    let browser;
    let page;
    let passed = false;

    before(async function() {
        this.timeout(60000);
    });

    after(async function() {
        writefunctionalResults();
        if (browser) {
            await browser.close();
        }
    });

    it('perform BDM creation from ADMIN', async function() {
        this.timeout(30000);
        const newUrl = baseURL + '/adduser/38';
        try {
            browser = await puppeteer.launch({
                headless: false,
                args: [
                    '--no-sandbox',
                    '--disable-setuid-sandbox',
                    '--disable-infobars',
                    '--disable-extensions',
                    '--start-maximized'
                ],
                defaultViewport: null,
                userDataDir: './user_data/bdm_creation', // Separate user data directory
                prefs: {
                    'profile.managed_default_content_settings.geolocation': 2,
                    'profile.managed_default_content_settings.notifications': 2,
                    'profile.managed_default_content_settings.popups': 2
                }
            });

            page = await browser.newPage();
            await page.goto(baseURL, { waitUntil: 'networkidle0' });
            await page.type('#email', 'nursingjobs@kggeniuslabs.com');
            await page.type('#password', 'admin@123');
            await page.click('button');
            await page.waitForNavigation({ waitUntil: 'networkidle0' });
            await page.goto(baseURL + '/adduser/38', { waitUntil: 'networkidle0' });
            await page.type('#emp_name', 'testusertwo');
            await page.type('#phone_number', '1234567890');
            await page.type('#password', testpassword_BDE); // Replace with the correct value
            await page.select('select#head', 'admin');
            await page.type('#employee_id', '12');
            await page.type('#emailid', testusername_BDE); // Replace with the correct value
            await page.select('select#role', testrole_BDE); // Replace with the correct value
            await page.click('#b1');
            const res = await page.waitForNavigation({ timeout: 10000 });
            newUrl = res.url;
            assert.strictEqual(newUrl, baseURL + '/admin/38', 'URL after navigation is correct');
            passed = true;
        } catch (error) {
            if (error.message === "URL after navigation is correct") passed = true;
            fun_results.push({
                attempt: submit,
                testName: 'perform BDM creation from ADMIN',
                error: error.message,
                passed: passed,
                timestamp: new Date().toISOString(),
            });
        }
    });
});

describe('Registration of ADMIN from ADMIN Login', function() {
    this.timeout(60000);
    let browser;
    let page;

    before(async function() {
        this.timeout(30000);
    });

    after(async function() {
        writefunctionalResults();
        if (browser) {
            await browser.close();
        }
    });

    it('perform ADMIN creation from ADMIN - Negative test case', async function() {
        this.timeout(60000);
        try {
            browser = await puppeteer.launch({
                headless: false,
                args: [
                    '--no-sandbox',
                    '--disable-setuid-sandbox',
                    '--disable-infobars',
                    '--disable-extensions',
                    '--start-maximized'
                ],
                defaultViewport: null,
                userDataDir: './user_data/admin_creation', // Separate user data directory
                prefs: {
                    'profile.managed_default_content_settings.geolocation': 2,
                    'profile.managed_default_content_settings.notifications': 2,
                    'profile.managed_default_content_settings.popups': 2
                }
            });

            page = await browser.newPage();
            await page.goto(baseURL, { waitUntil: 'networkidle0' });
            await page.type('#email', 'nursingjobs@kggeniuslabs.com');
            await page.type('#password', 'admin@123');
            await page.click('button');
            await page.waitForNavigation({ waitUntil: 'networkidle0' });
            await page.goto(baseURL + '/adduser/38');
            const selectSelector = 'select#role';
            const valueToCheck = '1';
            await page.waitForSelector(selectSelector);
            const options = await page.$$eval(`${selectSelector} option`, options => options.map(option => option.value));
            const valueFound = options.includes(valueToCheck);
            if (!valueFound) {
                throw new Error(`The value ADMIN was not found in the select element.`);
            } else {
                fun_results.push({
                    attempt: submit,
                    testName: 'perform ADMIN creation from ADMIN - Negative test case',
                    error: "Admin should not be in the role assigned component",
                    passed: false,
                    timestamp: new Date().toISOString(),
                });
            }
        } catch (error) {
            console.error('Test execution error:', error);
            fun_results.push({
                attempt: submit,
                testName: 'perform ADMIN creation from ADMIN - Negative test case',
                error: error.message,
                passed: true,
                timestamp: new Date().toISOString(),
            });
        }
    });
});

async function closeBrowsers() {
    if (browser) {
        await browser.close();
    }
}

describe('Form Validation Error', function() {
  this.timeout(30000)
  let browser;
  let page;

  before(async function() {
      this.timeout(60000);
  });

  after(async function() {
      await writefunctionalResults();
      if (browser) {
        await browser.close();
        process.exit(0)
    }
     // process.exit(0);
  });

  it('Form Validation Error', async function() {
      this.timeout(60000);
      let passed = true;
      try {
          browser = await puppeteer.launch({
              headless: false,
              args: [
                  '--no-sandbox',
                  '--disable-setuid-sandbox',
                  '--disable-infobars',
                  '--disable-extensions',
                  '--start-maximized'
              ],
              defaultViewport: null,
              userDataDir: './user_data',
              prefs: {
                  'profile.managed_default_content_settings.geolocation': 2,
                  'profile.managed_default_content_settings.notifications': 2,
                  'profile.managed_default_content_settings.popups': 2
              }
          });
          page = await browser.newPage();
          await page.goto(baseURL, { waitUntil: 'networkidle0' });
          await page.type('#email', 'nursingjobs@kggeniuslabs.com');
          await page.type('#password', 'admin@123');
          await page.click('button');
          await page.waitForNavigation({ waitUntil: 'networkidle0' });
           // Intercept network requests
           await page.setRequestInterception(true);
           // Variable to track if POST request was made
           let postRequestMade = false;
           page.on('request', (request) => {
               if (request.method() === 'POST' && request.url() === 'http://192.168.253.177:3000/admin/38') {
               postRequestMade = true;
               }
               request.continue();
           });
          await page.goto('http://192.168.253.177:3000/adduser/38');
          await page.type('#emp_name', 'testusertwo');
          await page.type('#phone_number', '1234567890');
          await page.type('#password', '1234');
          await page.select('select#head', 'admin');
          await page.type('#employee_id', '12');
          await page.type('#emailid', 'email10@kggeniuslabs.com');
          await page.select('select#role', '3');
          await page.click('#b1'); // Click on submit button
          await page.waitForNavigation({ timeout: 30000 }); // Wait for navigation (30 seconds timeout)
          if (postRequestMade) {
            console.log('POST request was made.');
            fun_results.push({
                attempt: submit,
                testName: 'Form Validation Error',
                error: 'No error. User is added',
                passed: false,
                timestamp: new Date().toISOString(),
            });
          } else {
            fun_results.push({
                attempt: submit,
                testName: 'Form Validation Error',
                error: 'error in form data - mailID',
                passed: true,
                timestamp: new Date().toISOString(),
            });
          }
        console.log(interceptedRequests)
      } catch (error) {
          console.error('Test execution error:', error);
          fun_results.push({
            attempt: submit,
              testName: 'Form Validation Error',
              error: 'error in form data - mailID',
              passed: false,
              timestamp: new Date().toISOString(),
          });
      }
  });
});