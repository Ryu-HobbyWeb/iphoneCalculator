let input = document.getElementById('inputBox');
let buttons = document.querySelectorAll('button');

// 数式を保存
let string = "";
let arr = Array.from(buttons);

// ボタンを配列に変換して各ボタンにクリックイベントを追加
arr.forEach(button => {
  button.addEventListener('click', (e) => {
    // クリックされたボタンの内容取得
    const buttonText = e.target.innerHTML;

    if (buttonText === '=') { // 数式を計算して結果を取得
      string = calculateResult(string);
    } else if (buttonText === 'AC') { // 数式を初期化
      string = "";
    } else if (buttonText === 'DE') { // 数式の最後の文字を除去
      string = string.slice(0, -1);
    } else if (buttonText === 'X') { // 数式に「*」演算子を追加
      string += '*';
    } else { // 数字や演算子の場合、その内容を数式に追加
      string += buttonText;
    }

    // InputBoxに数式を表示
    input.value = string;
  });
});

// 数式をチェックして結果を返す
function calculateResult(expression) {
  let result;
  try {
    result = evaluateExpression(expression);
  } catch (error) {
    result = "Error";
  }
  return result;
}

// 数式をチェックして結果を計算
function evaluateExpression(expression) {
  const operators = {
    '+': true,
    '-': true,
    '*': true,
    '/': true,
    '%': true,
  };

  // 数式から、数字を抽出して配列として保存
  const numbers = expression.split(/[-+*/%]/);
  // 数式から、演算子を抽出して配列として保存
  const operatorsArray = expression.split(/[0-9.]/).filter(Boolean);

  // 結果初期化
  let result = parseFloat(numbers[0]);

  for (let i = 0; i < operatorsArray.length; i++) {
    const operator = operatorsArray[i];
    const number = parseFloat(numbers[i + 1]);

    if (operators[operator]) {
      switch (operator) {
        case '+':
          result += number;
          break;
        case '-':
          result -= number;
          break;
        case '*':
          result *= number;
          break;
        case '/':
          result /= number;
          break;
        case '%':
          result %= number;
          break;
      }
    }
  }

  // 結果を文字列に返す
  return result.toString();
}