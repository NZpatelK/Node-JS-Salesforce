
# Get Authenticate Access Token from Salesforce

### SQL: 

`SF_LOGIN_URL` = "https://login.salesforce.com"

`SF_USERNAME`= "Your Username"

`SF_PASSWORD` = "Your Password"

`SF_TOKEN` = "get your security token"

save in .env file

How to get Security Token?

![App Screenshot](https://salesforcefaqs.com/wp-content/uploads/2023/01/How-to-get-security-token-in-salesforce-1024x504.png)

![App Screenshot](https://salesforcefaqs.com/wp-content/uploads/2023/01/How-to-get-security-token-in-salesforce-lightning-1024x430.png)

![App Screenshot](https://salesforcefaqs.com/wp-content/uploads/2023/01/Get-security-toke-in-salesforce-1024x415.png)

![App Screenshot](https://salesforcefaqs.com/wp-content/uploads/2023/01/Get-security-token-in-salesforce-lightning-1536x655.png)

That's how you get a security token from email and save it in the .env file.

---

### Graphql

`SF_GRAPHQL_URL` = "GET YOUR URL"

`SF_GRAPHQL_SESSION_ID` = "GET YOUR SESSION ID"

`SF_GRAPHQL_VERSION` = "GET YOUR VERSION"

make sure you already install salesforce cli

open terminal 

Login the salesforce 

```bash
sfdx auth:web:login 
```

Once you scuessful login

```bash
sfdx force:org:display --targetusername <INSERT YOUR USERNAME>
```

`SF_GRAPHQL_URL` = "INSERT Instance Url"

`SF_GRAPHQL_SESSION_ID` = "INSERT Access Token"

`SF_GRAPHQL_VERSION` = "INSERT Api Version"


Now you officially login the salesforce and you query to that salesforce to get data by using either SQL or Graphql
