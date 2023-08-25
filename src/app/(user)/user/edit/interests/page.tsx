"use client";

import { useContext, useState } from "react";
import AppLoader from "@/components/AppLoader";
import {
  InterestButton,
  InterestButtonSelected
} from "@/components/InterestButton";
import { useRouter } from "next/navigation";
import { testInterests } from "@/data/testInterests";

const SignupInterestsForm = () => {
  const { push: redirect } = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [allInterests, setAllInterests] = useState(testInterests);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

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
    <main className="border-r app-borders">
      <h1 className="page-title">Update Interests</h1>
      <div className="p-4">
        <form action={handleSubmit} className=" p-3 md:w-8/12 mx-auto">
          <div className="h-fit max-h-[40vh] gap-1 flex flex-wrap w-full overflow-y-auto py-1 my-5">
            {allInterests.map(
              item =>
                selectedInterests.includes(item)
                  ? <InterestButtonSelected
                      key={item}
                      title={item}
                      onClick={() => {
                        setSelectedInterests(
                          selectedInterests.filter(i => i != item)
                        );
                      }}
                    />
                  : <InterestButton
                      key={item}
                      title={item}
                      onClick={() => {
                        setSelectedInterests([...selectedInterests, item]);
                      }}
                    />
            )}
          </div>
          <button
            disabled={selectedInterests.length < 3 ? true : isLoading}
            className="app-btn w-full mb-5 disabled:pointer-events-none disabled:opacity-50"
            name="signup-interests-submit"
            type="submit"
          >
            {isLoading ? <AppLoader /> : "Create Account"}
          </button>
        </form>
      </div>
    </main>
  );
};

export default SignupInterestsForm;
