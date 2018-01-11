class Message < ApplicationRecord
  varidates :content, presence: true, unless: :image?
  varidates :image, presence: true, unless: :content?

  belongs_to :group
  belongs_to :user
end
