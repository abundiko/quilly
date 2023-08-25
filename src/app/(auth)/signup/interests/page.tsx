"use client";

import { useContext, useState } from "react";
import AppLoader from "@/components/AppLoader";
import {
  InterestButton,
  InterestButtonSelected
} from "@/components/InterestButton";
import { submitSignupInterests } from "@/server/auth/signup";
import { SignupContext } from "../layout";
import { useRouter } from "next/navigation";
import { testInterests } from "@/data/testInterests";

const SignupInterestsForm = () => {
  const { push: redirect } = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [allInterests, setAllInterests] = useState(testInterests);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const signupContext = useContext(SignupContext);

  const handleSubmit = async (e: FormData) => {
    "use client";
    setIsLoading(true);
    try {
      const res = await submitSignupInterests({
        ...signupContext.data!,
        interests: selectedInterests
      });
      if (res && res[0] === "success") redirect("/home");
      res && console.log(res[1]);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };
  if (!signupContext.data) {
    redirect("/signup");
  } else
    return (
      <form
        onSubmit={e => setIsLoading(true)}
        action={handleSubmit}
        className="app-theme app-shadows app-borders border rounded-lg p-4 w-10/12 lg:w-8/12 shadow-2xl bg-inherit"
      >
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-3xl">Interests</h1>
        </div>
        <h2 className="  opacity-80 text-md my-3">
          Select at least 3 areas you{"'"}re intrested in
        </h2>
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
    );
};

export default SignupInterestsForm;
