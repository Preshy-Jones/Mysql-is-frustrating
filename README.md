https://mysqlauthday20.herokuapp.com/signup

    host: 'us-cdbr-east-06.cleardb.net',
    user: 'bfc148d01d2b40',
    password: 'eee07c6c',
    database: 'heroku_5b4be569d534dc8',
TASK COMPLETED

# Mysql-is-frustrating
The api "http://jsonplaceholder.typicode.com/users" when visited, returns an array of 10 users in json form(I advise you visit the adress in your browser to see and study the file structure). Task: 1. Create a remote MySQL database with a table called Users. 2. Write and deploy a script that connects to the database. When the api endpoint "/populate" is accessed, a function that would create columns for id, name, username, and email then populate the columns with the respective data for each user gotten from the users api provided. 3. Create an api end point such that when the "/delete" route is accessed, the last row in the database is deleted. Note 1. Apart from ID, all other Columns are strings. Note 2. The datafrom the users api is to be fetched each time the scripts api endpoint is accessed. Note 3. When you submit, ensure that the database is empty. It is when the api endpoint is accessed that your script would populate the database In the read me file, along with the api endpoint for your script, the following information about your database should be provided. Database Host Database Username Database Password Database Port Hint, Heroku has a free MySQL hosting service called clearDB. You may learn to use that.
