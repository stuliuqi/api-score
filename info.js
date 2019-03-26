var http = require('http');
var url = require('url');
var querystring = require('querystring');
var mysql      = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'liuqi13719779484',
  database : 'info'
});
 
connection.connect();

// 二、创建http服务器
var server = http.createServer(function(req,res){     
    var pathname = url.parse(req.url).pathname;  //定义pathname为 获取url
    
	//url.parse()第二个参数为true，query属性会生成一个对象，如果为false,则返回url对象上的query属性会是一个未解析，未解码的字符串，默认为false
    
	var query = url.parse(req.url,true).query;  //query 是一个获取url中参数的变量
    
	var id_student = query.id_student;   //定义student_id 为 student_id的参数值
	var id_course  = query.id_course; 	 //定义course_id  为 course_id的参数值
		
	
//三、根据参数返回指定数值	
	if (pathname == '/api/query_score'){   //确定url为所规定的格式（api文档里的）
		
        if(id_student && id_course) {    // 如果存在 id_student 和 id_course
                 		
			var sql = 'SELECT * FROM mytable'  
    
			connection.query(sql, function (error, result){  //将url中的参数与数据库进行连接、比对
				if (error){   //参数不匹配
					console.log('wrong'); 
				return;
				}
				
				if(result){	  //参数匹配，开始读取数据
					for ( var i = 0; i < result.length ; i++ ){   //从数据第一行开始匹配
							  //参数匹配时，输出成绩
						if ( result[i].id_course == id_course && result[i].id_student == id_student ){							     
						    res.write('成绩：'+result[i].score); 	
						break; 							
						}						
					}	
				} 				
			res.end();			
			});
		};
			
    };

}).listen(3000);