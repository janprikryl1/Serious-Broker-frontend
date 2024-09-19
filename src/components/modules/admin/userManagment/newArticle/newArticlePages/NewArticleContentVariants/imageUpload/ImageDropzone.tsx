import { DropzoneInputProps, DropzoneRootProps } from "react-dropzone";
import { FC } from "react";
import { useTranslation } from "react-i18next";

type Props = {
    getRootProps: <T extends DropzoneRootProps>(props?: T) => T;
    getInputProps: <T extends DropzoneInputProps>(props?: T) => T;
};

export const ImageDropzone: FC<Props> = ({ getRootProps, getInputProps }) => {
    const { t } = useTranslation();

    return (
        <div
            {...getRootProps({ className: 'dropzone' })}
            className="d-flex aspect-ratio-1x1 w-100 cursor-pointer flex-column justify-content-center rounded bg-secondary bg-opacity-50 p-4 text-center hover-bg-light lg-col-2"
        >
            <input {...getInputProps()} />
            <p className="text-dark lg-px-4 lg-fs-5">
                {t("Drag 'n' drop some files here, or click to select files, max 20MB")}
            </p>
        </div>
    );
};
