<<<<<<< HEAD
json.array! @users do |product|
  json.id @users.id
  json.user @users.name
end
=======
# json.array! @users do |user|
#   json.id user.id
#   json.name user.name
# end
json.array! @users, :id, :name
>>>>>>> 6555e78ac36df86841e426df84ec7aa310e6448a
