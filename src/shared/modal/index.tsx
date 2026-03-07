import ModalBody from './body';
import ModalFooter from './footer';
import ModalHeader from './header';
import ModalWrapper from './root';
import { ModalCompound } from './types';

(ModalWrapper as ModalCompound).Header = ModalHeader;
(ModalWrapper as ModalCompound).Footer = ModalFooter;
(ModalWrapper as ModalCompound).Body = ModalBody;

export const ModalEID = ModalWrapper as ModalCompound;
