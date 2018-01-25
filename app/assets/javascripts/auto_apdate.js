$(function() {
  // 更新時に生成するHTMLの定義
  // updateEventは定期的に行われる処理のため、変数は外で定義
  function buildHTML(message) {
    var insertImage = message.image.url ? `<img class="each-message__image" src="${message.image.url}"></img>` : ""
    var insertMessage = message.content ? `<p class="each-message__content">${message.content}</p>` : ""
    var html = `<div class="each-message" data-message-id="${message.id}">
                  <p class="each-message__user">${ message.name }</p>
                  <p class="each-message__date">${ message.date }</p>
                  ${insertImage}
                  ${insertMessage}
                </div>`
    return html;
  };

  // 非同期通信による処理
  var updateEvent = function() {
    if (location.href.match(/\/groups\/\d+\/messages/)) {
      $.ajax({
        url: location.href,
        type: "GET",
        dataType: "json",
        processData: false,
        contentType: false
      })
      .done(function(data) {
        // "グループ内で表示されている最新のメッセージID" と "BD内に保存されている最新のメッセージ" を比較
        var id = $(".each-message").last().data("message-id");
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
