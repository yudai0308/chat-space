$(function() {
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

  $("#new_message").on("submit", function(e) {
    e.preventDefault();
    var formData = new FormData($(this).get(0));
    var href = window.location.href

    $(".message-form__send").removeAttr("data-disable-with");

    $.ajax({
      url: href,
      type: "POST",
      data: formData,
      dataType: "json",
      processData: false,
      contentType: false
    })

    .done(function(data) {
      var html = buildHTML(data);
      $(".message-contents").append(html);
      $(".message-form__text").val("");
    })

    .fail(function() {
      alert("メッセージを入力するか画像を選択してください。");
    });
    var windowHeight = $(".message-contents").get(0).scrollHeight;
    $(".message-contents").animate({scrollTop: windowHeight}, 2000, "swing");
  });
});
