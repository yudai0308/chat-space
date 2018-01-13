class Message < ApplicationRecord
  validates :content, presence: true, unless: :image?
  validates :image, presence: true, unless: :content?

  belongs_to :group
  belongs_to :user

  mount_uploader :image, ImageUploader
end
