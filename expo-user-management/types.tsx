import React from 'react';

interface SignInProps {
    setModalState: React.Dispatch<React.SetStateAction<string>>;
}

interface ModalStateProps {
    modalState: string;
}


export {
    SignInProps,
    ModalStateProps
}
