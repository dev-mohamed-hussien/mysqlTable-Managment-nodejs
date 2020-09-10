# mysqlTable-Managment-nodejs
table mysql database managment by nodejs


insert your database info inside  file db_connect.js

run cd folder_of_project && npm install 

run by :  node shcli.js

usage :  node shcli [options]
Options:  
-i ===> insert new data                    -S ===========> select all data
-d ===> delete data with condition         -h(--help) ===> show how to use
-s ===> select determineted data           -a(--about) ==> about me
-u ===> update exists data with condition

*********************************Optionals usage****************************** 
usage of insert (-i) :  
   node  shcli   [insert option]  [table_name]  [--coloum=value] 
   ex. of insert :  node  shcli  -i table_name  --coloumx=valuex  
_______________________________________________________________________________
usage of update (-u) :  
   node  shcli   [update option]  [table_name]  [--coloum=value]  [condition]
   ex. of update : node  shcli  -u table_name --coloumx=valuex   where id '<' 5
                   node  shcli  -u table_name --coloumx=valuex   where 1
_______________________________________________________________________________
usage of delete (-d) :
   node  shcli  [delete option] [table_name] [condition]
   ex. of delete : node  shcli    -d   table_name   where id '>' 5
                   node  shcli    -d   table_name   where 0
_______________________________________________________________________________
usage of select all (-S) : 
   node  shcli   [select all option]  [table_name]
   ex. of select all : node  shcli  -S table_name
_______________________________________________________________________________
usage of select (-s) : 
   node  shcli   [select option]  [table_name]  [--coloum=value]  [condition]
   ex. of select : node  shcli  -s table_name --coloumx=valuex  where id = 5
                   node  shcli  -s table_name --coloumx=valuex  where 1
_______________________________________________________________________________
usage of help and about (-h or --help) and (-a or --about) : 
   node  shcli   [help option]  .  ex. of help :  node  shcli  -h 
   node  shcli   [about option]  . ex. of about : node  shcli  -a 
_______________________________________________________________________________
Notes :if using (>,<,<=,>=) you should add '' around it to avoid redirection
   ex:where 'id>5',where id '<=' 5,where 'id<' 5,where id '>=5'  

