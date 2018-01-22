$(document).on("turbolinks:load", function() {
  function buildHTML(message) {
    if( message.content && message.image.url ) {
      var html = `<p class="message-contents__user">${ message.name }</p>
                  <p class="message-contents__date">${ message.date }</p>
                  <img class="message-contents__image" src="${message.image.url}"></img>
                  <p class="message-contents__content">${ message.content }</p>`
    } else if( message.image.url == null) {
        var html = `<p class="message-contents__user">${ message.name }</p>
                    <p class="message-contents__date">${ message.date }</p>
                    <p class="message-contents__content">${ message.content }</p>`
    } else {
        var html = `<p class="message-contents__user">${ message.name }</p>
                    <p class="message-contents__date">${ message.date }</p>
                    <img class="message-contents__image" src="${message.image.url}"></img>`
    };
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
    console.log(windowHeight);
    $(".message-contents").animate({scrollTop: windowHeight}, 200, "swing");
  });
});
