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

const SignupInterestsForm = () => {
  const userContext = useContext(UserContext);
  const { push: redirect } = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [allInterests, setAllInterests] = useState(testInterests);
  const [selectedInterests, setSelectedInterests] = useState<string[]>(userContext.data?.interests??[]);

  const handleSubmit = async (e: FormData) => {
    "use client";
    setIsLoading(true);
    try {
      // const res = await submitSignupInterests({
      //   ...signupContext.data!,
      //   interests: selectedInterests
      // });
      // if (res && res[0] === "success") redirect("/home");
      // res && console.log(res[1]);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };
  return (
    <form action={handleSubmit} className="border-r app-borders ">
      <h1 className="page-title flex justify-between">
        <span>Update Interests</span>
        <button
          disabled={selectedInterests.length < 3 ? true : isLoading}
          className="app-btn py-1 px-2 rounded-3xl disabled:pointer-events-none disabled:opacity-50 text-sm"
          name="signup-interests-submit"
          type="submit"
        >
          {isLoading
            ? <AppLoader />
            : <div className="flex items-center gap-2">
                <FaCheckCircle />
                <span>Save</span>
              </div>}
        </button>
      </h1>
      <div className="p-4 ">
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
                  setSelectedInterests([...selectedInterests, item]);
                }}
              />
            )}
        </div>
      </div>
    </form>
  );
};

export default SignupInterestsForm;
