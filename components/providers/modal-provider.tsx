"use client"

import { useEffect, useState } from "react";
import CoverImageModal from "@/components/modal/cover-image-modal";

const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) {
        return null;
    }

    return (
        <>
            <CoverImageModal />
        </>
    );
}

export default ModalProvider;