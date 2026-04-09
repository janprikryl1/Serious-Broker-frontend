import Swal from 'sweetalert2';
import withReactContent from "sweetalert2-react-content";

export const CustomSwal = Swal.mixin({
  background: 'var(--tertiary-color)',
  color: 'var(--white-color)'
});

export const MySwal = withReactContent(CustomSwal);