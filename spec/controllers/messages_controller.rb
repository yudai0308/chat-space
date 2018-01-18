require "rails_helper"

describe MessagesController do
  # letを利用することでテスト中に使用するインスタンスを定義しておくことができる
  let(:group) { create(:group) }
  let(:user) { create(:group) }

  describe "#index" do
  # メッセージ一覧を表示するアクションのテスト

    context "ログインしている場合" do
      # beforを利用することで各テストの前に擬似的にログインすることができる
      # login user は controller_macros で定義したメソッド
      # indexアクションのテストは複数あるため before 内で get :index を定義している
      # messageへの割り当ては正常かルーティングはグループIDをネストしているので params を渡している
      before do
        login user
        get :index, params: { group_id: group.id}
      end

      it "@messageは期待どおりの値か" do
        # コントローラのインスタンス変数に代入されたオブジェクトは assigns メソッド経由で参照できる
        expect(assigns(:message)).to be_a_new(Message)
      end

      it "@groupは期待どおりの値か" do
        expect(assigns(:group)).to eq group
      end

      it "indexビューが呼ばれるか" do
        expect(response).to render_template :edit
      end
    end

    context "ログインしていない場合" do
      before do
        get :index, params: { group_id: group.id}
      end

      it "ログインページにリダイレクトされるか" do
        expect(response).to redirect_to (new_user_session_path)
      end
    end
  end

  describe "#create" do
  # メッセージを作成するアクションのテスト
    let(:params) { { group_id: group.id, user_id: user.id, message: attributes_for(:message) } }
    # attributes_for はハッシュを生成するメソッド
    # メッセージの中には文字だけでなく画像も含まれる可能性があるため、message をキーにしたハッシュの中にもう１つハッシュを作る必要がある

    context "ログインしている場合" do
      before do
        login user
      end

      context "保存成功" do
        subject {
          post :create,
          params: params
        }
        # postメソッドでcreateアクションを擬似的にリクエストをした結果という意味

        it "メッセージが保存できる" do
          expect{ subject }.to change(Message, :count).by(1)
          # Messageモデルのレコードが１つ増えたことを確かめている
        end

        it "group_messages_path に遷移する" do
          subject
          expect(response).to redirect_to(group_messages_path(group))
        end
      end

      context "保存失敗" do
        let(:invalid_params) { { group_id: group.id, user_id: user.id, message: attributes_for(:message, content: nil, image: nil) } }

        it "メッセージは保存されない" do
          expect{ subject }.not_to change(Message, :count)
          # not_to を使うことでMessageモデルのレコードが変更されなかったことを確かめている
        end

        it "index ビューが描画されない" do
          subject
          expect(response).to render_template :index
        end
      end
    end

    context "ログインしていない場合" do

      it "new_user_session_path にリダイレクトされる" do
        post :cretae, params: params
        expect(response).to redirect_to(new_user_session_path)
      end
    end
  end
end
