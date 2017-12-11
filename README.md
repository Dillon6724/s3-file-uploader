# **Amazon S3 File Uploader**

### **Installation**
```javascript
npm install
npm start //starts webpack-dev-server
node bin/server.js //starts express server
```

### **Setup**

**Amazon Stuff:**
```javascript
touch bin/config.json //file that will hold the amazon keys
```
Get security credentials here http://docs.aws.amazon.com/general/latest/gr/aws-sec-cred-types.html#access-keys-and-secret-access-keys

 Open  `bin/db/user.json` in your editor and save the following json object :
```javascript
{
  "accessKeyId": "[ACCESS KEY ID]",
  "secretAccessKey": "[ACCCESS KEY]"
}

```

**DB Stuff:**

```javascript
touch bin/db/user.json //file that will hold the user that we will add to the db later
```
 Open  `bin/db/user.json` in your editor and save the following json object :
```javascript
{
  "email": "[ENTER EMAIL HERE]",
  "password": "[ENTER PASSWORD HERE]"
}
```
```javascript
node bin/db/migration.js //creates db file and adds user into db
```
