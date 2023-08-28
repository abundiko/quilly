import { AnimatePresence, motion } from "framer-motion";
import { FaTrashAlt } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

type SearchHistorySectionProps = {
  onHistorySelect: (e: string) => void;
  setHistory: any;
  history: string[];
};

const SearchHistorySection = ({
  onHistorySelect,
  history,
  setHistory
}: SearchHistorySectionProps) => {
  function onSelectHistory(text: string) {
    onHistorySelect(text);
  }

  if (history.length > 0)
    return (
      <div className="mb-4">
        <div className="flex justify-between items-center">
          <h6 className="font-[600] text-sm">Search History</h6>
          <button
            onClick={() => setHistory([])}
            className="app-icon-button small"
          >
            <FaTrashAlt />
          </button>
        </div>
        <div className="p-2 rounded-md light-bg mt-1">
          <AnimatePresence>
            {history.map(item =>
              <motion.div
                {...animations}
                key={item}
                className="flex w-full bg-transparent py-1 justify-between items-center overflow-hidden"
              >
                <button
                  className="text-sm  hover:underline"
                  onClick={() => onSelectHistory(item)}
                >
                  {item}
                </button>
                <button
                  onClick={() => setHistory(history.filter(i => i != item))}
                  className="app-icon-button small"
                >
                  <IoClose />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    );
};

export default SearchHistorySection;

const animations = {
  initial: {
    maxHeight: "30px",
    opacity: 0
  },
  animate: {
    maxHeight: "30px",
    opacity: 1
  },
  exit: {
    maxHeight: "0px",
    opacity: 0
  }
};
