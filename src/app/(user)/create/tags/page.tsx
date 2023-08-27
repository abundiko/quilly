"use client";

import { useContext, useState } from "react";
import AppLoader from "@/components/AppLoader";
import {
  InterestButton,
  InterestButtonSelected
} from "@/components/InterestButton";
import { useRouter } from "next/navigation";
import { testInterests } from "@/data/testInterests";
import { FaCheckCircle } from "react-icons/fa";
import UserContext from "@/context/UserContext";
import updateInterests from "@/server/userActions/updateInterests";
import { CreatePostContext } from "../layout";
import { AnimatedPageOpacity } from "@/components/AnimatedPage";

const CreatePostTagsPage = () => {
  const postContext = useContext(CreatePostContext);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [allInterests, setAllInterests] = useState(testInterests);
  const [selectedInterests, setSelectedInterests] = useState<string[]>(postContext.data?.tags??[]);

  if (!postContext.data.title || !postContext.data.body) return router.back();

  const handleSubmit = async () => {
    setIsLoading(true);
    "use client";
    
    try {
      const res = await updateInterests(selectedInterests);
      // if (res && res[0] === "success") {
      //   userContext.setData(JSON.parse(res[1]));
      //   setIsLoading(false);
      // }
    } catch (error) {
    }
    setIsLoading(false);
  };
  return (
    <AnimatedPageOpacity >
      <h1 className="page-title flex justify-between">
        <span>Select Tags</span>
        <button
        onClick={handleSubmit}
          disabled={selectedInterests.length < 2 ? true : isLoading}
          className="app-btn py-1 px-2 rounded-3xl disabled:pointer-events-none disabled:opacity-50 text-sm"
          name="signup-interests-submit"
          type="submit"
          
        >
          {isLoading
            ? <AppLoader />
            : <div className="flex items-center gap-2">
                <FaCheckCircle />
                <span>Post</span>
              </div>}
        </button>
      </h1>
      <div className="p-4 ">
        <h5 className="mb-2">Select 2 to 5 tags that suit this Blog Post</h5>
        {
          selectedInterests.length > 0 &&
          <>
        <h6 className="font-[600] opacity-80 text-sm">
          Selected {selectedInterests.length}
        </h6>
        <div className="app-borders border flex flex-wrap gap-1 p-2 rounded-md mb-1">
          {selectedInterests.map(item =>
            <InterestButtonSelected
              key={item}
              title={item}
              onClick={() => {
                setSelectedInterests(selectedInterests.filter(i => i != item));
              }}
              />
              )}
        </div>
              </>
            }
        <h6 className="font-[600] opacity-80 text-sm">Available</h6>
        <div className="app-borders border flex flex-wrap gap-1 p-2 rounded-md">
          {allInterests
            .filter(item => !selectedInterests.includes(item))
            .map(item =>
              <InterestButton
                key={item}
                title={item}
                onClick={() => {
                  if(selectedInterests.length < 5)
                  setSelectedInterests([...selectedInterests, item]);
                else
                setSelectedInterests([...selectedInterests]);
                }}
              />
            )}
        </div>
      </div>
    </AnimatedPageOpacity>
  );
};

export default CreatePostTagsPage;
