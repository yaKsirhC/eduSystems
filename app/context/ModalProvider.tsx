"use client"

import { Modal,ModalContextInterface } from "@/next-env";
import { Icon } from "@iconify-icon/react";
import React, { createContext, useState } from "react";
import '../styles/modal.scss'

export const modalContext = createContext<ModalContextInterface>({
  modal: {
    element: undefined,
    title: "",
  },
  setModal: (_pre: any) => {},
});

export default function ModalProvider({ children }: { children: JSX.Element }) {
  const [modal, setModal] = useState<Modal>({
    element: undefined,
    title: "",
  });
  // const modalRef = useRef();

  const styles: React.CSSProperties = {
    left: "50%",
    top: "50%",
    position: "absolute",
    transform: "translate(-50%, -50%)",
    maxWidth: "95%",
    overflow: "scroll",
  };

  return (
    <>
      <modalContext.Provider value={{ modal, setModal }}>
        {children}
        {modal.element !== undefined && (
          <div>
            <div className="shadow" onClick={() => setModal({ element: undefined })}></div>
            <>
              <div style={styles} className="bg-white rounded-lg flex flex-col z-50">
                <div className="titlebar border-b-2 mx-2 border-gray-200  flex mb-4 items-center">
                  <div className="mx-auto">{modal.title && modal.title}</div>
                  <button className="text-black hover:text-red-500 transition-all pt-1 px-2 self-end" onClick={() => setModal({ element: undefined, title: "" })}>
                    <Icon icon="ph:x" color="inherit" height={24} />
                  </button>
                </div>
                <div className="content px-4">{modal.element}</div>
              </div>
            </>
          </div>
        )}
      </modalContext.Provider>
    </>
  );
}
