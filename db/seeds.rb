# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end
if Rails.env.production?
    raise "Não é permitido executar seeds em ambiente de produção!"
else
    puts "Iniciando os Seeds"
    puts "----------------------------------------------------------------"
    Dir[Rails.root.join("db/seeds/*.rb")].sort.each do |arquivo|
    require arquivo
    end
    puts "----------------------------------------------------------------"
    puts "[SUCESSO!] Seeds Concluídos"
end