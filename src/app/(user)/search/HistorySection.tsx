import { FaTrashAlt } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

type SearchHistorySectionProps = {
  onHistorySelect: (e: string) => void;
};

const SearchHistorySection = ({
  onHistorySelect
}: SearchHistorySectionProps) => {
  function onSelectHistory(text: string) {
    onHistorySelect(text);
  }

  return (
    <div className="mb-4">
      <div className="flex justify-between items-center">
        <h6 className="font-[600] text-sm">Search History</h6>
        <button className="app-icon-button small">
          <FaTrashAlt />
        </button>
      </div>
      <div className="p-2 rounded-md light-bg mt-1">
        {dummyHistory.map(item =>
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
            <button className="app-icon-button small">
              <IoClose />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchHistorySection;

const dummyHistory = [
  "Hello world",
  "Learn Java in 30 seconds",
  "Become a millionaire with just html",
  "John Doe"
];
