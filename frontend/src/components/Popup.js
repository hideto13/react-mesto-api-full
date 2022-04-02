import { useEffect } from "react";

function Popup({ isOpen, name, onClose, children }) {
  useEffect(() => {
    if (!isOpen) return;
    const closeByEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", closeByEscape);

    return () => document.removeEventListener("keydown", closeByEscape);
  }, [isOpen, onClose]);

  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <section
      className={`popup ${isOpen ? "popup_opened" : ""} popup_${name}`}
      onClick={handleOverlay}
    >
      <div className={`popup__container popup__container_popup_${name}`}>
        <button className="popup__close" type="button" onClick={onClose} />
        {children}
      </div>
    </section>
  );
}

export default Popup;
