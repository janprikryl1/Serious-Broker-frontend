import Swal from 'sweetalert2';
import withReactContent from "sweetalert2-react-content";

export const CustomSwal = Swal.mixin({
  background: 'var(--tertiary-color)',
  color: 'var(--white-color)',
  iconColor: 'var(--secondary-color)',
  buttonsStyling: false,
  customClass: {
    popup: '!tw-rounded-3xl !tw-p-7 sm:!tw-p-12 tw-shadow-2xl',
    icon: '!tw-mt-0 !tw-mb-6',
    title: '!tw-text-lg sm:!tw-text-xl !tw-font-bold !tw-text-white !tw-m-0 !tw-pt-1',
    htmlContainer: '!tw-text-sm sm:!tw-text-base !tw-text-stone-300 !tw-m-0 !tw-mt-2',
    actions: 'tw-flex tw-gap-3 tw-mt-6 tw-w-full tw-justify-center',
    confirmButton:
        'tw-px-5 tw-py-2 tw-rounded-xl tw-font-medium tw-text-sm sm:tw-text-base ' +
        '!tw-bg-[var(--secondary-color)] hover:tw-opacity-90 !tw-text-black ' +
        'tw-transition-all tw-cursor-pointer tw-border-0',
    cancelButton:
        'tw-px-5 tw-py-2 tw-rounded-xl tw-font-medium tw-text-sm sm:tw-text-base ' +
        'tw-bg-stone-500 tw-bg-opacity-80 hover:tw-bg-stone-600 tw-text-stone-200 ' +
        'tw-transition-all tw-cursor-pointer tw-border-0',
  }
});

export const MySwal = withReactContent(CustomSwal);