import React, { useState, useEffect, useRef } from "react";
import { Modal, Button, Label, TextInput, Spinner } from "flowbite-react";
import Select from "react-select";
import AsyncSelect from "react-select/async";

import { addPayment } from "../../features/payment/paymentThunks";
import { useSelector, useDispatch } from "react-redux";
import { ToastNotification, showToast } from "../layout/ToastNotification";
import { fetchUsers } from "../../features/user/userSlice";

const PaymentAdd = ({ isOpen, onClose, user, onPayments }) => {
  const [gateway, setGateway] = useState("mercado_pago");
  const [paymentMethod, setPaymentMethod] = useState("credit_card");

  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [alertMessage, setAlertMessage] = useState("");
  const [modalPlacement] = useState("top-center");

  const [paymentAmount, setPaymentAmount] = useState(0.0);
  const [isLoading, setIsLoading] = useState(false);
  const [sellerId, setSellerId] = useState(null);


  const [sellers, setSellers] = useState([]);
  const { isAuthenticated } = useSelector((state) => state.auth);


  const dispatch = useDispatch();

  const Customer = {
    name: useRef(),
    email: useRef(),
    phoneNumber: useRef(),
  };

  const paymentGateways = [
    { label: "Mercado Pago", value: "mercado_pago" },
    { label: "Pague Seguro", value: "pag_seguro" },
  ];
  const paymentMethods = [
    { label: "Cartão de Crédito", value: "credit_card" },
    { label: "Cartão de Débito", value: "debit_card" },
    { label: "Boleto Bancário", value: "bank_slip" },
  ];

  useEffect(() => {
    if (isAuthenticated) {
      if (onPayments) {
        setIsLoading(true);
        dispatch(fetchUsers("role=seller"))
          .then((response) => {
            const options = response.payload.map((seller) => ({
              value: seller.id,
              label: seller.name,
            }));
            setSellers(options);
          })
          .catch((error) => console.error("Erro ao buscar Vendedores:", error))
          .finally(() => setIsLoading(false));
      }
    }
  }, [isAuthenticated, onPayments, dispatch]);


  
  const validateFields = () => {
    if (!customerName.trim()) {
      showToast("warning", "O nome do Cliente precisa ser definido!");
      return false;
    }
    if (!customerEmail.trim() || !/\S+@\S+\.\S+/.test(customerEmail)) {
      showToast("warning", "O email do cliente é inválido ou está vazio.");
      return false;
    }
    if (paymentAmount <= 0) {
      showToast("warning", "O valor da venda deve ser maior que zero.");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateFields()) {
      return;
    }

    setIsSubmitting(true);
    const paymentData = {
      id: onPayments ? sellerId : user.id,
      customer: {
        name: customerName,
        email: customerEmail,
        phone_number: customerPhone,
      },
      payment: {
        total_sale_value: paymentAmount,
        payment_gateway: gateway,
        payment_method: paymentMethod,
      },
    };

    try {
      const response = dispatch(addPayment(paymentData));
      if (response.error) {
        showToast("error", `Falha ao processar o pagamento: ${response}`);
      } else {
        showToast("success", "Pagamento efetuado com sucesso!");
        handleClear();
      }
    } catch (error) {
      showToast("error", `Falha ao processar o pagamento. Erro no Servidor`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClear = () => {
    setCustomerName("");
    setCustomerEmail("");
    setCustomerPhone("");
    setPaymentAmount(0.0);
    setPaymentMethod("credit_card");
    setGateway("mercado_pago");
  };

  return (
    <>
      <Modal show={isOpen} onClose={onClose} position={modalPlacement}>
        <Modal.Header>Novo Pagamento</Modal.Header>
        <Modal.Body>
          <div className="space-y-4">
            <div className="grid gap-6 mb-4 md:grid-cols-2">
              <div>
                <Label htmlFor="sellerName" value="Vendedor" />
                {onPayments ? (
                  <Select
                    options={sellers}
                    placeholder={
                      isLoading
                        ? "Carregando usuários..."
                        : "Selecione um Vendedor"
                    }
                    onChange={(e) => {
                      setSellerId(e.value);
                    }}
                    isClearable
                  />
                ) : (
                  <TextInput
                    type="text"
                    placeholder="Nome do Vendedor"
                    value={user.name}
                    disabled={true}
                  />
                )}
              </div>
              <div>
                <Label htmlFor="gateway" value="Gateway de Pagamento" />
                <Select
                  id="gateway"
                  defaultValue={paymentGateways[0]}
                  onChange={(e) => setGateway(e.value)}
                  disabled={isSubmitting}
                  options={paymentGateways}
                  className="z-50"
                />
              </div>
            </div>
            <div className="grid gap-6 mb-4 md:grid-cols-2">
              <div>
                <Label value="Valor da Venda" />
                <div className="grid grid-cols-2 gap-2 mb-2">
                  <TextInput
                    type="number"
                    placeholder="Valor da Venda"
                    value={paymentAmount}
                    onChange={(e) =>
                      setPaymentAmount(parseFloat(e.target.value))
                    }
                    disabled={isSubmitting}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="payment_method" value="Método de Pagamento" />
                <Select
                  id="payment_method"
                  defaultValue={paymentMethods[0]}
                  onChange={(e) => setPaymentMethod(e.value)}
                  options={paymentMethods}
                  disabled={isSubmitting}
                  className="z-50"
                />
              </div>
            </div>
            <div className="grid gap-6 mb-4 md:grid-cols-3">
              <div>
                <Label htmlFor="name" value="Nome do Cliente" />
                <TextInput
                  ref={Customer.name}
                  id="name"
                  type="text"
                  placeholder="Nome do Cliente"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  disabled={isSubmitting}
                />
      
              </div>
              <div>
                <Label htmlFor="email" value="Email do Cliente" />
                <TextInput
                  id="email"
                  type="email"
                  placeholder="Email do Cliente"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <Label htmlFor="phoneNumber" value="Telefone do Cliente" />
                <TextInput
                  id="phone_number"
                  type="phone"
                  placeholder="Telefone do Cliente"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  disabled={isSubmitting}
                />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="z-10"> 
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            color="success"
          >
            {isSubmitting ? (
              <>
                <Spinner size="sm" light={true} className="mr-2" />
                Processando...
              </>
            ) : (
              "Efetuar Pagamento"
            )}
          </Button>
          <Button
            color="gray"
            onClick={onClose}
            disabled={isSubmitting}
            size="sm"
          >
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastNotification />
      {alertMessage && (
        <div className="fixed bottom-4 right-4 p-4 bg-white border rounded-lg shadow z-index-50">
          {alertMessage}
        </div>
      )}
    </>
  );
};

export default PaymentAdd;
