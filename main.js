        //1.初始化数据
        var hashA = init()
        var keys = hashA['keys']
        var hash = hashA['hash']


        //2.生成键盘
        generateKeyboard(keys,hash)//遍历 keys，生成 kbd 标签
        

        //3.监听用户动作
        listenToUser(hash)


        //下面是工具函数
  
        function getFromLocalStorage(name){
            return JSON.parse(localStorage.getItem(name) || 'null')
        }
        
        function tag(tagName){
            return document.createElement(tagName)
        }//简化代码

        function createSpan(textContent){
                var span = tag('span')
                span.textContent = textContent//定义内容
                span.className = 'text'
                return span
        }

        function createButton(id) {
            var button = tag('button')
            button.textContent = "E"
            button.id = id//获取网页favicon（网站图标）
            button.onclick = function (aaa) {// 监听键盘事件，function()里面可随意命名，如aaa
                //aaa['targrt'就是用户点击的元素]
                var button2 = aaa['target']
                var img2 = button2.previousSibling
                var key = button2['id']// q w e r t
                var x = prompt('给键位'+ key +'一个网站地址，如:baidu.com')// qq.com
                if(x){
                    hash[key] = x // hash变更
                }else{
                    return hash[key]
                }
          
                img2.src = 'http://' + x + '/favicon.ico'

                img2.onerror = function (xxx) {//监听错误
                    xxx.target.src = 'https://i.loli.net/2018/05/02/5ae95aee4a6c2.png'
                }
                localStorage.setItem('zzz', JSON.stringify(hash))// 将用户提交的操作存档到localStorage        
            }
            return button
            
        }

        function createImage(domain){
            var img = tag('img')
            if (domain) {
                img.src = 'http://' + domain + '/favicon.ico'//网站logo路径
            } else {
                img.src = '//i.loli.net/2018/05/02/5ae95aee4a6c2.png'
            }
            img.onerror = function (xxx) {//监听错误
                xxx.target.src = 'https://i.loli.net/2018/05/02/5ae95aee4a6c2.png'//把错误的图片替换成正确的
            }
            return img
        }

        function init(){
                var keys = {
                0: ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],//这是简写，hash规范写法：'0':{0:'q',1:'w',2:'e',3:'r',4:'t',5:'y',6:'u',7:'i',8:'o',9:'p',length:10},
                1: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
                2: ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
                'length': 3
            }
            var hash = {
                q: 'www.qq.com',
                w: 'www.weibo.com',
                t: 'taobao.com',
                z: 'zhihu.com',
                j: 'jianshu.com',
                i: 'iqiyi.com',
                b: 'www.baidu.com',
                p: 'www.pexels.com',
                v: 'mp.weixin.qq.com',
                g: 'github.com',
                //hash规范写法：'q':'qq.com','w':'weibo.com'......

            }
            //取出存在 localStorage 中的 zzz 对应的 hash
            var hashInLocalStorage = getFromLocalStorage('zzz')
            if(hashInLocalStorage){
                hash = hashInLocalStorage
            }
            return {
                "keys": keys,
                "hash": hash,
            }
        }
        
        function generateKeyboard(keys,hush){
            for(var index=0;index< keys['length'];index = index + 1){//0 1 2   用for循环代替while循环
            var div = tag('div')
            div.className = 'row'
            
            main.appendChild(div)

            var row = keys[index]//第一个数组  第二个数组  第三个数组
            for(var index2=0;index2< row['length'];index2 = index2 + 1){//0~9  0~8  0~6
                var span = createSpan(row[index2])//定义内容
            
                var button = createButton(row[index2])
                
                var img = createImage(hash[row[index2]])
                
                    var kbd = tag('kbd')
                    kbd.className = 'key'
                    kbd.appendChild(span)
                    kbd.appendChild(img)
                    kbd.appendChild(button)//在kbd中加入按钮button    
                    div.appendChild(kbd) 
            }
            }
        }

        function listenToUser(hash){
         document.onkeypress = function(lalala){ // 监听键盘事件
            var key = lalala['key']// q w e
            var website = hash[key]
            // location.href = 'http://'+website
            if(website === undefined || website === null){
                return
            }else{
            window.open('http://'+website, '_blank')//在新标签页打开网址，上面的代码是在当前页打开
            }
        }
    }