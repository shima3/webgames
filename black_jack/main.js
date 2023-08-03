        // HTML要素の変数割り当て
        var hit = document.getElementById('hit');
        var reset = document.getElementById('reset'); 
        var stand = document.getElementById('stand');
        var your_card = document.getElementById('your_card');
        var com_card =  document.getElementById('com_card');
        var your_sum = document.getElementById('your_sum');
        var com_sum = document.getElementById('com_sum');
        var your_sum_process = 0;
        var com_sum_process = 0;
        var result = document.getElementById('result');
        var record = [];

        // 初期化
        function Card(mark, num){
            this.mark = mark;
            this.num = num;
        };

        // トランプカードの初期生成
        var cards = [];
        function init(){
            var x = 0;
            for (var i = 1; i <= 13; i++){
                cards[x] = new Card("♠", i);
                x++;
                cards[x] = new Card("☘", i);
                x++;
                cards[x] = new Card("❤", i);
                x++;
                cards[x] = new Card("♦", i);
                x++;
            };
        };init();

        // リセットボタンの動作
        reset.addEventListener("click", function(){ 
          location.reload();
        });

        //ヒットボタンの動作
        hit.addEventListener("click", function(){
            if (your_sum_process > 21) {
              return;
            };
            if (com_sum_process > 0) {
              return;
            };

            var draw = Math.floor(Math.random()*52);
            while (record.indexOf(draw) >= 0){
                draw = Math.floor(Math.random()*52);
            }; 
            var your_box = document.createElement("td");
            var your_hand = document.createTextNode(cards[draw].mark + cards[draw].num);
            your_card.appendChild(your_box);
            your_box.appendChild(your_hand);
            record.push(draw);

            // 引いたカード別の動作
            switch(cards[draw].num) { 
                case 11:
                case 12:
                case 13:
                your_sum_process += 10;
                break;
                case 1:
                if ((your_sum_process + 11) <= 21){
                    your_sum_process += 11;
                } else {
                    your_sum_process += 1;
                };
                break;
                default:
                your_sum_process += cards[draw].num;
                break;
            };
            your_sum.innerHTML = your_sum_process;
            if (your_sum_process > 21) {
                hit.className = "btn inactive";
            };
            if (your_sum_process > 0) {
                stand.className = "btn";
            };
        }); 

        //スタンドボタンの動作
        stand.addEventListener("click", function(){
            if (your_sum_process == 0) {
              return;
            };
            
            while (com_sum_process <= 19){ // comがカードを引く条件
                var draw = Math.floor(Math.random()*52);
                while (record.indexOf(draw) >= 0){
                    draw = Math.floor(Math.random()*52); 
                }; 
                var com_box = document.createElement("td"); 
                var com_hand = document.createTextNode(cards[draw].mark + cards[draw].num);
                com_card.appendChild(com_box);
                com_box.appendChild(com_hand);
                record.push(draw);

                // 引いたカード別の動作
                switch(cards[draw].num){
                    case 11:
                    case 12:
                    case 13:
                    com_sum_process += 10;
                    break;

                    case 1:
                    if ((com_sum_process + 11) <= 21){
                        com_sum_process += 11;
                    } else {
                        com_sum_process += 1;
                    };
                    break;

                    default:
                    com_sum_process += cards[draw].num;
                    break;
                };
                com_sum.innerHTML = com_sum_process;

                //勝敗を決める
                if (your_sum_process < 22 && your_sum_process > com_sum_process){
                    result.innerHTML = "あなたの勝ちです！";
                } else if (your_sum_process < 22 && com_sum_process > 21){
                    result.innerHTML = "あなたの勝ちです！";
                }else if (your_sum_process < 22 && your_sum_process == com_sum_process){
                    result.innerHTML = "引き分けです。";
                } else if (your_sum_process > 21 && com_sum_process > 21){
                    result.innerHTML = "引き分けです。";
                } else {
                    result.innerHTML = "あなたの負けです…";
                };
            };
            
        });

