const common_style = {
    padding: '12px 21px',
    fontSize: '14px',
    minWidth: '176px',
    maxWidth: '400px',
    bottom: '96px',
    borderRadius: '4px',
    boxShadow: '0px 8px 55px rgba(0, 0, 0, 0.56)',
    zindex: '9',
}

export const toast_duration = 4000

export const toast_error_option = {
    className: 'toast-sucess-wrapper',
    style: {
        border: '1px solid #B03B3B',
        color: '#FFE0E0',
        background: '#291D1D',
        ...common_style,
    },
    duration: toast_duration,
};

export const toast_sucess_option = {
    className: 'toast-error-wrapper',
    style: {
        border: '1px solid #A7DC74',
        color: '#A7DC74',
        background: '#1A1A1A',
        ...common_style,
    },
    duration: toast_duration,
};

export const toast_info_option = {
    icon: '❗',
    style: {
        border: '1px solid #B03B3B',
        color: '#FFE0E0',
        background: '#291D1D',
        ...common_style,
    },
    duration: toast_duration,
}
