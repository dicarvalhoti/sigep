json.array! @payments do |payment|
  json.id payment.id
  json.seller_name payment.seller.name
  json.seller_email payment.seller.email
  json.payment_seller_commission_amount payment.commission_amount
  json.status payment.status
  json.gateway payment.payment_gateway
  json.total_sale_value payment.total_sale_value
  json.total_amount payment.total_amount
  json.customer_name payment.customer.name
  json.customer_email payment.customer.email
  json.customer_phone payment.customer.phone_number

end
