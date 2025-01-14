

puts "Incluindo os Usuários..."

User.delete_all

admin = User.new(
  name: 'Administrador',
  email: 'administrador@sigep.com',
  password: '123mudar',
  password_confirmation: '123mudar',
  role: :admin
)
admin.skip_confirmation!
admin.save!



puts "Usuários criados com sucesso!"
puts "Total de Usuários: #{User.count}"
