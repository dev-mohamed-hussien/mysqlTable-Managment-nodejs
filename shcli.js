////////////////////////////////////////////
//  delay function                        //
const delay =(ms) =>{                     //
const spp=new Date().getTime()            //
while(new Date().getTime() - spp<=ms){}   //
}                                         //
////////////////////////////////////////////
const colors = require('colors')          //
//////////////// block sudo ////////////////
const sudoBlock = require('sudo-block');  //
sudoBlock();                              //
////////////////////////////////////////////
// succses and wronge messege             //
const signale = require('signale');       //
////////////////////////////////////////////
// spinner loading animtion               //
const ora = require('ora');               //
const spinner = ora();                    //
////////////////////////////////////////////

// const gradient = require('gradient-string');
// console.log(gradient('cyan', 'pink')('Hello world!'));



var helpx =``+'usage :'.brightMagenta+ `  node` +` shcli `.red +`[options]
`+'Options: '.yellow + ` 
`+'-i '.cyan + `===> insert new data                    `+'-S '.cyan + `===========> select all data
`+'-d '.cyan + `===> delete data with condition         `+'-h(--help)'.cyan + ` ===> show how to use
`+'-s '.cyan + `===> select determineted data           `+'-a(--about) '.cyan + `==> about me
`+'-u '.cyan+ `===> update exists data with condition

*********************************`+'Optionals usage'.yellow + `****************************** 
`+'usage of insert (-i) : '.cyan + ` 
   node ` +` shcli `.red +`  [insert option]  [table_name]  [--coloum=value] 
   `+'ex. of insert :'.yellow + `  node ` +` shcli `.red +` -i table_name  --coloumx=valuex  
_______________________________________________________________________________
`+'usage of update (-u) :'.cyan + `  
   node ` +` shcli `.red +`  [update option]  [table_name]  [--coloum=value]  [condition]
   `+'ex. of update :'.yellow + ` node ` +` shcli `.red +` -u table_name --coloumx=valuex   where id '<' 5
                   node ` +` shcli `.red +` -u table_name --coloumx=valuex   where 1
_______________________________________________________________________________
`+'usage of delete (-d) :'.cyan + `
   node ` +` shcli `.red +` [delete option] [table_name] [condition]
   `+'ex. of delete :'.yellow + ` node ` +` shcli `.red +`   -d   table_name   where id '>' 5
                   node ` +` shcli `.red +`   -d   table_name   where 0
_______________________________________________________________________________
`+'usage of select all (-S) :'.cyan + ` 
   node ` +` shcli `.red +`  [select all option]  [table_name]
   `+'ex. of select all :'.yellow + ` node ` +` shcli `.red +` -S table_name
_______________________________________________________________________________
`+'usage of select (-s) : '.cyan+ `
   node ` +` shcli `.red +`  [select option]  [table_name]  [--coloum=value]  [condition]
   `+'ex. of select :'.yellow + ` node ` +` shcli `.red +` -s table_name --coloumx=valuex  where id = 5
                   node ` +` shcli `.red +` -s table_name --coloumx=valuex  where 1
_______________________________________________________________________________
`+'usage of help and about (-h or --help) and (-a or --about) : '.cyan+ `
   node ` +` shcli `.red +`  [help option]  . `+' ex. of help :'.yellow+ `  node ` +` shcli `.red +` -h 
   node ` +` shcli `.red +`  [about option]  .`+' ex. of about :'.yellow+ ` node ` +` shcli `.red +` -a 
_______________________________________________________________________________
`+'Notes :'.brightRed+ `if using (>,<,<=,>=) you should add '' around it to avoid redirection
`+'   ex:'.yellow+ `where 'id>5',where id '<=' 5,where 'id<' 5,where id '>=5'  `
//__________________________________________________________________________________________________
var aboutx = `    hi , iam a cli tool to managment database 
    but in fact i was programmed as a part of a smart home software
                        gocode : best wishes `;
  //____________________________________________________________________________________________________________________________________//
var cnames=[]; // array for name of columous
const args = require('minimist')(process.argv.slice(2))
const argss = require('minimist')(process.argv)

var argu=[]; // arguments of command value  args[cnames]
var argu_cnames =[]
var argu_concat =[]
//____________________________________ where _________________________________________________
var argu_where;
var argu_where_cons;
var e_gt_st;
var argu_where_value=[]
//_________________________________________if true hlp msg______________________________________________//
if(process.argv[2]=='-h'||process.argv[2]=='--help'||!process.argv[2]){
  
console.log(helpx);
  
 // console.log(helpx)


}
else if (process.argv[2]=='-a'||process.argv[2]=='--about')
{

  const logUpdate = require('log-update');

  const frames = ['-', '\\', '|', '/'];
  let i = 0;
  
  setInterval(() => {
    const frame = frames[i = ++i % frames.length];
  
    logUpdate(
  `
                                ♥♥ ${frame} 
          `+aboutx+` 
                               ${frame} ♥♥
  `
    );
  }, 80);

}

else{
  //_________________________________________my sql______________________________________________//

var mysql = require('mysql');
const dbc=require("./db_connect") // import object
var con = mysql.createConnection(dbc.connect); // add imported object

// start loading animtion
spinner.start(' start     connection to your database '.yellow);
setTimeout(() => { spinner.color = 'yellow'; spinner.text = ' start     connecting.. to your database on '.yellow + dbc.connect.host.magenta; }, 1000);
//

  con.connect(function(err) {
    if (err) 
    { 
      //  print fail loading animtion
      spinner.fail(' stoped     connecting to your database on '.red+dbc.connect.host.magenta)
      //  print fail msg
      signale.error("connection faild".red);
      //  print note msgs
      signale.note("cheak your server or internet connection".blue);
      signale.note("cheak your database name".blue);
      signale.note("cheak your username and password".blue);
    process.exit();  // leave app  
   }
          //  print succees loading animtion
    spinner.succeed(' started     connection on '.green+dbc.connect.host.magenta);
         //  print succees msg
    signale.success("connected to your database:".green,dbc.connect.database.magenta,"on host:".green,dbc.connect.host.magenta);
  });

//_________________________ get coloums in table , add it inside array and run functions ____________________________//
var get_coloums = "SELECT column_name FROM information_schema.columns WHERE table_schema = 'Z2dOKAOUU9' AND table_name = '"+process.argv[3]+"';";
delay(1000)
spinner.stop()
// start loading animtion
spinner.start(' start     cheak your table '.yellow);
setTimeout(() => { spinner.color = 'yellow'; spinner.text = ' starting     cheaking your table '.yellow; }, 1000);
////////////////////////

con.query(get_coloums,(err,result,fields)=>{
  if (err||result=="") {
          //  print fail loading animtion
    spinner.fail(' stoped     cheaking your table '.red);
          //  print fail msg
     signale.error("wrong table name".red);
      process.exit()
    }
  

              //  print succees loading animtion
    spinner.succeed(' started     cheaking your table '.green);
             //  print succees message   
  signale.success("founded the ".green+process.argv[3].magenta+" table".green);
  for(var i =0 ; i<result.length ; i++){
  cnames.push(result[i].COLUMN_NAME)
}
insert_args();
update_args();
delete_args();
view_table();
select_small();
})
}

//********************************************** function insert into argument **************************************************************//
  function insert_args( )
  {    
  var finally3=[]  // cnames
 if(process.argv[2]=='-i')
   {
   for(var j =0 ; j<cnames.length +9; j++)
   {    
    if(cnames[j]!=undefined){      finally3.push(cnames[j]);   }     //hna 5dt al3naser bs zyada i:table , _:-u , undefined : 3shan al length mzadoh fbegeb 3naser args mt7ttsh  
     if(args[cnames[j]])
     {
      argu.push('"'+args[cnames[j]]+'"');
     // finally2.push(Object.keys(args)[j+2]) //nfs al comment ali fo2 bs da ba5d feh al asami ali ad5lt bs msh kolo

     }
     else
     { 
      // args[cnames[j]]=0;
      // argu.push('"'+args[cnames[j]]+'"');
      // console.log("",cnames[j])
      }
     

   }

var sql = 'INSERT INTO '+process.argv[3]+' ('+ cnames +') VALUES ('+ argu+')';  
   con.query(sql ,[cnames], function (err, result) 
{   

 //  1
 finally3.push('_','i') //bdef al 3 anwa3 al zyada
 wrong_coloums = Object.keys(args).filter((el)=>{return finally3.indexOf(el)<0}) //bgeb alli f finallyl ali 3mltaha wmsh fi cnames wb7to fi array gdeda asmaha wrong_cpoloums
 //   2
          //finnally 2 mfehosh  el undifined 3shan mndafsh l2no gwa shart if fi al for wmfesh i._ cuz started j+2 in for
  not_inserted_coloums = finally3.filter((el)=>{return Object.keys(args).indexOf(el)<0})  // array bgeb feha al couloms ali mtd5ltsh  bkarn maben al finally2 feha kol al couloums als7 ali atktbt wbshelha  mnha al ba2i

    // advnced handling 
     if (err||wrong_coloums.length>=1||not_inserted_coloums.length>=1) 
    {
      signale.error("insertation faild".red);
         // if wrong_coloums feha 3naser da m3nah an fi couloums msh fe al table wda erorr
         if(wrong_coloums.length>=1)  {   signale.warn("this coloums:".yellow,"\x1b[35m",wrong_coloums," not defined inside your table:".yellow);    } 
      
         if(not_inserted_coloums.length>=1){  signale.warn("you have not inserted values inside this coloums:".yellow,"\x1b[35m",not_inserted_coloums);  }
         // 3 
         if(err) {      signale.warn("make sure you inserted right data types".yellow);     }
          //

           process.exit();
     
    }
  
   signale.success("done insert ".green,"\x1b[35m",argu," inside ".green,"\x1b[35m",cnames);
    console.log(); process.exit(); }) 
  }


}//scope function
///   using      node shcli -i table_name --id=2 --username=diaa --password=123456 --img=diaa --imp=11 

 //****************************************************function update the argument*********************************************************//
  function update_args( )
{ 
  
  for(var a=5;a<=cnames.length+5;a++)
  {
    
    if(process.argv[a]=='where')
   {
     {
       argu_where=process.argv[a];

//#(1)#        
       ///  where id = 5       
       if(process.argv[a+1]!=1&&process.argv[a+2]&&process.argv[a+3]) // 3 arguments after where
       {
         argu_where_cons = process.argv[a+1];
         e_gt_st = process.argv[a+2];
         argu_where_value.push("'"+process.argv[a+3]+"'")
       }
       
//#(2)#                                where id =5 , where id= 5 
else if (process.argv[a+1]&&process.argv[a+2]&&!process.argv[a+3])
{ // if last charcter in first argument after where = > < =< => then its ok equal to argu_where_cons
  // and 2nd in code query empty dosnt matter and 2nd argument after where in 3rd in sql query cuz quotes
  if(process.argv[a+1][process.argv[a+1].length-1]=="="||process.argv[a+1][process.argv[a+1].length-1]==">"||process.argv[a+1][process.argv[a+1].length-1]=="<")
{
  argu_where_cons = process.argv[a+1];
  e_gt_st = " ";
  argu_where_value.push("'"+process.argv[a+2]+"'")
}
else   // this mean if 2nd argument have = or > or < or =< or =>
{
  argu_where_cons = process.argv[a+1];
  e_gt_st = " ";
if ((process.argv[a+2][0]==">"&&process.argv[a+2][1]=="=")||(process.argv[a+2][0]=="<"&&process.argv[a+2][1]=="="))
{
  process.argv[a+2] = [process.argv[a+2].slice(0, 2), " '", process.argv[a+2].slice(2)].join('');
    process.argv[a+2] = process.argv[a+2] + "'"
    argu_where_value.push(process.argv[a+2])  }

    else{
      process.argv[a+2] = [process.argv[a+2].slice(0, 1), " '", process.argv[a+2].slice(1)].join('');
      process.argv[a+2] = process.argv[a+2] + "'"
      argu_where_value.push(process.argv[a+2])
    }
}
}
//#(3)##   one argument without spaces     where id=5    3shan a5leh mn 8er msafat   add quotes for argument after where
else if (process.argv[a+1].length>1&&!process.argv[a+2]){ // if argument after where mfesh b3doh argument w el length akbr mn 1 3shan at2kd ano msh al7ala ali bktb feha where 0 or where 1
  for (var i = 1 ; i<20 ; i++){
    if((process.argv[a+1][i]== "<"&&process.argv[a+1][i+1]== "=")||(process.argv[a+1][i]== ">"&&process.argv[a+1][i+1]== "=")){
      var b = " ";
    var position = i+2;
    process.argv[a+1] = [process.argv[a+1].slice(0, position), b, process.argv[a+1].slice(position)].join('');
    process.argv[a+1] = process.argv[a+1]+"";
    }
    else if(process.argv[a+1][i]== "="||process.argv[a+1][i]== ">"||process.argv[a+1][i]== "<"){
      var b = " '";
  var position = i+1;
   process.argv[a+1] = [process.argv[a+1].slice(0, position), b, process.argv[a+1].slice(position)].join('');
   process.argv[a+1] = process.argv[a+1]+"'";
  }
  }
          argu_where_cons = process.argv[a+1]
            e_gt_st = " "
            argu_where_value.push(" ")
         }
//#(4)##     where 0     where 1
       else  // 1 argument after where  0 or 1
        {
          argu_where_cons = process.argv[a+1];
          e_gt_st = " "
          argu_where_value.push(" ")
        }
      }
   }
  }
//#(2-1)#
 if(process.argv[2]=='-u')
  {
   for(var j =0 ; j<cnames.length ; j++)
   {
     if(args[cnames[j]])
     {
      argu_cnames.push(cnames[j])
      argu.push('"'+args[cnames[j]]+'"');
      argu_concat.push(cnames[j]+" = "+'"'+args[cnames[j]]+'"')
     }
     else{}
   }
   console.log(argu_cnames)
   var sql = "UPDATE "+process.argv[3]+" SET "+argu_concat+' '+argu_where+' '+argu_where_cons+e_gt_st+argu_where_value[0]+";"
    con.query(sql ,[argu_cnames], function (err, result)
     { if (err) throw err;  
      signale.success('update successful'.green);
    process.exit(); }) 
  }
}
// using       node shcli -u  table_name  --username=hd --img=ghgh  --imp=nano where id = 5

 //************************************************** function delete the argument ***********************************************************//
 function delete_args( )
 {  

  for(var a=4;a<=cnames.length+3;a++)
  {
    if(process.argv[a]=='where')
   {
     {
       argu_where=process.argv[a];
//#(1)#       where id = 5
       if(process.argv[a+1]!=0&&process.argv[a+2]&&process.argv[a+3])
       {
        argu_where_cons = process.argv[a+1];
        e_gt_st = process.argv[a+2];
        argu_where_value.push("'"+process.argv[a+3]+"'")
       }
//#(2)#      where id =5 , where id= 5
else if (process.argv[a+1]&&process.argv[a+2]&&!process.argv[a+3])
{// if last charcter in first argument after where = > < =< => then its ok equal to argu_where_cons
  // and 2nd in code query empty dosnt matter and 2nd argument after where in 3rd in sql query cuz quotes
  if(process.argv[a+1][process.argv[a+1].length-1]=="="||process.argv[a+1][process.argv[a+1].length-1]==">"||process.argv[a+1][process.argv[a+1].length-1]=="<")
{
  argu_where_cons = process.argv[a+1];
  e_gt_st = " ";
  argu_where_value.push("'"+process.argv[a+2]+"'")
}
else   // this mean if 2nd argument have = or > or < or =< or =>
{
  argu_where_cons = process.argv[a+1];
  e_gt_st = " ";
if ((process.argv[a+2][0]==">"&&process.argv[a+2][1]=="=")||(process.argv[a+2][0]=="<"&&process.argv[a+2][1]=="="))
{
  process.argv[a+2] = [process.argv[a+2].slice(0, 2), " '", process.argv[a+2].slice(2)].join('');
    process.argv[a+2] = process.argv[a+2] + "'"
    argu_where_value.push(process.argv[a+2])  }
    else{
      process.argv[a+2] = [process.argv[a+2].slice(0, 1), " '", process.argv[a+2].slice(1)].join('');
      process.argv[a+2] = process.argv[a+2] + "'"
      argu_where_value.push(process.argv[a+2])
    }
}
}
//#(3)#      one argument without spaces     where id=5    3shan a5leh mn 8er msafat       add quotes for argument after where
else if (process.argv[a+1].length>1&&!process.argv[a+2]){ // if argument after where mfesh b3doh argument w el length akbr mn 1 3shan at2kd ano msh al7ala ali bktb feha where 0 or where 1
  for (var i = 1 ; i<20 ; i++){
    if((process.argv[a+1][i]== "<"&&process.argv[a+1][i+1]== "=")||(process.argv[a+1][i]== ">"&&process.argv[a+1][i+1]== "=")){
        var b = " ";
    var position = i+2;
    process.argv[a+1] = [process.argv[a+1].slice(0, position), b, process.argv[a+1].slice(position)].join('');
    process.argv[a+1] = process.argv[a+1]+"";
    }
    else if(process.argv[a+1][i]== "="||process.argv[a+1][i]== ">"||process.argv[a+1][i]== "<"){
      var b = " '";
  var position = i+1;
   process.argv[a+1] = [process.argv[a+1].slice(0, position), b, process.argv[a+1].slice(position)].join('');
   process.argv[a+1] = process.argv[a+1]+"'";
  }
  }
   argu_where_cons = process.argv[a+1]
            e_gt_st = ""
            argu_where_value.push(" ")
         }
//#(4)#          where 0     where 1
       else
        {
          argu_where_cons = process.argv[a+1];  e_gt_st = " ";
          argu_where_value.push(" ")
        }
      }
   }
  }
//#(2-1)#
 if(process.argv[2]=='-d')
  {
   for(var j =0 ; j<cnames.length ; j++)
   {
     if(args[cnames[j]])
     {
      argu_cnames.push(cnames[j])
      argu.push('"'+args[cnames[j]]+'"');
      argu_concat.push(cnames[j]+" = "+'"'+args[cnames[j]]+'"')
     }
     else{}
   }
   var sql = "DELETE FROM "+process.argv[3]+' '+argu_where+' '+argu_where_cons+e_gt_st+argu_where_value[0]+";"
    con.query(sql ,[argu_cnames], function (err, result) { if (err) throw err;       signale.success('delete successfully'.green);   process.exit(); }) 
  }
}
// using          node shcli -d table_name  where id = 5
//delete all      node shcli -d table_name  where 0
//*************************************************** function general select the table *****************************************************//
 function view_table( )
 {
if(process.argv[2]=='-S')
 {
  var sql = "SELECT * FROM "+process.argv[3]+' '
    con.query(sql ,[cnames], function (err, result) { if (err) throw err;      signale.success('select successful:'.green,"\x1b[35m",result);   process.exit(); }) 
     }
 }
 //using          node shcli -S table_name
 //********************************************* function select small the argument *********************************************************//
 function select_small( )
 {    
   for(var a=3;a<=cnames.length+4;a++)
   {
     if(process.argv[a]=='where')
    {
      {
        argu_where=process.argv[a];
//#(1)#       where id = 5
       if(process.argv[a+1]!=1&&process.argv[a+2]&&process.argv[a+3])
        {
          argu_where_cons = process.argv[a+1];
          e_gt_st = process.argv[a+2];
          argu_where_value.push("'"+process.argv[a+3]+"'")
        }
//#(2)#               where id =5 , where id= 5
else if (process.argv[a+1]&&process.argv[a+2]&&!process.argv[a+3])
{  // if last charcter in first argument after where = > < =< => then its ok equal to argu_where_cons
  // and 2nd in code query empty dosnt matter and 2nd argument after where in 3rd in sql query cuz quoargumnttes
  if(process.argv[a+1][process.argv[a+1].length-1]=="="||process.argv[a+1][process.argv[a+1].length-1]==">"||process.argv[a+1][process.argv[a+1].length-1]=="<")
{
  argu_where_cons = process.argv[a+1];
  e_gt_st = " ";
  argu_where_value.push("'"+process.argv[a+2]+"'")
}
else   // this mean if 2nd argument have = or > or < or =< or =>
{
  argu_where_cons = process.argv[a+1];
  e_gt_st = " ";
if ((process.argv[a+2][0]==">"&&process.argv[a+2][1]=="=")||(process.argv[a+2][0]=="<"&&process.argv[a+2][1]=="="))
{
  process.argv[a+2] = [process.argv[a+2].slice(0, 2), " '", process.argv[a+2].slice(2)].join('');
    process.argv[a+2] = process.argv[a+2] + "'"
    argu_where_value.push(process.argv[a+2])  }
    else{
      process.argv[a+2] = [process.argv[a+2].slice(0, 1), " '", process.argv[a+2].slice(1)].join('');
      process.argv[a+2] = process.argv[a+2] + "'"
      argu_where_value.push(process.argv[a+2])
    }
}
}
//#(3)#    one argument without spaces   where id=5    3shan a5leh mn 8er msafat   add quotes for argument after where
else if (process.argv[a+1].length>1&&!process.argv[a+2]){ // if argument after where mfesh b3doh argument w el length akbr mn 1 3shan at2kd ano msh al7ala ali bktb feha where 0 or where 1
  for (var i = 1 ; i<20 ; i++){
    if((process.argv[a+1][i]== "<"&&process.argv[a+1][i+1]== "=")||(process.argv[a+1][i]== ">"&&process.argv[a+1][i+1]== "=")){ 
      var b = " ";
    var position = i+2;
    process.argv[a+1] = [process.argv[a+1].slice(0, position), b, process.argv[a+1].slice(position)].join('');
    process.argv[a+1] = process.argv[a+1]+"";
    }
    else if(process.argv[a+1][i]== "="||process.argv[a+1][i]== ">"||process.argv[a+1][i]== "<"){
      var b = " '";
  var position = i+1;
   process.argv[a+1] = [process.argv[a+1].slice(0, position), b, process.argv[a+1].slice(position)].join('');
   process.argv[a+1] = process.argv[a+1]+"'";
  }
  }
          argu_where_cons = process.argv[a+1]
            e_gt_st = " "
            argu_where_value.push(" ")
         }
//#(4)#        where 0     where 1
        else
         {
          argu_where_cons = process.argv[a+1];
          e_gt_st = " "
          argu_where_value.push(" ")
         }
       }
    }
   }
 //#(2-1)#
  if(process.argv[2]=='-s')
   {
    for(var j =0 ; j<cnames.length ; j++) {
       if(args[cnames[j]])
      {
       argu_cnames.push(cnames[j])
       argu.push('"'+args[cnames[j]]+'"');
       argu_concat.push(cnames[j]+" = "+'"'+args[cnames[j]]+'"')
      }
      else{}
    }
    var sql = "SELECT "+ argu_cnames +" FROM "+process.argv[3]+' '+argu_where+' '+argu_where_cons+ e_gt_st +argu_where_value[0]+";"
     con.query(sql ,[argu_cnames], function (err, result) { if (err) throw err;  signale.success('select successful:'.green,"\x1b[35m",result,"");  process.exit(); }) 
   }
 // using       node shcli -s table_name --username=hd --img=ghgh  --imp=nano where id = 5
 //******************************************************************************************************************************************//
} // of else of -h condition