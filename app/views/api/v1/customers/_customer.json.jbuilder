json.array! @customers do |customer|
  json.id customer.id
  json.name customer.name
  json.email customer.email
  json.phone_number customer.phone_number
end
