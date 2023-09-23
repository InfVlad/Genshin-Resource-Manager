import Image from 'next/image';

import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

function PortalImpl({
  onClose,
  children,
  //   title,
  closeOnClickOutside,
}: {
  children: React.ReactNode;
  closeOnClickOutside: boolean;
  onClose: () => void;
  //   title: string;
}) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (modalRef.current !== null) {
      modalRef.current.focus();
    }
  }, []);

  useEffect(() => {
    let modalOverlayElement: HTMLElement | null = null;
    const handler = (event: KeyboardEvent) => {
      if (event.keyCode === 27) {
        onClose();
      }
    };
    const clickOutsideHandler = (event: MouseEvent) => {
      const target = event.target;
      if (
        modalRef.current !== null &&
        !modalRef.current.contains(target as Node) &&
        closeOnClickOutside
      ) {
        onClose();
      }
    };
    const modelElement = modalRef.current;
    if (modelElement !== null) {
      modalOverlayElement = modelElement.parentElement;
      if (modalOverlayElement !== null) {
        modalOverlayElement.addEventListener('click', clickOutsideHandler);
      }
    }

    window.addEventListener('keydown', handler);

    return () => {
      window.removeEventListener('keydown', handler);
      if (modalOverlayElement !== null) {
        modalOverlayElement?.removeEventListener('click', clickOutsideHandler);
      }
    };
  }, [closeOnClickOutside, onClose]);

  return (
    <div
      className='fixed inset-0 z-50 flex shrink grow-0 flex-col items-center justify-center bg-[#0a0a14f5]'
      role='dialog'
    >
      <div
        className='relative flex max-h-[95%] min-h-[6.25rem] min-w-[18.75rem] max-w-[96vw] grow-0 flex-col overflow-hidden rounded-[0.3125rem] bg-[#1e2231] p-3'
        tabIndex={-1}
        ref={modalRef}
      >
        <button
          className='absolute right-3 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border-0 transition-all duration-200 ease-in-out hover:shadow-button hover:shadow-white '
          aria-label='Close'
          title='Close'
          type='button'
          onClick={onClose}
        >
          <Image alt='Close' src={'/images/close.svg'} fill />
        </button>
        <div>{children}</div>
      </div>
    </div>
  );
}

export function Modal({
  onClose,
  children,
  //   title,
  closeOnClickOutside = false,
}: {
  children: React.ReactNode;
  closeOnClickOutside?: boolean;
  onClose: () => void;
  // title: string;
}): JSX.Element {
  return createPortal(
    <PortalImpl onClose={onClose} closeOnClickOutside={closeOnClickOutside}>
      {children}
    </PortalImpl>,
    document.body,
  );
}
