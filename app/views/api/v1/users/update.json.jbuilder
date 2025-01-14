json.data do
  json.id user.id
  json.name user.name
  json.email user.email
  json.status user.status
  json.role user.role
  json.commission_percentage user&.default_commission&.commission_percentage
  json.effective_from user&.default_commission&.effective_from || user.created_at
end
