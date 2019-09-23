

# PoweredLocal

All things engineering: processes, best practices, setup guides, and more!

## Guides & Processes

---

To run the app 

1. Clone to your local machine `git clone [https://github.com/AyoAlfonso/react-mailchimp-lambda.git](https://github.com/AyoAlfonso/react-mailchimp-lambda.git)`
2. `npm install` to install required modules
3. `npm start` to start up the app 
4. `npm run-scripts` deploy to deploy to the amazon s3 bucket.

**REQUIREMENTS**

- We’ll need the S3 bucket endpoint to test the app over the web.
- We’ll also need access to your AWS account — specifically to API-Gateway, Lambda (& cloudwatch logs for the lambda)- feel free to create a temporary user for us with restricted access or put this work into a fresh AWS account.
- We’ll also need access to the Mailchimp account to verify that users are created.
- Link to your GitHub repo as noted above.
- The rough amount of time it took you to code this (don’t include time setting up AWS/Mailchimp accounts) (fastest is not always best, i.e. we will be more impressed if you make the gender field in the react app as a dropdown that converts 0/1 to Male/Female text in Mailchimp)
- Send us an email at [d3v3l0p3r@poweredlocal.com](mailto:d3v3l0p3r@poweredlocal.com?subject=Coding%20Challenge%20from%20{insert%20your%20name%20here}&body=Hello%20please%20find%20access%20to%20review%20my%20work.%0D%0A%0D%0AS3%20Bucket:%20%0D%0AAWS%20login%20details:%20%0D%0AMailchimp%20login%20details%20%0D%0A%0D%0AGitHub%20repo%20link:%20%0D%0AHow%20long%20did%20it%20take%20you%20to%20complete%20this%20challenge?%0D%0A%0D%0) with the above details.

Use this template to describe the steps engineers should follow to deploy. 

# 1. S3 Bucket Endpoint

This is the s3 bucket endpoint where the react app lives :

[**http://mailchimpreact.s3-website.us-east-2.amazonaws.com**](http://mailchimpreact.s3-website.us-east-2.amazonaws.com/)

# 2. Log into the AWS User account

With the link you can check out the lambda function and the AWS API Gatweway and all the activities on it.

    You have been given access to the AWS Management Console.
    -------------------------------------------------
    
    Sign-in URL: https://890849509039.signin.aws.amazon.com/console
    User name: aimuser
    Password: aimuserpoweredlocal
    
    Go to Links:
    **Lambda Functions**
    https://console.aws.amazon.com/lambda/home?region=us-east-1#/functions
    
    **Amazon Api Gateway** 
    https://us-east-1.console.aws.amazon.com/apigateway/home?region=us-east-1#/apis/2s3vt6td75/resources/yearlhl7wk/methods/POST
    
    **Cloudwatch Url for mailchimp** 
    https://us-east-1.console.aws.amazon.com/cloudwatch/home?region=us-east-1#logStream:group=/aws/lambda/mailChimp_newsletter;streamFilter=typeLogStreamPrefix

# 3. Log into Mailchimp account

    username: joshayo
    password: papatsuckS1#

Estimate based on my :  It took about **3 hours 50 mins**  to get this done excluding the hours for setting up, and deployment time to s3 the remote bucket.

![](https://buildersbase-resources.s3.us-east-2.amazonaws.com/Screenshot+2019-09-20+at+8.58.10+PM.png)

**ASSUMPTIONS** 

1. Specific and helpful validations might not be on backend, so make all the client fields validated  [email, phone number etc.]. Especially in situtatons where you want to be able to swap the front end for another backend nothing is affected.
2. The Lambda endpoint is called based on the environment dev, staging. based on my experience with *bigger systems we will need to be able to interchange the environment*

*development, production, staging etc so it is good practice to expose only that out here as seen in file **SimpleForm**.**js** on line **73 ,** while the BASE_URL is abstracted in another file.*

3. In package.json file a line `"deploy": "aws s3 sync build/ s3://mailchimpreact"`

is added to make sure that when working on a team there is no confusion on deployment process or bucket in target.

4. On the mailchimp end, we don't use **text** , used the dropdown format so that on the mailchimp when departments like the marketing dept wants to use that data to segment on the mailchimp or whatever mailing platform it will be straightforward. 

5.There will be  unknowing returning users, being able to report to returning user that they have registered before will be helpful.


**PS: You will notice most of my assumptions are best practices I have learned and how to make working with other developers or colleagues or the workflow itself easy.**
