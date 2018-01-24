$(function() {
  var updateEvent = function() {
    // 更新時に生成するHTMLの定義
    function buildHTML(message) {
      if( message.content && message.image.url ) {
        var html = `<div class="each-message" data-message-id="${message.id}">
                      <p class="each-message__user">${ message.name }</p>
                      <p class="each-message__date">${ message.date }</p>
                      <img class="each-message__image" src="${message.image.url}"></img>
                      <p class="each-message__content">${ message.content }</p>
                    </div>`
      } else if( message.image.url == null) {
          var html = `<div class="each-message" data-message-id="${message.id}">
                        <p class="each-message__user">${ message.name }</p>
                        <p class="each-message__date">${ message.date }</p>
                        <p class="each-message__content">${ message.content }</p>
                      </div>`
      } else {
          var html = `<div class="each-message" data-message-id="${message.id}">
                        <p class="each-message__user">${ message.name }</p>
                        <p class="each-message__date">${ message.date }</p>
                        <img class="each-message__image" src="${message.image.url}"></img>
                      </div>`
      };
      return html;
    };
    // 非同期通信による処理
    if (location.href.match(/\/groups\/\d+\/messages/)) {
      $.ajax({
        url: location.href,
        type: "GET",
        dataType: "json",
        processData: false,
        contentType: false
      })
      .done(function(data) {
        var id = $(".each-message").data("message-id");
        data.messages.forEach(function(message) {
          if (message.id > id) {
            $(".message-contents").append(buildHTML(message))
          };
        });
      })
      .fail(function() {
        alert("自動更新に失敗しました");
      });
    } else {
      clearInterval(autoUpdate);
    };
  };
  // 上記一連の処理を定期的に自動で実行
  var autoUpdate = setInterval(updateEvent, 5000);
});
