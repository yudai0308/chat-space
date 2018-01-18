FactoryGirl.define do

  factory :message do
    content    Faker::Lorem.sentence
    image      File.open("#{Rails.root}/public/images/140.jpg")
    # imageをコンソールで確認したらnilだった...
    # -> binding.plyで調べると中身が確認できたので大丈夫
    #    アップローダーが機能しているかも含め確認する必要があるので上記のように記載する必要がある
    group
    user
    # group_id、user_idじゃなくていいの？
    # -> IDだけ指定しても、実際のデータが存在しないと message.group などでデータが呼び出せない
    #    group と user はそれぞれのファクトリーで定義しているデータを引っ張ってくるという意味
    # コンソールでデータを生成するとdivelopmentのデータベースに保存されてしまう
    # -> コンソールは指定がない場合ディベロップメント環境で起動する
    #    テストの中で変数などを確認したい場合は dinding.pry を使用することが望ましい
  end

end
