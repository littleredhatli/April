/**
 * Created by 胖晶 on 2017/11/24.
 */
window.onload=function(){
    var data_ul=document.getElementsByClassName("data_ul")[0];
    var data_block=document.getElementsByClassName("data_block");
    var data_title=document.getElementsByClassName("data_title");
    var content_date=document.getElementsByClassName("content_date");
    var data_li=document.getElementsByClassName("data_li");
    var header_txt=document.getElementsByClassName("header_txt")[0];
    var content_area=document.getElementsByClassName("content_area")[0];
    var content_add=document.getElementsByClassName("content_add")[0];
    var header_submit=document.getElementsByClassName("header_submit")[0];
    var search_button=document.getElementsByClassName("search_button")[0];
    var search_block=document.getElementsByClassName("search_block")[0];
    var data=[
        {"title":"html知识总结","content":"HTML 指的是超文本标记语言: HyperText Markup LanguageHTML 不是一种编程语言，而是一种标记语言。标记语言是一套标记标签 (markup tag)HTML 使用标记标签来描述网页HTML 文档包含了HTML 标签及文本内容HTML文档也叫做 web 页面","datetime":"2017-11-03"},
        {"title":"会议内容总结","content":"贯彻落实习近平总书记的系列讲话。","datetime":"2017-11-12"}
    ];
    var storage=window.localStorage;
    storage.setItem("data",JSON.stringify(data));
    show_datali();
    show_dataContent();
    date=new Date();
    content_add.onclick=function(){
        header_txt.value="无标题笔记";
        content_area.value="";
        $(".header_txt").removeAttr("readonly");
        $(".content_area").removeAttr("readonly");
        header_submit.onclick=function(){
            data.push({"title":header_txt.value,"content":content_area.value,"datetime":date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()});
            storage.setItem("data",JSON.stringify(data));
            data_ul.innerHTML="";
            show_datali();
            show_dataContent();
            alert("保存成功！");
            $(".header_txt").attr("readonly","readonly");
            $(".content_area").attr("readonly","readonly");
        }
    }
    search_button.onclick=function(){
        if(search_block.value==""){
            for(var i=0;i<data_li.length;i++){
                data_li[i].style.display="block";
            }
        }
        for(var i=0;i<data.length;i++){
            if(data[i].title.indexOf(search_block.value)==-1){
                data_li[i].style.display="none";
            }
        }
    }
    console.log(data);
    function show_datali(){
        for(var i=0;i<data.length;i++){
            var data_li=document.createElement("li");
            data_li.className="data_li";
            $(".data_ul").prepend(data_li);
        }
        var data_block=document.createElement("div");
        data_block.className="data_block";
        $(".data_li").prepend(data_block);
        var content_date=document.createElement("p");
        content_date.className="content_date";
        $(".data_block").prepend(content_date);
        var data_title=document.createElement("p");
        data_title.className="data_title";
        $(".data_block").prepend(data_title);
        var data_block=document.getElementsByClassName("data_block");
        var data_title=document.getElementsByClassName("data_title");
        var content_date=document.getElementsByClassName("content_date");
        for(var i=0;i<data.length;i++){
            data_title[i].innerHTML=data[i].title;
            content_date[i].innerHTML=data[i].datetime;
        }
    }
    function show_dataContent(){
        $(".data_li").each(function(index){
            $(this).click(function(){
                for(var j=0;j<data_li.length;j++){
                    data_li[j].style.backgroundColor="white";
                    $(".btn_delete").remove();
                }
                if(data_li.length!=0){
                    data_li[index].style.backgroundColor="rgba(57, 153, 255, 0.2)";
                    var btn_delete=document.createElement("button");
                    btn_delete.className="btn_delete";
                    data_block[index].prepend(btn_delete);
                    btn_delete.innerHTML="删除";
                    header_txt.value=data[index].title;
                    content_area.value=data[index].content;
                    $(".header_txt").removeAttr("readonly");
                    $(".content_area").removeAttr("readonly");
                    var btn_delete=document.getElementsByClassName("btn_delete")[0];
                    btn_delete.onclick=function(){
                        data.splice(index,1);
                        index--;
                        if(index<0){
                            index=0;
                        }
                        storage.setItem("data",JSON.stringify(data));
                        data_ul.innerHTML="";
                        show_datali();
                        show_dataContent();
                        console.log(data);
                    }
                }
                if(data_li.length==0){
                    header_txt.value="欢迎使用有道云笔记";
                    content_area.value="";
                }
                header_submit.onclick=function(){
                    data[index].title=header_txt.value;
                    data[index].content=content_area.value;
                    data[index].datetime=date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
                    storage.setItem("data",JSON.stringify(data));
                    data_ul.innerHTML="";
                    show_datali();
                    show_dataContent();
                    alert("保存成功！");
                }
            });
        });
    }
}