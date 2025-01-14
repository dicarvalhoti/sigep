import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  Label,
  TextInput,
  Select,
  Checkbox,
  Datepicker,
} from "flowbite-react";
import { useDispatch,useSelector } from "react-redux";
import { updateUser } from "../../features/user/userSlice";
import SAlert from "../layout/SwalAlert";
import moment from "moment";
import "moment/locale/pt-br";

const UserEdit = ({ isOpen, onClose, user}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [passwordChanged,setPasswordChanged] = useState(false)
  const [role, setRole] = useState("");
  const [commissionPercentage, setCommissionPercentage] = useState("");
  const [effectiveDate, setEffectiveDate] = useState(moment().isValid() ? moment() : null);
  const [addPassword, setAddPassword] = useState(false);
  const [modalPlacement] = useState("top-center");
  const [alertProps, setAlertProps] = useState({ show: false });
  const { isAdmin } = useSelector((state) => state.auth);


  const dispatch = useDispatch();

  
  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setRole(user.role || "seller");
      setCommissionPercentage(user.commission_percentage || "");
      setEffectiveDate(user.effective_from ? moment(user.effective_from) : null);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      id: user.id,
      name,
      email,
      role,
      commission_percentage: commissionPercentage || null,
      effective_from: effectiveDate ? effectiveDate.format("YYYY-MM-DD") : null,

    };

    if (addPassword) {
      userData.password = password;
      userData.password_confirmation = passwordConfirmation;
      userData.password_changed = true
    }

    try {
      const response = await dispatch(updateUser(userData));
      if (response.error) {
        setAlertProps({
          title: "Erro",
          text: response.error.message,
          icon: "error",
          show: true,
          onConfirm: () => setAlertProps({ show: false }),
        });
      } else {
        setAlertProps({
          title: "Sucesso",
          text: "Usuário atualizado com sucesso!",
          icon: "success",
          show: true,
          onConfirm: () => {
            handleClose();
            setAlertProps({ show: false });
          },
        });
      }
    } catch (error) {
      console.error("Erro:", error);

      setAlertProps({
        title: "Erro Inesperado",
        text: "Ocorreu um erro inesperado. Tente novamente.",
        icon: "error",
        show: true,
        onConfirm: () => setAlertProps({ show: false }),
      });
    }
  };

  const handleClose = () => {
    setName("");
    setEmail("");
    setPassword("");
    setPasswordConfirmation("");
    setRole("seller");
    setCommissionPercentage("");
    setEffectiveDate(moment().isValid() ? moment() : null);
    setAddPassword(false);
    onClose()
  };

  return (
    <>
      <Modal show={isOpen} onClose={handleClose} position={modalPlacement}>
        <Modal.Header>Edição de Usuário</Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <Label htmlFor="name" value="Nome" />
              <TextInput
                id="name"
                type="text"
                placeholder="Nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="email" value="Email" />
              <TextInput
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            {isAdmin &&(
            <div className="mb-4">
              <Label htmlFor="role" value="Role" />
              <Select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="admin">Lojista</option>
                <option value="seller">Vendedor</option>
              </Select>
            </div>
            )}
            <div className="mb-4">
              <Checkbox
                id="addPassword"
                checked={addPassword}
                onChange={(e) => setAddPassword(e.target.checked)}
              />
               <Label htmlFor="addPassword" value=" Alterar Senha? " />

            </div>
            {addPassword && (
              <div className="grid gap-6 mb-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="password" value="Senha" />
                  <TextInput
                    id="password"
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required={addPassword}
                  />
                </div>
                <div>
                  <Label
                    htmlFor="password_confirmation"
                    value="Confirmar Senha"
                  />
                  <TextInput
                    id="password_confirmation"
                    type="password"
                    placeholder="Confirmar Senha"
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    required={addPassword}
                  />
                </div>
              </div>
            )}
            {(isAdmin && role === "seller") && (
              <div className="grid gap-6 mb-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="commission_percentage" value="Comissão (%)" />
                  <TextInput
                    id="commission_percentage"
                    type="number"
                    placeholder="Digite a comissão"
                    value={commissionPercentage}
                    onChange={(e) => setCommissionPercentage(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="effective_from" value="Data de Efetivação" />
                  <div className="absolute z-10">
                    <Datepicker
                      id="effective_from"
                      value={effectiveDate ? effectiveDate.toDate() : null}
                      onChange={(date) => setEffectiveDate(moment(date))}
                      minDate={moment().toDate()}
                      placeholder="Selecione a data"
                      required
                    />
                  </div>
                </div>
              </div>
            )}
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit" onClick={handleSubmit}>
            Salvar
          </Button>
          <Button color="gray" onClick={handleClose}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
      <SAlert {...alertProps} />
    </>
  );
};

export default UserEdit;
