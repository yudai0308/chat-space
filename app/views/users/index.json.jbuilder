# json.array! @users do |user|
#   json.id user.id
#   json.name user.name
# end
json.array! @users, :id, :name
