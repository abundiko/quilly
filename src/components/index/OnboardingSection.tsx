import OnboardingSectionCard from "../OnboardongSectionCard";

const OnboardingSection = () => {
  return (
    <section className=" relative app-theme py-16">
      <div className="app-container">
        <h1 className="font-bold text-3xl md:text-5xl w-full">
          On-Boarding is Pretty Easy
        </h1>
        <p className="opacity-80 text-lg my-4 w-full">
          Here are the few easy steps to take on{" "}
          <span className="app-primary-text font-[600]">Quilly </span> to start
          Creating
        </p>
        {onboardingData.map((item, i) =>
          <OnboardingSectionCard key={i} id={i + 1} body={item} />
        )}
      </div>
    </section>
  );
};

export default OnboardingSection;

const onboardingData = [
  <span key={1}>
    Create a Free account.{" "}
    <a href="/signup" className="app-navlink text-inherit">
      Click Here
    </a>
    to get started
  </span>,
  "Start writing posts and reading content from the most talented creators",
  "It's that easy. You are now part of the skilled bloggers community 🎉"
];
