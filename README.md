# Auth App
## Routes
## Generate and Send Verification Code on Email
- /user/send-verification-code : post
#### This route will get an email from user and send verification code to that email if it exists in database
```
{
    email: ""
}
```

- /venue-owner/send-verification-code : post
#### This route will get an email from venue owner and send verification code to that email if it exists in database
```
{
    email: ""
}
```

- /health-official/send-verification-code : post
#### This route will get an email from health official and send verification code to that email if it exists in database
```
{
    email: ""
}
```

## Forget password by entering verification code and new password
### This route will update new password for user if verification code matches
- /user/forget-password : post
```
{
    email: ""
    verificationCode: ""
    password: ""
}
```

### This route will update new password for venue owner if verification code matches
- /venue-owner/forget-password : post
```
{
    email: ""
    verificationCode: ""
    password: ""
}
```

### This route will update new password for health official if verification code matches
- /health-official/forget-password : post
```
{
    email: ""
    verificationCode: ""
    password: ""
}
```

## Health official can create a new health official if the first one exits in database otherwise only admin can create

### This route will register an email of new health official and a verification code will send to that email for furter process of creation
- /health-official/register
```
{
    registeredOfficialEmail: ""
    newOfficialEmail: ""
}
```

### This route will create other credentials of new health official if verificaation code matches
- /health-official/verify-new-official
```
{
   newOfficialEmail: ""
   verificationCode: ""
   name: ""
   password: ""
   familyName: ""
   phone: ""
}
```