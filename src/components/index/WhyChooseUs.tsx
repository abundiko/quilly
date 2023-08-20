import {
  FaTrophy,
  FaHeart,
  FaBookOpen,
  FaLightbulb,
  FaUsers,
  FaRocket
} from "react-icons/fa";

export default function WhyChooseUs() {
  return (
    <section className="py-16 relative app-theme">
      <div className="app-container justify-center">
        <h1 className="font-bold text-3xl md:text-5xl mb-5 md:mb-8 w-full">
          Check This Out!
        </h1>
        {whyChooseUsData.map((item, i) =>
          <WhyChooseUsCard key={item.title} {...item} index={i} />
        )}
      </div>
    </section>
  );
}

interface WhyChooseUsProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}

const WhyChooseUsCard = ({
  icon,
  title,
  subtitle,
  index
}: WhyChooseUsProps & {
  index: number;
}) => {
  const evenThemeClass =
    "bg-primary-dark dark:bg-light dim:bg-light text-light dark:text-dark dim:text-dark   md:bg-primary-dark md:dark:bg-light md:dim:bg-light md:text-light md:dark:text-dark md:dim:text-dark";
  const threeThemeClass =
    "md:bg-primary-dark md:dark:bg-light md:dim:bg-light md:text-light md:dark:text-dark md:dim:text-dark   sm:dim:bg-dim sm:dim:text-light sm:dark:text-light sm:dark:bg-dark sm:bg-light sm:text-dark";
  const fourThemeClass =
    "sm:bg-primary-dark sm:dark:bg-light sm:dim:bg-light sm:text-light sm:dark:text-dark sm:dim:text-dark   md:dim:bg-dim md:dim:text-light md:dark:text-light md:dark:bg-dark md:bg-light md:text-dark";
  return (
    <div
      className={`p-4 lg:p-6 w-11/12 sm:w-6/12 md:w-4/12 border app-borders ${index %
        2 ==
        0 && evenThemeClass} ${index == 2 && threeThemeClass} ${index == 3 &&
        fourThemeClass}`}
    >
      {icon}
      <h4 className="text-xl font-bold">
        {title}
      </h4>
      <p className="opacity-70">
        {subtitle}
      </p>
    </div>
  );
};

const whyChooseUsData: WhyChooseUsProps[] = [
  {
    icon: <FaTrophy className="text-6xl" />,
    title: "Outstanding Achievement",
    subtitle:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impressive accomplishments recognized by all."
  },
  {
    icon: <FaHeart className="text-6xl" />,
    title: "Unconditional Love",
    subtitle:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. A deep affection that knows no bounds."
  },
  {
    icon: <FaBookOpen className="text-6xl" />,
    title: "Endless Knowledge",
    subtitle:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. A wealth of wisdom waiting to be explored."
  },
  {
    icon: <FaLightbulb className="text-6xl" />,
    title: "Inspired Ideas",
    subtitle:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. A spark of creativity that illuminates the mind."
  },
  {
    icon: <FaUsers className="text-6xl" />,
    title: "Strong Community",
    subtitle:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. A supportive network that embraces diversity."
  },
  {
    icon: <FaRocket className="text-6xl" />,
    title: "Unleash Potential",
    subtitle:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Igniting the drive for limitless growth."
  }
];
