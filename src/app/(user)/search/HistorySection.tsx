import useLocalStorage from "@/hooks/use-locatStorage";
import { FaTrashAlt } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

type SearchHistorySectionProps = {
  onHistorySelect: (e: string) => void;
};

const SearchHistorySection = ({
  onHistorySelect
}: SearchHistorySectionProps) => {
  const [history, setHistory] = useLocalStorage<string[]>("HISTOTY", []);
  function onSelectHistory(text: string) {
    onHistorySelect(text);
  }

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
        {history.map(item =>
          <div
            key={item}
            className="flex w-full bg-transparent py-1 justify-between items-center"
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
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchHistorySection;
