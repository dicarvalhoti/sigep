import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AlertComponent } from "../layout/AlertComponent";
import PaymentAdd from "../payments/PaymentAdd";
import SwalAlert from "../layout/SwalAlert";


import {
  Button,
  Table,
  Pagination,
  Label,
  TextInput,
  Alert,
  TableCell,
} from "flowbite-react";
import { HiCurrencyDollar, HiSearch,HiTrash } from "react-icons/hi";

import {
  fetchPayments,
  searchPayments,
  deletePayment,
} from "../../features/payment/paymentThunks";

const PaymentList = () => {
  const dispatch = useDispatch();

  const [totalSales, setTotalSales] = useState(0);
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const { payments, loading, error } = useSelector((state) => state.payment);
  const [alertProps, setAlertProps] = useState({ show: false });
  
  const { isAuthenticated, currentUser, isAdmin } = useSelector(
    (state) => state.auth
  );
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPayments = payments.slice(startIndex, endIndex);

  const totalPages = Math.ceil(payments.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = () => {
    const searchQuery = { query: query };
    dispatch(searchPayments(searchQuery));
  };

  const handlePayment = (user) => {
    setUserToEdit(user);
    setIsPaymentModalOpen(true);
  };

  const handlePaymentModalClose = () => {
    setIsPaymentModalOpen(false);
  };

  const handleDelete = (id) => {
    setAlertProps({
      type:'question',
      show: true,
      onConfirm: () => {
        dispatch(deletePayment(id));
        setAlertProps({ show: false });
      },
    });
  };


  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchPayments());
    }
  }, [isAuthenticated, dispatch]);


  useEffect(() => {
    if (currentUser.role === "admin") {
      const total = payments.reduce(
        (acc, payment) => acc + parseFloat(payment.total_amount || 0),
        0
      );
      setTotalSales(total);
    } else {
      const total = payments.reduce(
        (acc, payment) =>
          acc + parseFloat(payment.payment_seller_commission_amount || 0),
        0
      );
      setTotalSales(total);
    }
  }, [currentPayments]);


  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <AlertComponent type="failure" message={error} />;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Listagem de Pagamentos</h1>
        <div className="grid gap-6 mb-4 md:grid-cols-2">
          <div className="max-w-md flex items-center">
            <TextInput
              id="query"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Digite sua Pesquisa"
              required
            />
            <Button className="ml-2" onClick={handleSearch}>
              <HiSearch className="h-5 w-5" />
            </Button>
          </div>
          {(isAdmin || currentUser.role === "seller") &&
            currentUser.status === "active" && (
              <Button
                className="mb-1 inline-flex items-center"
                onClick={() => handlePayment(currentUser)}
              >
                <HiCurrencyDollar className="h-5 w-5 mr-2" />
                Adicionar Pagamento
              </Button>
            )}
        </div>
      </div>

      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>Nome do Vendedor</Table.HeadCell>
          <Table.HeadCell>Email do Vendedor</Table.HeadCell>
          <Table.HeadCell>Nome do Cliente</Table.HeadCell>
          <Table.HeadCell>Email do Cliente</Table.HeadCell>
          <Table.HeadCell>Telefone do Cliente</Table.HeadCell>
          <Table.HeadCell>Status</Table.HeadCell>
          <Table.HeadCell>Gateway</Table.HeadCell>
          <Table.HeadCell>Total da Venda</Table.HeadCell>
          <Table.HeadCell>Comissão</Table.HeadCell>
          <Table.HeadCell>Total</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {currentPayments.map((payment) => (
            <Table.Row
              key={payment.id}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <Table.Cell>{payment.seller_name}</Table.Cell>
              <Table.Cell>{payment.seller_email}</Table.Cell>
              <Table.Cell>{payment.customer_name}</Table.Cell>
              <Table.Cell>{payment.customer_email}</Table.Cell>
              <Table.Cell>{payment.customer_phone}</Table.Cell>
              <Table.Cell>
              <span
                  className={`px-2 py-1 rounded-full text-sm ${
                    payment.status === 'paid' ? 'bg-green-600 text-white' : 'bg-red-800 text-white'
                  }`}
                >
                  {payment.status === 'paid' ? 'Pago' : 'Falho'}
                </span>
              </Table.Cell>
              
              <Table.Cell>{payment.gateway}</Table.Cell>
              <Table.Cell>
                {parseFloat(payment.total_sale_value).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </Table.Cell>
              <Table.Cell>
                {parseFloat(
                  payment.payment_seller_commission_amount
                ).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </Table.Cell>
              <Table.Cell>
                {parseFloat(payment.total_amount).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </Table.Cell>
              <TableCell>
                {/* Botão de Excluir */}
                {isAdmin && (
                  <Button
                    color="failure"
                    size="sm"
                    onClick={() => handleDelete(payment.id)}
                  >
                    <HiTrash className="h-4 w-4" />
                  </Button>
                )}
              </TableCell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <SwalAlert {...alertProps} />
      {userToEdit && (
        <PaymentAdd
          isOpen={isPaymentModalOpen}
          onClose={handlePaymentModalClose}
          user={userToEdit}
          onPayments={true}
        />
      )}
      <div className="mt-4 flex justify-between items-center">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
        <h3>
          {isAdmin ? "Total de Vendas: " : "Total de Comissão: "}
          {totalSales.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </h3>
      </div>
    </div>
  );
};

export default PaymentList;
