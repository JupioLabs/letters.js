# letters.js 0.1.1
A Letter Writing API

### Technologies

- Back End
   - [NodeJS](https://nodejs.org/)
   - [ExpressJS](expressjs.com/)
   - [MongoDB](https://www.mongodb.org/)
   - [Mongoose](mongoosejs.com/)
   - [nodemailer](https://github.com/andris9/Nodemailer)
   - [async](https://github.com/caolan/async)
- Front End
   - [Materialize](materializecss.com/)
   - [AngularJS](https://angularjs.org/)


## Todo List

### Project

- [ ] Rewrite Readme.md to reflect new project purpose as a general letter writing campaign SAAS
   - [ ] Lay out what ENV variables are necessary and what is to be configured in the config file
- [ ] Rewrite API routes and corresponding models to remove references to wards and councilors
- [ ] Remove all default values for user model
- [ ] Rewrite config file to be more generic, non specific to OneBrampton
- [ ] Split off comprehensive API documentation into seperate file/wiki
   - [ ] Write useful examples on main readme.md
   - [ ] Document required fields in API

### Back End

- Review the following:
- Validation for API requests __(Backburner until post-beta)__
   - Appropriate non-cryptic error messages & codes
   - Prevent foul play on the front end
   - Make sure only valid wards come in
   - Allow for non-brampton residents (no ward)
   - Make sure requests do not attempt to
- Authentication (API Key) __(Backburner until post-beta)__
- Email system
   - ~~Recieve email content from front end~~ **DONE**
   - Validate
      - Has a body
      - Has associated UserID
         - UserID exists in the DB
      - ~~Has Subject Line ("Hurontario-Mail LRT")~~ **DONE**
   - Validate
   - ~~Send to both regional and city councillor in the appropriate wards~~ **DONE**
   - ~~BCC city clerk, swing votes, and mayor~~ **DONE**


## Completed

### Back End

- All schemas
- Complete routing
- Email service that checks for unsent emails and sends them
- Created a separate settings.js file in /app/settings.js for ease of use
- Modularized middleware for secure API routes
- Basic Authentication now required on the following routes and methods:
   - POST
      - /api/templates
      - /api/reps
      - /api/wards
   - PUT
      - /api/templates
      - /api/reps
      - /api/wards
      - /api/users
      - /api/emails
   - GET (without ending /:user\_id or /:email\_id)
      - /api/users
      - /api/emails
   - DELETE
      - /api/templates
      - /api/reps
      - /api/wards
      - /api/users
      - /api/emails
- Validation
   - Currently only checks if expected parameters exist and responds with an error if not


## API Documentation

**(SECURE)**: Access to API restricted without admin credentials

### Users

#### Retrieving all Users **(SECURE)**
- __URL__: http://example.com/api/users
- __Method__: GET

#### Adding a User
- __URL__: http://example.com/api/users
- __Method__: POST
- Parameters:
```javascript
{
   firstName: String
   lastName: String
   email: String
   address: String
   city: { type: String, default: "Brampton" },
   province: { type: String, default: "ON" },
   postalCode: String,
   wardId: String
}
```

#### Retrieving a User
- __URL__: http://example.com/api/users/:user_id
- __Method__: GET

#### Updating a User **(SECURE)**
- __URL__: http://example.com/api/users/:user_id
- __Method__: PUT
- Parameters:
```javascript
{
   firstName: String
   lastName: String
   email: String
   address: String
   city: { type: String, default: "Brampton" },
   province: { type: String, default: "ON" },
   postalCode: String,
   wardId: String
}
```


#### Deleting a User **(SECURE)**
- __URL__: http://example.com/api/users/:user_id
- __Method__: DELETE


### Representatives

#### Retrieving all Representatives
- __URL__: http://example.com/api/reps
- __Method__: GET


#### Adding a Representative **(SECURE)**
- __URL__: http://example.com/api/reps
- __Method__: POST
- Parameters:
```javascript
{
   firstName: String
   lastName: String
   email: String
   address: String
   city: { type: String, default: "Brampton" },
   province: { type: String, default: "ON" },
   postalCode: String,
   wardId: String,
   regionalRep: Boolean,
   cityRep: Boolean
}
```

#### Retrieving a Representative
- __URL__: http://example.com/api/rep/:rep_id
- __Method__: GET

#### Updating a Representative **(SECURE)**
- __URL__: http://example.com/api/rep/:rep_id
- __Method__: PUT
- Parameters:
```javascript
{
   firstName: String
   lastName: String
   email: String
   address: String
   city: { type: String, default: "Brampton" },
   province: { type: String, default: "ON" },
   postalCode: String,
   wardId: String,
   regionalRep: Boolean,
   cityRep: Boolean
}
```

#### Deleting a Representative **(SECURE)**
- __URL__: http://example.com/api/rep/:rep_id
- __Method__: DELETE


### Wards

#### Retrieving all Wards
- __URL__: http://example.com/api/wards
- __Method__: GET

#### Adding a Ward **(SECURE)**
- __URL__: http://example.com/api/wards
- __Method__: POST
- Parameters:
```javascript
{
   name: String,
   numbers: [String]
}
```

#### Retrieving a Ward
- __URL__: http://example.com/api/wards/:ward_id
- __Method__: GET

#### Updating a Ward **(SECURE)**
- __URL__: http://example.com/api/wards/:ward_id
- __Method__: PUT
- Parameters:
```javascript
{
   name: String,
   numbers: [String]
}
```

#### Deleting a Ward **(SECURE)**
- __URL__: http://example.com/api/wards/:ward_id
- __Method__: DELETE


### Emails

#### Retrieving all Emails **(SECURE)**
- __URL__: http://example.com/api/emails
- __Method__: GET

#### Adding an Email
- __URL__: http://example.com/api/emails
- __Method__: POST
- Parameters:
```javascript
{
   userId: String,
   wardId: String,
   templateId: String
}
```

#### Retrieving an Email
- __URL__: http://example.com/api/emails/:email_id
- __Method__: GET

#### Updating an Email **(SECURE)**
- __URL__: http://example.com/api/emails/:email_id
- __Method__: PUT
- Parameters:
```javascript
{
   from: String,     // Email address
   to: [String],     // Array of email addresses
   bcc: [String],    // Array of email addresses
   body: String,     // Email body -> plaintext
   sent: { type: Boolean, default: false } // Backend use only
}
```

#### Deleting an Email **(SECURE)**
- __URL__: http://example.com/api/emails/:email_id
- __Method__: DELETE

#### Sending an Email **(SECURE)**
- __URL__: http://example.com/api/send/:email_id
- __Method__: GET

__Note: Check to make sure the email has not been sent before sending it. This can be done by retrieving the email to send and checking the returned JSON object: "sent". Note that use of this API route if for testing and administration purposes and the front-end should never attempt to use this route__


### Templates (New!)

#### Retrieving all Templates
- __URL__: http://example.com/api/templates
- __Method__: GET

#### Adding a Template **SECURE**
- __URL__: http://example.com/api/templates
- __Method__: POST
- Parameters:
```javascript
{
   body: String,
   subject: String,
   fromEmail: String,
   bcc: [String],
   active: Boolean
}
```

#### Retrieving a Template
- __URL__: http://example.com/api/templates/:template_id
- __Method__: GET

#### Updating a Template **(SECURE)**
- __URL__: http://example.com/api/templates/:template_id
- __Method__: PUT
- Parameters:
```javascript
{
   body: String,
   subject: String,
   fromEmail: String,
   bcc: [String],
   active: Boolean
}
```

#### Deleting a Template **(SECURE)**
- __URL__: http://example.com/api/templates/:template_id
- __Method__: DELETE
