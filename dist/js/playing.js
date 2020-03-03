(function($,root){
    var $scope = $(document.body);
    var $playList = $("<div class='play-list'>" + 
        "<div class='list-header'>播放列表</div>"+
        "<ul class='list-wrapper'></ul>"+
        "<div class='close-btn'>关闭</div>"+
        "</div>")
        function render(){
            var html = "";
            for(var i = 0;i < data.length;i++){
                html +="<li><h3>"+data[i].song+"-<span>"+data[i].singer+"</span></h3></li>";
            }
            $playList.find(".list-wrapper").html(html);
            $scope.append($playList);
        }
        root.playlist = {
            render : render
        }
}(window.Zepto,window.player || (window.player = {})))