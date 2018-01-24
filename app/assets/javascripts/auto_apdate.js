// $(function() {
//   function updateEvent() {
//     // 更新時に生成するHTMLの定義
//     function buildHTML(message) {
//       if( message.content && message.image.url ) {
//         var html = `<p class="message-contents__user">${ message.name }</p>
//                     <p class="message-contents__date">${ message.date }</p>
//                     <img class="message-contents__image" src="${message.image.url}"></img>
//                     <p class="message-contents__content">${ message.content }</p>`
//       } else if( message.image.url == null) {
//           var html = `<p class="message-contents__user">${ message.name }</p>
//                       <p class="message-contents__date">${ message.date }</p>
//                       <p class="message-contents__content">${ message.content }</p>`
//       } else {
//           var html = `<p class="message-contents__user">${ message.name }</p>
//                       <p class="message-contents__date">${ message.date }</p>
//                       <img class="message-contents__image" src="${message.image.url}"></img>`
//       };
//       return html;
//       };
//     };
//     // 非同期通信による処理
//     $.ajax({
//       url: location.href.json
//     })
//     .done(function(data) {
//       data.forEach(function(message) {
//         $(".message-contents").append(buildHTML(message))
//       });
//     })
//     .fail(function() {
//       alert("自動更新に失敗しました");
//     });
//   }
//   // 上記一連の処理を定期的に自動で実行
//   setInterval(updateEvent(), 5000);
// });
