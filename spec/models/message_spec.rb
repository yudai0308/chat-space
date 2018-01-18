require "rails_helper"

describe Message do

  describe "#create" do

    context "保存可能" do
      it "メッセージがあれば保存できる" do
        # expect(build(:message, image: nil)).to be_valid
        message = build(:message, image: nil)
        expect(message).to be_valid
      end

      it "画像があれば保存できる" do
        # expect(build(:message, content: nil)).to be_valid
        message = build(:message, content: nil)
        expect(message).to be_valid
      end

      it "メッセージと画像があれば保存できる" do
        expect(build(:message)).to be_valid
        # message = build(:message)
        # expect(message).to be_valid
      end
    end

    context "保存不可" do
      it "メッセージも画像もないと保存できない" do
        message = build(:message, content: nil, image: nil)
        message.valid?
        expect(message.errors[:content]).to include("を入力してください")
        # エラーメッセージを日本語にしたから？
      end

      it "group_idが無いと保存できない" do
        message = build(:message, group_id: nil)
        message.valid?
        expect(message.errors[:group]).to include("を入力してください")
        # エラーメッセージはgroup_idではなくgroupにひもづいてる？
        # -> binding.pry で確認すればどのキーにひもづいているのか確認できる
        #    実際の現場でもその都度エラーメッセージを確認しながらテストしている
      end

      it "user_idが無いと保存できない" do
        message = build(:message, user_id: nil)
        message.valid?
        expect(message.errors[:user]).to include("を入力してください")
      end
    end

  end

end
