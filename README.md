# JS30

![JS30 Banner](https://camo.githubusercontent.com/07ca65497065dd926bd889c53b7b7652f8ef3cbc4320739cf7ebed3c4d34cb2d/68747470733a2f2f6a61766173637269707433302e636f6d2f696d616765732f4a53332d736f6369616c2d73686172652e706e67)

> 關於一些小練習 \
> 練習來源：[JS30](https://javascript30.com/) \
> 參考影片：[Alex 宅幹嘛 - 深入淺出 Javascript30 快速導覽](https://www.youtube.com/playlist?list=PLEfh-m_KG4dYbxVoYDyT_fmXZHnuKg2Fq)

JS30 是來自一個加拿大工程師所提供的線上免費學習資源，30 天 30 個主題玩轉 JavaScript ~~(還是被JavaScript玩)~~。

## Let's Start

### JavaScript Drum Kit

按下按鍵發出聲音，畫面也會隨著點擊有 `:hover` 的觸發

#### Note

-  `data-key` 用來抓事件屬性 key 值 > [keycode.info](https://keycode.info/) 可以快速知道鍵盤按鍵的 ASCII CODE
-  keydown vs keyup \
   一個是按下觸發，一個是按鍵放開的時候觸發，要自己想一下哪個是要的效果
-  querySlector vs getElementById \
   前者取得的是靜態陣列，除非重取，不然一開始取到什麼就是什麼；後者是動態陣列，會隨著畫面上的元件變動不斷改變
-  `scale(variable)` 可以改動縮放倍率， `transition` 的時間可以調整動畫速度
-  除錯點 1 \
   沒有的 keyCode audio 會噴錯
-  除錯點 2 \
   聲音有些有播有些沒播 > `audio.currentTime = 0;`
-  除錯點 3 \
   樣式的拔除 > `dom.classList.remove('playing');`
-  除錯點 4 \
   對 `document.querySelectorAll('.key')` 監聽 \
   `document.querySelectorAll('.key')` 是 NodeList 不是要監聽的對象
-  除錯點 5 \
   不可以直接使用 `keyup` 去做樣式移除的判斷 \
   一開始因為音樂很短沒有注意到，但 `keyup` 的時間點並不是音樂播放結束的時間點 \
   後來注意到他是對每個有 key class 的 div 去做 `transitionend` 的監聽及樣式拔除
-  除錯點 6 \
   不適合在這個例子裡用 `toggle` 去做樣式的新增移除 \
   因為他的觸發時間點是 `transitionend`，每次 transition 變動結束後都會觸發 `transitionend`，所以會不斷的觸發 ~~，然後你就擁有了一閃一閃亮晶晶的效果~~

#### 補充

-  **IIFE 立即函式** \
   是一個定義完就馬上執行的函式。 \
   關門 > 把 JS 全都包起來不會讓外面取得裡面的函式，也不會互相汙染影響。

-  **classList**
   -  add (新增) \
      `dom.classList.add('playing');`
   -  remove (移除) \
      `dom.classList.remove('playing');`
   -  toggle (切換) \
      `dom.classList.toggle('playing');` \
      在新增跟移除做與原本相反的切換

-  `Array.from()` \
   會從類陣列（array-like）或是可迭代（iterable）物件建立一個新的 Array 實體。 \
   NodeList 不是 Array
-  target vs currentTarget
   target 抓到的是觸發事件的物件，currentTarget 抓的是繫結的物件

#### 參考資料

- [Event.target](https://developer.mozilla.org/zh-TW/docs/Web/API/Event/target)
- [Event.currentTarget](https://developer.mozilla.org/zh-TW/docs/Web/API/Event/currentTarget)
- [e.currentTarget與e.target的區別](https://www.itread01.com/content/1545071047.html)

### JS and CSS Clock

時鐘

#### Note

-  在 Alex 的示範中是用 `:after` 的方式去給設定 \
   從一開始的走向就跟 Wes Bos 不一樣 \
   要注意給樣式的對象是 `class` 本身還是 `:after` 跟 `:before`
-  setInterval vs setTimeout
   前者會隨著時間不斷觸發，後者只執行一次，如果要持續執行就會在 function 裡呼叫自己的地回去達到目的
-  除錯點 1 \
   針的自轉
   -  在 Wes Bos 的示範中是加上了 `transform-origin: 100%;` \
      因為預設是 `transform-origin: 50%;` 將基準設在中間才會自轉
   -  在 Alex 的示範中是用整個區塊旋轉帶動針的旋轉 ( `rotate(deg)` 是加在 `.hand` 上不是 `:after` ) \
      所以就沒有針的自轉的問題

#### 補充

-  `;(function() {})()` 前面的分號比較像為了避免前面的 function 結尾沒有加 `;` 可能會有問題所以才加的預防措施
-  更新速度取決於螢幕刷新率，如果螢幕刷新率不夠設再低也沒用 \
   60 HZ 最快約 17 ms 更新一次，144 HZ 最快約 7 ms 更新一次
-  `requestAnimationFrame` 用法有點像 `setTimeout`，刷新速度取決於硬體能力 \
   更新是靠畫面硬體更新，不需要再去給更新時間，canvas 多使用

### CSS Variables

利用調整 CSS Variables 去調整 CSS 樣式

#### Note

-  如果要用 JS 去控制 CSS Sass是做不到的，根本性不同是 Sass 是編譯階段，而 CSS Variables 是執行階段
-  CSS Variables 相容性上 IE 不支援
-  `:root` 等同於 `html` (哪泥!?) \
   `document.querySelector(':root') === document.querySelector('html')` > true \
   `document.querySelector(':root') === document.documentElement` > true
-  直接設定當需要被設定的地方一多就會長的很可怕，用變數統一管理，改一個就改全部
-  `data-sizing` 將單位交由使用者決定，js 只做有無的邏輯判斷
   `data-sizing` 要用 `this.dataset.sizing` 去取
-  除錯點 1 \
   如果單純只有對 `mousemove` 事件去做監聽會有問題，color 選色並沒有將鼠標移到物件的區域
-  除錯點 2 \
   `document.documentElement.style['--' + this.name]` 中括號裡的值不能用組的

#### 補充

-  箭頭函式 `() => {}` \
   沒有自己的 `this` 會繼承外層的 `this`

### Array Cardio Day 1

Array 的案例介紹

#### Note

-  `Array.prototype.filter(function callback(element[, index[, array]]){}[, thisArg])` \
   在這裡的 callback function 是一個斷言，用於測試陣列中的每個元素。 \
   回傳值為 true 時將當前的元素保留至新陣列中，若為 false 則不保留。 \
   範例
   ```javascript
   let arr = ['B', 'A', 'E', 'C', 'A', 'F', 'G', 'E'];

   let newArr = arr.filter(function (element, index, self) {
   return self.indexOf(element) === index;
   });

   newArr; // ["B", "A", "E", "C", "F", "G"]
   ```
-  `Array.prototype.map(function callback(currentValue[, index[, array]]) {}[, thisArg])` \
   將原陣列的元素經過運算後保留至新陣列中 \
   如果不需要回傳新陣列就不需要用 `map()`
-  map vs forEach \
   foeEach 沒有回傳值，如果要生成新陣列要先 new 一個 array 再一個個 push
-  `Array.prototype.sort([compareFunction])` \
   如果沒有寫 compare function 直接呼叫使用會利用 Unicode 進行排列
   如果有寫 compare function，回傳值決定排列順序

   -  < 0 順序不變
   -  === 0 順序不變
   -  \> 0 交換位置

   預設用字串比較，如果不是用減法去算會有問題
-  `Array.prototype.reduce(function callback(accumulator, currentValue[, currentIndex[, array]]) {}[, initialValue])`
   -  `accumulator` 用來累積回呼函式回傳值的累加器
   -  `currentValue` 原陣列目前所迭代處理中的元素
   -  `currentIndex` 原陣列目前所迭代處理中的元素之索引 \
      若有傳入 initialValue，則由索引 0 之元素開始，若無則自索引 1 之元素開始。
   -  `initialValue` 是第一次呼叫 callback function 時要傳入的累加器初始值。 \
      若沒有提供初始值，則原陣列的第一個元素將會被當作初始的累加器。 \
      假如於一個空陣列呼叫 `reduce()` 方法且沒有提供累加器初始值，將會發生錯誤。
-  除錯點 1 \
   NodeList 不是陣列，Array-Like 沒有 `map()`，要用 `Array.from()` 轉
-  除錯點 2 \
   `reduce()` 的使用上要注意初始值賦值

#### 補充

-  `Array.prototype.sort([compareFunction])` \
   -  排列非 ASCII 字元，利用 `String.localeCompare()`
      ```javascript
      var items = ['réservé', 'premier', 'cliché', 'communiqué', 'café', 'adieu'];
      items.sort(function (a, b) {
      return a.localeCompare(b);
      });
      // items is ['adieu', 'café', 'cliché', 'communiqué', 'premier', 'réservé']
      ```
   -  `compareFunction(a, b)` 在給予一組特定元素 a 及 b 為此函數之兩引數時必須總是回傳相同的值。若回傳值不一致，排序順序則為 undefined。
-  `sort()` 在大部分瀏覽器都支援穩定排序，但 IE 會有不穩定排序的問題
-  解構賦值
   -  從陣列解構賦值(Array destructuring)
      ```javascript
      // 基本用法
      const [a, b] = [1, 2] // a=1, b=2

      // 先宣告後指定值，要用let才行
      let a, b
      [a, b] = [1, 2]

      // 略過某些值
      const [a, , b] = [1, 2, 3] // a=1, b=3

      // 其餘運算
      const [a, ...b] = [1, 2, 3] // a=1, b=[2,3]

      // 失敗保護
      const [, , , a, b] = [1, 2, 3] // a=undefined, b=undefined

      // 交換值
      const a = 1, b = 2;
      [b, a] = [a, b] // a=2, b=1

      // 多維複雜陣列
      const [a, [b, [c, d]]] = [1, [2, [[[3, 4], 5], 6]]]

      // 字串
      const str = "hello";
      const [a, b, c, d, e] = str
      ```

   -  從物件解構賦值(Object destructuring)
      ```javascript
      // 基本用法
      const { user: x } = { user: 5 } // x=5

      // 失敗保護(Fail-safe)
      const { user: x } = { user2: 5 } // x=undefined

      // 賦予新的變數名稱
      const { prop: x, prop2: y } = { prop: 5, prop2: 10 } // x=5, y=10

      // 屬性賦值語法
      const { prop: prop, prop2: prop2 } = { prop: 5, prop2: 10 } // prop = 5, prop2=10

      // 相當於上一行的簡短語法(Short-hand syntax)
      const { prop, prop2 } = { prop: 5, prop2: 10 } // prop = 5, prop2=10

      // ES7+的物件屬性其餘運算符
      const {a, b, ...rest} = {a:1, b:2, c:3, d:4} // a=1, b=2, rest={c:3, d:4}
      ```

   -  ```javascript
         let a, b
         { a, b } = {a: 1, b: 2} // 錯誤寫法
         ({ a, b } = {a: 1, b: 2}) // a=1, b=2
      ```
      雖然使用 `{}` 是物件的宣告符號，但當前方沒有 `let` `const` `var` 這些宣告字詞時，則是代表程式碼的區塊 \
      在外面再加上括號符號 `()` 讓他變成表達式

   -  ```javascript
      // 混用物件與陣列
      const {prop: x, prop2: [, y]} = {prop: 5, prop2: [10, 100]}

      console.log(x, y) // => 5 100

      // 複雜多層次的物件
      const {
      prop: x,
      prop2: {
         prop2: {
            nested: [ , , b]
         }
      }
      } = { prop: "Hello", prop2: { prop2: { nested: ["a", "b", "c"]}}}

      console.log(x, b) // => Hello c
      ```

   -  從非陣列或非物件解構賦值 \
      當一個值要被進行解構時，它會先被轉成物件(或陣列) \
      因為 null 或 undefined 無法轉成物件(或陣列)，所以會產生錯誤 \
      如果值轉換的物件(或陣列)，沒有附帶對應的迭代器(Iterator)就無法被成功解構賦值，最後回傳undefined
      ```javascript
      const [a] = undefined
      const {b} = null
      //TypeError: Invalid attempt to destructure non-iterable instance 
      ```

      ```javascript
      const {a} = false
      const {b} = 10
      const {c} = 'hello'

      console.log(a, b, c) // undefined undefined undefined
      ```

      ```javascript
      const [a] = false // false is not iterable
      const [b] = 10 // 10 is not iterable
      const [c] = 'hello' // c = 'h'

      console.log( a, b, c)
      ```

   -  在等號左邊可以給定預設值，作為如果沒有賦到值時(對應的值不存在)的預設數值
      ```javascript
      const [missing = true] = []
      console.log(missing)
      // true

      const { message: msg = 'Something went wrong' } = {}
      console.log(msg)
      // Something went wrong

      const { x = 3 } = {}
      console.log(x)
      // 3
      ```

      ```javascript
      const { a ='hello' } = 'hello'
      const [ b ='hello' ] = 'hello'

      console.log( a, b) // hello h
      ```
   -  在函式傳入參數定義中使用 \
      在函式傳入參數中作解構賦值時，給 null 會導致預設值不作用 \
      當數字運算時，null 相當於 0
      ```javascript
      function func({a = 3, b = 5} = {a: 7, b: 11}) {
      return a + b
      }

      func({a: 1, b: 2}) // 3
      func({a: 1}) // 6
      func({b: 2}) // 5
      func({}) // 8 !!
      func() // 18 !!
      ```

      ```javascript
      function func({a = 1, b = 2} = {a: 1, b: 2}) {
      return a + b
      }

      func({a: 3, b: 5}) // 8
      func({a: 3}) // 5
      func({b: 5}) // 6
      func({a: null}) // 2 !!
      func({b: null}) // 1 !!
      func({a: void 0}) // 3 !!
      func({b: void 0}) // 3 !!
      func({}) // 3
      func() // 3
      ```
   -  `for...of`
      ```javascript
      const people = [
      {
         name: 'Mike Smith',
         family: {
            mother: 'Jane Smith',
            father: 'Harry Smith',
            sister: 'Samantha Smith'
         },
         age: 35
      },
      {
         name: 'Tom Jones',
         family: {
            mother: 'Norah Jones',
            father: 'Richard Jones',
            brother: 'Howard Jones'
         },
         age: 25
      }
      ];

      for (let {name: n, family: { father: f } } of people) {
      console.log('Name: ' + n + ', Father: ' + f)
      }

      // "Name: Mike Smith, Father: Harry Smith"
      // "Name: Tom Jones, Father: Richard Jones"
      ```

#### 參考資料

-  [MDN - Array](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array)
-  [JavaScript之一定要了解的 Array 與方法](https://ithelp.ithome.com.tw/articles/10229458)
-  [解構賦值](https://eyesofkids.gitbooks.io/javascript-start-from-es6/content/part4/destructuring.html)

### Flex Panel Gallery

#### Note

-  在不同瀏覽器中的 flex-grow 的 propertyName 不同 \
   Safari 是 flex，Chrome 跟 Firefox 是 flex-grow
-  除錯點 1 \
   EventListener 裡的 call back function  為什麼不用小括號 \
   在這裡的並不是立即執行，而是傳 function 的參考，當事件觸發 function 才會執行
-  除錯點 2 \
   `transactionend` 只針對特定觀察屬性做觸發

#### 補充

-  Flex 內層屬性
   -  flex \
      flex 是縮寫，裡面**依序**包含三個屬性 flex-grow、flex-shrink 和 flex-basis \
      如果只設定一個則是 flex-grow
      -  flex-grow \
         元件的伸展性，當空間分配還有剩餘時的當前元件的伸展性 \
        預設值為 0，如果設置為 0 則不會縮放
      -  flex-shrink \
         元件的伸展性，當空間分配還不足時的當前元件的收縮性 \
        預設值為 1，如果設置為 0 則不會縮放
      -  flex-basis \
         元件的基準值，可使用不同的單位值，優先度比 width 高，會依照 flex-basis 比例分配
#### 參考資料

-  [圖解：CSS Flex 屬性一點也不難 ](https://wcc723.github.io/css/2017/07/21/css-flex/)
-  [前端之 " wow~原來是這樣啊 "系列](https://ithelp.ithome.com.tw/articles/10208741)
-  [FLEXBOX FROGGY](https://flexboxfroggy.com/)

### Ajax Type Ahead

#### Note

-  ES6 Spread/Rest Operator 運算子 \
   ES6 引入了新的運算子 (operator) ... (三個點號) 來表示展開或其餘運算子
   -  Spread Operator 展開運算子

      ```javascript
      var ary1 = [4, 5, 6];
      var ary2 = [1, 2, 3];

      // ary1 會變成 [1, 2, 3, 4, 5, 6]
      ary1 = [...ary2, ...ary1];
      ```

      Spread Operator 可以用在執行函數時的參數列上，它可以將一個陣列 (array) 展開，轉為多個逗點隔開的獨立參數
   -  Rest Operator 其餘運算子

      ```javascript
      function fun1(...myArgs) {
      console.log(myArgs);
      }

      // 顯示 []
      fun1();

      // 顯示 [1]
      fun1(1);

      // 顯示 [5, 6, 7]
      fun1(5, 6, 7);
      ```

      可以更直觀的宣告不定長度參數 \
      `...args` 只能放在最後一個參數，用來獲取其餘的參數，args 的值是一個陣列 (array)，用來存放獲取的參數。
-  關鍵字 highlight 的部分是用 `replace()` 搭配正則去處理
-  利用 `Intl.NumberFormat.format()` 對人口數做數字格式化
-  正則表達式

   ```javascript
   const regex = new RegExp(pattern, flag);
   ```

   -  pattern 搜尋的關鍵字或規則 (詳見 [MDN](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Guide/Regular_Expressions))
   -  flag
      -  `g` 全域比對
      -  `i` 忽略大小寫
      -  `s` 單行模式
      -  `m` 多行模式
-  toLocaleString() 可以直接對數字做字串轉換，
-  除錯點 1 \
   cities 的型態，如果是用 `const` 之後塞東西進去要用 `push` \
   如果只是單純的 `cities.push(data)` 會發現他是把取回的 data array 直接丟進 cities \
   用 `cities.push(...data)` 才是將 data 展開轉為多個逗號隔開的參數，也才會是將 array 直接給了新的 array \
   `...data` > Spread Operator 展開運算子
-  除錯點 2 \
   同步非同步所造成的空陣列 filter \
   用 `Promise.then()` `async` `await` 可以實現等待的需求
-  除錯點 3 \
  在 Promise 同時有 `onreject` 及 `.catch` 的情況下，因為 error 已經在 `.then()` 被 `onreject` 接住處理，後面的 `.catch` 不會再接到 error 訊息
-  除錯點 4 \
  在處理 Promise 的 error 時，如果直接在 `.then()` 中下 `console.error(error.message)` 會繼續執行之後的 `.then()`，如果不想要繼續執行後面的 `.then()` 在  `.then()` 用 `return Promise.reject(e);`；或是直接使用 `.catch()`，當任一 `.then()` 出錯時會直接跳到最後的 `.catch()`去執行

#### 補充

-  Promise 用來解決 callback hell，優化非同步的語法，IE 不支援 \
   執行順序會是將所有 code 執行完後才處理非同步事件 \
   async/await 基於 Promise 讓非同步的語法結構類似於同步，更易讀好管理
-  Promise 本身是一個建構函式，函式也是物件的一種，因此可以附加其它屬性方法在上， Promise 可以直接使用 all、race、resolve、reject 的方法 \
-  Promise 建構函式 new 出的物件，則可以使用其中的原型方法（在 prototype 內），其中就包含 then、catch、finally，這些方法則必須在新產生的物件下才能呼叫。

   ```javascript
   const p = new Promise();

   p.then();    // Promise 回傳正確
   p.catch();   // Promise 回傳失敗
   p.finally(); // 非同步執行完畢（無論是否正確完成）
   ```

-  Promise 建構函式建立同時，必須傳入一個函式作為參數（executor function），此函式的參數包含 resolve, reject，這兩個方法分別代表成功與失敗的回傳結果，僅能回傳其中之一，回傳後表示此 Promise 事件結束。

   ```javascript
   new Promise(function(resolve, reject) {
      resolve(); // 正確完成的回傳方法
      reject();  // 失敗的回傳方法
   });
   ```

#### 參考資料

-  [JavaScript ES6 Spread/Rest Operator 運算子](https://www.fooish.com/javascript/ES6/spread-rest-operator.html)
-  [MDN = 正規表達式](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Guide/Regular_Expressions)
-  [[JavaScript] 來寫正規表達式 Regex](https://medium.com/itsems-frontend/whats-regex-dc08c8c30a87)
-  [MDN - Intl.NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat)
-  [我要學會 JS(三)：callback、Promise 和 async/await 那些事兒](https://noob.tw/js-async/)
-  [簡單理解 JavaScript Async 和 Await](https://www.oxxostudio.tw/articles/201908/js-async-await.html)
-  [從Promise開始的JavaScript異步生活](https://eyesofkids.gitbooks.io/javascript-start-es6-promise/content/contents/ch5_flow_n_error.html)
-  [JavaScript Promise 全介紹](https://wcc723.github.io/development/2020/02/16/all-new-promise/)

### Array Cardio Day 2

Array 的案例介紹

#### Note

-  `Array.prototype.some()` 透過給定函式測試陣列中是否至少有一個元素
-  `Array.prototype.every()` 透過給定函式測試陣列中的所有元素是否都符合給定的條件
-  `Array.prototype.find()` 會回傳第一個滿足所提供之測試函式的元素值
-  `Array.prototype.splice(start[, deleteCount[, item1[, item2[, ...]]]])` \
   可以藉由刪除既有元素並／或加入新元素來改變一個陣列的內容 \
   若 `deleteCount` 為 0 或是負數，則不會有元素被刪除 \
   回傳值是一個包含被刪除的元素陣列，若沒有元素被刪除，則會回傳空陣列

#### 補充

-  `splice()` vs `slice()`
   前者直接動原始資料，後者對陣列做淺拷貝(shallow copy)，原本的陣列不會被修改
-  淺拷貝址對第一層有效，所以當對新陣列中物件去做更改，因為物件裡的內容已經不是第一層，物件是同一個，所以也會改到原本陣列中物件的值，是需要注意的雷點

   ```javascript
   const newComments = [
      ...comments.slice(0, findIndex),
      ...comments.slice(findIndex + 1),
   ];

   newComments[2].text = '123';
   console.table(comments); // comments[2].text = '123'
   console.table(newComments); // newComments[2].text = '123'
   ```
-  Shallow Copy vs Deep Copy
   -  淺拷貝 (Shallow Copy)：只能達到淺層的複製(第一層)，若有第二層以上的資料的話，就無法達到實際的複製，而是會與舊物件一起共用同一塊記憶體 \
      -  `Object.assign({}, origin)`

         ```javascript
         let studentA = {
            name: {
               first: 'Emma',
               last: 'Wang'
            },
            sex: 'Female'
         };
         let studentB = Object.assign({}, studentA);
         studentB.name.first = 'Max';
         studentB.sex = 'Male';
         console.log(studentA);
         // studentA.name.first = 'Max', studentA.name.last = 'Wang', studentA.sex = 'Female'
         console.log(studentB);
         // studentB.name.first = 'Max', studentB.name.last = 'Wang', studentB.sex = 'Male'
         ```

      -  展開運算子(Spread Operator) `{...data}`
   -  深拷貝 (Deep Copy)：會另外創造一個一模一樣的物件，新物件跟原物件不共用記憶體，修改新物件不會改到原物件
      -  `JSON.parse(JSON.stringify(object))` \
         但也不能說是真的 deep copy，如果 object 裡面有 function 就會 GG，但以單純的資料複製來說可行

         ```javascript
         let studentA = {
            name: {
               first: 'Emma',
               last: 'Wang'
            },
            sex: 'Female',
            getSex: function() { console.log(this.sex); }
         };
         let studentB = JSON.parse(JSON.stringify(studentA));
         studentB.name.first = 'Max';
         studentB.sex = 'Male';
         console.log(studentA);
         // studentA.name.first = 'Emma', studentA.name.last = 'Wang', studentA.sex = 'Female', studentA.getSex = function() { console.log(this.sex); }
         console.log(studentB);
         // studentB.name.first = 'Max', studentB.name.last = 'Wang', studentB.sex = 'Male'
         ```

-  在物件中使用箭頭函式去定義方法，所綁定的 `this` 是 `window` 不是物件本身
#### 參考資料

-  [MDN - Array](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array)
-  [JS-淺拷貝(Shallow Copy) VS 深拷貝(Deep Copy)](https://kanboo.github.io/2018/01/27/JS-ShallowCopy-DeepCopy/)
-  [JavaScript 淺拷貝 (Shallow Copy) 與深拷貝 (Deep Copy)](https://awdr74100.github.io/2019-10-24-javascript-deepcopy/)

### Fun with HTML5 Canvas

利用 Canvas 在網頁上畫畫

#### Note
-  canvas 是利用 `HTMLCanvasElement..getContext()` 在 context 上做編輯
   -  `2d` 建立的是 `CanvasRenderingContext2D`
   -  `webgl` 或 `experimental-webgl` 建立的是 `WebGLRenderingContext` 三维渲染
   -  `webgl2` 或 `experimental-webgl2` 建立的是 `WebGL2RenderingContext` 三维渲染
   -  `bitmaprenderer` 創造出一個 `ImageBitmapRenderingContext` 進行已給定的 `ImageBitmap` 替換
-  樣式設定
   -  `lineWidth` 預設是 1
   -  `lineCap` 端點樣式

      ```javascript
      ctx.lineCap = "butt"; // 預設
      ctx.lineCap = "round"; // 圓邊
      ctx.lineCap = "square"; // 長度與圓邊一樣
      ```

   -  `lineJoin` 轉角樣式

      ```javascript
      ctx.lineJoin = "miter"; // 預設
      ctx.lineJoin = "round";
      ctx.lineJoin = "bevel"; // 斜切角
      ```

   -  `setLineDash` 虛線，虛線的參數會重複數值產生 [實線、間隔、實線、間隔、實線 ......] 效果

      ```javascript
      ctx.setLineDash([20]); // 實線、間隔都是 20 -> [20,20,20,20, ...]
      ctx.setLineDash([1,10]);  // 實線 1、間隔 10 ->  [1,10,1,10, ...]
      ```

   -  `strokeStyle` 線條的顏色樣式
-  常用方法
   -  `beginPath()` 建立一個線段，如果需要畫線段必須要建立一個新線段
   -  `closePath()` 線段的結尾，不是必須
   -  `moveTo(x, y)` 畫直線的起始點
   -  `lineTo(x, y)` 畫直線的終點
   -  `arc(x, y, radius, startAngle, endAngle, anticlockwise)` 畫弧線 \
      `arc()` 用的是弧度(radians)而非角度(degrees)
   -  `fill(startX, startY, width, height)` 填滿圖形內容
   -  `stroke(startX, startY, width, height)` 畫邊線
   -  `clear(startX, startY, width, height)` 清除指定矩形區域內的內容，使其變為全透明
-  滑鼠監聽事件
   -  `mousedown`
   -  `mousemove`
   -  `mouseup`
   -  `mouseout` 當監聽事件的 HTML 元件還有子元件，所有的子元件也會觸發監聽事件
   -  `mouseleave` 只有離開指定 HTML 元件的時候才會被觸發
   -  `mouseenter`
-  `hsl()` 利用角度去作出色彩變化
#### 補充

新增的功能

-  滑鼠按著移出視窗畫面，回來後能從回來的點開始繼續畫，不會產生邊際連線
   -  BUG 移出前有 mousedown，在非 window 的區域放開，移入後還是會保持著 mousedown 的狀態
-  canvas 隨著視窗大小變化調整大小，並且保留原本畫的東西
   - BUG Canvas 取視窗大小，但 `<html> <body>` 會超出視窗大小

Follow up

-  回上一步 `getImageData()` 先把畫的存成圖片，再移除
-  橡皮擦 用底色覆蓋

#### 參考資料

-  [MDN - CanvasRenderingContext2D](https://developer.mozilla.org/zh-TW/docs/Web/API/CanvasRenderingContext2D)
-  [MDN - 繪製圖形](https://developer.mozilla.org/zh-TW/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes)
- [學習 canvas 日記系列](https://ithelp.ithome.com.tw/articles/10202356?sc=iThelpR)
-  [Mouse Event 小筆記](https://medium.com/@shizukuichi/mouse-event-%E5%B0%8F%E7%AD%86%E8%A8%98-feb5dd866b0)
-  https://blog.csdn.net/vuturn/article/details/47807899