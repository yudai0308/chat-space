Rails.application.routes.draw do
  devise_for :users
  root "messages#index"
  resources :users, only: [:index, :edit, :update]
  resources :groups, only: [:new, :reate, :edit, :update] do
    resources :messages, only: [:index, :create]
  end
end

# Ｑ. ユーザーとメッセージも１対多の関係のはずなのになんでネストさせないの？
# Ａ. １対多の関係であっても必ずしもネストさせる必要はないから。

# ネストで主に関わってくるのはURLの部分。
# chat spaceでは「あるグループのメッセージ一覧ページ」が存在する（トップページ）。
# この時のURLは "chat_groups/19462/messages" などとなり、「グループID/messeges」となっている。
# グループとメッセージをネストさせているため、このようなURLに設定することができる。

# 逆に、chat spaceには「あるユーザーのメッセージ一覧ページ」は存在しない。
# そのため、ユーザーとメッセージをネストさせる必要がない。
