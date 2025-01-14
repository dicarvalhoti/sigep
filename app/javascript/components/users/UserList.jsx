import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Spinner, Button } from 'flowbite-react';
import { HiPencil, HiTrash, HiCheck, HiX,HiCurrencyDollar } from 'react-icons/hi';
import { fetchUsers, deleteUser, userToggleStatus } from '../../features/user/userSlice';
import UserAdd from './UserAdd';
import UserEdit from './UserEdit'; 
import moment from "moment";
import PaymentAdd from '../payments/PaymentAdd'; 
import { AlertComponent } from "../layout/AlertComponent";


const UserList = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.user);
  const { isAuthenticated, isAdmin, currentUser } = useSelector((state) => state.auth);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null); 

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchUsers());
    }
  }, [isAuthenticated, dispatch]);

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este usuário?')) {
      dispatch(deleteUser(id));
    }
  };

  const handleToggleStatus = (id) => {
    dispatch(userToggleStatus(id)); 
  };

  const handleEdit = (user) => {
    setUserToEdit(user);
    setIsEditModalOpen(true);
  };

  const handleAdd = () => {
    setIsAddModalOpen(true);
  };

  const handleModalClose = () => {
    setIsEditModalOpen(false); 
  };

  const handlePayment = (user) => {
    setUserToEdit(user);
    setIsPaymentModalOpen(true);
  };

  const handlePaymentModalClose = () => {
    setIsPaymentModalOpen(false); 
  };


  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner size="xl" />
      </div>
    );
  }

  // if (error) {
  //   return(<AlertComponent type="failure" message={error}/>)
  // }


  return (
    <div className="px-4 py-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Lista de Usuários</h1>
        {isAdmin &&(<Button onClick={handleAdd}>Adicionar Usuário</Button>)}
      </div>
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>Nome</Table.HeadCell>
          <Table.HeadCell>Email</Table.HeadCell>
          <Table.HeadCell>Status</Table.HeadCell>
          <Table.HeadCell>Efetivo desde</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Ações</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {users.map((user) => (
            <Table.Row key={user.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {user.name}
              </Table.Cell>
              <Table.Cell>{user.email} </Table.Cell>
              <Table.Cell>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}
                >
                  {user.status === 'active' ? 'Ativo' : 'Inativo'}
                </span>
              </Table.Cell>
              <Table.Cell>{moment(user.effective_from).format('DD/MM/YYYY')}</Table.Cell>
              <Table.Cell>
                <div className="flex gap-2">
                {(isAdmin && user.role === "seller" && user.status === 'active') &&(
                  <Button color="success" size="sm" onClick={() => handlePayment(user)}>
                    <HiCurrencyDollar className="h-4 w-4" /> {isAdmin}
                  </Button>
                )}
                  {/* Botão de Edição */}
                  {(isAdmin || user.id === currentUser.id) && (
                  <Button color="info" size="sm" onClick={() => handleEdit(user)}>
                    <HiPencil className="h-4 w-4" />
                  </Button>
                   )}

                  {(isAdmin && user.id !== currentUser.id) && (
                    <Button
                      color={user.status === 'active' ? 'failure' : 'success'}
                      size="sm"
                      onClick={() => handleToggleStatus(user.id)}
                    >
                      {user.status === 'active' ? <HiX className="h-4 w-4" /> : <HiCheck className="h-4 w-4" />}
                    </Button>
                  )}

                  {/* Botão de Excluir */}
                  {(isAdmin && user.id !== currentUser.id) && (
                  <Button color="failure" size="sm" onClick={() => handleDelete(user.id)}>
                    <HiTrash className="h-4 w-4" />
                  </Button>
                  )}
                </div>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      {/* Modal de Adição de Usuário */}
      <UserAdd isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
      
      {/* Modal de Edição de Usuário */}
      {userToEdit && (
        <UserEdit isOpen={isEditModalOpen} onClose={handleModalClose} user={userToEdit} />
      )}
       {userToEdit && (
        <PaymentAdd isOpen={isPaymentModalOpen} onClose={handlePaymentModalClose} user={userToEdit} onPayments={false}
        />
      )}
    </div>
  );
};

export default UserList;
