# JS30

![JS30 Banner](https://camo.githubusercontent.com/07ca65497065dd926bd889c53b7b7652f8ef3cbc4320739cf7ebed3c4d34cb2d/68747470733a2f2f6a61766173637269707433302e636f6d2f696d616765732f4a53332d736f6369616c2d73686172652e706e67)

> 關於一些小練習 \
> 練習來源：[JS30](https://javascript30.com/)

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

- [JS30](https://javascript30.com/)
- [Alex 宅幹嘛 - 深入淺出 Javascript30 快速導覽](https://www.youtube.com/playlist?list=PLEfh-m_KG4dYbxVoYDyT_fmXZHnuKg2Fq)
- [Event.target](https://developer.mozilla.org/zh-TW/docs/Web/API/Event/target)
- [Event.currentTarget](https://developer.mozilla.org/zh-TW/docs/Web/API/Event/currentTarget)
- [e.currentTarget與e.target的區別](https://www.itread01.com/content/1545071047.html)