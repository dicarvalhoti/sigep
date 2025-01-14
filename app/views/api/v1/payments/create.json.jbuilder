
  json.id @payment.id
  json.seller_name @payment.seller.name
  json.seller_email @payment.seller.email
  json.payment_seller_commission_amount @payment.commission_amount
  json.customer_phone "46464"# payment.customer.phone
  json.status @payment.status# payment.status
  json.gateway @payment.payment_gateway# payment.gateway
  json.total_sale_value @payment.total_sale_value
  json.total_amount @payment.total_amount
