import {useCallback} from 'react'

export const useMessage = () => {

  const toast = (text) => {
    return (
        <div className="toast" role="alert" aria-live="assertive" aria-atomic="true">
          <div className="toast-header">
            <strong className="mr-auto">MERN App</strong>
            <small>{(new Date).getTime()}</small>
            <button type="button" className="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="toast-body">
            {text}
          </div>
        </div>
    )
  };

  return useCallback((text) => {
    if (text) {
      let newToast = document.createElement("div");
      newToast.innerHTML = toast(text);
      document.body.insertAdjacentHTML('afterbegin ', newToast);
    }
  }, []);
};