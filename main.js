"use strict";
const readLineSync=require('readline-sync');

var studentList=[];
function main()//主要调用函数
{                  
    while(true)
        {
            let inputValue=readLineSync.question(
`            1.添加学生
            2.生成成绩单
            3.退出
            请输入你的选择（1～3）：`);
            if(inputValue==="1")
            {
            addStudent();
            }
            if(inputValue==="2")
            {
            buildScore();
            }
            if(inputValue==="3")
            {
                return ;
            }
        }
    
   
 
    
}


class Student//定义一个学生类,用来初始化各种属性和输出成绩单中学生的那一句话
{
            constructor(name,id,nation,klass,scores){
                this.name=name;
                this.id=id;
                this.nation=nation;
                this.klass=klass;
                scores.forEach((value,index,arr)=>{
                    let [course,score]=value.split(':');
                    score=Number(score);
                    if(course==='语文'){
                        this.chinese=score;
                    }else if(course==='数学'){
                        this.math=score;
                    }else if(course==='英语'){
                        this.english=score;
                    }else if(course==='编程'){
                        this.program=score;
                    }
                });
                this.total=this.chinese+this.math+this.english+this.program;
                this.average=(this.total/4).toFixed(2);
            }

            printScore(){
                return `${this.name}|${this.math}|${this.chinese}|${this.english}|${this.program}|${this.average}|${this.total}`;
    }
}




    function addStudent()//用来实现输入1的添加学生功能(其中调用了判断格式是否正确输出的函数)
{
                let student_info=readLineSync.question('请输入学生信息（格式：姓名, 学号, 民族, 班级, 学科: 成绩, ...），按回车提交：');
                let [name,id,nation,klass,...scores]=student_info.split(',');
                if(checkInputFormat(student_info)){
                    if(!checkSameStu(id)){
                        studentList.push(new Student(name,id,nation,klass,scores));
                        console.log(`学生${name}的成绩被添加!`);
                    }else{
                        console.log(`学生${name}，学号:${id}已经存在!`);
                    }
                }else{
                    do{
                        student_info=readLineSync.question('请按正确的格式输入（格式：姓名, 学号, 民族, 班级, 学科: 成绩, ...），按回车提交：');
                    }while(!checkInputFormat(student_info));
                    let [name,id,nation,klass,...scores]=student_info.split(',');
                    if(!checkSameStu(id)){
                        studentList.push(new Student(name,id,nation,klass,scores));                
                        console.log(`学生${name}的成绩被添加!`);
                    }else{
                        console.log(`学生${name},学号:${id}已经存在！`);
                    }
                }
}


    function checkInputFormat(student_info)
    {
        if(student_info.split(",").length===8)
            return true;
        else 
            return false;
    }
    function checkSameStu(id)
    {
        for(let i of studentList)
        {if(id===i.id)
            {
                return true;
            }
        }
        return false;
    }


    function buildScore()
    {   let totalAverage=0;
        let totalMiddle=0;
        for(let i of studentList)
            {
                totalAverage=totalAverage+i.total;
            }
            totalAverage=totalAverage/studentList.length;
        
        // if(studentList.length&1){
        // totalMiddle=studentList[Math.floor(studentList.length/2)].total;
        // }else{
        // totalMiddle=(studentList[studentList.length/2].total+studentList[studentList.length/2-1].total)/2;



   
        let result=`成绩单
        姓名|数学|语文|英语|编程|平均分|总分
        ========================`;
        for(let j of studentList)
            {
                result=result+j.printScore();
            }
            console.log(result) ;
     }


main();
