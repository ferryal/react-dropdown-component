import React, {
  FC,
  MouseEventHandler,
  useRef,
  useEffect,
  useState,
} from 'react';
import { useInView } from 'react-intersection-observer';

import './style.css';

interface IOption {
  id?: number;
  value?: string;
  label?: string;
  name?: string;
  nama?: string;
  item?: string;
}

interface Iprops {
  label: string;
  name?: string;
  id?: string;
  className?: string;
  options: IOption[];
  onSelect?: (tags: any) => void;
  onScroll?: (inView: boolean) => void;
  onSearch?: (query: string) => void | Promise<void>;
  isLastPage?: boolean;
  placeholderInput?: string;
  isError?: boolean;
  errorMessage?: string;
  required?: boolean;
  disabled?: boolean;
  value?: any[];
  style?: React.CSSProperties;
  placeholderSearch?: string;
  keyword?: string;
  onClose?: () => void;
  withSearch?: boolean;
  multiple?: boolean;
  outlined?: boolean;
}
export const Dropdown: FC<Iprops> = ({
  withSearch = false,
  isLastPage = false,
  isError = false,
  required = false,
  disabled = false,
  multiple = false,
  outlined = false,
  keyword = '',
  placeholderInput = 'Choose option',
  label,
  options,
  name,
  id,
  className,
  errorMessage,
  style,
  value,
  placeholderSearch,
  onScroll,
  onSelect,
  onClose,
  onSearch,
}) => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [haveSelected, setHaveSelected] = useState<boolean>(
    (value && value.length > 0) || false
  );
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const [selectsToShow, setSelectsToShow] = useState(options);
  const [loadmore, setLoadmore] = useState(isLastPage);
  const [selected, setSelected] = useState<any>(value || []);
  const [search, setSearch] = useState(keyword);

  const refDropdown = useRef<HTMLDivElement>(null);
  const refContainer = useRef<HTMLDivElement>(null);
  const refContainerDropDown = useRef<HTMLDivElement>(null);

  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    setSearch(keyword);
  }, [keyword]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        refContainer.current &&
        !refContainer.current.contains(event.target as HTMLElement)
      ) {
        if (
          refDropdown.current &&
          !refDropdown.current.contains(event.target as HTMLElement)
        ) {
          setOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [refDropdown, refContainer]);

  useEffect(() => {
    if (inView && loadmore && isSearch === false) {
      onScroll && onScroll(inView);

      if (options.length !== selectsToShow.length) {
        setSelectsToShow(options);
        setLoadmore(isLastPage);
      }
    }

    if (onSearch && isSearch) {
      setSelectsToShow(options);
      setLoadmore(isLastPage);
    }
  }, [inView, loadmore, options, isSearch]);

  useEffect(() => {
    if (!isOpen) {
      setSelectsToShow(options);
      if (onClose) {
        onClose();
      }
      if (!onSearch && !keyword) {
        setSearch('');
      }
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectsToShow(options);
  }, [options]);

  useEffect(() => {
    setSelected(value);
  }, [value]);

  const handleOpen: MouseEventHandler = () => {
    if (disabled) {
      setOpen(false);
    } else {
      setOpen(!isOpen);
    }
  };

  const handleSearch = (searchString: string) => {
    let filteredToShow = options.filter((select) => {
      return (
        (select?.label ||
          select?.name ||
          select?.nama ||
          select?.value ||
          select?.item) &&
        (
          select?.label ||
          select?.name ||
          select?.nama ||
          select?.value ||
          select?.item ||
          ''
        )
          .toLowerCase()
          .includes(searchString.toLocaleLowerCase())
      );
    });
    const resultArr = filteredToShow.length ? filteredToShow : [];
    if (!searchString) {
      setSelectsToShow(options);
    } else {
      setSelectsToShow(resultArr);
    }
  };

  const hadleSelect = (item: IOption) => {
    if (Array.isArray(selected) && multiple === true) {
      if (
        !selected.some(
          (selectedOption) =>
            (selectedOption.id || selectedOption.value) ===
            (item.id || item.value)
        )
      ) {
        setSelected([...selected, item]);
        onSelect && onSelect([...selected, item]);
        setHaveSelected(true);
      } else {
        const copy = selected.filter(
          (copyItem) =>
            (copyItem.id || copyItem.value) !== (item.id || item.value)
        );
        setSelected([...copy]);
        onSelect && onSelect([...copy]);
        setHaveSelected(true);
      }
    } else if (onSelect && multiple === false) {
      onSelect([item]);
      setSearch('');
      setSelected([item]);
      setOpen(false);
    }
  };

  const isSelected = (selectedId: number | string): any => {
    if (Array.isArray(selected)) {
      const found = selected.filter(
        (option) => (option.id || option.value) === selectedId
      );
      return found.length > 0 && true;
    }
  };
  const handleRemoveSelected = (e: React.MouseEvent, item: IOption) => {
    e.stopPropagation();
    if (Array.isArray(selected)) {
      const copy = selected.filter(
        (copyItem) =>
          (copyItem.id || copyItem.value) !== (item.id || item.value)
      );
      setSelected([...copy]);
      onSelect && onSelect([...copy]);

      if (copy.length === 0) {
        setHaveSelected(false);
      }
    }
  };

  const classNameContainer = React.useMemo(
    () => ['mky--container', className],
    [className]
  );

  return (
    <>
      <div
        style={style}
        className={classNameContainer.join(' ')}
        id={id}
        ref={refContainer}
      >
        <div className="mky--search-bar" onClick={handleOpen}>
          {label && (
            <div className="mky--label">
              <p className="mky--label-text">{label}</p>
              {required && <p className="mky--required">*</p>}
            </div>
          )}
          <div
            className={`mky--select ${isError && 'mky--error'} ${
              disabled && 'mky--disabled'
            } ${!outlined && 'mky--outlined'}`}
          >
            {Array.isArray(selected) &&
              selected.map((select) => (
                <div
                  className="mky--input-item"
                  id="mky--selected-item"
                  key={select.id || select.value}
                >
                  {select?.name ||
                    select?.nama ||
                    select?.label ||
                    select?.item ||
                    ''}
                  <div className="mky--input-item__close">
                    <svg
                      className="mky--close-icon"
                      width="6"
                      height="6"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      onClick={(e) => handleRemoveSelected(e, select)}
                    >
                      <path
                        d="M13.7909 10L19.4767 4.3142C20.1744 3.61648 20.1744 2.48523 19.4767 1.78693L18.2131 0.523295C17.5153 -0.174432 16.3841 -0.174432 15.6858 0.523295L10 6.20909L4.3142 0.523295C3.61648 -0.174432 2.48523 -0.174432 1.78693 0.523295L0.523295 1.78693C-0.174432 2.48466 -0.174432 3.61591 0.523295 4.3142L6.20909 10L0.523295 15.6858C-0.174432 16.3835 -0.174432 17.5148 0.523295 18.2131L1.78693 19.4767C2.48466 20.1744 3.61648 20.1744 4.3142 19.4767L10 13.7909L15.6858 19.4767C16.3835 20.1744 17.5153 20.1744 18.2131 19.4767L19.4767 18.2131C20.1744 17.5153 20.1744 16.3841 19.4767 15.6858L13.7909 10Z"
                        fill="#fff"
                      />
                    </svg>
                  </div>
                </div>
              ))}
            {(!haveSelected || selected.length === 0) && (
              <span className="mky--placeholder">{placeholderInput}</span>
            )}
          </div>
          {isError && (
            <div className="mky--error-text">
              {errorMessage ? (
                <p>{errorMessage}</p>
              ) : (
                <p>
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.88745 8.19466C10.2079 8.75011 9.80566 9.44443 9.16563 9.44443H0.834276C0.193008 9.44443 -0.207373 8.74903 0.112453 8.19466L4.27818 0.971948C4.59879 0.416237 5.40179 0.417243 5.72183 0.971948L9.88745 8.19466ZM5 6.70137C4.55894 6.70137 4.20139 7.05893 4.20139 7.49999C4.20139 7.94104 4.55894 8.2986 5 8.2986C5.44106 8.2986 5.79861 7.94104 5.79861 7.49999C5.79861 7.05893 5.44106 6.70137 5 6.70137ZM4.24179 3.83078L4.37058 6.1919C4.3766 6.30238 4.46795 6.38887 4.5786 6.38887H5.42141C5.53205 6.38887 5.62341 6.30238 5.62943 6.1919L5.75821 3.83078C5.76473 3.71144 5.66971 3.6111 5.55019 3.6111H4.4498C4.33028 3.6111 4.23528 3.71144 4.24179 3.83078Z"
                      fill="#E93E3E"
                    />
                  </svg>
                  Input Required
                </p>
              )}
            </div>
          )}
        </div>
        {isOpen && (
          <div
            className={`mky--dropdown ${isError && 'error-dropdown'}`}
            ref={refDropdown}
          >
            {withSearch && (
              <div className="mky--dropdown__search">
                <svg
                  width="14"
                  height="15"
                  viewBox="0 0 14 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.50006 0C8.53765 0 11.0001 2.46256 11.0001 5.50029C11.0001 6.74868 10.5842 7.89993 9.88346 8.82304L13.7791 12.7233C14.0718 13.0164 14.0715 13.4913 13.7785 13.784C13.4854 14.0767 13.0105 14.0764 12.7178 13.7834L8.82266 9.88388C7.89959 10.5847 6.74839 11.0006 5.50006 11.0006C2.46246 11.0006 0 8.53802 0 5.50029C0 2.46256 2.46246 0 5.50006 0ZM5.50006 1.5C3.2909 1.5 1.5 3.29098 1.5 5.50029C1.5 7.70961 3.2909 9.50058 5.50006 9.50058C7.70921 9.50058 9.50011 7.70961 9.50011 5.50029C9.50011 3.29098 7.70921 1.5 5.50006 1.5Z"
                    fill="#C1C1C1"
                  />
                </svg>
                <input
                  id="mky--input-search"
                  name={name}
                  type="text"
                  className="mky--input-search"
                  placeholder={placeholderSearch || 'Search option'}
                  value={search}
                  onChange={(e) => {
                    e.preventDefault();
                    setSearch(e.target.value);
                    if (onSearch) {
                      onSearch(e.target.value);
                      if (refContainerDropDown?.current) {
                        refContainerDropDown.current.scrollTop = 0;
                      }
                    } else {
                      handleSearch(e.target.value);
                    }
                  }}
                  onFocusCapture={() => setIsSearch(true)}
                ></input>
              </div>
            )}
            <div
              className="mky--drop-container"
              onScrollCapture={() => setIsSearch(false)}
              ref={refContainerDropDown}
            >
              {selectsToShow.map((select, idx) => {
                const lastItem = idx === selectsToShow.length - 1;
                return (
                  <div
                    key={idx}
                    id={`mky-checkbox-${idx}`}
                    className={`mky--item ${
                      (select.id || select.value) === selectsToShow.length
                        ? 'mky--item-border-bottom'
                        : ''
                    }`}
                    onClick={() =>
                      hadleSelect(select) as
                        | MouseEventHandler<HTMLDivElement>
                        | undefined
                    }
                    ref={lastItem ? ref : null}
                  >
                    {selectsToShow && selectsToShow[0].hasOwnProperty('id') ? (
                      <div
                        className={`mky--checkbox ${
                          select?.id && isSelected(select.id)
                            ? 'mky--checkbox__active'
                            : ''
                        }`}
                      >
                        {select?.id && isSelected(select?.id) && (
                          <svg
                            className="mky--checkbox-icon-active"
                            width="12"
                            height="12"
                            viewBox="0 0 20 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M6.79289 15.1643L0.292881 8.66429C-0.097627 8.27379 -0.097627 7.64062 0.292881 7.25007L1.70706 5.83585C2.09757 5.44531 2.73077 5.44531 3.12128 5.83585L7.5 10.2145L16.8787 0.83585C17.2692 0.445342 17.9024 0.445342 18.2929 0.83585L19.7071 2.25007C20.0976 2.64058 20.0976 3.27374 19.7071 3.66429L8.20711 15.1643C7.81656 15.5548 7.1834 15.5548 6.79289 15.1643Z"
                              fill="white"
                            />
                          </svg>
                        )}
                      </div>
                    ) : (
                      <div
                        className={`mky--checkbox ${
                          select?.value && isSelected(select?.value)
                            ? 'mky--checkbox__active'
                            : ''
                        }`}
                      >
                        {select?.value && isSelected(select?.value) && (
                          <svg
                            className="mky--checkbox-icon-active"
                            width="12"
                            height="12"
                            viewBox="0 0 20 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M6.79289 15.1643L0.292881 8.66429C-0.097627 8.27379 -0.097627 7.64062 0.292881 7.25007L1.70706 5.83585C2.09757 5.44531 2.73077 5.44531 3.12128 5.83585L7.5 10.2145L16.8787 0.83585C17.2692 0.445342 17.9024 0.445342 18.2929 0.83585L19.7071 2.25007C20.0976 2.64058 20.0976 3.27374 19.7071 3.66429L8.20711 15.1643C7.81656 15.5548 7.1834 15.5548 6.79289 15.1643Z"
                              fill="white"
                            />
                          </svg>
                        )}
                      </div>
                    )}
                    <div className="mky--option">
                      <div className="mky--label-option">
                        {select?.name ||
                          select?.nama ||
                          select?.label ||
                          select?.item ||
                          select?.value ||
                          ''}
                      </div>
                    </div>
                  </div>
                );
              })}
              {loadmore && <div ref={ref} className="mky--loadings" />}
            </div>
          </div>
        )}
      </div>
    </>
  );
};
