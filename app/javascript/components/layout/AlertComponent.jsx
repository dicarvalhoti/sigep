import React from "react";
import { HiInformationCircle } from "react-icons/hi";
import { Alert } from "flowbite-react";



export function AlertComponent({type, message}) {
  return (
    <Alert color={type} icon={HiInformationCircle} withBorderAccent>
      <span className="font-medium">Info alert!</span> {message}
    </Alert>
  );
}