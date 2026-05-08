import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const languages = [
  { label: "Python", value: "python3" },
  { label: "JavaScript", value: "nodejs" },
  { label: "Java", value: "java" },
  { label: "C++", value: "cpp17" },
  { label: "C", value: "c" },
  { label: "SQL", value: "sql" },
];

export default function LanguageDropdown({
  language,
  setLanguage,
}) {
  const [open, setOpen] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  const selected =
    languages.find((l) => l.value === language)?.label ||
    "Select";

  return (
    <div
      className="relative"
      ref={dropdownRef}
    >
      {/* Button */}
      <button
        onClick={() => setOpen(!open)}
        className="
          flex
          items-center
          justify-between
          gap-3
          min-w-[145px]
          rounded-2xl
          border
          border-violet-500/40
          bg-black/80
          backdrop-blur-xl
          px-3
          py-1
          text-white
          font-bold
          shadow-[0_0_25px_rgba(139,92,246,0.25)]
          transition-all
          duration-300
          hover:border-violet-400
        "
      >
        <span>{selected}</span>

        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-violet-500/10">
          <ChevronDown
            size={18}
            className={`transition-transform duration-300 ${
              open ? "rotate-180" : ""
            }`}
          />
        </div>
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className="
            absolute
            right-0
            mt-3
            w-full
            overflow-hidden
            rounded-2xl
            border
            border-white/10
            bg-black/95
            backdrop-blur-2xl
            shadow-2xl
            z-50
            animate-in
            fade-in
            zoom-in-95
          "
        >
          {languages.map((item) => (
            <button
              key={item.value}
              onClick={() => {
                setLanguage(item.value);
                setOpen(false);
              }}
              className={`
                w-full
                px-5
                py-3
                text-left
                text-sm
                font-semibold
                transition-all
                duration-200
                ${
                  language === item.value
                    ? "bg-white/10 text-white"
                    : "text-slate-300 hover:bg-white/5 hover:text-white"
                }
              `}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}