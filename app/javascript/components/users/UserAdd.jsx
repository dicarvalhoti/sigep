import React, { useState,useEffect, useRef } from "react";
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
import { addUser } from "../../features/user/userSlice";
import SAlert from "../layout/SwalAlert";
import moment from "moment";
import "moment/locale/pt-br";
import { validateFields } from "../../features/validateFields";

const UserAdd = ({ isOpen, onClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const [role, setRole] = useState("seller");
  const [commissionPercentage, setCommissionPercentage] = useState("");
  const [effectiveDate, setEffectiveDate] = useState(moment()); // Inicializando com null
  const [addPassword, setAddPassword] = useState(false);
  const [modalPlacement] = useState("top-center");
  const [alertProps, setAlertProps] = useState({ show: false });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { isAdmin } = useSelector((state) => state.auth);
  const [fields, setFields] = useState({
    Email: { value: '', color: 'gray', helperText: ''},
    Name: { value: '', color: 'gray', helperText:  '' },
    Password: { value: '', color: 'gray', helperText:  '' },
    Commission: { value: '', color: 'gray', helperText:  '' },
  });

  const dispatch = useDispatch();
  const userName  = useRef(null)



  const handleSubmit = async (e) => {

    const attributesToValidate = ['Email', 'Name', 'Password', 'Commission'];
   

    

    const userData = {
      name: fields.Name.value,
      email: fields.Email.value,
      role,
      effective_from: effectiveDate ? effectiveDate.format("DD/MM/YYYY") : null,
    };

    // Adicionar comissão e data de efetivação se for seller
    if (role === "seller") {
      userData.commission_percentage = commissionPercentage;
      userData.effective_from = effectiveDate
        ? effectiveDate.format("DD/MM/YYYY")
        : null;
    }

    // Incluir senha apenas se o checkbox estiver marcado
    if (addPassword) {
      userData.password = password;
      userData.password_confirmation = password_confirmation;
      userData.create_password = true;
    }
    try {
      const response = await dispatch(addUser(userData));
      if (response.error) {
        const updatedFields = validateFields(fields, response.error, attributesToValidate);
        setFields(updatedFields);
        setAlertProps({
          title: "Error",
          text: response.error.message,
          icon: "error",
          show: true,
          onConfirm: () => {
            setAlertProps({ show: false });
          },
        });
      } else {
        setAlertProps({
          title: "Success",
          text: "User added successfully!",
          icon: "success",
          show: true,
          onConfirm: () => {
            setAlertProps({ show: false });
            onClose();
          },
        });
      }
    } catch (error) {
      setAlertProps({
        title: "Unexpected Error",
        text: "An unexpected error occurred. Please try again.",
        icon: "error",
        show: true,
        onConfirm: () => {
          setAlertProps({ show: false });
        },
      });
    }
  };

  return (
    <>
      <Modal show={isOpen} onClose={onClose} position={modalPlacement}>
        <Modal.Header>Adicionar Usuário</Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <Label htmlFor="name" value="Nome" />
              <TextInput
                id="name"
                type="text"
                placeholder="Nome"
                value={fields.Name.value}
                color={fields.Name.color}
                helperText={fields.Name.helperText}
                onChange={(e) =>
                  setFields((prev) => ({
                    ...prev,
                    Name: { ...prev.Name, value: e.target.value },
                  }))
                }
                required
                ref={userName}
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="email" value="Email" />
              <TextInput
                id="email"
                type="email"
                placeholder="Email"
                value={fields.Email.value}
                color={fields.Email.color}
                helperText={fields.Email.helperText}
                onChange={(e) =>
                  setFields((prev) => ({
                    ...prev,
                    Email: { ...prev.Email, value: e.target.value },
                  }))
                }
                className={fields.Email.className}
                required
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="role" value="Role" />
              <Select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="administrator">Administrator</option>
                <option value="seller">Seller</option>
              </Select>
            </div>
            <div className="mb-4">
              <Label htmlFor="addPassword" value="Adicionar Senha?" />
              <Checkbox
                id="addPassword"
                checked={addPassword}
                onChange={(e) => setAddPassword(e.target.checked)}
              />
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
                    color={fields.Password.color}
                    helperText={fields.Password.helperText}
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
                    value={password_confirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    required={addPassword}
                  />
                </div>
              </div>
            )}
            {role === "seller" && (
              <div className="grid gap-6 mb-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="commission_percentage" value="Comissão (%)" />
                  <TextInput
                    id="commission_percentage"
                    type="number"
                    placeholder="Digite a comissão"
                    value={commissionPercentage}
                    color={fields.Commission.color}
                    helperText={fields.Commission.helperText}
                    onChange={(e) => setCommissionPercentage(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="effective_from" value="Data de Efetivação" />
                  <div className="absolute z-10">
                    {" "}
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
          <Button color="gray" onClick={onClose}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
      <SAlert {...alertProps} />
    </>
  );
};

export default UserAdd;
