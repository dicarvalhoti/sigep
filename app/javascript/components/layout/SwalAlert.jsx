import React, { useEffect } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const SwalAlert = ({type, title, text, icon, show, onConfirm }) => {
    useEffect(() => {
        if (show) {
            MySwal.fire({
                title: title || 'Alert',
                text: text || 'This is an alert',
                icon: icon || 'warning',
                confirmButtonText: 'Fechar',
            }).then((result) => {
                if (result.isConfirmed && onConfirm) {
                    onConfirm();
                }
            });

            if (type === 'question') {
                MySwal.fire({
                    title: "Excluir Informação",
                    text: "Tem certeza que deseja excluir este registro?",
                    icon: "question",
                    showCancelButton: true,
                    confirmButtonColor: "#d33",
                    cancelButtonColor: "#4EBB30",
                    confirmButtonText: "Sim, certeza!",
                    cancelButtonText: "Não, mantenha assim!",
                  }).then((result) => {
                    if (result.isConfirmed && onConfirm) {
                        onConfirm();
                    }
                });
            }   
        }
    }, [show, title, text, icon, onConfirm]);

    return null;
};

export default SwalAlert;