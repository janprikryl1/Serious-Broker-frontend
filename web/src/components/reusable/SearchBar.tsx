import {FaSearch} from "react-icons/fa";
import {LuDelete} from "react-icons/lu";
import {FC} from "react";
import {useTranslation} from "react-i18next";

type SearchFieldProps = {
  value: string;
  className?: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  style?: React.CSSProperties;
};

export const SearchBar: FC<SearchFieldProps> = ({
                                                  value,
                                                  className = "outline-searchbar",
                                                  placeholder = "Search",
                                                  onChange,
                                                  style
                                                }) => {
  const {t} = useTranslation();

  return (
    <>
      <div
        className={`d-flex align-items-center position-relative ${className}`}
        style={{ fontSize: "16px", ...(style || {}) }}
      >
        <div className="search-icon-wrapper">
          <FaSearch />
        </div>

        <input
          type="text"
          className="search-input flex-grow-1"
          placeholder={t(placeholder)}
          value={value}
          onChange={onChange}
        />

        {value && (
          <LuDelete
            color="var(--secondary-color)"
            size={20}
            className="position-absolute end-0 me-2"
            style={{ cursor: 'pointer' }}
            onClick={() => {
              const event = { target: { value: '' } } as React.ChangeEvent<HTMLInputElement>;
              onChange(event);
            }}
          />
        )}
      </div>
    </>
  )
}

