# JS30

![JS30 Banner](https://camo.githubusercontent.com/07ca65497065dd926bd889c53b7b7652f8ef3cbc4320739cf7ebed3c4d34cb2d/68747470733a2f2f6a61766173637269707433302e636f6d2f696d616765732f4a53332d736f6369616c2d73686172652e706e67)

> 關於一些小練習 \
> 練習來源：[JS30](https://javascript30.com/) \
> 參考影片：[Alex 宅幹嘛 - 深入淺出 Javascript30 快速導覽](https://www.youtube.com/playlist?list=PLEfh-m_KG4dYbxVoYDyT_fmXZHnuKg2Fq)

JS30 是來自一個加拿大工程師所提供的線上免費學習資源，30 天 30 個主題玩轉 JavaScript~~(還是被JavaScript玩)~~。

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

## 參考資料

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

## 參考資料

- 