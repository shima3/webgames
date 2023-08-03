  // HTML要素の変数割り当て
  const input = document.querySelector('.input');
  const judge = document.querySelector('.judge');
  const judge_Clear = document.querySelector('.judge-clear');
  const challenge = document.querySelector('.challenge_num');
  const result = document.querySelector('.result');
  const result_Hit = document.querySelector('.result-hit');
  const result_Blow = document.querySelector('.result-blow');

  let flag = false; // 判定済フラグ
  let challenge_num = 0; // 判定回数の初期化

  // 正解の初期化
  let answer_unit = new Array(3);
  let answer;

  //1番目の数値生成
  answer_unit[0] = Math.floor( Math.random() * 10 ) ;
  answer = answer_unit[0];

  // 2番目以降の数値生成
  for(let n=1; n<3; n++){

    // 重複判定
    let duplicate_judge = "false";
    while(duplicate_judge == "false"){
      answer_unit[n] = Math.floor( Math.random() * 10 ) ;
      if(answer_unit[n-1] != answer_unit[n] && answer_unit[n-2] != answer_unit[n]){
        answer = answer + String(answer_unit[n]);
        duplicate_judge = "true";
      }
    }
  }

  // クリアが押された時の処理
  judge_Clear.addEventListener('click', () => {
    clearInput(); // inputクリア
    clearResult(); //resultクリア
  });

  function clearInput() { // inputの値をクリア
    input.value = "";
  }

  function clearResult() { // hit数、blow数,入力した文字をクリア
    const resultText = document.querySelectorAll('.js-result-text');
    if (resultText) {
      for (let i = 0; i < resultText.length; i++) {
        resultText[i].innerHTML = "";
      }
    }
  }

  // 判定が押された時の処理
  judge.addEventListener('click', () => {
    // 入力判定
    if(isNaN(input.value)){
      alert("数値を入力してください");
    }
    else if(String(input.value).length != 3){
      alert("3桁の数字を入力してください");
    }
    else{
      const strings = input.value.split(''); // 入力された数値を1桁ずつ分割
      challenge_num++; //判定回数増加
      let hitCount = 0;
      let blowCount = 0;

      // 判定済みの場合はresultクリア
      if (flag) {
        clearResult();
      }

      // HIt&Blow判定
      for (let i = 0; i < strings.length; i++) {
        if (strings[i] === answer[i]) {
          hitCount++;
        }
        else if (answer.includes(strings[i])) {
          blowCount++;
        }
      }
      if(hitCount == 3){
        alert("正解です！");
      }
      // --------------

      // 判定ログの動的処理
      let aaa = "【"+input.value+"】"+"HIT:"+hitCount+" / "+"BLOW:"+blowCount;
      var newElement = document.createElement("p");
      var newContent = document.createTextNode(aaa);
      newElement.appendChild(newContent);
      newElement.setAttribute("id","log_p2");
      
      var parentDiv = document.getElementById("parent-div");
      var childP1 = document.getElementById("log_p1");
      parentDiv.insertBefore(newElement, childP1.nextSibling);
      // -----------------------

      // 判定結果の出力
      const setChallenge_num = `<span class="js-result-text">${challenge_num}</span>`;
      const setResultText = `<span class="js-result-text">${input.value}</span>`;
      const setResult_HitText = `<span class="js-result-text">${hitCount}</span>`;
      const setResult_BlowText = `<span class="js-result-text">${blowCount}</span>`;
      
      challenge.insertAdjacentHTML("afterend",  setChallenge_num);
      result.insertAdjacentHTML("afterend",  setResultText);
      result_Hit.insertAdjacentHTML("afterend", setResult_HitText);
      result_Blow.insertAdjacentHTML("afterend", setResult_BlowText);
      // -----------------------

      clearInput();
      flag = true;
    }
  });