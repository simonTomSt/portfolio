import { type ReactNode, Fragment } from 'react';

import { Dialog, Transition } from '@headlessui/react';
import clsx from 'clsx';
import { XLg } from 'react-bootstrap-icons';

import { Paper } from 'components/paper';

import styles from './modal.module.css';

export type ModalProps = {
  children: ReactNode;
  open: boolean;
  onClose: () => void;
  className?: string;
};

export const Modal = ({
  children,
  open,
  onClose,
  className = '',
}: ModalProps) => (
  <Transition appear show={open} as={Fragment}>
    <Dialog as='div' className={styles.dialog} onClose={onClose}>
      <Transition.Child
        as={Fragment}
        enter='ease-out duration-300'
        enterFrom='opacity-0'
        enterTo='opacity-100'
        leave='ease-in duration-200'
        leaveFrom='opacity-100'
        leaveTo='opacity-0'
      >
        <div className={styles.overlay} />
      </Transition.Child>

      <div className={styles['main-container']}>
        <div className={styles.container}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 scale-95'
            enterTo='opacity-100 scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 scale-100'
            leaveTo='opacity-0 scale-95'
          >
            <Dialog.Panel className={clsx(styles.panel, className)}>
              <Paper className={styles.paper}>
                <button onClick={onClose} className={styles.close}>
                  <XLg />
                </button>
                {children}
              </Paper>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </div>
    </Dialog>
  </Transition>
);
