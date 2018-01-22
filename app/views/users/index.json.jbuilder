json.array! @users do |product|
  json.id @users.id
  json.user @users.name
end
