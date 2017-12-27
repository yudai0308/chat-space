## usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false, unique: true|
|email|string|null: false, unique: true|

### Association
- has_many :massages
- has_many :members
- has_many :groups, through: :members

***

## massagesテーブル

|Column|Type|Options|
|------|----|-------|
|body|text|check(body != null or image != null)|
|image|string|check(body != null or image != null)|
|date|integer|null: false|
|group_id|integer|null: false, foreign_key: true|
|user_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :massage
- belongs_to :member

***

## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false|

### Association
- has_many :massages
- has_many :members
- has_many :massages, through: :members

***

## membersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

