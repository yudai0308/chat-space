## usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false, unique: true|
|email|string|null: false, unique: true|

### Association
- has_many :massages
- has_many :group_users
- has_many :groups, through: :group_users

***

## massagesテーブル

|Column|Type|Options|
|------|----|-------|
|body|text|check(body != null or image != null)|
|image|string|check(body != null or image != null)|
|group_id|integer|null: false, foreign_key: true|
|user_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group

***

## group_userテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false|

### Association
- has_many :massages
- has_many :group_users
- has_many :users, through: :group_users

***

## group_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|references|null: false, foreign_key: true|
|group_id|references|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

