$(function() {

// インクリメンタルサーチ
  var search_list = $(".chat-group-form__field--right.add-user");

  function appendHTML (user) {
  var html =
   `<div class="chat-group-user clearfix" id="user-delete">
      <p class="chat-group-user__name"> ${user.name} </p>
      <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
    </div>`
    return html;
  };

  function noUsers() {
    var html =
   `<div class="chat-group-user clearfix" id="user-delete">
      <p class="chat-group-user__name"> 一致するユーザーがいません </p>
    </div>`
    return html;
  };

  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();
    if (input.length == 0) {
      $("#user-search-result").children().empty();
      return;
    }

    $.ajax({
      type: "GET",
      url: "/users",
      data: {keyword: input},
      dataType: "json"
    })

    .done(function(users) {
      $("#user-search-result").empty();
      if (users.length !== 0) {
        users.forEach(function(user) {
          $("#user-search-result").append(appendHTML(user));
        });
      } else {
        $("#user-search-result").append(noUsers());
      }
    })
    .fail(function() {
      alert("検索に失敗しました");
    });
  });

// 「追加」クリックでメンバーに追加
  function buildMember(mem) {
    var name = mem.context.dataset.userName
    var id = mem.context.dataset.userId
    var appendHTML =

   `<div class="chat-group-user clearfix" id="chat-group-user-${id}">
      <!-- <input name="chat_group[user_ids][]", type="hidden", value="${id}"> -->
      <input name="group[user_ids][]", type="hidden", value="${id}">
      <p class="chat-group-user__name"> ${name} </p>
      <a class="user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn"> 削除 </a>
    <div>`

    return appendHTML;
  };

  $(document).on("click", ".chat-group-user__btn--add", function() {
    var groupMember = [];
    var insertHTML = "";

    groupMember.push($(this).data("user-id", "user-name"))
    groupMember.forEach(function(mem) {
      $("#chat-group-users").append(buildMember(mem));
    });
  });

// 「追加」クリックで検索から削除
  $(document).on("click", ".chat-group-user__btn--add", function() {
    $(this).parent().remove();
  });

// 「削除」クリックでメンバーから削除
  $(document).on("click", ".chat-group-user__btn--remove", function() {
    $(this).parent().remove();
  });
});
